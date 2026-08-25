# Enterprise Platform Architecture Examples

## 1. Internal developer platform
```mermaid
flowchart TB
  dev[Developer] --> portal[Developer portal]
  subgraph platform[Platform engineering]
    portal --> catalog[Service catalog]
    portal --> workflow[Golden-path workflow]
    workflow --> git[Git repositories]
    workflow --> cicd[CI/CD]
  end
  cicd --> runtime[Runtime platform]
```

## 2. Shared services backbone
```mermaid
flowchart TB
  subgraph products[Product workloads]
    app1[Product A]
    app2[Product B]
    app3[Product C]
  end
  subgraph shared[Shared enterprise services]
    idp[Identity]
    obs[Observability]
    secrets[Secrets]
    policy[Policy]
  end
  products --> shared
```

## 3. Enterprise SaaS control and data plane
```mermaid
flowchart TB
  admin[Enterprise admin] --> control[Control plane]
  subgraph tenant[Tenant data plane]
    api[API]
    workers[Workers]
    db[(Tenant data)]
    api --> workers --> db
  end
  control -->|configuration| tenant
  user[End user] --> api
```

## 4. Multi-tenant application with isolation
```mermaid
flowchart LR
  gateway[Gateway] --> router[Tenant router]
  subgraph ta[Tenant A boundary]
    aapi[API A] --> adb[(DB A)]
  end
  subgraph tb[Tenant B boundary]
    bapi[API B] --> bdb[(DB B)]
  end
  router --> aapi
  router --> bapi
```

## 5. Platform API facade
```mermaid
flowchart LR
  clients[Enterprise clients] --> gateway[API gateway]
  subgraph platform[Platform APIs]
    gateway --> identity[Identity API]
    gateway --> data[Data API]
    gateway --> jobs[Jobs API]
  end
  identity --> idp[IdP]
  data --> warehouse[(Warehouse)]
  jobs --> queue[Queue]
```

## 6. Business capability domains
```mermaid
flowchart TB
  subgraph sales[Sales domain]
    crm[CRM service]
    pricing[Pricing]
  end
  subgraph finance[Finance domain]
    billing[Billing]
    ledger[Ledger]
  end
  subgraph fulfillment[Fulfillment domain]
    orders[Orders]
    shipping[Shipping]
  end
  crm --> orders --> billing
  pricing --> orders
  billing --> ledger
  orders --> shipping
```

## 7. Enterprise portal composition
```mermaid
flowchart TB
  employee[Employee] --> portal[Enterprise portal]
  subgraph experience[Experience layer]
    portal --> search[Unified search]
    portal --> tasks[My tasks]
    portal --> apps[App launcher]
  end
  search --> knowledge[Knowledge platform]
  tasks --> workflow[Workflow platform]
  apps --> sso[SSO]
```

## 8. Headless enterprise platform
```mermaid
flowchart LR
  web[Web] --> api[Experience API]
  mobile[Mobile] --> api
  partner[Partner] --> partnerApi[Partner API]
  subgraph core[Headless core]
    api --> domain[Domain services]
    partnerApi --> domain
    domain --> events[Event bus]
    domain --> db[(System of record)]
  end
```

## 9. Product plus shared control plane
```mermaid
flowchart TB
  subgraph control[Enterprise control plane]
    policy[Policy]
    config[Configuration]
    audit[Audit]
  end
  subgraph products[Product plane]
    p1[Service A]
    p2[Service B]
  end
  policy --> p1
  policy --> p2
  config --> p1
  config --> p2
  p1 --> audit
  p2 --> audit
```

## 10. Platform engineering team topology
```mermaid
flowchart LR
  subgraph enabling[Enabling teams]
    security[Security]
    sre[SRE]
  end
  subgraph platform[Platform team]
    idp[Internal platform]
  end
  subgraph stream[Stream-aligned teams]
    teamA[Team A]
    teamB[Team B]
  end
  security --> idp
  sre --> idp
  idp --> teamA
  idp --> teamB
```

