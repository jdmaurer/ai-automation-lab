// CheckMemo: code checks the memo against the approved facts, the setup, and the guide's word lists.
// Failures get one AI fix attempt; flags go straight to the consultant. Nothing stops.
// The same code runs twice: after SplitEdit (first check) and after FixMemo (recheck).
const inp = $input.first().json;
const isRecheck = inp.memo === undefined;               // FixMemo returns {text}, SplitEdit returns {memo}
const memo = (isRecheck ? inp.text : inp.memo) || '';
const { facts, setup } = $('BuildPrompt').first().json;
const edit = $('SplitEdit').first().json;
const failures = [], flags = [...(edit.flags || [])];
const fail = (check, detail) => failures.push({ check, detail });
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const norm = memo.replace(/[\u2010-\u2015]/g, '-')                 // non-breaking hyphens and dashes
  .replace(/[\u00a0\u2000-\u200b\u202f\u205f\u3000]/g, ' ');   // non-breaking and narrow spaces
const low = norm.toLowerCase().replace(/\*/g, '');   // bold markers can hide words from checks
const has = p => new RegExp('\\b' + esc(p.toLowerCase()) + '\\b').test(low);

// C1: every number must come from the approved facts or the setup (or a date in the memo header).
const allowed = new Set();
const walk = v => { if (typeof v === 'number') allowed.add(v);
  else if (typeof v === 'string') (v.match(/\d+(\.\d+)?/g) || []).forEach(n => allowed.add(parseFloat(n)));
  else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
walk(facts); walk(setup);
const now = new Date(); [now.getFullYear(), now.getDate(), now.getMonth() + 1].forEach(n => allowed.add(n));
const body = norm.replace(/^#+\s*\d+\./gm, '').replace(/\(\d+\)/g, '').replace(/^\s*\d+\.\s/gm, '');
const unknown = [...new Set((body.match(/\d+(\.\d+)?/g) || []).map(parseFloat))].filter(n => !allowed.has(n));
if (unknown.length) fail('C1', `Numbers not in the approved facts: ${unknown.join(', ')}. Use only approved numbers.`);

// C2: the verdict must match the calculated one.
const u = facts.usefulness;
if (u.verdict) {
  // Accept "below your target" and "below your 80 percent target".
  const v = w => new RegExp(w.replace(' target', '(\\s+\\d+\\s*(percent|%))?\\s+target'));
  const other = u.verdict === 'met your target' ? 'below your target' : 'met your target';
  if (!v(u.verdict).test(low)) fail('C2', `The verdict "${u.verdict}" is missing.`);
  if (v(other).test(low)) fail('C2', `The memo says "${other}", but the result is "${u.verdict}".`);
}

// C2b: a garbled verdict, like "Your 80 percent target was below your target".
const garble = low.replace(/\*/g, '').match(/target (was|is|remains) (not )?(below|met) your/);
if (garble) fail('C2', `Garbled verdict: "...${garble[0]}...". Write it plainly, for example "That is below your ${setup.target_percent} percent target."`);

// C3: "roughly 1 in X" at most once, exactly as calculated.
const r = facts.referrals.roughly_1_in_x;
const n1inX = (low.match(/roughly 1 in \d+/g) || []);
if (n1inX.length > 1) fail('C3', `"roughly 1 in X" appears ${n1inX.length} times; use it once.`);
if (n1inX.length && r && !n1inX.every(x => x === r)) fail('C3', `"${n1inX[0]}" does not match the calculated "${r}".`);

// C4: banned words from guide section 8 (read from GitHub) plus the setup's project names.
const guide = await this.helpers.httpRequest({ url: 'https://raw.githubusercontent.com/jdmaurer/ai-automation-lab/main/cases/eval-summary-drafter/memo-guide.md', json: false });
const lists = (guide.match(/^- \*\*[^*]+\(banned[^)]*\):\*\* .*$/gm) || [])
  .map(l => l.replace(/^- \*\*[^*]+\*\* /, '').replace(/\(.*$/, '').replace(/\.$/, ''));
const banned = lists.join(', ').split(',').map(w => w.trim()).filter(w => w && !/model names|run numbers/.test(w))
  .concat(setup.banned_words || []);
const hits = [...new Set(banned.filter(has))];
if (hits.length) fail('C4', `Banned words: ${hits.join(', ')}. Replace each with plain business wording.`);

// C5: the first result carries a test qualifier.
const s1 = (norm.split(/^## *2\./m)[0] || '');
if (!new RegExp(`in testing|test (${esc(setup.item_word || 'item')}s?|items|cases)|in \\d+ test`, 'i').test(s1)) fail('C5', 'Section 1 states a result without "in testing" or "in N test [items]".');

// C6: seven numbered sections, in order.
const nums = (norm.match(/^## *(\d)\./gm) || []).map(h => +h.replace(/\D/g, ''));
if (nums.join() !== '1,2,3,4,5,6,7') fail('C6', `Sections found: ${nums.join(', ') || 'none'}. Expected 1 to 7 in order.`);

// C7 and C8: length.
// Count body words only: headings and the "Prepared for" line don't count toward the page.
const bodyText = norm.split('\n').filter(l => !/^\s*#/.test(l) && !/prepared for:/i.test(l)).join(' ');
const words = bodyText.replace(/[*_>|-]/g, ' ').split(/\s+/).filter(w => /\w/.test(w)).length;
if (words > 650) fail('C7', `${words} words; the ceiling is about 650. Cut repetition and wording, never content.`);
else if (words > 500) flags.push(`C7: ${words} words, over the 500-word target (under the 650 ceiling).`);
const long = norm.replace(/\n/g, ' ').split(/(?<=[.!?])\s+/).filter(s => s.split(/\s+/).length > 20);
if (long.length) flags.push(`C8: ${long.length} sentence(s) over 20 words.`);

// Guide rules without a checklist item (added 2026-09-26).
// 2.3a: say what each group of test items was. One sentence must carry the group's count AND at least
// half of the group's key words (same meaning, not exact wording). Word overlap alone is too loose when
// the group words are everyday words for that client ("typed vendor invoices" in an invoice memo).
const stop = new Set(['for','or','and','the','a','an','of','to','with','one']);
const stem = w => w.replace(/s$/, '');
const keyWords = t => t.toLowerCase().split(/[^a-z]+/).filter(w => w.length > 2 && !stop.has(w)).map(stem);
const sentences = low.replace(/\n+/g, ' ').split(/(?<=[.!?:])\s+/);
[['handled_group', facts.usefulness.total], ['person_group', facts.should_go_to_person.count]].forEach(([k, n]) => {
  const kw = setup[k] ? keyWords(setup[k]) : [];
  if (!kw.length || !n) return;
  const described = sentences.some(s => new RegExp(`\\b${n}\\b`).test(s) &&
    kw.filter(w => s.split(/[^a-z]+/).map(stem).includes(w)).length / kw.length >= 0.5);
  if (!described)
    fail('2.3a', `Say what the ${n} ${setup.item_word}s were, in one sentence with the number: "${setup[k]}" (same meaning, your own words).`);
});
if (['below_target', 'no_target'].includes(facts.scenario) && !/right target|revisit (the|your) target|set a target/.test(low))
  fail('3.4', 'Section 7 must ask whether the target is still right (or ask for one if none was set).');
if (setup.harmful_action && low.includes(setup.harmful_action.toLowerCase()))
  fail('7.5', `The harmful-action definition is pasted word for word. Use the short name instead, for example "0 ${setup.harmful_action_name || 'harmful action'}s in ${facts.total_items} test ${setup.item_word}s".`);
if (/\bthe harmful action\b/.test(low)) fail('7.5', 'Uses the label "the harmful action". Name what actually happens instead.');
// Units: any gap stated in points or percent must be the true gap (target minus result, rounded),
// and "short by" is counted in items. "2 points below" is fine; "1 percentage point" is not.
if (u.target_percent !== null && u.target_percent !== undefined) {
  const exactPct = u.total ? (u.count / u.total) * 100 : 0;
  const pointGap = Math.round(Math.abs(u.target_percent - exactPct));
  const wordNum = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const re = /(short by|below[^.]{0,40}?by|by|off by) (\d+|one|two|three|four|five) (percentage points?|points?|percent|%)/g;
  for (const g of low.replace(/\*/g, "").matchAll(re)) {   // ignore bold markers
    const n = wordNum[g[2]] ?? +g[2];
    if (g[1] === 'short by' || n !== pointGap)
      fail('units', `"${g[0]}" is wrong: the result is ${u.short_by} ${setup.item_word}(s) short, or ${pointGap} points below the target.`);
  }
}
// Numbers in words (fractions, approximations) are new numbers the facts never approved.
const wordNums = [...new Set(low.match(/\b(approximately|roughly (?!1 in)|(one|two|three|four)[- ](half|halves|thirds?|quarters?|fifths?)|half of|majority|most of)\b/g) || [])];
if (wordNums.length)
  fail('C1', `Numbers in words or approximations: ${wordNums.join(', ')}. Use the exact approved count instead, or remove the sentence.`);
// Absolute claims ("all", "every", "never") are where the AI overstates without using a number.
// Code can't judge them, so list them for the consultant (flag only).
const absolute = sentences.filter(s => /\b(all|every|never|always|entirely|completely)\b/.test(s) && !/^#/.test(s.trim()));
if (absolute.length) flags.push(`Check against the facts: ${absolute.slice(0, 4).map(s => `"${s.trim().slice(0, 110)}"`).join('; ')}`);
const missing = norm.match(/\[MISSING[^\]]*\]/g) || [];
if (missing.length) flags.push(`For you to fill: ${missing.join('; ')}`);

if (isRecheck) failures.forEach(f => flags.push(`Still failing after one fix: ${f.check}: ${f.detail}`));

return [{ json: { memo, failures, flags, word_count: words, fix_attempted: isRecheck,
  editor_changes: edit.changes, editor_flags: edit.editor_flags, facts, setup } }];
