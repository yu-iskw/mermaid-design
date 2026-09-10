#!/usr/bin/env bash
# Smoke-check that fixture Mermaid fences exist and look well-formed enough for docs.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FIXTURES="${ROOT}/skills/mermaid-design/assets/examples/fixtures.md"

if [[ ! -f ${FIXTURES} ]]; then
	echo "ERROR: missing fixtures: ${FIXTURES}"
	exit 1
fi

count="$(grep -c '^```mermaid$' "${FIXTURES}" || true)"
if [[ ${count} -lt 4 ]]; then
	echo "ERROR: expected at least 4 mermaid fences in fixtures.md, found ${count}"
	exit 1
fi

# Each fence should close and include a known Tier A opener.
python3 - "${FIXTURES}" <<'PY'
import re, sys
text = open(sys.argv[1], encoding="utf-8").read()
blocks = re.findall(r"```mermaid\n(.*?)```", text, flags=re.S)
if len(blocks) < 4:
    raise SystemExit(f"ERROR: parsed {len(blocks)} mermaid blocks, need >= 4")
openers = ("flowchart", "sequenceDiagram", "stateDiagram-v2", "erDiagram",
           "classDiagram", "gantt", "timeline", "mindmap", "quadrantChart",
           "journey", "gitGraph")
for i, block in enumerate(blocks, 1):
    body = block.strip()
    if not body:
        raise SystemExit(f"ERROR: empty mermaid block #{i}")
    if not body.startswith(openers):
        raise SystemExit(f"ERROR: block #{i} missing Tier A opener: {body.splitlines()[0]!r}")
print(f"Fixture check passed: {len(blocks)} mermaid block(s)")
PY
