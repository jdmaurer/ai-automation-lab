# Website leads: two ways to build it

For: the owner of Rivertown Professional Services
Date: November 4, 2026
Prepared by: Josh Maurer

Based on two samples we built and tested in October and November 2026. Prices and features change; check before buying.

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

Both options cost $15 to $25 a month in licenses, so price won't decide this. Two things will: where your company email runs, and who on your staff will look after it.

Power Automate is Microsoft's automation tool. It fits best when your email runs on Outlook through Microsoft 365. It plugs into Outlook, Teams, and SharePoint, your staff sign in as they do now, your leads stay in your own account, and whoever manages your Microsoft 365 can control it with the same settings as everything else. In our sample, a department head approves each first reply, and you get an alert if something breaks. Sorting leads by department can be added.

n8n is an automation service that works with almost any app, including Gmail, Google Workspace, and HubSpot. It fits best when your email runs on Gmail or another service, or when you use Microsoft only for Word, Excel, and PowerPoint. In our sample, it already sorts each lead to a department, using AI for unclear messages and passing anything uncertain to a person, and you can switch AI companies whenever you like. It is a separate system with its own login, so someone learns it and looks after it.

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

This is what decides it.

Power Automate: usually the person or outside IT provider who already manages your Microsoft 365. It sits beside tools they already use, and Microsoft keeps a record of everything it did for the last 28 days, so problems can be traced. It runs under one named person's license, so it's handed over when that person leaves.

n8n: someone who learns n8n, a separate system with its own login. Every saved lead carries the reference number of the run that handled it, so problems can be traced, and you can switch AI companies whenever you like.

Both tools change over time. Microsoft is moving everyone to a new design screen and has retired license plans before. n8n updates often, and AI companies replace their services. Whoever looks after it keeps up with those changes and re-checks the test leads after any big one.

Our advice: choose the tool that the person who will look after it already knows.

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
2. Does your company email run on Outlook through Microsoft 365, or on Gmail or another service?
3. Who looks after your Microsoft 365 or other systems today: a staff member, an outside IT provider, or no one?
4. Who will own the automation and its license, and who would take over if that person leaves?
5. How many leads arrive in a typical month, and how many don't clearly fit one department?
6. Is having AI sort those leads worth adding a second system, or can a staff member sort them for now?
7. Do any client contracts or regulations limit where prospect information is stored or who handles it?

## Decisions to make once you've chosen

1. Who decides which department gets a lead the automation can't sort?
2. Who approves first replies, and who covers when that person is away?
3. Who should be alerted when something breaks?

## Before any real leads

Both samples use made-up data and are not ready for real prospects until a few security steps are done:
- Power Automate: a stronger lock on the form's address. Right now the address itself is the password.
- n8n: unguessable form IDs, a note on the form asking people not to include sensitive details, a limit on how long leads are kept, and plain error messages that don't reveal anything about the system.

What we did not test: a real website (we sent test leads to each tool directly); real data or real traffic; n8n on the Cloud plan; Power Automate outside Microsoft's free developer environment (real use needs the paid licenses above); the "wrong department" and "not a fit" approval choices; the alert as an email.
