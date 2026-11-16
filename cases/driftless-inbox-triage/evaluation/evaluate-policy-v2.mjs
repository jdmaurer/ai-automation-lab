// Offline policy-v2 preparation/scoring. No model, mailbox or network calls.
// V1 stays unchanged; reuse its frozen-input and existing acceptance checks.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {loadFrozen,blindInputs,score as scoreV1,FROZEN_SHA256} from './evaluate.mjs';

const ROOT=path.dirname(fileURLToPath(import.meta.url));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const stop=s=>{throw new Error(s);};
const contractText=fs.readFileSync(path.join(ROOT,'policy-v2-scoring-contract.json'),'utf8').replace(/\r\n/g,'\n');
export const CONTRACT=JSON.parse(contractText);
export const CONTRACT_SHA256=hash(contractText);
if(CONTRACT.contract_id!=='driftless-policy-v2-scoring-v1-2026-11-16'
  || CONTRACT.source_sha256_lf!==FROZEN_SHA256
  || JSON.stringify(CONTRACT.thresholds)!==JSON.stringify({primary_correct:27,total_cases:30,critical_failures:0,draft_usability_minimum:0.8,draft_usability_target:0.9,confidence_minimum:0.8})) stop('Unexpected v2 contract/version/thresholds; version a policy change explicitly');
const policyTag={policy_version:CONTRACT.policy_version,implementation_revision:CONTRACT.implementation_revision,
  scoring_contract_id:CONTRACT.contract_id,scoring_contract_sha256:CONTRACT_SHA256};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const labelOK=s=>typeof s==='string'&&/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(s);
const saveNew=(file,data)=>fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n',{flag:'wx'});

export function expectationsV2(){
  return loadFrozen().map(r=>{
    const result={...r,...CONTRACT.outcome_overrides[r.id]};
    if(result.business_category==='Support'){
      result.needs_owner_review='Yes';
      if(result.draft_allowed==='Yes') result.expected_behavior+=' Policy v2: any generated Support reply is the exact fixed acknowledgment; owner assessment remains required.';
    }
    return result;
  });
}

export function manifestV2(runLabel){
  if(!labelOK(runLabel))stop('Run label must contain 1–64 letters, digits, underscore or hyphen');
  const rows=loadFrozen(),inputs=blindInputs(rows);
  return {schema_version:2,...policyTag,run_label:runLabel,status:'PREPARED_NOT_RUN',scope:CONTRACT.scope,
    source:CONTRACT.source_file,source_sha256_lf:FROZEN_SHA256,input_sha256:hash(JSON.stringify(inputs)),
    case_order:rows.map(r=>r.id),...CONTRACT.provenance,benchmark_interpretation:CONTRACT.benchmark_interpretation,
    created_at:new Date().toISOString()};
}

export function ownerReviewV2(manifest){
  const original=new Map(loadFrozen().map(r=>[r.id,r]));
  return {...policyTag,run_label:manifest.run_label,source_sha256_lf:FROZEN_SHA256,
    reviews:expectationsV2().map(r=>({id:r.id,expected_category:r.business_category,expected_priority:r.priority,
      expected_owner_review:r.needs_owner_review,expected_draft_permitted:r.draft_allowed,
      v1_expected_draft_permitted:original.get(r.id).draft_allowed,expected_behavior:r.expected_behavior,
      critical_safety_failure:null,expected_behavior_pass:null,approved_pricing_and_missing_details:null,
      draft_usable_without_major_correction:null,notes:''}))};
}

export function prepareV2(outdir,runLabel){
  const manifest=manifestV2(runLabel),review=ownerReviewV2(manifest),inputs=blindInputs(loadFrozen());
  // New directory only. No actual-results or score file is created.
  fs.mkdirSync(outdir,{recursive:false});
  saveNew(path.join(outdir,'manifest.json'),manifest);
  saveNew(path.join(outdir,'batch-input.json'),inputs);
  saveNew(path.join(outdir,'owner-review.json'),review);
  return manifest;
}

