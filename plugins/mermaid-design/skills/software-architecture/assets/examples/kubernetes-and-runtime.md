# Kubernetes and Runtime Architecture Examples

## 1. Kubernetes request path
```mermaid
flowchart LR
  client[Client] --> ingress[Ingress]
  subgraph cluster[Kubernetes cluster]
    ingress --> service[Service]
    service --> pod1[Pod A]
    service --> pod2[Pod B]
  end
  pod1 --> db[(Database)]
  pod2 --> db
```

## 2. Kubernetes control loop
```mermaid
flowchart LR
  git[Desired spec] --> api[Kubernetes API]
  subgraph control[Control plane]
    api --> controller[Controller]
    controller --> observed[Observed state]
    observed --> controller
  end
  controller --> resources[Managed resources]
```

## 3. Namespace isolation
```mermaid
flowchart TB
  subgraph prod[Production namespace]
    psvc[Prod service] --> pdb[(Prod DB)]
  end
  subgraph dev[Development namespace]
    dsvc[Dev service] --> ddb[(Dev DB)]
  end
  policy[Network policy] --> prod
  policy --> dev
```

## 4. Service mesh mTLS
```mermaid
flowchart LR
  subgraph nsA[Namespace A]
    appA[App A] --> proxyA[Sidecar]
  end
  subgraph mesh[Mesh trust domain]
    proxyA -->|mTLS| proxyB[Sidecar]
  end
  subgraph nsB[Namespace B]
    proxyB --> appB[App B]
  end
```

## 5. Kubernetes operator
```mermaid
flowchart TB
  user[Platform user] --> cr[Custom resource]
  cr --> api[Kubernetes API]
  subgraph operator[Operator]
    api --> reconcile[Reconcile loop]
    reconcile --> status[Update status]
  end
  reconcile --> managed[Managed workload]
```

## 6. Admission control
```mermaid
flowchart LR
  deploy[Deployment request] --> api[Kubernetes API]
  subgraph admission[Admission chain]
    api --> mutate[Mutating webhook]
    mutate --> validate[Validating webhook]
    validate --> policy[Policy engine]
  end
  policy --> scheduler[Scheduler]
```

## 7. GitOps cluster management
```mermaid
flowchart LR
  repo[Git repository] --> controller[GitOps controller]
  subgraph cluster[Cluster]
    controller --> desired[Desired resources]
    desired --> workloads[Workloads]
    workloads --> observed[Observed state]
  end
  observed --> controller
```

## 8. Multi-cluster fleet
```mermaid
flowchart TB
  fleet[Fleet control plane] --> policy[Shared policy]
  subgraph clusters[Runtime fleet]
    policy --> c1[Cluster A]
    policy --> c2[Cluster B]
    policy --> c3[Cluster C]
  end
  c1 --> telemetry[Central telemetry]
  c2 --> telemetry
  c3 --> telemetry
```

## 9. Cluster autoscaling
```mermaid
flowchart LR
  metrics[Workload metrics] --> hpa[HPA]
  hpa --> pods[Pod replicas]
  pods --> pending[Pending pods]
  subgraph capacity[Capacity control]
    pending --> autoscaler[Node autoscaler]
    autoscaler --> nodes[Node pool]
  end
```

## 10. Batch job isolation
```mermaid
flowchart TB
  scheduler[Job scheduler] --> queue[Batch queue]
  subgraph batch[Batch node pool]
    queue --> job1[Job A]
    queue --> job2[Job B]
  end
  batch --> storage[(Shared storage)]
  policy[Resource quotas] --> batch
```

## 11. GPU workload pool
```mermaid
flowchart LR
  inference[Inference service] --> scheduler[Scheduler]
  subgraph gpu[GPU node pool]
    scheduler --> podA[GPU pod A]
    scheduler --> podB[GPU pod B]
  end
  model[(Model registry)] --> podA
  model --> podB
```

## 12. Stateful application
```mermaid
flowchart TB
  client[Client] --> service[Headless service]
  subgraph stateful[StatefulSet]
    service --> pod0[Pod 0]
    service --> pod1[Pod 1]
    pod0 --> pvc0[(Volume 0)]
    pod1 --> pvc1[(Volume 1)]
  end
```

## 13. External secrets operator
```mermaid
flowchart LR
  vault[External secrets manager] --> operator[Secrets operator]
  subgraph cluster[Cluster]
    operator --> secret[Kubernetes Secret]
    secret --> workload[Workload]
  end
  identity[Workload identity] --> operator
```

## 14. Progressive delivery controller
```mermaid
flowchart LR
  release[New release] --> rollout[Rollout controller]
  subgraph runtime[Runtime]
    rollout --> stable[Stable pods]
    rollout --> canary[Canary pods]
    gateway[Gateway] --> stable
    gateway --> canary
  end
  metrics[Metrics] --> rollout
```

## 15. Pod security boundary
```mermaid
flowchart TB
  deploy[Deployment] --> admission[Admission policy]
  subgraph restricted[Restricted namespace]
    admission --> pod[Non-root pod]
    pod --> readonly[Read-only filesystem]
  end
  pod --> serviceAccount[Dedicated service account]
```

## 16. Runtime observability sidecars
```mermaid
flowchart LR
  subgraph pod[Application pod]
    app[Application] --> logs[Log sidecar]
    app --> otel[OTel collector]
  end
  logs --> logBackend[Log backend]
  otel --> tracing[Trace backend]
  otel --> metrics[Metrics backend]
```

## 17. Queue-driven worker scaling
```mermaid
flowchart LR
  producer[Producer] --> queue[Work queue]
  queue --> scaler[Event-driven scaler]
  subgraph workers[Worker deployment]
    scaler --> w1[Worker pods]
  end
  w1 --> downstream[Downstream system]
```

## 18. Blue-green namespace deployment
```mermaid
flowchart TB
  gateway[Gateway] --> selector[Traffic selector]
  subgraph blue[Blue namespace]
    selector --> b[Version N]
  end
  subgraph green[Green namespace]
    selector -. switch .-> g[Version N+1]
  end
  validator[Smoke tests] --> g
```

## 19. Multi-tenant cluster with dedicated namespaces
```mermaid
flowchart TB
  platform[Platform control] --> quotas[Quotas + policies]
  subgraph tenantA[Tenant A namespace]
    a[Workloads A]
  end
  subgraph tenantB[Tenant B namespace]
    b[Workloads B]
  end
  quotas --> tenantA
  quotas --> tenantB
```

## 20. Cluster egress gateway
```mermaid
flowchart LR
  subgraph cluster[Kubernetes cluster]
    workloads[Workloads] --> egress[Egress gateway]
  end
  egress --> firewall[Enterprise firewall]
  firewall --> external[Approved external APIs]
  egress --> audit[Egress audit]
```