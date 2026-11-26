"""Break the AI call on purpose and check it always fails safely.

Run:  python failure_tests.py
Each test says what it breaks and what SHOULD happen. PASS means it happened.
Tests 3-6 use a fake AI service on your own laptop (no internet, no tokens used).
Test 7 is one real call to Groq.
"""

import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer

from reader import read_note

NOTE = "Ticket 9001, 11/24/2026, tech Jane. Replaced kitchen faucet. 1.5 hrs labor. Part: faucet $89.00. N/C - callback."


class FakeAI(BaseHTTPRequestHandler):
    """Answers like Groq would, but badly, depending on the address used."""

    def do_POST(self):
        self.rfile.read(int(self.headers.get("Content-Length", 0)))
        if self.path == "/rate-limit":
            self.send_response(429); self.end_headers(); return
        if self.path == "/server-error":
            self.send_response(500); self.end_headers(); return
        if self.path == "/not-json":
            content = "Sure! The ticket is 9001 and Jane did the work."
        else:  # /wrong-shape: valid JSON, but a key is missing and the date is US-style
            content = json.dumps({"ticket": "9001", "date": "11/24/2026", "technician": "Jane"})
        reply = {"choices": [{"message": {"content": content}}], "usage": {}}
        out = json.dumps(reply).encode()
        self.send_response(200); self.send_header("Content-Type", "application/json")
        self.end_headers(); self.wfile.write(out)

    def log_message(self, *args):
        pass


def main():
    server = HTTPServer(("127.0.0.1", 0), FakeAI)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    fake = f"http://127.0.0.1:{server.server_port}"

    tests = [
        ("1 Missing key", dict(key=""), "needs_review", "missing API key"),
        ("2 Wrong key", dict(key="gsk_wrong"), "needs_review", "key refused"),
        ("3 Rate limit", dict(key="x", url=fake + "/rate-limit"), "needs_review", "rate limited"),
        ("4 Service down", dict(key="x", url="http://127.0.0.1:9/nothing-here"), "needs_review", "unreachable"),
        ("5 Garbled answer", dict(key="x", url=fake + "/not-json"), "needs_review", "not readable JSON"),
        ("6 Wrong shape", dict(key="x", url=fake + "/wrong-shape"), "needs_review", "bad answer shape"),
        ("7 Timeout", dict(timeout=0.001), "needs_review", "timeout"),
        ("8 Real call", dict(), "ok", ""),
    ]
    passed = 0
    for name, kwargs, want_status, want_reason in tests:
        try:
            result = read_note(NOTE, **kwargs)
        except Exception as e:  # a crash is always a FAIL
            print(f"FAIL  {name}: CRASHED with {type(e).__name__}: {e}")
            continue
        ok = result["status"] == want_status and want_reason in result["reason"]
        passed += ok
        print(f"{'PASS' if ok else 'FAIL'}  {name}: status={result['status']}  "
              f"reason={result['reason'] or '-'}  id={result['trace']['correlation_id']}")
        if name.startswith("8"):
            print("      answer:", json.dumps(result["fields"]))
    print(f"\n{passed} of {len(tests)} passed")
    server.shutdown()


if __name__ == "__main__":
    main()
