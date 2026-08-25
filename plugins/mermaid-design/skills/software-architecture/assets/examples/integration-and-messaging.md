# Enterprise Integration and Messaging Architecture Examples

## 1. Event-driven backbone
```mermaid
flowchart LR
  producers[Domain producers] --> bus[Event backbone]
  subgraph consumers[Consumer domains]
    bus --> billing[Billing]
    bus --> analytics[Analytics]
    bus --> notifications[Notifications]
  end
```

## 2. Transactional outbox
```mermaid
flowchart LR
  api[Application] --> tx[Business transaction]
  subgraph database[Database boundary]
    tx --> data[(Business data)]
    tx --> outbox[(Outbox)]
  end
  outbox --> relay[Outbox relay] --> broker[Event broker]
```

## 3. Saga orchestration
```mermaid
flowchart TB
  order[Order service] --> saga[Saga coordinator]
  subgraph participants[Saga participants]
    saga --> payment[Payment]
    saga --> inventory[Inventory]
    saga --> shipping[Shipping]
  end
  participants --> events[Outcome events]
```

## 4. Saga choreography
```mermaid
flowchart LR
  order[Order] --> e1[OrderCreated]
  e1 --> payment[Payment]
  payment --> e2[PaymentCaptured]
  e2 --> inventory[Inventory]
  inventory --> e3[InventoryReserved]
  e3 --> shipping[Shipping]
```

## 5. Dead-letter handling
```mermaid
flowchart LR
  producer[Producer] --> queue[Queue]
  queue --> worker[Consumer]
  worker -->|failure| retry[Retry queue]
  retry --> worker
  retry -->|exhausted| dlq[Dead-letter queue]
  dlq --> ops[Operations review]
```

## 6. API facade over legacy systems
```mermaid
flowchart LR
  clients[Modern clients] --> api[Canonical API]
  subgraph integration[Anti-corruption layer]
    api --> adapterA[Legacy adapter A]
    api --> adapterB[Legacy adapter B]
  end
  adapterA --> erp[ERP]
  adapterB --> mainframe[Mainframe]
```

## 7. B2B managed file transfer
```mermaid
flowchart LR
  partner[Partner] --> gateway[MFT gateway]
  subgraph processing[B2B processing]
    gateway --> scan[Malware scan]
    scan --> validate[Schema validation]
    validate --> transform[Canonical transform]
  end
  transform --> internal[Internal system]
```

## 8. Webhook platform
```mermaid
flowchart LR
  products[Product events] --> webhook[Webhook service]
  subgraph delivery[Delivery platform]
    webhook --> queue[Delivery queue]
    queue --> signer[Request signer]
    signer --> endpoints[Customer endpoints]
  end
  endpoints --> status[Delivery status]
```

## 9. Schema registry
```mermaid
flowchart TB
  producers[Producers] --> registry[Schema registry]
  consumers[Consumers] --> registry
  subgraph event[Event platform]
    producers --> broker[Broker]
    broker --> consumers
  end
  registry --> compatibility[Compatibility policy]
```

## 10. CDC integration backbone
```mermaid
flowchart LR
  db[(Source DB)] --> cdc[CDC connector]
  cdc --> broker[Event broker]
  subgraph consumers[Downstream consumers]
    broker --> search[Search index]
    broker --> cache[Cache]
    broker --> warehouse[Warehouse]
  end
```

## 11. Command and query separation
```mermaid
flowchart TB
  client[Client] --> commands[Command API]
  client --> queries[Query API]
  subgraph cqrs[CQRS boundary]
    commands --> write[(Write model)]
    write --> events[Events]
    events --> projection[Projection]
    projection --> read[(Read model)]
    queries --> read
  end
```

## 12. Enterprise service bus migration
```mermaid
flowchart LR
  legacy[Legacy services] --> esb[Existing ESB]
  esb --> bridge[Migration bridge]
  subgraph target[Target integration platform]
    bridge --> events[Event broker]
    bridge --> api[API gateway]
  end
  target --> modern[Modern services]
```

## 13. Idempotent consumer
```mermaid
flowchart LR
  broker[Broker] --> consumer[Consumer]
  subgraph guard[Idempotency boundary]
    consumer --> dedupe[(Processed IDs)]
    dedupe --> apply[Apply business change]
  end
  apply --> system[(Target state)]
```

## 14. Request-reply over messaging
```mermaid
flowchart LR
  requester[Requester] --> requestQ[Request queue]
  requestQ --> worker[Worker]
  worker --> replyQ[Reply queue]
  replyQ --> requester
  correlation[Correlation ID] --> requestQ
  correlation --> replyQ
```

## 15. Fan-out event processing
```mermaid
flowchart LR
  event[Domain event] --> topic[Topic]
  subgraph fanout[Independent subscriptions]
    topic --> audit[Audit consumer]
    topic --> search[Index consumer]
    topic --> notify[Notification consumer]
  end
```

## 16. Integration rate limiting
```mermaid
flowchart LR
  callers[Callers] --> gateway[Integration gateway]
  subgraph protection[Protection controls]
    gateway --> rate[Rate limiter]
    rate --> circuit[Circuit breaker]
  end
  circuit --> partner[Partner API]
```

## 17. Canonical data model
```mermaid
flowchart TB
  crm[CRM] --> mapA[CRM mapper]
  erp[ERP] --> mapB[ERP mapper]
  subgraph canonical[Canonical integration model]
    mapA --> model[Canonical object]
    mapB --> model
    model --> routing[Routing]
  end
  routing --> consumers[Downstream systems]
```

## 18. Secure partner API exchange
```mermaid
flowchart LR
  partner[Partner] --> mtls[mTLS gateway]
  subgraph partnerZone[Partner access zone]
    mtls --> auth[OAuth validation]
    auth --> api[Partner API]
  end
  api --> internal[Internal services]
  api --> audit[Partner audit]
```

## 19. Integration observability
```mermaid
flowchart LR
  gateway[API gateway] --> traces[Distributed traces]
  broker[Event broker] --> metrics[Broker metrics]
  workers[Consumers] --> logs[Consumer logs]
  subgraph observability[Integration observability]
    traces --> dashboard[Dashboard]
    metrics --> dashboard
    logs --> dashboard
  end
```

## 20. Event replay architecture
```mermaid
flowchart LR
  archive[(Immutable event archive)] --> replay[Replay controller]
  subgraph isolated[Replay boundary]
    replay --> replayTopic[Replay topic]
    replayTopic --> consumer[Target consumer]
  end
  consumer --> rebuilt[(Rebuilt projection)]
```