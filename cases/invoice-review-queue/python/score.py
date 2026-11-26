"""Score the workflow against the answer key. Rules only, no AI.

Reads what n8n wrote (kc file log, kc documents, kc line items) through the n8n API,
compares each test file with the answer key, and prints PASS / FAIL / NOT RUN per case,
then totals by slice (invoice vs work order, generated vs handwritten).

Run:  python score.py
Needs: N8N_API_KEY environment variable (n8n Settings > n8n API > Create an API key).
Scores the FIRST log row per file name, so start an evidence run from empty tables.
"""

import csv
import os
import sys
from collections import Counter, defaultdict

import requests

N8N = os.environ.get("N8N_URL", "http://localhost:5678") + "/api/v1"
TABLES = {"log": "ny5ujCJJdSmwAdwA", "docs": "LGROOTb7yGYTUoBT", "lines": "B0QDQ41AmznxgLW6"}
KEY_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "test-data-draft")


def fetch_rows(table_id, key):
    """All rows of one Data Table, oldest first, following the page cursor."""
    rows, cursor = [], None
    while True:
        params = {"limit": 250, "sortBy": "id:asc"}
        if cursor:
            params["cursor"] = cursor
        r = requests.get(f"{N8N}/data-tables/{table_id}/rows", params=params, timeout=30,
                         headers={"X-N8N-API-KEY": key})
        r.raise_for_status()
        body = r.json()
        rows += body.get("data", [])
        cursor = body.get("nextCursor")
        if not cursor:
            return rows


def read_key(name):
    with open(os.path.join(KEY_DIR, name), newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def money(v):
    try:
        return round(float(v), 2)
    except (TypeError, ValueError):
        return None


def flags(v):
    return sorted(x.strip() for x in (v or "").split(";") if x.strip())


def compare_document(want, doc, want_lines, got_lines):
    """Return a list of differences between the key and what the workflow wrote."""
    diffs = []
    for field in ("sender", "doc_number", "doc_date"):
        if (doc.get(field) or "") != want[field]:
            diffs.append(f"{field}: want {want[field]!r}, got {doc.get(field)!r}")
    if money(doc.get("total")) != money(want["total"]):
        diffs.append(f"total: want {want['total']}, got {doc.get('total')}")
    if flags(doc.get("flags")) != flags(want["flags"]):
        diffs.append(f"flags: want {want['flags'] or '-'}, got {doc.get('flags') or '-'}")
    if want["signed"] and (doc.get("signed") or "") != want["signed"]:
        diffs.append(f"signed: want {want['signed']}, got {doc.get('signed')}")
    want_amounts = Counter(money(l["amount"]) for l in want_lines)
    got_amounts = Counter(money(l.get("amount")) for l in got_lines)
    if want_amounts != got_amounts:
        diffs.append(f"line items: want {len(want_lines)} lines, got {len(got_lines)} (amounts differ)")
    return diffs


def main():
    key = os.environ.get("N8N_API_KEY")
    if not key:
        sys.exit("No N8N_API_KEY found. Set it in Windows, then open a new Terminal.")
    try:
        log, docs, lines = (fetch_rows(TABLES[t], key) for t in ("log", "docs", "lines"))
    except requests.exceptions.RequestException as e:
        sys.exit(f"Could not read the n8n tables: {e}")

    first_log = {}
    for row in log:
        first_log.setdefault(row.get("file_name"), row)
    doc_by_hash = {d.get("file_hash"): d for d in docs}
    lines_by_hash = defaultdict(list)
    for l in lines:
        lines_by_hash[l.get("file_hash")].append(l)
    key_lines = defaultdict(list)
    for l in read_key("answer-key-line-items.csv"):
        key_lines[l["case_id"]].append(l)

    tally = defaultdict(Counter)        # slice -> PASS/FAIL/NOT RUN counts
    for want in read_key("answer-key-documents.csv"):
        case, row = want["case_id"], first_log.get(want["file"])
        slices = ["all", "work orders" if case[0] in "WH" else "invoices",
                  "handwritten" if case[0] == "H" else "generated"]
        if row is None:
            result, detail = "NOT RUN", ""
        else:
            got, expected = row.get("status"), want["expected_status"]
            alt = want["acceptable_alternate"].split(":")[0].strip()
            if got != expected and got != alt:
                result, detail = "FAIL", f"status: want {expected}, got {got} ({row.get('reason') or 'no reason'})"
            elif got in ("review", "revision"):
                diffs = compare_document(want, doc_by_hash.get(row.get("file_hash"), {}),
                                         key_lines[case], lines_by_hash[row.get("file_hash")])
                result, detail = ("FAIL", "; ".join(diffs)) if diffs else ("PASS", got)
            else:
                result, detail = "PASS", f"{got}: {row.get('reason') or ''}"
        for s in slices:
            tally[s][result] += 1
        if result != "NOT RUN":
            print(f"{result:4}  {case:4} {want['file']:44} {detail}")

    print()
    for s in ("all", "invoices", "work orders", "generated", "handwritten"):
        c = tally[s]
        ran = c["PASS"] + c["FAIL"]
        pct = f"{100 * c['PASS'] / ran:.0f}%" if ran else "-"
        print(f"{s:12} pass {c['PASS']:2} / ran {ran:2}  ({pct})   not run {c['NOT RUN']}")


if __name__ == "__main__":
    main()
