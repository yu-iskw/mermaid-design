# Enterprise Reliability and Disaster Recovery Architecture Examples

## 1. Multi-zone high availability
```mermaid
flowchart TB
  lb[Regional load balancer]
  subgraph zoneA[Zone A]
    lb --> a[Service A]
  end
  subgraph zoneB[Zone B]
    lb --> b[Service B]
  end
  a --> db[(Regional HA database)]
  b --> db
```

## 2. Active-passive application DR
```mermaid
flowchart LR
  traffic[Traffic manager] --> primary[Primary application]
  primary --> pdb[(Primary DB)]
  subgraph dr[DR region]
    standby[Standby application] --> sdb[(Replica DB)]
  end
  pdb -->|async replication| sdb
  traffic -. failover .-> standby
```

## 3. Backup isolation boundary
```mermaid
flowchart LR
  production[(Production data)] --> backup[Backup service]
  subgraph vault[Isolated backup vault]
    backup --> immutable[(Immutable copies)]
    immutable --> retention[Retention lock]
  end
  vault --> restore[Test restore environment]
```

## 4. Cross-region object replication
```mermaid
flowchart LR
  subgraph r1[Primary region]
    app[Application] --> bucketA[(Object store A)]
  end
  subgraph r2[Recovery region]
    bucketB[(Object store B)]
  end
  bucketA -->|versioned replication| bucketB
```

## 5. Read replica scaling
```mermaid
flowchart TB
  app[Application] --> writer[(Primary DB)]
  subgraph reads[Read pool]
    app --> r1[(Read replica A)]
    app --> r2[(Read replica B)]
  end
  writer --> r1
  writer --> r2
```

## 6. Circuit-breaker boundary
```mermaid
flowchart LR
  caller[Service] --> breaker[Circuit breaker]
  breaker --> dependency[Remote dependency]
  dependency -->|failures| breaker
  breaker --> fallback[Fallback path]
  breaker --> telemetry[Breaker telemetry]
```

## 7. Bulkhead isolation
```mermaid
flowchart TB
  requests[Requests] --> router[Workload router]
  subgraph pools[Isolated resource pools]
    router --> critical[Critical pool]
    router --> standard[Standard pool]
    router --> batch[Batch pool]
  end
  critical --> dependency[Shared dependency]
  standard --> dependency
```

## 8. Retry with DLQ
```mermaid
flowchart LR
  queue[Work queue] --> worker[Worker]
  worker -->|transient failure| retry[Retry queue]
  retry --> worker
  retry -->|max attempts| dlq[DLQ]
  dlq --> ops[Operations]
```

## 9. Regional failover with quorum
```mermaid
flowchart TB
  clients[Clients] --> router[Global router]
  subgraph regions[Service regions]
    router --> r1[Region A]
    router --> r2[Region B]
    router --> r3[Region C]
  end
  r1 <-->|quorum replication| r2
  r2 <-->|quorum replication| r3
```

## 10. Dependency degradation mode
```mermaid
flowchart LR
  user[User] --> app[Application]
  app --> dependency[External dependency]
  app --> cache[(Cached data)]
  dependency -. unavailable .-> degraded[Degraded-mode controller]
  degraded --> cache
  degraded --> app
```

## 11. SLO telemetry path
```mermaid
flowchart LR
  service[Service] --> metrics[Request metrics]
  subgraph sre[SRE observability]
    metrics --> sli[SLI calculation]
    sli --> slo[SLO evaluation]
    slo --> budget[Error budget]
  end
  budget --> release[Release policy]
```

## 12. Multi-provider dependency failover
```mermaid
flowchart LR
  app[Application] --> selector[Provider selector]
  selector --> primary[Provider A]
  selector -. failover .-> secondary[Provider B]
  health[Provider health] --> selector
```

## 13. Database point-in-time recovery
```mermaid
flowchart TB
  db[(Production DB)] --> wal[Continuous log archive]
  db --> snapshots[Snapshots]
  subgraph recovery[Recovery environment]
    snapshots --> restore[Restore base]
    wal --> replay[Replay to target time]
    restore --> replay
  end
```

## 14. Ransomware-resilient backups
```mermaid
flowchart LR
  prod[(Production)] --> backup[Backup pipeline]
  subgraph protected[Protected backup boundary]
    backup --> immutable[(Immutable store)]
    immutable --> offline[(Offline copy)]
  end
  admin[Separate backup identity] --> protected
```

## 15. Regional service evacuation
```mermaid
flowchart TB
  health[Regional health] --> traffic[Global traffic manager]
  subgraph r1[Region A]
    appA[Application A]
  end
  subgraph r2[Region B]
    appB[Application B]
  end
  traffic --> appA
  traffic --> appB
  health --> evacuation[Evacuation automation]
  evacuation --> traffic
```

## 16. Cell-based architecture
```mermaid
flowchart TB
  router[Cell router]
  subgraph cellA[Cell A]
    a[App] --> adb[(DB)]
  end
  subgraph cellB[Cell B]
    b[App] --> bdb[(DB)]
  end
  router --> cellA
  router --> cellB
  tenant[Tenant assignment] --> router
```

## 17. Graceful load shedding
```mermaid
flowchart LR
  requests[Requests] --> admission[Load admission]
  admission --> critical[Critical traffic]
  admission --> optional[Optional traffic]
  capacity[Capacity signal] --> admission
  optional -. shed .-> reject[Fast rejection]
```

## 18. Chaos testing boundary
```mermaid
flowchart LR
  experiments[Chaos experiments] --> controller[Chaos controller]
  subgraph nonprod[Controlled environment]
    controller --> targets[Selected targets]
    targets --> telemetry[Resilience telemetry]
  end
  guardrails[Safety guardrails] --> controller
```

## 19. Dependency health aggregation
```mermaid
flowchart TB
  depA[Dependency A] --> health[Health aggregator]
  depB[Dependency B] --> health
  depC[Dependency C] --> health
  health --> status[Service health state]
  status --> router[Traffic policy]
  status --> ops[Operations]
```

## 20. DR command center architecture
```mermaid
flowchart TB
  monitoring[Monitoring] --> command[DR command center]
  subgraph recovery[Recovery automation]
    command --> failover[Failover orchestration]
    command --> restore[Data restoration]
    command --> validation[Business validation]
  end
  recovery --> comms[Stakeholder communications]
```