---
name: mermaid-design
description: Design, improve, review, or repair professional Mermaid diagrams for Markdown and GitHub. Use when the user asks for a diagram, architecture visualization, flowchart, sequence, state, ER, class, journey, Gantt, timeline, mindmap, quadrant, git graph, process model, or any diagram that must render on GitHub—even if they do not name Mermaid.
---

# Mermaid Design

Semantic intent is canonical. Mermaid is the GitHub-native compiler target.

## Output contract

1. Deliver editable Mermaid source in a fenced `mermaid` block (or a `.md`/`.mmd` file). Rendered PNG/SVG never replaces source.
2. Default renderer profile is `github` (conservative). Do not assume newest Mermaid equals GitHub's version.
3. Prefer the simplest grammar that preserves the intended semantics. Flowchart is the universal *fallback*, not the universal first choice.
4. Prefer prose or a Markdown table when a diagram would not clarify the answer.
5. Keep diagrams readable in GitHub light and dark themes; never encode critical meaning by color alone.

## Progressive load policy

Load only what the current task needs. Typical path:

```text
SKILL.md
+ 0–1 references/patterns/<pattern>.md
+ 1 references/syntax/<grammar>.md
+ references/compatibility.md when GitHub/version-sensitive
```

Do not preload every pattern or syntax file. Load `references/design.md` for redesigns and editorial reviews.

## Workflow

### 1. Decide whether a diagram helps

If a short paragraph or table answers the question more clearly, say so and stop—or emit the table instead of Mermaid.

### 2. Identify the dominant question

| If the question is… | Prefer |
|---|---|
| What exists and how is it connected? | Flowchart (+ subgraphs) |
| What happens next / who communicates when? | Sequence (actors+messages) or Flowchart (steps) |
| What states exist? | State |
| What entities/classes relate? | ER or Class |
| When will work happen? | Gantt or Timeline |
| How should concepts decompose? | Mindmap |
| How do choices compare on two axes? | Quadrant |
| What does a user experience? | User Journey |
| How do branches evolve? | GitGraph |

Selection heuristic:

```text
Does time/order matter?
├─ yes → Sequence (messages) | Gantt (tasks) | Timeline (events)
└─ no
   ├─ states/transitions → State
   ├─ entities/relationships → ER or Class
   ├─ hierarchy/containment → Mindmap
   ├─ two-axis positioning → Quadrant
   └─ components/connections → Flowchart
```

### 3. Optionally load one semantic pattern

When the request matches a reusable structure, open exactly one of:

- `references/patterns/secure-paved-road.md`
- `references/patterns/current-target.md`
- `references/patterns/fan-in-bottleneck.md`
- `references/patterns/control-data-plane.md`
- `references/patterns/source-transform-serve.md`
- `references/patterns/producer-broker-consumer.md`
- `references/patterns/request-authorize-execute.md`
- `references/patterns/human-agent-tool.md`
- `references/patterns/observe-decide-act-learn.md`

One pattern is normally primary. If two patterns both need full treatment, produce separate overview/detail diagrams.

### 4. Load one syntax reference

Open the matching file under `references/syntax/` (`flowchart.md`, `sequence.md`, `state.md`, `er.md`, `class.md`, `gantt.md`, `timeline.md`, `mindmap.md`, `quadrant.md`, `user-journey.md`, `gitgraph.md`). Adapt its minimal example; do not invent exotic syntax.

### 5. Resolve capability

For GitHub-facing work, follow `references/compatibility.md`. Tier B/modern grammars degrade to the listed Tier A fallbacks when support is unknown.

### 6. Respect complexity budgets

| Grammar | Recommended | Split near |
|---|---:|---:|
| Flowchart | ≤12 nodes | ~18 |
| Sequence | ≤5 actors | 7 |
| State | ≤10 states | 15 |
| ER | ≤8 entities | 12 |
| Class | ≤8 classes | 12 |
| Gantt | ≤15 tasks | 25 |
| Timeline | ≤12 events | 18 |
| Mindmap | ≤4 levels | 5 |
| Quadrant | ≤12 items | 20 |

Over budget → overview + detail, not micro-type.

### 7. Taste gate (before returning)

- Does this answer one primary question?
- Is this grammar better than a generic flowchart?
- Would a table or paragraph be better?
- Can any node, edge, or label be removed or merged?
- Is reading direction obvious? Are groups semantically meaningful?
- Within budget? Compatible with the renderer profile?
- Is the source concise and reviewable in a Git diff?

## Improvement requests

Preserve semantics first. Repair syntax, then hierarchy, boundaries, layout, and wording. Do not silently change system behavior for aesthetics.
