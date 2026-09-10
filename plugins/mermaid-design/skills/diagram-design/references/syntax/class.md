# Class

## Use when

Types, inheritance and interfaces.

## Avoid when

Database relationships alone.

## Preferred semantic intents

Data model.

## GitHub compatibility

Core conservative candidate; use this basic syntax and verify the actual GitHub preview when possible. No version guarantee.

## Design rules

Distinguish inheritance from composition and dependency.

## Complexity budget

Recommend at most 8 classes; split near 12.

## Minimal syntax

```mermaid
classDiagram
    class Reader {
        +read()
    }
    class FileReader
    Reader <|-- FileReader
```

## Common failure modes

Distinguish inheritance from composition and dependency. Do not assume that passing the local parser proves target support.

## Fallbacks

Use a table or prose if the renderer cannot support the required semantics; do not silently change relationship meaning..

## Examples

The minimal example is an illustrative fixture, not inferred user data. Change its
facts to match the request. See [the upstream reference](https://mermaid.js.org/syntax/classDiagram.html) for version-specific syntax.
