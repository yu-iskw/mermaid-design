---
name: process-and-behavior
description: Create Mermaid sequence, flow, state, journey, timeline, Gantt, Git graph, swimlane-style, workflow, protocol, incident, and lifecycle diagrams that explain behavior over time or ownership boundaries.
---

# Process and Behavior Diagrams

Use this skill when the important question is **what happens, in what order, under which condition, and who is responsible**.

## Choose the behavioral lens

- actor interaction -> `sequenceDiagram`;
- branching workflow -> `flowchart`;
- lifecycle/protocol -> `stateDiagram-v2`;
- user experience -> `journey`;
- calendar plan -> `gantt`;
- historical milestones -> `timeline`;
- source-control evolution -> `gitGraph`;
- ownership lanes -> stable `flowchart` subgraphs unless native swimlane support is verified on the target GitHub Mermaid version.

Read `references/behavior-patterns.md` before drafting.

## Behavioral correctness rules

1. Preserve causal order. A visually cleaner diagram must not reorder behavior.
2. Distinguish synchronous calls, asynchronous messages, and human actions using labels and structure, not color alone.
3. Model error, retry, timeout, compensation, cancellation, or alternate flows only when they materially affect understanding.
4. Keep happy path dominant; put exceptional branches in `alt`/decision/state branches rather than mixing them into the main line.
5. For distributed systems, make ownership and acknowledgement points explicit.
6. Avoid a sequence diagram with more than roughly 8–10 actors; split by scenario or boundary.

## GitHub requirement

Apply the core `mermaid-design` GitHub compatibility rules. When a specialized diagram family is version-sensitive, preserve the semantics using stable flowchart/sequence/state syntax.

## Supporting material

- `references/behavior-patterns.md` — scenario and lifecycle recipes.
- Core pattern library: `../mermaid-design/assets/pattern-catalog.md`.
