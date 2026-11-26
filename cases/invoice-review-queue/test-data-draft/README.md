# Paperwork review queue: DRAFT test set (not frozen)

Rebuilt 2026-11-25 from the Week 9 plan in [CURRENT_STATE.md](../../../CURRENT_STATE.md). Replaces the overnight bakery draft. All synthetic. People are named only Jack, Jill, John and Jane.

Sample business: Kettle Creek Heating & Plumbing, a made-up 8-person service company. Jack owns it, Jill runs the office, John and Jane are the techs (Jack sometimes takes a call). Jill types two kinds of paper into Excel: printed supplier parts invoices and the techs' work orders.

Status: FROZEN 2026-11-26 by Josh, git tag `week9-testset-v1`. Do not change files or the key; record any later finding as a note, not a fix. Josh's 7 handwritten files are in and checked by eye against the key. No model has seen any file. The originals are private (not in this public repo); `display/` holds public copies with signatures blacked out, and `handwritten-fingerprints.txt` holds the originals' SHA-256 fingerprints.

## What's here

| File | What it is |
|---|---|
| `files/` | 43 generated files (the 7 handwritten originals are private) |
| `display/` | Public copies of the 7 handwritten files, signatures blacked out. Not test inputs |
| `files/work-order-form-layout.pdf` | The blank pre-printed form, for copying by hand. Not a test case |
| `HANDWRITTEN-SHEETS.md` | What Josh actually wrote on each of the 4 sheets, and what each file tests |
| `answer-key-documents.csv` | One row per file: where it should land, the correct header fields, flags, signed yes/no |
| `answer-key-line-items.csv` | Correct parts and labor lines, for every file that should land in the review sheet |
| `approved-senders.csv` | Known suppliers and technicians (the "known sender" check) |
| `generate.py` | Rebuilds the generated files and both keys: `python generate.py` (needs reportlab and Pillow). Never touches the h files |

## The 50 cases

| Group | Count | What they test |
|---|---|---|
| I01-I07, I09, I22 | 9 | Supplier invoices that should land in review: clean, sales tax, freight, two pages, same number from a different supplier, a discount line |
| I08, W13, H06 | 3 | Duplicates: two exact resends, and one handwritten form sent again as a JPG (same content) |
| I10, W14, H02 | 3 | Same number, different content: revision, keep both, flag the change |
| I11, W12 | 2 | Math check fails |
| I12, W11, W18 | 3 | Required field missing (blank form included) |
| I13 | 1 | Unknown sender |
| I14, W17 | 2 | Hidden instruction to the AI: it changes nothing |
| I15-I18, I21 | 5 | Document type: credit memo (captured), statement, packing slip, two invoices in one file, newsletter (exceptions) |
| I19 | 1 | Phone photo of a receipt: read if possible, otherwise exception |
| I20 | 1 | Damaged file: must still appear with a status |
| W01-W05, H01, H03 | 7 | Work orders that should land in review |
| W06-W10, W19, H05 | 7 | Business flags: N/C, warranty, callback, bill landlord, paid cash |
| W15 | 1 | Unsigned: captured as signed = no, not an error |
| W16, H04 | 2 | Number sense: more than 12 hours on one visit (H04 only if 1.5 is misread) |
| W20, W21, H07 | 3 | Front that continues on the back, back of a form alone, two forms in one photo |

## Laugh-test changes, where each one lives

| Change | Cases |
|---|---|
| Duplicate vs revision | I08, W13 (duplicate); I10, W14, H02 (revision) |
| Document type field | Every row; I15-I17, I21 test the non-invoice types |
| Business flags, a person decides billing | W06-W10, W19, H05 |
| Every file gets a status | I20, plus a status column in every row |
| Two linked tables | answer-key-documents.csv and answer-key-line-items.csv, joined on case_id; job number on both document types |
| Multi-page read; back of form and two-in-one go to exceptions | I07; W20, W21, H07, I18 |
| Number sense for handwriting | W16, H04 |
| Signature yes/no, never transcribed | signed column; W15, H05 unsigned |

## Rules the key assumes

- Duplicate = the same file (same bytes), or the same sender and number with identical fields. Revision = same sender and number with different fields.
- The duplicate key is sender + number, never number alone (I03 and I09 both use 2045).
- Nothing reaches the books. "review" means a row in the review sheet waiting for Jill.
- Run order matters: run the files in the order of the run_order column, so H01 is seen before H02 and H05 before H06.

## Cases likely to fail or split judgment (raised with Josh before the freeze)

- I19 (receipt photo): two acceptable answers, read correctly or exception. A wrong read that lands in review is the only failure.
- H01, H02: the "|" column lines can make "2 washers" read as 21. Then the line math fails and it goes to exception, which is acceptable.
- H04: 1.5 hours read as 15 is caught by the number check, so exception is acceptable. Reading the crossed-out 45.00 is a failure.
- H06: caught as a duplicate only if the AI reads both copies of sheet 5 identically. One different word makes it a "revision". That would be a design finding about the content fingerprint.
- W20: a model may read the front as a complete ticket. The key says exception.
- I16 (statement): likely read as an invoice. That's the double-count risk the case exists for.
- I15 (credit memo), I22 (discount): negative amounts; the math check must allow them.
