// Structure/parity assertions only. Power Automate import/checker/runtime is pending.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import './build-helper.mjs';
const blueprint=JSON.parse(fs.readFileSync(new URL('./batch-helper-blueprint.json',import.meta.url),'utf8'));
const reference=JSON.parse(fs.readFileSync(new URL('./live-routing-reference-2026-11-14.json',import.meta.url),'utf8'));
const outer=blueprint.definition.actions;
const loop=outer['For_Each_-_Frozen_Message'];
const valid=loop.actions['Validate_-_AI_Output'];
const confidence=valid.actions['Rule_-_Confidence_High_Enough'];
test('mirrored confidence, review and draft gates exactly match observed expression trees',()=>{
  assert.deepEqual(confidence.expression,reference.confidence_expression);
  assert.deepEqual(confidence.actions['Rule_-_Owner_Review_Required'].expression,reference.owner_review_expression);
  assert.deepEqual(confidence.actions['Rule_-_Draft_Allowed'].expression,reference.draft_expression);
});
test('only existing shared prompt calls; no mailbox/table writes or hidden answer labels',()=>{
  const calls=[];
  const walk=o=>{if(o&&typeof o==='object'){if(o.type==='OpenApiConnection')calls.push(o);Object.values(o).forEach(walk);}};
  walk(blueprint.definition);
  assert.equal(calls.length,2);
  assert.deepEqual(calls.map(c=>c.inputs.parameters.recordId).sort(),['614118d4-6ca8-4344-b945-8659eb8bb3d8','e9c13e46-ec62-4cd4-b52f-b2f596db5821'].sort());
  assert.ok(calls.every(c=>c.inputs.host.operationId==='aibuilderpredict_customprompt'));
  const text=JSON.stringify(blueprint.definition);
  assert.equal(/triggerOutputs\(|draftMessage|CreateRecord|UpdateRecord|business_category|expected_behavior/.test(text),false);
});
test('original normalized record reused; sequential loop resets review flag',()=>{
  assert.equal(loop.runtimeConfiguration.concurrency.repetitions,1);
  assert.equal(loop.actions['Normalize_-_Email_Fields'].inputs,"@items('For_Each_-_Frozen_Message')?['email_record']");
  assert.equal(loop.actions['Reset_-_Owner_Review'].inputs.value,"@items('For_Each_-_Frozen_Message')?['email_record']?['has_attachments']");
});
test('collector and export keep failure/skip cases visible and contain actual provenance/input',()=>{
  assert.deepEqual(loop.actions['Collect_-_Actual_Result'].runAfter['Validate_-_AI_Output'],['Succeeded','Failed','TimedOut','Skipped']);
  const output=outer['Export_-_Evaluation_Results'].inputs;
  assert.equal(output.scope,'isolated-batch');assert.equal(output.input_messages,"@body('Parse_-_Frozen_Batch')");
  assert.equal(output.flow_run_id,"@workflow()?['run']?['name']");
  assert.equal(blueprint.artifact_status,'BLUEPRINT_NOT_IMPORTED_OR_RUNTIME_VERIFIED');
});
