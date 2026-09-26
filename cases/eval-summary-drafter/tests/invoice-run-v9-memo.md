<!-- Output of eval-summary-drafter-v9-invoice-test, 2026-09-26. Checks: no failures; flags: C8 and three absolute claims to verify. Review notes: section 4 says the other invoices 'required manual review' (the wrong-amount one was not reviewed); section 7 options lack their consequences; test date in the fixture (Oct 1) is later than the memo date. -->

# Harbor Invoice Entry Assistant: Pilot Readiness Summary  
Prepared for: Owner, Harbor Bookkeeping – September 26 2026  

## 1. Decision at a glance  
We recommend **Option A – fix and retest before any pilot**. In testing, the system produced an unflagged wrong amount in 1 of 20 test invoices. It was useful on 14 of 20 test invoices, meeting your 70 % target. The key decision is whether to proceed after a fix or to run a pilot with manual review of every invoice.  

## 2. What it does and how we tested it  
Harbor Invoice Entry Assistant reads each typed vendor invoice and enters the vendor, date, and amount into the ledger for a bookkeeper to approve. It does not pay invoices or contact vendors. We ran 20 test invoices (written by our team) on 2026‑10‑01. Four were held back until the final run.  

## 3. Safety result  
The system recorded an unflagged wrong amount in 1 of 20 test invoices. It entered $420 instead of the correct $4,200 on an Acme Supply invoice and gave no flag for review. This means an invoice could be posted with an incorrect amount without any human check, risking under‑payment. No other unflagged wrong amounts were observed.  

## 4. Usefulness against your target  
In testing, the assistant handled 14 of 20 typed vendor invoices (70 %) on its own, which met your 70 % target. The remaining invoices required manual review, but the overall usefulness aligns with the goal you set.  

## 5. The trade‑off and your team’s role  
When the system cannot read a field, it marks the invoice for Manual entry. In testing, 5 of 20 invoices were sent to Manual entry because a field was unreadable. For example, a Harbor Freight Lines invoice with a handwritten correction to the amount triggered this path. The reviewer reads the full invoice and decides the correct entry; the system’s suggestion is not accepted automatically. In a pilot, we will measure the actual volume of such referrals.  

## 6. Limits  
- Test cases, not real invoices, were used; the correct answers were set by our team.  
- The test set comprised only typed vendor invoices; four were held back until the final run.  
- Handwritten invoices and invoices in other currencies were not tested.  
- Any invoice with an amount over $10,000 always goes to a bookkeeper, regardless of the assistant’s suggestion.  

## 7. What we need from you  
**Option A – Fix and retest before any pilot.**  
**Option B – Pilot with Manual entry checking every invoice; the assistant only suggests entries.**  

**Our recommendation:** **Option A**. The choice is yours. The pilot will measure the real‑world rate of unflagged wrong amounts and the workload of Manual entry referrals. Please confirm **who will approve the entered amounts** and let us know if the 70 % usefulness target remains appropriate after these results.