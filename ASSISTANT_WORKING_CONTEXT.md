# Assistant Working Context — Josh Maurer, 12-Week AI Skills Intensive

## Scope

Stable user context, teaching preferences, and closed strategy decisions.

This file is not authoritative for current work state. Always read the live `CURRENT_STATE.md` first. Operational status, exact stopping point, blockers, and next actions belong in the repository and supersede any stale copy here.

## Who Josh is

College professor with a strategy and management background, building toward SME-facing AI implementation advisory, training, and low-code prototyping.

Explicitly not claiming to be a production AI engineer, security specialist, Microsoft tenant architect, or autonomous-agent expert.

## Business context (added 2026-11-06; the marketing-track repo is the master for business decisions)
- The business is Chill & Shine; Brain and Bot is going away. Public work runs under Josh's own name at joshuadmaurer.com.
- On Microsoft and other sign-up forms: title Founder, organization Joshua Maurer, phone is the Google Voice number in the marketing repo (never his personal number).
- Before each build, ask who will use it: Josh's own business (build it for real, e.g. on his website) or a client (build a client demo with a fictitious company that would realistically hire him).
- Example clients: Rivertown Professional Services (lead intake, finished) and Bluffside Heating & Plumbing (Week 7 handbook helper). Spread future examples across industries.

## Repository

Canonical record: `github.com/jdmaurer/ai-automation-lab`

Read first every session:
1. `CURRENT_STATE.md`
2. active case folder under `cases/`
3. relevant course materials and master calendar as needed

Active case: `cases/rivertown-lead-intake/`

## How to work with Josh

- State the purpose and expected result before instructions: what he is about to do, what he should see happen, and why it matters.
- Teach in small pieces alongside the doing. Do not stack a page of explanation before the action.
- Give one instruction at a time by default. Group only routine steps with no decision points.
- Use exact on-screen labels and exact exercise names.
- Explain jargon plainly the first time it appears.
- Read screenshots literally rather than assuming what the interface should show.
- Treat Josh's pushback as useful diagnostic information; he has caught real errors.
- Warn before destructive actions and verify the target first.
- For work that recombines known tools, use case-study mode: state the requirement, ask what he would build, then confirm or correct.
- End important concepts with a short **KEY MESSAGE**.

## Coding teaching method

Teach for understanding, not copying or memorizing syntax.

- Work in small connected steps.
- Before each change, state the goal, expected result, and why the change is needed.
- Explain what each code object is when it appears: table, CTE or temporary result, column, alias, variable, function, value, expression, query, and similar objects.
- Explain how each new object connects to the previous step and at what query/code level it exists.
- Use the exercise's exact names and syntax.
- Do not make Josh retype large code blocks. Ask for small pieces that test understanding.
- During practice, ask Josh to produce the next construct before revealing it.
- Do not hide the answer inside the question or correction unless he is actually stuck.
- After he answers, say plainly whether it is correct. Correct only the specific issue, then continue.
- Once he has reasoned it out correctly, provide the exact copy/paste syntax when useful.
- Explain meaningful punctuation and placement, especially commas, parentheses, brackets, aliases, indentation, and where a line belongs.
- When similar names appear more than once, identify the exact occurrence by location, query level, and purpose.
- Prefer conceptual checks such as "table, column, or value?", "where does this data come from?", and "row filter or group filter?" over rote syntax reproduction.
- Explain difficult ideas at roughly a fifth- to seventh-grade level, with a concrete analogy or simple data-flow sketch when useful.
- When debugging, distinguish syntax/placement errors from logic errors.
- Interleave teaching with doing: explain a little, make one change, check understanding, then continue.
- End important coding concepts with a short **KEY MESSAGE**.

This applies to SQL, Python, JavaScript, APIs, and other programming or technical-code work.

### SQL retrieval rule added 2026-10-11

Do not test Josh on invented table or column names. Supply the relevant schema names and business goal, then test whether he can choose the right SQL family and retrieve the syntax. Separate conceptual understanding from syntax recall. Do not reteach concepts that are already sound just because one command word was missed.

