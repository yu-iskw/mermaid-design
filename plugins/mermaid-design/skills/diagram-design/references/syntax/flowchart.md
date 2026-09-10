# Flowchart

## Use when

Branches, dependencies and conservative system views.

## Avoid when

Ordered messages or quantitative widths.

## Preferred semantic intents

Process.

## GitHub compatibility

Core conservative candidate; use this basic syntax and verify the actual GitHub preview when possible. No version guarantee.

## Design rules

Give every decision branch a condition; subgraphs encode real boundaries.

## Complexity budget

Recommend at most 12 nodes; split near 18.

## Minimal syntax

```mermaid
flowchart TD
    request["Request"] --> decision{"Authorized?"}
    decision -->|Yes| execute["Execute"]
    decision -->|No| deny["Deny"]
    execute --> audit["Audit"]
    deny --> audit
```

## Common failure modes

Give every decision branch a condition; subgraphs encode real boundaries. Do not assume that passing the local parser proves target support.

## Fallbacks

Use a table or prose if the renderer cannot support the required semantics; do not silently change relationship meaning..

## Examples

The minimal example is an illustrative fixture, not inferred user data. Change its
facts to match the request. See [the upstream reference](https://mermaid.js.org/syntax/flowchart.html) for version-specific syntax.
