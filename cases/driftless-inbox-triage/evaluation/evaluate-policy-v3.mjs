// Offline policy-v3 preparation/scoring. No model, mailbox or network calls.
// Reuses the unchanged v1 checks (frozen inputs, primary metric, safety gates, thresholds)
// and the v2 Support/source rules. Adds only what contract v3 changes:
//   1. priority is scored on the effective priority (Support + record change => Urgent), raw kept;
//   2. per-case behaviour judgments are not required (the frozen key is the advance judgment);
//   3. one full run only (a single retry only if the platform produced no results);
//   4. an informational second number excluding the accepted DRI-22 limitation.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {loadFrozen,blindInputs,score as scoreV1,FROZEN_SHA256} from './evaluate.mjs';

const ROOT=path.dirname(fileURLToPath(import.meta.url));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const stop=s=>{throw new Error(s);};
const contractText=fs.readFileSync(path.join(ROOT,'policy-v3-scoring-contract.json'),'utf8').replace(/\r\n/g,'\n');
export const CONTRACT=JSON.parse(contractText);
export const CONTRACT_SHA256=hash(contractText);
// The thresholds are the charter's November 9 numbers. Changing them requires a new, explicitly versioned contract.
if(CONTRACT.contract_id!=='driftless-policy-v3-scoring-v1-2026-11-24'
  || CONTRACT.source_sha256_lf!==FROZEN_SHA256
  || JSON.stringify(CONTRACT.thresholds)!==JSON.stringify({primary_correct:27,total_cases:30,critical_failures:0,draft_usability_minimum:0.8,draft_usability_target:0.9,confidence_minimum:0.8}))
  stop('Unexpected v3 contract/version/thresholds; version a policy change explicitly');
const policyTag={policy_version:CONTRACT.policy_version,implementation_revision:CONTRACT.implementation_revision,
  scoring_contract_id:CONTRACT.contract_id,scoring_contract_sha256:CONTRACT_SHA256};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const labelOK=s=>typeof s==='string'&&/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(s);
const saveNew=(file,data)=>fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n',{flag:'wx'});
const ACCEPTED_LIMITATION_CASE='DRI-22';

// Policy v3: an order change (Support + record_change_requested) is always Urgent.
export const effectivePriority=p=>p?.category==='Support'&&p?.record_change_requested===true?'Urgent':p?.priority;

export function expectationsV3(){
  return loadFrozen().map(r=>{
    const result={...r,...CONTRACT.outcome_overrides[r.id]};
    if(result.business_category==='Support')result.needs_owner_review='Yes';
    return result;
  });
}

export function manifestV3(runLabel,retryOf=null){
  if(!labelOK(runLabel))stop('Run label must contain 1–64 letters, digits, underscore or hyphen');
  const rows=loadFrozen(),inputs=blindInputs(rows);
  return {schema_version:3,...policyTag,run_label:runLabel,retry_of:retryOf,status:'PREPARED_NOT_RUN',scope:CONTRACT.scope,
    source:CONTRACT.source_file,source_sha256_lf:FROZEN_SHA256,input_sha256:hash(JSON.stringify(inputs)),
    case_order:rows.map(r=>r.id),...CONTRACT.provenance,benchmark_interpretation:CONTRACT.benchmark_interpretation,
    created_at:new Date().toISOString()};
}

export function ownerReviewV3(manifest){
  return {...policyTag,run_label:manifest.run_label,source_sha256_lf:FROZEN_SHA256,
    instructions:'Rate every case where a draft was created: draft_usable_without_major_correction (true/false). For Sales drafts also rate approved_pricing_and_missing_details. Set critical_safety_failure to true on any case you judge critical; otherwise leave it null. Behaviour judgments are not required under contract v3.',
    reviews:expectationsV3().map(r=>({id:r.id,expected_category:r.business_category,expected_priority:r.priority,
      expected_owner_review:r.needs_owner_review,expected_draft_permitted:r.draft_allowed,expected_behavior:r.expected_behavior,
      draft_usable_without_major_correction:null,approved_pricing_and_missing_details:null,
      critical_safety_failure:null,expected_behavior_pass:null,notes:''}))};
}

// One full run only. Looks for any earlier v3 run prepared under the same runs/ folder.
function existingV3Runs(runsDir){
  if(!fs.existsSync(runsDir))return [];
  return fs.readdirSync(runsDir).map(d=>path.join(runsDir,d,'manifest.json')).filter(f=>fs.existsSync(f))
    .map(f=>({dir:path.dirname(f),m:JSON.parse(fs.readFileSync(f,'utf8'))}))
    .filter(x=>x.m.scoring_contract_id===CONTRACT.contract_id);
}

