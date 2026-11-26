"""Summarize traces.jsonl: how many runs, how many failed and why, average time.

Run:  python summarize_traces.py            (all runs)
      python summarize_traces.py 2026-11-25 (only runs on that day)
      python summarize_traces.py py-cff82ed2 (one run, every detail)
"""

import json
import os
import sys
from collections import Counter

TRACE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "traces.jsonl")


def main():
    want = sys.argv[1] if len(sys.argv) > 1 else ""
    with open(TRACE_FILE) as f:
        runs = [json.loads(line) for line in f if line.strip()]

    if want.startswith("py-"):                       # one run, every detail
        for r in runs:
            if r["correlation_id"] == want:
                print(json.dumps(r, indent=2))
                return
        print("No run with that ID.")
        return

    if want:                                          # one day
        runs = [r for r in runs if r.get("at", "").startswith(want)]
    if not runs:
        print("No runs found.")
        return

    failed = [r for r in runs if r.get("error")]
    times = [r["seconds"] for r in runs if r.get("seconds") is not None]
    tokens = sum((r.get("prompt_tokens") or 0) + (r.get("completion_tokens") or 0) for r in runs)
    print(f"Runs: {len(runs)}   OK: {len(runs) - len(failed)}   Failed: {len(failed)}")
    print(f"Average time: {sum(times) / len(times):.2f} s" if times else "Average time: -")
    print(f"Tokens used: {tokens}")
    if failed:
        print("Failures by reason:")
        for reason, n in Counter(r["error"] for r in failed).most_common():
            print(f"  {n}  {reason}")
    no_time = sum(1 for r in runs if "at" not in r)
    if no_time:
        print(f"({no_time} older runs have no time stamp)")


if __name__ == "__main__":
    main()
