# Order-change urgency policy v3

Owner decision, November16,2026. Policy `driftless-order-change-policy-v3-2026-11-16`, implementation `order-change-urgent-e`.

Every identified change or proposed/question-form change to an existing order requires **Urgent + manager review**, regardless of timing. This includes image/artwork, wording, quantity, specifications, production timing, pickup/delivery, holds and cancellation. Production scheduling is not inferred from an email.

Implementation uses existing classifier fields: Support + record_change_requested=true forces the effective logged/reported priority to Urgent. Existing Support/change review predicates require manager attention. Other priority behavior and all existing safety, confidence, context, attachment, failure, resend and draft controls remain. No autonomous change, production action or send is authorized.

**Accepted limitation:** a non-order contact update may be classified as Support/change true and receive unnecessary Urgent status. It may also follow the existing eligible Support acknowledgment branch. Josh explicitly accepted this noncritical false positive rather than starting another rewrite/test cycle. All original observations remain visible; acceptance does not relabel a failed check.

Prior bounded evidence:3/3 tested order changes produced the required recognized/effective outcome, ordinary inquiry control passed, contact-update control failed;4/5 exact overall. No new testing during save. This is limited classifier/proposed-expression evidence, not a new runtime/full-batch/generalization or release pass.

**Current status:** shared classifier saved; main and helper overrides **Published /ready**, with original input references verified. Main priority action and full helper Scope match the checked saved drafts exactly. [Publication evidence](evaluation/configuration/order-change-policy-v3-publication-2026-11-16/README.md), [historical save evidence](evaluation/configuration/order-change-policy-v3-save-2026-11-16/README.md). No new tests or rescoring during publication; overall release remains unestablished.

Preserve v1/v2 frozen key/scorers/contracts and every failed run/score/owner form. Any future v3 scoring must explicitly account for effective-priority overrides while retaining the raw model answer. No historical score is revised by this policy.
