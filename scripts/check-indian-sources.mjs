import { indianRecipeDrafts } from "../src/indian-recipes.mjs";

const sources = indianRecipeDrafts.flatMap((recipe) => recipe.sources.map((source) => ({ id: recipe.id, ...source })));
const results = [];
for (let index = 0; index < sources.length; index += 6) {
  const batch = sources.slice(index, index + 6);
  results.push(...await Promise.all(batch.map(async (source) => {
    try {
      const response = await fetch(source.url, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 RecipeNestVault source verifier" }, signal: AbortSignal.timeout(30000) });
      const reachable = response.ok || (response.status >= 300 && response.status < 400) || [401, 403, 429].includes(response.status);
      console.log(`${response.status} ${source.id} ${source.url}`);
      return { source, reachable, status: response.status };
    } catch (error) {
      console.log(`ERR ${source.id} ${source.url}`);
      return { source, reachable: false, status: error.message };
    }
  })));
}
const failures = results.filter((result) => !result.reachable).map(({ source, status }) => `${source.id}: ${status} ${source.url}`);
if (failures.length) {
  console.error(`Indian source check failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Indian source check passed: ${sources.length} direct source URLs.`);
