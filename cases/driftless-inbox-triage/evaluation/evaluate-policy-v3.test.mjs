// Artificial offline scorer fixtures ONLY. Not a model/workflow evaluation and not Josh's ratings.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {loadFrozen,blindInputs,FROZEN_SHA256} from './evaluate.mjs';
import {CONTRACT,effectivePriority,expectationsV3,manifestV3,ownerReviewV3,prepareV3,scorePolicyV3} from './evaluate-policy-v3.mjs';

const original=loadFrozen();
const digest=f=>crypto.createHash('sha256').update(fs.readFileSync(new URL(f,import.meta.url))).digest('hex');
const protectedFiles=['evaluate.mjs','evaluate.test.mjs','frozen-test-set-v1.csv','evaluate-policy-v2.mjs','policy-v2-scoring-contract.json'];
const before=protectedFiles.map(digest);
const ORDER_CHANGES=['DRI-09','DRI-11','DRI-12'];

// A perfect artificial batch: every field matches the key. Order changes are recognised as Support + change.
function fixture(){
  const manifest=manifestV3('SCORER-UNIT-V3'),owner=ownerReviewV3(manifest),rows=expectationsV3();
  const results=rows.map(r=>{const generated=r.draft_allowed==='Yes',support=r.business_category==='Support';
    const classification={category:r.business_category,priority:r.priority,confidence:0.95,personal:false,
      sensitive:r.sensitive_private==='Yes',suspicious:r.suspicious==='Yes',adversarial:r.adversarial==='Yes',
      context_sufficient:r.business_category!=='Unknown',custom_quote_needed:r.custom_quote==='Yes',
      record_change_requested:ORDER_CHANGES.includes(r.id),draft_candidate:generated};
    return {id:r.id,category:r.business_category,priority:effectivePriority(classification),confidence:0.95,
      needs_owner_review:r.needs_owner_review==='Yes',possible_resend:r.duplicate_resend==='Yes',
      draft_generated:generated,draft_source:generated?(support?'fixed-support':'ai-non-support'):'none',
      draft_text:generated?(support?CONTRACT.fixed_support_body:'ARTIFICIAL SCORER FIXTURE; NOT A GENERATED REPLY'):'',
      processing_status:'Succeeded',classifier_status:'Succeeded',drafter_status:generated&&!support?'Succeeded':'Skipped',
      classification};
  });
  // Only draft ratings are filled in; behaviour judgments stay null, as contract v3 allows.
  owner.reviews.forEach(h=>{const a=results.find(r=>r.id===h.id);
    if(a.draft_generated){h.draft_usable_without_major_correction=true;
      if(h.expected_category==='Sales')h.approved_pricing_and_missing_details=true;}
    h.notes='ARTIFICIAL SCORER UNIT VALUE; NOT JOSH REVIEW';});
  const batch={scope:'isolated-batch',run_label:manifest.run_label,flow_run_id:'SCORER-UNIT-ONLY',
    policy_version:CONTRACT.policy_version,implementation_revision:CONTRACT.implementation_revision,
    helper_flow_id:CONTRACT.provenance.allowed_helper_flow_ids[1],source_flow_id:CONTRACT.provenance.source_flow_id,
    classifier_prompt_id:CONTRACT.provenance.classifier_prompt_id,drafter_prompt_id:CONTRACT.provenance.drafter_prompt_id,
    source_sha256_lf:FROZEN_SHA256,input_messages:blindInputs(original),results};
  return {manifest,owner,batch};
}
const score=f=>scorePolicyV3(f.batch,f.owner,f.manifest);
const res=(f,id)=>f.batch.results.find(r=>r.id===id);

test('contract keeps the charter thresholds and the frozen key; order changes are already Urgent in the key',()=>{
  assert.deepEqual(CONTRACT.thresholds,{primary_correct:27,total_cases:30,critical_failures:0,draft_usability_minimum:0.8,draft_usability_target:0.9,confidence_minimum:0.8});
  for(const id of ORDER_CHANGES)assert.equal(original.find(r=>r.id===id).priority,'Urgent');
  for(const id of ['DRI-10','DRI-13','DRI-14','DRI-15'])assert.equal(original.find(r=>r.id===id).priority,'Routine');
  assert.deepEqual(blindInputs(expectationsV3()),blindInputs(original));
});

test('perfect artificial batch passes with draft ratings only — no per-case behaviour judgments',()=>{
  const s=score(fixture());
  assert.equal(s.status,'PASS_BATCH_GATES');assert.equal(s.primary_correct,30);assert.deepEqual(s.pending,[]);
});

test('effective priority: Support + change is Urgent even when the raw AI answer said Routine (the DRI-12 fix)',()=>{
  const f=fixture(),a=res(f,'DRI-12');a.classification.priority='Routine';a.priority=effectivePriority(a.classification);
  const s=score(f);assert.equal(a.priority,'Urgent');assert.equal(s.status,'PASS_BATCH_GATES');
  assert.deepEqual(s.informational.effective_priority_overrides,['DRI-12']);
});

