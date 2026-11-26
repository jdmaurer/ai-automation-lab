"""read_note(): ask the AI to read one work-order note. Never crashes.

Every call returns the same shape:
    {"status": "ok" | "needs_review", "fields": {...} or None, "reason": str, "trace": {...}}
"needs_review" is the safe fallback: a person looks at it. Nothing is guessed.
Every call also adds one line to traces.jsonl, tagged with a correlation ID.
"""

import json
import os
import re
import time
import uuid

import requests

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "openai/gpt-oss-120b"          # the one place to change the model
TIMEOUT_SECONDS = 30
TRACE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "traces.jsonl")

PROMPT = (
    "Read this work-order note and return JSON with exactly these keys: "
    "ticket (string), date (YYYY-MM-DD), technician (string), hours (number), "
    "parts_total (number), flags (list of short strings, one per flag, e.g. [\"N/C\", \"callback\"]). "
    "Use null for anything not in the note.\n\nNote: "
)
REQUIRED = {"ticket": str, "date": str, "technician": str, "hours": (int, float),
            "parts_total": (int, float), "flags": list}


def check_shape(fields):
    """Rules on the AI's answer. Returns a problem message, or '' if it's fine."""
    if not isinstance(fields, dict):
        return "answer is not a JSON object"
    for name, kind in REQUIRED.items():
        if name not in fields:
            return f"missing key: {name}"
        if fields[name] is not None and not isinstance(fields[name], kind):
            return f"wrong type for {name}: {type(fields[name]).__name__}"
    if fields["date"] and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", fields["date"]):
        return f"date not YYYY-MM-DD: {fields['date']}"
    return ""


def read_note(note, key=None, url=GROQ_URL, timeout=TIMEOUT_SECONDS):
    key = os.environ.get("GROQ_API_KEY") if key is None else key
    trace = {"correlation_id": "py-" + uuid.uuid4().hex[:8], "model": MODEL,
             "seconds": None, "http_status": None, "prompt_tokens": None,
             "completion_tokens": None, "error": None}

    def finish(status, fields, reason):
        trace["error"] = reason or None
        with open(TRACE_FILE, "a") as f:
            f.write(json.dumps(trace) + "\n")
        return {"status": status, "fields": fields, "reason": reason, "trace": trace}

    if not key:
        return finish("needs_review", None, "missing API key")

    body = {"model": MODEL, "temperature": 0, "response_format": {"type": "json_object"},
            "messages": [{"role": "user", "content": PROMPT + note}]}
    start = time.time()
    try:
        r = requests.post(url, json=body, timeout=timeout,
                          headers={"Authorization": f"Bearer {key}"})
    except requests.exceptions.Timeout:
        trace["seconds"] = round(time.time() - start, 2)
        return finish("needs_review", None, "timeout")
    except requests.exceptions.RequestException as e:
        trace["seconds"] = round(time.time() - start, 2)
        return finish("needs_review", None, f"service unreachable ({type(e).__name__})")
    trace["seconds"] = round(time.time() - start, 2)
    trace["http_status"] = r.status_code

    if r.status_code == 429:
        return finish("needs_review", None, "rate limited (429)")
    if r.status_code in (401, 403):
        return finish("needs_review", None, f"key refused ({r.status_code})")
    if not r.ok:
        return finish("needs_review", None, f"service error ({r.status_code})")

    try:
        data = r.json()
        usage = data.get("usage") or {}
        trace["prompt_tokens"] = usage.get("prompt_tokens")
        trace["completion_tokens"] = usage.get("completion_tokens")
        fields = json.loads(data["choices"][0]["message"]["content"])
    except (ValueError, KeyError, IndexError, TypeError):
        return finish("needs_review", None, "answer was not readable JSON")

    problem = check_shape(fields)
    if problem:
        return finish("needs_review", fields, f"bad answer shape: {problem}")
    return finish("ok", fields, "")
