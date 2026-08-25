# Enterprise Cloud Networking Architecture Examples

## 1. Public ingress to private services
```mermaid
flowchart LR
  internet[Internet] --> waf[WAF]
  waf --> lb[Global load balancer]
  subgraph private[Private application network]
    lb --> gateway[Ingress gateway]
    gateway --> services[Private services]
  end
  services --> db[(Private database)]
```

## 2. Controlled enterprise egress
```mermaid
flowchart LR
  subgraph workloads[Private workloads]
    app[Applications] --> proxy[Egress proxy]
  end
  proxy --> firewall[Egress firewall]
  firewall --> nat[NAT]
  nat --> internet[Approved internet destinations]
  proxy --> logs[Network audit logs]
```

## 3. Hub-and-spoke cloud network
```mermaid
flowchart TB
  subgraph hub[Shared network hub]
    firewall[Central firewall]
    dns[DNS]
    nat[NAT]
  end
  subgraph spokes[Application spokes]
    prod[Production VPC]
    nonprod[Non-production VPC]
    data[Data VPC]
  end
  prod --> hub
  nonprod --> hub
  data --> hub
```

## 4. Hybrid corporate connectivity
```mermaid
flowchart LR
  subgraph onprem[Corporate data center]
    users[Corporate users]
    legacy[Legacy systems]
  end
  interconnect[Dedicated interconnect]
  subgraph cloud[Cloud network]
    router[Cloud router]
    private[Private services]
  end
  onprem --> interconnect --> router --> private
```

## 5. Active-active global regions
```mermaid
flowchart TB
  users[Global users] --> dns[Global DNS]
  dns --> lb[Global load balancer]
  subgraph r1[Region A]
    a[Application A] --> adb[(Regional DB A)]
  end
  subgraph r2[Region B]
    b[Application B] --> bdb[(Regional DB B)]
  end
  lb --> a
  lb --> b
  adb <-->|replication| bdb
```

## 6. Active-passive regional failover
```mermaid
flowchart LR
  users[Users] --> health[Health-based DNS]
  subgraph primary[Primary region]
    papp[Application] --> pdb[(Primary DB)]
  end
  subgraph secondary[Standby region]
    sapp[Standby application] --> sdb[(Replica DB)]
  end
  health --> papp
  health -. failover .-> sapp
  pdb -->|replication| sdb
```

## 7. Private service access
```mermaid
flowchart LR
  subgraph tenant[Application VPC]
    app[Application]
  end
  endpoint[Private service endpoint]
  subgraph provider[Managed service network]
    service[Managed service]
  end
  app --> endpoint --> service
```

## 8. Shared DNS architecture
```mermaid
flowchart TB
  corp[Corporate DNS] --> forwarder[Cloud DNS forwarder]
  subgraph cloud[Cloud organization]
    forwarder --> private[Private zones]
    forwarder --> public[Public zones]
    private --> apps[Internal services]
  end
```

## 9. Partner extranet boundary
```mermaid
flowchart LR
  partner[Partner network] --> vpn[Partner VPN]
  subgraph dmz[Partner DMZ]
    vpn --> b2b[B2B gateway]
  end
  subgraph internal[Internal network]
    b2b --> integration[Integration services]
    integration --> systems[Systems of record]
  end
```

## 10. Service mesh traffic boundary
```mermaid
flowchart LR
  subgraph namespaceA[Namespace A]
    a[Service A] --> aproxy[Sidecar A]
  end
  subgraph mesh[Service mesh]
    aproxy --> bproxy[Sidecar B]
  end
  subgraph namespaceB[Namespace B]
    bproxy --> b[Service B]
  end
  mesh --> telemetry[Mesh telemetry]
```

## 11. Multi-cloud private connectivity
```mermaid
flowchart LR
  subgraph cloudA[Cloud A]
    appA[Workloads A] --> routerA[Transit router A]
  end
  backbone[Private backbone]
  subgraph cloudB[Cloud B]
    routerB[Transit router B] --> appB[Workloads B]
  end
  routerA --> backbone --> routerB
```

## 12. Centralized inspection VPC
```mermaid
flowchart TB
  app1[Spoke VPC A] --> transit[Transit hub]
  app2[Spoke VPC B] --> transit
  transit --> inspect[Inspection VPC]
  subgraph inspection[Security inspection]
    inspect --> firewall[Next-gen firewall]
    firewall --> ids[IDS/IPS]
  end
  ids --> external[External networks]
```

## 13. Private API exposure
```mermaid
flowchart LR
  consumer[Consumer VPC] --> endpoint[Private endpoint]
  subgraph provider[Provider VPC]
    endpoint --> lb[Internal load balancer]
    lb --> api[Private API]
  end
  api --> auth[Service authorization]
```

## 14. Internet-facing SaaS edge
```mermaid
flowchart LR
  user[User] --> cdn[CDN]
  cdn --> waf[WAF]
  subgraph edge[Application edge]
    waf --> lb[Load balancer]
    lb --> gateway[API gateway]
  end
  gateway --> app[Application services]
```

## 15. Regional data residency routing
```mermaid
flowchart TB
  user[User request] --> residency[Residency router]
  subgraph eu[EU boundary]
    euapp[EU application] --> eudb[(EU data)]
  end
  subgraph us[US boundary]
    usapp[US application] --> usdb[(US data)]
  end
  residency -->|EU tenant| euapp
  residency -->|US tenant| usapp
```

## 16. Bastionless administration
```mermaid
flowchart LR
  admin[Administrator] --> idp[Enterprise IdP]
  idp --> access[Identity-aware access service]
  subgraph private[Private network]
    access --> ssh[Managed SSH endpoint]
    ssh --> host[Private host]
  end
```

## 17. Layer-7 east-west gateway
```mermaid
flowchart LR
  subgraph domainA[Domain A]
    a[Service A]
  end
  gateway[Internal API gateway]
  subgraph domainB[Domain B]
    b[Service B]
  end
  a --> gateway --> b
  gateway --> policy[Authz + rate limits]
```

## 18. Network telemetry architecture
```mermaid
flowchart LR
  vpc[Flow logs] --> collector[Network collector]
  firewall[Firewall logs] --> collector
  dns[DNS logs] --> collector
  subgraph observability[Network observability]
    collector --> lake[(Log lake)]
    collector --> detect[Detection]
    lake --> analytics[Analytics]
  end
```

## 19. Split-horizon application access
```mermaid
flowchart TB
  external[External user] --> publicDns[Public DNS]
  employee[Employee] --> privateDns[Private DNS]
  publicDns --> publicLb[Public load balancer]
  privateDns --> privateLb[Internal load balancer]
  subgraph app[Shared application]
    publicLb --> service[Service]
    privateLb --> service
  end
```

## 20. API gateway per security zone
```mermaid
flowchart TB
  internet[Internet] --> ext[External gateway]
  partners[Partners] --> partner[Partner gateway]
  employees[Employees] --> internal[Internal gateway]
  subgraph services[Enterprise services]
    ext --> publicApi[Public APIs]
    partner --> partnerApi[Partner APIs]
    internal --> adminApi[Internal APIs]
  end
```