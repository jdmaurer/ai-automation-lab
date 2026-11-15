// Builds a reviewable WDL blueprint from definitions read in the designer.
// It does NOT upload, import, publish, run, or alter any Power Automate flow.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {FROZEN_SHA256} from './evaluate.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const live=JSON.parse(fs.readFileSync(path.join(root,'live-routing-reference-2026-11-14.json'),'utf8'));
const after=name=>({[name]:['Succeeded']});
const all=['Succeeded','Failed','TimedOut','Skipped'];
const set=(value,runAfter={})=>({type:'SetVariable',inputs:{name:'needs_owner_review',value},runAfter});
const classifier=structuredClone(live.classifier);
classifier.runAfter=after('Flag_-_Possible_Resend');
const drafter=structuredClone(live.drafter);
delete drafter.runAfter;
const resend=live.resend.inputs
  .replaceAll("triggerOutputs()?['body/subject']","outputs('Normalize_-_Email_Fields')?['subject']")
  .replaceAll("triggerOutputs()?['body/body']","outputs('Normalize_-_Email_Fields')?['body']");
const emitExpr=value=>{
  if (typeof value==='string') return value.startsWith('@')?value.slice(1):`'${value.replaceAll("'","''")}'`;
  if (typeof value==='boolean'||typeof value==='number') return String(value);
  const [[op,args]]=Object.entries(value);
  return `${op}(${args.map(emitExpr).join(',')})`;
};
const valid='@'+emitExpr(live.validation_expression);
const gen="actions('Draft_-_Generate_Reply')?['status']";
const cls="actions('Run_a_prompt')?['status']";
const prediction="outputs('Run_a_prompt')?['body/responsev2/predictionOutput/structuredOutput']";
const processingStatus=`@if(equals(${cls},'TimedOut'),'TimedOut',if(not(equals(${cls},'Succeeded')),'Failed',if(equals(outputs('Decision_-_Valid_Output'),false),'Invalid',if(or(equals(${gen},'Failed'),equals(${gen},'TimedOut'),equals(actions('Validate_-_AI_Output')?['status'],'Failed'),equals(actions('Validate_-_AI_Output')?['status'],'TimedOut')),'Failed','Succeeded'))))`;
const actions={
  'Reset_-_Owner_Review':set("@items('For_Each_-_Frozen_Message')?['email_record']?['has_attachments']"),
  'Normalize_-_Email_Fields':{type:'Compose',inputs:"@items('For_Each_-_Frozen_Message')?['email_record']",runAfter:after('Reset_-_Owner_Review')},
  'Flag_-_Possible_Resend':{type:'Compose',inputs:resend,runAfter:after('Normalize_-_Email_Fields')},
  'Run_a_prompt':classifier,
  'Decision_-_Valid_Output':{type:'Compose',inputs:valid,runAfter:after('Run_a_prompt')},
  'Validate_-_AI_Output':{type:'If',expression:{equals:["@outputs('Decision_-_Valid_Output')",true]},runAfter:after('Decision_-_Valid_Output'),
    actions:{
      'Rule_-_Confidence_High_Enough':{type:'If',expression:live.confidence_expression,
        actions:{
          'Rule_-_Owner_Review_Required':{type:'If',expression:live.owner_review_expression,
            actions:{'Set_-_Needs_Owner_Review_-_Policy':set(true)},else:{actions:{}}},
          'Rule_-_Draft_Allowed':{type:'If',expression:live.draft_expression,runAfter:after('Rule_-_Owner_Review_Required'),
            actions:{'Draft_-_Generate_Reply':drafter},else:{actions:{}}}
        },else:{actions:{'Set_-_Needs_Owner_Review_-_Low_Confidence':set(true)}}}
    },else:{actions:{'Set_-_Needs_Owner_Review_-_Invalid_AI':set(true)}}},
  'Collect_-_Actual_Result':{type:'AppendToArrayVariable',runAfter:{'Validate_-_AI_Output':all},
    inputs:{name:'evaluation_results',value:{
      id:"@items('For_Each_-_Frozen_Message')?['id']",
      category:`@coalesce(${prediction}?['category'],'Unknown')`,
      priority:`@coalesce(${prediction}?['priority'],'Routine')`,
      confidence:`@coalesce(${prediction}?['confidence'],0)`,
      needs_owner_review:`@or(variables('needs_owner_review'),not(equals(${cls},'Succeeded')),equals(${gen},'Failed'),equals(${gen},'TimedOut'),equals(actions('Validate_-_AI_Output')?['status'],'Failed'),equals(actions('Validate_-_AI_Output')?['status'],'TimedOut'))`,
      possible_resend:"@outputs('Flag_-_Possible_Resend')",
      draft_generated:`@equals(${gen},'Succeeded')`,
      draft_text:`@if(equals(${gen},'Succeeded'),coalesce(outputs('Draft_-_Generate_Reply')?['body/responsev2/predictionOutput/text'],''),'')`,
      processing_status:processingStatus,
      classifier_status:`@${cls}`,
      drafter_status:`@coalesce(${gen},'Skipped')`,
      classification:`@coalesce(${prediction},json('{}'))`
    }}}
};
const top={
  'Initialize_-_Evaluation_Results':{type:'InitializeVariable',inputs:{variables:[{name:'evaluation_results',type:'array',value:[]}]},runAfter:{}},
  'Initialize_-_Needs_Owner_Review':{type:'InitializeVariable',inputs:{variables:[{name:'needs_owner_review',type:'boolean',value:false}]},runAfter:after('Initialize_-_Evaluation_Results')},
  'Parse_-_Frozen_Batch':{type:'ParseJson',inputs:{content:"@json(triggerBody()?['text'])",schema:{type:'array',minItems:30,maxItems:30,
    items:{type:'object',additionalProperties:false,required:['id','email_record'],properties:{id:{type:'string'},email_record:{type:'object',additionalProperties:false,
      required:['message_id','received_at','sender','subject','body','has_attachments','folder'],properties:{message_id:{type:'string'},received_at:{type:'string'},sender:{type:'string'},subject:{type:'string'},body:{type:'string'},has_attachments:{type:'boolean'},folder:{type:'string'}}}}}}},runAfter:after('Initialize_-_Needs_Owner_Review')},
  'For_Each_-_Frozen_Message':{type:'Foreach',foreach:"@body('Parse_-_Frozen_Batch')",actions,
    runAfter:after('Parse_-_Frozen_Batch'),runtimeConfiguration:{concurrency:{repetitions:1}}},
  'Export_-_Evaluation_Results':{type:'Compose',runAfter:{'For_Each_-_Frozen_Message':all},inputs:{
    scope:'isolated-batch',run_label:"@triggerBody()?['text_1']",flow_run_id:"@workflow()?['run']?['name']",
    helper_flow_id:"@workflow()?['name']",source_sha256_lf:FROZEN_SHA256,
    source_flow_id:'53209c07-ca63-bcd9-c7f3-04b29c1f562a',
    classifier_prompt_id:classifier.inputs.parameters.recordId,
    drafter_prompt_id:drafter.inputs.parameters.recordId,
    input_messages:"@body('Parse_-_Frozen_Batch')",results:"@variables('evaluation_results')"}}
};
const blueprint={
  artifact_status:'BLUEPRINT_NOT_IMPORTED_OR_RUNTIME_VERIFIED',
  display_name:'Driftless Frozen 30 Evaluation',
  purpose:'Test-only helper: shared prompts plus mirrored normal routing; no Outlook operations or table writes',
  connection_binding:'Bind AI Builder actions through the existing Dataverse connection in the UI; never modify shared connection mappings',
  definition:{'$schema':'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#',contentVersion:'1.0.0.0',
    triggers:{manual:{type:'Request',kind:'Button',inputs:{schema:{type:'object',properties:{
      text:{type:'string',title:'batch_json','x-ms-dynamically-added':true,description:'Paste the complete prepared batch-input.json; no answer key'},
      text_1:{type:'string',title:'run_label','x-ms-dynamically-added':true,description:'Use the manifest run label'}},required:['text','text_1']}}}},actions:top}
};
// Assertions are structural checks of this blueprint, not Power Automate runtime evidence.
const walk=(object,callback)=>{if(object&&typeof object==='object'){callback(object);for(const v of Object.values(object))walk(v,callback);}};
walk(blueprint.definition,o=>{
  if(o.type==='OpenApiConnection' && o.inputs?.host?.operationId!=='aibuilderpredict_customprompt') throw Error('Unexpected external operation');
  if(o.type==='OpenApiConnection' && ![classifier.inputs.parameters.recordId,drafter.inputs.parameters.recordId].includes(o.inputs.parameters.recordId)) throw Error('Unexpected prompt');
});
fs.writeFileSync(path.join(root,'batch-helper-blueprint.json'),JSON.stringify(blueprint,null,2)+'\n');
console.log('Built isolated blueprint: two existing prompt references; zero Outlook operations; zero table writes. NOT imported/run.');