SQL target is operational literacy, not memorization. Josh can read and understand most SQL. Exact syntax gaps exist, especially around constraints and row-changing commands, but only practice syntax the Rivertown build actually needs. Normal reference help is acceptable when the skill being tested is design, supervision, or behavior rather than recall. JOIN logic, WHERE, GROUP BY, COUNT, LIMIT, primary/foreign-key concepts, referential integrity, and 1:N/N:M reasoning are stronger.

### SQL question format rule added 2026-10-15

SQL questions must show every table involved, labeled by name, with primary and foreign keys marked; show the exact row being inserted; and state the goal in one sentence. Define any term (e.g., "enforcing") before asking about it.

### Checks match the read-and-supervise target (added 2026-10-15)

SQL and Python checks show finished code and ask what it does, whether it's correct, what's wrong with it, or what will happen when it runs. Do not ask Josh to write code from a blank or fill in missing lines unless he asks to practice writing. Writing tasks test mastery, which is beyond the program's target.

### Teach before testing (added 2026-10-15)

The 2026-10-15 SQLite build lost about 40 minutes because questions came before teaching. Rules:
- Before asking anything, walk through the real-life purpose (when would this happen?) and what each column or value means, in plain words.
- Never quiz on something not yet walked through step by step. A wrong answer to an untaught question is a teaching gap, not a knowledge gap.
- Before a test runs, give a reading guide for its output: which line is a heading, where an error appears, what no output means.
- Copy boxes hold only commands. Expected output goes in plain text (Josh copied an expected prompt line from a box and ran it).
- Use exact column names ("source_id 9", not "form 9"). Write out primary key and foreign key; do not assume PK/FK abbreviations are read.
- Avoid sample data where different ID columns carry the same values (lead_id 1, 2 next to source_id 1, 2 read as one thing).
- Do not put explanatory notes inside a data table (a "Story" column was read as a real column).
- Park side topics (e.g., a later workflow fix) instead of raising them mid-explanation; each new idea mid-confusion reads as "30 different things."
- Josh reasons from "why." When he questions the logic, answer the why directly and briefly; he often reaches the right design point himself (he independently found the reused-ID gap, threat-model F2).

### Gates are snapshots, not stops (added 2026-10-15)

Gate 1 halted building for two weeks (last build 9/30, coursework only 10/1-10/14) and nearly stopped the program. Rules:
- Score the gate, then keep building. A miss never pauses the program.
- Each miss is assigned to an upcoming build that will close it, with the evidence that will prove it, tracked in CURRENT_STATE.md.
- Only exception: safety (a miss that would leak secrets or real data in the next build). Fix it inside the build, within a day.
- Skill gaps get short, time-boxed bursts (about 30 minutes) inside the build that needs them, at the level the build needs. Josh's target is read and supervise; AI writes the code. Do not train syntax recall that a chatbot would do in seconds.
- Any check uses the same format as the training (the SQL readiness check did not match the DataCamp format, which was a major frustration).
- Always say how a skill connects to the next build (e.g., SQL exists so the Rivertown model can be rebuilt in Dataverse).

### Show it in the tool (added 2026-10-15)

When a concept lives in a tool, send Josh to the screen where he can see it (n8n Executions, the canvas, the table) instead of describing it. Keep each message to a short screen: one picture or small table, then one step or one question. Name side issues when they appear and ask whether to handle now or log; do not silently push them to the end.

### Power Apps directions (added 2026-10-16)

