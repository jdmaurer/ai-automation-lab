# Published policy-v3 baseline — November 17, 2026

**Export created, downloaded, inspected and preserved. Restore/import not performed or proven. No tests run.**

## Package

[BluffsideHandbookHelper_1_0_0_1_unmanaged.zip](BluffsideHandbookHelper_1_0_0_1_unmanaged.zip) is the original unmodified Microsoft solution archive, 126,545 bytes, SHA-256 `8ce49ef52feab9aa19539749735785620f72a23f7c5461e9b4b929f7e8d88de5`.

Source environment: `88301e40-6106-ee47-900c-67a24cbc121e`. Existing solution: `BluffsideHandbookHelper`, ID `90a43d55-5bd9-f111-a05d-000d3a367f8a`, version 1.0.0.1, unmanaged. Current version retained; optional solution checker off; no Publish all customizations, configuration edit, connection remap, import or new flow execution.

Josh authorized preservation/export and GitHub update only. Reference checkpoint: [publication commit](https://github.com/jdmaurer/ai-automation-lab/commit/75f0ea9e8976b4c32c7808d353a2123940bbea0a).

## Included configuration

| Component | Export identity / coverage |
|---|---|
| Driftless Inbox Triage | Solution workflow 094af357-1cdd-f111-84ea-000d3a367f8a; existing editor/runtime ID 53209c07-ca63-bcd9-c7f3-04b29c1f562a |
| Driftless Weekly Inbox Summary | 5712f23d-44e0-f111-84ea-000d3a367f8a |
| Driftless Frozen 30 Evaluation | 9ca55e5e-afe0-f111-84ea-000d3a367f8a |
| Classifier | 614118d4-6ca8-4344-b945-8659eb8bb3d8; current active prompt configuration and structured output |
| Reply drafter | e9c13e46-ec62-4cd4-b52f-b2f596db5821; current active prompt and approved pricing |
| Weekly explanation | 93a1dc08-e7e4-484e-98c6-0da214657570; current active prompt |
| Inbox log schema | jdm_table1, columns/choices/forms/views, Unique Message ID key on jdm_messageid; exported Message ID width 401 |
| Connection references | Dataverse and Outlook reference definitions; no working connection edits |

The solution already contains the earlier synthetic Bluffside agent, handbook assets, time-off flow/table and approval reference. They remain in the original archive to avoid restructuring the working solution for this checkpoint. **This is a mixed-solution recovery package, not a standalone Driftless-only deployment.** A full-package import can affect those components too.

The archive has 130 members. [Member inventory](archive-members.json) records each path, byte length and SHA-256. Readable Driftless workflow copies and [active AI prompt configuration](ai-models-active.json) are extracted for inspection; the untouched ZIP is the import artifact. [Export inspection](export-inspection.json) preserves workflow states, table/key details and references.

## Verification boundary

Power Automate displayed “Solution \"Bluffside Handbook Helper 1.0.0.1\" exported successfully.” The subsequent download-control call timed out and browser control reset. No UI retry followed. The newly downloaded file was found at Downloads/BluffsideHandbookHelper_1_0_0_1 (1).zip, copied without changing its bytes, and all archive members were read and hashed.

[Static configuration comparison](configuration-verification.json) confirms:
- both flows' classifier and non-Support drafter input parameter sets match the published reference;
- main completion-priority action and full helper Scope match after normalizing the export's `host.connectionName` versus designer `host.connection` serialization key;
- classifier instructions match the saved/reopened wording after rendering the input token and normalizing whitespace;
- weekly definition includes the selected-week window, metadata query, retrieval-completeness guard, category/review counts, explanation prompt and unsent Outlook draft output.

No model call, prompt preview, workflow/mailbox/full-30 run, scorer, owner rating, failure injection, import or restore test occurred. No new runtime, quality or overall release pass is established.

## Dependency and recovery boundary

The export UI explicitly listed **AI Solution default templates**, unique name `msdyn_AISolutionDefaultTemplates`, version **202608.1.4.1**, as required in a target environment. The archive's solution.xml has an empty MissingDependencies element; retain the UI prerequisite rather than interpreting that empty element as universal portability.

This is a configuration export. It does not back up the live Outlook mailbox/drafts, Dataverse tracking/review rows, existing authenticated connections or cloud run history. Earlier evaluation exports and failed results remain separately preserved in the repository. A credential-value pattern inspection found no populated token/password/private-key values; this is not a comprehensive security audit.

For a later authorized recovery:
1. Keep the original ZIP and compare its SHA-256 with this record.
2. Use an isolated development environment with Dataverse, AI Builder/prompt capability, appropriate licensing/permissions and the listed managed dependency. Review mixed-solution impact before any full import.
3. Import as unmanaged; map references only to authorized target connections. Existing Driftless references use `new_sharedcommondataserviceforapps_e6f66` and `new_sharedoffice365_a7390`; other references belong to the mixed solution.
4. Inspect imported definitions and all prompt inputs before activation. Confirm imported flows are disabled until deliberately enabled; never assume import leaves triggers off. Point any later failure copy at synthetic/isolated resources and keep the existing working flows intact.
5. Restore/import behavior remains unverified. No instruction here authorizes an import, automatic trigger activation, send or test.

## Preserved policy and history

[Order-change policy v3 and accepted limitation](../../policy-v3-order-change-2026-11-16.md) are unchanged: identified existing-order changes require Urgent + manager review regardless of timing. Contact-only updates may still be misclassified as Support/change true and unnecessarily escalated, with existing eligible Support acknowledgment routing. Josh accepted this noncritical limitation.

All earlier formal/targeted failed runs, raw outputs, scores, frozen inputs, scorers, contracts and blank owner forms remain unchanged. E remains 4/5 exact and 3/3 tested order-change outcomes; formal v1/v2 FAILs are not relabelled. No owner judgments supplied.

[Protected evaluation file manifest](preserved-evaluation-files.json) binds the pre-export Git blob identities. This baseline is a preservation milestone, not a release acceptance claim.
