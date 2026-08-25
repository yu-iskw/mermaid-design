# Enterprise Agent and Human Workflow Examples

## 1. Agent tool call with approval
```mermaid
sequenceDiagram
  actor U as User
  participant A as Agent
  participant H as Human Approver
  participant T as Enterprise Tool
  U->>A: Request side-effecting action
  A->>H: Proposed action + impact
  H-->>A: Approve
  A->>T: Execute scoped action
  T-->>A: Result
  A-->>U: Outcome + evidence
```

## 2. Agent tool call denied
```mermaid
sequenceDiagram
  actor U as User
  participant A as Agent
  participant P as Policy Engine
  participant T as Tool
  U->>A: Request action
  A->>P: Evaluate user + tool + scope
  P-->>A: Deny
  A-->>U: Explain policy boundary
  Note over T: Tool is never invoked
```

## 3. Agent memory write
```mermaid
sequenceDiagram
  participant U as User
  participant A as Agent
  participant M as Memory Service
  participant P as Privacy Policy
  U->>A: Conversation / task result
  A->>P: Is this memory eligible?
  P-->>A: Allowed fields + retention
  A->>M: Store scoped memory
  M-->>A: Memory ID + policy metadata
```

## 4. Agent memory retrieval
```mermaid
sequenceDiagram
  participant A as Agent
  participant M as Memory Service
  participant P as Authorization
  A->>P: Request memory scope for user/task
  P-->>A: Allowed filters
  A->>M: Retrieve with filters
  M-->>A: Relevant authorized memories
```

## 5. Multi-agent delegation
```mermaid
sequenceDiagram
  actor U as User
  participant S as Supervisor
  participant R as Research Agent
  participant D as Data Agent
  U->>S: Complex enterprise question
  par delegated work
    S->>R: Research policy/context
    S->>D: Analyze governed data
  end
  R-->>S: Findings + sources
  D-->>S: Analysis + evidence
  S-->>U: Synthesized answer
```

## 6. Agent escalation to human
```mermaid
flowchart LR
  request[User request] --> agent[Agent attempts task]
  agent --> confidence{Enough evidence?}
  confidence -->|yes| answer[Return answer]
  confidence -->|no| human[Escalate to expert]
  human --> guidance[Expert guidance]
  guidance --> agent
```

## 7. Agent-generated change request
```mermaid
flowchart LR
  intent[User intent] --> agent[Agent drafts change]
  agent --> diff[Proposed diff]
  diff --> tests[Automated tests]
  tests --> review[Human review]
  review -->|approve| merge[Merge]
  review -->|changes| agent
```

## 8. Agent production change gate
```mermaid
flowchart LR
  agent[Agent proposes production action] --> plan[Execution plan]
  plan --> policy[Policy checks]
  policy --> approver[Human approver]
  approver --> executor[Deterministic executor]
  executor --> verify[Post-action verification]
  verify --> audit[Audit evidence]
```

## 9. Agent analytics workflow
```mermaid
sequenceDiagram
  actor A as Analyst
  participant G as Analytics Agent
  participant C as Catalog
  participant S as Semantic Layer
  participant Q as Query Service
  A->>G: Business question
  G->>C: Resolve governed datasets
  G->>S: Resolve metrics
  G->>Q: Execute constrained query
  Q-->>G: Results + query ID
  G-->>A: Answer + evidence
```

## 10. Agent retrieval with ACL filtering
```mermaid
flowchart LR
  query[User query] --> agent[Agent]
  agent --> identity[Resolve user identity]
  identity --> acl[ACL filter]
  subgraph retrieval[Authorized retrieval]
    acl --> search[Search/index]
    search --> context[Permitted context]
  end
  context --> agent
```

## 11. Agent evaluation loop
```mermaid
flowchart LR
  candidate[Agent/prompt candidate] --> dataset[Evaluation dataset]
  dataset --> run[Run evaluation]
  run --> judge[Automated + human judges]
  judge --> analyze[Analyze failures]
  analyze --> improve[Improve agent]
  improve --> run
```

## 12. Agent incident assistant
```mermaid
sequenceDiagram
  participant IC as Incident Commander
  participant A as Incident Agent
  participant O as Observability
  participant R as Runbooks
  IC->>A: Summarize current incident
  A->>O: Fetch alerts/traces/logs
  A->>R: Retrieve relevant runbooks
  O-->>A: Evidence
  R-->>A: Procedures
  A-->>IC: Hypotheses + cited evidence
```

## 13. Agent customer-support handoff
```mermaid
flowchart LR
  customer[Customer] --> agent[Support agent]
  agent --> solve{Can resolve safely?}
  solve -->|yes| response[Answer customer]
  solve -->|no| case[Create human case]
  case --> human[Support specialist]
  human --> resolution[Resolution]
  resolution --> customer
```

## 14. Agent procurement research
```mermaid
flowchart LR
  buyer[Buyer] --> agent[Research agent]
  agent --> sources[Approved sources]
  sources --> comparison[Structured comparison]
  comparison --> human[Procurement reviewer]
  human --> shortlist[Approved shortlist]
  shortlist --> buyer
```

## 15. Agent security triage
```mermaid
sequenceDiagram
  participant D as Detection Platform
  participant A as Security Agent
  participant SOC
  D->>A: New finding
  A->>D: Gather correlated evidence
  A->>A: Classify severity + confidence
  alt high confidence critical
    A->>SOC: Escalate with evidence
  else low confidence
    A->>SOC: Queue for analyst review
  end
```

## 16. Agent-generated policy exception
```mermaid
flowchart LR
  user[Engineer] --> agent[Agent]
  agent --> evidence[Collect control evidence]
  evidence --> draft[Draft exception request]
  draft --> owner[Control owner review]
  owner -->|approve| register[Exception register]
  owner -->|reject| remediation[Remediation plan]
```

## 17. Tool timeout and recovery
```mermaid
sequenceDiagram
  participant A as Agent
  participant T as Tool
  participant H as Human
  A->>T: Tool call
  T--xA: Timeout
  A->>T: Retry once with same idempotency key
  T--xA: Timeout
  A->>H: Escalate instead of repeated side effects
```

## 18. Agent session lifecycle
```mermaid
stateDiagram-v2
  [*] --> Initialized
  Initialized --> Planning
  Planning --> Executing
  Executing --> WaitingApproval
  WaitingApproval --> Executing: approved
  WaitingApproval --> Cancelled: denied
  Executing --> Completed
  Executing --> Failed
  Completed --> [*]
  Failed --> [*]
```

## 19. Agent audit trail
```mermaid
flowchart LR
  request[User request] --> trace[Agent trace]
  trace --> model[Model calls]
  trace --> tools[Tool calls]
  trace --> approvals[Human approvals]
  subgraph evidence[Audit evidence]
    model --> store[(Trace store)]
    tools --> store
    approvals --> store
  end
```

## 20. Agent rollback workflow
```mermaid
flowchart LR
  action[Agent-executed change] --> verify[Verification]
  verify --> outcome{Healthy?}
  outcome -->|yes| complete[Complete]
  outcome -->|no| rollback[Execute predefined rollback]
  rollback --> verify2[Verify recovery]
  verify2 --> human[Notify human owner]
```