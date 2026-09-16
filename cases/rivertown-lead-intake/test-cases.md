# Test Cases — Rivertown Lead Intake v1

Ten labeled cases covering every path. Run against a table reset to exactly
the 10 seed rows in `rivertown_leads_seed.csv`.

**Reset first.** Test runs mutate the table — without a reset, "new lead"
versus "duplicate" depends on test history rather than on logic.

**Reset means: clear all rows, then re-import `rivertown_leads_seed.csv`.**
Do NOT export the table from n8n and commit that as the seed — an n8n export
is the live state, including whatever the last test run added. The seed file
in this folder is the fixed baseline and should not be overwritten.

Note: rows 1-3 have `duplicate_count` deliberately blank (null) rather than 0.
Case A relies on this to exercise the `|| 0` fallback in
`IncrementDuplicateCount`. Rows 4-10 carry an explicit 0.

## Results

| # | Case | Expected path | Expected response | Pin data | Postman |
|---|---|---|---|---|---|
| A | Duplicate lead | IncrementDuplicateCount | 200 `duplicate` | PASS | PASS |
| B | New lead, Training | InsertRoutedLead | 200 `received` | PASS | PASS |
| C | New lead, Consulting | InsertRoutedLead | 200 `received` | — | PASS |
| D | New lead, Speaking | InsertRoutedLead | 200 `received` | — | PASS |
| E | New lead, "Other" | InsertForReview | 200 `received` | — | PASS |
| F | Unexpected engagement_type | InsertForReview | 200 `received` | PASS | PASS |
| G | Missing company (now optional) | InsertRoutedLead | 200 `received` | — | PASS |
| H | Missing external_id | RespondFail | 400 `rejected` | PASS | PASS |
| I | Blank optional fields only | InsertRoutedLead | 200 `received` | — | PASS |
| J | Same person, new request | InsertRoutedLead | 200 `received` | — | PASS |

All ten cases passed against the published Production URL using Header Auth on
2026-09-16. Results were verified from both the HTTP response and resulting
Data Table state.

---

## A — Duplicate lead
`FORM-10231` is seed row 1. Also exercises the `|| 0` null handling, since
the seed row's `duplicate_count` starts null.

```json
[{"body":{"external_id":"FORM-10231","first_name":"  Dana ","last_name":"Okonkwo","email":"Dana.Okonkwo@Meridian-Partners.COM ","company":"meridian partners llc","phone":"608-555-0142","engagement_type":"Training","message":"Looking for a two-day facilitation workshop for our managers.","company_size":"11-50","submitted_at":"2026-09-14T15:22:08.000Z"}}]
```

## B — New lead, Training
Dirty data on purpose: leading/trailing spaces, mixed-case email, lowercase
company. Confirms normalization.

```json
[{"body":{"external_id":"FORM-10251","first_name":"Gwen","last_name":"Ferraro","email":"G.Ferraro@Laketown-Clinic.COM ","company":"laketown clinic administration","phone":"608-555-0170","engagement_type":"Training","message":"Six supervisors need conflict resolution training before January.","company_size":"51-200","submitted_at":"2026-09-15T09:14:02.000Z"}}]
```

## C — New lead, Consulting

```json
[{"body":{"external_id":"FORM-10252","first_name":"Andre ","last_name":"Boisvert","email":"aboisvert@Cedarline-Group.com","company":"Cedarline Group","phone":"651-555-0194","engagement_type":"Consulting","message":"Our proposal turnaround is three weeks and we do not know why.","company_size":"11-50","submitted_at":"2026-09-15T10:02:37.000Z"}}]
```

## D — New lead, Speaking
Blank phone.

```json
[{"body":{"external_id":"FORM-10253","first_name":"Helen","last_name":"Strand","email":"hstrand@midstate-assoc.org ","company":"midstate association","phone":"","engagement_type":"Speaking","message":"Closing keynote, 45 minutes, roughly 300 attendees.","company_size":"200+","submitted_at":"2026-09-15T10:48:19.000Z"}}]
```

## E — New lead, "Other"
Switch fallback with an anticipated value.

```json
[{"body":{"external_id":"FORM-10254","first_name":"Desmond","last_name":"Achterberg","email":"desmond@northgate-supply.com","company":"Northgate Supply","phone":"920-555-0146","engagement_type":"Other","message":"Saw your workshop last spring. Not sure what the next step is.","company_size":"1-10","submitted_at":"2026-09-15T11:30:44.000Z"}}]
```

## F — Unexpected engagement_type
Switch fallback against a value nobody planned for. This is the case that
proves the fallback earns its place.

```json
[{"body":{"external_id":"FORM-10255","first_name":"Ingrid","last_name":"Halvorsen","email":"i.halvorsen@pinehurst-mfg.com","company":"Pinehurst Manufacturing","phone":"715-555-0188","engagement_type":"Retainer","message":"Do you do ongoing monthly advisory work?","company_size":"51-200","submitted_at":"2026-09-15T12:05:11.000Z"}}]
```

## G — Missing company
Was a validation failure under the original six-field contract. Now passes —
`company` is optional. See decisions.md D4.

```json
[{"body":{"external_id":"FORM-10256","first_name":"Paul","last_name":"Okereke","email":"pokereke@riverbend-co.com","company":"","phone":"608-555-0111","engagement_type":"Training","message":"Need something for our new supervisors.","company_size":"11-50","submitted_at":"2026-09-15T13:19:58.000Z"}}]
```

## H — Missing external_id
The dedup key itself is absent. Rejected with a 400; nothing stored.

```json
[{"body":{"external_id":"","first_name":"Nadia","last_name":"Brightwater","email":"nadia@summit-partners.net","company":"Summit Partners","phone":"612-555-0163","engagement_type":"Consulting","message":"Process mapping for our client intake.","company_size":"1-10","submitted_at":"2026-09-15T14:02:26.000Z"}}]
```

## I — Blank optional fields only
Every required field present; phone, message, and company_size blank.

```json
[{"body":{"external_id":"FORM-10257","first_name":"Owen","last_name":"Trzaska","email":"otrzaska@harborlight-eng.com","company":"Harborlight Engineering","phone":"","engagement_type":"Training","message":"","company_size":"","submitted_at":"2026-09-15T14:51:07.000Z"}}]
```

## J — Same person, new request
Priya appears twice in the seed table on the same email (`FORM-10204`,
`FORM-10235`). This is a third. Must be treated as new, not duplicate —
the filter is on `external_id`, not email. A repeat customer is not a
duplicate.

```json
[{"body":{"external_id":"FORM-10258","first_name":"Priya","last_name":"Raghunathan","email":"P.Raghunathan@Northline-Logistics.com","company":"Northline Logistics","phone":"612-555-0133","engagement_type":"Consulting","message":"Third request - want to discuss a longer engagement.","company_size":"51-200","submitted_at":"2026-09-15T15:27:40.000Z"}}]
```

---

## Still needed

- A case with no email (Stop path / 400)
- A case with an oversized field
- A case with an unexpected extra field in the payload
- Replay of the same request twice in immediate succession
