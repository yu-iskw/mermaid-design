# Agent System Patterns

## Tool-calling loop
```mermaid
flowchart LR
  user[User] --> model[Model]
  model -->|tool call| tool[Tool]
  tool -->|observation| model
  model --> user
```

## Agent supervisor
```mermaid
flowchart TB
  user[User] --> supervisor[Supervisor]
  subgraph specialists[Specialist agents]
    research[Research]
    coding[Coding]
    review[Review]
  end
  supervisor --> research
  supervisor --> coding
  supervisor --> review
  research --> supervisor
  coding --> supervisor
  review --> supervisor
  supervisor --> user
```

## Multi-agent delegation
```mermaid
sequenceDiagram
  participant U as User
  participant C as Coordinator
  participant A as Agent A
  participant B as Agent B
  U->>C: objective
  par parallel delegation
    C->>A: subtask A
    C->>B: subtask B
  end
  A-->>C: findings
  B-->>C: findings
  C-->>U: synthesized result
```

## Human approval gate
```mermaid
flowchart LR
  agent[Agent] --> plan[Proposed action] --> approval{Human approval}
  approval -->|approve| tool[Side-effecting tool]
  approval -->|reject| revise[Revise plan]
  revise --> agent
  tool --> result[Result]
```

## Reasoning / deterministic boundary
```mermaid
flowchart LR
  subgraph probabilistic[Model reasoning]
    model[LLM] --> plan[Plan]
  end
  subgraph deterministic[Deterministic services]
    validator[Validator] --> executor[Executor]
  end
  plan --> validator
  executor --> observation[Observation]
  observation --> model
```

## Memory layers
```mermaid
flowchart TB
  agent[Agent]
  subgraph memory[Memory boundary]
    working[Working context]
    episodic[(Episodic memory)]
    semantic[(Semantic memory)]
  end
  agent <--> working
  agent <--> episodic
  agent <--> semantic
```

## Retrieval-grounded agent
```mermaid
flowchart LR
  user[User] --> agent[Agent]
  agent --> retrieve[Retrieve]
  retrieve --> index[(Knowledge index)]
  index --> retrieve
  retrieve --> evidence[Evidence set]
  evidence --> agent
  agent --> user
```

## Policy-guarded tool use
```mermaid
flowchart LR
  agent[Agent] --> request[Tool request]
  request --> policy{Policy engine}
  policy -->|allow| tool[Tool]
  policy -->|deny| agent
  tool --> audit[(Audit log)]
  tool --> agent
```

## Planner / executor
```mermaid
flowchart LR
  user[Goal] --> planner[Planner]
  planner --> tasks[(Task plan)]
  tasks --> executor[Executor]
  executor --> tools[Tools]
  tools --> executor
  executor --> verifier[Verifier]
  verifier -->|needs revision| planner
  verifier -->|done| answer[Answer]
```

## Agent observability
```mermaid
flowchart TB
  agent[Agent runtime] --> model[Model]
  agent --> tools[Tools]
  subgraph telemetry[Observability]
    traces[(Traces)]
    evals[(Evaluations)]
    costs[(Cost/usage)]
  end
  agent -. telemetry .-> traces
  model -. quality .-> evals
  agent -. usage .-> costs
```

## Agent sandbox boundary
```mermaid
flowchart LR
  agent[Agent] --> sandbox[Sandbox gateway]
  subgraph isolated[Isolated execution]
    runtime[Code runtime] --> fs[(Ephemeral filesystem)]
  end
  sandbox --> runtime
  runtime --> sandbox
  sandbox --> agent
```

## Agent identity propagation
```mermaid
flowchart LR
  user[User] --> agent[Agent runtime]
  agent --> identity[Agent identity / delegation]
  identity --> policy[Authorization]
  policy --> service[Enterprise service]
  service --> audit[(Audit trail)]
```

## Critic loop
```mermaid
flowchart LR
  draft[Draft] --> critic[Critic]
  critic -->|issues| revise[Revise]
  revise --> draft
  critic -->|accepted| final[Final]
```

## Router / specialists
```mermaid
flowchart LR
  request[Request] --> router{Intent router}
  router --> code[Coding specialist]
  router --> data[Data specialist]
  router --> ops[Ops specialist]
  code --> response[Response]
  data --> response
  ops --> response
```

## Agent workflow with durable state
```mermaid
flowchart LR
  event[Input] --> orchestrator[Workflow orchestrator]
  orchestrator --> agent[Agent step]
  agent --> checkpoint[(Durable checkpoint)]
  checkpoint --> orchestrator
  orchestrator --> tool[Tool step]
  tool --> checkpoint
  orchestrator --> done[Complete]
```
