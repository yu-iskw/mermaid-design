# Data & AI Platform Patterns

## Medallion platform
```mermaid
flowchart LR
  subgraph sources[Sources]
    apps[Applications]
    saas[SaaS]
    files[Files]
  end
  subgraph lakehouse[Lakehouse]
    bronze[(Bronze)] --> silver[(Silver)] --> gold[(Gold)]
  end
  subgraph consumers[Consumers]
    bi[BI]
    ml[ML]
    agents[Agents]
  end
  apps --> bronze
  saas --> bronze
  files --> bronze
  gold --> bi
  gold --> ml
  gold --> agents
```

## Lakehouse planes
```mermaid
flowchart TB
  subgraph dataPlane[Data plane]
    ingest[Ingest] --> storage[(Storage)] --> transform[Transform] --> serving[Serving]
  end
  subgraph controlPlane[Control plane]
    catalog[Catalog] --- quality[Quality] --- policy[Policy] --- orchestration[Orchestration]
  end
  catalog -. metadata .-> storage
  quality -. checks .-> transform
  policy -. governs .-> serving
  orchestration -. schedules .-> transform
```

## Data lineage spine
```mermaid
flowchart LR
  source[(Source)] --> staging[Staging model] --> core[Core model] --> mart[Mart] --> dashboard[Dashboard]
```

## Governance overlay
```mermaid
flowchart LR
  source[Source] --> ingest[Ingest] --> transform[Transform] --> serve[Serve]
  subgraph governance[Cross-cutting governance]
    catalog[Catalog]
    quality[Quality]
    lineage[Lineage]
    access[Access policy]
  end
  catalog -. describes .-> ingest
  quality -. validates .-> transform
  lineage -. traces .-> transform
  access -. controls .-> serve
```

## CDC propagation
```mermaid
flowchart LR
  db[(Operational DB)] --> log[Change log] --> connector[CDC connector] --> stream[(Event stream)]
  stream --> warehouse[(Warehouse)]
  stream --> search[(Search index)]
```

## RAG indexing pipeline
```mermaid
flowchart LR
  subgraph source[Knowledge sources]
    docs[Documents]
    wiki[Wiki]
    code[Code]
  end
  subgraph indexing[Indexing]
    parse[Parse] --> chunk[Chunk] --> embed[Embed]
  end
  vector[(Vector index)]
  docs --> parse
  wiki --> parse
  code --> parse
  embed --> vector
```

## RAG query path
```mermaid
flowchart LR
  user[User] --> app[Application]
  subgraph retrieval[Retrieval]
    query[Query rewrite] --> search[Search] --> rerank[Rerank]
  end
  app --> query
  search --> vectors[(Vector index)]
  vectors --> search
  rerank --> context[Context builder]
  context --> model[LLM]
  model --> app
```

## Feature pipeline
```mermaid
flowchart LR
  raw[(Raw data)] --> transform[Feature transforms]
  transform --> offline[(Offline feature store)]
  transform --> online[(Online feature store)]
  offline --> train[Training]
  online --> serve[Inference]
```

## ML training pipeline
```mermaid
flowchart LR
  data[(Curated data)] --> features[Feature build] --> train[Train] --> evaluate{Quality gate}
  evaluate -->|pass| registry[(Model registry)] --> deploy[Deploy]
  evaluate -->|fail| train
```

## Model serving path
```mermaid
flowchart LR
  request[Request] --> gateway[Inference gateway]
  gateway --> features[(Online features)]
  gateway --> model[Model server]
  features --> model
  model --> policy[Output policy]
  policy --> response[Response]
```

## LLMOps evaluation loop
```mermaid
flowchart LR
  inputs[Prompts + eval data] --> run[Run candidate] --> judge[Judge] --> analyze[Analyze failures]
  analyze --> improve[Improve prompt/model/tools] --> run
  judge -->|pass gate| release[Release]
```

## Semantic layer
```mermaid
flowchart TB
  warehouse[(Warehouse)] --> semantic[Semantic layer]
  subgraph definitions[Governed definitions]
    metrics[Metrics]
    dimensions[Dimensions]
    joins[Relationships]
  end
  definitions --> semantic
  semantic --> bi[BI]
  semantic --> notebook[Notebook]
  semantic --> agent[Analytics agent]
```

## Data quality quarantine
```mermaid
flowchart LR
  raw[(Incoming data)] --> checks{Quality checks}
  checks -->|pass| published[(Published data)]
  checks -->|fail| quarantine[(Quarantine)]
  quarantine --> repair[Repair/review] --> checks
```

## Catalog / knowledge convergence
```mermaid
flowchart LR
  subgraph producers[Metadata producers]
    warehouse[Warehouse metadata]
    dbt[dbt]
    bi[BI semantic layer]
    catalog[External catalog]
  end
  knowledge[(Knowledge graph/catalog)]
  warehouse --> knowledge
  dbt --> knowledge
  bi --> knowledge
  catalog --> knowledge
  knowledge --> agent[Agent context]
  knowledge --> search[Discovery]
```

## Privacy-preserving analytics boundary
```mermaid
flowchart LR
  subgraph sensitive[Sensitive data zone]
    raw[(Raw records)] --> transform[Approved transforms]
  end
  subgraph governed[Governed analytical zone]
    aggregate[(Aggregates)] --> semantic[Semantic layer]
  end
  subgraph consumption[Consumption]
    analyst[Analyst]
    agent[Analytics agent]
  end
  transform -->|minimized output| aggregate
  semantic --> analyst
  semantic --> agent
```
