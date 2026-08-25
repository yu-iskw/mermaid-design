# Enterprise Async and Messaging Behavior Examples

## 1. Reliable webhook delivery
```mermaid
sequenceDiagram
  participant P as Producer
  participant Q as Delivery Queue
  participant W as Webhook Worker
  participant C as Customer Endpoint
  P->>Q: Enqueue event
  Q->>W: Deliver job
  W->>C: Signed webhook
  C-->>W: 2xx acknowledgement
  W-->>Q: Mark complete
```

## 2. Webhook retry and DLQ
```mermaid
flowchart LR
  event[Webhook event] --> attempt[Delivery attempt]
  attempt -->|2xx| done[Complete]
  attempt -->|timeout/5xx| retry[Backoff retry]
  retry --> attempt
  retry -->|max attempts| dlq[Dead-letter queue]
  dlq --> support[Support review]
```

## 3. Async job submission
```mermaid
sequenceDiagram
  participant C as Client
  participant API
  participant Q as Queue
  participant W as Worker
  C->>API: Submit job
  API->>Q: Enqueue
  API-->>C: 202 + job ID
  Q->>W: Execute
  W-->>API: Store result
  C->>API: Poll status
  API-->>C: Completed
```

## 4. Idempotent message consumer
```mermaid
sequenceDiagram
  participant B as Broker
  participant C as Consumer
  participant D as Dedupe Store
  participant S as System
  B->>C: Message + idempotency key
  C->>D: Has key been processed?
  alt new key
    D-->>C: No
    C->>S: Apply change
    C->>D: Record key
  else duplicate
    D-->>C: Yes
  end
  C-->>B: Ack
```

## 5. Transactional outbox behavior
```mermaid
sequenceDiagram
  participant A as Application
  participant DB as Database
  participant R as Relay
  participant B as Broker
  A->>DB: Transaction: data + outbox
  DB-->>A: Commit
  R->>DB: Read unpublished outbox
  R->>B: Publish event
  B-->>R: Ack
  R->>DB: Mark published
```

## 6. Saga orchestration success
```mermaid
sequenceDiagram
  participant O as Orchestrator
  participant P as Payment
  participant I as Inventory
  participant S as Shipping
  O->>P: Capture payment
  P-->>O: Success
  O->>I: Reserve inventory
  I-->>O: Success
  O->>S: Create shipment
  S-->>O: Success
```

## 7. Saga compensation
```mermaid
sequenceDiagram
  participant O as Orchestrator
  participant P as Payment
  participant I as Inventory
  participant S as Shipping
  O->>P: Capture payment
  P-->>O: Success
  O->>I: Reserve inventory
  I-->>O: Success
  O->>S: Create shipment
  S-->>O: Failure
  O->>I: Release inventory
  O->>P: Refund payment
```

## 8. At-least-once delivery
```mermaid
flowchart LR
  producer[Producer] --> broker[Broker]
  broker --> consumer[Consumer]
  consumer --> state[(Target state)]
  consumer -->|ack after commit| broker
  broker -. redelivery on missing ack .-> consumer
```

## 9. Queue backlog recovery
```mermaid
flowchart LR
  backlog[Backlog detected] --> scale[Scale consumers]
  scale --> observe[Observe drain rate]
  observe -->|insufficient| throttle[Throttle producers]
  throttle --> drain[Drain queue]
  drain --> normal[Restore normal capacity]
```

## 10. Request-reply correlation
```mermaid
sequenceDiagram
  participant A as Service A
  participant RQ as Request Queue
  participant B as Service B
  participant RP as Reply Queue
  A->>RQ: Request + correlation ID
  RQ->>B: Deliver request
  B->>RP: Response + correlation ID
  RP->>A: Correlated response
```

## 11. Event replay
```mermaid
flowchart LR
  archive[(Event archive)] --> select[Select replay range]
  select --> replay[Replay controller]
  replay --> isolated[Isolated replay topic]
  isolated --> consumer[Target consumer]
  consumer --> verify[Verify rebuilt state]
```

## 12. Delayed message scheduling
```mermaid
flowchart LR
  producer[Producer] --> scheduler[Message scheduler]
  scheduler --> wait[Delay until due]
  wait --> queue[Ready queue]
  queue --> worker[Worker]
  worker --> result[Business action]
```

## 13. Poison message handling
```mermaid
flowchart LR
  queue[Queue] --> worker[Consumer]
  worker -->|parse/business failure| counter[Increment failure count]
  counter -->|below threshold| queue
  counter -->|threshold reached| quarantine[Quarantine]
  quarantine --> operator[Operator analysis]
```

## 14. Fan-out processing
```mermaid
sequenceDiagram
  participant P as Publisher
  participant B as Topic
  participant A as Audit
  participant N as Notifications
  participant D as Data Platform
  P->>B: Publish event
  par independent subscribers
    B->>A: Event
    B->>N: Event
    B->>D: Event
  end
```

## 15. Ordered partition processing
```mermaid
flowchart LR
  events[Events] --> key[Partition by business key]
  key --> p1[Partition 1]
  key --> p2[Partition 2]
  p1 --> c1[Ordered consumer 1]
  p2 --> c2[Ordered consumer 2]
```

## 16. Consumer pause during downstream outage
```mermaid
flowchart LR
  broker[Broker] --> consumer[Consumer]
  consumer --> downstream[Downstream]
  downstream -->|unhealthy| pause[Pause consumption]
  pause --> health[Poll downstream health]
  health -->|recovered| resume[Resume consumption]
  resume --> consumer
```

## 17. Long-running operation callback
```mermaid
sequenceDiagram
  participant C as Client
  participant A as API
  participant W as Worker
  participant H as Callback Endpoint
  C->>A: Submit operation + callback URL
  A-->>C: 202 operation ID
  A->>W: Execute asynchronously
  W-->>A: Complete
  A->>H: Signed completion callback
```

## 18. Event schema evolution
```mermaid
flowchart LR
  producer[Producer change] --> schema[Register schema v2]
  schema --> compat[Compatibility check]
  compat --> consumers[Validate consumers]
  consumers --> rollout[Roll out producer]
  rollout --> monitor[Monitor decoding errors]
```

## 19. Async cancellation
```mermaid
sequenceDiagram
  participant C as Client
  participant A as API
  participant Q as Queue
  participant W as Worker
  C->>A: Submit job
  A->>Q: Enqueue
  C->>A: Cancel job
  A->>Q: Mark cancelled
  Q->>W: Deliver job
  W->>A: Check cancellation
  A-->>W: Cancelled; do not execute
```

## 20. Message-processing state machine
```mermaid
stateDiagram-v2
  [*] --> Queued
  Queued --> Processing
  Processing --> Completed: success
  Processing --> Retrying: transient failure
  Retrying --> Processing
  Retrying --> DeadLettered: retries exhausted
  Completed --> [*]
  DeadLettered --> [*]
```