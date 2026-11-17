// Offline evaluation of recorded WDL expressions on actual prompt-test outputs.
// No model, mailbox, workflow or network calls.
export function evaluateWdl(source, prediction, attachment=false){
  let s=source.startsWith('@')?source.slice(1):source,i=0;
  const prefix='body/responsev2/predictionOutput/structuredOutput';
  const output={[prefix]:prediction,...Object.fromEntries(Object.entries(prediction).map(([k,v])=>[prefix+'/'+k,v]))};
  const fn={equals:(a,b)=>a===b,and:(...a)=>a.every(Boolean),or:(...a)=>a.some(Boolean),
    if:(c,a,b)=>c?a:b,coalesce:(...a)=>a.find(v=>v!==null&&v!==undefined),
    contains:(a,b)=>a.includes(b),createArray:(...a)=>a,outputs:n=>n==='Run_a_prompt'?output:n==='Flag_-_Possible_Resend'?false:undefined,
    variables:n=>n==='needs_owner_review'?attachment:undefined};
  const skip=()=>{while(/\s/.test(s[i]??'')&&i<s.length)i++;};
  function value(){
    skip();let v;
    if(s[i]==="'"){
      i++;let str='';while(i<s.length){if(s[i]==="'"){if(s[i+1]==="'"){str+="'";i+=2;continue;}i++;break;}str+=s[i++];}v=str;
    }else if(/[0-9-]/.test(s[i]??'')){const m=s.slice(i).match(/^-?\d+(?:\.\d+)?/);if(!m)throw Error('Invalid numeric token');v=Number(m[0]);i+=m[0].length;
    }else{
      const m=s.slice(i).match(/^[A-Za-z_]\w*/);if(!m)throw Error('Unexpected WDL token at '+i);const name=m[0];i+=name.length;skip();
      if(['true','false','null'].includes(name))v=name==='true'?true:name==='false'?false:null;
      else{if(s[i++]!=='('||!fn[name])throw Error('Unsupported WDL function '+name);let args=[];skip();if(s[i]!==')'){for(;;){args.push(value());skip();if(s[i]!==',')break;i++;}}if(s[i++]!==')')throw Error('WDL closing parenthesis expected');v=fn[name](...args);}
    }
    skip();while(s[i]==='?'||s[i]==='['){if(s[i]==='?')i++;if(s[i++]!=='[')throw Error('WDL subscript expected');let key=value();skip();if(s[i++]!==']')throw Error('WDL closing bracket expected');v=v?.[key];skip();}
    return v;
  }
  const result=value();skip();if(i!==s.length)throw Error('WDL expression not fully consumed at '+i);return result;
}
export function evaluateCondition(node,p,attachment=false){
  if(typeof node==='string')return node.startsWith('@')?evaluateWdl(node,p,attachment):node;
  if(node===null||typeof node!=='object')return node;
  if(Array.isArray(node))return node.map(v=>evaluateCondition(v,p,attachment));
  const [op,args]=Object.entries(node)[0];const a=args.map(x=>evaluateCondition(x,p,attachment));
  if(op==='or')return a.some(Boolean);if(op==='and')return a.every(Boolean);if(op==='equals')return a[0]===a[1];throw Error('Unsupported condition '+op);
}
export function checkTarget(prediction,input,expected,mainPriority,helperPriority,mainReview,helperReview){
  const fields=['category','priority','confidence','personal','sensitive','suspicious','adversarial','context_sufficient','custom_quote_needed','record_change_requested','draft_candidate'];
  const errors=[];if(fields.some(k=>!(k in prediction))||Object.keys(prediction).some(k=>!fields.includes(k)&&k!=='@odata.type'))errors.push('Wrong output fields');
  if(fields.slice(3).some(k=>typeof prediction[k]!=='boolean')||!Number.isFinite(prediction.confidence)||prediction.confidence<0||prediction.confidence>1||!['Sales','Support','Finance','General','Internal','Unknown'].includes(prediction.category)||!['Urgent','Routine'].includes(prediction.priority))errors.push('Malformed output types/enums');
  for(const k of ['category','record_change_requested'])if(prediction[k]!==expected[k])errors.push(k+' differs');
  const main=evaluateWdl(mainPriority,prediction)===832990000?'Urgent':'Routine';
  const helper=evaluateWdl(helperPriority,prediction);
  const reviewMain=evaluateCondition(mainReview,prediction,input.has_attachments),reviewHelper=evaluateCondition(helperReview,prediction,input.has_attachments);
  if(main!==expected.effective_priority||helper!==expected.effective_priority)errors.push('Effective priority differs');
  if(reviewMain!==expected.manager_review||reviewHelper!==expected.manager_review)errors.push('Manager review differs');
  return {id:expected.id,actual:prediction,expected,effective_priority:{main,helper},manager_review:{main:reviewMain,helper:reviewHelper},scope:'Recorded/saved expression evaluation on actual prompt response; not workflow runtime',errors,status:errors.length?'FAIL':'PASS_TARGETED'};
}
