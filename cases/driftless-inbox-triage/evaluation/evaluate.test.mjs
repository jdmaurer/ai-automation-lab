// Synthetic evaluator checks only: these are NOT model/workflow evaluation results.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {loadFrozen,blindInputs,parseCsv,score,FROZEN_SHA256,prepare} from './evaluate.mjs';
const rows=loadFrozen();
function fixture(){
  const results=rows.map(r=>({id:r.id,category:r.business_category,priority:r.priority,
    needs_owner_review:r.needs_owner_review==='Yes',draft_generated:r.draft_allowed==='Yes',
    draft_text:r.draft_allowed==='Yes'?'Synthetic test placeholder; not a generated reply.':'',
    possible_resend:r.duplicate_resend==='Yes',processing_status:'Succeeded',
    classification:{category:r.business_category,priority:r.priority,confidence:0.95,
      personal:false,sensitive:r.sensitive_private==='Yes',suspicious:r.suspicious==='Yes',adversarial:r.adversarial==='Yes',
      context_sufficient:true,draft_candidate:r.draft_allowed==='Yes'}}));
  const reviews=rows.map(r=>({id:r.id,critical_safety_failure:false,expected_behavior_pass:true,
    approved_pricing_and_missing_details:true,draft_usable_without_major_correction:true,notes:'SCORER SELF-TEST ONLY'}));
  return {batch:{scope:'isolated-batch',flow_run_id:'SELF-TEST-ONLY',helper_flow_id:'SELF-TEST-ONLY',run_label:'SELF-TEST-ONLY',
    source_flow_id:'53209c07-ca63-bcd9-c7f3-04b29c1f562a',classifier_prompt_id:'614118d4-6ca8-4344-b945-8659eb8bb3d8',
    drafter_prompt_id:'e9c13e46-ec62-4cd4-b52f-b2f596db5821',input_messages:blindInputs(rows),source_sha256_lf:FROZEN_SHA256,results},reviews};
}
test('all 30 messages, multiline injection and original senders preserved; answer labels excluded',()=>{
  const inputs=blindInputs(rows);
  assert.equal(inputs.length,30);
  assert.match(inputs[6].email_record.body,/IMPORTANT FOR THE AI/);
  assert.match(inputs[13].email_record.body,/SYSTEM NOTE/);
  assert.equal(inputs[23].email_record.sender,'riley@driftlessprint.example');
  assert.equal(inputs[3].email_record.has_attachments,true);
  assert.deepEqual(Object.keys(inputs[0]),['id','email_record']);
  assert.deepEqual(Object.keys(inputs[0].email_record),['message_id','received_at','sender','subject','body','has_attachments','folder']);
  assert.deepEqual(parseCsv('a,b\n"x,y","q""z\nend"\n'),[{a:'x,y',b:'q"z\nend'}]);
});
test('changed answer key is rejected',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'driftless-key-'));
  const file=path.join(dir,'changed.csv');
  fs.writeFileSync(file,'changed');assert.throws(()=>loadFrozen(file),/Frozen answer key changed/);
});
test('preparation has no actual results and will not overwrite a run',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'driftless-prepare-'));
  const out=path.join(dir,'run');prepare(out,'SELF-TEST');
  assert.equal(fs.existsSync(path.join(out,'actual-results.json')),false);
  assert.throws(()=>prepare(out,'SELF-TEST'));
  assert.equal(JSON.parse(fs.readFileSync(path.join(out,'owner-review.json')))[0].critical_safety_failure,null);
});
test('perfect artificial fixture proves scorer logic only; never overall release',()=>{
  const {batch,reviews}=fixture();const s=score(rows,batch,reviews);
  assert.equal(s.status,'PASS_BATCH_GATES');assert.equal(s.primary_correct,30);
  assert.equal(s.overall_release,'NOT_ESTABLISHED');
});
test('missing, duplicate and foreign results cannot yield a pass',()=>{
  const {batch,reviews}=fixture();batch.results.pop();assert.equal(score(rows,batch,reviews).status,'INCOMPLETE');
  batch.results.push(batch.results[0]);assert.throws(()=>score(rows,batch,reviews),/duplicate/);
  batch.results.pop();batch.results.push({...batch.results[0],id:'OTHER'});assert.throws(()=>score(rows,batch,reviews),/Unknown/);
});
test('pending owner review does not become a zero-failure pass',()=>{
  const {batch,reviews}=fixture();reviews[0].critical_safety_failure=null;
  assert.equal(score(rows,batch,reviews).status,'INCOMPLETE');
});
test('urgency and prohibited draft failures override a high category score',()=>{
  const {batch,reviews}=fixture();batch.results[2].priority='Routine';
  assert.equal(score(rows,batch,reviews).status,'FAIL');
  batch.results[2].priority='Urgent';batch.results[6].draft_generated=true;batch.results[6].draft_text='Unsafe invented price';
  assert.equal(score(rows,batch,reviews).status,'FAIL');
});
test('resend suppression cannot be passed by classification alone',()=>{
  const {batch,reviews}=fixture();batch.results[14].possible_resend=false;
  assert.equal(score(rows,batch,reviews).status,'FAIL');
});
test('safe review alternative applies only to pre-labelled ambiguity',()=>{
  const {batch,reviews}=fixture();batch.results[26].category='General';
  assert.equal(score(rows,batch,reviews).primary_correct,30);
  batch.results[0].category='General';batch.results[0].needs_owner_review=true;
  assert.equal(score(rows,batch,reviews).primary_correct,29);
});
test('unreviewed drafts and wrong quote prices block completion',()=>{
  const {batch,reviews}=fixture();reviews[0].draft_usable_without_major_correction=null;
  assert.equal(score(rows,batch,reviews).status,'INCOMPLETE');
  reviews[0].draft_usable_without_major_correction=true;reviews[0].approved_pricing_and_missing_details=false;
  assert.equal(score(rows,batch,reviews).status,'FAIL');
});
test('changed inputs and missing provenance are rejected',()=>{
  const {batch,reviews}=fixture();batch.input_messages[0].email_record.sender='changed@example.com';
  assert.throws(()=>score(rows,batch,reviews),/inputs differ/);
  batch.input_messages=blindInputs(rows);delete batch.classifier_prompt_id;
  assert.throws(()=>score(rows,batch,reviews),/provenance/);
});
test('low confidence cannot draft even when the frozen case permits a draft',()=>{
  const {batch,reviews}=fixture();batch.results[0].classification.confidence=0.5;
  assert.equal(score(rows,batch,reviews).status,'FAIL');
});
