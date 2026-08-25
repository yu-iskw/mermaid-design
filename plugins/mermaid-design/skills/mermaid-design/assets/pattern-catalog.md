# Mermaid Pattern Router

This file is intentionally small. Use it to choose **one** code-first pattern shard, then stop reading unrelated assets.

| Need | Load |
| --- | --- |
| system context, layers, trust zones, regions, control/data planes | `patterns/architecture-boundaries.md` |
| events, queues, caches, consistency, resilience, distributed workflows | `patterns/distributed-systems.md` |
| data platforms, lineage, governance, RAG, ML/LLMOps | `patterns/data-and-ai-platforms.md` |
| agents, tools, human approval, orchestration, memory/retrieval | `patterns/agent-systems.md` |
| identity, zero trust, RBAC/ABAC/ReBAC, privacy, secrets, threat models | `patterns/security-and-governance.md` |
| CI/CD, GitOps, Kubernetes, rollout, backup, DR, operations | `patterns/delivery-and-operations.md` |
| request flows, async jobs, auth, retries, sagas, runtime interaction | `patterns/sequences.md` |
| lifecycle, approvals, incidents, jobs, deployment states | `patterns/states-and-processes.md` |
| class/domain models, ER, schemas, catalogs, observability models | `patterns/domain-and-data-models.md` |
| Gantt, timelines, quadrants, Sankey, Kanban, analytical/specialized views | `patterns/planning-and-analysis.md` |

## Loading rule

1. Choose the diagram family first when obvious.
2. Read this router.
3. Read exactly one matching shard.
4. Copy and adapt the closest Mermaid example.
5. Load a second shard only if the requested deliverable actually contains a second visual concern.

The shards are designed so code carries most of the pattern knowledge. Descriptions are deliberately short.
