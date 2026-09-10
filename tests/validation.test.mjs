import test from "node:test";
import assert from "node:assert/strict";
import {
  validate,
  resolveGrammar,
} from "../plugins/mermaid-design/skills/diagram-design/scripts/validate-mermaid.mjs";

test("capability resolution defaults to semantic fallback and requires positive modern evidence", () => {
  assert.equal(resolveGrammar("architecture"), "Flowchart with subgraphs");
  assert.equal(
    resolveGrammar("architecture", "mermaid-11"),
    "Flowchart with subgraphs",
  );
  assert.equal(
    resolveGrammar("architecture", "mermaid-11", ["architecture"]),
    "architecture",
  );
  assert.equal(resolveGrammar("sequence"), "sequence");
  assert.throws(() => resolveGrammar("sequence", "typo"), /Unknown profile/);
});
test("parser rejects malformed syntax and accepts a branching process", async () => {
  assert.equal((await validate("flowchart TD\nA[broken")).ok, false);
  const result = await validate("flowchart TD\nA --> B\nA --> C");
  assert.equal(result.ok, true);
  assert.equal(result.count, 3);
  assert.equal(result.targetRenderingVerified, false);
});
test("GitHub rejects a modern grammar that parses locally", async () => {
  const source = "sankey-beta\nA,B,2";
  assert.equal((await validate(source)).ok, false);
  assert.equal((await validate(source, { profile: "mermaid-11" })).ok, true);
});
test("policy rejects directives, HTML, interactive actions, external icons and unknown syntax", async () => {
  for (const source of [
    "%%{init: {}}%%\nflowchart TD\nA --> B",
    'flowchart TD\nA["<b>Hi</b>"]',
    'flowchart TD\nA --> B\nclick A "https://example.com"',
    'flowchart TD\nA["fa:fa-user"]',
    "architecture-beta\nservice a(logos:aws)[Cloud]",
    "imaginary\nA --> B",
  ]) {
    assert.equal((await validate(source)).ok, false, source);
  }
});
test("complexity counts implicit nodes, deduplicates nodes, and warns at split threshold", async () => {
  const source =
    "flowchart TD\n" +
    Array.from({ length: 17 }, (_, i) => `N${i} --> N${i + 1}`).join("\n");
  const result = await validate(source);
  assert.equal(result.count, 18);
  assert.match(result.warnings.join(" "), /Split diagram/);
  assert.equal((await validate("flowchart TD\nA --> B\nA --> B")).count, 2);
});
test("long labels warn without being misrepresented as parser errors", async () => {
  const result = await validate(`flowchart TD\nA["${"a".repeat(61)}"]`);
  assert.equal(result.ok, true);
  assert.match(result.warnings.join(" "), /60 characters/);
});

test("evaluation corpus has 50 distinct complete semantic cases and valid pattern references", async () => {
  const { readFile } = await import("node:fs/promises");
  const corpus = JSON.parse(
    await readFile(new URL("../evaluations/corpus.json", import.meta.url)),
  );
  assert.equal(corpus.length, 50);
  assert.equal(new Set(corpus.map((x) => x.id)).size, 50);
  assert.equal(new Set(corpus.map((x) => x.input)).size, 50);
  for (const item of corpus) {
    for (const key of [
      "input",
      "expected_intent",
      "preferred_grammar",
      "github_fallback",
    ])
      assert.ok(item[key]);
    assert.ok(item.must_include.length && item.must_not_include.length);
    if (item.expected_semantic_pattern)
      await readFile(
        new URL(
          `../plugins/mermaid-design/skills/diagram-design/references/patterns/${item.expected_semantic_pattern}.md`,
          import.meta.url,
        ),
      );
  }
});
