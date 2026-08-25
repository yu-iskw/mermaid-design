# Enterprise Identity and Access Behavior Examples

## 1. Workforce SSO login
```mermaid
sequenceDiagram
  actor U as Employee
  participant A as Application
  participant I as Enterprise IdP
  U->>A: Open application
  A->>I: Redirect for authentication
  I->>U: MFA challenge
  U->>I: Complete MFA
  I-->>A: Authorization code
  A-->>U: Authenticated session
```

## 2. OIDC token refresh
```mermaid
sequenceDiagram
  participant App
  participant IdP
  participant API
  App->>API: Access token
  API-->>App: 401 expired
  App->>IdP: Refresh token
  IdP-->>App: New access token
  App->>API: Retry request
```

## 3. SCIM joiner provisioning
```mermaid
sequenceDiagram
  participant HR as HRIS
  participant IdP
  participant SaaS
  HR->>IdP: Employee created
  IdP->>SaaS: SCIM create user
  SaaS-->>IdP: User ID
  IdP->>SaaS: Assign groups
  SaaS-->>IdP: Provisioned
```

## 4. Leaver deprovisioning
```mermaid
flowchart LR
  hr[Employment terminated] --> idp[Disable identity]
  idp --> sessions[Revoke sessions]
  subgraph downstream[Connected applications]
    idp --> saas[Disable SaaS accounts]
    idp --> cloud[Remove cloud roles]
    idp --> vpn[Disable remote access]
  end
  downstream --> audit[Record completion]
```

## 5. Step-up authentication
```mermaid
sequenceDiagram
  actor U as User
  participant A as Application
  participant R as Risk Engine
  participant I as IdP
  U->>A: Sensitive action
  A->>R: Evaluate session risk
  R-->>A: Step-up required
  A->>I: Request stronger auth
  I->>U: FIDO2 challenge
  U->>I: Verify
  I-->>A: Elevated assurance
```

## 6. Privileged access request
```mermaid
flowchart LR
  admin[Admin requests access] --> manager[Manager approval]
  manager --> security[Security approval]
  subgraph pam[PAM workflow]
    security --> jit[Issue JIT privilege]
    jit --> session[Privileged session]
    session --> revoke[Auto revoke]
  end
  revoke --> audit[Audit record]
```

## 7. Break-glass access
```mermaid
sequenceDiagram
  actor O as On-call
  participant V as Break-glass Vault
  participant P as Production
  participant S as SOC
  O->>V: Request emergency credential
  V->>S: Trigger emergency alert
  V-->>O: Time-limited credential
  O->>P: Emergency access
  P-->>S: Stream session audit
```

## 8. Workload identity token exchange
```mermaid
sequenceDiagram
  participant W as Workload
  participant I as Identity Service
  participant T as Target API
  W->>I: Present workload identity
  I-->>W: Scoped token
  W->>T: API request + token
  T->>I: Validate token
  I-->>T: Valid + claims
  T-->>W: Response
```

## 9. OAuth delegated tool access
```mermaid
sequenceDiagram
  actor U as User
  participant A as Agent
  participant I as OAuth Server
  participant T as Enterprise Tool
  A->>U: Request tool permission
  U->>I: Approve delegated scope
  I-->>A: Scoped token
  A->>T: Tool call
  T-->>A: Result
```

## 10. Access recertification
```mermaid
flowchart TB
  schedule[Quarterly trigger] --> snapshot[Snapshot current access]
  snapshot --> owners[Send to resource owners]
  subgraph review[Certification review]
    owners --> keep[Keep]
    owners --> remove[Remove]
    owners --> escalate[Needs investigation]
  end
  remove --> revoke[Revoke access]
  review --> evidence[Certification evidence]
```

## 11. Password reset with identity proofing
```mermaid
sequenceDiagram
  actor U as User
  participant P as Reset Portal
  participant I as Identity Proofing
  participant D as Directory
  U->>P: Request reset
  P->>I: Verify identity
  I-->>P: Verified
  P->>D: Set new credential
  D-->>U: Confirm reset
```

## 12. Device enrollment
```mermaid
flowchart LR
  employee[Employee] --> enroll[Enrollment portal]
  enroll --> identity[Verify identity]
  identity --> mdm[Register device]
  subgraph posture[Device trust]
    mdm --> policy[Apply baseline policy]
    policy --> cert[Issue device certificate]
  end
  cert --> access[Enable corporate access]
```

## 13. Risk-based access denial
```mermaid
sequenceDiagram
  actor U as User
  participant A as App
  participant R as Risk Engine
  U->>A: Sign in
  A->>R: Evaluate context
  alt acceptable risk
    R-->>A: Allow
    A-->>U: Session
  else high risk
    R-->>A: Deny
    A-->>U: Access blocked
  end
```

## 14. Role request workflow
```mermaid
flowchart LR
  user[User requests role] --> manager[Manager approval]
  manager --> owner[Role owner approval]
  owner --> sod[SoD check]
  sod -->|pass| provision[Provision role]
  sod -->|conflict| reject[Reject / remediate]
  provision --> audit[Audit]
```

## 15. Service account creation
```mermaid
flowchart TB
  team[Team request] --> owner[Assign accountable owner]
  owner --> purpose[Document purpose]
  subgraph controls[Service-account controls]
    purpose --> scope[Least-privilege scopes]
    scope --> create[Create identity]
    create --> rotation[Configure rotation]
  end
  controls --> register[Asset register]
```

## 16. Certificate renewal
```mermaid
sequenceDiagram
  participant W as Workload
  participant CA
  participant R as Renewal Controller
  R->>W: Detect certificate nearing expiry
  R->>CA: Request renewed certificate
  CA-->>R: New certificate
  R->>W: Hot-reload certificate
  W-->>R: Healthy with new cert
```

## 17. Session revocation after compromise
```mermaid
flowchart LR
  soc[SOC flags account] --> idp[Disable account]
  idp --> sessions[Revoke active sessions]
  sessions --> tokens[Revoke refresh tokens]
  tokens --> apps[Propagate logout]
  apps --> evidence[Record revocation status]
```

## 18. Temporary contractor access
```mermaid
stateDiagram-v2
  [*] --> Requested
  Requested --> Approved: sponsor + owner approve
  Approved --> Active: start date
  Active --> Suspended: risk event
  Suspended --> Active: cleared
  Active --> Expired: end date
  Expired --> [*]
```

## 19. API key rotation
```mermaid
flowchart LR
  old[Old key active] --> create[Create new key]
  create --> dual[Dual-key acceptance]
  dual --> migrate[Migrate callers]
  migrate --> verify[Verify old key unused]
  verify --> revoke[Revoke old key]
```

## 20. Privileged session lifecycle
```mermaid
stateDiagram-v2
  [*] --> Requested
  Requested --> Approved
  Approved --> Active: credential issued
  Active --> Closed: user exits
  Active --> Terminated: timeout / policy violation
  Closed --> Audited
  Terminated --> Audited
  Audited --> [*]
```