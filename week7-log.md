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
