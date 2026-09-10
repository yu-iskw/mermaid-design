# Er

## Use when

Entities with known cardinalities.

## Avoid when

Runtime service dependencies.

## Preferred semantic intents

Data model.

## GitHub compatibility

Core conservative candidate; use this basic syntax and verify the actual GitHub preview when possible. No version guarantee.

## Design rules

Show only keys and attributes needed to understand relationships.

## Complexity budget

Recommend at most 8 entities; split near 12.

## Minimal syntax

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        int id PK
    }
    ORDER {
        int id PK
        int customer_id FK
    }
```

## Common failure modes

Show only keys and attributes needed to understand relationships. Do not assume that passing the local parser proves target support.

## Fallbacks

Use a table or prose if the renderer cannot support the required semantics; do not silently change relationship meaning..

## Examples

The minimal example is an illustrative fixture, not inferred user data. Change its
facts to match the request. See [the upstream reference](https://mermaid.js.org/syntax/entityRelationshipDiagram.html) for version-specific syntax.
