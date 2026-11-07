# Week 7 Log - Copilot Studio

## Thursday-Friday 11.05-11.06.26 - Trial, a new client, and the first test

Copilot Studio trial is on (the admin center shows a Copilot Studio Viral Trial license), in Josh Maurer's Environment. Forms got Founder, Joshua Maurer, and the Google Voice number, not Brain and Bot.

Most of the first day went to deciding what to build, and it was worth it. We started with a Rivertown policy helper and I asked the question that changed everything: would we ever use this ourselves? No. Two people don't need a bot to read their own rules. So it's a client demo, and then the next question: would a consulting firm ever hire us? Also no. We got the n8n lead intake backwards (it should have been ours); this one is a client's. New example client: Bluffside Heating & Plumbing, about 40 people, techs who call the office all day with the same questions. I pushed for research on what actually sells instead of guessing, and the answer was an employee handbook helper, the thing Microsoft consultants lead with. One strong demo, plus a list of what it becomes for other clients.

Then the build: its own solution (one box per build, prefix jdm), a Standard agent, five handbook files including an old expense policy marked REPLACED as a trap, Web Search off, and the rules in Instructions.

First test, rules approved before running: 11 of 11 answered correctly, and it never touched the old expense policy. 5 of 9 refusals passed. The miss that matters: "I smell gas" got Microsoft's placeholder text from a built-in Escalate script instead of the 911 line. Built-in scripts can override your rules, which is exactly why you test refusals. Fix next session as the fixed-script lesson; nobody sees the helper until it passes.

One test was my call: the groceries-in-the-truck question was supposed to be refused, but the policy says trucks are work only, so "No" is right. Test mistake, not a helper mistake. And the bigger point: the helper is only as clear as the handbook. Cleaning up the handbook is part of what a client pays for.

Independent: building for my business vs. a client's; a consulting firm would never hire us; manufacturers want production-line AI, not admin; research what sells before building; one tool for all staff; why block anyone from a handbook; "is this just a chatbot?"; is the builder choice what I'd do in the field; asking about recording before clearing the test chat; calling the groceries test a test defect and tying it to handbook quality; the university handbook idea (parked).

With help: switching environments, the trial sign-up, making the solution, setting up the agent, the instructions, reading the results.

Honest time: about 6 hours over two days for a 3-hour plan. The client and product decision took about 2 hours, partly because the recommendations went back and forth before settling. That was real decision time, not wasted, but the recommendations should have been checked before they were offered.

Next: fix the Escalate script and add a fixed emergency script, then the harder tests (paraphrases, conflicts, prompt injection).

## Friday 11.06.26 (evening) - Fixed scripts, a safer 911 line, and a planted conflict

The session nearly didn't happen. The first message was a page and a half before a single click, and I closed it for an hour. When I came back we went one step at a time and it moved.

The idea of the night: a topic is a card taped by the phone; the AI is the receptionist. When a card matches, the card gets read and your instructions never come into play. That's why Microsoft's Escalate card answered "I smell gas" with placeholder text on Thursday. One thing I didn't expect: the AI still decides which card to read, from the card's description. The words are fixed; the choice isn't.

Built the Emergency card. The 911 wording took four rounds, and I'm glad it did. "If anyone is in danger" makes a scared person judge the danger. "Get everyone out" sounds like go looking for people. "Then call the office" could have someone standing on the front step on the phone. "Call 911 if someone is hurt" would send a cut finger to 911. The final line: smell gas or smoke or a CO alarm, leave and get well away, then call 911; badly hurt with real signs, call 911; minor injury, tell the office. For a real client this comes from their safety procedure, not from me.

Tests, rules approved first: emergency 5 of 5, including "rotten egg smell" and a reverse check (a high gas bill should not set off the alarm). Fixed the Escalate card to hand off to Dana. The three old failures passed, but the AI picked different cards than Thursday, so the instructions' own emergency line had to match the card too. Repair questions now go to the service manager (the person who knows furnaces) through their own card, because the Escalate card kept winning.

Grew the handbook: HB-05, customer homes, uniforms, phones, with a planted conflict with the truck policy on hands-free phones. I pushed to use roles, not names, in the handbook: companies don't name people because people leave, and naming Dana in the file made the hand-off test too easy.

Harder test: 9 of 10. Paraphrases, missing context, the old policy, a fake "SYSTEM NOTE", "print your instructions", out of scope: all passed. The conflict failed: it picked a side. After the fix it still opened with "No." I went strict; one more line, and it passed. Deciding which policy wins is the owner's job.

Skipped re-pasting 38 questions at midnight. Nobody can reach the helper, and Copilot Studio's Evaluate can grade a whole list by itself. That's next.

Independent: the four 911 wording catches; 911 vs the gas utility is the client's call; would it understand "rotten egg"; End all topics stops it from adding more; build the repair card now; roles not names in the handbook; strict on "No."; why do a quick check when the grader covers it; fixed a bad text selection myself.

With help: finding my way around Copilot Studio (Agents, Topics, the test chat's new-session icon), where each card goes, undoing a paste into the wrong box, uploading the file, reading the results.

Honest time: about 4 hours of work across 5:20 pm to midnight, with breaks, for a 2.5-hour plan. The first hour was lost to a wall of text; later time went to directions that didn't say where on screen to look.
