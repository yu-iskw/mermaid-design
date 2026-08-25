# Enterprise Data and Analytics Architecture Examples

## 1. Modern warehouse platform
```mermaid
flowchart LR
  sources[Operational sources] --> ingest[Ingestion]
  subgraph platform[Analytics platform]
    ingest --> raw[(Raw zone)]
    raw --> transform[Transform]
    transform --> marts[(Data marts)]
    marts --> semantic[Semantic layer]
  end
  semantic --> bi[BI]
```

## 2. Lakehouse medallion
```mermaid
flowchart LR
  sources[Sources] --> bronze[(Bronze)]
  subgraph lakehouse[Lakehouse]
    bronze --> silver[(Silver)]
    silver --> gold[(Gold)]
  end
  gold --> bi[BI]
  gold --> ml[ML]
```

## 3. Enterprise data mesh
```mermaid
flowchart TB
  subgraph domains[Domain data products]
    sales[Sales data product]
    finance[Finance data product]
    ops[Operations data product]
  end
  subgraph platform[Self-service data platform]
    catalog[Catalog]
    quality[Quality]
    access[Access control]
  end
  sales --> platform
  finance --> platform
  ops --> platform
```

## 4. Semantic layer architecture
```mermaid
flowchart LR
  warehouse[(Warehouse)] --> metrics[Metric definitions]
  subgraph semantic[Semantic layer]
    metrics --> query[Semantic query engine]
    dimensions[Shared dimensions] --> query
  end
  query --> bi[BI tools]
  query --> agents[Analytics agents]
```

## 5. Data catalog and lineage
```mermaid
flowchart LR
  warehouse[Warehouse metadata] --> collector[Metadata collectors]
  dbt[Transformation metadata] --> collector
  bi[BI metadata] --> collector
  subgraph catalog[Enterprise catalog]
    collector --> graph[(Lineage graph)]
    graph --> search[Search]
    graph --> impact[Impact analysis]
  end
```

## 6. Streaming analytics
```mermaid
flowchart LR
  apps[Applications] --> events[Event stream]
  subgraph streaming[Streaming platform]
    events --> process[Stream processing]
    process --> realtime[(Real-time store)]
    process --> lake[(Data lake)]
  end
  realtime --> dashboard[Operational dashboard]
```

## 7. CDC analytics pipeline
```mermaid
flowchart LR
  db[(OLTP database)] --> log[Change log]
  log --> cdc[CDC connector]
  subgraph analytics[Analytics boundary]
    cdc --> stream[Event stream]
    stream --> warehouse[(Warehouse)]
  end
```

## 8. Governed data sharing
```mermaid
flowchart LR
  producer[Data producer] --> product[Data product]
  subgraph governance[Governed exchange]
    product --> contract[Data contract]
    contract --> policy[Access policy]
    policy --> share[Secure share]
  end
  share --> consumer[External consumer]
```

## 9. PII processing boundary
```mermaid
flowchart LR
  source[Customer source] --> classify[PII classification]
  subgraph restricted[Restricted PII zone]
    classify --> tokenize[Tokenization]
    tokenize --> pii[(Restricted store)]
  end
  tokenize --> analytics[(De-identified analytics)]
```

## 10. Data quality platform
```mermaid
flowchart TB
  datasets[Datasets] --> profiler[Profiling]
  subgraph quality[Quality control plane]
    profiler --> rules[Quality rules]
    rules --> results[(Quality results)]
    results --> alerts[Alerts]
  end
  results --> catalog[Data catalog]
```

## 11. Federated query architecture
```mermaid
flowchart TB
  analyst[Analyst] --> query[Federated query engine]
  subgraph sources[Enterprise data sources]
    query --> warehouse[(Warehouse)]
    query --> lake[(Object lake)]
    query --> operational[(Operational DB)]
  end
  policy[Central policy] --> query
```

## 12. Reverse ETL
```mermaid
flowchart LR
  warehouse[(Warehouse)] --> model[Curated customer model]
  subgraph activation[Activation platform]
    model --> reverse[Reverse ETL]
    reverse --> crm[CRM]
    reverse --> marketing[Marketing platform]
    reverse --> support[Support platform]
  end
```

## 13. Enterprise feature store
```mermaid
flowchart TB
  sources[Data sources] --> compute[Feature pipelines]
  subgraph feature[Feature platform]
    compute --> offline[(Offline features)]
    compute --> online[(Online features)]
    registry[Feature registry] --> offline
    registry --> online
  end
  online --> serving[Model serving]
```

## 14. Batch orchestration platform
```mermaid
flowchart LR
  schedule[Schedule] --> orchestrator[Orchestrator]
  subgraph pipeline[Data pipeline]
    orchestrator --> extract[Extract]
    extract --> transform[Transform]
    transform --> publish[Publish]
  end
  publish --> catalog[Catalog update]
```

## 15. Data contract enforcement
```mermaid
flowchart LR
  producer[Producer] --> contract[Schema contract]
  subgraph enforcement[Contract checks]
    contract --> ci[CI validation]
    contract --> registry[Schema registry]
    registry --> runtime[Runtime validation]
  end
  runtime --> consumer[Consumer]
```

## 16. Analytics sandbox isolation
```mermaid
flowchart TB
  analyst[Analyst] --> workspace[Analytics workspace]
  subgraph sandbox[Isolated sandbox]
    workspace --> compute[Ephemeral compute]
    compute --> temp[(Temporary data)]
  end
  governed[Governed datasets] --> workspace
  policy[Data policy] --> workspace
```

## 17. Metrics observability
```mermaid
flowchart LR
  dbt[Transforms] --> metrics[Metric layer]
  bi[BI queries] --> telemetry[Query telemetry]
  subgraph observability[Analytics observability]
    metrics --> lineage[Metric lineage]
    telemetry --> usage[Usage analytics]
    lineage --> alerts[Semantic drift alerts]
  end
```

## 18. Data retention tiers
```mermaid
flowchart LR
  active[(Active data)] --> warm[(Warm archive)]
  subgraph retention[Retention lifecycle]
    warm --> cold[(Cold archive)]
    cold --> delete[Delete / anonymize]
  end
  policy[Retention policy] --> retention
```

## 19. Multi-region analytics residency
```mermaid
flowchart TB
  subgraph eu[EU analytics]
    euIn[EU sources] --> euWh[(EU warehouse)]
  end
  subgraph us[US analytics]
    usIn[US sources] --> usWh[(US warehouse)]
  end
  euWh --> global[Approved aggregated metrics]
  usWh --> global
```

## 20. Agentic analytics platform
```mermaid
flowchart LR
  user[Analyst] --> agent[Analytics agent]
  subgraph governed[Governed analytics plane]
    agent --> semantic[Semantic layer]
    agent --> catalog[Catalog]
    agent --> query[Query service]
  end
  query --> warehouse[(Warehouse)]
  agent --> evidence[Evidence + provenance]
```