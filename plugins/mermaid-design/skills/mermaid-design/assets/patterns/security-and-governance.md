# Security & Governance Patterns

## Identity boundary
```mermaid
flowchart LR
  user[User] --> idp[Identity provider]
  idp -->|token| gateway[Gateway]
  subgraph private[Private services]
    gateway --> api[API]
    api --> service[Service]
  end
  service --> policy[Authorization policy]
```

## Zero-trust access path
```mermaid
flowchart LR
  user[User] --> identity[Identity]
  device[Device posture] --> policy[Policy decision]
  identity --> policy
  policy --> proxy[Identity-aware proxy]
  subgraph private[Protected workload zone]
    proxy --> app[Application]
  end
```

## RBAC
```mermaid
flowchart LR
  user[User] --> assignment[Role assignment]
  assignment --> role[Role]
  role --> permission[Permissions]
  permission --> resource[Resource]
```

## ABAC
```mermaid
flowchart LR
  subject[Subject attributes] --> policy[Policy engine]
  resource[Resource attributes] --> policy
  context[Action + environment] --> policy
  policy --> decision{Allow / deny}
```

## ReBAC
```mermaid
flowchart LR
  user[User] -->|member_of| team[Team]
  team -->|owns| project[Project]
  project -->|contains| resource[Resource]
  user -. relationship check .-> resource
```

## Secrets delivery
```mermaid
flowchart LR
  workload[Workload] --> identity[Workload identity]
  identity --> vault[Secrets manager]
  vault -->|short-lived credential| workload
  workload --> dependency[Protected dependency]
```

## Key rotation
```mermaid
flowchart LR
  create[Create new key] --> dual[Dual key period] --> migrate[Re-encrypt / migrate] --> retire[Retire old key]
  dual --> old[(Old key)]
  dual --> new[(New key)]
```

## Threat model flow
```mermaid
flowchart LR
  attacker[Attacker]
  subgraph public[Public boundary]
    edge[Edge endpoint]
  end
  subgraph trusted[Trusted application boundary]
    app[Application]
  end
  subgraph sensitive[Sensitive data boundary]
    db[(Sensitive store)]
  end
  attacker -. entry .-> edge
  edge --> app
  app --> db
```

## Privacy data flow
```mermaid
flowchart LR
  subject[Data subject] --> collect[Collection]
  subgraph controlled[Controlled processing]
    collect --> process[Processing] --> store[(Store)]
  end
  store --> recipient[Approved recipient]
  process --> minimize[Minimization / redaction]
```

## Policy enforcement point
```mermaid
flowchart LR
  requester[Requester] --> pep[Policy enforcement point]
  pep --> pdp[Policy decision point]
  pdp --> attributes[(Attributes / policy)]
  pdp -->|decision| pep
  pep -->|allowed| resource[Resource]
```

## Audit trail
```mermaid
flowchart LR
  user[User] --> service[Service] --> resource[Resource]
  service -. decision .-> audit[(Audit log)]
  resource -. change .-> audit
  audit --> monitor[Detection / review]
```

## Governance control plane
```mermaid
flowchart TB
  subgraph workloads[Workloads]
    app[Applications]
    data[Data products]
    agents[Agents]
  end
  subgraph governance[Governance control plane]
    policy[Policy]
    catalog[Catalog]
    access[Access control]
    audit[Audit]
  end
  policy -. governs .-> app
  catalog -. describes .-> data
  access -. authorizes .-> agents
  workloads -. events .-> audit
```

## Data classification boundary
```mermaid
flowchart LR
  public[Public] --> internal[Internal] --> confidential[Confidential] --> restricted[Restricted]
  policy[Handling policy] -. applies .-> public
  policy -. applies .-> internal
  policy -. applies .-> confidential
  policy -. applies .-> restricted
```

## Break-glass access
```mermaid
flowchart LR
  operator[Operator] --> request[Emergency request] --> approval{Break-glass approval}
  approval -->|approved| temporary[Temporary elevated access]
  temporary --> system[Protected system]
  temporary --> audit[(Enhanced audit)]
  temporary --> revoke[Automatic revocation]
```

## Supply-chain trust boundary
```mermaid
flowchart LR
  source[Source] --> build[Build]
  subgraph trusted[Trusted pipeline]
    build --> sign[Sign artifact] --> registry[(Artifact registry)]
  end
  registry --> verify[Verify signature] --> deploy[Deploy]
```
