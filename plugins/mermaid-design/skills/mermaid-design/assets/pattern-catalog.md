# Professional Diagram Pattern Catalog

Use this catalog as a composition library. A pattern is a semantic layout recipe, not copy-paste syntax. Choose one primary pattern and optionally one secondary pattern.

## Flowchart / topology patterns

1. **System Context Ring** — focal system centered between users, upstreams, and downstreams.
2. **Three-Tier Application** — presentation -> service -> persistence.
3. **Layered Platform** — experience -> API -> domain -> data -> infrastructure.
4. **Hub and Spoke** — central broker/platform with independent spokes.
5. **Control Plane / Data Plane** — management path separated from runtime traffic.
6. **Ingress / Processing / Egress** — external entry, internal stages, external destinations.
7. **Trust Zone Boundaries** — public, private, restricted subgraphs with explicit crossings.
8. **Region Pair** — active and standby regions with replication path.
9. **Multi-Region Active/Active** — global ingress to symmetric regional stacks.
10. **Shared Services Backbone** — product workloads above common identity, observability, secrets, networking.
11. **Event-Driven Backbone** — producers -> broker/topics -> consumers.
12. **CQRS Split** — command path and query path converging on domain state.
13. **Lambda Data Path** — batch and streaming branches joining serving layer.
14. **Kappa Data Path** — single event stream with replay.
15. **Medallion Data Platform** — bronze -> silver -> gold with consumers.
16. **Lakehouse Planes** — ingestion, storage, compute, governance, serving.
17. **RAG Pipeline** — source -> ingest -> chunk/embed -> index -> retrieve -> generate.
18. **Agent Tool Loop** — model -> plan -> tool -> observation -> model.
19. **Agent Supervisor** — supervisor routes to specialized workers and synthesizes result.
20. **Human-in-the-Loop Gate** — automation path interrupted by approval/review decision.
21. **Sidecar Pattern** — application paired with proxy/agent beside it.
22. **Ambassador Pattern** — workload -> local ambassador -> external service.
23. **Adapter Boundary** — canonical core connected to heterogeneous adapters.
24. **Anti-Corruption Layer** — legacy/external model translated before domain boundary.
25. **Strangler Migration** — router gradually splits legacy and new implementation.
26. **Blue/Green Deployment** — router switches between parallel environments.
27. **Canary Rollout** — traffic splitter sends minority traffic to new version.
28. **Feature Flag Path** — request -> evaluation -> old/new behavior.
29. **Cache Aside** — app checks cache, falls back to datastore, backfills cache.
30. **Read-Through Cache** — app -> cache -> datastore abstraction.
31. **Write-Through Cache** — write synchronously updates cache and backing store.
32. **Write-Behind Cache** — cache acknowledges then asynchronously persists.
33. **Outbox Pattern** — transaction writes data + outbox, relay publishes event.
34. **Saga Choreography** — services react to events with compensations.
35. **Saga Orchestration** — coordinator commands steps and compensations.
36. **Circuit Breaker** — caller -> breaker -> dependency with open/half-open states.
37. **Bulkhead Isolation** — workloads partitioned into independent resource pools.
38. **Retry with Dead Letter** — processing -> retry loop -> DLQ.
39. **Fan-Out / Fan-In** — one request parallelizes then aggregates.
40. **Scatter / Gather** — dispatcher sends to many peers then combines responses.
41. **Map / Shuffle / Reduce** — partition, redistribute, aggregate.
42. **Pipeline with Quality Gates** — stages separated by validation decisions.
43. **Dependency Diamond** — one source forks into alternatives that reconverge.
44. **Capability Map** — business capabilities grouped by domain.
45. **Bounded Context Map** — domain contexts with directional relationships.
46. **Service Dependency Map** — services organized by dependency depth.
47. **Blast Radius Map** — shared dependency highlighted beneath affected consumers.
48. **Data Lineage Spine** — source -> transforms -> marts -> reports.
49. **Governance Overlay** — data path with policy/catalog/quality controls alongside.
50. **Identity Boundary** — user -> IdP -> gateway -> services with token propagation.

