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

## Token-efficient loading

Load one code shard based on the chosen lens:
- interactions, auth, retries, async jobs, sagas -> `../mermaid-design/assets/patterns/sequences.md`;
- lifecycle, approvals, incident state, ownership lanes -> `../mermaid-design/assets/patterns/states-and-processes.md`;
- Gantt, timeline, journey, git history -> `../mermaid-design/assets/patterns/planning-and-analysis.md`.

Read `references/behavior-patterns.md` only when the code shard does not contain an adequate composition. Do not preload all three shards.

## Behavioral correctness rules

1. Preserve causal order. A visually cleaner diagram must not reorder behavior.
2. Distinguish synchronous calls, asynchronous messages, and human actions using labels and structure, not color alone.
3. Model error, retry, timeout, compensation, cancellation, or alternate flows only when they materially affect understanding.
4. Keep happy path dominant; put exceptional branches in `alt`/decision/state branches rather than mixing them into the main line.
5. For distributed systems, make ownership and acknowledgement points explicit.
6. Use `subgraph` for ownership lanes or system boundaries when a flowchart is clearer than a sequence diagram.
7. Avoid a sequence diagram with more than roughly 8–10 actors; split by scenario or boundary.

## GitHub requirement

Apply the core `mermaid-design` GitHub compatibility rules. When a specialized diagram family is version-sensitive, preserve semantics using stable flowchart/sequence/state syntax.
