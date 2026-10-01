// Validates every file in /content against the zod schemas without starting
// Next.js. Run with `npm run content:check` (CI-friendly; exits non-zero on error).
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const matter = require("gray-matter");

// Compile the TS schema module on the fly via the TypeScript compiler API.
const ts = require("typescript");
const src = readFileSync(new URL("../src/lib/content/schemas.ts", import.meta.url), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = await import(`data:text/javascript;base64,${Buffer.from(js.replace(/from "zod"/g, `from "${pathToFileURL(require.resolve("zod")).href}"`)).toString("base64")}`);

const root = new URL("../content/", import.meta.url).pathname;
let errors = 0;
const check = (label, schema, data) => {
  const r = schema.safeParse(data);
  if (!r.success) {
    errors++;
    console.error(`✖ ${label}\n${r.error.issues.map((i) => `   ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n")}`);
  } else console.log(`✔ ${label}`);
};

check("site.json", mod.siteSettingsSchema, JSON.parse(readFileSync(join(root, "site.json"), "utf8")));
for (const f of readdirSync(join(root, "services")).filter((f) => f.endsWith(".json")))
  check(`services/${f}`, mod.pillarSchema, JSON.parse(readFileSync(join(root, "services", f), "utf8")));
for (const f of readdirSync(join(root, "tools")).filter((f) => f.endsWith(".json")))
  check(`tools/${f}`, mod.toolCollectionSchema, JSON.parse(readFileSync(join(root, "tools", f), "utf8")));
for (const f of readdirSync(join(root, "insights")).filter((f) => f.endsWith(".mdx")))
  check(`insights/${f}`, mod.insightFrontmatterSchema, matter(readFileSync(join(root, "insights", f), "utf8")).data);

if (errors) {
  console.error(`\n${errors} content file(s) failed validation.`);
  process.exit(1);
}
console.log("\nAll content valid.");
