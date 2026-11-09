# Bluffside Handbook Helper — Setup questions for your Microsoft 365 admin

To plan the setup and give you an accurate licensing estimate, please answer the questions below about your Microsoft 365 environment. Answer what you can; we'll go through the rest together at the setup meeting.

## Licensing and environments
1. Which Microsoft 365 plans do your staff have, and does anyone already have a Microsoft 365 Copilot license? About how many staff will use the helper? Copilot Studio is billed by usage (Copilot Credits), except for staff with a Microsoft 365 Copilot license, so these answers set the estimate.
2. Who can create Power Platform environments? We recommend two for the helper: a development environment for changes and testing, and a production environment that staff use.
3. May we use Dataverse in those environments for time-off records, or do you prefer SharePoint Lists?
4. Who approves new apps in the Teams admin center? We'll ask them to approve the helper for your staff. They can also take it offline quickly if it's ever needed.

## Identity and access
5. Do field staff sign in to Teams on their phones with their work accounts? The helper identifies each person from that sign-in.
6. Should all staff see the same handbook, or do some groups need different documents? If different, which Microsoft 365 or SharePoint groups should see which documents?
7. Who approves time-off requests: one office manager, a small group where anyone can answer, or each person's manager?
8. Can you provide two test accounts (not real staff) for setup testing? We use them to confirm each person's requests are filed under their own name.
9. Which account should the request flow's connections (Dataverse and Approvals) run under? We recommend a dedicated service account Bluffside owns, so requests don't depend on one person's sign-in. During the build they run under the builder's account.

## Data and records
10. Where does the official handbook live today, and who approves changes to it?
11. How long should time-off records be kept, and who should be able to see them?
12. We recommend turning on Dataverse auditing (a log of who changed each record, and when) for the time-off table. It uses some of your Dataverse storage, so it needs your approval. May we turn it on?
13. Does your safety procedure require specific wording in an emergency message? The helper's current 911 wording is a placeholder until you confirm yours.

## Ongoing support
14. Who will look after the helper after handover? We'd like them to release approved changes themselves. That needs permission to import solutions into the production environment (for example, the System Customizer security role). Can they have it?
15. Which policies should the helper follow? For example, data loss prevention (DLP) policies for Power Platform connectors, or rules on AI use such as approved uses, content filtering, and logging.

## What you'll receive
- The helper, packaged as a managed solution ready to import into your environment: the agent, the request flow, and the time-off table.
- The handbook files.
- The 36-question test set and its results, written tests for the time-off request, the staff guide, and the maintenance guide.
- A licensing estimate once questions 1 to 3 are answered.
