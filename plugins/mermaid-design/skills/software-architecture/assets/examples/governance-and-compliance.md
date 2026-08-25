# Enterprise Governance and Compliance Architecture Examples

## 1. Data residency boundary
```mermaid
flowchart TB
  tenant[Tenant] --> router[Residency router]
  subgraph eu[EU processing boundary]
    euApp[EU app] --> euData[(EU data)]
  end
  subgraph us[US processing boundary]
    usApp[US app] --> usData[(US data)]
  end
  router --> euApp
  router --> usApp
```

## 2. Audit evidence pipeline
```mermaid
flowchart LR
  cloud[Cloud controls] --> collector[Evidence collector]
  cicd[CI/CD controls] --> collector
  iam[IAM controls] --> collector
  subgraph evidence[Compliance evidence store]
    collector --> normalized[Normalized evidence]
    normalized --> archive[(Immutable archive)]
  end
  archive --> auditor[Auditor]
```

## 3. Policy hierarchy
```mermaid
flowchart TB
  enterprise[Enterprise policy] --> platform[Platform guardrails]
  platform --> project[Project policy]
  subgraph workloads[Workload controls]
    project --> runtime[Runtime policy]
    project --> pipeline[CI/CD policy]
  end
```

## 4. Segregation of duties
```mermaid
flowchart LR
  developer[Developer] --> change[Change request]
  change --> reviewer[Independent reviewer]
  subgraph release[Controlled release]
    reviewer --> deployer[Deployment role]
    deployer --> production[Production]
  end
  production --> audit[Audit trail]
```

## 5. Tenant control plane separation
```mermaid
flowchart TB
  admin[Platform admin] --> control[Global control plane]
  subgraph tenantA[Tenant A]
    control --> configA[Tenant config A]
    configA --> dataA[(Tenant A data)]
  end
  subgraph tenantB[Tenant B]
    control --> configB[Tenant config B]
    configB --> dataB[(Tenant B data)]
  end
```

## 6. Retention policy enforcement
```mermaid
flowchart LR
  data[(Business data)] --> classify[Data classification]
  subgraph retention[Retention control]
    classify --> policy[Retention policy]
    policy --> active[(Active tier)]
    policy --> archive[(Archive tier)]
    policy --> delete[Deletion]
  end
```

## 7. Legal hold architecture
```mermaid
flowchart LR
  records[(Records)] --> retention[Retention service]
  legal[Legal hold request] --> hold[Hold registry]
  subgraph control[Records control]
    hold --> retention
    retention --> protected[(Protected records)]
  end
```

## 8. Privacy request processing architecture
```mermaid
flowchart LR
  subject[Data subject] --> portal[Privacy portal]
  subgraph privacy[Privacy operations]
    portal --> identity[Identity verification]
    identity --> inventory[Data inventory]
    inventory --> orchestrator[Request orchestrator]
  end
  orchestrator --> systems[Systems holding subject data]
```

## 9. Consent management architecture
```mermaid
flowchart LR
  user[User] --> preference[Consent center]
  subgraph consent[Consent platform]
    preference --> store[(Consent ledger)]
    store --> api[Consent API]
  end
  api --> apps[Processing applications]
```

## 10. Enterprise risk register integration
```mermaid
flowchart TB
  scanners[Security findings] --> risk[Risk service]
  architecture[Architecture reviews] --> risk
  audit[Audit findings] --> risk
  subgraph grc[GRC platform]
    risk --> register[(Risk register)]
    register --> treatment[Risk treatment]
  end
```

## 11. Control mapping architecture
```mermaid
flowchart LR
  standards[ISO / SOC / internal standards] --> catalog[Control catalog]
  subgraph mapping[Control mapping]
    catalog --> implementations[Technical controls]
    implementations --> evidence[Evidence sources]
  end
  evidence --> assurance[Assurance review]
```

## 12. Cloud organization guardrails
```mermaid
flowchart TB
  org[Cloud organization] --> folders[Business folders]
  folders --> projects[Projects/accounts]
  subgraph guardrails[Organization guardrails]
    policy[Org policy] --> folders
    iam[IAM baseline] --> projects
    logging[Central logging] --> projects
  end
```

## 13. Environment separation
```mermaid
flowchart TB
  subgraph nonprod[Non-production boundary]
    dev[Development] --> test[Test]
  end
  gate[Promotion gate]
  subgraph prod[Production boundary]
    gate --> production[Production]
  end
  test --> gate
```

## 14. Controlled data export
```mermaid
flowchart LR
  source[(Restricted data)] --> request[Export request]
  subgraph controls[Export controls]
    request --> approval[Approval]
    approval --> dlp[DLP scan]
    dlp --> encrypt[Encryption]
  end
  encrypt --> recipient[Approved recipient]
  controls --> audit[Export audit]
```

## 15. Vendor access boundary
```mermaid
flowchart LR
  vendor[Vendor user] --> federation[Federated identity]
  federation --> proxy[Restricted access proxy]
  subgraph vendorZone[Vendor-accessible zone]
    proxy --> support[Support tooling]
  end
  support --> audit[Vendor activity audit]
```

## 16. Compliance monitoring control loop
```mermaid
flowchart LR
  resources[Cloud resources] --> scanner[Continuous scanner]
  subgraph compliance[Compliance control loop]
    scanner --> findings[Findings]
    findings --> remediation[Remediation workflow]
    remediation --> resources
  end
  findings --> evidence[(Evidence store)]
```

## 17. Data classification architecture
```mermaid
flowchart LR
  assets[Data assets] --> classifier[Classification engine]
  subgraph classification[Classification control plane]
    classifier --> labels[Classification labels]
    labels --> catalog[Data catalog]
    labels --> policy[Access + retention policy]
  end
  policy --> enforcement[Enforcement points]
```

## 18. Enterprise exception lifecycle architecture
```mermaid
flowchart TB
  team[Product team] --> exception[Exception service]
  subgraph governance[Governance boundary]
    exception --> owner[Control owner]
    owner --> register[(Exception register)]
    register --> expiry[Expiry scheduler]
  end
  expiry --> reassess[Reassessment]
```

## 19. Immutable audit logging
```mermaid
flowchart LR
  apps[Applications] --> collector[Audit collector]
  admins[Admin actions] --> collector
  subgraph archive[Immutable audit boundary]
    collector --> stream[Append-only stream]
    stream --> archiveStore[(WORM archive)]
  end
  archiveStore --> investigations[Investigations]
```

## 20. Compliance reporting platform
```mermaid
flowchart LR
  evidence[(Evidence sources)] --> normalize[Normalize]
  subgraph reporting[Compliance reporting]
    normalize --> mapping[Map to controls]
    mapping --> dashboard[Control dashboard]
    mapping --> reports[Audit reports]
  end
  reports --> auditor[External auditor]
```