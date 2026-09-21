# Week 3 Log

## Monday 9.14.26 - Closed the quiz gaps, then finished N8N102

Started by fixing the gap from the previous session: three quiz topics that
got delivered as text instead of hands-on. Claude pushed back on my plan and
added a fourth - pagination - which I'd had zero exposure to and which turned
out to be the first graded question on the quiz. Good catch.

**cURL import.** Pasted a cURL block into a scratch HTTP Request node and
watched Method, URL, Send Headers, and Send Body all fill at once. The real
lesson wasn't the button - it was that the auth token lands as plain text in
the node. Built a Bearer Auth credential and moved it over. A credential is
encrypted and doesn't appear in a workflow export; a header row does. That's
the difference between a workflow you can push to GitHub and one you can't.

**Response Format.** Flipped Autodetect to Text and watched four named fields
collapse into one blob called `data` with escaped quotes everywhere. Flipped
back to JSON and they came back. Same API, same response - one dropdown
destroyed every downstream expression. Also learned Put Output in Field only
exists in Text and File modes, because JSON mode uses the API's own field
names. I figured that one out myself before Claude said it.

Never Error turns a 404 into data instead of a crash. But on its own it gives
you an empty `{ }` and no idea what happened - you need Include Response
Headers and Status alongside it to get the statusCode. Those two go together.

**Pagination.** The one I'd never seen. Forced JSONPlaceholder into pages with
`_limit=10`, then `{{ $pageCount + 1 }}` in a Pagination parameter, Max Pages
capped at 3. Three requests, 30 items, merged into one output. The downstream
node can't tell it took three trips.

The dangerous part of pagination: without it you get 10 clean records and a
green check and no indication that 90 are missing. It looks like success.

**Error handling, both layers.** Retry On Fail on a 404 - three tries, same
404. Retries fix temporary problems, not permanent ones. Then On Error set to
"Continue (using error output)" which puts a second labeled Error branch right
on the node. Then built a separate workflow with an Error Trigger.

Took me a couple of rounds to get the fire station analogy straight: the Error
Workflow setting goes on the workflow that FAILS, not on the handler. Build
the handler first so it shows up in the dropdown. And it only fires for
published workflows - manual test runs don't trigger it.

**Dropdown surveys.** Data Table has 12 actions, not the three I'd used. If
row exists is a gate that returns no data; Get + IF is a lookup that returns
the row. The quiz asks about the gate; the Section 2 exercise had me build
the lookup. Both right for their situation.

Then took the Section 2 quiz. Then the full course final - had to go back
through Chapter 2 and answer the questions, then a longer Part 3 test. Passed.
N8N102 certificate earned.

Updated LinkedIn with all the certificates from the last year while I was
at it.

N8N103 is next per the master calendar. N8N101 stays out of scope except
diagnostic sections - the Foundations badge isn't worth chasing when the
portfolio is what matters.

## Tuesday 9.15.26 - Lead Intake v1, first real portfolio build

Case-study mode, not step-by-step. Claude stated the requirement, I said what
I'd build, he confirmed or corrected.

Built it: webhook, normalize, validate, duplicate check, route by engagement
type, review queue fallback, and a response on every path.

THE DECISIONS I MADE AND WHY:

- `routed_to` stores a category, not a person. Staffing changes; editing the
  workflow every time someone is reassigned is not sustainable.
- Collapsed three identical Switch branches into one Insert node using
  `{{ $json.engagement_type.toLowerCase() }}`. Three identical nodes for
  hypothetical future divergence is speculative complexity. Claude had told me
  to build three; I asked why and he agreed with the simpler version.
- Duplicate tracking via a `duplicate_count` column instead of extra rows.
  More rows is more error-prone; a column most people ignore costs nothing.
  Claude's separate-table alternative would have meant two schemas and a
  manual join.
