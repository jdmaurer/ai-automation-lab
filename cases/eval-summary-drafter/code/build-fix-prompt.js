// BuildFixPrompt: one automatic fix attempt, with the exact failures named.
// No failures: return nothing, so the fix branch doesn't run and CheckMemo's output is final.
const c = $input.first().json;
if (!c.failures.length) return [];
const s = c.setup, f = c.facts;
const prompt = `Fix ONLY the problems listed below in this client memo. Change nothing else: keep every other sentence, every number, the recommendation, and the options as they are. Use only the facts given here.

PROBLEMS
${c.failures.map(x => `- ${x.check}: ${x.detail}`).join('\n')}

FACTS YOU MAY USE
${s.handled_group ? `- The ${f.usefulness.total} ${s.item_word}s the system should handle were ${s.handled_group}.` : ''}${s.person_group && f.should_go_to_person.count ? ` The other ${f.should_go_to_person.count} were ${s.person_group}.` : ''}
- Call the harmful outcome a "${s.harmful_action_name || 'harmful action'}". If the memo explains it, use your own words for what it means (${s.harmful_action}); never paste that definition.
${s.target_percent != null ? `- The target is ${s.target_percent} percent.` : '- There is no target yet; section 7 asks the owner to set one.'} When the result is below target, section 7 asks: "Is ${s.target_percent} percent still the right target, now that you've seen the trade-off?"
- Quotable test items: ${f.referrals.quotable_examples.map(q => `"${q}"`).join(' ')}
- Write setup facts as natural sentences. Never paste them word for word, and never say "the harmful action".

Output only the full corrected memo in Markdown. No notes before or after it.

MEMO
${c.memo}`;
return [{ json: { prompt, approx_tokens: Math.round(prompt.length / 4) } }];
