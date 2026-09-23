# Limitations — Rivertown Lead Intake v1

What this workflow does not do, and why. Written for a client-facing
"not suitable for" statement.

## Scope

- **Form intake only.** The shared inbox described in the case is out of
  scope. Email arrives as unstructured text and requires a model to read it;
  that is a separate case with its own controls.
- **Currently unpublished after live verification.** The webhook path is
  `rivertown/lead-intake` and Header Auth is configured. It was published
  temporarily for Postman testing with synthetic data, then unpublished.
- **Synthetic data only.** Rivertown is a fictional 30-person B2B consulting
  and training firm. No real prospect data has been processed.

## Known gaps

- **No alerting.** The review queue is pull-based — someone must check it.
  Nothing notifies a consultant that a lead is waiting.
- **Duplicate detail is not retained, only a count.** `duplicate_count: 3`
  cannot say when the resubmissions arrived or whether their content differed.
  If a prospect resubmits with a corrected email, that correction is not
  captured.
- **The duplicate branch holds the stored row, not the incoming submission.**
  It can detect that a resubmission happened but cannot compare it against
  what was originally received.
- **Submissions without `external_id` are rejected, not stored.** Duplicate
  status for such submissions would be indeterminate rather than merely
  unknown — two identical blank-key submissions cannot be proven the same or
  different. See decisions.md D9.
- **No enrichment.** Company size and industry are taken as submitted. No
  external lookup.
- **Single-table design.** Leads, companies, and routing decisions all live in
  one Data Table. Adequate at this volume; a relational model would be
  required if companies needed their own lifecycle.

## Operational notes

- **Test runs mutate the table.** Verification requires resetting to the 10
  seed rows first, or "new lead" versus "duplicate" depends on test history
  rather than on logic.
- **No rollback beyond manual row deletion.** There is no undo for a bad
  insert.

## Not suitable for

Regulated data, decisions with legal or financial consequence, autonomous
outbound contact, or any workflow where a missed lead causes material harm.
This is a low-risk intake and routing workflow with human review on every
ambiguous path.

## Added 2026-09-21/22

- Python task runner is not installed on the self-hosted instance: no Python in Code nodes.
- duplicate_count is blank on some rows and 0 on others. Blank and zero are not equivalent.
- In v2, rules-routed rows have a blank routed_by. Blank means "rules" (deliberate, to keep the verified InsertRoutedLead unchanged), not "unrecorded".
- The X-API-Key webhook secret is reused from the Cloud era. Acceptable on a localhost-only instance; rotate before any public exposure.
- n8n shows timestamps in Eastern time (its default); the operator is in Central. Stored instants are correct; one setting would fix the display.
- v2's AI Error path (model unavailable or unparseable answer) has not yet been tested with a deliberate failure.
- v2 has been tested on two AI cases only (Ingrid, Desmond). No frozen evaluation set yet, so no accuracy claim is supported.
- Category definitions are assumptions for this synthetic case, not client-confirmed.
- Leads with an empty message that reach the Fallback path have not been tested.

## Added 2026-09-22 (late session)

- RESOLVED: the v2 AI Error path is now tested with a deliberate failure (fake credential). Lead kept, 200 returned, routed_by ai_failure.
- Only the "key rejected" failure was tested. An unparseable model answer (schema failure) has not been forced.
- The evaluation set exists (27 cases) but has not been run. No accuracy claim is supported yet.
- Evaluation labels come from one labeler. No inter-rater reliability measured.
- With 17 Yes cases, each miss moves the usefulness score about 6 points. The threshold is a rough reading, not a precise measurement.
- Retry fires on every error, including non-transient ones like a rejected key, which adds about 2.5 seconds before the lead reaches review.
