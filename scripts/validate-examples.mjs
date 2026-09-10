import { readdir, readFile } from "node:fs/promises";
import { validate } from "../plugins/mermaid-design/skills/diagram-design/scripts/validate-mermaid.mjs";
const root = new URL(
  "../plugins/mermaid-design/skills/diagram-design/",
  import.meta.url,
);
const policy = JSON.parse(
  await readFile(new URL("references/capabilities.json", root)),
);
let checked = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
    if (entry.isDirectory()) await walk(url);
    else if (/\.(md|mmd)$/.test(entry.name)) {
      const text = await readFile(url, "utf8");
      for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
        if (!/^(https?:|#)/.test(match[1]))
          await readFile(new URL(match[1], url));
      }
      const sources = entry.name.endsWith(".mmd")
        ? [text]
        : [...text.matchAll(/```mermaid\n([\s\S]*?)```/g)].map((x) => x[1]);
      for (const source of sources) {
        const probe = await validate(source, { profile: "mermaid-11" });
        const result = policy.core.includes(probe.grammar)
          ? await validate(source)
          : probe;
        if (!result.ok)
          throw new Error(`${url.pathname}: ${result.errors.join("\n")}`);
        checked++;
      }
    }
  }
}
await walk(root);
console.log(
  `Validated ${checked} Mermaid examples and all skill-relative Markdown links.`,
);
