# Timeline

## Use when

Dated events or named periods.

## Avoid when

Durations or resource dependencies.

## Preferred semantic intents

Planning.

## GitHub compatibility

Core conservative candidate; use this basic syntax and verify the actual GitHub preview when possible. No version guarantee.

## Design rules

Use short event text and keep chronological ordering explicit.

## Complexity budget

Recommend at most 12 events; split near 18.

## Minimal syntax

```mermaid
timeline
    title Rollout milestones
    September : Pilot
    October : General availability
```

## Common failure modes

Use short event text and keep chronological ordering explicit. Do not assume that passing the local parser proves target support.

## Fallbacks

Use a table or prose if the renderer cannot support the required semantics; do not silently change relationship meaning..

## Examples

The minimal example is an illustrative fixture, not inferred user data. Change its
facts to match the request. See [the upstream reference](https://mermaid.js.org/syntax/timeline.html) for version-specific syntax.
