// Offline check of the workflow's rule code (Check fields, Decide) against the answer key.
// Uses the pin files in place of the reading step. No n8n, no AI. Run from anywhere:
//   node cases/invoice-review-queue/n8n/check-rules-offline.js
const fs = require('fs'), path = require('path');
process.chdir(path.join(__dirname, '..'));
const wf = JSON.parse(fs.readFileSync(process.argv[2] || 'n8n/paperwork-intake-v0.2.json', 'utf8'));
const code = Object.fromEntries(wf.nodes.filter(n => n.type.endsWith('.code')).map(n => [n.name, n.parameters.jsCode]));
const csv = (p) => { const [h, ...rows] = fs.readFileSync(p,'utf8').replace(/\r/g,'').trim().split('\n'); 
  const parse = (l) => { const out=[]; let cur='', q=false; for (const ch of l) { if (ch=='"') q=!q; else if (ch==',' && !q) {out.push(cur);cur='';} else cur+=ch; } out.push(cur); return out; };
  const hs = parse(h); return rows.map(r => Object.fromEntries(parse(r).map((v,i)=>[hs[i],v]))); };
const key = csv('test-data-draft/answer-key-documents.csv').sort((a,b)=>a.run_order-b.run_order);
const docsTable = []; const seenHashes = new Set(); let bad = 0;
const fileHash = (k) => k.what_it_tests.startsWith('Exact resend') ? (k.case_id=='I08'?'I02':'W02') : k.case_id;
for (const k of key) {
  let result;
  const h = fileHash(k);
  if (seenHashes.has(h)) result = {status:'duplicate', reason:'same file'};
  else if (k.case_id === 'I20') result = {status:'exception', reason:'would not open'};
  else {
    const pin = JSON.parse(fs.readFileSync(`n8n/pins/${k.case_id}.json`))[0];
    const fp = {correlation_id:'x', received_at:'x', file_name:k.file, file_hash:h, mime_type:'', file_size:''};
    const $ = (n) => n==='Fingerprint file' ? {item:{json:fp}, first:()=>({json:fp})} : {first:()=>({json:checked})};
    let checked = new Function('$json','$', code['Check fields'])(pin, $).json;
    if (!checked.passed) result = checked;
    else {
      const rows = docsTable.filter(r=>r.doc_key===checked.doc_key).map((r,i)=>({...r,id:i}));
      const $in = {all:()=> rows.length? rows.map(r=>({json:r})) : [{json:{}}]};
      const $2 = (n) => ({first:()=>({json:checked})});
      result = new Function('$input','$', code['Decide new, resend or revision'])($in, $2)[0].json;
      if (result.status !== 'duplicate') docsTable.push(result);
    }
  }
  seenHashes.add(h);
  const exp = k.expected_status === 'review' ? 'review' : k.expected_status;
  const ok = result.status === exp || (k.acceptable_alternate && result.status==='exception');
  if (!ok) bad++;
  console.log((ok?'ok  ':'FAIL'), k.case_id.padEnd(4), 'expected', exp.padEnd(9), 'got', result.status.padEnd(9), result.reason||'');
}
console.log('mismatches:', bad);
