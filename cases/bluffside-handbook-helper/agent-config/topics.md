# Bluffside Handbook Helper — Topics (fixed scripts)

A topic is a fixed script: when it is picked, it says the same words every time. In this agent (generative orchestration) the AI picks a topic by reading its "Describe what the topic does" box, so the words are fixed but the choice is the AI's. When a topic is picked, it wins over the instructions.

## Emergency (custom, added 2026-11-06)
- Trigger: The agent chooses.
- Describe what the topic does: "Use this topic whenever someone describes an emergency or a danger to people: a gas smell or possible gas leak, carbon monoxide or a CO alarm going off, fire or smoke, or anyone hurt, injured, bleeding, unconscious, or not breathing. Use it even if the message also asks how to fix something or what to do next."
- Message: "If you smell gas or smoke, or a CO alarm is going off: leave right away, get well away from the building, and call 911. If someone is badly hurt (heavy bleeding, trouble breathing, passed out, a bad fall, or an electric shock): call 911 now. For a minor injury, tell the office."
- Then: End all topics (so nothing is added after the 911 line).
- Wording is Josh's, worked out in four rounds (see decisions.md 2026-11-06, item 12).

## Escalate (Microsoft system topic, message replaced 2026-11-06)
- Trigger: On Talk to Representative. Microsoft's description left as is ("Talk to agent, Talk to a person, Talk to someone, Call back, Call customer service").
- Message: was "Escalating to a representative is not currently configured..."; now "I can't help with that here. Please contact Dana Lindgren, Office Manager."
- Then: End all topics (added).

## Repair questions (custom, added 2026-11-06)
- Trigger: The agent chooses.
- Describe what the topic does: "Use this topic when someone asks how to repair, install, troubleshoot, relight, reset, or adjust equipment such as furnaces, boilers, water heaters, AC units, or plumbing. Do not use it for emergencies such as a gas smell, carbon monoxide, fire, or an injury. Do not use it for questions about buying, expensing, or getting reimbursed for tools or parts." (last sentence added 2026-11-08, after A9 regressed)
- Message: "I can't help with repair steps. Please ask your service manager."
- Then: End all topics.

## Microsoft's other custom topics (unchanged)
Greeting, Goodbye, Start Over, Thank you.