## Sequence patterns

51. **Synchronous Request/Response** — client, API, service, datastore.
52. **Authentication Code Flow** — browser, app, IdP, callback, token exchange.
53. **Token Refresh** — expired access token -> refresh -> retry.
54. **Webhook Delivery** — producer -> receiver -> acknowledgment -> async processing.
55. **Idempotent Consumer** — receive -> dedupe check -> apply -> record key.
56. **Transactional Outbox Sequence** — write transaction, relay poll, publish, consume.
57. **Saga Orchestrator Sequence** — coordinator drives steps and compensation.
58. **Saga Choreography Sequence** — event-triggered service chain.
59. **Retry / Backoff** — repeated attempts with increasing wait and final failure.
60. **Circuit Breaker Sequence** — failure threshold, short-circuit, probe, close.
61. **Cache Hit / Miss** — alt branches for hit and datastore fallback.
62. **Read Repair** — compare replicas and repair stale copy.
63. **Leader Election** — peers negotiate/lease leadership.
64. **Two-Phase Commit** — prepare then commit/rollback.
65. **Optimistic Concurrency** — read version, conditional write, conflict retry.
66. **Pessimistic Lock** — acquire, mutate, release.
67. **Streaming Session** — connect, repeated messages, close.
68. **Async Job Submission** — submit -> queue -> worker -> poll/callback.
69. **Long-Running Operation** — request returns operation ID; client polls status.
70. **RAG Query Sequence** — user -> orchestrator -> retriever -> model -> response.
71. **Tool-Calling Agent Sequence** — user -> model -> tool -> model loop.
72. **Multi-Agent Delegation** — coordinator -> specialists -> synthesis.
73. **Human Approval Sequence** — agent pauses, reviewer acts, workflow resumes.
74. **Eventual Consistency** — write primary, publish, project read model, later read.
75. **CDC Propagation** — DB log -> connector -> stream -> sink.

## State-machine patterns

76. **Entity Lifecycle** — draft -> active -> suspended -> archived.
77. **Order Lifecycle** — pending -> paid -> fulfilled -> completed/cancelled.
78. **Job Lifecycle** — queued -> running -> succeeded/failed/cancelled.
79. **Deployment Lifecycle** — planned -> deploying -> verifying -> promoted/rolled back.
80. **Incident Lifecycle** — detected -> triaged -> mitigated -> resolved -> reviewed.
81. **Approval Workflow** — submitted -> review -> approved/rejected -> executed.
82. **Circuit Breaker States** — closed -> open -> half-open -> closed/open.
83. **Connection States** — disconnected -> connecting -> authenticated -> reconnecting.
84. **Subscription Lifecycle** — trial -> active -> past_due -> cancelled.
85. **Data Quality State** — raw -> validated -> quarantined/published.

## Class / domain-model patterns

86. **Aggregate Root** — root entity containing value objects/entities.
87. **Strategy Family** — interface with multiple interchangeable implementations.
88. **Adapter Family** — port/interface with external adapters.
89. **Repository Pattern** — domain service depends on repository abstraction.
90. **Decorator Chain** — component wrapped by multiple decorators.
91. **Command Handler Model** — command -> handler -> aggregate -> events.
92. **Event Model** — aggregate emits typed domain events consumed by handlers.
93. **Plugin Interface Model** — core contract with independent plugin implementations.
94. **API DTO Boundary** — transport DTOs mapped to domain objects.
95. **Policy Object Model** — context delegates decision to composable policies.

## ER / data-model patterns

96. **Star Schema** — fact table surrounded by dimensions.
97. **Snowflake Schema** — normalized dimensions branching from star.
98. **Event Store** — stream, event, snapshot, aggregate identity.
99. **Multi-Tenant SaaS** — tenant owns users/resources; global metadata separate.
100. **RBAC Model** — users, groups, roles, permissions, assignments.
101. **ABAC Model** — subjects/resources/actions with attributes and policies.
102. **ReBAC Model** — subjects/resources connected by typed relations.
103. **Catalog / Lineage Model** — assets, versions, owners, lineage edges, classifications.
104. **Observability Model** — service, deployment, trace, span, log, metric.
105. **Feature Flag Model** — flag, environment, rule, segment, variant.

