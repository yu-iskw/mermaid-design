# Data and Analysis Recipes

## Logical ER model
Show business entities and cardinalities, not every physical implementation detail. Add attributes only when they are central to the question.

## Star schema
Put the fact table at the center and dimensions around it. State grain in surrounding prose; do not infer grain from visual placement alone.

## Data lineage
Use left-to-right: sources -> ingestion -> transformations -> curated/semantic assets -> consumption. Put orchestration, catalog, quality, and observability in separate supporting subgraphs when needed.

## Medallion architecture
Use bronze -> silver -> gold as semantic processing stages, not merely storage buckets. Label what quality/contract changes at each boundary.

## CDC
Show source DB/log -> connector -> stream -> consumers/sinks. Distinguish snapshot/bootstrap from ongoing change flow when material.

## Governance
Use assets as the main path and governance controls as overlays: ownership, classification, policies, lineage, quality checks, retention.

## RBAC / ABAC / ReBAC
Use ER/class diagrams for the data model and a separate flow/sequence diagram for authorization evaluation. Avoid mixing policy schema and runtime decision flow.

## Sankey
Use only for meaningful quantitative flow. If GitHub support is uncertain, use a flowchart with edge labels containing values and explain that widths are not quantitatively encoded.

## XY / radar / treemap
Use these only when the visual encoding adds decision value. Provide the underlying values in prose/table when precision matters, and fall back to stable GitHub-renderable syntax if the target Mermaid version is unknown.
