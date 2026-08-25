---
name: data-and-analysis
description: Create Mermaid data models, ER diagrams, lineage, analytics pipelines, Sankey, XY, pie, quadrant, radar, treemap, requirement, packet, and analytical diagrams for data engineering, governance, metrics, and decision support.
---

# Data and Analysis Diagrams

Use a diagram only when spatial encoding improves understanding. Do not turn every table into a chart.

## Selection

- entity relationships -> `erDiagram`;
- domain/data type structure -> `classDiagram`;
- lineage/pipeline -> `flowchart`;
- part-to-whole with few categories -> `pie`;
- two-axis positioning -> `quadrantChart`;
- flow magnitude -> Sankey when target support is verified, otherwise labeled flowchart;
- category/time values -> XY chart when target support is verified;
- capability profile -> radar when target support is verified;
- hierarchical area/ownership -> treemap when target support is verified.

## Token-efficient loading

Load one code shard:
- pipelines, lineage, governance, RAG, ML/LLMOps -> `../mermaid-design/assets/patterns/data-and-ai-platforms.md`;
- ER, class/domain models, catalog/observability schemas -> `../mermaid-design/assets/patterns/domain-and-data-models.md`;
- Sankey, quadrant, XY, Gantt, timeline and specialized analysis -> `../mermaid-design/assets/patterns/planning-and-analysis.md`;
- access-control or privacy models -> `../mermaid-design/assets/patterns/security-and-governance.md`.

Read `references/data-patterns.md` only if the selected code shard lacks the needed modeling guidance. Do not preload unrelated shards.

## Data-specific rules

1. Distinguish logical data movement from orchestration/control edges.
2. Use `subgraph` for genuine platform, governance, trust, storage, processing, or consumption boundaries.
3. In lineage, identify transformations and semantic boundaries; do not display every physical table unless the task is impact analysis.
4. In ER diagrams, model cardinality carefully and avoid inventing optionality from names alone.
5. Charts must state units and meaningful axis/category labels in surrounding Markdown when Mermaid syntax cannot express them clearly.
6. Do not use pie charts for many categories or precise comparison.
7. For governance diagrams, show ownership, quality, policy, lineage, and catalog as explicit controls only when relevant.
8. For GitHub output, fall back to stable syntax whenever the analytical family is not known to be supported by GitHub's deployed Mermaid version.
