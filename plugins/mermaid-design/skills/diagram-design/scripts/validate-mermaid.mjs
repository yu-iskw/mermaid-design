#!/usr/bin/env node
// Local syntax and policy checks; never certifies a remote renderer.
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";

const policy = JSON.parse(
  await readFile(
    new URL("../references/capabilities.json", import.meta.url),
    "utf8",
  ),
);
const headers = {
  flowchart: "flowchart",
  graph: "flowchart",
  sequenceDiagram: "sequence",
  "stateDiagram-v2": "state",
  stateDiagram: "state",
  erDiagram: "er",
  classDiagram: "class",
  gantt: "gantt",
  timeline: "timeline",
  mindmap: "mindmap",
  quadrantChart: "quadrant",
  journey: "user-journey",
  gitGraph: "gitgraph",
  "architecture-beta": "architecture",
  "sankey-beta": "sankey",
  "block-beta": "block",
  kanban: "kanban",
};
let parser;
async function getParser() {
  if (!parser) {
    globalThis.window = new JSDOM("").window;
    globalThis.document = window.document;
    parser = (await import("mermaid")).default;
    parser.initialize({ startOnLoad: false, securityLevel: "strict" });
  }
  return parser;
}

export function resolveGrammar(grammar, profile = "github", supported = []) {
  if (!policy.profiles.includes(profile))
    throw new Error(`Unknown profile: ${profile}`);
  if (policy.core.includes(grammar)) return grammar;
  if (profile !== "github" && supported.includes(grammar)) return grammar;
  return (
    policy.fallbacks[grammar] ?? "Table or prose; preserve essential semantics"
  );
}

const size = (value) =>
  value instanceof Map
    ? value.size
    : Array.isArray(value)
      ? value.length
      : Object.keys(value).length;
function complexity(grammar, db) {
  // Uses the pinned Mermaid database API, counting implicit nodes as well.
  const methods = {
    flowchart: "getVertices",
    sequence: "getActors",
    er: "getEntities",
    class: "getClasses",
    architecture: "getServices",
    sankey: "getNodes",
    gantt: "getTasks",
    timeline: "getTasks",
    "user-journey": "getTasks",
    gitgraph: "getCommits",
  };
  if (methods[grammar]) return size(db[methods[grammar]]());
  return null; // Do not pretend line counting measures arbitrary nested syntax.
}

export async function validate(source, { profile = "github" } = {}) {
  if (!policy.profiles.includes(profile))
    throw new Error(`Unknown profile: ${profile}`);
  const errors = [],
    warnings = [];
  const clean = source.replace(/^\s*%%(?!\{).*$/gm, "").trim();
  const grammar = headers[clean.split(/\s+/)[0]];
  if (!grammar)
    errors.push(
      "Unknown or unsupported grammar; consult compatibility fallback guidance.",
    );
  if (/%%\s*\{|^---(?:\r?\n)/m.test(clean))
    errors.push(
      "Configuration directives/frontmatter are outside this conservative source policy.",
    );
  if (/<\/?[a-z][^>]*>/i.test(clean))
    errors.push("HTML labels are outside this source policy.");
  if (/\b(?:click|link|links)\s/i.test(clean))
    errors.push(
      "Interactive links/click directives are outside this source policy.",
    );
  if (
    /\b(?:fa[a-z]?:|icon\s*:|img\s*:)|::icon\s*\(|\([\w-]+:[\w-]+\)/i.test(
      clean,
    )
  )
    errors.push("External icon/image dependencies are not allowed.");
  if (grammar && profile === "github" && !policy.core.includes(grammar))
    errors.push(
      `GitHub capability unknown. Fallback: ${resolveGrammar(grammar)}.`,
    );
  for (const match of clean.matchAll(/"([^"\n]+)"/g)) {
    if (match[1].length > 60)
      warnings.push(
        "Quoted label exceeds 60 characters; shorten or move detail into prose.",
      );
  }
  let count = null;
  if (!errors.length) {
    try {
      const mermaid = await getParser();
      const diagram = await mermaid.mermaidAPI.getDiagramFromText(clean);
      count = complexity(grammar, diagram.db);
      const budget = policy.budgets[grammar];
      if (count === null)
        warnings.push(
          `Review complexity manually: recommend ${budget.recommended} ${budget.unit}, split near ${budget.split}.`,
        );
      else if (count >= budget.split)
        warnings.push(
          `Split diagram: ${count} ${budget.unit} reaches ${budget.split}.`,
        );
      else if (count > budget.recommended)
        warnings.push(
          `Review complexity: ${count} ${budget.unit} exceeds ${budget.recommended}.`,
        );
    } catch (error) {
      errors.push(`Mermaid parse failed: ${error.message}`);
    }
  }
  return {
    ok: errors.length === 0,
    grammar: grammar ?? null,
    profile,
    count,
    errors,
    warnings,
    targetRenderingVerified: false,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const args = process.argv.slice(2);
  let profile = "github";
  if (args[0] === "--profile") {
    args.shift();
    profile = args.shift();
  }
  if (!args.length || args.some((x) => x.startsWith("--"))) {
    console.error(
      "Usage: validate-mermaid.mjs [--profile github|mermaid-11|latest] file.mmd ...",
    );
    process.exitCode = 2;
  } else {
    for (const file of args) {
      try {
        const result = await validate(await readFile(file, "utf8"), {
          profile,
        });
        console.log(JSON.stringify({ file, ...result }));
        if (!result.ok) process.exitCode = 1;
      } catch (error) {
        console.error(`${file}: ${error.message}`);
        process.exitCode = 1;
      }
    }
  }
}
