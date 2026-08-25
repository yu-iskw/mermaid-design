# Architecture Pattern Examples

Use these as composition references. Adapt semantics and labels; do not mechanically copy every node. Prefer boundaries that communicate ownership, trust, runtime, or deployment meaning.

## 1. Layered platform with explicit boundaries

```mermaid
flowchart TB
  subgraph Experience[Experience Layer]
    Web[Web App]
    Mobile[Mobile App]
  end

  subgraph Edge[Edge / API Layer]
    Gateway[API Gateway]
  end

  subgraph Domain[Domain Services]
    Orders[Orders Service]
    Billing[Billing Service]
  end

  subgraph Data[Data Layer]
    OrdersDB[(Orders DB)]
    Ledger[(Ledger)]
  end

  Web --> Gateway
  Mobile --> Gateway
  Gateway --> Orders
  Gateway --> Billing
  Orders --> OrdersDB
  Billing --> Ledger
```

Use `subgraph` when layers represent real ownership or deployment boundaries, not merely visual decoration.

## 2. Control plane / data plane

```mermaid
flowchart LR
  Admin[Platform Admin]

  subgraph Control[Control Plane]
    API[Management API]
    Reconciler[Reconciler]
    Policy[Policy Engine]
  end

  subgraph Runtime[Data Plane]
    Ingress[Ingress]
    WorkloadA[Workload A]
    WorkloadB[Workload B]
  end

  Admin --> API
  API --> Reconciler
  API --> Policy
  Reconciler -. desired state .-> WorkloadA
  Reconciler -. desired state .-> WorkloadB
  Ingress --> WorkloadA
  Ingress --> WorkloadB
```

Keep management/control edges visually distinct from runtime traffic where the syntax remains readable.

## 3. Trust-zone boundaries

```mermaid
flowchart LR
  User[Internet User]

  subgraph Public[Public Zone]
    CDN[CDN / WAF]
    LB[Load Balancer]
  end

  subgraph Private[Private Application Zone]
    API[API Service]
    Worker[Worker]
  end

  subgraph Restricted[Restricted Data Zone]
    DB[(Primary DB)]
    Secrets[Secrets Manager]
  end

  User --> CDN --> LB --> API
  API --> DB
  API --> Worker
  Worker --> DB
  API -. workload identity .-> Secrets
  Worker -. workload identity .-> Secrets
```

Every edge crossing a trust boundary should represent an intentional interface.

## 4. Multi-region active/active

```mermaid
flowchart TB
  User[Users] --> DNS[Global DNS / Load Balancer]

  subgraph RegionA[Region A]
    AIngress[Ingress]
    AApp[Application]
    ADB[(Regional DB)]
    AIngress --> AApp --> ADB
  end

  subgraph RegionB[Region B]
    BIngress[Ingress]
    BApp[Application]
    BDB[(Regional DB)]
    BIngress --> BApp --> BDB
  end

  DNS --> AIngress
  DNS --> BIngress
  ADB <-. replication .-> BDB
```

Make regional stacks structurally symmetric unless asymmetry is itself the message.

## 5. Shared-services backbone

```mermaid
flowchart TB
  subgraph Products[Product Workloads]
    ProductA[Product A]
    ProductB[Product B]
    ProductC[Product C]
  end

  subgraph Platform[Shared Platform Services]
    Identity[Identity]
    Observability[Observability]
    Secrets[Secrets]
    Messaging[Messaging]
  end

  ProductA --> Identity
  ProductB --> Identity
  ProductC --> Identity
  ProductA --> Messaging
  ProductB --> Messaging
  ProductC --> Messaging
  ProductA -. telemetry .-> Observability
  ProductB -. telemetry .-> Observability
  ProductC -. telemetry .-> Observability
  ProductA -. credentials .-> Secrets
  ProductB -. credentials .-> Secrets
```

Avoid repeating shared infrastructure inside each product boundary when the point is centralization.

## 6. Strangler migration

```mermaid
flowchart LR
  Client[Clients] --> Router[Routing Layer]

  subgraph Legacy[Legacy Boundary]
    Monolith[Legacy Monolith]
    LegacyDB[(Legacy DB)]
    Monolith --> LegacyDB
  end

  subgraph Modern[Modernized Boundary]
    ServiceA[New Service A]
    ServiceB[New Service B]
    NewDB[(New Store)]
    ServiceA --> NewDB
    ServiceB --> NewDB
  end

  Router -->|remaining routes| Monolith
  Router -->|migrated route A| ServiceA
  Router -->|migrated route B| ServiceB
```

