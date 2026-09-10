# User-Journey

## Use when

Tasks with supplied experience scores and actors.

## Avoid when

Technical message protocols.

## Preferred semantic intents

Experience.

## GitHub compatibility

Core conservative candidate; use this basic syntax and verify the actual GitHub preview when possible. No version guarantee.

## Design rules

Keep actor names consistent and do not fabricate sentiment scores.

## Complexity budget

Recommend at most 12 tasks; split near 18.

## Minimal syntax

```mermaid
journey
    title Support experience
    section Resolve
      Submit ticket: 3: Customer
      Investigate: 4: Support
      Confirm fix: 5: Customer
```

## Common failure modes

Keep actor names consistent and do not fabricate sentiment scores. Do not assume that passing the local parser proves target support.

## Fallbacks

Use a table or prose if the renderer cannot support the required semantics; do not silently change relationship meaning..

## Examples

The minimal example is an illustrative fixture, not inferred user data. Change its
facts to match the request. See [the upstream reference](https://mermaid.js.org/syntax/userJourney.html) for version-specific syntax.
