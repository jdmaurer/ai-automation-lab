# Microsoft Environment Decision

Master calendar Week 6, Monday block. Decided 2026-09-29.

## Decision
Use my own Microsoft organization (`joshmaurer.onmicrosoft.com`, display name **jdmaurer Labs**) with a free **Power Apps Developer Plan** environment for Weeks 6-8. No money was spent.

## Result
| Item | Result |
|---|---|
| Organization | `joshmaurer.onmicrosoft.com`, created in 2024 for a Power BI Pro subscription that has since lapsed. One user; I am Global Administrator. |
| Paid products | None active. Power BI Pro shows Disabled; Microsoft Entra ID Free is active at no cost. |
| Developer environment | **Josh Maurer's Environment**, created 2026-09-29 through the Power Apps Developer Plan sign-up. Power Apps shows the banner "This is a developer environment and not meant for production use." Tables (Dataverse) and Flows are available. |
| Copilot Studio trial | Deferred to the start of Week 7 (see below). |
| Data | Synthetic only. The organization is separate from any employer or client organization. |
| Cost | $0 |

## Routes considered
| Route | Outcome |
|---|---|
| University account | Not available; I no longer hold an institutional account. |
| Personal Microsoft account (Gmail) | Not accepted. The Developer Plan requires a work or school account. [1] |
| Microsoft 365 Developer Program sandbox | Not eligible. Eligibility runs mainly through Visual Studio Professional or Enterprise subscriptions and partner programs. [2] The master calendar rules out buying Visual Studio Professional. |
| Microsoft 365 Business Basic free trial | Viable fallback. It creates a new organization, requires a credit card, and converts to paid unless recurring billing is turned off. [3] Not needed. |
| **Existing organization + Developer Plan** | **Chosen.** Work account with admin rights already in place; no card, no trial clock. |

## Limits to plan around
- **Capacity:** 750 flow runs per month and 2 GB of Dataverse storage. Not for production use. [1]
- **Inactivity:** developer environments unused for 30 days are disabled automatically. [1] Weeks 6-8 keep it active; after Week 8, open it at least monthly or accept the risk.
- **No Microsoft 365 apps license:** no Outlook mailbox, SharePoint, or Teams in this organization. Week 6 stores data in Dataverse instead of SharePoint Lists. The Week 8 inbox-triage block needs a decision: a Business Basic trial at that point, or a design-only treatment of the Outlook steps.
- **No Microsoft 365 Copilot license.** Not needed for the calendar.

## Copilot Studio timing
- The individual trial starts at sign-up, can be extended by 30 days when it expires, and agents keep working for up to 90 days after expiry. [4]
- Sources differ on whether a trial agent can be published live; confirm at sign-up. Week 7 needs build and test only.
- Sign-up requires a work or school account. [4] Sign up on the first day of Week 7, not earlier, so the trial covers the work.

## Things that took time (worth knowing for client setups)
- **Personal vs. work sign-in.** The browser offered my personal Microsoft account first, and the admin center refused it ("consumer users without business presence"). A private window, then a separate browser profile used only for the work account, fixed it.
- **Billing edits trigger a review.** Changing the billing account's name and address put the account "Under Review" for part of the day; purchases and some subscription actions pause during a review. It cleared the same day. Make billing edits well before any trial sign-up.
- **Organization legal name is locked.** On this billing account type the organization name on the sold-to address is not editable in the admin center; Microsoft Support has to change it.
- **Display names are cached.** After renaming the user, the admin center kept the old name until I signed out and back in. The environment takes its name from the display name at sign-up, so rename first.

## Fallback architecture
If the environment is disabled or access is lost: the n8n Lead Intake build (v2.7) remains the working implementation, and the Microsoft design is documented from Microsoft Learn plus the artifacts built so far. Second route: a Business Basic trial, which requires a card and converts to a paid plan when the trial month ends.

## Sources
1. [Power Apps Developer Plan](https://learn.microsoft.com/en-us/power-platform/developer/plan), Microsoft Learn (checked 2026-09-28)
2. [Microsoft 365 Developer Program FAQ](https://learn.microsoft.com/en-us/office/developer-program/microsoft-365-developer-program-faq), Microsoft Learn (checked 2026-09-29)
3. [Try or buy a Microsoft 365 for business subscription](https://learn.microsoft.com/en-us/microsoft-365/commerce/try-or-buy-microsoft-365), Microsoft Learn (checked 2026-09-29)
4. [Sign up for a Copilot Studio trial](https://learn.microsoft.com/en-us/microsoft-copilot-studio/sign-up-individual), Microsoft Learn (checked 2026-09-29)