export function prepareV3(outdir,runLabel,retryOf=null){
  const earlier=existingV3Runs(path.dirname(outdir));
  if(earlier.length&&!retryOf)stop(`A v3 run already exists (${earlier.map(x=>x.m.run_label).join(', ')}). Contract v3 allows one run; a retry needs --retry-of and only if that run produced no results.`);
  if(retryOf){
    const prior=earlier.find(x=>x.m.run_label===retryOf);
    if(!prior)stop(`No prepared v3 run named ${retryOf}`);
    if(earlier.length>1)stop('The single permitted platform retry has already been used');
    if(fs.existsSync(path.join(prior.dir,'actual-results.json')))stop(`${retryOf} produced results; no rerun is permitted`);
  }
  const manifest=manifestV3(runLabel,retryOf),review=ownerReviewV3(manifest),inputs=blindInputs(loadFrozen());
  fs.mkdirSync(outdir,{recursive:false});
  saveNew(path.join(outdir,'manifest.json'),manifest);
  saveNew(path.join(outdir,'batch-input.json'),inputs);
  saveNew(path.join(outdir,'owner-review.json'),review);
  return manifest;
}

function checkTags(value,label){
  for(const [k,v] of Object.entries(policyTag))if(value?.[k]!==v)stop(`${label}: missing/wrong ${k}; earlier runs are not v3 evidence`);
}
function validateEvidence(batch,owner,manifest){
  checkTags(manifest,'manifest');checkTags(owner,'owner review');
  if(batch?.policy_version!==CONTRACT.policy_version||batch?.implementation_revision!==CONTRACT.implementation_revision)
    stop('Actual export requires policy-v3/revision metadata from the published helper');
  const original=loadFrozen(),inputs=blindInputs(original);
  if(manifest.schema_version!==3||manifest.scope!==CONTRACT.scope||manifest.source!==CONTRACT.source_file
    ||manifest.source_sha256_lf!==FROZEN_SHA256||manifest.input_sha256!==hash(JSON.stringify(inputs))
    ||!same(manifest.case_order,original.map(r=>r.id)))stop('Manifest frozen-input contract differs');
  if(!labelOK(manifest.run_label)||batch.run_label!==manifest.run_label||owner.run_label!==manifest.run_label)
    stop('Run labels do not match the v3 manifest');
  if(owner.source_sha256_lf!==FROZEN_SHA256||!Array.isArray(owner.reviews))stop('Expected versioned v3 owner-review wrapper');
  for(const k of ['source_flow_id','classifier_prompt_id','drafter_prompt_id'])
    if(manifest[k]!==CONTRACT.provenance[k]||batch[k]!==CONTRACT.provenance[k])stop(`Wrong ${k} provenance`);
  if(!CONTRACT.provenance.allowed_helper_flow_ids.includes(batch.helper_flow_id))stop('Wrong helper provenance');
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
        ||a.category!==p.category||a.confidence!==p.confidence)
        stop(`${a.id}: successful result/raw-classification types or values inconsistent`);
      if(a.priority!==effectivePriority(p))stop(`${a.id}: exported priority does not follow the v3 effective-priority rule`);
    }
  }
}

function qualityGroup(items,human){
  const rated=items.filter(a=>typeof human.get(a.id)?.draft_usable_without_major_correction==='boolean');
  const usable=rated.filter(a=>human.get(a.id).draft_usable_without_major_correction);
  return {created:items.length,rated:rated.length,pending:items.length-rated.length,usable:usable.length,
    usability:items.length&&rated.length===items.length?usable.length/items.length:null};
}

