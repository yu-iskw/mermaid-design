# Diagram selection evaluation

`corpus.json` contains 50 authored cases with intent, primary pattern (or null),
preferred grammar, GitHub resolution, and semantic inclusion/exclusion assertions.
Assertions describe meaning, not literal string matching. Preferred grammar is
before capability resolution; prose may also mean clarification when facts are missing.
Accept semantically equivalent alternatives when justified, and record the reason.

## Benchmark protocol

Run every case through the same model/version and generation settings in three arms:

1. Vanilla model: the input alone.
2. Generic prompt: “Generate Mermaid for this request” plus the input.
3. Mermaid Design: the skill and only its routed references plus the input.

Keep target renderer and supplied facts constant across arms. Record model version,
date, settings, output, input/output tokens, loaded references and latency. Randomize
output order and conceal arm labels from reviewers. Have reviewers score selection,
semantic fidelity, readability, density, compatibility and source/diff quality on
an anchored 1–5 scale (1 = fails the task, 3 = usable with revisions, 5 = ready to use).
Also report inclusion/exclusion failures and token cost separately; never substitute
parser success for quality. Render Mermaid outputs in the intended target where possible.

Compare paired case scores, report distributions and disagreement, and inspect
regressions. Predeclare a material improvement threshold before collecting results
(for example +0.5 mean selection points without lower semantic fidelity). Retain raw
outputs and review records so the result can be reproduced. Before v1.0, complete
all 50 cases across all three arms and a blind review.

## Status

Corpus and schema checks are implemented. Model generations, blind review and
comparative quality results have **not** been run. The RFC's benchmark-improvement
acceptance criterion remains open; this draft does not claim that improvement.
