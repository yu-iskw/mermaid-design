# Enterprise Data Workflow Behavior Examples

## 1. Batch ingestion
```mermaid
flowchart LR
  source[Source system] --> extract[Extract]
  extract --> stage[(Landing zone)]
  stage --> validate[Schema validation]
  validate --> transform[Transform]
  transform --> publish[(Curated dataset)]
  publish --> catalog[Catalog update]
```

## 2. Data quality quarantine
```mermaid
flowchart LR
  dataset[New dataset] --> checks[Quality checks]
  checks -->|pass| publish[Publish]
  checks -->|fail| quarantine[Quarantine]
  quarantine --> owner[Notify owner]
  owner --> repair[Repair data]
  repair --> checks
```

## 3. CDC propagation
```mermaid
sequenceDiagram
  participant DB as Source DB
  participant C as CDC Connector
  participant B as Broker
  participant S as Sink
  DB->>C: Commit change
  C->>B: Publish change event
  B->>S: Deliver event
  S-->>B: Ack after apply
```

## 4. dbt-style model promotion
```mermaid
flowchart LR
  change[Model change] --> compile[Compile]
  compile --> unit[Unit tests]
  unit --> build[Build staging models]
  build --> data[Data tests]
  data --> review[Review artifacts]
  review --> prod[Promote production]
```

## 5. Data contract breaking change
```mermaid
flowchart LR
  producer[Producer proposes schema] --> registry[Contract registry]
  registry --> compatibility[Compatibility check]
  compatibility -->|compatible| publish[Publish schema]
  compatibility -->|breaking| notify[Notify consumers]
  notify --> migration[Coordinate migration]
  migration --> publish
```

## 6. Backfill workflow
```mermaid
flowchart LR
  request[Backfill request] --> scope[Define date range]
  scope --> capacity[Capacity check]
  capacity --> run[Run isolated backfill]
  run --> validate[Compare aggregates]
  validate --> merge[Merge results]
```

## 7. Dataset access request
```mermaid
sequenceDiagram
  actor A as Analyst
  participant C as Catalog
  participant O as Data Owner
  participant P as Policy Service
  A->>C: Request dataset access
  C->>O: Approval request
  O->>P: Approve purpose + scope
  P-->>C: Grant time-bound access
  C-->>A: Access available
```

## 8. Sensitive-data tokenization
```mermaid
flowchart LR
  raw[Raw customer data] --> classify[Classify fields]
  classify --> tokenize[Tokenize PII]
  tokenize --> restricted[(Restricted mapping)]
  tokenize --> analytics[(De-identified dataset)]
  analytics --> validate[Privacy validation]
```

## 9. Data incident remediation
```mermaid
flowchart LR
  alert[Bad data alert] --> stop[Stop downstream publication]
  stop --> identify[Identify affected partitions]
  identify --> fix[Fix upstream logic]
  fix --> backfill[Backfill]
  backfill --> validate[Validate]
  validate --> resume[Resume publication]
```

## 10. Data retention lifecycle
```mermaid
stateDiagram-v2
  [*] --> Active
  Active --> Archived: retention tier reached
  Archived --> LegalHold: hold applied
  LegalHold --> Archived: hold released
  Archived --> Deleted: retention expired
  Deleted --> [*]
```

## 11. ML training pipeline
```mermaid
flowchart LR
  data[Training data] --> features[Feature build]
  features --> train[Train]
  train --> evaluate[Evaluate]
  evaluate -->|pass| register[Register model]
  evaluate -->|fail| tune[Adjust training]
  tune --> train
```

## 12. Model promotion
```mermaid
flowchart LR
  candidate[Candidate model] --> offline[Offline evaluation]
  offline --> risk[Risk checks]
  risk --> shadow[Shadow traffic]
  shadow --> canary[Canary]
  canary --> approve[Production approval]
  approve --> prod[Promote]
```

## 13. Feature computation freshness failure
```mermaid
flowchart LR
  scheduler[Feature schedule] --> compute[Compute features]
  compute --> freshness[Freshness check]
  freshness -->|pass| publish[Publish features]
  freshness -->|fail| alert[Alert owner]
  alert --> fallback[Use previous valid snapshot]
```

## 14. Metadata ingestion
```mermaid
flowchart LR
  systems[Data systems] --> crawl[Metadata crawl]
  crawl --> normalize[Normalize metadata]
  normalize --> lineage[Build lineage]
  lineage --> classify[Apply classifications]
  classify --> catalog[Publish catalog]
```

## 15. Lineage impact analysis
```mermaid
flowchart LR
  change[Proposed upstream change] --> lineage[Traverse lineage graph]
  lineage --> impacted[Identify downstream assets]
  impacted --> owners[Notify owners]
  owners --> assess[Assess compatibility]
  assess --> decision[Proceed / coordinate migration]
```

## 16. Metrics definition review
```mermaid
flowchart LR
  analyst[Analyst proposes metric] --> semantic[Semantic review]
  semantic --> owner[Business owner approval]
  owner --> tests[Metric tests]
  tests --> registry[Publish metric definition]
  registry --> consumers[BI + agents]
```

## 17. Data deletion request
```mermaid
sequenceDiagram
  participant P as Privacy Service
  participant C as Data Catalog
  participant S as Storage Systems
  participant E as Evidence Store
  P->>C: Locate subject data
  C-->>P: Affected assets
  P->>S: Delete / anonymize
  S-->>P: Completion receipts
  P->>E: Store deletion evidence
```

## 18. Analytics release validation
```mermaid
flowchart LR
  dashboard[Dashboard change] --> semantic[Validate semantic queries]
  semantic --> regression[Regression tests]
  regression --> snapshot[Visual/data snapshot review]
  snapshot --> release[Publish dashboard]
  release --> usage[Monitor usage/errors]
```

## 19. Streaming checkpoint recovery
```mermaid
sequenceDiagram
  participant S as Stream Processor
  participant C as Checkpoint Store
  participant B as Broker
  S->>C: Persist checkpoint
  Note over S: Process crashes
  S->>C: Read latest checkpoint
  C-->>S: Offset
  S->>B: Resume from offset
```

## 20. Dataset lifecycle
```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validating
  Validating --> Published: checks pass
  Validating --> Quarantined: checks fail
  Quarantined --> Validating: repaired
  Published --> Deprecated
  Deprecated --> Retired
  Retired --> [*]
```