import { thaiRecipeDrafts } from "../src/thai-recipes.mjs";

const recipeId = process.argv[2];
const recipe = thaiRecipeDrafts.find((candidate) => candidate.id === recipeId);

if (!recipe) throw new Error(`Unknown Thai recipe: ${recipeId || "(missing id)"}`);

process.stdout.write(JSON.stringify({
  id: recipe.id,
  name: recipe.name.en,
  visualSpec: recipe.visualSpec,
  steps: recipe.instructions.map((instruction, index) => ({
    number: index + 1,
    title: instruction.title.en,
    body: instruction.body.en
  }))
}));
