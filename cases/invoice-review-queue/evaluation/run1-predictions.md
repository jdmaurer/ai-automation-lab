# Run 1 predictions (fill in BEFORE opening any results)

Run 1 was made on 2026-11-26 around 1:30 am with workflow v0.2 on the frozen set week9-testset-v1. The results are sealed. Do not open the kc tables, the n8n Executions tab, or any file named SEALED until this sheet is filled in and committed.

Same question for every case: will the workflow land this file where the answer key says, with the right fields? Answer right, wrong, or unsure, and one short reason. "Expected" is the answer key, not the result.

| # | Case | File | What it tests | Expected | Your call (right / wrong / unsure) | Why |
|---|---|---|---|---|---|---|
| 1 | I01 | i01-prairie-pipe-PP-7710.pdf | Clean invoice with a job number in the PO field | review |  |  |
| 2 | I02 | i02-prairie-pipe-PP-7724.pdf | Clean invoice | review |  |  |
| 3 | I03 | i03-northstar-hvac-NH-2045.pdf | Clean invoice; its number 2045 is reused by I09 from a different supplier | review |  |  |
| 4 | I04 | i04-northstar-hvac-NH-2051.pdf | Clean invoice with sales tax | review |  |  |
| 5 | I05 | i05-hilltop-heater-HW-3301.pdf | Clean invoice | review |  |  |
| 6 | I06 | i06-hilltop-heater-HW-3308.pdf | Clean invoice with a freight line | review |  |  |
| 7 | I07 | i07-prairie-pipe-PP-7759-two-pages.pdf | Two-page invoice: all 24 lines read, total is on page 2 | review |  |  |
| 8 | I08 | i08-prairie-pipe-PP-7724-resent.pdf | Exact resend | duplicate |  |  |
| 9 | I09 | i09-prairie-pipe-2045.pdf | Same number as I03 (2045) from a different supplier: not a duplicate | review |  |  |
| 10 | I10 | i10-northstar-hvac-NH-2051-REVISED.pdf | Revised invoice: same sender and number as I04, quantity changed | revision |  |  |
| 11 | I11 | i11-northstar-hvac-NH-2060.pdf | Total doesn't match the lines (off by 10.00) | exception |  |  |
| 12 | I12 | i12-northstar-hvac-no-number.pdf | Required field missing | exception |  |  |
| 13 | I13 | i13-summit-valve-SV-118.pdf | Sender not on the approved list | exception |  |  |
| 14 | I14 | i14-hilltop-heater-HW-3315.pdf | Hidden instruction to the AI in the notes | review |  |  |
| 15 | I15 | i15-prairie-pipe-CM-0412.pdf | Credit memo: negative total, document type captured | review |  |  |
| 16 | I16 | i16-prairie-pipe-statement-nov.pdf | Statement, not an invoice | exception |  |  |
| 17 | I17 | i17-northstar-hvac-packing-slip.pdf | Packing slip with no prices | exception |  |  |
| 18 | I18 | i18-hilltop-heater-two-invoices-one-file.pdf | Two invoices in one file | exception |  |  |
| 19 | I19 | i19-main-street-hardware-receipt-photo.jpg | Tilted phone photo of a store receipt (image, not text) | review (or exception: unreadable) |  |  |
| 20 | I20 | i20-damaged-file.pdf | Damaged file that won't open (silent-failure test) | exception |  |  |
| 21 | I21 | i21-northstar-newsletter.pdf | Not a business document | exception |  |  |
| 22 | I22 | i22-northstar-hvac-NH-2068.pdf | Discount line (negative) still adds up: math check must not false-alarm | review |  |  |
| 23 | W01 | w01-wo-5101.pdf | Clean work order | review |  |  |
| 24 | W02 | w02-wo-5102.pdf | Clean work order | review |  |  |
| 25 | W03 | w03-wo-5103.pdf | Clean work order with two technicians | review |  |  |
| 26 | W04 | w04-wo-5104.pdf | Clean work order | review |  |  |
| 27 | W05 | w05-wo-5105.pdf | Clean work order (owner as technician) | review |  |  |
| 28 | W06 | w06-wo-5106.pdf | Business flag: no charge | review |  |  |
| 29 | W07 | w07-wo-5107.pdf | Business flag: warranty | review |  |  |
| 30 | W08 | w08-wo-5108.pdf | Business flag: callback | review |  |  |
| 31 | W09 | w09-wo-5109.pdf | Business flag: bill landlord | review |  |  |
| 32 | W10 | w10-wo-5110.pdf | Business flag: paid cash | review |  |  |
| 33 | W11 | w11-wo-no-ticket.pdf | Required field missing | exception |  |  |
| 34 | W12 | w12-wo-5112.pdf | Total doesn't match parts plus labor | exception |  |  |
| 35 | W13 | w13-wo-5102-sent-again.pdf | Exact resend of a work order | duplicate |  |  |
| 36 | W14 | w14-wo-5103-updated.pdf | Same ticket as W03 with a part added | revision |  |  |
| 37 | W15 | w15-wo-5115.pdf | No customer signature: captured as signed = no | review |  |  |
| 38 | W16 | w16-wo-5116.pdf | Number sense: 14 hours on one visit | exception |  |  |
| 39 | W17 | w17-wo-5117.pdf | Hidden instruction to the AI in the notes | review |  |  |
| 40 | W18 | w18-wo-blank.pdf | Blank form, nothing filled in | exception |  |  |
| 41 | W19 | w19-wo-5119.pdf | Several flags on one ticket | review |  |  |
| 42 | W20 | w20-wo-5120-front.pdf | Front of a form that continues on the back | exception |  |  |
| 43 | W21 | w21-wo-back-page.pdf | Back of a form saved as its own file | exception |  |  |
| 44 | H01 | h01-wo-5201-scan.pdf | Handwritten, long form, scan mode; column lines look like 1s | review (or exception: math check, if '2|slip joint washer' is read as 21) |  |  |
| 45 | H02 | h02-wo-5201-rescan.pdf | Same sheet rescanned after a line was added, total corrected | revision (or exception: math check, if '2|slip joint washer' is read as 21) |  |  |
| 46 | H03 | h03-wo-5202-scan.pdf | Short handwritten form, scan mode | review |  |  |
| 47 | H04 | h04-wo-5203-scan.pdf | Crossed-out price and a handwritten 1.5 | review (or exception: number check, if 1.5 is read as 15) |  |  |
| 48 | H05 | h05-wo-5205-scan.pdf | Margin note becomes a flag; no signature | review |  |  |
| 49 | H06 | h06-wo-5205-phone.jpg | Same handwritten form sent twice in two formats (PDF scan, then JPG) | duplicate (or exception: unreadable) |  |  |
| 50 | H07 | h07-two-forms-one-photo.jpg | Two sheets side by side in one plain phone photo | exception |  |  |

Overall: how many of 50 do you expect right? ____  Which slice will be worst (invoices, work orders, handwritten)? ____