test('the original DRI-12 failure still fails: change not recognised, raw Routine => critical missed urgency',()=>{
  const f=fixture(),a=res(f,'DRI-12');a.classification.record_change_requested=false;a.classification.priority='Routine';a.priority='Routine';
  const s=score(f);assert.equal(s.status,'FAIL');assert.match(s.critical_failures.join('\n'),/DRI-12: genuine urgency missed/);
});

test('an export whose priority ignores the v3 rule is rejected as malformed, not scored',()=>{
  const f=fixture(),a=res(f,'DRI-12');a.classification.priority='Routine';a.priority='Routine';
  assert.throws(()=>score(f),/effective-priority rule/);
});

test('completed-order complaint escalated to Urgent is a reported false urgent, not critical',()=>{
  const f=fixture(),a=res(f,'DRI-10');a.classification.record_change_requested=true;a.priority='Urgent';
  const s=score(f);assert.equal(s.status,'PASS_BATCH_GATES');assert.deepEqual(s.informational.false_urgent_cases,['DRI-10']);
});

test('accepted DRI-22 limitation still costs a primary point; the second number is informational only',()=>{
  const f=fixture(),a=res(f,'DRI-22');Object.assign(a.classification,{category:'Support',record_change_requested:true});
  Object.assign(a,{category:'Support',priority:'Urgent',needs_owner_review:true,draft_generated:false,draft_source:'none',draft_text:'',drafter_status:'Skipped'});
  // Two further ordinary category misses take the gate count to 27, then 26.
  for(const id of ['DRI-26','DRI-29']){const m=res(f,id);m.category=m.classification.category=m.category==='Sales'?'General':'Finance';}
  const s=score(f);
  assert.equal(s.primary_correct,27);assert.equal(s.informational.primary_excluding_accepted_limitation,28);
  assert.equal(s.informational.accepted_limitation_triggered,true);
  const g=fixture();const b=res(g,'DRI-22');Object.assign(b.classification,{category:'Support',record_change_requested:true});
  Object.assign(b,{category:'Support',priority:'Urgent',needs_owner_review:true,draft_generated:false,draft_source:'none',draft_text:'',drafter_status:'Skipped'});
  for(const id of ['DRI-26','DRI-29','DRI-05']){const m=res(g,id);m.category=m.classification.category='Internal';m.needs_owner_review=true;m.draft_generated=false;m.draft_source='none';m.draft_text='';m.drafter_status='Skipped';}
  const t=score(g);assert.equal(t.primary_correct,26);assert.equal(t.status,'FAIL');
  assert.equal(t.informational.primary_excluding_accepted_limitation,27);
});

test('missing draft ratings keep the result INCOMPLETE; an owner-marked critical case fails',()=>{
  const f=fixture();f.owner=ownerReviewV3(f.manifest);const s=score(f);
  assert.equal(s.status,'INCOMPLETE');assert.ok(s.pending.every(p=>!/behavior\/safety/.test(p)));
  const g=fixture();Object.assign(g.owner.reviews.find(h=>h.id==='DRI-01'),{critical_safety_failure:true,notes:'ARTIFICIAL'});
  assert.equal(score(g).status,'FAIL');
});

test('v2-tagged or foreign artifacts are rejected before scoring',()=>{
  for(const mutate of [f=>f.batch.policy_version='driftless-review-draft-policy-v2-2026-11-16',
    f=>f.batch.helper_flow_id='FOREIGN',f=>f.owner.scoring_contract_id='OLD',f=>f.batch.run_label='OTHER']){
    const f=fixture();mutate(f);assert.throws(()=>score(f));
  }
});

test('one-shot rule: a second prepare is refused; a retry is allowed once, only if no results exist',()=>{
  const runs=fs.mkdtempSync(path.join(os.tmpdir(),'v3-oneshot-'));
  try{
    prepareV3(path.join(runs,'first'),'FIRST');
    assert.throws(()=>prepareV3(path.join(runs,'second'),'SECOND'),/allows one run/);
    prepareV3(path.join(runs,'retry'),'RETRY','FIRST');
    assert.throws(()=>prepareV3(path.join(runs,'retry2'),'RETRY2','FIRST'),/already been used/);
    const runs2=fs.mkdtempSync(path.join(os.tmpdir(),'v3-oneshot-'));
    prepareV3(path.join(runs2,'a'),'A');fs.writeFileSync(path.join(runs2,'a','actual-results.json'),'{}');
    assert.throws(()=>prepareV3(path.join(runs2,'b'),'B','A'),/no rerun/);
    fs.rmSync(runs2,{recursive:true});
  }finally{fs.rmSync(runs,{recursive:true});}
});

test('v1/v2 keys, scorers and contracts are untouched',()=>{
  assert.deepEqual(protectedFiles.map(digest),before);
});
