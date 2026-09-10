# Renderer compatibility

The default GitHub profile has unknown Mermaid version, conservative compatibility,
experimental=false, external_icons=false, fallbacks=true. Local parse success is
not GitHub preview certification. GitHub documents using an `info` Mermaid block
to inspect its current version; check the actual destination when necessary.

Core candidates: Flowchart, Sequence, State, ER, Class, Gantt, Timeline, Mindmap,
Quadrant, User Journey, GitGraph. Use the small examples in this skill as the
baseline; avoid assuming newer features within these grammars work everywhere.

For `mermaid-11`, inspect the installed exact version and verify the requested
feature against that version's documentation or parser. For `latest`, inspect the
actual version too: the name expresses a preference, not a capability assertion.
Experimental grammars are selectable only with positive target evidence.

| Preferred grammar    | Unknown/GitHub fallback    | Meaning to preserve                               |
| -------------------- | -------------------------- | ------------------------------------------------- |
| Architecture         | Flowchart with subgraphs   | Services, connections, boundaries                 |
| Swimlane             | Flowchart grouped by owner | Step ownership and handoffs                       |
| Sankey               | Table                      | Source, destination, value and unit               |
| Block                | Flowchart or Mindmap       | Adjacency or containment, not fixed geometry      |
| Kanban               | Table                      | Card identity and status                          |
| Use Case / C4        | Flowchart                  | Actor responsibility / named abstraction level    |
| ZenUML               | Sequence                   | Ordered messages                                  |
| Ishikawa             | Flowchart                  | Causes connected to an effect                     |
| TreeView             | Mindmap                    | Hierarchy                                         |
| Event Modeling       | Sequence or Flowchart      | Event order or causal transitions                 |
| Treemap / Radar / XY | Table                      | Exact values, categories and units                |
| Cynefin              | Quadrant or prose          | Domain distinctions, without invented coordinates |
| Venn                 | Table or prose             | Explicit set membership and intersections         |
| Wardley              | Table                      | Value-chain dependencies and evolution stage      |
| Requirement          | Table                      | Requirement IDs, relationships and verification   |
| Packet               | Table                      | Field order, bit offset and width                 |

These are semantic alternatives, not visual emulations. Preserve facts that the
fallback cannot encode in accompanying text, or say it cannot faithfully replace
the specialized form. Specialized syntax references are deferred until demonstrated
value and parser coverage justify them. Do not invent syntax for these names.

Sources (reviewed 2026-09-10):

- [GitHub diagrams](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams)
- [Mermaid grammar index](https://mermaid.js.org/intro/)
- [Agent Skills specification](https://agentskills.io/specification)
