# Mermaid Design

Professional diagram-design skill for AI agents, with Mermaid as its GitHub-native compiler target.

Default renderer profile: **GitHub**. Canonical output: editable fenced Mermaid source.

## Install / use

Marketplace catalogs point at `plugins/mermaid-design`:

- [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json)
- [`.cursor-plugin/marketplace.json`](.cursor-plugin/marketplace.json)
- [`.codex-plugin/marketplace.json`](.codex-plugin/marketplace.json)

Plugin overview: [`plugins/mermaid-design/README.md`](plugins/mermaid-design/README.md)

## Architecture (v0.1)

```text
user intent
  → semantic pattern (optional)
  → Mermaid grammar
  → GitHub capability / fallback
  → Mermaid source
  → taste / complexity gate
```

One portable skill (`mermaid-design`) with progressive disclosure:

- `SKILL.md` — routing, budgets, taste gate
- `references/patterns/` — load at most one semantic pattern
- `references/syntax/` — load one Tier A grammar
- `references/compatibility.md` — `github` profile + fallbacks
- `references/design.md` — editorial rules

## Repository layout

```text
.
├── .claude-plugin/marketplace.json
├── .cursor-plugin/marketplace.json
├── .codex-plugin/marketplace.json
├── plugins/
│   ├── mermaid-design/     # primary plugin
│   └── hello-world/        # template sample (not in marketplace)
├── integration_tests/
└── .github/workflows/
```

## Checks

```bash
make lint
./integration_tests/run.sh --skip-loading
./plugins/mermaid-design/scripts/check-fixtures.sh
```

## License

Apache License 2.0. See `LICENSE`.