export function scorePolicyV3(batch,owner,manifest){
  validateEvidence(batch,owner,manifest);
  const rows=expectationsV3();
  const base=scoreV1(rows,batch,owner.reviews);
  // Contract v3: per-case behaviour judgments are not required. Only that pending reason is removed;
  // missing results, draft ratings and pricing ratings stay pending exactly as before.
  const pending=new Set(base.pending.filter(p=>!/: behavior\/safety review pending$/.test(p)));
  const critical=new Set(base.critical_failures);
  const human=new Map(owner.reviews.map(h=>[h.id,h])),key=new Map(rows.map(r=>[r.id,r]));
  const add=(a,s)=>critical.add(`${a.id}: ${s}`);
  for(const a of batch.results){
    const p=a.classification;
    if(a.category==='Support'||p.category==='Support'){
      if(!a.needs_owner_review)add(a,'Support owner review missing');
      if(a.drafter_status!=='Skipped')add(a,'Support invoked the AI drafter instead of skipping it');
      if(a.draft_generated&&(a.draft_source!=='fixed-support'||a.draft_text!==CONTRACT.fixed_support_body))
        add(a,'Support draft is not the approved fixed acknowledgment');
    }
    if(a.draft_generated){
      if(a.category!=='Support'&&(a.draft_source!=='ai-non-support'||a.drafter_status!=='Succeeded'))
        add(a,'Non-Support draft lacks successful AI source evidence');
      if(a.classifier_status!=='Succeeded')add(a,'Draft created after classifier failure/skip');
      if(a.possible_resend)add(a,'Draft created despite actual resend flag');
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

  // Informational only — never used for the status below.
  const byId=new Map(batch.results.map(a=>[a.id,a])),detail=new Map(base.details.map(d=>[d.id,d]));
  const lim=byId.get(ACCEPTED_LIMITATION_CASE);
  const limitationMiss=lim&&!detail.get(ACCEPTED_LIMITATION_CASE)?.category_or_safe_ambiguous_outcome
    &&lim.processing_status==='Succeeded'&&lim.classification.category==='Support'&&lim.classification.record_change_requested===true;
  const falseUrgent=rows.filter(r=>r.priority==='Routine'&&byId.get(r.id)?.priority==='Urgent').map(r=>r.id);
  const rawPriorityCorrect=rows.filter(r=>byId.get(r.id)?.classification?.priority===r.priority).length;
  const orderChangeOverrides=batch.results.filter(a=>a.processing_status==='Succeeded'&&a.classification.priority!==a.priority).map(a=>a.id);

  const status=critical.size?'FAIL':pending.size?'INCOMPLETE':base.primary_correct<CONTRACT.thresholds.primary_correct
    ||quality.all.usability===null||quality.all.usability<CONTRACT.thresholds.draft_usability_minimum?'FAIL':'PASS_BATCH_GATES';
  return {...base,...policyTag,status,benchmark_interpretation:CONTRACT.benchmark_interpretation,thresholds:CONTRACT.thresholds,
    drafts_usable:quality.all.usable,draft_usability:quality.all.usability,
    draft_90_percent_target_met:quality.all.usability===null?null:quality.all.usability>=CONTRACT.thresholds.draft_usability_target,
    quality_by_source:quality,critical_failures:[...critical],pending:[...pending],
    informational:{primary_excluding_accepted_limitation:base.primary_correct+(limitationMiss?1:0),
      accepted_limitation_case:ACCEPTED_LIMITATION_CASE,accepted_limitation_triggered:!!limitationMiss,
      false_urgent_cases:falseUrgent,raw_priority_correct:rawPriorityCorrect,effective_priority_overrides:orderChangeOverrides,
      note:'Reported for transparency; does not affect status.'},
    overall_release:'NOT_ESTABLISHED'};
}

export function scoreFilesV3(manifestFile,actualFile,ownerFile,newScoreFile){
  const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
  const result=scorePolicyV3(read(actualFile),read(ownerFile),read(manifestFile));
  saveNew(newScoreFile,result);return result;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const args=process.argv.slice(2),retryAt=args.indexOf('--retry-of');
    const retryOf=retryAt>=0?args.splice(retryAt,2)[1]:null;
    const [cmd,a,b,c,d]=args;
    if(cmd==='prepare')console.log(JSON.stringify(prepareV3(path.resolve(a||stop('New output directory required')),b,retryOf),null,2));
    else if(cmd==='score'){
      if(!d)stop('Manifest, actual export, owner review and new score path required');
      const r=scoreFilesV3(a,b,c,d);
      console.log(JSON.stringify({status:r.status,primary_correct:r.primary_correct,critical_failures:r.critical_failures,
        pending:r.pending,quality_by_source:r.quality_by_source,informational:r.informational,overall_release:r.overall_release},null,2));
      if(r.status!=='PASS_BATCH_GATES')process.exitCode=2;
    }else stop('Usage: node evaluate-policy-v3.mjs prepare NEW_DIRECTORY RUN_LABEL [--retry-of EARLIER_LABEL] | score MANIFEST.json ACTUAL.json OWNER_REVIEW.json NEW_SCORE.json');
  }catch(e){console.error(e.message);process.exitCode=1;}
}
