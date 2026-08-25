# Sequence Patterns

## Synchronous request / response
```mermaid
sequenceDiagram
  participant C as Client
  participant A as API
  participant S as Service
  participant D as Database
  C->>A: request
  A->>S: invoke
  S->>D: query
  D-->>S: data
  S-->>A: result
  A-->>C: response
```

## OAuth authorization code
```mermaid
sequenceDiagram
  participant U as User
  participant B as Browser
  participant A as App
  participant I as IdP
  U->>B: sign in
  B->>I: authorize
  I-->>B: authorization code
  B->>A: callback(code)
  A->>I: exchange code
  I-->>A: tokens
  A-->>B: session
```

## Token refresh
```mermaid
sequenceDiagram
  participant C as Client
  participant A as API
  participant I as IdP
  C->>A: request with expired token
  A-->>C: 401
  C->>I: refresh token
  I-->>C: new access token
  C->>A: retry
  A-->>C: success
```

## Webhook delivery
```mermaid
sequenceDiagram
  participant P as Producer
  participant R as Receiver
  participant Q as Queue
  participant W as Worker
  P->>R: webhook event
  R->>Q: enqueue
  R-->>P: 2xx acknowledgement
  Q->>W: deliver
  W->>W: process
```

## Idempotent consumer
```mermaid
sequenceDiagram
  participant Q as Queue
  participant C as Consumer
  participant D as Dedup store
  participant S as State
  Q->>C: message(id)
  C->>D: seen(id)?
  alt new
    D-->>C: no
    C->>S: apply change
    C->>D: record id
  else duplicate
    D-->>C: yes
    C-->>Q: acknowledge
  end
```

## Transactional outbox
```mermaid
sequenceDiagram
  participant A as API
  participant D as Database
  participant R as Relay
  participant B as Broker
  participant C as Consumer
  A->>D: transaction(domain + outbox)
  D-->>A: commit
  R->>D: read pending outbox
  D-->>R: events
  R->>B: publish
  B->>C: event
```

## Saga orchestration
```mermaid
sequenceDiagram
  participant O as Orchestrator
  participant I as Inventory
  participant P as Payment
  participant S as Shipping
  O->>I: reserve
  I-->>O: reserved
  O->>P: charge
  alt payment succeeds
    P-->>O: charged
    O->>S: ship
  else payment fails
    P-->>O: failed
    O->>I: release reservation
  end
```

## Retry / backoff
```mermaid
sequenceDiagram
  participant C as Caller
  participant D as Dependency
  C->>D: attempt 1
  D-->>C: transient failure
  Note over C: backoff
  C->>D: attempt 2
  D-->>C: transient failure
  Note over C: longer backoff
  C->>D: attempt 3
  D-->>C: success
```

## Circuit breaker
```mermaid
sequenceDiagram
  participant C as Caller
  participant B as Breaker
  participant D as Dependency
  C->>B: request
  B->>D: forward
  D-->>B: repeated failures
  Note over B: open circuit
  C->>B: next request
  B-->>C: fail fast
  Note over B: after timeout, half-open
  B->>D: probe
  D-->>B: success
```

## Cache hit / miss
```mermaid
sequenceDiagram
  participant A as App
  participant C as Cache
  participant D as Database
  A->>C: get(key)
  alt hit
    C-->>A: value
  else miss
    C-->>A: not found
    A->>D: query
    D-->>A: value
    A->>C: set(key, value)
  end
```

## Async job submission
```mermaid
sequenceDiagram
  participant C as Client
  participant A as API
  participant Q as Queue
  participant W as Worker
  C->>A: submit job
  A->>Q: enqueue
  A-->>C: 202 + job id
  Q->>W: job
  W->>W: execute
  C->>A: poll status
  A-->>C: completed
```

## Long-running operation
```mermaid
sequenceDiagram
  participant C as Client
  participant A as API
  participant W as Worker
  C->>A: start operation
  A->>W: dispatch
  A-->>C: operation id
  loop until terminal
    C->>A: get operation
    A-->>C: status
  end
```

## RAG query
```mermaid
sequenceDiagram
  participant U as User
  participant O as Orchestrator
  participant R as Retriever
  participant M as Model
  U->>O: question
  O->>R: retrieve evidence
  R-->>O: ranked context
  O->>M: prompt + context
  M-->>O: grounded answer
  O-->>U: answer + citations
```

## Human approval
```mermaid
sequenceDiagram
  participant A as Agent
  participant H as Human
  participant T as Tool
  A-->>H: proposed side effect
  H->>A: approve
  A->>T: execute
  T-->>A: result
  A-->>H: completion
```

## Eventual consistency
```mermaid
sequenceDiagram
  participant C as Client
  participant W as Write API
  participant E as Event stream
  participant P as Projector
  participant R as Read API
  C->>W: update
  W-->>C: accepted
  W->>E: event
  E->>P: deliver
  P->>R: update read model
  C->>R: later query
  R-->>C: projected state
```
