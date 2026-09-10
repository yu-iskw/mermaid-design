# Request Authorize Execute

## Use when

Explain permission enforcement before a side effect.

## Semantic model

Request → authorization decision → execute or deny → audit.

## Visual grammar

Prefer flowchart; resolve renderer capability before reading syntax.

## Preserve / avoid

Denied requests must not reach execution. Show audit for both outcomes when required.

## Removal test

Remove any element that does not explain the primary relationship. Split a second independent question into a separate figure.
