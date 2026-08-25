# Enterprise AI and Agent Platform Architecture Examples

## 1. Enterprise LLM gateway
```mermaid
flowchart LR
  apps[Enterprise applications] --> gateway[LLM gateway]
  subgraph controls[AI control plane]
    gateway --> auth[Identity + quotas]
    gateway --> policy[Prompt/data policy]
    gateway --> routing[Model routing]
  end
  routing --> models[Approved models]
  gateway --> audit[AI audit]
```

## 2. Governed RAG platform
```mermaid
flowchart LR
  sources[Enterprise sources] --> ingest[Ingestion]
  subgraph rag[RAG platform]
    ingest --> chunk[Chunk + classify]
    chunk --> index[(Vector index)]
    user[User] --> retrieve[Authorized retrieval]
    retrieve --> index
    retrieve --> llm[LLM]
  end
  iam[IAM policy] --> retrieve
```

## 3. Agent tool boundary
```mermaid
flowchart LR
  user[User] --> agent[Agent runtime]
  subgraph tools[Approved tool boundary]
    agent --> mcp[MCP gateway]
    mcp --> crm[CRM tool]
    mcp --> data[Data tool]
    mcp --> tickets[Ticket tool]
  end
  policy[Tool policy] --> mcp
```

## 4. Human approval for side effects
```mermaid
flowchart TB
  request[User request] --> agent[Agent]
  agent --> plan[Proposed action]
  subgraph approval[Human-control boundary]
    plan --> gate[Approval gate]
    reviewer[Reviewer] --> gate
  end
  gate --> executor[Deterministic executor]
  executor --> system[Enterprise system]
```

## 5. Enterprise agent memory
```mermaid
flowchart LR
  agent[Agent] --> memory[Memory service]
  subgraph memoryPlane[Governed memory plane]
    memory --> policy[Retention + privacy policy]
    memory --> store[(Tenant memory store)]
    memory --> retrieval[Memory retrieval]
  end
  retrieval --> agent
  memory --> audit[Memory audit]
```

## 6. Multi-agent supervisor
```mermaid
flowchart TB
  user[User] --> supervisor[Supervisor agent]
  subgraph specialists[Specialist agents]
    supervisor --> research[Research agent]
    supervisor --> data[Data agent]
    supervisor --> coding[Coding agent]
  end
  specialists --> synthesis[Synthesis]
  synthesis --> supervisor
```

## 7. Model serving platform
```mermaid
flowchart LR
  client[Application] --> endpoint[Inference endpoint]
  subgraph serving[Model-serving plane]
    endpoint --> router[Model router]
    router --> modelA[Model A]
    router --> modelB[Model B]
    registry[(Model registry)] --> router
  end
  endpoint --> telemetry[Inference telemetry]
```

## 8. Prompt management platform
```mermaid
flowchart TB
  developer[Developer] --> repo[Prompt repository]
  subgraph lifecycle[Prompt lifecycle]
    repo --> review[Review]
    review --> eval[Evaluation]
    eval --> registry[Prompt registry]
    registry --> runtime[Production runtime]
  end
  runtime --> telemetry[Prompt telemetry]
```

## 9. AI evaluation platform
```mermaid
flowchart LR
  datasets[(Evaluation datasets)] --> runner[Evaluation runner]
  models[Models] --> runner
  prompts[Prompts] --> runner
  subgraph evaluation[Evaluation plane]
    runner --> judges[Automated judges]
    runner --> humans[Human review]
    judges --> results[(Results)]
    humans --> results
  end
```

## 10. AI red-team environment
```mermaid
flowchart TB
  testers[Red team] --> harness[Test harness]
  subgraph isolated[Isolated AI test environment]
    harness --> target[Target model/app]
    harness --> attacks[Attack corpus]
    target --> telemetry[Safety telemetry]
  end
  telemetry --> findings[Findings]
```

## 11. Agent identity delegation
```mermaid
flowchart LR
  user[User] --> agent[Agent]
  agent --> delegation[Delegation service]
  subgraph identity[Identity boundary]
    delegation --> token[Scoped delegated token]
    token --> tool[Enterprise tool]
  end
  delegation --> audit[Delegation audit]
```

## 12. Agent sandbox execution
```mermaid
flowchart LR
  agent[Agent] --> sandbox[Sandbox manager]
  subgraph isolated[Ephemeral sandbox]
    sandbox --> code[Generated code]
    code --> runtime[Restricted runtime]
  end
  runtime --> artifacts[Approved artifacts]
  runtime --> logs[Execution logs]
```

## 13. AI data-loss prevention
```mermaid
flowchart LR
  user[User prompt] --> dlp[Prompt DLP]
  dlp --> gateway[LLM gateway]
  gateway --> model[Model]
  model --> output[Model output]
  subgraph controls[Content controls]
    output --> scan[Output scan]
    scan --> response[Released response]
  end
```

## 14. Retrieval authorization filter
```mermaid
flowchart LR
  query[User query] --> authz[Authorization context]
  subgraph retrieval[RAG retrieval]
    authz --> filter[Metadata filter]
    filter --> index[(Vector index)]
    index --> rerank[Rerank]
  end
  rerank --> llm[LLM]
```

## 15. Model fallback routing
```mermaid
flowchart LR
  request[Inference request] --> router[Model router]
  router --> primary[Primary model]
  router -. fallback .-> secondary[Secondary model]
  health[Latency + error health] --> router
  policy[Cost + quality policy] --> router
```

## 16. Agent observability
```mermaid
flowchart LR
  agent[Agent runtime] --> traces[Agent traces]
  tools[Tool calls] --> traces
  model[Model calls] --> traces
  subgraph observability[AI observability]
    traces --> store[(Trace store)]
    store --> eval[Quality evaluation]
    store --> dashboard[Operations dashboard]
  end
```

## 17. Enterprise knowledge ingestion
```mermaid
flowchart LR
  drive[Document stores] --> connector[Connectors]
  wiki[Knowledge bases] --> connector
  subgraph ingestion[Knowledge ingestion]
    connector --> classify[Classify + ACL capture]
    classify --> chunk[Chunk]
    chunk --> embed[Embed]
    embed --> index[(Knowledge index)]
  end
```

## 18. AI policy decision service
```mermaid
flowchart LR
  agent[Agent] --> request[Proposed action]
  subgraph policy[AI policy control plane]
    request --> engine[Policy engine]
    context[User + data + tool context] --> engine
    rules[(AI policies)] --> engine
  end
  engine --> decision[Allow / review / deny]
```

## 19. Agent skills distribution
```mermaid
flowchart TB
  repo[Skills repository] --> validation[Skill validation]
  subgraph distribution[Enterprise skill distribution]
    validation --> registry[Approved skill registry]
    registry --> claude[Claude Code]
    registry --> cursor[Cursor]
    registry --> codex[Codex]
  end
  registry --> audit[Version audit]
```

## 20. LLMOps release architecture
```mermaid
flowchart LR
  change[Prompt/model change] --> eval[Offline evaluation]
  subgraph release[AI release gates]
    eval --> safety[Safety checks]
    safety --> shadow[Shadow traffic]
    shadow --> canary[Canary]
    canary --> production[Production]
  end
  production --> feedback[Production feedback]
  feedback --> eval
```