"""First direct call to the AI, with no n8n in between.

Sends one made-up work-order note to Groq and prints what n8n's AI block normally hides:
the model's answer, tokens used, how long it took, and the error if it fails.
Also adds one line per run to traces.jsonl, tagged with a correlation ID.

Run:  python first_call.py
Needs: the GROQ_API_KEY environment variable (never put the key in this file).
"""

import json
import os
import sys
import time
import uuid

import requests

URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "openai/gpt-oss-120b"          # the one place to change the model
TIMEOUT_SECONDS = 30

# A made-up note. Not from the test set, so the freeze rule is safe.
NOTE = "Ticket 9001, 11/24/2026, tech Jane. Replaced kitchen faucet. 1.5 hrs labor. Part: faucet $89.00. N/C - callback."

PROMPT = (
    "Read this work-order note and return JSON with exactly these keys: "
    "ticket, date, technician, hours, parts_total, flags (a list). "
    "Use null for anything not in the note.\n\nNote: " + NOTE
)


def main():
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        sys.exit("No GROQ_API_KEY found. Set it in Windows, then open a new Terminal.")

    correlation_id = "py-" + uuid.uuid4().hex[:8]
    body = {
        "model": MODEL,
        "messages": [{"role": "user", "content": PROMPT}],
        "temperature": 0,
        "response_format": {"type": "json_object"},
    }

    start = time.time()
    try:
        r = requests.post(URL, json=body, timeout=TIMEOUT_SECONDS,
                          headers={"Authorization": f"Bearer {key}"})
        error = None if r.ok else f"HTTP {r.status_code}: {r.text[:300]}"
    except requests.exceptions.RequestException as e:   # no network, timeout, etc.
        r, error = None, f"{type(e).__name__}: {e}"
    seconds = round(time.time() - start, 2)

    answer = usage = None
    if r is not None and r.ok:
        data = r.json()
        answer = data["choices"][0]["message"]["content"]
        usage = data.get("usage", {})

    trace = {"correlation_id": correlation_id, "model": MODEL, "seconds": seconds,
             "http_status": r.status_code if r is not None else None,
             "prompt_tokens": (usage or {}).get("prompt_tokens"),
             "completion_tokens": (usage or {}).get("completion_tokens"),
             "error": error}
    with open(os.path.join(os.path.dirname(__file__), "traces.jsonl"), "a") as f:
        f.write(json.dumps(trace) + "\n")

    print("Trace:", json.dumps(trace, indent=2))
    print("Answer:", answer)


if __name__ == "__main__":
    main()
