# Paperwork review queue: DRAFT test set (not frozen)

Rebuilt 2026-11-25 from the Week 9 plan in [CURRENT_STATE.md](../../../CURRENT_STATE.md). Replaces the overnight bakery draft. All synthetic. People are named only Jack, Jill, John and Jane.

Sample business: Kettle Creek Heating & Plumbing, a made-up 8-person service company. Jack owns it, Jill runs the office, John and Jane are the techs (Jack sometimes takes a call). Jill types two kinds of paper into Excel: printed supplier parts invoices and the techs' work orders.

Status: draft. Freeze only after Josh's 9 handwritten files are saved and checked against the key. No model sees any file before the freeze.

## What's here

| File | What it is |
|---|---|
| `files/` | 41 generated files, plus Josh's 9 handwritten ones once saved (h01-h09) |
| `files/work-order-form-layout.pdf` | The blank pre-printed form, for copying by hand. Not a test case |
| `HANDWRITTEN-SHEETS.md` | The exact text for Josh's 6 sheets and how to save each one |
| `answer-key-documents.csv` | One row per file: where it should land, the correct header fields, flags, signed yes/no |
| `answer-key-line-items.csv` | Correct parts and labor lines, for every file that should land in the review sheet |
| `approved-senders.csv` | Known suppliers and technicians (the "known sender" check) |
| `generate.py` | Rebuilds the generated files and both keys: `python generate.py` (needs reportlab and Pillow). Never touches the h files |

## The 50 cases

| Group | Count | What they test |
|---|---|---|
| I01-I07, I09, I22 | 9 | Supplier invoices that should land in review: clean, sales tax, freight, two pages, same number from a different supplier, a discount line |
| I08, W13 | 2 | Exact resends: duplicate, no new row |
| I10, W14, H02 | 3 | Same number, different content: revision, keep both, flag the change |
| I11, W12 | 2 | Math check fails |
| I12, W11, W18 | 3 | Required field missing (blank form included) |
| I13 | 1 | Unknown sender |
| I14, W17 | 2 | Hidden instruction to the AI: it changes nothing |
| I15-I18, I21 | 5 | Document type: credit memo (captured), statement, packing slip, two invoices in one file, newsletter (exceptions) |
| I19, H07 | 2 | Phone photos: read if possible, otherwise exception |
| I20 | 1 | Damaged file: must still appear with a status |
| W01-W05, H01, H09 | 7 | Work orders that should land in review |
| W06-W10, W19, H03 | 7 | Business flags: N/C, warranty, callback, bill landlord, paid cash |
| W15 | 1 | Unsigned: captured as signed = no, not an error |
| W16, H04 | 2 | Number sense: more than 12 hours on one visit |
| H05, H06, H08 | 3 | Back of a form, front that continues on the back, two forms in one photo |

## Laugh-test changes, where each one lives

| Change | Cases |
|---|---|
| Duplicate vs revision | I08, W13 (duplicate); I10, W14, H02 (revision) |
| Document type field | Every row; I15-I17, I21 test the non-invoice types |
| Business flags, a person decides billing | W06-W10, W19, H03, H07, H09 |
| Every file gets a status | I20, plus a status column in every row |
| Two linked tables | answer-key-documents.csv and answer-key-line-items.csv, joined on case_id; job number on both document types |
| Multi-page read; back of form and two-in-one go to exceptions | I07; H05, H06, H08, I18 |
| Number sense for handwriting | W16, H04 |
| Signature yes/no, never transcribed | signed column; W15, H07 unsigned |

## Rules the key assumes

- Duplicate = the same file (same bytes), or the same sender and number with identical fields. Revision = same sender and number with different fields.
- The duplicate key is sender + number, never number alone (I03 and I09 both use 2045).
- Nothing reaches the books. "review" means a row in the review sheet waiting for Jill.
- Run order matters: run the files in the order of the run_order column, so H01 is seen before H02.

## Cases likely to fail or split judgment (decide before the test)

- I19, H07 (photos): two acceptable answers, read correctly or exception. A wrong read that lands in review is the only failure.
- H04: 1.5 hours read as 15 is caught by the number check, so exception is acceptable. Reading the crossed-out 45.00 is a failure.
- H05: a model will likely read the front as a complete ticket and send it to review. The key says exception.
- I16 (statement): likely read as an invoice. That's the double-count risk the case exists for.
- I15 (credit memo): the total is negative. The math check has to allow that, and so must I22's discount line.
