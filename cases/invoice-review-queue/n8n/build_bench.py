import json, os, uuid, csv, sys
sys.path.insert(0, '/home/claude')
OUT = '/home/claude/ai-automation-lab/cases/invoice-review-queue/n8n'
KEY = '/home/claude/ai-automation-lab/cases/invoice-review-queue/test-data-draft/answer-key-documents.csv'
FORM_URL = os.environ.get('FORM_URL', 'http://localhost:5678/form/REPLACE-WITH-INTAKE-FORM-ID')
WAIT_SECONDS = 25
TABLES = {"log": ("ny5ujCJJdSmwAdwA", "kc file log"), "docs": ("LGROOTb7yGYTUoBT", "kc documents"),
          "lines": ("B0QDQ41AmznxgLW6", "kc line items")}
PROJECT = "tROV5LmWfFMPE6X7"
DIR = "C:/Users/joshu/.n8n-files/kc-test"
def nid(): return str(uuid.uuid4())
def ref(t):
    tid, name = TABLES[t]
    return {"__rl": True, "value": tid, "mode": "list", "cachedResultName": name,
            "cachedResultUrl": f"/projects/{PROJECT}/datatables/{tid}"}

rows = sorted(csv.DictReader(open(KEY)), key=lambda r: int(r["run_order"]))
files = [{"case_id": r["case_id"], "file": r["file"]} for r in rows]
RUN_ORDER = "// The 50 frozen test files, in the answer key's run order.\nreturn " + json.dumps(files) + ".map((f) => ({ json: f }));"

nodes, links = [], []
def add(n, pos):
    n.update({"id": nid(), "position": pos}); nodes.append(n); return n["name"]
def link(a, b, out=0): links.append((a, out, b))

add({"parameters": {}, "type": "n8n-nodes-base.manualTrigger", "typeVersion": 1, "name": "Start test run"}, [0, 300])
prev = "Start test run"
for i, (t, label) in enumerate([("log", "Clear file log"), ("docs", "Clear documents"), ("lines", "Clear line items")]):
    add({"parameters": {"operation": "deleteRows", "dataTableId": ref(t), "matchType": "allConditions",
                        "filters": {"conditions": [{"keyName": "id", "condition": "gt", "keyValue": 0}]}},
         "type": "n8n-nodes-base.dataTable", "typeVersion": 1.1, "name": label,
         "alwaysOutputData": True, "executeOnce": True}, [220 + 220 * i, 300])
    link(prev, label); prev = label
add({"parameters": {"jsCode": RUN_ORDER}, "type": "n8n-nodes-base.code", "typeVersion": 2,
     "name": "Test files in run order", "executeOnce": True}, [880, 300])
link(prev, "Test files in run order")
add({"parameters": {"batchSize": 1, "options": {}}, "type": "n8n-nodes-base.splitInBatches", "typeVersion": 3,
     "name": "One file at a time"}, [1100, 300])
link("Test files in run order", "One file at a time")
add({"parameters": {"operation": "read", "fileSelector": "=" + DIR + "/{{ $json.file }}",
                    "options": {"dataPropertyName": "data"}},
     "type": "n8n-nodes-base.readWriteFile", "typeVersion": 1, "name": "Read test file"}, [1320, 400])
link("One file at a time", "Read test file", 1)
add({"parameters": {"method": "POST", "url": FORM_URL, "sendBody": True, "contentType": "multipart-form-data",
                    "bodyParameters": {"parameters": [{"parameterType": "formBinaryData", "name": "field-0",
                                                       "inputDataFieldName": "data"}]},
                    "options": {"timeout": 180000, "response": {"response": {"neverError": True}}}},
     "type": "n8n-nodes-base.httpRequest", "typeVersion": 4.2, "name": "Send to intake form",
     "onError": "continueRegularOutput"}, [1540, 400])
link("Read test file", "Send to intake form")
add({"parameters": {"amount": WAIT_SECONDS, "unit": "seconds"}, "type": "n8n-nodes-base.wait", "typeVersion": 1.1,
     "name": "Wait between files", "webhookId": nid()}, [1760, 400])
link("Send to intake form", "Wait between files")
link("Wait between files", "One file at a time")
# export after the last file
prev = ("One file at a time", 0)
x = 1320
for t, label in [("log", "kc_file_log"), ("docs", "kc_documents"), ("lines", "kc_line_items")]:
    g = add({"parameters": {"operation": "get", "dataTableId": ref(t), "returnAll": True},
             "type": "n8n-nodes-base.dataTable", "typeVersion": 1.1, "name": f"Export {label}",
             "alwaysOutputData": True, "executeOnce": True}, [x, 120]); x += 220
    cv = add({"parameters": {"operation": "csv", "binaryPropertyName": "data", "options": {"fileName": f"{label}.csv"}},
              "type": "n8n-nodes-base.convertToFile", "typeVersion": 1.1, "name": f"{label} to CSV"}, [x, 120]); x += 220
    sv = add({"parameters": {"operation": "write", "fileName": f"{DIR}/results/{label}.csv", "dataPropertyName": "data",
                             "options": {}},
              "type": "n8n-nodes-base.readWriteFile", "typeVersion": 1, "name": f"Save {label}",
              "executeOnce": True}, [x, 120]); x += 220
    links.append((prev[0], prev[1], g)); link(g, cv); link(cv, sv); prev = (sv, 0)

conns = {}
for a, out, b in links:
    m = conns.setdefault(a, {"main": []})["main"]
    while len(m) <= out: m.append([])
    m[out].append({"node": b, "type": "main", "index": 0})
wf = {"name": "Kettle Creek - Test bench", "nodes": nodes, "connections": conns,
      "settings": {"executionOrder": "v1"}, "pinData": {}}
json.dump(wf, open(os.path.join(OUT, "test-bench.json"), "w"), indent=2)
print(len(nodes), "nodes;", len(files), "files; url", FORM_URL)
