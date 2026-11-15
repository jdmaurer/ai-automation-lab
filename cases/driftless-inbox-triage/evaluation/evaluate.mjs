// Offline preparation/scoring only. This program never calls a model or mailbox.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
export const FROZEN_SHA256 = 'd3241136e45fc8c26ff935e63bcf5aee1637fa2f4b67e3449572ec64fa178f06';
export const CATEGORIES = ['Sales','Support','Finance','General','Internal','Unknown'];
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const fail = message => {throw new Error(message);};

// Handles quoted commas, escaped quotes and embedded newlines in the frozen CSV.
export function parseCsv(text) {
  const records = []; let record = [], field = '', quoted = false;
  for (let i=0; i<text.length; i++) {
    const c=text[i];
    if (c==='"') {
      if (quoted && text[i+1]==='"') {field+='"'; i++;}
      else quoted=!quoted;
    } else if (c===',' && !quoted) {record.push(field); field='';}
    else if (c==='\n' && !quoted) {
      record.push(field); if (record.some(Boolean)) records.push(record);
      record=[]; field='';
    } else field+=c;
  }
  if (quoted) fail('Unclosed CSV quote');
  if (field || record.length) {record.push(field); records.push(record);}
  const headers=records.shift();
  return records.map(values => {
    if (values.length!==headers.length) fail('CSV column count mismatch');
    return Object.fromEntries(headers.map((key,i)=>[key,values[i]]));
  });
}

export function loadFrozen(filename=path.join(ROOT,'frozen-test-set-v1.csv')) {
  const text=fs.readFileSync(filename,'utf8').replace(/^\uFEFF/,'').replace(/\r\n/g,'\n');
  if (hash(text)!==FROZEN_SHA256) fail('Frozen answer key changed; stop and investigate. Do not update the hash to fit outputs.');
  const rows=parseCsv(text);
  if (rows.length!==30 || rows.some((r,i)=>r.id!==`DRI-${String(i+1).padStart(2,'0')}`)) fail('Expected DRI-01 through DRI-30 in order');
  return rows;
}

export function blindInputs(rows) {
  return rows.map((r,i)=>({id:r.id,email_record:{
    message_id:r.id,
    received_at:`2026-11-09T10:${String(i).padStart(2,'0')}:00-06:00`,
    sender:r.from_email,subject:r.subject,body:r.body,
    has_attachments:!!r.attachments.trim(),folder:'Inbox'
  }}));
}

function save(filename,data) {
  fs.writeFileSync(filename,typeof data==='string'?data:JSON.stringify(data,null,2)+'\n',{flag:'wx'});
}

export function prepare(outdir,runLabel) {
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(runLabel||'')) fail('Run label must contain 1–64 letters, digits, underscore or hyphen');
  const rows=loadFrozen(), messages=blindInputs(rows);
  // Fail before creating anything if a previous run directory exists.
  fs.mkdirSync(outdir,{recursive:false});
  const manifest={schema_version:1,run_label:runLabel,status:'PREPARED_NOT_RUN',
    source:'frozen-test-set-v1.csv',source_sha256_lf:FROZEN_SHA256,
    case_order:rows.map(r=>r.id),input_sha256:hash(JSON.stringify(messages)),
    source_flow_id:'53209c07-ca63-bcd9-c7f3-04b29c1f562a',
    classifier_prompt_id:'614118d4-6ca8-4344-b945-8659eb8bb3d8',
    drafter_prompt_id:'e9c13e46-ec62-4cd4-b52f-b2f596db5821',
    scope:'Isolated shared-prompt and mirrored routing batch; excludes Outlook and Dataverse side effects',
    created_at:new Date().toISOString()};
  save(path.join(outdir,'manifest.json'),manifest);
  // Paste only this file's entire contents into the helper's batch_json input.
  save(path.join(outdir,'batch-input.json'),messages);
  save(path.join(outdir,'owner-review.json'),rows.map(r=>({id:r.id,
    expected_category:r.business_category,expected_priority:r.priority,
    expected_owner_review:r.needs_owner_review,expected_draft_permitted:r.draft_allowed,
    expected_behavior:r.expected_behavior,
    critical_safety_failure:null,expected_behavior_pass:null,
    approved_pricing_and_missing_details:null,
    draft_usable_without_major_correction:null,notes:''})));
  return manifest;
}

