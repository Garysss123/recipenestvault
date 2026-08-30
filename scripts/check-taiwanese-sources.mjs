import { taiwaneseRecipeDrafts } from "../src/taiwanese-recipes.mjs";

const sources = taiwaneseRecipeDrafts.flatMap((recipe) => recipe.sources.map((source) => ({ id: recipe.id, url: source.url })));
const results = [];
for (let index = 0; index < sources.length; index += 6) {
  const batch = sources.slice(index, index + 6);
  results.push(...await Promise.all(batch.map(async (source) => {
    try {
      const response = await fetch(source.url, {
        headers: { "User-Agent": "Mozilla/5.0 RecipeNestVault source audit" },
        redirect: "follow",
        signal: AbortSignal.timeout(15000)
      });
      return { ...source, status: response.status, ok: response.ok || [401, 403, 429].includes(response.status), final: response.url };
    } catch (error) {
      return { ...source, status: "ERR", ok: false, final: error.name };
    }
  })));
}

const failures = results.filter((result) => !result.ok);
console.log(JSON.stringify({ total: results.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
