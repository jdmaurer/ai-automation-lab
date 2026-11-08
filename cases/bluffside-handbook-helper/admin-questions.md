# Bluffside Handbook Helper — Questions for the client's Microsoft 365 admin

Draft 2026-11-08, for Josh's review. These are the things the lab couldn't settle because they depend on the client's tenant. Ask them before quoting a rollout.

## Licensing and access
1. Which Microsoft 365 plans do staff have, and does anyone already have Copilot or Copilot Studio licenses?
2. Who can create environments and solutions in Power Platform? Can we have our own environment for Bluffside's helpers (development and production)?
3. Is the Dataverse table allowed in that environment, or do you prefer SharePoint Lists for request records?
4. Who can publish an agent to Teams, and who approves new Teams apps?

## Identity and permissions
5. Do field techs sign in to Teams on their phones with their work accounts? (The helper knows who's asking from that sign-in.)
6. Should everyone see the same handbook, or do some groups need different documents? If different, which SharePoint groups match?
7. Who should approve time-off requests: one office manager, a shared mailbox, or each person's manager?
8. Is there a second test account we can use to check that one person can't file for another?
9. Which service account should the request flow's connections (Dataverse and Approvals) run under? In the lab they run under the builder's account. In your tenant they should run under an account Bluffside owns, so requests don't depend on one person's login.

## Data and records
10. Where does the official handbook live today, and who owns changes to it?
11. How long should time-off requests be kept, and who can see them?
12. Is Dataverse auditing on (or can it be turned on) for the requests table?
13. Are there words or topics your safety procedure requires in an emergency message? (Our 911 wording is a placeholder for your procedure.)

## Running it
14. Who maintains the helper day to day after handover, and how much admin access will they have?
15. Which Microsoft 365 data loss prevention (DLP) policies apply to Power Platform connectors here?
16. Any rules about AI features in your organization (approved uses, content filtering, logging) that we should follow?
17. What's the process if the helper has to be switched off quickly?

## What we'll bring
- The exported solution (agent, flow, table) and the handbook files.
- The 36-question test set and results, the user guide, and the maintainer guide.
- A licensing estimate once questions 1 to 4 are answered.
