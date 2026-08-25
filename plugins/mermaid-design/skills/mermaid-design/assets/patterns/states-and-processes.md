# State & Process Patterns

## Entity lifecycle
```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Active: publish
  Active --> Suspended: suspend
  Suspended --> Active: restore
  Active --> Archived: archive
  Suspended --> Archived: archive
  Archived --> [*]
```

## Order lifecycle
```mermaid
stateDiagram-v2
  [*] --> Pending
  Pending --> Paid: payment captured
  Pending --> Cancelled: cancel
  Paid --> Fulfilled: ship
  Paid --> Cancelled: refund
  Fulfilled --> Completed: delivered
  Completed --> [*]
  Cancelled --> [*]
```

## Job lifecycle
```mermaid
stateDiagram-v2
  [*] --> Queued
  Queued --> Running
  Running --> Succeeded
  Running --> Failed
  Running --> Cancelled
  Failed --> Queued: retry
  Succeeded --> [*]
  Cancelled --> [*]
```

## Deployment lifecycle
```mermaid
stateDiagram-v2
  [*] --> Planned
  Planned --> Deploying
  Deploying --> Verifying
  Verifying --> Promoted: healthy
  Verifying --> RollingBack: unhealthy
  RollingBack --> RolledBack
  Promoted --> [*]
  RolledBack --> [*]
```

## Incident lifecycle
```mermaid
stateDiagram-v2
  [*] --> Detected
  Detected --> Triaged
  Triaged --> Mitigating
  Mitigating --> Resolved
  Resolved --> Reviewed
  Reviewed --> [*]
```

## Approval workflow
```mermaid
stateDiagram-v2
  [*] --> Submitted
  Submitted --> InReview
  InReview --> Approved
  InReview --> Rejected
  Approved --> Executed
  Rejected --> Submitted: revise
  Executed --> [*]
```

## Circuit breaker states
```mermaid
stateDiagram-v2
  [*] --> Closed
  Closed --> Open: failure threshold
  Open --> HalfOpen: timeout
  HalfOpen --> Closed: probe succeeds
  HalfOpen --> Open: probe fails
```

## Connection states
```mermaid
stateDiagram-v2
  [*] --> Disconnected
  Disconnected --> Connecting
  Connecting --> Authenticated: success
  Connecting --> Disconnected: failure
  Authenticated --> Reconnecting: connection lost
  Reconnecting --> Authenticated: restored
  Reconnecting --> Disconnected: exhausted
```

## Subscription lifecycle
```mermaid
stateDiagram-v2
  [*] --> Trial
  Trial --> Active: subscribe
  Trial --> Cancelled: expire
  Active --> PastDue: payment failure
  PastDue --> Active: recovered
  PastDue --> Cancelled: grace period ends
  Active --> Cancelled: cancel
```

## Data quality state
```mermaid
stateDiagram-v2
  [*] --> Raw
  Raw --> Validating
  Validating --> Published: pass
  Validating --> Quarantined: fail
  Quarantined --> Validating: repaired
  Published --> [*]
```

## Migration waves
```mermaid
flowchart LR
  subgraph wave1[Wave 1 · low risk]
    a[Service A] --> acheck{Validate}
  end
  subgraph wave2[Wave 2 · medium risk]
    b[Service B] --> bcheck{Validate}
  end
  subgraph wave3[Wave 3 · critical]
    c[Service C] --> ccheck{Validate}
  end
  acheck -->|pass| b
  bcheck -->|pass| c
  ccheck -->|pass| done[Migration complete]
```

## Swimlane-like ownership
```mermaid
flowchart LR
  subgraph requester[Requester]
    submit[Submit request]
  end
  subgraph platform[Platform team]
    triage[Triage] --> implement[Implement]
  end
  subgraph security[Security]
    review[Review]
  end
  subgraph requester2[Requester acceptance]
    accept[Accept]
  end
  submit --> triage
  implement --> review
  review --> accept
```

## Human-in-the-loop process
```mermaid
flowchart LR
  input[Input] --> automate[Automated analysis] --> risk{Risk level}
  risk -->|low| execute[Execute]
  risk -->|high| review[Human review]
  review -->|approve| execute
  review -->|reject| revise[Revise]
  revise --> automate
```

## Data retention lifecycle
```mermaid
stateDiagram-v2
  [*] --> Collected
  Collected --> Active
  Active --> Archived: retention age
  Archived --> Deleted: retention expires
  Archived --> Anonymized: preserve aggregates
  Deleted --> [*]
  Anonymized --> [*]
```
