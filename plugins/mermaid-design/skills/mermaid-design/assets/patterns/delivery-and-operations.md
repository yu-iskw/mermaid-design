# Delivery & Operations Patterns

## CI/CD pipeline
```mermaid
flowchart LR
  source[Source] --> build[Build] --> test[Test] --> scan[Security scan] --> package[Package] --> deploy[Deploy] --> verify[Verify]
  verify -->|fail| rollback[Rollback]
```

## Pipeline quality gates
```mermaid
flowchart LR
  change[Change] --> unit{Unit tests} -->|pass| integration{Integration tests} -->|pass| policy{Policy gate} -->|pass| release[Release]
  unit -->|fail| fix[Fix]
  integration -->|fail| fix
  policy -->|fail| fix
  fix --> change
```

## GitOps reconciliation
```mermaid
flowchart LR
  repo[(Desired state repo)] --> controller[GitOps controller]
  controller --> cluster[Cluster]
  cluster --> observed[Observed state]
  observed --> controller
  controller -. drift/status .-> repo
```

## Kubernetes request path
```mermaid
flowchart LR
  client[Client] --> ingress[Ingress / gateway]
  subgraph cluster[Kubernetes cluster]
    ingress --> service[Service]
    service --> podA[Pod A]
    service --> podB[Pod B]
  end
  podA --> db[(Dependency)]
  podB --> db
```

## Kubernetes control loop
```mermaid
flowchart LR
  desired[Desired spec] --> api[Kubernetes API]
  api --> controller[Controller]
  controller --> actual[Resources]
  actual --> observed[Observed state]
  observed --> controller
  controller -->|reconcile| api
```

## Blue / green deployment
```mermaid
flowchart LR
  users[Users] --> router[Traffic router]
  subgraph blue[Blue · current]
    appB[App v1]
  end
  subgraph green[Green · candidate]
    appG[App v2]
  end
  router --> appB
  router -. switch .-> appG
```

## Canary rollout
```mermaid
flowchart LR
  users[Users] --> split[Traffic split]
  split -->|95%| stable[Stable version]
  split -->|5%| canary[Canary version]
  canary --> metrics[Metrics]
  metrics --> decision{Promote?}
  decision -->|yes| stable
  decision -->|no| rollback[Rollback canary]
```

## Feature flag path
```mermaid
flowchart LR
  request[Request] --> evaluate{Flag evaluation}
  evaluate -->|control| old[Existing behavior]
  evaluate -->|treatment| new[New behavior]
  old --> response[Response]
  new --> response
```

## Backup / restore
```mermaid
flowchart LR
  primary[(Primary data)] --> snapshot[Snapshot] --> backup[(Backup storage)]
  backup --> restore[Restore test] --> validation{Validation}
  validation -->|pass| ready[Recovery-ready]
```

## Disaster recovery failover
```mermaid
flowchart LR
  monitor[Health monitor] --> decision{Primary unavailable?}
  subgraph primary[Primary region]
    appA[Application] --> dbA[(Primary DB)]
  end
  subgraph recovery[Recovery region]
    appB[Application] --> dbB[(Replica)]
  end
  dbA -->|replication| dbB
  decision -->|yes| promote[Promote replica] --> dbB
  promote --> route[Route traffic] --> appB
```

## SLO error budget loop
```mermaid
flowchart LR
  traffic[Requests] --> sli[Measure SLI] --> budget[Compute error budget] --> gate{Budget healthy?}
  gate -->|yes| release[Allow change]
  gate -->|no| stabilize[Freeze / reliability work]
  stabilize --> sli
```

## Incident response
```mermaid
flowchart LR
  alert[Alert] --> triage[Triage] --> mitigate[Mitigate] --> recover[Recover] --> review[Post-incident review]
  triage --> comms[Communications]
  mitigate --> comms
  recover --> comms
```

## Cloud landing zone
```mermaid
flowchart TB
  org[Organization]
  subgraph shared[Shared foundations]
    identity[Identity]
    network[Networking]
    logging[Central logging]
  end
  subgraph environments[Workload hierarchy]
    prod[Production projects/accounts]
    nonprod[Non-production projects/accounts]
  end
  org --> shared
  org --> environments
  network -. shared .-> prod
  network -. shared .-> nonprod
  logging -. collects .-> prod
  logging -. collects .-> nonprod
```

## Observability pipeline
```mermaid
flowchart LR
  subgraph workloads[Workloads]
    app[Application]
    worker[Worker]
  end
  collector[Telemetry collector]
  subgraph backend[Observability backend]
    logs[(Logs)]
    metrics[(Metrics)]
    traces[(Traces)]
  end
  app --> collector
  worker --> collector
  collector --> logs
  collector --> metrics
  collector --> traces
```

## Release train
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
  Release milestone :milestone, m1, 2026-09-25, 0d
```
