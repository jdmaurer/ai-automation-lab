// BuildPrompt: assembles the drafting prompt from the approved facts, the client setup,
// and the current rule files on GitHub (the committed versions are the source of truth).
const { facts, setup } = $input.first().json;
const base = 'https://raw.githubusercontent.com/jdmaurer/ai-automation-lab/main/cases/eval-summary-drafter/';
const get = async f => this.helpers.httpRequest({ url: base + f, json: false });

const guideFull = await get('memo-guide.md');
const guide = guideFull.split('\n## Sources')[0];      // sources are for people, not the drafter
const outline = await get('memo-outline.md');
const checklist = await get('memo-checklist.md');

const memoDate = new Date().toLocaleDateString('en-US',
  { timeZone: 'America/Chicago', year: 'numeric', month: 'long', day: 'numeric' });

const prompt = `You draft a one-page evaluation memo for a non-technical business owner deciding whether to pilot an AI-assisted system. Follow the OUTLINE for structure, the GUIDE for every writing rule, and make the draft pass the CODE and EDITOR items in the CHECKLIST. The YOUR CHECKS items belong to the consultant; do not answer them.

HARD RULES
- Use only numbers that appear in APPROVED FACTS or CLIENT SETUP. Never calculate, round, or estimate a new number.
- Use the verdict wording and the "roughly 1 in X" phrase exactly as given in APPROVED FACTS.
- Never use any word in CLIENT SETUP banned_words, or any word banned in GUIDE section 8.
- Never mention item IDs.
- Propose a recommendation. Label it as ours and leave the choice with the owner.
- Memo date: ${memoDate}.
- Call the harmful action by its short name, CLIENT SETUP harmful_action_name (for example "0 ${setup.harmful_action_name || 'harmful actions'}s in ${facts.total_items} test ${setup.item_word}s"). Explain once, in your own words, what it means, using harmful_action. Never paste harmful_action word for word. Describe the two groups of test items with handled_group and person_group, every time. Say who wrote the tests and set the answers with test_authors.
- Options: if CLIENT SETUP has an options list, use it. Otherwise use the GUIDE 5.5 playbook row for APPROVED FACTS scenario, written as business consequences for this client.
- APPROVED FACTS referrals.quotable_examples are real test items. Quote one in section 5.
- If the memo needs a fact that is not in APPROVED FACTS or CLIENT SETUP, write [MISSING: what is needed]. Never guess.
- Output only the memo in Markdown. No preamble, no notes after it.

APPROVED FACTS
${JSON.stringify(facts, null, 2)}

CLIENT SETUP
${JSON.stringify(setup, null, 2)}

OUTLINE
${outline}

GUIDE
${guide}

CHECKLIST
${checklist}`;

return [{ json: { prompt, prompt_chars: prompt.length, approx_tokens: Math.round(prompt.length / 4), facts, setup } }];
