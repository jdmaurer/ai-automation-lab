// BuildEditPrompt: a fresh AI call edits the draft against the editor checks.
// It gets the draft, the approved facts, the setup, and the rules. Nothing else.
const draft = $input.first().json.text || '';
const { facts, setup } = $('BuildPrompt').first().json;
const base = 'https://raw.githubusercontent.com/jdmaurer/ai-automation-lab/main/cases/eval-summary-drafter/';
const get = async f => this.helpers.httpRequest({ url: base + f, json: false });

// The editor gets a trimmed copy of the rules to stay under Groq's 8,000 tokens-per-minute limit:
// no source citations, no word lists or pipeline notes (code checks those), only the editor checks.
const cut = (t, from, to) => { const i = t.indexOf(from); if (i < 0) return t; const j = to ? t.indexOf(to, i) : -1; return j < 0 ? t.slice(0, i) : t.slice(0, i) + t.slice(j); };
let guide = (await get('memo-guide.md')).split('\n## Sources')[0];
guide = cut(guide, '\n## 8. Word lists', null);
guide = guide.replace(/\s*\((STRONG|MODERATE|OPINION)[^)]*\)/g, '')
             .replace(/^Evidence labels:.*$/m, '')
             .replace(/^\*\*Set the expectation before testing starts\.\*\*.*$/m, '');
const outline = (await get('memo-outline.md')).split('\n## Overfitting test')[0]
  .split('\n').filter(l => !/^- \*\*(Tags|Data needed):\*\*/.test(l)).join('\n');
const fullChecklist = await get('memo-checklist.md');
const checklist = fullChecklist.slice(fullChecklist.indexOf('## Editor checks'), fullChecklist.indexOf('## Your checks'));

const prompt = `You are the editor of a one-page evaluation memo for a non-technical business owner. You did not write the DRAFT. Edit it against the EDITOR CHECKS (E1 to E8), using the GUIDE and the OUTLINE.

YOU MAY: change wording, split long sentences, reorder sentences within a section, remove repetition, and add a missing required element from the OUTLINE using only APPROVED FACTS and CLIENT SETUP.
YOU MAY NOT: change, add, or remove any number; change any fact; change the recommendation or the options; make the memo more persuasive. "Improve" means clearer and more complete, not more convincing.
CHECK EVERY ABSOLUTE CLAIM: any sentence with "all", "every", "none", "never" or "always" must match APPROVED FACTS. If 5 of 23 went to a person, "all were routed to a team" is false: rewrite it with the exact counts.
FLAG, DON'T FIX: E7 (top summary and decision section disagree), E8 (anything the approved facts can't support, or a gap they can't fill), and any judgment question for the consultant. Leave any [MISSING: ...] marker in place.

OUTPUT EXACTLY THIS, NOTHING ELSE:
the full edited memo in Markdown
===CHANGES===
one bullet per change, starting with its checklist item or guide rule, for example "- E2: split the second sentence of section 5."
===FLAGS===
one bullet per issue for the consultant, or "- None"

DRAFT
${draft}

APPROVED FACTS
${JSON.stringify(facts, null, 2)}

CLIENT SETUP
${JSON.stringify(setup, null, 2)}

OUTLINE
${outline}

GUIDE
${guide}

EDITOR CHECKS
${checklist}`;

if (!draft.trim()) {
  return [{ json: { prompt: '', draft_empty: true, facts, setup } }];
}
return [{ json: { prompt, approx_tokens: Math.round(prompt.length / 4), draft, facts, setup } }];
