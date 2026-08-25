# Distributed Systems Patterns

## Event-driven backbone
```mermaid
flowchart LR
  subgraph producers[Producers]
    orders[Orders]
    users[Users]
  end
  broker[(Event broker)]
  subgraph consumers[Consumers]
    billing[Billing]
    analytics[Analytics]
    search[Search]
  end
  orders --> broker
  users --> broker
  broker --> billing
  broker --> analytics
  broker --> search
```

## CQRS split
```mermaid
flowchart LR
  client[Client]
  subgraph command[Command path]
    cmd[Command API] --> domain[Domain model] --> write[(Write store)]
  end
  subgraph query[Query path]
    read[(Read model)] --> qry[Query API]
  end
  write -->|project events| read
  client --> cmd
  qry --> client
```

## Cache aside
```mermaid
flowchart LR
  app[Application] -->|1 lookup| cache[(Cache)]
  cache -->|miss| app
  app -->|2 load| db[(Database)]
  db --> app
  app -->|3 populate| cache
```

## Write-through cache
```mermaid
flowchart LR
  app[Application] -->|write| cache[(Cache)]
  cache -->|synchronous persist| db[(Database)]
  cache -->|acknowledge| app
```

## Write-behind cache
```mermaid
flowchart LR
  app[Application] -->|write| cache[(Cache)]
  cache -->|acknowledge| app
  cache --> queue[(Persistence queue)]
  queue --> worker[Writer]
  worker --> db[(Database)]
```

## Transactional outbox
```mermaid
flowchart LR
  service[Service] -->|single transaction| db[(Domain tables + outbox)]
  db --> relay[Outbox relay]
  relay --> broker[(Broker)]
  broker --> consumer[Consumer]
```

## Saga choreography
```mermaid
flowchart LR
  order[Order service] -->|OrderCreated| broker[(Events)]
  broker --> payment[Payment service]
  payment -->|PaymentCaptured| broker
  broker --> inventory[Inventory service]
  inventory -->|InventoryReserved| broker
  broker --> shipping[Shipping service]
  payment -. compensation .-> broker
  inventory -. compensation .-> broker
```

## Saga orchestration
```mermaid
flowchart TB
  orchestrator[Saga orchestrator]
  orchestrator -->|reserve| inventory[Inventory]
  orchestrator -->|charge| payment[Payment]
  orchestrator -->|ship| shipping[Shipping]
  payment -. failure .-> orchestrator
  orchestrator -. compensate .-> inventory
```

## Circuit breaker
```mermaid
flowchart LR
  caller[Caller] --> breaker{Circuit breaker}
  breaker -->|closed| dependency[Dependency]
  dependency -->|success| caller
  dependency -->|failures| breaker
  breaker -->|open: fail fast| fallback[Fallback]
  breaker -. probe .-> dependency
```

## Bulkhead isolation
```mermaid
flowchart TB
  ingress[Ingress]
  subgraph poolA[Resource pool A]
    a1[Worker A1]
    a2[Worker A2]
  end
  subgraph poolB[Resource pool B]
    b1[Worker B1]
    b2[Worker B2]
  end
  ingress --> poolA
  ingress --> poolB
```

## Retry with dead letter
```mermaid
flowchart LR
  queue[(Queue)] --> worker[Worker]
  worker -->|success| done[Done]
  worker -->|retryable failure| retry[(Retry queue)]
  retry --> worker
  worker -->|exhausted| dlq[(Dead-letter queue)]
```

## Fan-out / fan-in
```mermaid
flowchart LR
  request[Request] --> split[Dispatcher]
  split --> a[Worker A]
  split --> b[Worker B]
  split --> c[Worker C]
  a --> merge[Aggregator]
  b --> merge
  c --> merge
  merge --> response[Response]
```

## Lambda data path
```mermaid
flowchart LR
  source[Events]
  subgraph batch[Batch path]
    history[(Historical store)] --> batchJob[Batch compute]
  end
  subgraph speed[Speed path]
    stream[Stream processing]
  end
  source --> history
  source --> stream
  batchJob --> serving[(Serving layer)]
  stream --> serving
```

## Kappa data path
```mermaid
flowchart LR
  events[(Durable event log)] --> processor[Stream processor] --> serving[(Serving state)]
  events -. replay .-> processor
```

## Eventual consistency projection
```mermaid
flowchart LR
  command[Write request] --> primary[(Primary state)]
  primary --> events[(Change events)]
  events --> projector[Projector]
  projector --> read[(Read model)]
  query[Query] --> read
```
