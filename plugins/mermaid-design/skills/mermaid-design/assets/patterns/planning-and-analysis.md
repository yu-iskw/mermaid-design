# Planning & Analysis Patterns

## Release train Gantt
```mermaid
gantt
  title Release train
  dateFormat YYYY-MM-DD
  section Platform
  Foundation :a1, 2026-09-01, 10d
  Integration :a2, after a1, 8d
  section Product
  Feature work :b1, 2026-09-03, 12d
  Validation :b2, after b1, 5d
```

## Migration waves Gantt
```mermaid
gantt
  title Migration waves
  dateFormat YYYY-MM-DD
  section Wave 1
  Low-risk services :w1, 2026-09-01, 7d
  Validate :milestone, v1, after w1, 0d
  section Wave 2
  Medium-risk services :w2, after v1, 10d
  Validate :milestone, v2, after w2, 0d
```

## Incident timeline
```mermaid
timeline
  title Incident response
  Detection : Alert fired
  Diagnosis : Failure isolated
  Mitigation : Traffic shifted
  Recovery : Service restored
  Follow-up : Root cause review
```

## Product evolution timeline
```mermaid
timeline
  title Product evolution
  Phase 1 : Core workflow
  Phase 2 : Team collaboration
  Phase 3 : Automation
  Phase 4 : Platform ecosystem
```

## Risk quadrant
```mermaid
quadrantChart
  title Risk assessment
  x-axis Low likelihood --> High likelihood
  y-axis Low impact --> High impact
  quadrant-1 Critical
  quadrant-2 Monitor
  quadrant-3 Accept
  quadrant-4 Mitigate
  Data loss: [0.75, 0.9]
  Minor UI defect: [0.3, 0.2]
```

## Build / buy quadrant
```mermaid
quadrantChart
  title Build vs buy
  x-axis Commodity --> Differentiating
  y-axis Low complexity --> High complexity
  quadrant-1 Strategic build
  quadrant-2 Selective build
  quadrant-3 Buy
  quadrant-4 Partner
  Identity provider: [0.15, 0.75]
  Core domain engine: [0.9, 0.8]
```

## User journey
```mermaid
journey
  title New user onboarding
  section Discover
    Find product: 4: User
    Review value: 3: User
  section Start
    Sign up: 3: User
    Configure workspace: 2: User
  section Succeed
    Complete first task: 5: User
```

## Git history
```mermaid
gitGraph
  commit id: "main"
  branch feature
  checkout feature
  commit id: "work"
  checkout main
  merge feature
  commit tag: "v1.0"
```

## Conversion Sankey
```mermaid
sankey-beta
  Search,Visit,500
  Referral,Visit,250
  Visit,Signup,300
  Visit,Exit,450
  Signup,Activated,180
  Signup,Dropoff,120
```

## Cost allocation Sankey
```mermaid
sankey-beta
  Cloud spend,Shared platform,400
  Cloud spend,Product A,300
  Cloud spend,Product B,300
  Shared platform,Product A,220
  Shared platform,Product B,180
```

## Time-series threshold
```mermaid
xychart-beta
  title "Latency vs target"
  x-axis [1, 2, 3, 4, 5, 6]
  y-axis "ms" 0 --> 500
  line [180, 210, 260, 230, 320, 280]
  line [250, 250, 250, 250, 250, 250]
```

## Kanban delivery board
```mermaid
kanban
  Backlog
    task1[Auth hardening]
    task2[Audit export]
  Doing
    task3[Policy engine]
  Review
    task4[MCP integration]
  Done
    task5[Plugin manifest]
```

## Requirement trace
```mermaid
flowchart LR
  need[Stakeholder need] --> req[Requirement]
  req --> component[Component]
  component --> test[Verification]
  test --> evidence[Evidence]
```

## Decision tree
```mermaid
flowchart TD
  start{Need chronology?}
  start -->|yes| timeline[Timeline / Gantt]
  start -->|no| compare{Compare two dimensions?}
  compare -->|yes| quadrant[Quadrant]
  compare -->|no| flow{Show quantity flow?}
  flow -->|yes| sankey[Sankey]
  flow -->|no| chart[Choose simple chart]
```

## Dependency tree
```mermaid
flowchart TB
  root[Application]
  root --> api[API package]
  root --> ui[UI package]
  api --> db[Database client]
  api --> auth[Auth client]
  ui --> design[Design system]
```

## Ishikawa fallback
```mermaid
flowchart LR
  people[People] --> problem[Observed problem]
  process[Process] --> problem
  technology[Technology] --> problem
  data[Data] --> problem
  environment[Environment] --> problem
```