Show migration direction with routing semantics rather than a generic arrow between old and new systems.

## 7. Event-driven backbone

```mermaid
flowchart LR
  subgraph Producers[Producers]
    Checkout[Checkout]
    Inventory[Inventory]
  end

  subgraph EventPlatform[Event Platform]
    OrdersTopic[[orders topic]]
    StockTopic[[stock topic]]
  end

  subgraph Consumers[Consumers]
    Billing[Billing]
    Fulfillment[Fulfillment]
    Analytics[Analytics]
  end

  Checkout --> OrdersTopic
  Inventory --> StockTopic
  OrdersTopic --> Billing
  OrdersTopic --> Fulfillment
  OrdersTopic --> Analytics
  StockTopic --> Fulfillment
  StockTopic --> Analytics
```

Name topics or event streams when they are part of the contract; do not hide them behind a single anonymous bus.

## 8. Kubernetes request path with cluster boundary

```mermaid
flowchart LR
  User[Client]

  subgraph Cluster[Kubernetes Cluster]
    Ingress[Ingress Controller]
    Service[Service]

    subgraph Namespace[Application Namespace]
      PodA[Pod A]
      PodB[Pod B]
    end

    Ingress --> Service
    Service --> PodA
    Service --> PodB
  end

  DB[(Managed Database)]

  User --> Ingress
  PodA --> DB
  PodB --> DB
```

Nest boundaries when runtime containment matters: cluster -> namespace -> workload.

## 9. Bounded-context map

```mermaid
flowchart LR
  subgraph Commerce[Commerce Context]
    Catalog[Catalog]
    Orders[Orders]
  end

  subgraph Payments[Payments Context]
    Billing[Billing]
    Ledger[Ledger]
  end

  subgraph Fulfillment[Fulfillment Context]
    Shipping[Shipping]
    Warehouse[Warehouse]
  end

  Catalog --> Orders
  Orders -->|payment request| Billing
  Billing --> Ledger
  Orders -->|fulfillment request| Shipping
  Shipping --> Warehouse
```

Use one subgraph per bounded context; keep cross-context relationships explicit and sparse.

## 10. RAG system with offline and online planes

```mermaid
flowchart TB
  subgraph Offline[Indexing Plane]
    Sources[Documents] --> Parse[Parse / Chunk]
    Parse --> Embed[Embedding Model]
    Embed --> Index[(Vector Index)]
  end

  subgraph Online[Serving Plane]
    User[User] --> App[Agent / Application]
    App --> QueryEmbed[Query Embedding]
    QueryEmbed --> Retrieve[Retriever]
    Retrieve --> Model[LLM]
    Model --> App
  end

  Index --> Retrieve
```

Separate offline preparation from online request handling; this usually communicates RAG architecture more clearly than one linear pipeline.

## 11. Agent supervisor with tool boundary

```mermaid
flowchart TB
  User[User] --> Supervisor[Supervisor Agent]

  subgraph Specialists[Specialist Agents]
    Researcher[Research Agent]
    Coder[Coding Agent]
    Reviewer[Review Agent]
  end

  subgraph Tools[External Tools]
    Search[Search]
    GitHub[GitHub]
    Runtime[Execution Sandbox]
  end

  Supervisor --> Researcher
  Supervisor --> Coder
  Supervisor --> Reviewer
  Researcher --> Search
  Coder --> GitHub
  Coder --> Runtime
  Reviewer --> GitHub
  Researcher --> Supervisor
  Coder --> Supervisor
  Reviewer --> Supervisor
```

Keep autonomous actors separate from non-agent tools so responsibility is visually obvious.

## 12. Cloud landing zone hierarchy

```mermaid
flowchart TB
  Org[Organization]

  subgraph Shared[Shared Services Folder]
    Network[Networking Project]
    Security[Security Project]
    Logging[Logging Project]
  end

  subgraph Prod[Production Folder]
    ProdA[Product A Project]
    ProdB[Product B Project]
  end

  subgraph NonProd[Non-Production Folder]
    Dev[Development Project]
    Test[Test Project]
  end

  Org --> Shared
  Org --> Prod
  Org --> NonProd
```

Use subgraphs for administrative boundaries and nodes for resources within them; do not turn every hierarchy level into an extra arrow-only chain.