- Narrowed validation from six required fields to two. This is the one I'm
  most pleased with. I argued that a computer-generated ID almost never goes
  missing, while human-filled form fields go missing constantly - so the
  design was treating the common case as an exception. Claude agreed and we
  deleted an entire branch.

WHAT WENT WRONG AND WHAT I CAUGHT:

- Claude told me to delete a node that looked like a redundant duplicate.
  It wasn't. A lookup node replaces the item with whatever it found - empty
  on a miss - so deleting it meant everything downstream worked with `{ }`.
  Gwen routed to Fallback and her row wrote as nulls. Had to rebuild it as
  `RestoreLeadData`. I'd double-checked before deleting and should have
  trusted that instinct harder.
- Claude suggested Ctrl+Z to recover it, which would have unwound two hours
  of canvas work. Caught that one before running it.
- Told Claude he was wrong about the seed CSV not changing - he was thinking
  of his generated file, I was exporting the live table from n8n. Two
  different files. He'd conflated them.
- Type strictness: `id` is a number because the Data Table generates it.
  Comparing it with a String operator errors. Surrogate keys are numbers;
  natural keys you define should be strings.

ALSO CAUGHT: I was giving too much information at once again. Said so. The
correction landed - one step, then teaching in pieces alongside the clicking
instead of a page of reading first.

BUILT THE CASE STUDY FOLDER: `cases/rivertown-lead-intake/` with README,
decisions, limitations, test-cases, runbook, and the seed CSV. The decisions
file is append-only - every design choice with reasoning attached, so two
weeks from now I don't have to reconstruct why.

Exact stopping point: workflow complete and tested with pinned data. Case
study committed and pushed (36b352f).

Exact next step: reset the table, set webhook path and Header Auth, publish,
run all ten cases through Postman against the Production URL, record results.


## Wednesday 9.16.26 - Live-tested Lead Intake v1

Picked up at the exact next step from yesterday: prove the pinned-data build against a real published webhook.

Reset the n8n Data Table to the canonical 10-row seed baseline, changed the webhook path to `rivertown/lead-intake`, and added a dedicated Header Auth credential instead of reusing the n8n Academy key. The readable path is for documentation; the auth header is the actual access control.

Published temporarily and ran all ten Postman cases A-J against the Production URL. All ten passed:
- duplicate replay incremented Dana's `duplicate_count` from null to 1 without adding a row
- Training, Consulting, and Speaking routed correctly
- `Other` and unexpected `Retainer` values routed to review
- missing company and other blank optional fields were accepted
- missing `external_id` returned 400 and stored nothing
- Priya's same email with a new `external_id` was treated as a new request, confirming idempotency is keyed to the request ID, not the person

The live-test table ended at 18 rows. The fixed 10-row seed CSV remains the reset baseline.

After testing, unpublished the workflow, exported the exact tested version to `cases/rivertown-lead-intake/lead-intake-v1.json`, and checked the export for the credential secret before committing it. The secret is not in the repo.

Commits from the session:
- `a99f288` Record live Postman test results
- `aa2f695` Add tested Lead Intake v1 workflow export
- `b389e6d` Update Lead Intake case after live verification

Also updated the case README, limitations, and decision log so the portfolio now says what actually happened: Header Auth is configured, the workflow was live-tested, and it is currently unpublished rather than claiming a real production deployment.

Process lesson from today: group routine same-screen fields together, but keep real decision points separate. For PowerShell, one command per copy block.

Rivertown Lead Intake v1 is now through live verification. Next curriculum item: N8N103 — In Practice: AI, Testing and Best Practices.

## Thursday 9.17.26 - N8N103 Section 1 complete

Finished the first section of N8N103, including both hands-on projects, the
3/3 Practical Assessment, and the AI Introduction knowledge check.

PROJECT 1 — FEEDBACK PIPELINE

Built the full feedback pipeline: fetch one feedback item, classify it with a
Basic LLM Chain, force the classification into structured output, combine the
classification with the original message, generate a customer-facing reply,
and submit the result to the Academy endpoint.