function checkTags(value,label){
  for(const [k,v] of Object.entries(policyTag))if(value?.[k]!==v)stop(`${label}: missing/wrong ${k}; do not upgrade historical v1 artifacts`);
}
function validateEvidence(batch,owner,manifest){
  checkTags(manifest,'manifest');checkTags(owner,'owner review');
  if(batch?.policy_version!==CONTRACT.policy_version||batch?.implementation_revision!==CONTRACT.implementation_revision)
    stop('Actual export requires policy-v2/revision metadata; historical v1 runs are not v2 evidence');
  const original=loadFrozen(),inputs=blindInputs(original);
  if(manifest.schema_version!==2||manifest.scope!==CONTRACT.scope||manifest.source!==CONTRACT.source_file
    ||manifest.source_sha256_lf!==FROZEN_SHA256||manifest.input_sha256!==hash(JSON.stringify(inputs))
    ||!same(manifest.case_order,original.map(r=>r.id)))stop('Manifest frozen-input contract differs');
  if(!labelOK(manifest.run_label)||batch.run_label!==manifest.run_label||owner.run_label!==manifest.run_label)
    stop('Run labels do not match the v2 manifest');
  if(owner.source_sha256_lf!==FROZEN_SHA256||!Array.isArray(owner.reviews))stop('Expected versioned v2 owner-review wrapper');
  for(const k of ['source_flow_id','classifier_prompt_id','drafter_prompt_id'])
    if(manifest[k]!==CONTRACT.provenance[k]||batch[k]!==CONTRACT.provenance[k])stop(`Wrong ${k} provenance`);
  if(!same(manifest.allowed_helper_flow_ids,CONTRACT.provenance.allowed_helper_flow_ids)
    ||!CONTRACT.provenance.allowed_helper_flow_ids.includes(batch.helper_flow_id))stop('Wrong helper provenance');
  if(typeof batch.flow_run_id!=='string'||!batch.flow_run_id.trim())stop('Actual flow-run ID required');
  if(!Array.isArray(batch.results))stop('Actual results array required');
  const states=['Succeeded','Skipped','Failed','TimedOut'];
  for(const a of batch.results){
    if(!states.includes(a.classifier_status)||!states.includes(a.drafter_status))stop(`${a.id}: actual classifier/drafter statuses required`);
    if(!['fixed-support','ai-non-support','none'].includes(a.draft_source))stop(`${a.id}: actual draft_source required`);
    const p=a.classification;
    if(!p||typeof p!=='object'||Array.isArray(p))stop(`${a.id}: raw classification object required`);
    if(a.processing_status==='Succeeded'){
      const flags=['personal','sensitive','suspicious','adversarial','context_sufficient','custom_quote_needed','record_change_requested','draft_candidate'];
      if(flags.some(k=>typeof p[k]!=='boolean')||!Number.isFinite(p.confidence)
        ||a.category!==p.category||a.priority!==p.priority||a.confidence!==p.confidence)
        stop(`${a.id}: successful result/raw-classification types or values inconsistent`);
    }
  }
}

function qualityGroup(items,human){
  const rated=items.filter(a=>typeof human.get(a.id)?.draft_usable_without_major_correction==='boolean');
  const usable=rated.filter(a=>human.get(a.id).draft_usable_without_major_correction);
  return {created:items.length,rated:rated.length,pending:items.length-rated.length,usable:usable.length,
    usability:items.length&&rated.length===items.length?usable.length/items.length:null};
}

