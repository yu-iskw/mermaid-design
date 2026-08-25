# Diagram Selection

Choose by the reader's question, not by the domain vocabulary.

| Reader question | Preferred Mermaid family | Typical uses |
|---|---|---|
| What connects to what? | `flowchart` | system context, topology, dependency, data flow |
| What happens in time between actors? | `sequenceDiagram` | API calls, authentication, distributed workflows |
| Who owns which step? | `flowchart` with subgraphs; `swimlanes` only when target support is verified | business process, handoffs, incident response |
| What states can something enter? | `stateDiagram-v2` | lifecycle, workflow engine, protocol state |
| What types and relationships exist? | `classDiagram` | object/domain/API models |
| What data entities relate? | `erDiagram` | logical schemas, analytics models |
| What does a user experience? | `journey` | service/user journey |
| What occurs over calendar time? | `gantt` or `timeline` | plan, rollout, history |
| How do branches and commits evolve? | `gitGraph` | release/branch strategy |
| How should concepts be decomposed? | `mindmap` | taxonomy, discovery, scope |
| How do choices compare on two axes? | `quadrantChart` | portfolio/positioning |
| What proportions make a whole? | `pie` | small categorical part-to-whole views |
| How does quantity flow between stages? | `sankey-beta` when verified, otherwise weighted flowchart | conversion, cost, traffic |
| How does a metric change? | `xychart-beta` when verified | trend or category comparison |
| What is deployed where? | `architecture-beta` when verified, otherwise flowchart | infrastructure topology |
| What work is queued by stage? | `kanban` when verified, otherwise subgraphed flowchart | work/status boards |
| What binary/network fields exist? | `packet-beta` when verified | packet layouts |
| What structural blocks compose a system? | `block-beta` when verified | hardware/logical layout |

## Version-sensitive families

Mermaid evolves faster than GitHub's embedded renderer. Treat these as version-sensitive unless the target GitHub Mermaid version is known to support them: swimlanes, architecture, radar, event modeling, treemap, Venn, Ishikawa, Wardley, Cynefin, tree view, ZenUML, packet, block, Kanban, XY, Sankey, and other beta/experimental families.

For a GitHub deliverable, preserving renderability is more important than using the newest family. Translate the semantic pattern into a stable flowchart/sequence/state/class/ER representation when support is uncertain.
