# Bluffside Handbook Helper — solution exports

Exported 2026-11-09 from Josh Maurer's Environment, version 1.0.0.1.

| File | Type | Use it for |
| --- | --- | --- |
| BluffsideHandbookHelper_1_0_0_1.zip | Unmanaged | The editable master copy: import into a development environment to make and test changes |
| BluffsideHandbookHelper_1_0_0_1_managed.zip | Managed | The release: import into the live environment staff use. It can't be edited there |

Solution checker (run on the managed export, 2026-11-09 9:55 AM): 0 issues (critical 0, high 0, medium 0, low 0). Screenshot: ../evidence/2026-11-09_solution-checker_1.0.0.1.png

## What's inside (both files)
- The agent, with its instructions, Web Search off, and the topics (Emergency, Escalate, Repair questions, plus Microsoft's system topics)
- The six handbook files, stored in the package itself. Same text as `../handbook/` (Windows line endings are the only difference)
- The tool "Submit time-off request" and the agent flow behind it
- The Time Off Request table: columns, choices and the key, but no rows. Requests filed in the lab stay in the lab
- Two connection references (Standard approvals, Microsoft Dataverse). Added to the solution at export: the first export attempt listed them as missing. They hold no sign-in; the importer picks or creates the connections
- The test set "Bluffside full regression v1" (36 questions)

## Scan (both files, unzipped)
Searched for: sig=, logic.azure.com, joshmaurer, onmicrosoft, gmail, Josh Maurer, password, secret, apikey, api_key, Bearer, token, @.
- One expected hit: the approver address in the flow's ApproveTimeOff card (the lab account standing in for Dana). For a client, this becomes the office manager's mailbox or a shared approvals group.
- "secret" matches only Microsoft's own table setting IsDataSourceSecret = 0.
- Nothing else: no web addresses with keys, no personal Gmail, no staff emails from the lab's test requests.
