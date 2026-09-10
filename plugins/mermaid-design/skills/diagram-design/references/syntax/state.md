# State

## Use when

Legal states and transitions of one entity.

## Avoid when

A checklist of unrelated tasks.

## Preferred semantic intents

Lifecycle.

## GitHub compatibility

Core conservative candidate; use this basic syntax and verify the actual GitHub preview when possible. No version guarantee.

## Design rules

Use event names on transitions and distinguish initial and terminal states.

## Complexity budget

Recommend at most 10 states; split near 15.

## Minimal syntax

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Approved: approve
    Pending --> Rejected: reject
    Approved --> [*]
    Rejected --> [*]
```

## Common failure modes

Use event names on transitions and distinguish initial and terminal states. Do not assume that passing the local parser proves target support.

## Fallbacks

Use a table or prose if the renderer cannot support the required semantics; do not silently change relationship meaning..

## Examples

The minimal example is an illustrative fixture, not inferred user data. Change its
facts to match the request. See [the upstream reference](https://mermaid.js.org/syntax/stateDiagram.html) for version-specific syntax.
