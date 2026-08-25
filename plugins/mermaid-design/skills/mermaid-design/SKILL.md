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

## Workflow

### 1. Determine the communication job

Identify the primary question the diagram must answer: topology, sequence, ownership, state, dependency, comparison, time, quantity, flow, or uncertainty.

Read `references/diagram-selection.md` and choose the simplest diagram family that answers that question. Do not use architecture diagrams merely because the subject is software architecture; a sequence or flowchart may communicate the point better.

### 2. Select a proven pattern

Read `assets/pattern-catalog.md`. Choose one pattern before writing syntax. Combine at most two patterns in one diagram unless the user explicitly needs a dense overview.

### 3. Establish information hierarchy

Use this order:
- title/context in surrounding Markdown;
- 3–7 primary groups where practical;
- short node labels, usually noun phrases;
- edge labels only when they add semantics;
- notes or legends only when necessary.

Prefer multiple focused diagrams over one diagram with dozens of equally prominent nodes.

### 4. Write conservative Mermaid

Follow `references/github-compatibility.md` for GitHub-targeted output and `references/style-guide.md` for visual rules.

Use stable IDs separate from human-readable labels. Quote labels containing punctuation. Avoid HTML labels, fragile initialization directives, custom JavaScript, click callbacks, external CSS dependencies, and experimental syntax for GitHub-facing diagrams.

### 5. Validate and render

When the Mermaid MCP renderer is available, render the diagram after drafting and after material edits. Fix syntax errors and obvious layout failures before returning the source.

Rendering proves that the configured renderer accepts the syntax; it does not prove GitHub uses the same Mermaid version. For GitHub, apply the compatibility policy even after a successful local render.

### 6. Review like an editor

Check:
- Can a reader state the diagram's message in five seconds?
- Is directionality obvious?
- Are crossings and long edges minimized?
- Are repeated shapes semantically consistent?
- Is one visual level dominant?
- Would removing any node preserve the message? If yes, consider removing it.
- Does the Markdown contain a fenced Mermaid block that GitHub can render?

## Improvement requests

When given existing Mermaid, preserve semantics first. Repair syntax, then improve hierarchy, then layout, then wording. Do not silently change system behavior to make a prettier picture.

## Supporting material

- `references/diagram-selection.md` — choose the right Mermaid family.
- `references/github-compatibility.md` — GitHub rendering policy and fallbacks.
- `references/style-guide.md` — editorial design rules.
- `assets/pattern-catalog.md` — reusable professional composition patterns.