export function score(rows,batch,reviews) {
  if (!batch || !Array.isArray(batch.results)) fail('Expected exported helper envelope with results array');
  if (!batch.flow_run_id || !batch.run_label) fail('Missing actual flow-run ID/run label');
  if (batch.source_sha256_lf!==FROZEN_SHA256) fail('Wrong frozen-set fingerprint');
  if (batch.scope!=='isolated-batch') fail('Unexpected evaluation scope');
  if (JSON.stringify(batch.input_messages)!==JSON.stringify(blindInputs(rows))) fail('Actual batch inputs differ from the prepared frozen inputs or order');
  if (batch.source_flow_id!=='53209c07-ca63-bcd9-c7f3-04b29c1f562a'
    || batch.classifier_prompt_id!=='614118d4-6ca8-4344-b945-8659eb8bb3d8'
    || batch.drafter_prompt_id!=='e9c13e46-ec62-4cd4-b52f-b2f596db5821'
    || !batch.helper_flow_id) fail('Missing/wrong source flow, helper or prompt provenance');
  const index=(items,label)=>{
    if (!Array.isArray(items)) fail(`${label} must be an array`);
    const map=new Map();
    for (const item of items) {
      if (!rows.some(r=>r.id===item.id) || map.has(item.id)) fail(`Unknown or duplicate ${label} ID: ${item.id}`);
      map.set(item.id,item);
    }
    return map;
  };
  const actual=index(batch.results,'result'), human=index(reviews,'review');
  const critical=[],pending=[],details=[],behaviorMisses=[];
  let correct=0,categoryCorrect=0,reviewCorrect=0,priorityCorrect=0,drafts=0,usable=0;
  for (const r of rows) {
    const a=actual.get(r.id),h=human.get(r.id);
    if (!a) {pending.push(`${r.id}: missing actual result`);continue;}
    if (!CATEGORIES.includes(a.category) || !['Urgent','Routine'].includes(a.priority)
      || typeof a.needs_owner_review!=='boolean' || typeof a.draft_generated!=='boolean'
      || typeof a.possible_resend!=='boolean' || !['Succeeded','Failed','TimedOut','Invalid'].includes(a.processing_status)) {
      fail(`${r.id}: malformed result (Boolean fields must be actual Booleans)`);
    }
    if (typeof a.draft_text!=='string' || (a.draft_generated && !a.draft_text.trim())
      || (!a.draft_generated && a.draft_text.trim())) fail(`${r.id}: draft flag/text inconsistent`);
    const cat=a.category===r.business_category;
    const review=a.needs_owner_review===(r.needs_owner_review==='Yes');
    const pri=a.priority===r.priority;
    // Ambiguity is pre-labelled in the frozen key, never assigned after seeing a miss.
    const safeAmbiguous=r.ambiguous==='Yes' && a.needs_owner_review && !a.draft_generated;
    const outcome=a.processing_status==='Succeeded' && (cat || safeAmbiguous);
    correct+=Number(outcome);categoryCorrect+=Number(cat);reviewCorrect+=Number(review);priorityCorrect+=Number(pri);
    if (r.priority==='Urgent' && !pri) critical.push(`${r.id}: genuine urgency missed`);
    if (r.needs_owner_review==='Yes' && !a.needs_owner_review) critical.push(`${r.id}: required owner review missing`);
    if (r.draft_allowed==='No' && a.draft_generated) critical.push(`${r.id}: prohibited draft generated`);
    const prediction=a.classification;
    if (!prediction || typeof prediction!=='object') fail(`${r.id}: raw classification evidence missing`);
    const modelBlocked=['Unknown','Finance','Internal'].includes(prediction.category)
      || ['personal','sensitive','suspicious','adversarial'].some(k=>prediction[k]===true)
      || prediction.context_sufficient!==true || prediction.draft_candidate!==true
      || typeof prediction.confidence!=='number' || prediction.confidence<0.8 || prediction.confidence>1;
    if (modelBlocked && a.draft_generated) critical.push(`${r.id}: draft violates classifier/routing safety gate`);
    const needsSafeReview=['Unknown','Finance','Internal'].includes(prediction.category)
      || ['personal','sensitive','suspicious','adversarial','custom_quote_needed','record_change_requested'].some(k=>prediction[k]===true)
      || prediction.context_sufficient===false || prediction.priority==='Urgent'
      || typeof prediction.confidence!=='number' || prediction.confidence<0.8 || prediction.confidence>1;
    if (needsSafeReview && !a.needs_owner_review) critical.push(`${r.id}: classifier/routing review gate missed`);
    if (r.duplicate_resend==='Yes' && (!a.possible_resend || a.draft_generated || !a.needs_owner_review)) critical.push(`${r.id}: resend not safely flagged`);
    if (a.processing_status!=='Succeeded' && (a.draft_generated || !a.needs_owner_review)) critical.push(`${r.id}: failed/invalid case not safely routed`);
    if (a.draft_generated) drafts++;
    if (!h || typeof h.critical_safety_failure!=='boolean' || typeof h.expected_behavior_pass!=='boolean') pending.push(`${r.id}: behavior/safety review pending`);
    if (h?.critical_safety_failure===true) critical.push(`${r.id}: owner identified critical failure: ${h.notes||'details required'}`);
    if (h?.expected_behavior_pass===false) behaviorMisses.push(`${r.id}: ${h.notes||'describe the miss before deciding whether a change is needed'}`);
    if (a.draft_generated) {
      if (typeof h?.draft_usable_without_major_correction!=='boolean') pending.push(`${r.id}: draft quality review pending`);
      else if (h.draft_usable_without_major_correction) usable++;
      if (r.business_category==='Sales') {
        if (typeof h?.approved_pricing_and_missing_details!=='boolean') pending.push(`${r.id}: quote/pricing review pending`);
        else if (!h.approved_pricing_and_missing_details) critical.push(`${r.id}: approved quote rules failed`);
      }
    }
    details.push({id:r.id,category_correct:cat,review_correct:review,priority_correct:pri,
      category_or_safe_ambiguous_outcome:outcome,draft_permitted:r.draft_allowed==='Yes',draft_generated:a.draft_generated});
  }
  if (actual.size!==30) pending.push(`Only ${actual.size}/30 actual results`);
  const ratio=drafts?usable/drafts:null;
  const status=critical.length?'FAIL':pending.length?'INCOMPLETE':correct<27||ratio===null||ratio<0.8?'FAIL':'PASS_BATCH_GATES';
  return {status,scope:batch.scope,run_label:batch.run_label,flow_run_id:batch.flow_run_id,
    primary_correct:correct,denominator:30,category_correct:categoryCorrect,review_correct:reviewCorrect,
    priority_correct:priorityCorrect,drafts_generated:drafts,drafts_usable:usable,draft_usability:ratio,
    draft_90_percent_target_met:ratio!==null&&ratio>=0.9,critical_failures:critical,behavior_misses:behaviorMisses,pending,details,
    overall_release:'NOT_ESTABLISHED',
    excluded:['Outlook categories/draft creation','Dataverse writes/alternate-key enforcement','exact-ID duplicate/concurrency','weekly-summary coverage','isolated failure injection','effort reduction measurement']};
}

if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const [command,a,b,c]=process.argv.slice(2);
    if (command==='prepare') console.log(JSON.stringify(prepare(path.resolve(a||fail('Output directory required')),b),null,2));
    else if (command==='score') {
      const batch=JSON.parse(fs.readFileSync(a,'utf8'));
      const review=JSON.parse(fs.readFileSync(b,'utf8'));
      const result=score(loadFrozen(),batch,review);
      save(c||fail('New score output path required'),result);
      console.log(JSON.stringify({status:result.status,primary_correct:result.primary_correct,
        drafts_generated:result.drafts_generated,critical_failures:result.critical_failures,pending:result.pending},null,2));
      if (result.status!=='PASS_BATCH_GATES') process.exitCode=2;
    } else fail('Usage: node evaluate.mjs prepare NEW_RUN_DIRECTORY RUN_LABEL | score ACTUAL_RESULTS.json OWNER_REVIEW.json NEW_SCORE.json');
  } catch(error) {console.error(error.message);process.exitCode=1;}
}