## 11. Enterprise integration platform
```mermaid
flowchart LR
  apps[Business apps] --> apigw[API gateway]
  partners[Partners] --> b2b[B2B gateway]
  subgraph integration[Integration platform]
    apigw --> services[Integration services]
    b2b --> services
    services --> bus[Event bus]
    services --> mapping[Canonical mapping]
  end
  bus --> systems[Systems of record]
  mapping --> systems
```

## 12. Self-service environment provisioning
```mermaid
flowchart LR
  developer[Developer] --> portal[Portal]
  portal --> template[Environment template]
  subgraph automation[Provisioning automation]
    template --> pipeline[Provision pipeline]
    pipeline --> policy[Policy checks]
    policy --> terraform[Infrastructure as code]
  end
  terraform --> cloud[Cloud environment]
```

## 13. Enterprise feature platform
```mermaid
flowchart TB
  apps[Applications] --> sdk[Feature SDK]
  subgraph feature[Feature platform]
    sdk --> eval[Evaluation service]
    admin[Admin console] --> config[Flag configuration]
    config --> eval
    eval --> telemetry[Exposure telemetry]
  end
  telemetry --> analytics[Analytics]
```

## 14. Centralized notification platform
```mermaid
flowchart LR
  products[Products] --> api[Notification API]
  subgraph platform[Notification platform]
    api --> prefs[Preference service]
    api --> queue[Delivery queue]
    queue --> email[Email worker]
    queue --> sms[SMS worker]
    queue --> push[Push worker]
  end
  prefs --> profile[(User preferences)]
```

## 15. Enterprise search platform
```mermaid
flowchart LR
  sources[Enterprise sources] --> ingest[Connectors]
  subgraph search[Search platform]
    ingest --> index[Indexing]
    index --> store[(Search index)]
    query[Query API] --> store
    query --> authz[Authorization filter]
  end
  employee[Employee] --> query
  authz --> iam[Enterprise IAM]
```

## 16. Configuration management platform
```mermaid
flowchart TB
  admin[Platform admin] --> repo[Config repository]
  repo --> validation[Schema + policy validation]
  subgraph distribution[Configuration distribution]
    validation --> service[Config service]
    service --> app1[Service A]
    service --> app2[Service B]
  end
  app1 --> audit[Applied-version audit]
  app2 --> audit
```

## 17. Enterprise scheduler platform
```mermaid
flowchart LR
  teams[Product teams] --> api[Scheduler API]
  subgraph scheduler[Scheduling platform]
    api --> metadata[(Job metadata)]
    api --> planner[Planner]
    planner --> queue[Execution queue]
    queue --> workers[Worker pools]
  end
  workers --> targets[Enterprise systems]
```

## 18. Enterprise document processing
```mermaid
flowchart LR
  upload[Document upload] --> intake[Intake API]
  subgraph processing[Document platform]
    intake --> scan[Malware scan]
    scan --> extract[Extraction]
    extract --> classify[Classification]
    classify --> review[Human review queue]
  end
  review --> records[(Records store)]
```

## 19. Central audit platform
```mermaid
flowchart LR
  apps[Applications] --> collector[Audit collector]
  cloud[Cloud services] --> collector
  idp[Identity provider] --> collector
  subgraph audit[Audit platform]
    collector --> stream[Immutable stream]
    stream --> archive[(Retention archive)]
    stream --> detection[Detection rules]
  end
  detection --> soc[SOC]
```

## 20. Enterprise service catalog
```mermaid
flowchart TB
  repos[Source repositories] --> discovery[Metadata discovery]
  cloud[Cloud inventory] --> discovery
  subgraph catalog[Enterprise catalog]
    discovery --> catalogDb[(Catalog)]
    catalogDb --> portal[Catalog portal]
    catalogDb --> graph[Dependency graph]
  end
  owner[Service owner] --> portal
  sre[SRE] --> graph
```