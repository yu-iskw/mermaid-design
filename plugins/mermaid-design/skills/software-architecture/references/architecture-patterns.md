# Architecture Diagram Recipes

## System context
Use `flowchart LR`. Put the system of interest in one subgraph, users to the left, external dependencies to the right. Label only boundary-crossing relationships.

## Platform layers
Use `flowchart TB` with 3–6 horizontal conceptual layers: experience, API, domain/services, data, platform/infrastructure. Do not imply runtime call order merely because layers are vertically stacked.

## Control plane / data plane
Use two subgraphs. Put policy/configuration/reconciliation edges in the control plane and workload/request/event edges in the data plane. Use labels to distinguish them instead of color alone.

## Multi-region
Use symmetric region subgraphs. Place global routing outside. Show replication direction/cardinality and clarify whether failover is active/active or active/passive.

## Kubernetes
Prefer logical boundaries over every object. Typical hierarchy: external client -> ingress/gateway -> service -> workload -> datastore, with a separate control-loop diagram for controllers/operators.

## Event-driven system
Place broker/topics centrally. Group producers and consumers by domain or ownership. Show dead-letter/retry paths only when operational behavior matters.

## Data platform
Use source -> ingest -> storage/transform -> curated/semantic -> serving/consumption. Show catalog, governance, quality, observability, and orchestration as cross-cutting controls rather than forcing them into the main data path.

## Agentic system
Separate model reasoning from deterministic services and side-effecting tools. Show memory/retrieval, policy/guardrails, human approval, and observability as explicit dependencies when material.

## Security/trust model
Use subgraphs for trust zones. Every line that crosses a trust boundary should have a reason/protocol. Avoid security claims implied only by placement.

## Migration architecture
Use current/transition/target diagrams or a strangler flow. A single picture containing all old and new components usually hides the migration decision.
