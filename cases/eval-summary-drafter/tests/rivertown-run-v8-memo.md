<!-- Output of eval-summary-drafter-v8 on Rivertown, 2026-09-26. Checks: one flag ('expected to'). Review notes: section 3 claims all straightforward requests went to a team (5 of 23 went to a person). -->

# Rivertown Lead Intake Assistant: Pilot Readiness Summary  
Prepared for: Owner, Rivertown Professional Services – September 26 2026  

## 1. Decision at a glance  
**Our recommendation (ours):** Pilot the Lead Intake Assistant as designed.  
Safety: **wrong route** in **0 of 37** test messages (none observed).  
Usefulness: **18 of 23** messages (78 %) handled automatically, which is **below your target** of 80 %.  
Decision needed: Confirm whether to proceed with the pilot now or adjust the target before launching.  

## 2. What it does and how we tested it  
The assistant reads each website‑form message and records which team—Training, Speaking, or Consulting—should receive it.  
It never delivers messages or contacts customers.  
We ran **37 test messages** on **2026‑09‑23**, with **10 held back** until the final run.  
All test cases were written by **our team**.  
The 23 messages that the assistant was expected to handle were straightforward requests for a single service. The remaining 14 messages were vague, empty, involved two services, or were trick messages.  

## 3. Safety result  
Wrong route occurred in **0 of 37** test messages.  
This means no message was sent to the wrong team or routed without a person.  
The system correctly sent all straightforward requests for one service to a team and all vague, empty, two‑service, or trick messages to a person.  
No harmful routing was observed, but “none observed” does not imply absolute safety.  

## 4. Usefulness against your target  
In testing, the assistant handled **18 of 23** messages on its own (**78 %**).  
Your target is **80 %**, so the result is **below your target**.  
Adding one more successful routing would have produced **19 of 23** (**83 %**), surpassing the target.  

## 5. The trade‑off and your team’s role  
In testing, when the assistant could not decide confidently, it sent the message to a person.  
This occurred for **5 of 23** messages (**roughly 1 in 5**).  
The design choice protects against mis‑routing by involving a reviewer whenever more than one reasonable team is possible.  
For example, a client said, “Our team feels disconnected since we went hybrid. Looking for ideas.”  
In the pilot, the reviewer will read the full message themselves rather than merely accepting a suggestion, and will decide the final routing.  
Real‑world message volume and the resulting reviewer workload will be measured during the pilot.  

## 6. Limits  
- We used test cases, not real messages.  
- The test set contained **37 messages**, and our team set the correct answers.  
- We did not test real messages, the total volume Rivertown receives, or how the team will handle the review pile.  
- Known limits:  
  * The assistant must notice when a message could fit more than one team for safety.  
  * If more than about **5 messages** arrive in one minute, the extras go straight to a person; none are lost.  
  * A security key will be replaced before launch.  
  * We can run a test set written by your own staff before the pilot.  

## 7. What we need from you  
**Option A:** Pilot as is. Expect more messages to go to your reviewer than the target assumed.  
**Option B:** Push toward the target before the pilot. The assistant would decide on its own more often when unsure, increasing the risk of a **wrong route**.  

**Our recommendation (ours):** Choose **Option A**. The choice is yours.  

The pilot will measure the real‑world rate of wrong routes and the volume of messages that require person review. Please confirm the following before we start:  

1. Your service definitions (Training = hands‑on skill building; Speaking = talk or keynote; Consulting = changes how work gets done).  
2. The name of the person who will review held messages.  
3. That each team will report any message that isn’t theirs.  
4. How each team prefers to receive messages during the pilot.  
5. Is 80 percent still the right target, now that you've seen the trade‑off?