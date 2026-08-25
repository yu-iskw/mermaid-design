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

## Enterprise examples first

This skill contains 180 practical enterprise Mermaid examples in `assets/examples/`, split into nine 20-example shards. Do **not** preload them.

1. Determine the behavioral question and preferred Mermaid lens.
2. Read only `assets/examples/INDEX.md`.
3. Select exactly one enterprise example shard.
4. Scan headings and adapt the closest example while preserving causal semantics.
5. Load a second shard only when the workflow genuinely crosses a second operational domain.

Examples cover identity/access, change/release, incident operations, approvals/governance, asynchronous messaging, data workflows, business processes, resilience/recovery, and agent-human workflows.

## Generic pattern fallback

If no enterprise example is close enough, load one shared code shard only:
- interactions, auth, retries, async jobs, sagas -> `../mermaid-design/assets/patterns/sequences.md`;
- lifecycle, approvals, incident state, ownership lanes -> `../mermaid-design/assets/patterns/states-and-processes.md`;
- Gantt, timeline, journey, git history -> `../mermaid-design/assets/patterns/planning-and-analysis.md`.

Read `references/behavior-patterns.md` only if the selected code examples do not contain an adequate composition.

## Behavioral correctness rules

1. Preserve causal order. A visually cleaner diagram must not reorder behavior.
2. Distinguish synchronous calls, asynchronous messages, and human actions using labels and structure, not color alone.
3. Model error, retry, timeout, compensation, cancellation, or alternate flows when they materially affect understanding.
4. Keep happy path dominant; put exceptional branches in `alt`/decision/state branches rather than mixing them into the main line.
5. Make ownership, acknowledgement, approval, timeout, and evidence points explicit for enterprise workflows.
6. Use `subgraph` for ownership lanes, trust/control boundaries, or organizational handoffs when a flowchart is clearer than a sequence diagram.
7. Avoid a sequence diagram with more than roughly 8–10 actors; split by scenario or boundary.
8. Prefer separate diagrams for normal flow, failure/recovery, and approval/escalation when combining them would obscure causality.

## GitHub requirement

Apply the core `mermaid-design` GitHub compatibility rules. When a specialized diagram family is version-sensitive, preserve semantics using stable flowchart/sequence/state syntax.
