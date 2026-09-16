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