The useful distinction here was small model vs larger model by task, not by
input length. Classification is constrained and cheaper; a customer-facing
reply needs more nuance.

The bigger lesson came from testing several items. The reply model confidently
invented things that were never in the source: a 24-hour reversal timeline,
personal follow-through, a location in the product UI, and a claim that the
request had been passed to the product team. Structured output solved the data
shape, but it did nothing to make the answer true. The prompt needs explicit
rules against unsupported procedures, policies, timelines, actions, and
commitments.

I also lost far too much time on a grading failure that turned out to be a
copy/paste problem. A field label had been pasted into the field value, so the
value previewed as `feedback_id FB-010` instead of just `FB-010`. The request
still returned HTTP 200, which sent us chasing the wrong theories. Permanent
process rule: field names and field values get separate copy blocks.

PROJECT 2 — FEEDBACK AGENT

Built a customer-service AI Agent with three HTTP tools: order status, customer
information, and product information. The agent decides which tool to call from
the conversation, and `$fromAI()` supplies the parameter it extracts from the
user's message.

The course called for `llama-3.3-70b-versatile`, but that model was not in the
current selector. Used `openai/gpt-oss-120b` instead and all three graded tests
worked:
- order status for `ORD-011`
- subscription/account lookup for `CUST-010`
- Enterprise License features and pricing

The Practical Assessment moved to 3/3.

Conceptually, the clean rule from this section is:
- known exact values → deterministic IF/Switch logic
- ambiguous language or unstructured content → AI classification/extraction
- adaptive multi-step work with tools → an agent
- structured predictable work → do not add AI just because you can

The knowledge check reinforced the same pattern: schedule + database + CSV +
Drive does not need AI; a required dropdown does not need AI; variable email
categories do; image/document understanding can; 429 rate limits call for
batching/waits plus retry; and prompt changes should be evaluated by comparing
before/after outputs rather than assuming a green workflow means quality is
fine.

PROCESS CORRECTION

I had to repeat an important point several times: the reason ChatGPT has the
course questions is so it can ask the relevant question while I'm doing the
matching thing in n8n. Asking me the whole set after the project is over
defeats the purpose. From here on, map the questions before the hands-on work
and weave them into the build at the relevant moment.

Also confirmed the pacing rule again: group routine same-screen changes when
there is no decision point. Slow down for new concepts or choices, not for every
field.

Exact stopping point: Section 1 complete. The optional Simple Memory stretch
was not done. The agent sticky-note documentation still needs to be added.
Next: finish that documentation, then begin N8N103 Section 2 — Testing &
Debugging, with its knowledge-check questions mapped into the hands-on work
before we start.


## Saturday 9.19.26 - Finished N8N103, and the debugging lesson mattered more than the certificate

Finished the rest of N8N103 today: Section 2 Testing & Debugging, Section 3
Workflow Organization & Best Practices, and the 20-question Section 4 final
exam. The course-complete screen is done.

SECTION 2 — TESTING & DEBUGGING

The retry exercise was straightforward: a flaky Academy endpoint, Retry On Fail,
and a final validation call. The useful rule is still that retries are for
temporary failures — 5xx, timeouts, rate limits — not permanent 401/404/config
problems.

The Error Workflow exercise was more useful. Built the separate Error Trigger
handler, linked it from the workflow that fails, and proved again that Error
Workflows fire on production/automatic failures, not manual tests. Added the
optional Slack placeholder stretch. That stretch exposed a real course defect:
the course puts the formatting node after ReportError but uses `$json.workflow`
and `$json.execution` expressions. ReportError replaces the current item with
the Academy response, so those expressions go blank. The correct version has
to reference TriggerError explicitly or branch from TriggerError before the
payload is replaced.

The broken-workflow project produced the most important learning of the day.
The imported HTTP nodes referenced credentials that did not exist in my tenant,
so "Credentials not found" correctly sent me to Authentication first. After
that, the Academy errors pointed directly to the missing X-Assessment-ID.

