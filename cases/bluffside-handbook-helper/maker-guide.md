# Bluffside Handbook Helper — Guide for the person who maintains it

This guide shows how to keep the Bluffside Handbook Helper running: update the handbook, change its rules, test each change, and switch it off if needed.

For: Dana Lindgren, Office Manager, who is trained to look after the helper, and the builder.

Version 1.0, November 2026. Owner: Dana Lindgren. Builder: Josh Maurer.

## What's in the box

Everything sits in one Power Platform solution, "Bluffside Handbook Helper" (publisher jdmaurer Labs, prefix jdm), so it exports and moves as one package.

| Part | What it does | Where |
| --- | --- | --- |
| Agent "Bluffside Handbook Helper" | Answers from the handbook files only; Web Search off | Copilot Studio > Agents |
| Instructions | The rules: answer from Current policies, name the policy, refuse and hand off, the 911 line | Agent > Overview > Instructions. Handover copy: `agent-config/instructions-v2.md` |
| Knowledge | Six handbook files, including one marked REPLACED on purpose | Agent > Knowledge. Handover copies: `handbook/` |
| Topics | Fixed scripts: Emergency (911), Escalate (hand-off to Dana), Repair questions (service manager) | Agent > Topics. Handover copy: `agent-config/topics.md` |
| Tool "Submit time-off request" | Files a request; email and name come from the sign-in | Agent > Tools (open it from the Tools list, or its inputs don't show) |
| Agent flow "Submit time-off request" | Checks for a missing email, checks for a duplicate, saves the request as Pending, replies with the ID, sends Dana an approval, records her answer | Copilot Studio > Workflows |
| Table "Time Off Request" | One row per request; key: one request per person per first day | Power Apps > Tables |
| Test set "Bluffside full regression v1" | 36 questions with expected answers and two test methods (AI graders that score each answer) | Agent > Evaluation. Handover copies: `evaluation/` |

How the request works, end to end: `action-contract.md`.

## Where changes are made

Make every change in a test copy first. The client's tenant has two environments: a development one, where changes are made and tested, and the live one staff use. Once a change passes the test set (below), you export the solution and import it into the live environment as a managed solution (steps in "Moving a change to live," below). Nobody edits the live helper directly, so staff never see a half-finished change.

## Changing the handbook

1. Edit the policy file. Give it a new version number and today's date.
2. In the development copy, upload it under Knowledge and remove the old version. Keep the old file in your handover folder in case you need it back.
3. Wait for the new file to show Ready.
4. Add or update test questions for the change, then run the test set (below).
5. Move the change to the live helper (steps in "Moving a change to live," below).

## Changing the rules (instructions or a topic)

- Change one thing at a time, then run the full test set (below), not just the questions near the change. A change can shift answers you didn't expect. Example: "Can I expense a new wrench?" passed one day, and the next it got the Repair topic's "ask your service manager." The fix was one added line in the Repair topic's description: not for buying, expensing, or getting reimbursed for tools.
- Every refusal must name who to ask: Dana or the service manager. A refusal that names no one counts as a failed test.

## Changing the request flow (for the builder)

- Save draft after each finished card, then Publish.
- Every "Respond to the agent" card must send the same outputs with the same descriptions, or Publish fails with "The schema definitions for actions with same status code must match."
- If Publish shows "instanceUrl is undefined": Save draft, refresh the page (F5), then Publish. Don't click "Recover flow" if you've saved since; it brings back an older copy.
- Make every question the tool asks required. Copilot Studio handles a skipped optional question badly: it keeps asking. To collect something optional, like a note, use a topic with two buttons ("Add a note" / "No note").
- After any flow change, run the request tests by hand (new request, duplicate, approve, decline, no note; listed in test-cases.md). The 36-question test set doesn't cover the request flow.

## Testing before you release a change

1. Go to Agent > Evaluation, open "Bluffside full regression v1," and run it.
2. Read every reply, not just the scores. The test methods make mistakes; in the handover run they marked two correct answers as wrong.
3. Release only if every answer matches the expected answer in the test set. Never release if an emergency question gets anything but the 911 message, if a question gets an answer it should have refused, or if the flow changed and the request tests fail.
4. Rows that hit a rate limit didn't run. Ask those questions by hand.

## Moving a change to live

Do this once the change passes the test set. You need permission to import solutions into the live environment (for example, the System Customizer security role). Your Microsoft 365 admin grants it once.

Package the change, in the development environment:
1. In Power Apps (make.powerapps.com), check that the environment name at the top right is the development one. Then select Solutions and open Bluffside Handbook Helper.
2. On the Overview page, select Export, then Publish, then Next.
3. If a list of missing components appears, select Add to solution. These are the request flow's connection references: labels that say which sign-in the flow uses, not the sign-ins themselves. The package needs them.
4. Leave the suggested version number. It's one higher than the last release, and the live environment only accepts a higher number.
5. Choose Managed, select the Run solution checker on export checkbox, and select Export.
6. When the green bar says the export succeeded, select Download.
7. Select Export, then Next. Change the version number to match step 4, choose Unmanaged, and select Export. Download this file too.
8. Save both files in the handover folder. The managed file is the release that goes live. The unmanaged file is the editable source copy. If the development environment ever needs to be replaced (for example, after an accidental deletion or a long period without use), import this file into the new environment to restore it.
9. Check the result in the Solution checker card on the Overview page. It appears a minute or two after the export. Don't release with a critical or high issue; fix it in the development copy first.

Install it, in the live environment:
10. In Power Apps, switch to the live environment (check the name at the top right), select Solutions, then Import solution. Select Browse, choose the managed file, and select Next.
11. If this is an update, a yellow bar says the package contains an update for a solution that's already installed. Select Next.
12. On the remaining screens, keep Upgrade (the default), select or create Bluffside's service-account connections for Microsoft Dataverse and Approvals, and leave "Enable plug-in steps and flows included in the solution" selected. Then select Import.
13. When the import finishes, open Copilot Studio, switch to the live environment (bottom-left), open Bluffside Handbook Helper, and select Publish. Staff see the change once it's published.
14. From a test account in Teams, ask one handbook question and one emergency question. Each reply should match its expected answer in the test set.
15. If the request flow changed, file a test request from the same account, using a first day off you haven't used in testing before (the helper refuses a second request for the same first day). Check that the approval arrives in Approvals, then decline it so it doesn't stay Pending.

## Watching it

Check these once a week:
- Requests: the Time Off Request table. Any request filed more than a week ago and still Pending needs an answer in Approvals. Staff ask at least 2 weeks ahead (HB-01), so a weekly check leaves time.
- Failed runs: the flow's Overview tab, "28-day run history." A red run means something went wrong with a request. Open it to see which step failed. If the failed step is EmailMissing, the sign-in is broken; contact your Microsoft 365 admin.
- Conversations: Agent > Activity. Questions people ask often that aren't in the test set become new test questions.

## Turning it off

- Stop the request action only: Agent > Tools, then turn off the Enabled switch on the "Submit time-off request" row. The helper keeps answering handbook questions.
- Stop the whole helper: ask your Microsoft 365 admin to block the app in Teams.
- Undo a bad change: in the development copy, restore the earlier version (the handbook file, instructions, or topic from your handover folder), run the test set, and release it with the next version number. The live environment doesn't accept an older version number, so a change is undone by releasing a corrected version. If staff are affected in the meantime, use one of the two options above.

## Known limits

Full list in limitations.md. The limits you'll notice day to day:
- Staff aren't notified when a request is approved or declined; Dana tells them. Can be added.
- Staff can't change or cancel a request in the chat; they ask Dana.
- Overlapping requests (for example, the 17th to 19th, then the 19th) are both filed, and Dana sees both and decides. An overlap check can be added.
- Requests have no note field; staff give Dana any details directly. Can be added.
- The AI chooses which fixed script (topic) to use, and that choice can vary between runs. That's why every change gets the full test set.
- Microsoft's content filter can block a message outright, so staff see an error instead of the hand-off to Dana. In testing it happened once, on an attempt to override the helper's rules.
