# Example fixtures

Small GitHub-safe Mermaid fixtures for docs and smoke checks. These are not a pattern library—prefer `references/patterns/` and `references/syntax/` at runtime.

## Flowchart — request authorize execute

```mermaid
flowchart TD
  req[Request] --> auth{Authorized?}
  auth -->|yes| exec[Execute]
  auth -->|no| deny[Deny]
  exec --> audit[Audit]
```

## Sequence — human agent tool

```mermaid
sequenceDiagram
  actor Human
  participant Agent
  participant Tool
  Human->>Agent: goal
  Agent->>Tool: call
  Tool-->>Agent: result
  Agent-->>Human: answer
```

## State — simple lifecycle

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Review
  Review --> Published
  Review --> Draft
  Published --> [*]
```

## ER — minimal entities

```mermaid
erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ LINE_ITEM : contains
  PRODUCT ||--o{ LINE_ITEM : "appears in"
```
