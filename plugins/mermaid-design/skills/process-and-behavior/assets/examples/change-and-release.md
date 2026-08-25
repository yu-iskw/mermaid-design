# Enterprise Change and Release Behavior Examples

## 1. Pull request to production
```mermaid
flowchart LR
  code[Code change] --> pr[Pull request]
  pr --> review[Peer review]
  review --> ci[CI checks]
  ci --> artifact[Signed artifact]
  artifact --> deploy[Production deploy]
  deploy --> verify[Post-deploy verification]
```

## 2. Change advisory approval
```mermaid
flowchart LR
  owner[Change owner] --> request[Change record]
  request --> risk[Risk assessment]
  subgraph cab[CAB review]
    risk --> approve[Approve]
    risk --> reject[Reject]
  end
  approve --> schedule[Schedule window]
  schedule --> execute[Execute change]
```

## 3. Canary rollout
```mermaid
flowchart LR
  release[Release] --> canary[5% traffic]
  canary --> metrics[Evaluate metrics]
  metrics -->|healthy| expand[50% traffic]
  expand --> verify[Evaluate again]
  verify -->|healthy| full[100% traffic]
  metrics -->|unhealthy| rollback[Rollback]
```

## 4. Blue-green switch
```mermaid
sequenceDiagram
  participant R as Release Controller
  participant G as Green
  participant T as Test Suite
  participant LB as Load Balancer
  R->>G: Deploy new version
  R->>T: Run validation
  T-->>R: Pass
  R->>LB: Switch traffic to green
  LB-->>R: Healthy
```

## 5. Emergency change
```mermaid
flowchart LR
  incident[Active incident] --> emergency[Emergency change request]
  emergency --> approver[Emergency approver]
  approver --> deploy[Deploy fix]
  deploy --> validate[Validate recovery]
  validate --> retrospective[Retrospective approval + record]
```

## 6. Feature flag release
```mermaid
flowchart LR
  deploy[Deploy dormant code] --> internal[Enable internal users]
  internal --> metrics[Observe]
  metrics --> beta[Enable beta cohort]
  beta --> metrics2[Observe]
  metrics2 --> general[Enable all users]
```

## 7. Database migration with expand-contract
```mermaid
flowchart LR
  add[Add backward-compatible schema] --> dual[Deploy dual-read/write app]
  dual --> migrate[Migrate existing data]
  migrate --> verify[Verify parity]
  verify --> cutover[Use new schema]
  cutover --> remove[Remove old schema]
```

## 8. Infrastructure change pipeline
```mermaid
flowchart TB
  change[IaC change] --> plan[Plan]
  plan --> policy[Policy checks]
  policy --> approval[Environment approval]
  approval --> apply[Apply]
  apply --> drift[Drift + health validation]
```

## 9. Production rollback decision
```mermaid
flowchart LR
  deploy[Deployment] --> monitor[Monitor SLOs]
  monitor --> decision{Regression?}
  decision -->|no| complete[Complete release]
  decision -->|yes| rollback[Rollback]
  rollback --> verify[Verify recovery]
```

## 10. Release train
```mermaid
gantt
  title Enterprise release train
  dateFormat YYYY-MM-DD
  section Development
  Feature complete :a1, 2026-09-01, 7d
  section Validation
  Integration test :a2, after a1, 4d
  Security review :a3, after a1, 3d
  section Release
  Production :milestone, after a2, 0d
```

## 11. Dependency upgrade rollout
```mermaid
flowchart LR
  detect[Dependency update] --> sandbox[Test in sandbox]
  sandbox --> integration[Integration tests]
  integration --> canary[Canary service]
  canary --> fleet[Roll out fleet]
  fleet --> observe[Observe regressions]
```

## 12. Mobile app release governance
```mermaid
flowchart LR
  build[Signed build] --> qa[QA]
  qa --> security[Security checks]
  security --> store[App-store submission]
  store --> phased[Phased release]
  phased --> telemetry[Crash + adoption telemetry]
```

## 13. Configuration rollout
```mermaid
flowchart LR
  config[Config change] --> validate[Schema validation]
  validate --> lower[Lower environment]
  lower --> pilot[Pilot production group]
  pilot --> all[All production]
  all --> audit[Applied-version audit]
```

## 14. API breaking-change migration
```mermaid
flowchart LR
  v1[API v1] --> v2[Introduce API v2]
  v2 --> migrate[Migrate consumers]
  migrate --> usage[Measure v1 usage]
  usage --> notify[Notify remaining consumers]
  notify --> retire[Retire v1]
```

## 15. Model release gate
```mermaid
flowchart LR
  candidate[Model candidate] --> offline[Offline evaluation]
  offline --> safety[Safety review]
  safety --> shadow[Shadow traffic]
  shadow --> canary[Canary]
  canary --> production[Production]
```

## 16. Release freeze exception
```mermaid
flowchart LR
  change[Change during freeze] --> justification[Business justification]
  justification --> risk[Risk review]
  risk --> executive[Exception approval]
  executive --> deploy[Controlled deployment]
  deploy --> evidence[Record exception evidence]
```

## 17. Package promotion
```mermaid
flowchart LR
  build[Build artifact] --> dev[Dev registry]
  dev --> test[Test promotion]
  test --> stage[Stage promotion]
  stage --> prod[Prod promotion]
  prod --> attest[Record provenance]
```

## 18. Rollout state machine
```mermaid
stateDiagram-v2
  [*] --> Planned
  Planned --> Deploying
  Deploying --> Verifying
  Verifying --> Promoted: healthy
  Verifying --> RolledBack: unhealthy
  Promoted --> [*]
  RolledBack --> [*]
```

## 19. Change-window workflow
```mermaid
flowchart TB
  request[Approved change] --> wait[Wait for maintenance window]
  wait --> announce[Notify stakeholders]
  announce --> execute[Execute]
  execute --> validate[Validate]
  validate --> close[Close change record]
```

## 20. GitOps promotion
```mermaid
sequenceDiagram
  participant Dev as Developer
  participant Git as Environment Repo
  participant C as GitOps Controller
  participant K as Cluster
  Dev->>Git: Merge version update
  C->>Git: Detect desired state
  C->>K: Reconcile release
  K-->>C: Observed healthy
  C-->>Git: Report sync status
```