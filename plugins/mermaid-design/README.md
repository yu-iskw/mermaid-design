# Mermaid Design

A portable Agent Plugin that helps AI coding agents produce professional Mermaid diagrams for GitHub Markdown.

Positioning:

> A professional diagram-design skill for AI agents, with Mermaid as its GitHub-native compiler target.

## What it does

One skill (`mermaid-design`) routes:

```text
user intent → semantic pattern → Mermaid grammar → GitHub capability → source → taste gate
```

It is not a thin Mermaid syntax wrapper and not one skill per diagram type.

## Layout

```text
skills/mermaid-design/
├── SKILL.md                 # routing, budgets, taste gate
├── references/
│   ├── compatibility.md     # github profile + fallbacks
│   ├── design.md            # editorial rules
│   ├── patterns/            # semantic patterns (load one)
│   └── syntax/              # Tier A grammars (load one)
└── assets/examples/         # small fixtures
```

## Progressive disclosure

A normal request should load:

- `SKILL.md`
- optionally one file under `references/patterns/`
- one file under `references/syntax/`
- `references/compatibility.md` when the target is GitHub or version-sensitive

Do not preload the full reference library.

## GitHub policy

GitHub is the default renderer profile. Prefer Tier A grammars. When a modern/beta family is requested and support is unknown, fall back to a semantically safe Tier A alternative (see `references/compatibility.md`).

## Non-goals (v0.1)

- custom layout engine
- formal diagram IR
- domain skill packs
- enterprise example libraries
- hosting a render service
