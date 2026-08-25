# Enterprise Identity and Security Architecture Examples

## 1. Workforce SSO boundary
```mermaid
flowchart LR
  employee[Employee] --> browser[Browser]
  browser --> idp[Enterprise IdP]
  subgraph app[Internal application boundary]
    gateway[SSO gateway] --> api[Application API]
  end
  idp -->|OIDC assertion| gateway
  api --> data[(Application data)]
```

## 2. Zero-trust access proxy
```mermaid
flowchart LR
  user[User] --> posture[Device posture]
  posture --> policy[Access policy]
  subgraph access[Zero-trust access plane]
    policy --> proxy[Identity-aware proxy]
    proxy --> app[Private application]
  end
  proxy --> audit[Access audit]
```

## 3. Service-to-service workload identity
```mermaid
flowchart LR
  subgraph cluster[Runtime boundary]
    svcA[Service A] --> token[Workload identity token]
    token --> svcB[Service B]
  end
  issuer[Identity issuer] --> token
  svcB --> policy[Authorization policy]
```

## 4. Privileged access management
```mermaid
flowchart TB
  admin[Administrator] --> pam[PAM portal]
  subgraph privileged[Privileged access boundary]
    pam --> approval[Approval]
    approval --> jit[Just-in-time credential]
    jit --> target[Privileged target]
  end
  target --> session[Session recording]
  session --> audit[(Audit archive)]
```

## 5. Secrets delivery with workload identity
```mermaid
flowchart LR
  workload[Workload] --> identity[Workload identity]
  identity --> vault[Secrets manager]
  subgraph runtime[Application runtime]
    workload --> client[Secret client]
    vault -->|short-lived secret| client
  end
  vault --> audit[Secret-access audit]
```

## 6. Key management hierarchy
```mermaid
flowchart TB
  hsm[HSM root key] --> kek[Key-encryption key]
  subgraph application[Application boundary]
    kek --> dek1[Data key A]
    kek --> dek2[Data key B]
    dek1 --> db[(Database)]
    dek2 --> object[(Object storage)]
  end
```

## 7. API authorization enforcement
```mermaid
flowchart LR
  client[Client] --> gateway[API gateway]
  gateway --> authn[Authentication]
  subgraph authorization[Authorization plane]
    authn --> pdp[Policy decision point]
    pdp --> pep[Policy enforcement point]
  end
  pep --> api[Protected API]
```

## 8. RBAC enterprise control plane
```mermaid
flowchart TB
  hr[HR system] --> directory[Enterprise directory]
  directory --> groups[Groups]
  subgraph iam[IAM control plane]
    groups --> roles[Roles]
    roles --> grants[Resource grants]
  end
  grants --> apps[Enterprise applications]
```

## 9. ABAC policy architecture
```mermaid
flowchart LR
  request[Access request] --> context[Context builder]
  subgraph policy[Policy system]
    context --> attrs[Subject + resource attributes]
    attrs --> engine[Policy engine]
    rules[(Policy rules)] --> engine
  end
  engine --> decision[Allow / deny]
```

## 10. ReBAC relationship authorization
```mermaid
flowchart LR
  app[Application] --> authz[Authorization service]
  subgraph graph[Relationship graph]
    user[User] --> team[Team]
    team --> project[Project]
    project --> resource[Resource]
  end
  graph --> authz
  authz --> decision[Permission decision]
```

## 11. SCIM provisioning architecture
```mermaid
flowchart LR
  hr[HRIS] --> idp[Enterprise IdP]
  idp --> scim[SCIM provisioning]
  subgraph saas[SaaS application]
    scim --> users[User directory]
    scim --> groups[Group directory]
  end
  users --> audit[Provisioning audit]
```

## 12. MFA enforcement path
```mermaid
flowchart LR
  user[User] --> idp[IdP]
  idp --> risk[Risk engine]
  subgraph auth[Authentication boundary]
    risk --> decision{Step-up required?}
    decision -->|yes| mfa[MFA]
    decision -->|no| token[Session token]
    mfa --> token
  end
```

## 13. Certificate authority hierarchy
```mermaid
flowchart TB
  root[Offline root CA] --> intermediate[Intermediate CA]
  subgraph issuance[Certificate issuance]
    intermediate --> workload[Workload certificates]
    intermediate --> user[User certificates]
    intermediate --> device[Device certificates]
  end
  issuance --> revocation[CRL / OCSP]
```

## 14. Security telemetry pipeline
```mermaid
flowchart LR
  endpoint[Endpoints] --> collector[Security collector]
  cloud[Cloud logs] --> collector
  identity[Identity logs] --> collector
  subgraph detection[Detection platform]
    collector --> normalize[Normalize]
    normalize --> rules[Detection rules]
    rules --> cases[Cases]
  end
  cases --> soc[SOC analysts]
```

## 15. DLP enforcement architecture
```mermaid
flowchart TB
  users[Users] --> apps[Enterprise apps]
  apps --> proxy[DLP proxy]
  subgraph dlp[DLP control plane]
    proxy --> inspect[Content inspection]
    policy[(DLP policies)] --> inspect
    inspect --> action[Allow / redact / block]
  end
  action --> destinations[Destinations]
```

## 16. Software supply-chain trust
```mermaid
flowchart LR
  source[Source] --> build[Trusted build]
  subgraph supply[Supply-chain controls]
    build --> sbom[SBOM]
    build --> sign[Artifact signing]
    sign --> registry[Trusted registry]
    policy[Admission policy] --> deploy[Deployment]
    registry --> deploy
  end
```

## 17. Security exception management
```mermaid
flowchart TB
  team[Engineering team] --> request[Exception request]
  subgraph governance[Security governance]
    request --> risk[Risk assessment]
    risk --> approval[Security approval]
    approval --> register[(Exception register)]
  end
  register --> expiry[Expiry review]
```

## 18. Break-glass access architecture
```mermaid
flowchart LR
  operator[On-call operator] --> vault[Break-glass vault]
  subgraph emergency[Emergency access boundary]
    vault --> approval[Emergency approval]
    approval --> credential[Temporary credential]
    credential --> production[Production]
  end
  production --> alert[SOC alert]
  production --> audit[Immutable audit]
```

## 19. Tenant encryption isolation
```mermaid
flowchart TB
  subgraph ta[Tenant A]
    appA[App A] --> keyA[Key A]
    keyA --> dataA[(Encrypted data A)]
  end
  subgraph tb[Tenant B]
    appB[App B] --> keyB[Key B]
    keyB --> dataB[(Encrypted data B)]
  end
  kms[Central KMS] --> keyA
  kms --> keyB
```

## 20. Policy-as-code enforcement
```mermaid
flowchart LR
  repo[Policy repository] --> test[Policy tests]
  subgraph enforcement[Policy distribution]
    test --> bundle[Signed policy bundle]
    bundle --> cicd[CI/CD gate]
    bundle --> runtime[Runtime policy engine]
    bundle --> cloud[Cloud policy controller]
  end
  enforcement --> evidence[Compliance evidence]
```