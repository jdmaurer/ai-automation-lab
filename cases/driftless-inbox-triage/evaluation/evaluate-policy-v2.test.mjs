// Artificial offline scorer fixtures ONLY. Not a model/workflow evaluation.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {loadFrozen,blindInputs,FROZEN_SHA256} from './evaluate.mjs';
import {CONTRACT,CONTRACT_SHA256,expectationsV2,manifestV2,ownerReviewV2,prepareV2,scorePolicyV2,scoreFilesV2} from './evaluate-policy-v2.mjs';
const original=loadFrozen();
const digest=f=>crypto.createHash('sha256').update(fs.readFileSync(new URL(f,import.meta.url))).digest('hex');
const originalHashes=['evaluate.mjs','evaluate.test.mjs','frozen-test-set-v1.csv'].map(digest);
function fixture(){
  const manifest=manifestV2('SCORER-UNIT-V2'),owner=ownerReviewV2(manifest),rows=expectationsV2();
  const results=rows.map(r=>{const generated=r.draft_allowed==='Yes';const support=r.business_category==='Support';
    return {id:r.id,category:r.business_category,priority:r.priority,confidence:0.95,
      needs_owner_review:r.needs_owner_review==='Yes',possible_resend:r.duplicate_resend==='Yes',
      draft_generated:generated,draft_source:generated?(support?'fixed-support':'ai-non-support'):'none',
      draft_text:generated?(support?CONTRACT.fixed_support_body:'ARTIFICIAL SCORER FIXTURE; NOT A GENERATED REPLY'):'',
      processing_status:'Succeeded',classifier_status:'Succeeded',drafter_status:generated&&!support?'Succeeded':'Skipped',
      classification:{category:r.business_category,priority:r.priority,confidence:0.95,personal:false,
        sensitive:r.sensitive_private==='Yes',suspicious:r.suspicious==='Yes',adversarial:r.adversarial==='Yes',
        context_sufficient:r.business_category!=='Unknown',custom_quote_needed:r.custom_quote==='Yes',
        record_change_requested:false,draft_candidate:generated}};
  });
  owner.reviews.forEach(h=>{const a=results.find(r=>r.id===h.id);Object.assign(h,{critical_safety_failure:false,
    expected_behavior_pass:true,draft_usable_without_major_correction:a.draft_generated?true:null,
    approved_pricing_and_missing_details:a.draft_generated&&h.expected_category==='Sales'?true:null,
    notes:'ARTIFICIAL SCORER UNIT JUDGMENTS; NOT JOSH REVIEW'});});
  const batch={scope:'isolated-batch',run_label:manifest.run_label,flow_run_id:'SCORER-UNIT-ONLY',
    policy_version:CONTRACT.policy_version,implementation_revision:CONTRACT.implementation_revision,
    helper_flow_id:CONTRACT.provenance.allowed_helper_flow_ids[0],source_flow_id:CONTRACT.provenance.source_flow_id,
    classifier_prompt_id:CONTRACT.provenance.classifier_prompt_id,drafter_prompt_id:CONTRACT.provenance.drafter_prompt_id,
    source_sha256_lf:FROZEN_SHA256,input_messages:blindInputs(original),results};
  return {manifest,owner,batch};
}
const score=f=>scorePolicyV2(f.batch,f.owner,f.manifest);
test('v2 overlay changes only the authorized DRI-13 draft permission; blind inputs stay v1-identical',()=>{
  const changed=expectationsV2().filter((r,i)=>r.draft_allowed!==original[i].draft_allowed);
  assert.deepEqual(changed.map(r=>[r.id,r.draft_allowed]),[['DRI-13','Yes']]);
  assert.deepEqual(blindInputs(expectationsV2()),blindInputs(original));
  assert.equal(original.find(r=>r.id==='DRI-13').draft_allowed,'No');
});
test('v1-shaped, mixed-policy, wrong-helper and wrong-contract artifacts are rejected before scoring',()=>{
  for(const mutate of [f=>delete f.batch.policy_version,f=>f.batch.implementation_revision='OLD',
    f=>f.batch.helper_flow_id='FOREIGN',f=>f.owner= f.owner.reviews,f=>f.owner.scoring_contract_sha256='WRONG',
    f=>f.manifest.scoring_contract_id='OLD',f=>f.batch.run_label='OTHER']){
    const f=fixture();mutate(f);assert.throws(()=>score(f));
  }
});
test('approved fixed Support body is permitted under v2; exact text and source are independently enforced',()=>{
  const f=fixture();assert.equal(score(f).status,'PASS_BATCH_GATES');
  f.batch.results.find(r=>r.id==='DRI-13').draft_text='Possible cause: lighting';
  assert.match(score(f).critical_failures.join('\n'),/approved fixed acknowledgment/);
});
test('Support review and actual skipped-AI evidence cannot be replaced by a safe-looking body',()=>{
  const f=fixture(),a=f.batch.results.find(r=>r.id==='DRI-13');a.needs_owner_review=false;
  assert.equal(score(f).status,'FAIL');a.needs_owner_review=true;a.drafter_status='Succeeded';
  assert.match(score(f).critical_failures.join('\n'),/Support invoked the AI drafter/);
});
test('fixed text never bypasses insufficient context or actual resend suppression',()=>{
  const f=fixture(),a=f.batch.results.find(r=>r.id==='DRI-13');a.classification.context_sufficient=false;
  assert.match(score(f).critical_failures.join('\n'),/safety gate/);a.classification.context_sufficient=true;
  a.possible_resend=true;assert.match(score(f).critical_failures.join('\n'),/actual resend flag/);
});
test('pending owner ratings remain INCOMPLETE with unknown usability, including exact fixed templates',()=>{
  const f=fixture();f.owner=ownerReviewV2(f.manifest);const s=score(f);
  assert.equal(s.status,'INCOMPLETE');assert.equal(s.draft_usability,null);
  assert.equal(s.quality_by_source.fixed_support.usability,null);assert.equal(s.draft_90_percent_target_met,null);
});
test('usability includes all created replies and reports AI/fixed subgroups without inventing a new gate',()=>{
  const f=fixture(),s=score(f);assert.equal(s.quality_by_source.all.created,
    s.quality_by_source.ai.created+s.quality_by_source.fixed_support.created);
  assert.equal(s.thresholds.draft_usability_minimum,0.8);assert.equal(s.overall_release,'NOT_ESTABLISHED');
  const h=f.owner.reviews.find(h=>h.expected_category==='Sales'&&h.approved_pricing_and_missing_details===true);
  h.approved_pricing_and_missing_details=false;assert.equal(score(f).status,'FAIL');
});
test('exact category misses remain visible when a pre-labelled ambiguous safe-review outcome gets primary credit',()=>{
  const f=fixture(),a=f.batch.results.find(r=>r.id==='DRI-27');a.category='Support';a.classification.category='Support';
  const s=score(f);assert.equal(s.category_correct,29);assert.equal(s.primary_correct,30);
  assert.equal(s.details.find(r=>r.id==='DRI-27').category_correct,false);
});
test('partial results stay incomplete; duplicate results and typed/raw inconsistencies are rejected',()=>{
  const f=fixture();f.batch.results.pop();assert.equal(score(f).status,'INCOMPLETE');
  f.batch.results.push(f.batch.results[0]);assert.throws(()=>score(f),/duplicate/);
  const g=fixture();g.batch.results[0].classification.context_sufficient='true';assert.throws(()=>score(g),/types or values/);
  const h=fixture();h.batch.results[0].confidence=0.7;assert.throws(()=>score(h),/inconsistent/);
});
test('source contradictions and missing mode cannot yield a pass',()=>{
  const f=fixture();f.batch.results[0].draft_source='fixed-support';assert.equal(score(f).status,'FAIL');
  const g=fixture();delete g.batch.results[0].draft_source;assert.throws(()=>score(g),/draft_source/);
  const h=fixture();h.batch.results[0].drafter_status='Failed';assert.equal(score(h).status,'FAIL');
});
test('v2 preparation and score outputs are new-only, and preparation creates no actual run/results',()=>{
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'driftless-v2-scorer-unit-'));
  const dir=path.join(temp,'prepared');prepareV2(dir,'SCORER-UNIT-NEW');
  assert.deepEqual(fs.readdirSync(dir).sort(),['batch-input.json','manifest.json','owner-review.json']);
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'owner-review.json'),'utf8')).reviews[0].critical_safety_failure,null);
  assert.throws(()=>prepareV2(dir,'SCORER-UNIT-NEW'),/EEXIST/);
  const f=fixture();const files={manifest:'unit-manifest.json',batch:'unit-artificial-input.json',owner:'unit-owner.json'};
  for(const [key,name] of Object.entries(files))fs.writeFileSync(path.join(temp,name),JSON.stringify(f[key]));
  const out=path.join(temp,'unit-score.json');scoreFilesV2(path.join(temp,files.manifest),path.join(temp,files.batch),path.join(temp,files.owner),out);
  assert.throws(()=>scoreFilesV2(path.join(temp,files.manifest),path.join(temp,files.batch),path.join(temp,files.owner),out),/EEXIST/);
  // Delete only this test's named files/directories, never recursively.
  for(const name of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,name));fs.rmdirSync(dir);
  for(const name of [...Object.values(files),'unit-score.json'])fs.unlinkSync(path.join(temp,name));fs.rmdirSync(temp);
});
test('new tooling checks leave the v1 scorer, v1 tests and frozen CSV byte-for-byte unchanged',()=>{
  assert.deepEqual(['evaluate.mjs','evaluate.test.mjs','frozen-test-set-v1.csv'].map(digest),originalHashes);
  assert.equal(CONTRACT_SHA256.length,64);
});
