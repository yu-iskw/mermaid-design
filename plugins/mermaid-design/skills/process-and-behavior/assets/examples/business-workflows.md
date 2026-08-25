# Enterprise Business Workflow Examples

## 1. Enterprise customer onboarding
```mermaid
flowchart LR
  sales[Contract signed] --> account[Create customer account]
  account --> security[Security onboarding]
  account --> billing[Billing setup]
  security --> provision[Provision tenant]
  billing --> provision
  provision --> success[Customer success handoff]
```

## 2. Purchase-to-pay
```mermaid
flowchart LR
  requester[Purchase request] --> manager[Manager approval]
  manager --> procurement[Procurement]
  procurement --> po[Purchase order]
  po --> supplier[Supplier]
  supplier --> invoice[Invoice]
  invoice --> match[Three-way match]
  match --> pay[Payment]
```

## 3. Quote-to-cash
```mermaid
flowchart LR
  lead[Opportunity] --> quote[Quote]
  quote --> approval[Discount approval]
  approval --> contract[Contract]
  contract --> order[Order]
  order --> invoice[Invoice]
  invoice --> payment[Payment]
```

## 4. Order fulfillment
```mermaid
stateDiagram-v2
  [*] --> Pending
  Pending --> Paid
  Paid --> Picking
  Picking --> Shipped
  Shipped --> Delivered
  Pending --> Cancelled
  Paid --> Refunded
  Delivered --> [*]
```

## 5. Support escalation
```mermaid
flowchart LR
  customer[Customer ticket] --> l1[L1 support]
  l1 -->|resolved| close[Close]
  l1 -->|technical| l2[L2 support]
  l2 -->|product defect| engineering[Engineering]
  engineering --> fix[Fix / workaround]
  fix --> l2 --> close
```

## 6. Customer complaint handling
```mermaid
flowchart LR
  complaint[Complaint received] --> acknowledge[Acknowledge]
  acknowledge --> investigate[Investigate]
  investigate --> outcome[Determine outcome]
  outcome --> remedy[Remedy customer]
  remedy --> feedback[Record root cause + feedback]
```

## 7. Employee onboarding
```mermaid
flowchart TB
  hire[Offer accepted] --> hr[HR record]
  hr --> identity[Create identity]
  hr --> equipment[Order equipment]
  identity --> access[Provision baseline access]
  equipment --> start[Start date]
  access --> start
```

## 8. Employee transfer
```mermaid
flowchart LR
  transfer[Role transfer] --> old[Review old access]
  transfer --> new[Determine new access]
  old --> revoke[Revoke obsolete access]
  new --> approve[Approve new access]
  approve --> provision[Provision]
  revoke --> verify[Access certification]
  provision --> verify
```

## 9. Expense reimbursement
```mermaid
flowchart LR
  employee[Submit expense] --> validation[Policy validation]
  validation --> manager[Manager approval]
  manager --> finance[Finance review]
  finance --> payroll[Reimburse]
  payroll --> archive[Archive evidence]
```

## 10. Contract renewal
```mermaid
flowchart LR
  reminder[Renewal reminder] --> owner[Business owner review]
  owner --> value[Usage/value assessment]
  value --> negotiate[Commercial negotiation]
  negotiate --> legal[Legal review]
  legal --> signature[Renew contract]
```

## 11. Vendor offboarding
```mermaid
flowchart LR
  terminate[Vendor termination] --> access[Revoke access]
  terminate --> data[Return/delete data]
  terminate --> finance[Close payments]
  access --> evidence[Collect evidence]
  data --> evidence
  finance --> evidence
```

## 12. Lead qualification
```mermaid
stateDiagram-v2
  [*] --> New
  New --> Qualified: fit + intent
  New --> Disqualified
  Qualified --> Opportunity
  Opportunity --> Won
  Opportunity --> Lost
  Won --> [*]
  Lost --> [*]
```

## 13. High-risk customer onboarding
```mermaid
flowchart LR
  application[Customer application] --> kyc[KYC]
  kyc --> sanctions[Sanctions screening]
  sanctions --> risk[Risk scoring]
  risk -->|low| onboard[Onboard]
  risk -->|high| enhanced[Enhanced due diligence]
  enhanced --> compliance[Compliance approval]
  compliance --> onboard
```

## 14. Refund approval
```mermaid
flowchart LR
  request[Refund request] --> validate[Validate eligibility]
  validate --> amount{Above threshold?}
  amount -->|no| refund[Issue refund]
  amount -->|yes| manager[Manager approval]
  manager --> refund
  refund --> notify[Notify customer]
```

## 15. Enterprise trial conversion
```mermaid
flowchart LR
  trial[Trial starts] --> adoption[Monitor adoption]
  adoption --> review[Success review]
  review --> security[Enterprise security review]
  security --> commercial[Commercial agreement]
  commercial --> production[Production subscription]
```

## 16. Account closure
```mermaid
flowchart LR
  request[Closure request] --> verify[Verify authority]
  verify --> obligations[Check balances/obligations]
  obligations --> export[Offer data export]
  export --> deactivate[Deactivate services]
  deactivate --> retain[Apply retention policy]
```

## 17. Procurement intake lanes
```mermaid
flowchart LR
  subgraph business[Business owner]
    need[Define need] --> request[Submit request]
  end
  subgraph procurement[Procurement]
    request --> source[Source vendor]
    source --> negotiate[Negotiate]
  end
  subgraph controls[Control functions]
    negotiate --> security[Security]
    negotiate --> legal[Legal]
  end
  controls --> award[Award]
```

## 18. SLA breach handling
```mermaid
flowchart LR
  monitor[SLA monitor] --> breach[Breach detected]
  breach --> owner[Service owner]
  owner --> customer[Notify customer]
  owner --> remedy[Implement remedy]
  remedy --> credit[Calculate service credit]
  credit --> review[Prevent recurrence]
```

## 19. Business continuity invocation
```mermaid
flowchart LR
  disruption[Business disruption] --> assess[Impact assessment]
  assess --> invoke[Invoke continuity plan]
  invoke --> alternate[Move to alternate process/site]
  alternate --> operate[Operate in continuity mode]
  operate --> recover[Return to normal]
```

## 20. Customer lifecycle
```mermaid
stateDiagram-v2
  [*] --> Prospect
  Prospect --> Trial
  Trial --> Active
  Active --> Suspended: payment/risk issue
  Suspended --> Active: remediated
  Active --> Churned
  Churned --> [*]
```