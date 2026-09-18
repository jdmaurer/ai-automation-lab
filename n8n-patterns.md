# n8n Patterns and Gotchas

Things learned the hard way. Append as they come up — the point is to not
relearn them.

---

## Data flow

**A lookup node replaces the item with what it found.**
Get row(s) outputs the table row on a hit and an empty `{ }` on a miss.
Neither is the data you sent in. Anything downstream that needs the original
must rehydrate it from a named earlier node:
`{{ $('NodeName').item.json.field }}`.

Symptom when you forget: a Switch routes to Fallback for no reason, and
inserts write nulls.

**Always Output Data** (node Settings tab) turns "found nothing" into a
testable empty item instead of a dead branch. Without it, a node with no
output stops the branch and nothing downstream runs.

**`$json` means the previous node's output.** To reach a specific node,
name it: `$('NodeName').item.json.field`. An IF node passes items through
unchanged, so `$json` after an IF is still whatever entered it.

**Webhook data arrives nested under `body`.** It's `$json.body.email`, one
level deeper than normal. A normalization node that reassigns fields strips
the wrapper, so everything after it is plain `$json.email`.

## Types

**Data Table `id` is a number** — n8n generates it. Comparing it with a
String operator in an IF node errors out.

**Surrogate vs natural keys.** `id` is the table's own row counter — a
surrogate key, meaningless outside the table, and renumbered on migration.
`external_id` is a natural key that came from the source system and travels
with the record. Filter and store on the natural key.

Using a surrogate key to *test existence* is safe (it never leaves the node).
Storing or exporting one is what breaks on migration.

**Counter columns must be typed number.** On strings, `+` concatenates:
`"2" + 1 = "21"`. The count goes 1, 11, 111.

**n8n Data Tables have no column defaults.** New columns are null on existing
rows. Handle it in the expression: `{{ ($json.count || 0) + 1 }}`.

## Nodes

**IF is for two outcomes; Switch is for more.** Switch needs a Fallback
Output set to "Extra Output" or unmatched items vanish silently.

**Update with no condition** is the n8n shape of `UPDATE ...` with no WHERE.
n8n refuses to run it. SQL will not refuse. Write the condition first, always.

**Only map the columns you intend to change on an Update.** Anything else you
map overwrites real data. Same warning applies to Upsert, which does not
compare values — it matches and overwrites whatever you gave it.

**Data Table has 12 operations**, not the three you'll use first:
Get, Insert, Update, Upsert, Delete, Dry Run (Delete), If row exists,
If row does not exist, plus five table-level actions.

`If row exists` is a **gate** — passes the item forward, returns no row data.
`Get + IF` is a **lookup** — returns the row. Pick by whether you need the
data.

## HTTP Request

**Import cURL fills every field including the secret.** Move the auth header
into a credential before saving. A credential is encrypted and does not
appear in a workflow export; a header row does.

**Response Format** decides how the body is parsed. JSON gives named fields;
Text collapses everything into one blob and breaks every downstream
expression. "Put Output in Field" only exists in Text and File modes, because
JSON mode uses the API's own field names.

**Never Error + Include Response Headers and Status** go together. Never Error
alone keeps the workflow alive but hands you `{ }` with no idea what happened
— which is the silent-success failure mode.

**Pagination:** `{{ $pageCount + 1 }}` for parameter-increment mode,
`{{ $response.body["next"] }}` for next-URL mode. Always set Max Pages while
developing — the loop runs until the stop condition is met, and some APIs
never return empty.

Build the request working first, look at the response, *then* configure
pagination. And note the failure mode: without pagination you get one clean
page and a green check with no indication anything is missing.

**Retries fix temporary problems only.** A 404 or 401 fails identically every
time. Retry On Fail is for 5xx, timeouts, and rate limits.

## Webhooks

**The HTTP method describes the incoming request, not your role.** A form
pushing data is always POST. GET on a webhook means someone is asking your
workflow for something.

**Respond mode must be set to "Using Respond to Webhook Node"** or the Respond
node runs and its output is discarded. Invisible under pin data, because no
real caller is waiting.

**Pin data bypasses the actual HTTP request.** It proves the logic; only a real
POST proves the response, the method, and the auth.

## Error handling, two layers

**Node level** (Settings tab): Retry On Fail, On Error (Stop Workflow /
Continue / Continue using error output), Batching.

**Workflow level**: a separate workflow with an Error Trigger. The
**Error Workflow setting goes on the workflow that fails**, not on the handler
— build the handler first so it appears in the dropdown.

Error Trigger only fires for **published** workflows. Manual test runs never
trigger it.

## Working practice

**Pasting n8n JSON onto the canvas builds nodes.** Faster than clicking for
anything repetitive. A workflow export is the same format: `nodes`,
`connections`, `pinData`.

**Ctrl+Z walks back the whole canvas history**, not one action. Not a safe way
to recover a deleted node mid-session.

**Test runs mutate Data Tables.** Reset to a known seed before any run that
counts as evidence, or "new" vs "duplicate" depends on test history rather
than logic.

**Never commit an n8n table export as seed data.** An export is live state
including test rows. The seed file is a fixed baseline.

**Excel destroys CSVs with range values.** `1-10` becomes January 10.
Open data CSVs in VS Code, not Excel — and never save from Excel.

**n8n's AI Assistant has proposed a "fix" that deleted a correctly-built node**
and reported success from a simulated run, not a real one. Check what an AI
fix actually changed, not just whether it claims success.

**When supplying paste-ready n8n fields, separate the field label from the field value.**
Put `Name` and `Value` in separate copy blocks. A combined label/value paste can
silently put the label into the actual value; the node may still execute while
grading or downstream matching fails.

---

## Course documentation defects — N8N102 Section 2

| # | Defect | Detail |
|---|---|---|
| D1 | 401 vs 403 | Step 1.6 checklist says missing auth returns 403; the tester table on the same page and the Grading Criteria both say 401. |
| D2 | Table named three ways | Created as `n8n102_course_orders` (2.1), referenced as `foundation_course_orders` (3.10), called `Orders` (stretch goal). |
| D3 | Undocumented required setting | "Wait for Sub-Workflow Completion is enabled" appears only in Troubleshooting; Step 3.8's build instructions never mention it. |
| D4 | Label drift | Step 3.2 says operation "Get Rows"; the reading calls it "Get". |

### N8N102 Section 1

| # | Defect | Detail |
|---|---|---|
| D5 | Batch size conflict | Loop Over Items: written instructions say 5, grading criteria says 10. |
| D6 | Missing expected values | FinalizePipeline expected values stated nowhere in the instructions — resolved by elimination testing. |


### N8N103 Section 1

| # | Defect | Detail |
|---|---|---|
| D7 | Unavailable model | Project 2 specifies `llama-3.3-70b-versatile`, but it was not available in the current Groq model selector. `openai/gpt-oss-120b` was used instead and all three graded tool tests passed. |
| D8 | Workflow-name drift | The Project 2 documentation step says to open `Section 2 - Feedback Agent`, although the exercise created `Section 1 - Feedback Agent`. |
| D9 | Wrong order-tool parameter in sticky-note template | The template says Order Status looks up by `customer_id`; the actual tool description and query parameter require `order_id`. |