## Planning / portfolio patterns

106. **Release Train Gantt** — milestones, parallel workstreams, release boundary.
107. **Migration Waves Gantt** — cohorts migrate in staged waves with validation gates.
108. **Incident Timeline** — detection, diagnosis, mitigation, recovery, follow-up.
109. **Product Evolution Timeline** — major capabilities over successive periods.
110. **Risk Quadrant** — probability vs impact.
111. **Portfolio Quadrant** — strategic value vs implementation effort.
112. **Build/Buy Quadrant** — differentiation vs commodity maturity.
113. **Journey Emotional Arc** — stages with satisfaction/pain score.
114. **GitFlow History** — feature/release/hotfix branch interactions.
115. **Trunk-Based History** — short branches, frequent merges, release tags.

## Analytical / specialized patterns

116. **Conversion Sankey** — acquisition channels -> funnel stages -> outcomes.
117. **Cost Allocation Sankey** — shared spend -> platforms -> teams/products.
118. **Time-Series with Threshold** — metric trend plus target/SLO reference.
119. **Category Comparison XY** — ordered categories compared by value.
120. **Protocol Packet Layout** — fixed header fields followed by variable payload.
121. **Kanban Delivery Board** — backlog -> ready -> doing -> review -> done.
122. **Architecture Zone Map** — external, edge, application, data, management zones.
123. **Radar Capability Profile** — several capabilities compared across options.
124. **Treemap Ownership** — portfolio area proportional to size/cost/volume.
125. **Venn Responsibility Overlap** — shared concerns between teams/systems.
126. **Ishikawa Root Cause** — categories of causes feeding one observed problem.
127. **Wardley Evolution Map** — user need chain positioned by evolution.
128. **Cynefin Classification** — concerns sorted into obvious/complicated/complex/chaotic.
129. **Event Modeling Timeline** — commands, events, views arranged over business time.
130. **Decision Tree** — branching questions leading to recommendations.
131. **Dependency Tree** — root package/service expanded by dependency levels.
132. **Org Tree** — executive -> functions -> teams with restrained depth.
133. **Requirement Trace** — stakeholder need -> requirement -> component -> verification.
134. **Threat Model Flow** — trust boundaries, assets, flows, attacker entry points.
135. **Privacy Data Flow** — data subjects -> collection -> processing -> stores -> recipients.
136. **SLO Error-Budget Flow** — requests -> good/bad events -> SLI -> budget decision.
137. **CI/CD Pipeline** — source -> build -> test -> scan -> package -> deploy -> verify.
138. **GitOps Reconciliation** — desired state repo -> controller -> cluster -> observed state loop.
139. **Kubernetes Request Path** — client -> ingress -> service -> pod -> dependency.
140. **Kubernetes Control Loop** — desired spec -> controller -> API -> observed resources.
141. **Cloud Landing Zone** — org/folder/project hierarchy with shared controls.
142. **Zero-Trust Access Path** — identity + device posture -> policy -> proxy -> workload.
143. **Secrets Delivery** — workload identity -> secrets manager -> short-lived secret/token.
144. **Key Rotation** — new key create -> dual-read/write -> migrate -> retire old key.
145. **Backup / Restore** — primary -> snapshots -> retention -> restore validation.
146. **Disaster Recovery Failover** — health trigger -> promote secondary -> route traffic -> reconcile.
147. **Data Retention Lifecycle** — collect -> active -> archive -> delete/anonymize.
148. **ML Training Pipeline** — data -> feature -> train -> evaluate -> registry -> deploy.
149. **Model Serving Path** — request -> feature retrieval -> inference -> policy -> response.
150. **LLMOps Evaluation Loop** — prompts/data -> run -> judge -> analyze -> improve -> release.
