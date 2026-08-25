# Enterprise Approval and Governance Behavior Examples

## 1. Security exception approval
```mermaid
flowchart LR
  team[Team submits exception] --> owner[Control owner review]
  owner --> risk[Risk assessment]
  risk --> approver[Security approver]
  approver -->|approve| register[Exception register]
  approver -->|reject| remediate[Remediate control gap]
```

## 2. Data access approval
```mermaid
flowchart LR
  analyst[Analyst requests dataset] --> manager[Manager approval]
  manager --> owner[Data owner approval]
  owner --> privacy[Privacy check]
  privacy --> provision[Provision access]
  provision --> expiry[Set expiry]
```

## 3. Production access approval
```mermaid
sequenceDiagram
  actor E as Engineer
  participant M as Manager
  participant O as Service Owner
  participant PAM
  E->>M: Request production access
  M-->>E: Approve
  E->>O: Request service authorization
  O->>PAM: Approve scoped role
  PAM-->>E: Time-bound access
```

## 4. Vendor onboarding
```mermaid
flowchart LR
  sponsor[Business sponsor] --> intake[Vendor intake]
  intake --> security[Security review]
  intake --> privacy[Privacy review]
  intake --> legal[Legal review]
  security --> decision[Approval decision]
  privacy --> decision
  legal --> decision
  decision --> onboard[Onboard vendor]
```

## 5. Architecture review
```mermaid
flowchart TB
  team[Product team] --> proposal[Architecture proposal]
  proposal --> reviewers[Architecture reviewers]
  reviewers --> findings[Findings]
  findings --> decision{Material risks?}
  decision -->|no| approve[Approve]
  decision -->|yes| revise[Revise design]
  revise --> reviewers
```

## 6. Privacy impact assessment
```mermaid
flowchart LR
  change[New processing activity] --> screening[Privacy screening]
  screening -->|low risk| record[Record assessment]
  screening -->|high risk| dpia[DPIA]
  dpia --> mitigations[Define mitigations]
  mitigations --> dpo[DPO approval]
  dpo --> launch[Permit launch]
```

## 7. AI use-case approval
```mermaid
flowchart LR
  owner[Use-case owner] --> intake[AI risk intake]
  intake --> data[Data review]
  intake --> safety[Model safety review]
  intake --> legal[Legal review]
  data --> committee[AI governance committee]
  safety --> committee
  legal --> committee
  committee --> decision[Approve / conditions / reject]
```

## 8. Open-source dependency exception
```mermaid
flowchart LR
  developer[Developer] --> request[License/security exception]
  request --> legal[License review]
  request --> security[Security review]
  legal --> owner[Engineering owner]
  security --> owner
  owner --> decision[Approve or replace]
```

## 9. Change freeze exception
```mermaid
flowchart LR
  requester[Requester] --> justification[Business justification]
  justification --> risk[Operational risk]
  risk --> executive[Executive approver]
  executive -->|approve| execute[Execute under enhanced monitoring]
  executive -->|reject| defer[Defer until freeze ends]
```

## 10. High-value payment approval
```mermaid
flowchart LR
  initiator[Payment initiator] --> validation[Validate payment]
  validation --> approver1[First approver]
  approver1 --> approver2[Independent second approver]
  approver2 --> execute[Execute payment]
  execute --> audit[Immutable audit]
```

## 11. Customer data export approval
```mermaid
flowchart LR
  request[Export request] --> owner[Data owner]
  owner --> purpose[Verify purpose]
  purpose --> dlp[DLP review]
  dlp --> encrypt[Prepare encrypted export]
  encrypt --> release[Release to approved recipient]
```

## 12. Policy change lifecycle
```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Review
  Review --> Approved: accepted
  Review --> Draft: changes requested
  Approved --> Effective: effective date
  Effective --> Retired: superseded
  Retired --> [*]
```

## 13. Risk acceptance lifecycle
```mermaid
stateDiagram-v2
  [*] --> Identified
  Identified --> Assessed
  Assessed --> Mitigating
  Assessed --> Accepted
  Accepted --> ReviewDue
  ReviewDue --> Accepted: renew
  ReviewDue --> Mitigating: no longer acceptable
  Mitigating --> Closed
```

## 14. Records destruction approval
```mermaid
flowchart LR
  retention[Retention period reached] --> legal[Check legal holds]
  legal -->|hold exists| preserve[Preserve records]
  legal -->|no hold| owner[Record owner approval]
  owner --> destroy[Controlled destruction]
  destroy --> certificate[Destruction evidence]
```

## 15. New cloud service approval
```mermaid
flowchart LR
  team[Team requests service] --> architecture[Architecture fit]
  architecture --> security[Security review]
  security --> procurement[Commercial/procurement review]
  procurement --> catalog[Add to approved-service catalog]
```

## 16. Data classification exception
```mermaid
flowchart LR
  owner[Data owner] --> request[Classification exception]
  request --> privacy[Privacy review]
  request --> security[Security review]
  privacy --> decision[Governance decision]
  security --> decision
  decision --> expiry[Time-bound exception]
```

## 17. Regulatory evidence sign-off
```mermaid
sequenceDiagram
  participant C as Control Owner
  participant A as Assurance
  participant E as Evidence Store
  participant R as Regulatory Reporting
  C->>E: Submit evidence
  A->>E: Review evidence
  A-->>C: Request remediation if incomplete
  A->>R: Sign off control evidence
```

## 18. Segregation-of-duties conflict
```mermaid
flowchart LR
  request[Role request] --> sod[SoD engine]
  sod -->|no conflict| approve[Approve]
  sod -->|conflict| owner[Control owner review]
  owner -->|compensating control| exception[Time-bound exception]
  owner -->|unacceptable| reject[Reject]
```

## 19. Contract approval
```mermaid
flowchart LR
  sales[Sales] --> draft[Contract draft]
  draft --> legal[Legal review]
  draft --> security[Security terms review]
  draft --> finance[Commercial review]
  legal --> signature[Authorized signature]
  security --> signature
  finance --> signature
```

## 20. Governance committee decision state
```mermaid
stateDiagram-v2
  [*] --> Submitted
  Submitted --> UnderReview
  UnderReview --> Approved
  UnderReview --> Conditional
  UnderReview --> Rejected
  Conditional --> Approved: conditions met
  Conditional --> Rejected: conditions fail
  Approved --> [*]
  Rejected --> [*]
```