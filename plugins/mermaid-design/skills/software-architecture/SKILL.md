---
name: software-architecture
description: Create software, cloud, platform, infrastructure, deployment, security, data-platform, agent, and distributed-system architecture diagrams in Mermaid for RFCs, ADRs, design docs, and GitHub.
---

# Software Architecture Diagrams

Use diagrams to answer architectural questions, not to inventory every component.

## Default diagram set

For a substantial design, consider three complementary views:
1. **Context/topology** — actors, systems, trust boundaries, major dependencies.
2. **Runtime interaction** — the most important sequence or failure/recovery scenario.
3. **State/data structure** — only when lifecycle or schema is architecturally important.

Do not force all three when one view is sufficient.

## Architecture workflow

1. Identify the decision the diagram supports and the intended reader.
2. Read `references/architecture-patterns.md` and select a composition.
3. Use the core `mermaid-design` skill's style and GitHub compatibility guidance.
4. Group by semantic boundary: system, trust zone, region, account/project, namespace, domain, control/data plane, or ownership.
5. Show protocols/flows only when they matter to the decision.
6. For cloud services, use their canonical product names in labels but keep the diagram vendor-icon-free so GitHub Mermaid remains portable.
7. Validate with the Mermaid renderer when available.

## C4-like discipline without special syntax

When GitHub portability matters, represent C4 ideas using stable flowcharts:
- context: people/external systems/current system;
- container: deployable/runtime units;
- component: only the portion needed for a decision.

Avoid pretending a diagram is a formal C4 model if the syntax/runtime does not support C4 semantics.

## Failure-mode view

Architecture diagrams should expose meaningful resilience behavior when relevant: retries, queues, replicas, failover, DLQ, circuit breakers, cache boundaries, control loops, and human approval gates. Prefer a separate sequence/state diagram over cluttering the topology.

## Supporting material

- `references/architecture-patterns.md` — architecture-specific recipes.
- Core pattern library: `../mermaid-design/assets/pattern-catalog.md`.
