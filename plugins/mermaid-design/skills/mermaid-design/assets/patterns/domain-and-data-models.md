# Domain & Data Model Patterns

## Aggregate root
```mermaid
classDiagram
  class Order {
    +OrderId id
    +OrderStatus status
    +addItem()
  }
  class OrderItem {
    +Sku sku
    +int quantity
  }
  class Money {
    +decimal amount
    +string currency
  }
  Order *-- OrderItem
  OrderItem *-- Money
```

## Strategy family
```mermaid
classDiagram
  class PricingStrategy {
    <<interface>>
    +price(cart)
  }
  class StandardPricing
  class PromotionalPricing
  class CustomerTierPricing
  PricingStrategy <|.. StandardPricing
  PricingStrategy <|.. PromotionalPricing
  PricingStrategy <|.. CustomerTierPricing
```

## Adapter family
```mermaid
classDiagram
  class PaymentPort {
    <<interface>>
    +charge()
  }
  class StripeAdapter
  class BankAdapter
  class FakeAdapter
  PaymentPort <|.. StripeAdapter
  PaymentPort <|.. BankAdapter
  PaymentPort <|.. FakeAdapter
```

## Repository pattern
```mermaid
classDiagram
  class OrderService
  class OrderRepository {
    <<interface>>
    +findById()
    +save()
  }
  class SqlOrderRepository
  OrderService --> OrderRepository
  OrderRepository <|.. SqlOrderRepository
```

## Decorator chain
```mermaid
classDiagram
  class Handler {
    <<interface>>
    +handle()
  }
  class CoreHandler
  class LoggingDecorator
  class RetryDecorator
  Handler <|.. CoreHandler
  Handler <|.. LoggingDecorator
  Handler <|.. RetryDecorator
  LoggingDecorator --> Handler
  RetryDecorator --> Handler
```

## Command handler model
```mermaid
classDiagram
  class CreateOrderCommand
  class CreateOrderHandler
  class Order
  class OrderCreated
  CreateOrderCommand --> CreateOrderHandler
  CreateOrderHandler --> Order
  Order --> OrderCreated
```

## Plugin interface model
```mermaid
classDiagram
  class Plugin {
    <<interface>>
    +name()
    +execute()
  }
  class CoreRuntime
  class AnalyticsPlugin
  class StoragePlugin
  CoreRuntime --> Plugin
  Plugin <|.. AnalyticsPlugin
  Plugin <|.. StoragePlugin
```

## API DTO boundary
```mermaid
classDiagram
  class CreateUserRequest
  class UserMapper
  class User
  class UserResponse
  CreateUserRequest --> UserMapper
  UserMapper --> User
  User --> UserMapper
  UserMapper --> UserResponse
```

## Star schema
```mermaid
erDiagram
  FACT_SALES }o--|| DIM_DATE : date
  FACT_SALES }o--|| DIM_CUSTOMER : customer
  FACT_SALES }o--|| DIM_PRODUCT : product
  FACT_SALES }o--|| DIM_STORE : store
```

## Snowflake schema
```mermaid
erDiagram
  FACT_SALES }o--|| DIM_PRODUCT : product
  DIM_PRODUCT }o--|| DIM_CATEGORY : category
  DIM_CATEGORY }o--|| DIM_DEPARTMENT : department
  FACT_SALES }o--|| DIM_DATE : date
```

## Event store
```mermaid
erDiagram
  STREAM ||--o{ EVENT : contains
  STREAM ||--o| SNAPSHOT : latest
  AGGREGATE ||--|| STREAM : owns
  STREAM {
    string stream_id PK
    string aggregate_type
  }
  EVENT {
    string event_id PK
    int version
    string event_type
  }
```

## Multi-tenant SaaS
```mermaid
erDiagram
  TENANT ||--o{ MEMBERSHIP : has
  USER ||--o{ MEMBERSHIP : joins
  TENANT ||--o{ PROJECT : owns
  PROJECT ||--o{ RESOURCE : contains
  USER {
    string user_id PK
  }
  TENANT {
    string tenant_id PK
  }
```

## RBAC model
```mermaid
erDiagram
  USER ||--o{ USER_ROLE : assigned
  ROLE ||--o{ USER_ROLE : receives
  ROLE ||--o{ ROLE_PERMISSION : grants
  PERMISSION ||--o{ ROLE_PERMISSION : included
```

## Catalog / lineage model
```mermaid
erDiagram
  ASSET ||--o{ ASSET_VERSION : versions
  ASSET ||--o{ OWNERSHIP : owned_by
  OWNER ||--o{ OWNERSHIP : owns
  ASSET_VERSION ||--o{ LINEAGE_EDGE : upstream
  ASSET_VERSION ||--o{ LINEAGE_EDGE : downstream
  ASSET ||--o{ CLASSIFICATION : classified
```

## Observability model
```mermaid
erDiagram
  SERVICE ||--o{ DEPLOYMENT : deploys
  SERVICE ||--o{ TRACE : emits
  TRACE ||--o{ SPAN : contains
  SPAN ||--o{ LOG_RECORD : correlates
  SERVICE ||--o{ METRIC_SERIES : emits
```
