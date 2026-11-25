# Policy v3 fair test, November 24, 2026: FAIL on draft usefulness

The single v3 run allowed by the [rules Josh approved beforehand](../../POLICY_V3_SCORING.md). Inputs were committed before execution (e7260eb). Helper run `08584060394385561452602341235CU16`, about 1m30s, Succeeded. The saved results are byte-identical to the flow's raw output (LF SHA-256 `00da4dc0…`). No tuning and no rerun.

## Result against the charter bar

| Gate | Bar | Result | |
|---|---|---|---|
| Primary outcomes | ≥ 27/30 | **27/30** | ✅ |
| Critical failures | 0 | **0** | ✅ DRI-12 (STOP, wrong phone number) is now Urgent |
| Sales pricing | all correct | **6/6** | ✅ |
| Usable drafts | ≥ 80% | **9/13 (69%)** | ❌ |

**Overall: FAIL.** Release remains NOT_ESTABLISHED.

## What failed and why

The failure comes from a design choice, not from AI writing quality.

- **AI-written drafts: 7/8 usable (88%).**
- **Fixed Support sentence: 2/5 usable (40%).** All five Support emails get the same approved line: "Thank you for your message. The owner will review your concern and confirm the next step." It is safe and honest. Josh rated it **not useful for urgent problems** (DRI-09 wrong date, DRI-11 pickup timing, DRI-12 stop-print).

Josh's finding, in his words in substance: customers with a problem want to hear that their specific issue is understood and what happens next, including whether they'll pay. A canned line reassures nobody. As an *unsent* draft, it also saves the owner nothing, because the owner has to act first and then write the real answer. It would only help as an automatic "received, and being prioritized" reply.

**Implication for a real client:** don't draft replies for urgent order problems; flag them instantly. Agree with the owner up front whether an automatic acknowledgment is wanted.

The one AI-draft N was DRI-22 (contact update), with no reason given.

## Non-critical items, reported as promised

- **False urgent:** DRI-10, DRI-14 and DRI-15 (complaints about finished orders) were marked Urgent.
- **Category misses:** DRI-26 and DRI-29.
- **AI call failed:** DRI-28 failed again and was handled safely (owner review, no draft).
- **Over-review:** DRI-02 was sent to review when the key did not require it.
- **DRI-22 accepted limitation:** not triggered; DRI-22 was classified General.
- **Raw-priority overrides:** none. The classifier itself returned Urgent for the order changes.

## What Claude missed

Five of the 13 drafts were going to be the identical fixed sentence; that was known from the v2 run. Claude should have asked Josh *before* the run whether he would count that sentence as usable for urgent emails. Asking would have predicted this result.

## Files

- `manifest.json`, `batch-input.json`: committed before the run
- `actual-results.json`: unchanged raw export
- `owner-review.json`: Josh's ratings with his reasons
- `score-v3-machine-before-owner-ratings.json`: INCOMPLETE pending ratings
- `score-v3.json`: final FAIL
