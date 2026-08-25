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

## Enterprise examples first

This skill contains 180 practical enterprise Mermaid examples in `assets/examples/`, split into nine 20-example shards. Do **not** preload them.

1. Identify the architectural decision and intended reader.
2. Read only `assets/examples/INDEX.md`.
3. Select exactly one enterprise example shard from the router.
4. Scan that shard's headings and adapt the closest example rather than inventing a layout from scratch.
5. Load a second shard only when the requested diagram genuinely combines two distinct architectural concerns.

Examples cover enterprise platforms, IAM/security, cloud networking, Kubernetes/runtime, data/analytics, integration/messaging, reliability/DR, AI/agent platforms, and governance/compliance.

## Generic pattern fallback

If no enterprise example is close enough, load only the most relevant shared code shard:
- boundaries, regions, layers, contexts -> `../mermaid-design/assets/patterns/architecture-boundaries.md`;
- queues, caches, resilience, consistency -> `../mermaid-design/assets/patterns/distributed-systems.md`;
- data/ML/RAG platforms -> `../mermaid-design/assets/patterns/data-and-ai-platforms.md`;
- agent architecture -> `../mermaid-design/assets/patterns/agent-systems.md`;
- security/trust/access -> `../mermaid-design/assets/patterns/security-and-governance.md`;
- Kubernetes, delivery, DR -> `../mermaid-design/assets/patterns/delivery-and-operations.md`.

Read `references/architecture-patterns.md` only if both the enterprise example and selected generic code shard fail to answer the composition question.

## Architecture design rules

1. Group by real semantic boundary: system, trust zone, region, account/project, namespace, domain, control/data plane, or ownership.
2. Use `subgraph` to make those boundaries explicit. Do not create decorative subgraphs with no semantic meaning.
3. Show protocols/flows only when they matter to the decision.
4. Keep labels concrete enough for enterprise readers: identify control planes, identity boundaries, data stores, operational ownership, and failure/recovery paths when material.
5. Prefer several focused diagrams over one enterprise "everything map".
6. Validate with the Mermaid renderer when available.

## C4-like discipline without special syntax

When GitHub portability matters, represent C4 ideas using stable flowcharts:
- context: people/external systems/current system;
- container: deployable/runtime units;
- component: only the portion needed for a decision.

Avoid pretending a diagram is a formal C4 model if the syntax/runtime does not support C4 semantics.

## Failure-mode view

Expose meaningful resilience behavior when relevant: retries, queues, replicas, failover, DLQ, circuit breakers, cache boundaries, control loops, and human approval gates. Prefer a separate sequence/state diagram over cluttering topology.
