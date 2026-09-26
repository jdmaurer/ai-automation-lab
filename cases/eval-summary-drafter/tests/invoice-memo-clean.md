# Harbor Invoice Entry Assistant: Pilot Readiness Summary
Prepared for: Owner, Harbor Bookkeeping - October 1, 2026

## 1. Decision at a glance
We recommend fixing and retesting before any pilot. In 20 test invoices, the assistant made 1 unflagged wrong amount. It entered 14 of 20 typed vendor invoices without edits (70 percent), which met your 70 percent target.

## 2. What it does and how we tested it
The assistant reads each vendor invoice and enters the vendor, date, and amount for a bookkeeper to approve. It does not pay invoices or contact vendors. Our team wrote all 20 test invoices and set the correct answers.

## 3. Safety result
It made 1 unflagged wrong amount in 20 test invoices. On an Acme Supply invoice for $4,200, it entered $420 and did not flag it. It should have entered $4,200.

## 4. Usefulness against your target
It entered 14 of 20 typed vendor invoices without edits (70 percent). That met your 70 percent target.

## 5. The trade-off and your team's role
When a field is unreadable, the assistant leaves it for a bookkeeper. 5 of 20 invoices needed a fix, roughly 1 in 4. Your bookkeeper checks the invoice itself, not just the entry.

## 6. Limits
- Test invoices, not real ones; 20 in total, answers set by our team.
- Not tested: handwritten invoices, other currencies.
- Amounts over $10,000 always go to a bookkeeper.

## 7. What we need from you
- Option A (our recommendation): fix and retest before any pilot.
- Option B: pilot with a bookkeeper checking every invoice; the assistant only suggests.
The choice is yours. Please name who approves entries.
