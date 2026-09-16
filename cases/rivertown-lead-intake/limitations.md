# Limitations — Rivertown Lead Intake v1

What this workflow does not do, and why. Written for a client-facing
"not suitable for" statement.

## Scope

- **Form intake only.** The shared inbox described in the case is out of
  scope. Email arrives as unstructured text and requires a model to read it;
  that is a separate case with its own controls.
- **Not published, no authentication configured.** The webhook path is still
  the generated GUID and Authentication is None. Both must change before this
  is exposed.
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
