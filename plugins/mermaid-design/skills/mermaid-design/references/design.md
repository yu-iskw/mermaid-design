# Design

Editorial rules for professional Mermaid under the `github` profile.

## Composition

- One dominant reading direction: left-to-right for pipelines and relationships; top-to-bottom for decomposition and lifecycle.
- Keep the principal path obvious. Secondary paths branch from it rather than compete with it.
- Subgraphs encode real semantics: trust zone, deployment boundary, organization, stage, subsystem, control/data plane. Decorative grouping is noise.
- Aim for 3–7 major groups. Prefer overview + detail over one crowded figure.
- Reduce edge crossings by reordering before adding styling.

## Labels

- Nodes: short noun phrases (about 1–4 words).
- Edges: short verbs, protocols, cardinalities, or outcomes—only when they add information.
- Match terminology from the surrounding doc/codebase.
- Put explanations in prose under the diagram, not inside nodes.

## Semantics

- One shape meaning per diagram. Do not overload a shape with unrelated concepts.
- Solid lines = primary relationship. Dashed/dotted only when the convention is explicit (async, optional, control).
- Emphasis sparsely: highlight at most a few elements.
- Never encode critical meaning by color alone.

## Anti-patterns

- Equal-weight “AI box soup”
- Meaningless subgraphs
- Sentence-length labels
- Redundant arrows and decorative icon overload
- One diagram trying to answer multiple independent questions
- Choosing a novel Mermaid family when a Tier A grammar already fits

## Density

If the figure exceeds the grammar budget in `SKILL.md`, or will not fit one GitHub-width screen, split it. Nested subgraphs deeper than about three levels usually need decomposition.

## Diagram set pattern

For architecture and RFCs, prefer a small set:

1. context/topology — what exists and where
2. sequence/process — how the important scenario behaves
3. state/data model — only when state or schema is central

## Taste gate

Before returning output:

1. Does this answer one primary question?
2. Is the selected grammar better than a generic flowchart?
3. Would a table or paragraph be better?
4. Can any node, edge, or label be removed?
5. Can nodes be merged?
6. Is the reading direction obvious?
7. Are groups semantically meaningful?
8. Is the diagram within its complexity budget?
9. Is the grammar compatible with the renderer profile?
10. Is the source concise and easy to review in Git diffs?

The skill may decide that no diagram is better than a poor diagram.