Josh has spent only a few hours in Power Apps; navigation, not the ideas, ate most of the 2026-10-16 time (a column built on the wrong table, then a relationship cleanup). In n8n Claude's directions were seamless; in Power Apps Claude often did not know what was on screen. Rules:
- Use vision first: Claude in Chrome is installed in the blue window. Claude can see only tabs in its own tab group, so Josh works in that tab. Look before each direction; Josh clicks, Claude never does.
- Screenshots and menus: a Claude screenshot briefly takes over the tab and closes any open dropdown. Never look while a menu is open: tell Josh what to pick inside the menu, he picks it right away, says "done", then Claude looks.
- Message format for each step: superseded 2026-10-17 (see "Power Apps directions, revised" below).
- Copy boxes go directly under the line that says to paste. Never several steps with the copy box far below.
- One click per message while navigating. Group only form fields he has filled before (then a small table of box/value works well).
- "Click external_id" means click the name itself. Three ways open a column's panel: click the name; row ⋮ > Edit; select the row, then Edit at the top. The row's ⋮ menu has an "Advanced" that is not the panel's "Advanced options".
- Left-panel trap: when two tables are expanded in Objects, "Columns" can belong to the wrong one. Prefer a path that can't be confused (Overview > Recent items > the table, then the Schema box) and check the breadcrumb.
- Dataverse is slow: after clicking a lookup cell, wait for its list. Errors like "Could not acquire Write lock" may mean the save went through; Refresh and check before retrying.
- Label each recommendation **Build fit** (what this build's rules call for) or **Client fit** (what Claude would do for a real client), and say when they differ.

## Strategy — decided

The authoritative strategy document is the AI Implementation Consultant 12-Week Master Calendar plus its companion tracker. Do not re-litigate its strategy choices.

Sequence:
- platform-agnostic integration fundamentals first
- bounded Microsoft specialization second
- consulting delivery throughout

SQL is load-bearing. The Rivertown build needs a relational model, a unique `external_id + source` rule for idempotency, and duplicate plus invalid-reference tests.

Evaluation and security discipline begins before advanced agent work.

Python is scoped to reading and supervising code, not becoming a software engineer.

MCP comes later, after APIs, auth, evaluation, and Microsoft work.

## Coursework status

- N8N102: complete.
- DataCamp Introduction to SQL: complete.
- DataCamp Intermediate SQL: complete as of 2026-10-05.
- DataCamp Joining Data in SQL: complete as of 2026-10-06.
- DataCamp Introduction to Relational Databases in SQL: complete as of 2026-10-10.
- SQL coursework is complete, and the applied Rivertown SQLite build and tests are done (2026-10-15; Gate 1 #7 re-scored Pass). Evidence: cases/rivertown-lead-intake/sqlite/README.md.

## Session close routine

When GitHub write access is available, update and commit the handoff files directly rather than making Josh manually copy/paste repo edits.

Always check:
1. `CURRENT_STATE.md`
2. current `weekN-log.md`
3. active case `decisions.md` if a design decision was made
4. `n8n-patterns.md` if a new n8n gotcha or course defect was found
5. workflow export and case docs if the build changed
6. commit and push
7. **As part of closeout (added 2026-10-16):** have Josh run `git pull --ff-only` in his local repo the same night, after the final push, so nothing hangs over to the morning. Give the command in the closeout message.
8. **Always paste the next session's kickoff prompt into the closeout message** in a copy box, not only in NEXT_SESSION_START.md. Josh sets up the next chat the night before.

If GitHub was updated remotely, tell Josh to fast-forward the local clone before local repo work continues.

### Power Apps directions, revised (added 2026-10-17)

The 2026-10-17 build ran a full day for half a day of planned work; nearly all of the extra time was message format and navigation, not the ideas. Josh's rules from that session:
- **Format:** the action goes on its own line starting `▶ DO:` (bold does not stand out on Josh's screen; use the ▶ DO marker and caps labels like WHERE, WHY). Then `WHERE:` as a position on the **screen** (top right, middle, lower left, "below and outside the If yes box"); never "on the flow", because "flow" sends his eyes into the workflow. End with a standalone line: `Done: reply d`. No "Screenshot: yes/no" line. No "You'll see" unless it matters for a check.
- **Why only when it matters:** give a short WHY when choosing an operation, a table, a rule, or a value, not for every click. A page of text before a + button is the failure mode; Josh stops reading and misses the important part.
- **Teaching order:** analogy first (fifth-grade), then what we did in n8n, then the Power Automate name. One analogy that landed: homework drop-box (section = source, gradebook list = Source table, same paper turned in twice = duplicate). The library and mailroom analogies landed less.
- **Analogies must say which side is which.** A two-sided analogy ("helper who reads vs writes blind") must map each side to a named action in a table, or it reads as n8n vs Power Automate.
- **Socratic after teaching:** once a piece is taught, ask what he would choose before telling (e.g., A/B choice of operator). One simple question; put it directly under the content it is about, with nothing emphasized in between (he answered the bolded line above the question instead of the question).
- **Explain-back after every major step,** in manager language. He wants to be able to explain each card to a manager and rebuild it himself.
- **Example values must not look like real ones** ("webform" next to "website_form" caused a 10-minute detour). Use obviously wrong values ("section 120").
- **Do not ask him to look back** in a long conversation; repeat whatever he needs in the message.
- **When a card or table opens, describe everything on it at once** (small table of box / value), then give all routine fields in one ▶ DO.
- **Cursor-dependent steps go in one message,** start to finish; never put "reply d" in the middle (going back to the chat moves the cursor out of the box).
- **Terminal commands: one command per message,** with "tell me what you see" directly under it and nothing after.
- **Claude may move its own tab to a page by address** (view-only) to save navigation clicks. Josh clicks every control.
- **Track independent vs with help** in the closeout (he asked for the tally).

Power Automate facts learned 2026-10-17 (older designer, opened from a solution):
- No + above the first action inside a Condition branch. Use the + on an arrow between cards, or design so the new step goes there.
- Steps are a stack: after a Condition the run continues to the next card. A special branch needs Terminate (n8n's dead end needs nothing).
- Paste filters and bodies as one line with `@{...}` expressions; the box converts them to chips. Typing text next to a chip can insert a hidden space.
- The Expression bar accepts only a pure expression (no `@{}`), and with Chrome forced dark mode its cursor is invisible; click the middle and paste.
- Never rename the HTTP trigger: its name is part of the flow's web address.
- Debug from the run record: open the run, click the card, read the exact inputs it sent (found the space bug in two clicks).

### Screen and recording help (added 2026-10-17)
- **When Josh says he can't see something he needs, fix his view first.** During OBS setup he said about five times that he needed to see the OBS frame while sizing windows; Claude kept measuring from screenshots instead. Once a Preview Projector was on his second monitor, he sized both windows in about two seconds. Listen to the pushback the first time.
- **Explain what a button does before asking him to click it** (he asked what Workspaces' Capture does; it only records window positions and closes nothing).
- **Computer-use screenshots hide every window that isn't approved** (VS Code, Word, Terminal were hidden during a check). Don't screenshot in the middle of arranging a layout; ask him to check the OBS preview instead, and release the lock right after any screenshot.
- When copying a request in Postman, say which one to edit (the copy) and why the original stays as the test record.

### Vision at session start (added 2026-10-16)
When the next build happens in Power Apps or Power Automate, the session opens its own tab with Claude in Chrome before the first direction: check the connected browser, open make.powerapps.com in the blue "jdmaurer Labs" window (Claude's own tab group), confirm "Josh Maurer's Environment" in the top right, and tell Josh which tab to work in. If the Claude in Chrome tools are not available in that session, say so at the start; don't guess at the screen.

### Power Apps directions, update (added 2026-10-18)
- **No bold for anything that must stand out.** Josh can't read bold light text; it took him minutes to find a dropdown choice buried in a sentence. Mark with ★ or put it on its own line.
- **Step layout:** each action on its own line naming the box and the exact value ("Approval type → Approve/Reject - First to respond"), with WHERE as a bullet directly under it. Rename comes first in every card's steps (as in n8n). End with a one-line "What we're doing:" (fifth-grade plain) right before "Done: reply d".
- **Give the click-to-insert way, not only code.** Dynamic content panel = n8n's drag-and-drop: the gray heading is the card (`outputs('Card')`), the item is the line (`['body/x']`). Its search box finds items, not headings.
- **Claude in Chrome: always pass the tab ID** on navigate. A navigate without one moved Josh's working tab on 10-18. Use a separate Claude tab for look-ups.
- **Check the flow before saying it works:** the run record shows the failing card's exact error in one line (T8 run 1: assignedTo missing).
- **Plans must leave room for real decisions.** The approval map ran an hour over 25 minutes because the decisions were real; say so in one line instead of rushing. Vague labels (row 8 "first reply to prospect") cost more time than they save; give a concrete example in the first message.
- **Demo recordings:** record the tests themselves, pausing between shots (Josh pauses OBS freely; waits and fixes get cut). Before recording: one app at a time maximized, zoom in, Leads sorted by Created On (newest at the bottom), status column added. No mic in OBS. Caveats don't go in voice-overs (limitations.md holds the gaps); the only line not to cross is saying something happens that doesn't.

Power Automate facts learned 2026-10-18:
- Approvals: "Start and wait for an approval" (type `approval`). Custom Responses gives your own buttons; Outcome holds the clicked text. Answer at Power Automate > Approvals: tick the request, the buttons appear on the top bar (or open it and pick from the dropdown, then Confirm).
- Assigned to: the name picker can display a chip and save empty. Enter the address as an expression (`'name@domain'` in the Expression tab).
- Timeout: card ⋯ > Settings > Timeout, ISO 8601 (PT5M). A timed-out card skips the cards after it; a parallel branch with Configure run after = "has timed out" catches it (red dashed arrow). "has failed" is a separate box.
- Update a row needs the row's own ID (SaveLead's `jdm_leadid`), not external_id.
- Searching `rows` lists all the Dataverse row actions.
- Solution export: Overview > Export (the ⋯ on the Objects page only offers "Switch to classic").
- A new connector in a solution flow adds its own connection reference (Standard approvals).

### Power Apps directions, update (added 2026-11-03)
The Try/Catch session ran about 6.5 hours for a 3.5-hour plan. Josh's rules from it:
- **Every tab change gets its own line:** "Switch tabs: <exact tab title>, at the top of the blue window" (or "Go to Postman"). He spent minutes looking for "Approvals" inside a table because the switch wasn't named.
- **Quotes mean "type this".** Never put button or panel names in quotes ("add an action" got typed into the search box). Anything to type goes in a copy box.
- **Never "the same way as" an earlier session.** Give the clicks from the screen he is on.
- **Baby steps in new places:** one click per message when navigating menus (New > Automation > Cloud flow > Instant took three messages). Short messages; a page of text is the failure mode, but each step still says what it is for in one fifth-grade line.
- **Socratic guesses are single-step only** ("what goes in the box next?"), never "which five of these". When he's rusty, make the call and move on.
- **Before any delete, double-check** what uses it (dependencies, which flows use a connection) and say what's lost; he asked for this explicitly.
- **Demo tables:** sort by a date column, oldest first, so new rows land at the bottom; zoom only as far as the status column still shows.
- **Check the build against the platform before choosing a channel:** the lab tenant has no mailbox; Mail V3 is refused; personal Gmail can't share a flow with Dataverse or Approvals. Approvals works. Ask "what does the client run on?" first.
- When a fix route hits a second wall, stop and offer the proven option (Approvals here) instead of a third workaround.

Power Automate facts learned 2026-11-03 (new designer, opened from a solution, `?v3=true`):
- Scope = a box of cards (`scope`). Drag a whole Condition into a Scope: grab its dark title bar and drop it on the + inside the Scope.
- Rename: click the card's title at the top left of its panel, Ctrl+A, type, Enter (clicking once didn't always take).
- After Save, the side panel sometimes shows empty code (`{"inputs": {}}`) or "Not connected". Refresh the page (it's saved) and reopen the card's Code view to check.
- Code view is the reliable check that a chip (an address in To or Assigned to) really saved.
- A timed-out card fails its container (Condition or Scope), so the run turns red even when a "has timed out" branch handled it. End that branch with Terminate (Succeeded).
- Create an approval doesn't wait (use it as an alert); Start and wait does.
- The new-designer flow list from a solution sometimes opens the classic designer in a new browser tab, outside Claude's tab group.
- Run history rows link to `/runs/<id>`; Claude can read a run by moving its own tab there.

### Working rules, revised (approved by Josh 2026-11-04; these win over any older line here that conflicts)
The comparison-memo session ran about 5.5 hours for a 2-hour plan. Most of the extra time went to rules applied out of context (Josh: "Are you running this because of a silly rule?", about five times), and to wording rounds. Six rules, kept short on purpose (Josh: every extra rule makes the important ones easier to miss):
1. **How builds happen:** Josh describes what he wants, AI drafts the build where the tool allows it (n8n: paste the workflow in; Power Automate: AI gives the steps, or Microsoft's Copilot drafts the flow), and Josh tests, troubleshoots, and owns it. Click-by-click only when a new concept needs teaching.
2. **Use each rule only for what it was made for.** Before applying one, ask what it protects against here; if nothing, leave it out. Don't quote rules or decision numbers at Josh; give the plain reason a client would understand. In client-facing writing, honest limits go in one place (the limits section), not as warnings in every line; a pitch leads with what works. Exception: secrets, real client data, and deleting things always get a brief warning first. Use Build fit / Client fit labels only when the two actually differ.
3. **Sell list:** list capabilities, backed by builds as examples, not exact copies of builds. Delivery steps (trial runs, scope, terms) belong in proposals, not on the menu.
4. **Client writing:** start with what we did for them, then what they need to do; use words the client already knows, so it's easy to understand; describe each option the same way, and say each thing once; for something we can do but left out, say "Can be added", and if we can't do something, say so plainly; check the plan before promising anything "later". Before handing Josh any client document to review, read it once asking: is any line here because of a rule, rather than because it helps the reader? (Added 2026-11-05: four such lines were cut from the memo after review.) The Rivertown comparison memo is the model.
5. **Showing a change:** say where it is (which section), and show the changed text with a few lines before and after it, enough to judge whether it fits; a short paragraph is shown whole. Never "..." in place of the text around a change. Show before and after when wording changes.
6. **Saving work:** push to GitHub when a draft is written, when a piece of work is approved, and at closeout; not after every small edit. (The workspace reset twice on 11-04; the first memo draft was lost because it was never pushed.)

### Message format, update (added 2026-11-06, Copilot Studio session)
Josh closed the session for an hour after a page-and-a-half opening message. What worked once he came back:
- Open with three lines: where we are, the goal, one action. Teaching goes in one or two lines next to the step it explains.
- Every step: one short "What we're doing" line on top, then each step with a bullet under it saying where his eyes go, by the label or the exact text on screen ("the gray text 'Escalating to a representative is not currentl...' in the second card, the one labeled Message, not the Trigger card above it"). "Click the Message card's text" was not enough; he pasted into the wrong box.
- Several simple steps inside one card are fine in one message (Josh's request); navigation into new places stays one or two clicks.
- Check an icon before naming it (zoom or hover the tooltip). A "circle arrow" that was really a square with a + cost a round.
- When he misses something, name exactly which item is missing ("the SYSTEM NOTE question wasn't sent"), not "it isn't in this chat."
- Shift+Home selects only the wrapped visual line. For replacing a long line: click just before its first character, Shift+click just after its last.
- Pass/fail rules in a small table, approved before running; then he pastes the questions and Claude reads the answers from its own tab.
- Two Chrome browsers connect to Claude; Browser 1 is the blue window. If unsure, Claude opens its own tab and checks the signed-in account itself rather than asking Josh which is which.

### Session lessons (added 2026-11-07, Copilot Studio grader + request action)
The day ran about 9 hours for a 4-hour plan. Most lost time was directions, not ideas. Josh's points:
- Look before directing. Read the screen (zoom on the exact boxes) before naming any box or button. Josh: "The whole point of having you in my screen is to make sure you don't give me crappy directions." Two lookalikes cost rounds: the trigger input's name box (left) vs description box (right); "Add new Workflows" card vs the "Workflows" filter chip; "settings page" vs the Settings button.
- One Claude tab per session, closed at closeout. Old tab groups (saved groups on the bookmarks bar) piled up from earlier sessions and confused everything. Check which browser is the blue window by opening one tab and reading the account (Browser 2 on 11-07).
- Open dropdowns and pickers close when Claude screenshots. For menus, ask Josh for a picture.
- No backup plans in the same message. Give one way; if it fails, give the next step then.
- Never quiz before teaching (the key explain-back came before the key was taught).
- When Josh asks "is this real or just for the lab?", answer it straight; it is a good check, not a delay.
- Agent-flow designer facts: @{ } paste turns into chips in Dataverse boxes, not in Condition or Respond boxes (use fx, paste the bare formula). Rename is in the card's ... menu. Code view (... menu) proves what saved. Inputs on the tool page show only when opened from the Tools list.

### Session lessons (added 2026-11-08, Copilot Studio request action + rerun)
About 4 hours 15 minutes for a 1.5-hour plan. Josh's format rules, in his words where possible:
- Each numbered step is ONE action and starts with the thing to click or type ("Click Save", "Rename card"). Details go on an indented line under it. Never two actions or two answers in one line ("say no... say yes" nearly made him send the wrong answer).
- The eyes line comes BEFORE the click and names the screen area first: top-left, top-middle, top-right, middle-left, center, middle-right, bottom-left, bottom-middle, bottom-right. Then the label. Not "your eyes go to what appears after".
- When a step opens a card or panel, give the opening click and the values for that card in the same message, each click on its own numbered line. Don't make him say D after every + button.
- Check once per finished card, not every field. No screenshot to confirm he found a known search result. Screenshots cost his usage.
- He learns by repetition, not by a map. Keep telling him where to click; don't switch to "here's the destination, find it yourself".
- Copy boxes: say exactly where the text goes ("paste into the Evaluation instructions box"). "Box one / box two" meant nothing to him.
- Save draft after each finished card in agent flows. Publish usually saves, but a glitch can drop unsaved work.
- Read the repo notes before directing. Today repeated two known facts: a Condition's second empty row can't be deleted (ignore it), and a tool's Inputs show only when the tool is opened from the Tools list.
- Long chats cost more per message. Offer a closeout and a new chat when the day's main block is done.

Copilot Studio facts learned 2026-11-08:
- Trigger input menu: "Make the field optional/required" names the action, not the current state ("Make the field required" means it is optional now).
- Every "Respond to the agent" card in a flow must have identical outputs, descriptions included, or Publish fails ("schema definitions for actions with same status code must match").
- After a failed publish: "Illegal state: resolveOrgUrl: instanceUrl is undefined". Save draft, F5, Publish. "Recover flow" offers the browser's older copy; skip it if you've saved since.
- An optional trigger input disappears from the agent's tool; add it back with "+ Add input". A tool input the agent asks for reads "no"/"none" as clearing it and re-asks up to twice, then escalates. Don't use optional tool inputs; use a topic with buttons.
- The test pane can stretch over the page (activity trace). The header button "Contract test pane" shrinks it back.
- Evaluate: the graders live behind the test set card's "2 test methods" chip, then the sliders icon on a grader. Rubric box limit 1,500 characters. Microsoft's content filter can block a test row ("ContentFiltered").
- The flow's Test > Manually form refuses a blank required input (even a single space).
- Power Apps table grid: "+N more" adds a column to the view; tick it and Save.

### Session lessons (added 2026-11-08, evening: guide reviews + a lost recording)
About 3 hours of work for a 1.5-hour plan; the recording didn't happen. Josh's points:
- Reviews: one small piece per message, shown already revised (never the original plus "changes I'd make"; he hasn't read it yet). Plain text, no copy boxes for text to review (they scroll sideways). End with: reply "d" to keep, or tell me what to change.
- Before showing a piece, check it yourself against four tests: right reader, accurate (build, screen, sources), professional wording, and would an expert reading the portfolio raise an eyebrow. He asked "double-check" on nearly every piece; that check is Claude's job before showing.
- Check unverified labels on screen instead of flagging them again and again (Claude can move its own tab and read the page). Repeated "not sure" made him worry about the whole document.
- Short messages: the piece, plus one line only if something is unchecked. No usage notes, process notes, or side options stacked on a review message (a five-line message with three directions lost him).
- Know the process from the repo before asking. Demo process: silent screen take (no mic yet); Claude writes where the raw file lives in the demo record and the first-draft voice-over in the marketing repo `scripts/`. The finished video is the marketing track's, weeks later.
- Recording: attach jdmaurer/marketing-track at session start and read `sops/screen-recording-setup.md`. Walk the demo record's pre-recording checklist in order (layout, window fits the OBS frame in the projector, zoom) before shot 1. Tonight's take was lost because shots started without it.
- Client writing: describe what the product does once set up; never promise what it doesn't do. Honest gaps go in limitations as setup steps, not confessions (a service-account question reads as expertise).

Copilot Studio and Power Apps facts learned 2026-11-08 (evening):
- The tool's Enabled switch is on the agent's Tools list (Enabled column). Turning it off leaves handbook answers working.
- Agent tabs: Overview, Knowledge, Tools, Agents, Topics, Activity, Evaluation, Monitor, Channels. Workflows is in the left menu. The flow's Overview shows "28-day run history". No Version history found.
- Channels page: "Not published" on the trial; the publish check warns "Your agent runs tools that use the author's credentials."
- A /channels address bounced back to Overview; the Channels tab works when clicked.
- Power Apps Tables: the Custom chip lists our tables; the table link has no address (href #), so Josh clicks it. The purple search bar at top-middle searches all of Power Apps, not the list.
- (Late 11-08, recording) Josh's recording setup choices are deliberate (he widened the test pane so the chat reads on video). Don't change his setup to dodge a blur; note the blur for the edit instead. Don't suggest F11 mid-setup: it breaks the fitted window and can cover OBS. The demo record's own "must never appear" notes belong in the pre-recording checklist so they're raised before shot 1, not discovered mid-take.


### Session lessons (added 2026-11-09, Bluffside release)
About 1.5 hours of work for a 45-minute plan. Josh's points:
- Review messages: the text under review must stand apart from Claude's notes. Never put Claude's notes in bullets when the piece itself has bullets (he couldn't find the guide's three bullets among eight). Notes are a few plain sentences above; the piece follows under a plain label.
- Open every review piece with one plain sentence saying what it does ("this just marks the to-do as done"). He had to decode a README change that amounted to "remove the to-do line".
- When fixing text he already approved, say so first, show what's in the file now, then the proposal. Showing only the proposal read as "you changed something behind my back".
- Portfolio-facing text (README, limitations) is never written without showing him; decisions.md is internal.
- Check every piece before showing it (reader, accuracy, professional, expert eyebrow). He asked "double-check" on most pieces again.
- In an analogy question, keep the real roles straight: "live environment" vs "client" got mixed, and he heard "the client can never change it".
- Cross-references must make sense to the reader: Dana never sees admin-questions.md, so "admin question 14" meant nothing.
- Limitations: put the reason in the same sentence as the gap, and say when it gets closed.

Power Apps and Copilot Studio facts learned 2026-11-09:
- Solution export: Overview > Export > "Before you export" (Publish, Next) > possibly "Missing required unmanaged components" (Add to solution) > "Export this solution" (version suggested one higher; Managed (recommended) selected by default; Run solution checker on export checkbox) > green bar > Download. Second export: retype the same version. Checker result shows on Overview, Solution status overview card, about a minute later.
- An agent flow's connection references, created in Copilot Studio, land outside the solution; the export flags them.
- The export carries knowledge files (botcomponents/...file.../filedata, CRLF), topics, the evaluation test set (componenttype 19), the agent flow, and table design without rows.
- A live environment refuses a managed solution with a lower version than the installed one (Microsoft Learn); undo is a corrected forward release. An imported agent must be published before staff can use it (Microsoft Learn).
- Browser 1 was the blue window on 11-09. With folder access granted, Claude can stage files from Josh's Downloads and scan them.
