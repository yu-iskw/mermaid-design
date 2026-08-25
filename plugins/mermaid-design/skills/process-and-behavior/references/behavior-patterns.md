# Process and Behavior Recipes

## API request
Actors: caller, edge/API, service, dependency/store. Show authorization only if it changes the scenario. Use `alt` for validation/error branches.

## Authentication
Separate browser/client, application, identity provider, and resource API. Mark redirect/browser steps differently in labels from server-to-server token exchange.

## Async job
Show submit -> durable queue -> worker -> result store -> poll/callback. Make acknowledgement and retry/DLQ behavior explicit.

## Event processing
Show producer -> broker -> consumer -> side effect. If delivery semantics matter, include dedupe/idempotency state and acknowledgement timing.

## Saga
Prefer one diagram for the happy-path orchestration/choreography and a second focused diagram for compensation if the rollback path is substantial.

## Agent tool loop
Show user -> agent/model -> tool -> observation -> model. Add retrieval, memory, policy, or approval only if used by the scenario.

## Incident response
Use ownership-lane flowchart or timeline: detect -> acknowledge -> triage -> mitigate -> recover -> review. Expose handoffs and decision gates.

## Lifecycle
Use `stateDiagram-v2`. States should be durable semantic states, not implementation steps. Put guards/events on transitions.

## Deployment
Use flowchart for pipeline stages and state/sequence for rollout behavior. Canary/blue-green decisions are easier to understand as transitions than as a giant topology.

## Git history
Use `gitGraph` only when commit/branch evolution itself matters. For release process ownership, use a workflow diagram instead.
