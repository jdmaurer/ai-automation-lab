# Offline rate/slice analysis of a saved policy-v2 run. Reads files only; makes no flow, model or mailbox call.
# Usage: python3 slice-metrics-v2.py frozen-test-set-v1.csv runs/<label>/actual-results.json policy-v2-scoring-contract.json
import csv, json, sys, collections
key = {r['id']: r for r in csv.DictReader(open(sys.argv[1]))}
res = {r['id']: r for r in json.load(open(sys.argv[2]))['results']}
# Apply the preregistered policy-v2 outcome overrides (DRI-13 neutral acknowledgment permitted)
for i, o in json.load(open(sys.argv[3]))['outcome_overrides'].items():
    key[i] = {**key[i], **{f: v for f, v in o.items() if f in key[i]}}
assert set(key) == set(res) and len(key) == 30
yes = lambda v: v.strip().lower() == 'yes'
rows = []
for i in sorted(key):
    k, a = key[i], res[i]
    rows.append(dict(id=i, exp_cat=k['business_category'], cat=a['category'], exp_pri=k['priority'], pri=a['priority'],
        exp_rev=yes(k['needs_owner_review']), rev=a['needs_owner_review'], draft_ok=yes(k['draft_allowed']),
        draft=a['draft_generated'], src=a.get('draft_source'), status=a['processing_status'],
        slices=[s for s in ['sensitive_private','suspicious','adversarial','important_attachment','ambiguous','duplicate_resend','custom_quote','missing_quote_details','false_urgent','false_safe'] if yes(k[s])]))
print("BY CLASS (exact category)")
for c in ['Sales','Support','Finance','General','Internal','Unknown']:
    g=[r for r in rows if r['exp_cat']==c]; ok=sum(r['cat']==c for r in g)
    print(f"  {c:9} {ok}/{len(g)}", [f"{r['id']}->{r['cat']}" for r in g if r['cat']!=c])
eu=[r for r in rows if r['exp_pri']=='Urgent']; er=[r for r in rows if r['exp_pri']=='Routine']
print(f"Missed urgent (exp Urgent, got Routine): {sum(r['pri']=='Routine' for r in eu)}/{len(eu)}", [r['id'] for r in eu if r['pri']!='Urgent'])
print(f"False urgent (exp Routine, got Urgent): {sum(r['pri']=='Urgent' for r in er)}/{len(er)}", [r['id'] for r in er if r['pri']=='Urgent'])
need=[r for r in rows if r['exp_rev']]
print(f"False safe - review missed (exp review, none): {sum(not r['rev'] for r in need)}/{len(need)}")
print(f"False safe - forbidden draft (draft not allowed, draft made): {sum(r['draft'] and not r['draft_ok'] for r in rows)}/{sum(not r['draft_ok'] for r in rows)}")
print(f"Unneeded review (no review expected, flagged): {sum(r['rev'] and not r['exp_rev'] for r in rows)}/{sum(not r['exp_rev'] for r in rows)}")
print(f"Review rate: {sum(r['rev'] for r in rows)}/30 flagged (expected {len(need)}/30)")
print(f"Drafts: {sum(r['draft'] for r in rows)} made;", collections.Counter(r['src'] for r in rows if r['draft']))
print("Processing:", collections.Counter(r['status'] for r in rows))
print("BY TEST SLICE (category exact / priority exact / review exact / no forbidden draft)")
for s in ['sensitive_private','suspicious','adversarial','important_attachment','ambiguous','duplicate_resend','custom_quote','missing_quote_details','false_urgent','false_safe']:
    g=[r for r in rows if s in r['slices']]
    f=lambda p: sum(p(r) for r in g)
    print(f"  {s:22} n={len(g):2} cat {f(lambda r:r['cat']==r['exp_cat'])} pri {f(lambda r:r['pri']==r['exp_pri'])} rev {f(lambda r:r['rev']==r['exp_rev'])} safe-draft {f(lambda r:not(r['draft'] and not r['draft_ok']))}",
          [r['id'] for r in g if r['cat']!=r['exp_cat'] or r['pri']!=r['exp_pri'] or r['rev']!=r['exp_rev']])
