
## Monday 9.21.26 - Self-hosted n8n, v1 re-verified

Moved off n8n Cloud onto my own laptop. Installed n8n through npm (PowerShell blocked npm until I used npm.cmd), backed up the encryption key, activated the free community license, and proved persistence with a restart.

Rebuilt the Rivertown table from the seed CSV, imported v1, repointed the four table nodes, recreated the Header Auth credential, and re-ran all ten Postman cases. All passed, same as on Cloud. Along the way: browser Postman can't reach localhost (installed the desktop app), a Postman body set to Text instead of JSON gets correctly rejected, and the CSV export shifts every timestamp by five hours. I also caught that allowing Node through the firewall had exposed n8n to my network, and turned those rules off.

Fixed the stray "=received_at" field name and pushed v1.1.

## Tuesday 9.22.26 - Lead Intake v2: AI triage

Rebuilt v2 from scratch in case-study mode after a rough first attempt. The AI only sees leads the rules can't route. It returns a category, a confidence label, and a one-sentence reason, forced into a strict schema. A confidence gate auto-routes only when the AI is highly confident and the category is real; everything else goes to a human with the AI's opinion recorded. An AI failure routes to review instead of losing the lead.

I wrote the prompt myself, including category definitions and a fence around the customer's message so instructions hidden in it are treated as data. The ideas that stuck: store the AI's opinion separately from the outcome so it can be graded; "who decided" and "why" are different columns; a low-confidence answer is not the same as a failure; copying a workflow inside one instance silently points at the original's table and webhook.

Tested end to end: Ingrid ("ongoing monthly advisory work") auto-routed to consulting at high confidence. Desmond ("not sure what the next step is") came back Training at medium and went to review. Both passed through the real URL from Postman.

Process lessons: the teaching works when I'm asked to propose and then corrected, not handed finished answers. Show me the test record when asking me to predict. Closeout is straight directions only.

Next: test the Error path, then build a frozen evaluation set.
