# Design review

Write the dominant communication question before editing. Inventory concepts and
relationships, then remove anything that does not help answer it. Preserve exceptions
that alter the decision; move incidental implementation details into prose.

Use one primary semantic pattern. Separate overview and detail when two independent
patterns compete. A deployment boundary is not automatically a trust boundary.
Containment, dependency, message order and data flow are different edge semantics.

Prefer one reading direction, short noun labels and short edge verbs. Group only
real ownership, deployment, stage or trust boundaries. Use labels and line structure
alongside sparse emphasis so monochrome readers retain meaning. Never rely on icons.

If layout is poor, simplify the graph, change grammar, or split it. Mermaid owns
geometry: do not add invisible dummy nodes and redundant arrows to force layout.
Use the entrypoint's complexity budgets and removal gate before returning output.
