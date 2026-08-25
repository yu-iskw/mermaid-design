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

## Token-efficient architecture workflow

1. Identify the decision and intended reader.
2. Load only the most relevant code shard:
   - boundaries, regions, layers, contexts -> `../mermaid-design/assets/patterns/architecture-boundaries.md`;
   - queues, caches, resilience, consistency -> `../mermaid-design/assets/patterns/distributed-systems.md`;
   - data/ML/RAG platforms -> `../mermaid-design/assets/patterns/data-and-ai-platforms.md`;
   - agent architecture -> `../mermaid-design/assets/patterns/agent-systems.md`;
   - security/trust/access -> `../mermaid-design/assets/patterns/security-and-governance.md`;
   - Kubernetes, delivery, DR -> `../mermaid-design/assets/patterns/delivery-and-operations.md`.
3. Read `references/architecture-patterns.md` only if the selected code example does not answer the composition question.
4. Group by real semantic boundary: system, trust zone, region, account/project, namespace, domain, control/data plane, or ownership.
5. Use `subgraph` to make those boundaries explicit. Do not create decorative subgraphs with no semantic meaning.
6. Show protocols/flows only when they matter to the decision.
7. Validate with the Mermaid renderer when available.

Do not load all architecture shards for one task. Most diagrams need exactly one.

## C4-like discipline without special syntax

When GitHub portability matters, represent C4 ideas using stable flowcharts:
- context: people/external systems/current system;
- container: deployable/runtime units;
- component: only the portion needed for a decision.

Avoid pretending a diagram is a formal C4 model if the syntax/runtime does not support C4 semantics.

## Failure-mode view

Expose meaningful resilience behavior when relevant: retries, queues, replicas, failover, DLQ, circuit breakers, cache boundaries, control loops, and human approval gates. Prefer a separate sequence/state diagram over cluttering topology.
