# CURRENT STATE

Last updated: 2026-09-20, evening session

## Where things stand

N8N102 complete (9/14). N8N103 complete. Certificates earned.

Rivertown Lead Intake v1 is DONE: built, live-verified via Postman,
exported, unpublished. 13 nodes. Deterministic routing with an
unknown-value fallback to review. Idempotency via external_id.

## Tonight's session (9/20)

n8n Cloud trial had ~2 days left. Ran a full preservation pass so the
expiry costs nothing:

- Workflow JSON re-exported and verified clean of secrets. Byte-identical
  to the 9/16 commit, confirming v1 was genuinely frozen.
- Data Table exported twice: 17-column version (includes n8n's id,
  createdAt, updatedAt) and 14-column version (own columns only).
  The 14-column file is the rebuild blueprint.
- N8N102/103 coursework workflows exported as reference material.
  Parked in Downloads, NOT repo material.

All migration files live outside the repo. Delete once rebuild is verified.

## DECIDED: self-host n8n, do not pay for Cloud

Evaluated let-it-lapse vs. monthly Cloud vs. self-host. Chose self-host.
Free, permanent, owned. Data Tables are available on self-hosted, so the
v1 design carries over intact. Once the export was done the trial deadline
stopped mattering, so there is no time pressure on this.

## CORRECTION: no university tenant exists

The master calendar's instruction to "check whether his university tenant
grants admin rights" is OBSOLETE. Josh is not employed by a university and
has no institutional email or Microsoft work/school account.

Do not build on a partner's or anyone else's credentials. Power Platform is
pure identity — there is no install-it-locally workaround, and work created
under someone else's login is neither portable nor honestly claimable.

Week 6 Microsoft access therefore has exactly one path: BUILD HIS OWN TENANT.
He is Global Administrator, controls self-service licensing, nothing can be
revoked. The M365 Developer Program route is separately closed — it now
requires a Visual Studio Pro/Enterprise subscription, which strategy
forbids buying.

This removes the dependency on anyone else's availability.

## NEXT STEP

Stand up self-hosted n8n.

1. Check Node version compatibility (running Node 24.19; n8n is strict
   about versions). If unsupported, use Docker instead.
2. Install and start. Keep the .n8n folder OUT of the repo — it holds the
   credential encryption key.
3. Import lead-intake-v1.json. Expect to repoint 4 Data Table nodes:
   the cloud table ID 1T1iVKk1PrQISwo0 will not exist locally.
4. Recreate the Header Auth credential by hand. Credentials never transfer.
5. Rebuild the Data Table from the 14-column CSV. Define 14 columns only —
   n8n supplies id, createdAt, updatedAt itself.
6. Verify green end-to-end before building anything new.

Then: Rivertown Lead Intake v2, adding an AI triage step. Case-study mode.
Requirement is stated, design questions not yet answered.

## Open findings to log at next closeout

- NormalizeLead has a field NAMED "=received_at" with a stray leading equals
  sign. Cosmetic today (values write correctly) but fix during rebuild.
- duplicate_count is blank on some rows and 0 on others. Blank and zero are
  not equivalent. Candidate line for limitations.md.
- n8n's Data Table CSV download offers different column sets depending on
  where it is triggered. Two exports of the same table will not match.
  Candidate entry for n8n-patterns.md (would be #7).