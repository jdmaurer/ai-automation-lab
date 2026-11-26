# Evaluation runs: paperwork review queue

## Run 1 (2026-11-26, 01:24 to 01:49 Central) — RESULTS SEALED

| | |
|---|---|
| Test set | week9-testset-v1 (50 cases, frozen 2026-11-26). All 50 laptop copies verified against the frozen SHA-256 fingerprints before the run |
| Workflow | Kettle Creek - Paperwork Intake v0.2, published as "v0.2 real AI reading" |
| Readers | Groq `openai/gpt-oss-120b` (text PDFs, reasoning effort low), Groq `qwen/qwen3.8-27b` (photos), Gemini `gemini-3.5-flash-lite` (phone-scan PDFs). Temperature 0. Free tiers only |
| Driver | n8n workflow "Kettle Creek - Test bench": cleared the three tables, sent the files in key run order through the production form (one at a time; the form answers when the workflow finishes), 25 s wait between files, then exported the tables to CSV |
| Run health | Completed. 50 file-log rows, one per file |
| Scoring | `python/score.py --from-dir` on the exported CSVs. Status per case, plus header fields and line amounts for review/revision cases; chained pairs reported as BLOCKED when the first copy didn't land |
| Before the run | Plumbing smoke test on 3 synthetic files NOT in the test set (text, photo, scan). No prompt or rule was changed after seeing any test file |
| Where the results are | `C:\Users\joshu\.n8n-files\kc-test\results\` (CSV exports and `SEALED-run1-score.txt`). Not in this repo until predictions are in |

Protocol (agreed with Josh): fill in `run1-predictions.md` and commit it before opening the tables, the n8n Executions tab, or the SEALED file. Then open the score together.
