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

Both options cost $15 to $25 a month in licenses, so price won't decide this.

If your firm already runs its email, Teams, and shared files on Microsoft 365, Power Automate is usually the easier choice. It's one more line on the Microsoft bill you already pay, your staff sign in as they do now, and whoever manages your Microsoft 365 can look after it too.

If much of your work runs outside Microsoft, n8n is usually the better fit. It works with almost any app, including Outlook, Gmail, and HubSpot, and you can choose which AI company it uses. It's a separate system with its own login and bill, so someone learns it and looks after it.

Most firms end up using the same tool for several automations, so choose the one that fits the rest of your work, not just leads. The questions at the end of this memo will help you decide.

## What each one does today

These are working samples, not finished products. Each one shows a different set of features.

Yes = built and tested in the sample. Can be added = not in this sample.

| | n8n | Power Automate |
|---|---|---|
| Receives each new lead within seconds and saves it | Yes | Yes |
| Keeps one entry when the same lead arrives twice | Yes. Notes the repeat on the original lead, so it isn't handled twice | Yes. Same |
| Records where each lead came from, such as your website or an event | Can be added | Yes, so you can tell which places bring in leads |
| Blocks leads from places you haven't approved | Can be added | Yes, so leads from unknown places are turned away |
| Decides which department each lead belongs to | Yes, with AI help for unclear messages | Can be added |
| A department head approves each first reply to a prospect | Can be added | Yes |
| Alerts someone if it breaks | Can be added | Yes |
| Emails the department head about a new lead | Can be added | Can be added |
| Sends the approved reply to the prospect | Can be added | Can be added |
| Puts each lead into your CRM, such as HubSpot or Salesforce | Can be added | Can be added |

Both need a few security steps before real leads (see the last section).

How they were tested:
- n8n: 37 test leads, 10 of them kept aside until the end so the system had never seen them. Two AI systems from different companies must agree before a lead is sorted. None went to the wrong department. 18 of 23 clear requests (78%) were sorted with no person needed; the rest went to a person, as designed.
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
- If you add more automations: n8n's monthly limit is shared across all of them, and the next plan up (Pro) is $50 a month paid yearly, or $60 month to month, for 10,000. One Power Automate license covers every automation its owner runs; another person who builds automations with these paid features needs a license of their own.
- n8n can also run on your own server. The software is free, but the server, backups, and updates add roughly $50 to $150 a month, plus someone's time. Worth it only if you already pay an IT provider who manages servers.
- We tested n8n on our own computer, not on n8n's Cloud plan. It's the same software, but we'd re-run every test on Cloud before going live.

## Who keeps it running

Power Automate: usually the person or outside IT provider who already manages your Microsoft 365. It sits beside tools they already use, and Microsoft keeps a record of everything it did for the last 28 days, so problems can be traced. It runs under one named person's license, so it's handed over when that person leaves.

n8n: someone who learns n8n, a separate system with its own login. Every saved lead carries the reference number of the run that handled it, so problems can be traced, and you can switch AI companies.

Both tools change over time. Microsoft is moving everyone to a new design screen and has retired license plans before. n8n updates often, and AI companies replace their services. Whoever looks after it keeps up with those changes and re-checks the test leads after any big one.

Our advice: choose the tool that the person who will look after it already knows.

## What the tool does, and what people decide

The tool handles the routine work on its own: it receives each lead within seconds, saves it, and catches repeats. n8n also sorts each lead to a department when its AI is sure.

People keep the decisions that need judgment:
- Choosing who in the department takes the lead
- Marking when contact has been made
- Deleting or merging leads
- Adding a new place leads can come from (until then, Power Automate turns those leads away)

Power Automate: a department head reviews a drafted first reply and chooses: send the draft, write their own, wrong department, or not a fit. If no one answers in time, nothing is sent and the lead is marked overdue. A wrong reply can't reach a prospect without a person's OK.

n8n: a person picks the department whenever the AI isn't sure. Approving first replies can be added.

## If something goes wrong

Power Automate: if a step fails, an alert goes to whoever looks after the automation, naming the lead by its form number, so nothing sits unnoticed. That includes a lead that couldn't be saved: the alert names it, so it can be found and entered by hand. A slow approver doesn't count as a breakdown; the lead is simply marked overdue. In our sample the alert arrives in Microsoft's approvals inbox; for your firm it would be an email from your own mailbox (not yet tested).

n8n: if the AI fails, the lead goes to a person instead of being lost. If a lead gets stuck, n8n stops it after 60 seconds so it can't hang. But a stuck lead isn't saved, and no one is told unless someone checks n8n's activity list. An alert like Power Automate's can be added.

## Where your data lives

Power Automate: inside your own Microsoft 365 account, protected by the same sign-in and permissions as your email and files.

n8n Cloud: on n8n's own servers, run by a separate company. When the AI reads a message, that message is also sent to the AI company. If you need your leads kept on your own equipment, n8n can also run on your own server.

## Questions to ask before deciding

1. Do you use, or plan to use, a CRM such as HubSpot or Salesforce? If so, leads should go into it, and it may already handle part of this work.
2. How much of your work runs on Microsoft 365: email, Teams, and shared files, or only Word, Excel, and PowerPoint?
3. Who looks after your Microsoft 365 or other systems today: a staff member, an outside IT provider, or no one?
4. Who will own the automation and its license, and who would take over if that person leaves?
5. How many leads arrive in a typical month, and how many don't clearly fit one department?
6. Is having AI sort those leads worth adding a second system, or can a staff member sort them for now?
7. What else would you like to automate in the next year or two?
8. Do any client contracts or regulations limit where prospect information is stored or who handles it?

## Decisions to make once you've chosen

1. Who decides which department gets a lead the automation can't sort?
2. Who approves first replies, and who covers when that person is away?
3. Who should be alerted when something breaks?

## Before real use

Before real prospects use either sample, a few steps remain.

Your part:
- Have your website form give each lead a random reference number.
- Add a note to the form asking people not to share sensitive details.
- Decide how long to keep leads.

Our part:
- Add any features you choose from the "Can be added" list.
- Add a password-style lock so only your website can send leads, and hide technical error messages from outsiders.

What we haven't tested yet:
- A real website form (we sent test leads straight to each tool)
- Real leads, or many at once
- n8n's Cloud plan (we used n8n's free self-hosted version)
- Power Automate on a paid license (we used Microsoft's free developer version)
- Two of the four approval choices: wrong department and not a fit
- The alert sent as an email

Before going live, we re-run every test on the systems you'll actually use.