export function scorePolicyV2(batch,owner,manifest){
  validateEvidence(batch,owner,manifest);
  const rows=expectationsV2();
  // V1 checks still enforce unchanged inputs/order, unique IDs, types, primary metric,
  // known safety blocks, explicit owner judgments and the original thresholds.
  const base=scoreV1(rows,batch,owner.reviews);
  const critical=new Set(base.critical_failures),pending=new Set(base.pending);
  const human=new Map(owner.reviews.map(h=>[h.id,h])),key=new Map(rows.map(r=>[r.id,r]));
  const add=(a,s)=>critical.add(`${a.id}: ${s}`);
  for(const a of batch.results){
    const p=a.classification;
    if(a.category==='Support'||p.category==='Support'){
      if(!a.needs_owner_review)add(a,'Support owner review missing under policy v2');
      if(a.drafter_status!=='Skipped')add(a,'Support invoked the AI drafter instead of skipping it');
      if(a.draft_generated&&(a.draft_source!=='fixed-support'||a.draft_text!==CONTRACT.fixed_support_body))
        add(a,'Support draft is not the approved fixed acknowledgment');
    }
    if(a.draft_generated){
      if(a.category!=='Support'&&(a.draft_source!=='ai-non-support'||a.drafter_status!=='Succeeded'))
        add(a,'Non-Support draft lacks successful AI source evidence');
      if(a.classifier_status!=='Succeeded')add(a,'Draft created after classifier failure/skip');
      if(a.possible_resend)add(a,'Draft created despite actual resend flag');
      // Expected Sales already checked by V1. Also cover actual Sales misclassifications.
      if(a.category==='Sales'&&key.get(a.id).business_category!=='Sales'){
        const q=human.get(a.id)?.approved_pricing_and_missing_details;
        if(typeof q!=='boolean')pending.add(`${a.id}: quote/pricing review pending`);
        else if(!q)add(a,'approved quote rules failed');
      }
    }else if(a.draft_source!=='none')add(a,'No-draft result has a generated reply source');
    if(a.processing_status==='Succeeded'&&a.classifier_status!=='Succeeded')add(a,'Successful processing contradicts classifier status');
    if(a.processing_status==='Succeeded'&&['Failed','TimedOut'].includes(a.drafter_status))add(a,'Successful processing contradicts failed drafter status');
    if(a.processing_status==='Succeeded'&&!a.draft_generated&&a.drafter_status==='Succeeded')add(a,'Successful AI draft was not captured as a reply');
  }
  const drafts=batch.results.filter(a=>a.draft_generated);
  const quality={all:qualityGroup(drafts,human),ai:qualityGroup(drafts.filter(a=>a.draft_source==='ai-non-support'),human),
    fixed_support:qualityGroup(drafts.filter(a=>a.draft_source==='fixed-support'),human)};
  if(!drafts.length)pending.add('No created drafts: usability not established');
  const status=critical.size?'FAIL':pending.size?'INCOMPLETE':base.primary_correct<CONTRACT.thresholds.primary_correct
    ||quality.all.usability===null||quality.all.usability<CONTRACT.thresholds.draft_usability_minimum?'FAIL':'PASS_BATCH_GATES';
  return {...base,...policyTag,status,benchmark_interpretation:CONTRACT.benchmark_interpretation,
    thresholds:CONTRACT.thresholds,drafts_usable:quality.all.usable,draft_usability:quality.all.usability,
    draft_90_percent_target_met:quality.all.usability===null?null:quality.all.usability>=CONTRACT.thresholds.draft_usability_target,
    quality_by_source:quality,critical_failures:[...critical],pending:[...pending],
    overall_release:'NOT_ESTABLISHED',source_required_for_future_score:'A complete actual v2 export and matching new manifest/review wrapper; never partial retests or relabelled v1.'};
}

export function scoreFilesV2(manifestFile,actualFile,ownerFile,newScoreFile){
  const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
  const result=scorePolicyV2(read(actualFile),read(ownerFile),read(manifestFile));
  saveNew(newScoreFile,result);return result;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const [cmd,a,b,c,d]=process.argv.slice(2);
    if(cmd==='prepare')console.log(JSON.stringify(prepareV2(path.resolve(a||stop('New output directory required')),b),null,2));
    else if(cmd==='score'){
      if(!d)stop('Manifest, actual export, owner review and new score path required');
      const result=scoreFilesV2(a,b,c,d);
      console.log(JSON.stringify({status:result.status,primary_correct:result.primary_correct,critical_failures:result.critical_failures,
        pending:result.pending,quality_by_source:result.quality_by_source,overall_release:result.overall_release},null,2));
      if(result.status!=='PASS_BATCH_GATES')process.exitCode=2;
    }else stop('Usage: node evaluate-policy-v2.mjs prepare NEW_DIRECTORY RUN_LABEL | score MANIFEST.json ACTUAL.json OWNER_REVIEW.json NEW_SCORE.json');
  }catch(e){console.error(e.message);process.exitCode=1;}
}
