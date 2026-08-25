# Enterprise Architecture Example Router

Load **one file only** for the current concern. Each file contains 20 compact, copy-adaptable Mermaid examples. Load a second file only when the requested view genuinely crosses concerns.

| Concern | File |
|---|---|
| enterprise platforms, shared services, SaaS, internal developer platforms | `enterprise-platforms.md` |
| identity, zero trust, secrets, policy enforcement | `identity-and-security.md` |
| cloud networking, ingress/egress, hybrid, multi-region connectivity | `cloud-networking.md` |
| Kubernetes, service mesh, operators, runtime isolation | `kubernetes-and-runtime.md` |
| warehouses, lakehouses, lineage, semantic layers, governance | `data-and-analytics.md` |
| APIs, events, queues, CDC, B2B integration | `integration-and-messaging.md` |
| HA, DR, backup, failover, SRE boundaries | `reliability-and-dr.md` |
| LLM gateways, RAG, agents, memory, model serving | `ai-and-agent-platforms.md` |
| compliance, tenancy, audit, residency, enterprise controls | `governance-and-compliance.md` |

## Retrieval rule

Do not read every example file. Pick the closest concern from the table, scan headings in that file, then adapt the nearest example. Prefer examples that expose semantic boundaries with `subgraph` rather than decorative grouping.