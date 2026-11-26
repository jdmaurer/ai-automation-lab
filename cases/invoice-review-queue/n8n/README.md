# Paperwork intake workflow (v0.1 AI off; v0.2 real reading)

Status: draft, written 2026-11-25. The reading step is a STAND-IN with no AI until the test set is frozen. Everything else runs.

## Files

| File | What it is |
|---|---|
| `paperwork-intake-v0.1.json` | The n8n workflow. Import with Import from File |
| `table-kc_file_log.csv`, `table-kc_documents.csv`, `table-kc_line_items.csv` | Create the three Data Tables with Import CSV. Each has one SEED row: delete it after import |
| `pins/<case>.json` | Pin data for the stand-in block, one per test case, built from the answer key |
| `check-rules-offline.js` | Runs the workflow's rule code against all 50 cases with the pins, outside n8n. Last result: 0 mismatches |

## The path a file takes

1. Paperwork drop form: one file per submission.
2. Prepare file: names the file "data" and gives the run a correlation ID (`kc-<execution id>`).
3. Fingerprint file: SHA-256 of the file's bytes.
4. Same file seen before? If yes, it's logged as a duplicate and stops there.
5. Route by file type: PDF, photo or other.
6. Read PDF text: a PDF that won't open, or has no text layer (a phone scan), goes to exceptions with a reason.
7. Read fields (STAND-IN, no AI): where the AI will go. Pin a case's JSON here to test.
8. Check fields: document type, required fields, known sender, line math, total math, hours over 12, reading problems. Rules only.
9. Find same sender and number, then Decide: new, resend (same content) or revision (changed content).
10. Write document, then the line items, into the review tables. Every path ends in Write file log, so every file gets a status.

## Not built yet

- The real reading step: a text model for PDFs with text, a vision model for photos. Groq's vision model reads images only, up to 3 per request, so phone-scan PDFs need converting to images first. That's an open design choice.
- Excel output (two sheets), the failure alert, and the Python test bench that runs all 50 files.
- Before the first AI run (from the Nov 26 logic check): the prompt must ask for exact formats (dates YYYY-MM-DD, flags from a fixed list: no_charge, warranty, callback, bill_landlord, paid_cash); Check fields must clean dates, flag words and sender names before matching; the test bench must wait between files so rate limits don't create false exceptions, and report 429s separately.

## v0.2 (2026-11-26): the real reading step

`paperwork-intake-v0.2.json`, built by `build_wf_v02.py`. Replaces the stand-in with three readers:
- PDFs with text: words pulled out by Extract From File, read by Groq `openai/gpt-oss-120b` (reasoning effort low).
- Photos (JPG/PNG): Groq vision `qwen/qwen3.8-27b`.
- Phone-scan PDFs (no text inside): Gemini `gemini-3.5-flash-lite`, which reads PDFs directly.

Models are set in one place (the Prepare file block). Every reader retries 3 times, then sends the file to exceptions with "AI reading failed". Parse reading turns any answer into the same fields. Check fields now cleans formats first (dates to YYYY-MM-DD, flag words to the fixed list, sender names matched to the approved list ignoring case and "&"/"and"). The duplicate fingerprint now uses the facts (type, sender, number, date, total, flags, line amounts), not the wording. The form answers only when the workflow finishes, so the test bench sends files strictly one at a time.
