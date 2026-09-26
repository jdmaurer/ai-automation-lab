// ComputeFacts: turns the setup file and the test results into the approved facts.
// Every number the memo may use comes from here. The AI never calculates.
const body = $input.first().json.body;
const setup = body.setup;
const items = body.results.items;
const P = setup.person_label;
const flags = [];

// Optional per-client outcome labels, e.g. {"fixed_by_person": "referral"}.
// Allowed values: useful, referral, harmful, correct_referral.
const labels = setup.outcome_labels || {};

function grade(i) {
  if (i.outcome) {
    if (labels[i.outcome]) return labels[i.outcome];
    flags.push(`${i.id}: outcome "${i.outcome}" is not listed in the setup's outcome_labels`);
    return 'unknown';
  }
  if (i.correct_answer === P) return i.system_did === P ? 'correct_referral' : 'harmful';
  if (i.system_did === i.correct_answer) return 'useful';
  if (i.system_did === P) return 'referral';
  return 'harmful';
}

const graded = items.map(i => ({ ...i, grade: grade(i) }));
const count = g => graded.filter(i => i.grade === g).length;

// Usefulness is measured on the items the system is supposed to handle itself.
const base = graded.filter(i => i.correct_answer !== P);
const useful = base.filter(i => i.grade === 'useful').length;
const referred = base.filter(i => i.grade === 'referral');
const exact = base.length ? (useful / base.length) * 100 : 0;
const target = setup.target_percent ?? null;

let verdict = null, oneMore = null, shortBy = null;
if (target !== null) {
  verdict = exact >= target ? 'met your target' : 'below your target';   // decided on the unrounded value
  if (exact < target) {
    shortBy = Math.ceil((target * base.length) / 100) - useful;
    oneMore = { count: useful + 1, percent: Math.round(((useful + 1) / base.length) * 100) };
  }
} else {
  flags.push('No target in setup: the memo reports the result and asks the owner to set one.');
}

// Scenario picks the options playbook row (guide 5.5).
const scenario = count('harmful') > 0 ? 'harmful'
  : target === null ? 'no_target'
  : exact >= target ? 'met_target' : 'below_target';

const oneInX = referred.length ? Math.round(base.length / referred.length) : null;

const facts = {
  test_date: body.results.test_date,
  scenario,
  total_items: graded.length,
  held_back: graded.filter(i => i.held_back).length,
  harmful: {
    count: count('harmful'),
    total: graded.length,
    items: graded.filter(i => i.grade === 'harmful')
      .map(({ id, item, correct_answer, system_did }) => ({ id, item, correct_answer, system_did })),
  },
  should_go_to_person: { count: graded.length - base.length,
                         sent_to_person: count('correct_referral') },
  usefulness: {
    count: useful,
    total: base.length,
    percent: Math.round(exact),
    target_percent: target,
    verdict,
    short_by: shortBy,
    one_more: oneMore,
  },
  referrals: {
    count: referred.length,
    total: base.length,
    roughly_1_in_x: oneInX ? `roughly 1 in ${oneInX}` : null,
    examples: referred.map(({ id, item }) => ({ id, item })),
  },
  flags,
};

return [{ json: { facts, setup } }];
