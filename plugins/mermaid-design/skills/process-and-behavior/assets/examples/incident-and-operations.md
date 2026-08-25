# Enterprise Incident and Operations Behavior Examples

## 1. Alert to incident
```mermaid
flowchart LR
  monitor[Monitoring alert] --> triage[On-call triage]
  triage --> severity[Assign severity]
  severity --> commander[Incident commander]
  commander --> responders[Engage responders]
  responders --> mitigate[Mitigate]
  mitigate --> resolve[Resolve]
```

## 2. Major incident command
```mermaid
sequenceDiagram
  participant M as Monitoring
  participant O as On-call
  participant IC as Incident Commander
  participant T as Technical Lead
  participant C as Communications
  M->>O: Critical alert
  O->>IC: Declare major incident
  IC->>T: Lead mitigation
  IC->>C: Start stakeholder updates
  T-->>IC: Service restored
```

## 3. Escalation after no acknowledgement
```mermaid
flowchart LR
  alert[Page primary] --> wait[Wait for acknowledgement]
  wait -->|acknowledged| triage[Triage]
  wait -->|timeout| secondary[Page secondary]
  secondary -->|timeout| manager[Escalate manager]
  manager --> triage
```

## 4. Incident lifecycle
```mermaid
stateDiagram-v2
  [*] --> Detected
  Detected --> Triaged
  Triaged --> Mitigating
  Mitigating --> Monitoring
  Monitoring --> Resolved: stable
  Monitoring --> Mitigating: regression
  Resolved --> Reviewed
  Reviewed --> [*]
```

## 5. Customer communication cadence
```mermaid
flowchart LR
  declare[Declare incident] --> initial[Initial status update]
  initial --> periodic[Periodic updates]
  periodic --> periodic
  periodic --> resolved[Resolution notice]
  resolved --> postmortem[Postmortem summary]
```

## 6. Runbook execution
```mermaid
flowchart TB
  alert[Alert] --> runbook[Select runbook]
  runbook --> checks[Pre-checks]
  checks --> action[Execute remediation]
  action --> verify[Verify health]
  verify -->|healthy| close[Close]
  verify -->|unhealthy| escalate[Escalate]
```

## 7. Automated remediation with human fallback
```mermaid
flowchart LR
  alert[Alert] --> automation[Auto-remediation]
  automation --> verify[Health check]
  verify -->|recovered| close[Close event]
  verify -->|failed| human[Page engineer]
  human --> manual[Manual mitigation]
```

## 8. Security incident handoff
```mermaid
sequenceDiagram
  participant SOC
  participant IC as Incident Commander
  participant App as App Team
  participant Legal
  SOC->>IC: Confirm security incident
  IC->>App: Contain affected service
  IC->>Legal: Assess notification obligations
  App-->>IC: Containment complete
  Legal-->>IC: Regulatory guidance
```

## 9. Production access during incident
```mermaid
flowchart LR
  responder[Responder] --> request[Emergency access request]
  request --> commander[Incident commander approval]
  commander --> pam[JIT privileged access]
  pam --> action[Production action]
  action --> revoke[Auto revoke]
  action --> audit[Session audit]
```

## 10. Postmortem workflow
```mermaid
flowchart LR
  resolved[Incident resolved] --> collect[Collect timeline + evidence]
  collect --> draft[Draft postmortem]
  draft --> review[Blameless review]
  review --> actions[Assign corrective actions]
  actions --> track[Track to completion]
```

## 11. Error-budget escalation
```mermaid
flowchart LR
  sli[SLI calculation] --> budget[Error budget]
  budget --> decision{Budget exhausted?}
  decision -->|no| normal[Normal delivery]
  decision -->|yes| freeze[Feature freeze]
  freeze --> reliability[Prioritize reliability work]
```

## 12. Capacity incident
```mermaid
flowchart LR
  saturation[Capacity saturation] --> shed[Load shedding]
  shed --> scale[Emergency scale-out]
  scale --> verify[Verify latency]
  verify -->|still high| degrade[Disable optional features]
  verify -->|healthy| recover[Restore normal mode]
```

## 13. Database failover incident
```mermaid
sequenceDiagram
  participant M as Monitoring
  participant DBA
  participant DB as Database Cluster
  participant App
  M->>DBA: Primary unhealthy
  DBA->>DB: Promote replica
  DB-->>DBA: New primary ready
  DBA->>App: Refresh endpoint / connections
  App-->>DBA: Transactions healthy
```

## 14. Third-party outage response
```mermaid
flowchart LR
  detect[Detect vendor outage] --> breaker[Open circuit breaker]
  breaker --> fallback[Enable fallback/degraded mode]
  fallback --> notify[Notify stakeholders]
  notify --> monitor[Monitor vendor]
  monitor -->|recovered| restore[Restore normal path]
```

## 15. Queue backlog incident
```mermaid
flowchart LR
  backlog[Queue backlog alert] --> inspect[Inspect producers + consumers]
  inspect --> scale[Scale consumers]
  scale --> rate[Throttle producers if needed]
  rate --> drain[Drain backlog]
  drain --> review[Review capacity assumptions]
```

## 16. Certificate expiry incident
```mermaid
flowchart LR
  alert[Certificate expiry alert] --> identify[Identify affected endpoint]
  identify --> renew[Issue replacement]
  renew --> deploy[Deploy certificate]
  deploy --> verify[TLS verification]
  verify --> root[Fix renewal automation]
```

## 17. Data quality incident
```mermaid
flowchart LR
  alert[Quality rule failure] --> quarantine[Quarantine dataset]
  quarantine --> owner[Notify data owner]
  owner --> diagnose[Diagnose upstream issue]
  diagnose --> repair[Repair + backfill]
  repair --> validate[Re-run quality checks]
```

## 18. Incident severity reassessment
```mermaid
stateDiagram-v2
  [*] --> SEV3
  SEV3 --> SEV2: broader impact
  SEV2 --> SEV1: critical business impact
  SEV1 --> SEV2: impact reduced
  SEV2 --> SEV3: stable mitigation
  SEV3 --> Resolved
  Resolved --> [*]
```

## 19. Follow-the-sun handoff
```mermaid
sequenceDiagram
  participant APAC
  participant EMEA
  participant AMER
  APAC->>EMEA: Handoff active incidents + risks
  EMEA-->>APAC: Acknowledge ownership
  EMEA->>AMER: Handoff status + next actions
  AMER-->>EMEA: Acknowledge ownership
```

## 20. Operational problem management
```mermaid
flowchart LR
  incidents[Recurring incidents] --> problem[Create problem record]
  problem --> analysis[Root-cause analysis]
  analysis --> workaround[Document workaround]
  analysis --> fix[Permanent fix]
  fix --> verify[Verify recurrence eliminated]
  verify --> close[Close problem]
```