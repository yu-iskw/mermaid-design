# Compatibility

Default renderer profile for this skill is `github`.

## Profiles

### `github` — default

```yaml
renderer: github
version: unknown
compatibility: conservative
experimental: false
external_icons: false
fallbacks: true
```

Use Tier A grammars. Treat Tier B as capability-gated: verify support or apply the fallback table below.

### `mermaid-11` (optional)

```yaml
renderer: mermaid
major_version: 11
compatibility: version-aware
modern_diagrams: true
experimental: selective
```

Use only when the user explicitly targets a Mermaid 11+ renderer outside GitHub.

### `latest` (optional)

```yaml
renderer: mermaid
version: latest
compatibility: permissive
experimental: allowed
```

Use only when the user explicitly accepts newest/experimental syntax.

## Required delivery form

For Markdown intended for GitHub, emit a fenced `mermaid` block and keep that source even if a PNG/SVG preview is also produced.

## Tier A — GitHub-first (no special verification)

Conservative features of:

- flowchart / graph
- sequenceDiagram
- stateDiagram-v2
- erDiagram
- classDiagram
- gantt
- timeline
- mindmap
- quadrantChart
- journey
- gitGraph

Avoid recently introduced directives inside these families unless necessary.

## Tier B — capability-gated

Architecture, swimlanes, Sankey, block, Kanban, XY, radar, packet, treemap, Venn, Ishikawa, TreeView, event modeling, Wardley, Cynefin, requirement, ZenUML, C4, use case, and other beta/experimental families.

Supporting a syntax does not imply automatically selecting it. Prefer the simplest grammar that preserves semantics. Pie charts are often worse than a table.

## Preferred → conservative fallback

| Preferred | Conservative fallback |
|---|---|
| Architecture | Flowchart + subgraphs |
| Swimlane | Flowchart + subgraphs by owner |
| Use Case | Flowchart |
| C4 | Flowchart |
| ZenUML | Sequence |
| Ishikawa | Flowchart into a problem node |
| TreeView | Mindmap |
| Event Modeling | Flowchart / Sequence |
| Kanban | Markdown table / Flowchart by status |
| Treemap | Table |
| Radar | Table / prose |
| Cynefin | Quadrant / Flowchart |
| Venn | Flowchart / prose / table |
| Wardley | Quadrant/flowchart plus axis notes |
| Sankey | Weighted flowchart labels or table |
| XY chart | Table |

Fallbacks must preserve semantics, not merely imitate appearance.

## GitHub-safe rules

- Fenced `mermaid` blocks only (no HTML script tags).
- Plain text labels; quote punctuation-heavy labels.
- No click callbacks, arbitrary JavaScript, or external CSS required for meaning.
- No external icon packs for core meaning.
- Theme-specific color must not be the only carrier of meaning.
- When repository rendering is a hard requirement, favor semantic portability over novelty.

## Verification note

GitHub's deployed Mermaid version can lag upstream. A successful local latest-CLI render does not prove GitHub compatibility. When the exact UI can be tested, use that information to allow Tier B; otherwise stay conservative.
