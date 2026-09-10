# Quadrant

## Use when

Position on two meaningful axes.

## Avoid when

Unmeasured or arbitrary rankings.

## Preferred semantic intents

Strategy.

## GitHub compatibility

Core conservative candidate; use this basic syntax and verify the actual GitHub preview when possible. No version guarantee.

## Design rules

Name both axis endpoints; use only supplied or explicitly qualitative positions.

## Complexity budget

Recommend at most 12 items; split near 20.

## Minimal syntax

```mermaid
quadrantChart
    title Portfolio
    x-axis Low effort --> High effort
    y-axis Low impact --> High impact
    Upgrade: [0.3, 0.8]
    Migration: [0.8, 0.7]
```

## Common failure modes

Name both axis endpoints; use only supplied or explicitly qualitative positions. Do not assume that passing the local parser proves target support.

## Fallbacks

Use a table or prose if the renderer cannot support the required semantics; do not silently change relationship meaning..

## Examples

The minimal example is an illustrative fixture, not inferred user data. Change its
facts to match the request. See [the upstream reference](https://mermaid.js.org/syntax/quadrantChart.html) for version-specific syntax.
