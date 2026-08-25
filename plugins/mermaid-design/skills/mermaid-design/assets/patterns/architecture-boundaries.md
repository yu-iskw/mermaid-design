# Architecture & Boundary Patterns

Copy and adapt. Keep boundary labels semantic.

## System context
```mermaid
flowchart LR
  user[User]
  subgraph product[Product boundary]
    web[Web app] --> api[API]
  end
  idp[Identity provider] --> api
  api --> partner[Partner API]
  user --> web
```

## Three-tier application
```mermaid
flowchart TB
  subgraph presentation[Presentation]
    web[Web] --- mobile[Mobile]
  end
  subgraph services[Service layer]
    api[API] --> domain[Domain services]
  end
  subgraph persistence[Persistence]
    db[(Database)] --- cache[(Cache)]
  end
  web --> api
  mobile --> api
  domain --> db
  domain --> cache
```

## Layered platform
```mermaid
flowchart TB
  subgraph experience[Experience]
    ui[UI] --- cli[CLI]
  end
  subgraph access[API & access]
    gateway[Gateway] --> auth[Auth]
  end
  subgraph domain[Domain]
    svcA[Service A] --- svcB[Service B]
  end
  subgraph data[Data]
    db[(Operational DB)] --- events[(Event log)]
  end
  ui --> gateway
  cli --> gateway
  auth --> svcA
  auth --> svcB
  svcA --> db
  svcB --> events
```

## Hub and spoke
```mermaid
flowchart LR
  subgraph spokes[Independent workloads]
    a[Team A]:::plain
    b[Team B]:::plain
    c[Team C]:::plain
  end
  hub[Shared platform]
  a --> hub
  b --> hub
  c --> hub
  hub --> shared[(Shared services)]
```

## Control plane / data plane
```mermaid
flowchart TB
  subgraph control[Control plane]
    admin[Admin/API] --> desired[Desired state]
    desired --> reconciler[Reconciler]
  end
  subgraph data[Data plane]
    client[Client] --> runtime[Runtime]
    runtime --> backend[Backend]
  end
  reconciler -->|configure| runtime
```

## Trust zones
```mermaid
flowchart LR
  subgraph public[Public zone]
    client[Client]
    edge[Edge gateway]
  end
  subgraph private[Private application zone]
    api[API]
    worker[Worker]
  end
  subgraph restricted[Restricted data zone]
    db[(Database)]
  end
  client --> edge
  edge -->|authenticated request| api
  api --> worker
  worker -->|private DB protocol| db
```

## Active / passive region pair
```mermaid
flowchart LR
  dns[Global routing]
  subgraph primary[Region A · active]
    appA[Application] --> dbA[(Primary DB)]
  end
  subgraph secondary[Region B · standby]
    appB[Application] --> dbB[(Replica)]
  end
  dns --> appA
  dbA -->|replication| dbB
  dns -. failover .-> appB
```

## Multi-region active/active
```mermaid
flowchart TB
  global[Global load balancer]
  subgraph east[Region East]
    apiE[API] --> dbE[(Regional data)]
  end
  subgraph west[Region West]
    apiW[API] --> dbW[(Regional data)]
  end
  global --> apiE
  global --> apiW
  dbE <-->|replication| dbW
```

## Shared services backbone
```mermaid
flowchart TB
  subgraph products[Product workloads]
    p1[Product A]
    p2[Product B]
    p3[Product C]
  end
  subgraph platform[Shared platform services]
    identity[Identity]
    secrets[Secrets]
    obs[Observability]
    network[Networking]
  end
  p1 --> identity
  p2 --> identity
  p3 --> identity
  p1 --> obs
  p2 --> obs
  p3 --> obs
  identity --> secrets
  network --- p1
  network --- p2
  network --- p3
```

## Adapter boundary
```mermaid
flowchart LR
  subgraph external[External formats]
    rest[REST]
    queue[Messages]
    batch[Files]
  end
  subgraph adapters[Adapters]
    restA[REST adapter]
    queueA[Message adapter]
    batchA[Batch adapter]
  end
  subgraph core[Canonical domain]
    service[Domain service]
  end
  rest --> restA --> service
  queue --> queueA --> service
  batch --> batchA --> service
```

## Anti-corruption layer
```mermaid
flowchart LR
  subgraph legacy[Legacy boundary]
    old[Legacy model]
  end
  subgraph acl[Translation boundary]
    translator[Anti-corruption layer]
  end
  subgraph domain[New domain]
    model[Canonical model] --> service[Domain service]
  end
  old --> translator --> model
```

## Strangler migration
```mermaid
flowchart LR
  client[Clients] --> router[Migration router]
  subgraph legacy[Legacy system]
    oldA[Legacy feature A]
    oldB[Legacy feature B]
  end
  subgraph target[Target system]
    newA[New feature A]
    newB[New feature B]
  end
  router --> oldA
  router --> oldB
  router --> newA
  router -. progressively move .-> newB
```

## Capability map
```mermaid
flowchart TB
  subgraph customer[Customer domain]
    profile[Profile]
    consent[Consent]
  end
  subgraph commerce[Commerce domain]
    catalog[Catalog]
    order[Order]
    billing[Billing]
  end
  subgraph operations[Operations domain]
    fulfillment[Fulfillment]
    support[Support]
  end
  profile --> order
  order --> fulfillment
  billing --> support
```

## Bounded context map
```mermaid
flowchart LR
  subgraph identity[Identity context]
    account[Account]
  end
  subgraph ordering[Ordering context]
    order[Order]
  end
  subgraph billing[Billing context]
    invoice[Invoice]
  end
  account -->|customer ID| order
  order -->|order facts| invoice
```

## Architecture zone map
```mermaid
flowchart LR
  subgraph external[External]
    user[Users]
  end
  subgraph edge[Edge]
    waf[WAF] --> gateway[Gateway]
  end
  subgraph app[Application]
    api[API] --> workers[Workers]
  end
  subgraph data[Data]
    db[(Database)]
    object[(Object storage)]
  end
  subgraph management[Management]
    cicd[CI/CD]
    obs[Observability]
  end
  user --> waf
  gateway --> api
  workers --> db
  workers --> object
  cicd -. deploy .-> api
  api -. telemetry .-> obs
```
