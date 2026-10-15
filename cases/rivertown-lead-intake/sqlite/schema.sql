-- Rivertown Lead Intake: SQLite schema v1
-- Run with:  sqlite3 rivertown.db ".read schema.sql"

PRAGMA foreign_keys = ON;

-- Where a lead came from (the website form, a later Power Automate form, etc.)
CREATE TABLE Source (
    source_id   INTEGER PRIMARY KEY,
    name        TEXT    NOT NULL UNIQUE
);

-- The prospect's organization. Optional on a lead: the form does not require it.
CREATE TABLE Company (
    company_id    INTEGER PRIMARY KEY,
    name          TEXT    NOT NULL,
    company_size  TEXT
);

-- One row per real lead. external_id + source_id is the natural key.
CREATE TABLE Lead (
    lead_id          INTEGER PRIMARY KEY,
    source_id        INTEGER NOT NULL REFERENCES Source (source_id),
    external_id      TEXT    NOT NULL,
    company_id       INTEGER          REFERENCES Company (company_id),
    email            TEXT    NOT NULL,
    first_name       TEXT,
    last_name        TEXT,
    phone            TEXT,
    engagement_type  TEXT,
    message          TEXT,
    submitted_at     TEXT    NOT NULL,
    received_at      TEXT    NOT NULL,
    status           TEXT    NOT NULL DEFAULT 'new',
    routed_to        TEXT,
    routed_by        TEXT,
    duplicate_count  INTEGER NOT NULL DEFAULT 0,
    UNIQUE (external_id, source_id)
);

-- One row per time the workflow ran on a submission (new, duplicate, or rejected).
CREATE TABLE WorkflowRun (
    run_id               INTEGER PRIMARY KEY,
    execution_id         TEXT    NOT NULL UNIQUE,
    lead_id              INTEGER          REFERENCES Lead (lead_id),
    started_at           TEXT    NOT NULL,
    outcome              TEXT    NOT NULL,
    ai_category          TEXT,
    ai_confidence        TEXT,
    ai_rationale         TEXT,
    ai_other_categories  TEXT
);

-- A person's routing decision on a lead the workflow sent to review.
CREATE TABLE ReviewDecision (
    decision_id  INTEGER PRIMARY KEY,
    lead_id      INTEGER NOT NULL REFERENCES Lead (lead_id),
    reviewer     TEXT    NOT NULL,
    decided_at   TEXT    NOT NULL,
    routed_to    TEXT    NOT NULL,
    note         TEXT
);
