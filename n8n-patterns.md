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


---

## N8N103 Section 2 — additional gotchas

**Imported workflows can carry credential references that do not exist in the
recipient tenant.** The imported node may show an author's generic credential
name and fail with `Credentials not found`. Reselect a local credential that
actually exists. Also inspect required custom headers separately; imported
Academy exercises may need the local `X-Assessment-ID` restored.

**Use the error message to choose where to look.** A productive debugging path
is: failing node → exact error → Input panel → trace earlier in the workflow
until the field/configuration changes → fix one issue → rerun. The node that
throws the error may only be where bad upstream data is detected.

**Aggregate can turn many records into one list-bearing record.** With
`All Item Data (Into a Single List)`, 10 incoming records can become one output
record containing an array field such as `enriched_orders`. This is different
from merely using `.all()` inside an expression.

**`$('Node').all()` versus node output count.** `.all()` returns an array of
all n8n items from the named node for use inside an expression; it does not by
itself change a node from 10 incoming items to 1 outgoing item.
`.map(item => item.json)` transforms that array into an array of each item's
JSON payload.

### N8N103 Section 2 course/documentation defects

| # | Defect | Detail |
|---|---|---|
| D10 | Successful-execution saving default mismatch | Section 2 Question 3 expects the answer that successful production executions are not saved by default. The current n8n Cloud workflow settings showed `Save successful production executions: Default - Save`, and execution history contained both green successes and red failures. Treat as a course/version default discrepancy. |
| D11 | Slack stretch uses the wrong current payload | The optional Slack stretch places the formatting node after `ReportError` but gives expressions like `$json.workflow.name` and `$json.execution...`. `ReportError` replaces the current item with the Academy response, so the Slack fields render blank. Reference `$('TriggerError').item.json...` explicitly or branch from TriggerError before ReportError. |
| D12 | Wrong section number in Project 3 documentation step | The Fix Broken Workflow documentation instruction says to open `Section 5 - Fix Broken Workflow` even though the exercise is Section 2. |
| D13 | Missing AggregateOrders step is under-explained | Project 3's later issue list says SendToOrdersQueue referenced a deleted `AggregateOrders` node, but the documented Expected Flow omits AggregateOrders and the instructions never explain how to recreate the expected `enriched_orders` shape. Recreating AggregateOrders as Aggregate → All Item Data (Into a Single List) with output field `enriched_orders` restored the original expression and passed the Academy validator. |

## Added 2026-09-21/22 - self-hosting and v2 build

- Windows PowerShell blocks npm and n8n (.ps1 execution policy). Use npm.cmd and n8n.cmd; no security setting needs to change.
- The npm "allow-scripts" warning during n8n install was harmless. Test by starting n8n rather than pre-emptively allowing scripts.
- Data Table CSV export offers different column sets depending on where it is triggered.
- Data Table CSV EXPORT shifts datetimes by the local UTC offset (+5h observed). Stored data is correct; the export is wrong. Never re-import an export as a seed.
- Postman raw body must be JSON, not Text, or the webhook receives an unparsed string and validation rejects it (400).
- Browser Postman cannot reach a self-hosted localhost instance. Use the Postman desktop app.
- The workflow menu item is "Export JSON", never "Download".
- Copying a workflow within one instance keeps WORKING references to the original's table and webhook path. Nothing errors; it silently collides. Change both.
- Moving between instances breaks references loudly: table IDs and credentials don't exist on the new host.
- A Basic LLM Chain's output REPLACES the item. Rebuild lead fields after it with reach-back expressions like $('NormalizeLead').item.json.field.
- After adding table columns, insert nodes don't show them until the column list is refreshed (refresh icon next to "Values to insert").
- On Error: "Continue" sends failures out the normal output. Only "Continue (using error output)" creates a separate Error exit.
- A low-confidence answer (If false branch) is not an AI failure (Error exit). Different paths, different handling.
- Use $json when the field is already on the incoming item; reach back with $('NodeName') only when an earlier node dropped it.
- "Error fetching options" after repointing a Data Table node means the dropdown's source moved. Re-pick the column and condition; nothing is lost.

## Added 2026-09-22 (late session)

- Swapping a model node to a credential that cannot load the model list ERASES the selected model. Switching back to a working credential fills in n8n's default model (llama3-8b-8192), not the previous choice. Nothing warns you. After any credential swap, re-check the model and its options.
- Production executions (webhook calls from Postman) do not feed the editor's expression preview. The preview only uses runs made inside the editor.
- When a node fails and uses "Continue (using error output)", the Error exit passes the original input item through, so the lead's fields survive. A Basic LLM Chain's Success output replaces the item; its Error output does not.
- Retry On Fail lives on the node's Settings tab, and the export records retryOnFail true or false. Check the export to confirm a documented retry actually exists.
- A duplicated Postman request inherits the original's URL. Check the address before the first send (v2 requests copied from v1 still pointed at the v1 webhook).

## 2026-09-23 - Patterns from evaluation and the ambiguity gate build

- Long pastes can silently lose their ending (seen in the n8n expression editor and in the PowerShell console). After any long paste, scroll to the end and confirm the last line. For long text into PowerShell, download a file and append it with a short command instead of pasting.
- A blank field can mean "nothing to report" or "the data never arrived". An If condition like "is empty" passes in both cases, so a broken mapping can silently switch off a safety check. After adding a field, open the execution and confirm the field exists in the node output before trusting the gate.
- Adding a column to a Data Table does not add it to insert nodes that map columns manually. Each insert node needs the new column mapped, or it stays blank.
- In the Set node and Data Table mappings, the "=" or "fx" marker at the left of a value means expression mode. Without it, a {{ }} value is stored as literal text.
- The expression editor's Result panel shows "[Execute previous nodes for preview]" when no run data is loaded. That is normal and still confirms the {{ }} is being read as an expression.
- Publishing asks for a version name and description. Use them as the change log: what changed and what it is testing.
- Groq rate-limit errors appear in the chat model node's output ("Rate limit reached ... tokens per minute"). With retry on and the error output connected, the workflow still shows "Succeeded", so check routed_by (ai_failure) rather than execution status.
- Windows PowerShell blocks .ps1 scripts by default; use the .cmd versions (npm.cmd, newman.cmd, n8n.cmd) instead of changing the execution policy.
- PowerShell Set-Content -Encoding UTF8 adds a byte-order mark to the start of the file. Tools that read CSV headers (like Newman) can then misread the first column name. Use -Encoding ASCII for CSV data files with plain text.

