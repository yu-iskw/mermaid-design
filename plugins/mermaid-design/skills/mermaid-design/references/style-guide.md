# Mermaid Editorial Style Guide

## Composition

- Prefer one dominant reading direction: left-to-right for pipelines and system relationships; top-to-bottom for decomposition and lifecycle.
- Keep the principal path visually obvious. Secondary paths should branch from it rather than compete with it.
- Use subgraphs for meaningful boundaries such as trust zones, teams, services, lifecycle phases, or data planes—not merely for decoration.
- Aim for 3–7 major groups. Split very large diagrams into overview plus detail diagrams.
- Keep edge crossings low. Reorder nodes before adding decorative styling.

## Labels

- Nodes: short noun phrases, ideally 1–4 words.
- Edges: verbs, protocols, cardinalities, or decision outcomes only when they add information.
- Use consistent terminology with the surrounding RFC/codebase. Do not invent alternate names just to shorten a diagram.
- Put detailed explanations in prose below the diagram instead of inside nodes.

## Semantics

Use shape consistently within a diagram. A shape should imply one concept, for example process, datastore, external actor, decision, or boundary. Do not assign multiple unrelated meanings to the same shape.

Use line style sparingly. Solid lines should normally mean the primary relationship. Dashed/dotted lines may denote asynchronous, optional, inferred, or control relationships only if the convention is explicit.

## Styling

GitHub light/dark compatibility takes precedence over brand styling.

- Prefer Mermaid defaults.
- If classes are necessary, use a small semantic palette and ensure labels remain readable without color.
- Do not add gradients, shadows, decorative icons, or excessive emoji.
- Avoid per-node styling when grouping or labels communicate the same distinction.
- Reserve emphasis for the most important 1–3 elements.

## Density heuristic

A diagram should usually fit one screen at normal GitHub width. When it contains more than about 20–25 meaningful nodes or more than 3 levels of nested subgraphs, consider decomposition.

## Diagram set pattern

For architecture and RFCs, prefer a small set:
1. context/topology — what exists and where;
2. sequence/process — how the important scenario behaves;
3. state/data model — only when state or schema is central.

This is more useful than forcing every concern into one architecture picture.
