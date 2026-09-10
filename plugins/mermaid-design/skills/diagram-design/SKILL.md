---
name: diagram-design
description: Design or improve diagrams from natural-language communication goals, choosing a semantic pattern and visual grammar before compiling to Mermaid. Use for architecture, workflows, interactions, lifecycles, data models, and planning diagrams, including GitHub documentation. Can recommend a table or prose when clearer.
---

# Diagram Design

Create professional diagrams that answer one dominant communication question.
Mermaid is the output language, not the conceptual model. The canonical sequence is
intent → semantic pattern → visual grammar → capability resolution → source → review.
This skill is portable: no host-specific tools, commands, MCP server, or icon library
are required. Claude Code and other plugin manifests are distribution adapters.

## Start with the question

Identify the audience, the decision or relationship to communicate, supplied facts,
and target renderer. Use `github` unless the user specifies another target. Do not
ask the user to choose Mermaid syntax. Ask only when a missing fact would change
meaning; otherwise state a concise assumption. Distinguish observed architecture
from a proposal. Never invent components, dates, quantities, cardinalities, ownership,
or security guarantees to fill a diagram.

If a sentence or table communicates the answer more clearly, return that instead.
A single relationship, an exact comparison, or a list is often better without a
figure. A request for a diagram still permits explaining why another form works
better, but respect an explicit requirement to deliver Mermaid.

## Choose visual grammar

| Dominant question                      | Intent          | Preferred grammar | Conservative resolution        |
| -------------------------------------- | --------------- | ----------------- | ------------------------------ |
| What exists and connects?              | System          | Architecture      | Flowchart with real boundaries |
| What happens next or branches?         | Process         | Flowchart         | Flowchart                      |
| Who owns each step?                    | Responsibility  | Swimlane          | Flowchart grouped by owner     |
| Who exchanges messages, in what order? | Interaction     | Sequence          | Sequence                       |
| Which states and transitions exist?    | Lifecycle       | State             | State                          |
| What contains what?                    | Structure       | Mindmap / Block   | Mindmap / Flowchart            |
| What entities or classes relate?       | Data model      | ER / Class        | ER / Class                     |
| When do tasks or events happen?        | Planning        | Gantt / Timeline  | Gantt / Timeline               |
| What work is in each status?           | Planning        | Kanban            | Table                          |
| How do measured quantities split?      | Quantitative    | Sankey            | Table of source, target, value |
| How are items positioned on two axes?  | Strategy        | Quadrant          | Quadrant                       |
| What does a person experience?         | Experience      | User Journey      | User Journey                   |
| How do commits branch and merge?       | Version history | GitGraph          | GitGraph                       |
| Why does an outcome occur?             | Analysis        | Ishikawa          | Causal Flowchart               |

Choose ER for persisted entities/cardinalities and Class for types/inheritance.
Sequence represents message order, not elapsed time; Gantt requires dates or durations.
State represents legal lifecycle transitions, not a generic task sequence.
Quadrant needs meaningful axes and supported positions. Do not fabricate numbers.
For specialized grammars absent from this table, consult compatibility guidance;
never guess a Mermaid keyword from a product or diagram name.

## Load only what changes the decision

Typical context is this file, one primary pattern, one resolved syntax reference,
and optionally one domain reference. Do not read the whole library. Resolve the
grammar before loading syntax, so a GitHub fallback does not cost two syntax reads.
Read [compatibility](references/compatibility.md) for modern, specialized, or
version-specific requests; the default policy is summarized below. Read
[design](references/design.md) when redesigning a crowded or low-quality figure.

Choose zero or one primary pattern from this catalog. A pattern is a semantic
relationship, not a forced template. Preserve the user's facts when adapting it.

| Relationship to communicate                  | Primary pattern reference                                                     |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| Approved route and exception route           | [Secure paved road](references/patterns/secure-paved-road.md)                 |
| Migration with an intermediate state         | [Current to target](references/patterns/current-target.md)                    |
| Work converges on a constrained resource     | [Fan-in bottleneck](references/patterns/fan-in-bottleneck.md)                 |
| Policy/configuration versus workload traffic | [Control and data planes](references/patterns/control-data-plane.md)          |
| Data lineage from sources to consumers       | [Source transform serve](references/patterns/source-transform-serve.md)       |
| Asynchronous delivery and decoupling         | [Producer broker consumer](references/patterns/producer-broker-consumer.md)   |
| Permission decision before an operation      | [Request authorize execute](references/patterns/request-authorize-execute.md) |
| Delegated tool use with human control        | [Human agent tool](references/patterns/human-agent-tool.md)                   |
| Feedback changes the next action             | [Observe decide act learn](references/patterns/observe-decide-act-learn.md)   |
| Stages with entry and exit criteria          | [Stage framework](references/patterns/stage-framework.md)                     |
| Compare allowed and denied paths             | [Paired policy traces](references/patterns/paired-policy-traces.md)           |
| Independent mitigations of residual risk     | [Compensating layers](references/patterns/compensating-security-layers.md)    |

