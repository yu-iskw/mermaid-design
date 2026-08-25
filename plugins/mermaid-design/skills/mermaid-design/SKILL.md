---
name: mermaid-design
description: Design, improve, review, or repair professional Mermaid diagrams for Markdown and GitHub. Use when the user asks for a Mermaid diagram, architecture visualization, flowchart, sequence, class, state, ER, journey, Gantt, chart, map, process model, or a diagram that must render on GitHub.
---

# Mermaid Design

Create diagrams that communicate structure and causality clearly before optimizing decoration.

## Non-negotiable output contract

1. The canonical deliverable is Mermaid source inside a fenced `mermaid` block or a `.md`/`.mmd` file containing that source.
2. For GitHub-facing work, prefer syntax known to render in GitHub's deployed Mermaid version. Never assume the newest Mermaid release equals GitHub's version.
3. If a requested diagram family is version-sensitive, either verify the target version or translate the design to a stable Mermaid family such as `flowchart`, `sequenceDiagram`, `stateDiagram-v2`, `classDiagram`, or `erDiagram`.
4. Never replace editable Mermaid source with only PNG/SVG output. Rendered assets are previews or validation artifacts.
5. Keep diagrams legible in GitHub's light and dark themes. Avoid relying on custom colors for meaning.

## Token-efficient workflow

### 1. Determine the communication job

Identify the primary question: topology, sequence, ownership, state, dependency, comparison, time, quantity, flow, or uncertainty.

Read `references/diagram-selection.md` only when the diagram family is not already obvious.

### 2. Load exactly one pattern shard

Read `assets/pattern-catalog.md`, which is only a routing index. Then open the single matching file under `assets/patterns/`.

Do **not** preload every pattern file. Do not read unrelated references merely because they exist. Load a second shard only when the requested diagram genuinely combines two visual jobs.

Prefer adapting an existing code example over synthesizing a layout from prose. Pattern assets intentionally contain executable Mermaid first and explanation second.

### 3. Establish information hierarchy

Use this order:
- title/context in surrounding Markdown;
- 3–7 primary groups where practical;
- short node labels, usually noun phrases;
- edge labels only when they add semantics;
- notes or legends only when necessary.

Use `subgraph` deliberately for semantic boundaries such as trust zones, systems, regions, namespaces, domains, ownership, control/data planes, lifecycle stages, or platform layers. A subgraph must communicate a real boundary, not merely decorate related nodes.

Prefer multiple focused diagrams over one diagram with dozens of equally prominent nodes.

### 4. Write conservative Mermaid

Read `references/github-compatibility.md` only for GitHub-facing or compatibility-sensitive output. Read `references/style-guide.md` when creating or materially redesigning a diagram; simple syntax repair usually does not need it.

Use stable IDs separate from human-readable labels. Quote labels containing punctuation. Avoid HTML labels, fragile initialization directives, custom JavaScript, click callbacks, external CSS dependencies, and experimental syntax for GitHub-facing diagrams.

### 5. Validate and render

When the Mermaid MCP renderer is available, render after drafting and after material edits. Fix syntax errors and obvious layout failures before returning the source.

Rendering proves the configured renderer accepts the syntax; it does not prove GitHub uses the same Mermaid version.

### 6. Review like an editor

Check:
- Can a reader state the message in five seconds?
- Are important boundaries explicit?
- Is directionality obvious?
- Are crossings and long edges minimized?
- Are repeated shapes semantically consistent?
- Would removing any node preserve the message? If yes, consider removing it.
- Does GitHub-facing Markdown contain a fenced Mermaid block?

## Improvement requests

When given existing Mermaid, preserve semantics first. Repair syntax, then improve hierarchy, boundaries, layout, and wording. Do not silently change system behavior to make a prettier picture.

## Supporting material

Load only what the current task needs:
- `assets/pattern-catalog.md` — tiny routing index; read first when selecting a composition.
- `assets/patterns/*.md` — code-first pattern shards; read one at a time.
- `references/diagram-selection.md` — when diagram family is unclear.
- `references/github-compatibility.md` — GitHub/version-sensitive output.
- `references/style-guide.md` — visual redesign and editorial quality.
