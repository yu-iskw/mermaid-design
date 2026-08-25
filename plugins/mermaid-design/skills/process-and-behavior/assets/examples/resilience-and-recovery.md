# Enterprise Resilience and Recovery Behavior Examples

## 1. Regional failover
```mermaid
flowchart LR
  monitor[Detect regional failure] --> declare[Declare failover]
  declare --> freeze[Freeze risky writes]
  freeze --> promote[Promote secondary]
  promote --> route[Shift traffic]
  route --> validate[Validate service + data]
```

## 2. Database restore
```mermaid
flowchart LR
  incident[Data loss/corruption] --> target[Choose recovery point]
  target --> restore[Restore snapshot]
  restore --> replay[Replay transaction logs]
  replay --> validate[Validate data]
  validate --> cutover[Cut over applications]
```

## 3. Backup restore test
```mermaid
sequenceDiagram
  participant S as Scheduler
  participant B as Backup Service
  participant R as Recovery Environment
  participant V as Validator
  S->>B: Select recovery point
  B->>R: Restore backup
  R->>V: Run integrity tests
  V-->>S: Recovery evidence
```

## 4. Service degradation
```mermaid
stateDiagram-v2
  [*] --> Healthy
  Healthy --> Degraded: dependency/capacity issue
  Degraded --> Healthy: recovered
  Degraded --> Critical: impact increases
  Critical --> Recovering: mitigation applied
  Recovering --> Healthy
```

## 5. Circuit-breaker recovery
```mermaid
stateDiagram-v2
  [*] --> Closed
  Closed --> Open: failure threshold
  Open --> HalfOpen: cooldown expires
  HalfOpen --> Closed: probe succeeds
  HalfOpen --> Open: probe fails
```

## 6. Disaster declaration
```mermaid
flowchart LR
  event[Severe disruption] --> assess[Assess RTO/RPO impact]
  assess --> executive[Disaster declaration authority]
  executive --> dr[Activate DR plan]
  dr --> teams[Mobilize recovery teams]
  teams --> status[Start stakeholder cadence]
```

## 7. Controlled failback
```mermaid
flowchart LR
  secondary[Running in DR region] --> repair[Repair primary]
  repair --> sync[Resynchronize data]
  sync --> validate[Validate primary]
  validate --> switch[Controlled failback]
  switch --> observe[Enhanced monitoring]
```

## 8. Dependency fallback
```mermaid
flowchart LR
  call[Call external dependency] --> health{Available?}
  health -->|yes| normal[Use live dependency]
  health -->|no| fallback[Use cached/degraded response]
  fallback --> notify[Surface degraded status]
  notify --> probe[Periodically probe recovery]
```

## 9. Queue disaster recovery
```mermaid
flowchart LR
  outage[Broker outage] --> stop[Pause producers]
  stop --> failover[Fail over broker]
  failover --> reconcile[Reconcile offsets/messages]
  reconcile --> resumeConsumers[Resume consumers]
  resumeConsumers --> resumeProducers[Resume producers]
```

## 10. Ransomware recovery
```mermaid
flowchart LR
  detect[Ransomware detected] --> isolate[Isolate affected systems]
  isolate --> preserve[Preserve forensic evidence]
  preserve --> clean[Build clean environment]
  clean --> restore[Restore immutable backups]
  restore --> validate[Security + business validation]
```

## 11. Lost-region communications
```mermaid
flowchart LR
  declare[Region unavailable] --> status[Publish incident status]
  status --> customers[Customer communication]
  status --> executives[Executive updates]
  status --> support[Support guidance]
  customers --> cadence[Scheduled updates]
  executives --> cadence
```

## 12. DNS failover
```mermaid
sequenceDiagram
  participant M as Health Monitor
  participant D as DNS Controller
  participant P as Primary
  participant S as Secondary
  M->>P: Health probe
  P-->>M: Failed
  M->>D: Trigger failover
  D->>S: Confirm healthy
  D-->>M: Publish secondary target
```

## 13. Data replication lag response
```mermaid
flowchart LR
  metric[Replication lag alert] --> assess[Assess RPO risk]
  assess --> throttle[Throttle noncritical writes]
  throttle --> catchup[Allow replica catch-up]
  catchup --> verify[Verify lag normal]
  verify --> resume[Resume full traffic]
```

## 14. Corrupt release recovery
```mermaid
flowchart LR
  detect[Detect corrupt release] --> halt[Halt rollout]
  halt --> rollback[Rollback application]
  rollback --> restore[Restore compatible data/schema if needed]
  restore --> verify[Verify transactions]
  verify --> reopen[Reopen traffic]
```

## 15. Capacity emergency
```mermaid
flowchart LR
  saturation[Saturation alert] --> shed[Load shed]
  shed --> scale[Emergency scale]
  scale --> prioritize[Prioritize critical tenants]
  prioritize --> stabilize[Stabilize latency]
  stabilize --> normalize[Return normal policy]
```

## 16. DR exercise
```mermaid
flowchart LR
  plan[Define exercise scenario] --> inject[Inject simulated failure]
  inject --> execute[Teams execute runbooks]
  execute --> measure[Measure RTO/RPO]
  measure --> gaps[Identify gaps]
  gaps --> actions[Track remediation]
```

## 17. Restore approval gate
```mermaid
flowchart LR
  restore[Technical restore complete] --> integrity[Integrity checks]
  integrity --> security[Security validation]
  security --> business[Business owner validation]
  business --> approve[Approve production cutover]
  approve --> traffic[Restore traffic]
```

## 18. Multi-service recovery order
```mermaid
flowchart LR
  infra[Recover network/IAM] --> data[Recover data services]
  data --> core[Recover core APIs]
  core --> async[Recover async workers]
  async --> edge[Recover customer edge]
  edge --> validate[End-to-end validation]
```

## 19. Degraded-mode exit
```mermaid
flowchart LR
  degraded[Service in degraded mode] --> dependency[Dependency recovered]
  dependency --> probe[Run recovery probes]
  probe --> warm[Warm caches/connections]
  warm --> gradual[Gradually restore features]
  gradual --> normal[Normal mode]
```

## 20. Recovery state machine
```mermaid
stateDiagram-v2
  [*] --> Disrupted
  Disrupted --> Contained
  Contained --> Recovering
  Recovering --> Validating
  Validating --> Restored: checks pass
  Validating --> Recovering: checks fail
  Restored --> [*]
```