# Mermaid Design

A professional diagram-design skill for AI agents, with Mermaid as its GitHub-native
compiler target. Describe what you want to communicate; the skill selects a semantic
pattern and visual grammar, resolves renderer capabilities, then reviews the source
for clarity and complexity.

## Use

Example requests:

- “Explain how our agent requests approval before changing a production record.”
- “Show the migration from our monolith through a transition architecture.”
- “Help readers understand the bottleneck shared by these producers.”

GitHub is the default target. Unsupported or unverified modern grammars resolve to
semantic alternatives. The skill can recommend a table or prose when a diagram adds
no value. It does not invent missing architecture, metrics, schedules or guarantees.

## Installation and portability

Claude Code:

```text
/plugin marketplace add yu-iskw/mermaid-design
/plugin install mermaid-design@claude-plugin-template
```

The marketplace retains its template identifier for compatibility. The canonical
portable skill is [plugins/mermaid-design/skills/diagram-design/SKILL.md](plugins/mermaid-design/skills/diagram-design/SKILL.md).
For an Agent Skills-compatible host, install that complete folder using the host's
skill installation mechanism. No Node runtime is required to use the instructions.
The plugin's root `plugin.json` is portable packaging; `.claude-plugin` and
`.codex-plugin` manifests adapt that same skill. The original hello-world sample
remains available independently.

## Scope

The v0.1 implementation includes one intent-based router, 11 core grammar references,
12 semantic patterns, five thin domain references, modern fallback guidance, parser
fixtures and a 50-case evaluation corpus. Architecture, Sankey, Block and Kanban have
local parser fixtures; Swimlane currently has an ownership-preserving Flowchart
fallback. Specialized native grammars are deferred as proposed in [RFC #4](https://github.com/yu-iskw/mermaid-design/issues/4).

Typical generation loads one pattern and one resolved grammar reference, plus at
most one optional domain reference. Compatibility and design references are loaded
only when needed. A major version or `latest` label alone is not capability evidence.

## Validation

With Node.js 22 or later:

```bash
npm ci --ignore-scripts
npm test
npm run validate:mermaid -- path/to/diagram.mmd
npm run validate:mermaid -- --profile mermaid-11 path/to/diagram.mmd
./integration_tests/run.sh --skip-loading
```

Tests parse every bundled `.mmd` fixture and Mermaid code fence, validate relative
skill links, exercise policy failures, and check evaluation corpus structure.
The lockfile pins Mermaid 11.17.2 and its validation environment. `mermaid-11` and
`latest` select local parsing policy; neither certifies the user's remote renderer
nor installs a different parser. The GitHub profile rejects modern grammars without
claiming that GitHub cannot ever render them.

The validator rejects unknown grammar, configuration directives, HTML, interactive
links and external icon dependencies. It warns on long quoted labels and measures
complexity from the pinned parser's graph database for Flowchart, Sequence, ER,
Class, Architecture, Sankey, Gantt, Timeline, User Journey and GitGraph. State,
Mindmap, Quadrant, Block and Kanban budgets require manual review. Budget and label
checks are heuristics, not a security sanitizer or complete Mermaid linter.

CI runs parsing and policy checks; it does not certify GitHub rendering, layout
quality, or semantic correctness. [The evaluation protocol](evaluations/README.md)
tracks the still-pending three-arm blind benchmark. No quality improvement claim
is made until actual generations and review establish it.

Existing packaging checks remain available through `make lint`, `make format`, and
`make test-integration-docker`; see [CONTRIBUTING.md](CONTRIBUTING.md).

## Design sources

- [RFC #4](https://github.com/yu-iskw/mermaid-design/issues/4)
- [Agent Skills specification](https://agentskills.io/specification)
- [GitHub diagram guidance](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams)
- [Mermaid documentation](https://mermaid.js.org/intro/)

## License

Apache-2.0; see [LICENSE](LICENSE).