Then the final node referenced a deleted `AggregateOrders` node. ChatGPT sent
me into a roughly two-hour detour trying to replace it with
`.all().map(item => item.json)`. I kept asking how a certificate learner was
supposed to know that syntax when the course had not taught it. I was right to
push harder.

The clean diagnostic path was sitting in front of us:
- the expression said the missing node should provide one item's JSON field
  named `enriched_orders`
- the prior Merge produced 10 separate records
- therefore the missing step had to turn 10 records into one record containing
  an `enriched_orders` list
- that is exactly what the Aggregate node does

Recreated `AggregateOrders` with All Item Data (Into a Single List), output
field `enriched_orders`, restored the original expression, and the next error
became useful: the queued orders were missing `customer_name`,
`contact_email`, and `account_manager`.

That sent the debugging path backward to the Merge. Both inputs had
`customer_id`, but the Merge was configured for `customerId`. Changed it to
`customer_id`, reran, customer fields appeared, aggregated again, and the
validator returned success with `enrichment_verified: true` and
`orders_queued: 10`. Full workflow then ran green end to end.

The real debugging lesson is not memorizing fixes. It is:
**read the exact error → inspect the failing node's input → trace backward until
the data/configuration changes → fix one thing → rerun and let the next error
narrow the search.**

Also learned enough of the n8n expression model to read it without pretending I
need to write JavaScript from memory: `.all()` gathers all records from a named
node into an array; `.map(item => item.json)` walks that array and returns the
JSON payload from each record. Useful to recognize, but it was not the intended
fix for this exercise.

SECTION 3 — ORGANIZATION & BEST PRACTICES

Moved through this section very quickly. Most multiple-choice answers were
obvious from work we had already done, so I did not spend time reading every
page. The ideas worth carrying into future builds are:
- clarity
- modularity, but only after a boundary has earned it
- readability
- maintainability
- scalability
- deliberate publishing, monitoring, failure handling, and recovery

I do not need another study block for these. They belong as a quick architecture
checkpoint inside future builds. Documentation should explain why a decision
exists, assumptions and constraints, not just repeat what the node UI already
shows.

SECTION 4 — FINAL EXAM

Completed all 20 questions and reached the N8N103 course-complete page. The
exam reinforced RAG, human review, agents vs standard AI nodes, deterministic
rules before AI, pinned data behavior, Error Workflows, retry behavior, Router +
Worker, organization, publishing, governance, and execution-first debugging.

A few questions were useful because the wording exposed gaps rather than the
concept itself — "differed" vs "deferred," activation vs publishing, and why an
Error Workflow is linked in workflow settings rather than by a canvas line.

N8N103 is now complete. N8N102 was already complete. N8N101 remains
diagnostic-only; I am not spending time chasing the Foundations badge when the
portfolio and applied skill are the goal.

Exact next step: move to the Master Calendar's Week 6 Microsoft access gate —
test the free Power Apps Developer Plan / trial routes, document tenant and
licensing constraints, and create `microsoft-environment-decision.md` before
building Power Automate work.

## 9/20 — short session

Maybe 15 minutes of actual work, a lot of back-and-forth to get there.

Pulled everything off the n8n Cloud trial before it expires: workflow
JSON, data table twice (17-col and 14-col), coursework workflows for
reference. Workflow came back byte-identical to the 9/16 commit, so v1
really was frozen.

Decided to self-host rather than pay for Cloud. Claude had manufactured
a two-day deadline for building v2 before the trial died — I pushed on
whether that was real and it wasn't. Once the export is done, nothing
expires. Worth remembering: check whether a deadline is actually load-
bearing before reorganizing a night around it.

Also killed the university-tenant assumption that's been sitting in the
plan since the start. I don't have a university account. Week 6 is build
my own tenant, and I don't need anyone's help to do it.

Didn't start the self-host install — not enough time to finish it, and a
half-installed n8n is worse than none.