Syntax references: [Flowchart](references/syntax/flowchart.md),
[Sequence](references/syntax/sequence.md), [State](references/syntax/state.md),
[ER](references/syntax/er.md), [Class](references/syntax/class.md),
[Gantt](references/syntax/gantt.md), [Timeline](references/syntax/timeline.md),
[Mindmap](references/syntax/mindmap.md), [Quadrant](references/syntax/quadrant.md),
[User Journey](references/syntax/user-journey.md), [GitGraph](references/syntax/gitgraph.md).
For capability-confirmed modern targets: [Architecture](references/syntax/architecture.md),
[Swimlane](references/syntax/swimlane.md), [Sankey](references/syntax/sankey.md),
[Block](references/syntax/block.md), [Kanban](references/syntax/kanban.md).

Optional domain vocabulary and modeling constraints:
[Software](references/domains/software.md), [Data/AI](references/domains/data-ai.md),
[Security](references/domains/security.md), [Sales](references/domains/sales.md),
[Finance](references/domains/finance.md). These do not override grammar or capability policy.

## Resolve renderer capabilities

Default: `renderer: github`, `version: unknown`, conservative compatibility,
no experimental grammars, external icons, HTML labels, initialization directives,
custom layout dependencies, or click handlers. Use basic core syntax rather than
assuming every feature of a core grammar is supported. Core means the project's
conservative candidate set, not a guarantee about GitHub's deployed version.

`mermaid-11` requires the actual installed minor version before using a modern
feature; a major version alone is insufficient. `latest` permits consideration of
experimental syntax but still requires actual parser/renderer capability evidence.
Neither profile authorizes imaginary syntax or external icon dependencies.

Unknown capability means use the documented semantic fallback. For example,
Architecture becomes components and real boundary subgraphs; Sankey becomes a
value table, preserving quantities rather than suggesting proportional widths.
Say briefly when a fallback changes the requested visual form. If no fallback
preserves the essential semantics, explain the limitation instead of faking it.

## Model and simplify

Use stable short identifiers distinct from human-readable labels. Use short noun
phrases for nodes and verbs or protocols for edges. One statement per line and
stable declaration order make Git diffs useful. Quote punctuation in flowchart
labels. Choose one dominant direction. Groups must mean ownership, trust zone,
stage, deployment boundary, or another real relationship.

Do not make color carry critical meaning. Use emphasis sparingly, remove redundant
arrows, and avoid decorative icons, sentence-length labels, and meaningless boxes.
An arrow must have a consistent meaning within a figure. Keep supporting caveats
outside the diagram. Split independent questions into separate overview/detail
figures; do not hide complexity by shrinking text or abbreviating everything.

| Grammar                  | Recommended maximum  | Split near |
| ------------------------ | -------------------- | ---------- |
| Flowchart / Architecture | 12 nodes / services  | 18         |
| Sequence                 | 5 actors             | 7          |
| State                    | 10 states            | 15         |
| ER / Class               | 8 entities / classes | 12         |
| Swimlane                 | 5 lanes              | 7          |
| Gantt                    | 15 tasks             | 25         |
| Timeline                 | 12 events            | 18         |
| Quadrant                 | 12 items             | 20         |
| Sankey                   | 10 nodes             | 15         |
| Mindmap                  | 4 levels             | 5          |
| User Journey             | 12 tasks             | 18         |
| GitGraph                 | 12 commits           | 18         |
| Block / Kanban           | 12 blocks / cards    | 18         |

Budgets are review heuristics, not parser limits. Count visible concepts, including
implicit nodes. If a threshold is exceeded, split or explicitly justify the exception.

## Validate and apply the taste gate

Before returning the result, check:

- Does it answer one primary question, and are all claims grounded in supplied facts?
- Is this grammar better than a generic flowchart? Would prose or a table be clearer?
- Can a node, edge, label, or group be removed or merged without losing meaning?
- Is the reading direction clear, and does each group encode real semantics?
- Is the figure within budget? If not, should an overview link to separate details?
- Does the target support this syntax and every required feature?
- Can a reader understand the diagram without color or icons?
- Is the source concise, readable, and stable in a Git diff?

When tooling is available, run the bundled validation script from the repository
as documented in its README. A parser pass validates syntax only; it does not prove
semantic quality or target rendering. Without tools, perform the review and disclose
that parsing was not run. Never claim a render or benchmark that was not performed.

Return the diagram in a Mermaid fenced block, or the better non-diagram form, with
a brief explanation of the question answered and any material assumption or fallback.
Do not include internal routing notes, the entire checklist, or loaded references in
normal user output. Render and inspect the actual target when available, especially
for large or modern diagrams. If rendering fails, simplify or apply the fallback.
