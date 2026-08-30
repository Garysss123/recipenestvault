import { koreanRecipeDrafts } from "../src/korean-recipes.mjs";

const recipeId = process.argv[2];
const recipe = koreanRecipeDrafts.find((candidate) => candidate.id === recipeId);

if (!recipe) {
  throw new Error(`Unknown Korean recipe: ${recipeId || "(missing id)"}`);
}

process.stdout.write(JSON.stringify({
  id: recipe.id,
  name: recipe.name.en,
  steps: recipe.instructions.map((instruction, index) => ({
    number: index + 1,
    title: instruction.title.en,
    body: instruction.body.en
  }))
}));
