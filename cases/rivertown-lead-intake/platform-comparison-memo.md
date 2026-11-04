# Website leads: two ways to build it

For: the owner of Rivertown Professional Services
Date: November 4, 2026
Prepared by: Josh Maurer

All examples use synthetic data from a fictitious company.

---

## The problem

Right now, when a prospect fills in the form on your website, someone on your staff has to notice it, type it into a spreadsheet, and decide which department should get it. That causes four problems:
- Leads wait until that person has time, and a waiting lead goes cold.
- The same lead can end up on your list twice.
- You can't tell how long a lead waited.
- A department head can't see why a lead was sent to them.

We built a fix in each of two tools. They share the basics and differ in what else they do. Both are tested. This memo is to help you choose one.

## Bottom line

Both options cost $15 to $25 a month in licenses, so price won't decide this. What will decide it is who on your staff will look after it.

Power Automate is Microsoft's automation tool. It works inside the Microsoft 365 account you already use for email and files, so it fits best if someone already manages that account, whether a staff member or an outside IT provider. Your staff sign in as they do now, and your leads stay in your own account. A department head approves each first reply before it goes out, and you get an alert if something breaks. It does not yet decide which department each lead belongs to; that part would still need to be built.

n8n is a separate automation service. It already decides which department each lead belongs to, using AI to read unclear messages and passing anything uncertain to a person. In exchange, someone on your staff would need to learn and manage a second system with its own login.

If your firm isn't on Microsoft 365, or you want AI sorting right away, n8n is usually the stronger choice.

The questions at the end of this memo will help you decide.

## What each one does today

These are working samples, not finished products. Each one shows a different set of features.

Yes = built and tested in the sample. Can be added = not in this sample.

| | n8n | Power Automate |
|---|---|---|
| Receives each new lead within seconds and saves it | Yes | Yes |
| Keeps one entry when the same lead arrives twice | Yes. Notes the repeat on the original lead, so it isn't handled twice | Yes. Same |
| Records where each lead came from, such as your website or an event | Can be added | Yes, so you can tell which places bring in leads |
| Blocks leads from places you haven't approved | Can be added | Yes, so junk or fake leads stay off your list |
| Decides which department each lead belongs to | Yes, with AI help for unclear messages | Can be added |
| A department head approves each first reply to a prospect | Can be added | Yes |
| Alerts someone if it breaks | Can be added | Yes |
| Emails the department head about a new lead | Can be added | Can be added |
| Sends the approved reply to the prospect | Can be added | Can be added |
| Puts each lead into your CRM, such as HubSpot or Salesforce | Can be added | Can be added |

Both need a few security steps before real leads (see the last section).

How they were tested:
- n8n: 37 test leads, 10 of them kept aside until the end so the system had never seen them. Two AI systems from different companies must agree before a lead is sorted. None went to the wrong department. 18 of 23 clear requests were sorted with no person needed; the rest went to a person, as designed.
- Power Automate: 13 tests covering new leads, repeat leads, leads from unapproved places, the approval, a slow approver, and a forced breakdown. All passed.

## What it costs

Prices as of November 3, 2026.

| | Power Automate | n8n (Cloud Starter plan) |
|---|---|---|
| License | About $180 a year ($15 a month, paid yearly). Likely one license, for the person who owns the automation. Staff who only approve replies don't need one. Covers well over 1,000 leads a day | About $240 a year ($20 a month paid yearly, or $24 month to month). Covers up to 2,500 leads a month |
| Storage for your leads | Included | Included |
| AI | Can be added; price to check with Microsoft | Paid per use to the AI company. Our estimate: well under a cent per lead |
| What you already pay for | Your Microsoft 365 covers staff sign-in | Nothing carries over |

- Before buying, confirm the license count with whoever sells you Microsoft 365. Basic Microsoft 365 doesn't include the features this uses.
- n8n can also run on your own server. The software is free, but the server, backups, and updates add roughly $50 to $150 a month, plus someone's time. Worth it only if you already pay an IT provider who manages servers.
- We tested n8n on our own computer, not on n8n's Cloud plan. It's the same software, but we'd re-run every test on Cloud before going live.

## Who keeps it running

This is the question that decides it.

Power Automate: someone comfortable in your Microsoft 365 account, often the person or outside IT provider who already looks after it. The automation runs on one named person's license, so decide who owns it and who takes over if they leave. Microsoft keeps 28 days of run history to check what happened.

n8n: someone on your staff learns a second tool and its login. One of the two AI models we used is a preview that the provider can retire at short notice. If that happens, someone swaps the model and re-runs the 37-message test before turning it back on.

What we'd do for your firm (Client fit): choose the tool that the person who will look after it already knows.

## What a person still approves

In both: a person deletes or merges leads, assigns a lead to a named person in the department, and marks when contact is made. The tool never does these.

A person adds any new place leads can come from. Until they do, Power Automate turns those leads away.

Power Automate: a department head reviews a drafted first reply and chooses: send the draft, write their own, wrong department, or not a fit. If no one answers in time, nothing is sent and the lead is marked overdue. A wrong reply can't reach a prospect without a person's OK.

n8n: a person picks the department for every lead the AI isn't sure about. No reply to the prospect is built yet, so nothing reaches a prospect at all.

## What happens when it breaks

Power Automate: a breakdown raises an alert naming the lead, so it doesn't sit unnoticed. A slow approver is not treated as a breakdown; the lead is marked overdue and no alarm goes off. In our sample the alert lands in the Power Automate approvals list, because our test account has no mailbox. For your firm it would be an email from your own mailbox to whoever looks after the automation (Client fit; the email itself wasn't tested).

n8n: if the AI fails, the lead goes to a person instead of being lost. Every saved lead carries the reference number of the run that made it. But if a run gets stuck, it is stopped after 60 seconds, the form gets an error, nothing is saved, and nobody is told. Someone would need to check the run list, or an alert would need to be added.

## Where the data lives

Power Automate: inside your own Microsoft 365 account, under the same sign-in and permissions as your files and email.

n8n Cloud: in n8n's service, a separate company. When AI reads a message, that message is also sent to the AI provider. Ask first where n8n stores data, and whether any of your client contracts limit where prospect information goes.

## Questions to ask before deciding

1. Do you use, or plan to use, a CRM such as HubSpot or Salesforce? If so, leads should go into it, and it may already handle part of this work.
2. Who looks after your Microsoft 365 today: a staff member, an outside IT provider, or no one?
3. Who will own the automation and its license, and who would take over if that person leaves?
4. How many leads arrive in a typical month, and how many don't clearly fit one department?
5. Is having AI sort those leads worth adding a second system, or can a staff member sort them for now?
6. Do any client contracts or regulations limit where prospect information is stored or who handles it?

## Decisions to make once you've chosen

1. Who decides which department gets a lead the automation can't sort?
2. Who approves first replies, and who covers when that person is away?
3. Who should be alerted when something breaks?

## Before any real leads

Both samples use made-up data and are not ready for real prospects until a few security steps are done:
- Power Automate: a stronger lock on the form's address. Right now the address itself is the password.
- n8n: unguessable form IDs, a note on the form asking people not to include sensitive details, a limit on how long leads are kept, and plain error messages that don't reveal anything about the system.

What we did not test: a real website (we sent test leads to each tool directly); real data or real traffic; n8n on the Cloud plan; Power Automate outside Microsoft's free developer environment (real use needs the paid licenses above); the "wrong department" and "not a fit" approval choices; the alert as an email.
