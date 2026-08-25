# Enterprise Process and Behavior Example Router

Load **one file only** for the scenario being modeled. Each file contains 20 compact Mermaid examples. Load another shard only when the requested workflow spans a distinct operational domain.

| Scenario | File |
|---|---|
| SSO, provisioning, privileged access, token lifecycle | `identity-and-access-flows.md` |
| CI/CD, change management, rollout, rollback | `change-and-release.md` |
| alerting, incident command, escalation, postmortem | `incident-and-operations.md` |
| approvals, exceptions, policy gates, compliance reviews | `approvals-and-governance.md` |
| queues, retries, webhooks, sagas, async jobs | `async-and-messaging.md` |
| ingestion, quality, lineage, model/data release | `data-workflows.md` |
| enterprise customer/order/support/business processes | `business-workflows.md` |
| failover, recovery, restoration, degraded modes | `resilience-and-recovery.md` |
| agents, tools, human approval, memory, evaluation | `agent-and-human-workflows.md` |

## Retrieval rule

Do not load the whole library. Select one shard, scan its headings, and adapt the nearest example. Use `sequenceDiagram` for actor interactions, `stateDiagram-v2` for lifecycle semantics, and `flowchart` with `subgraph` boundaries for ownership lanes and policy/process boundaries.