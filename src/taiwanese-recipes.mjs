import { taiwaneseRecipesA } from "./taiwanese-recipes-a.mjs";
import { taiwaneseRecipesB } from "./taiwanese-recipes-b.mjs";
import { taiwaneseRecipesC } from "./taiwanese-recipes-c.mjs";
import { taiwaneseRecipesD } from "./taiwanese-recipes-d.mjs";
import { taiwaneseRecipesE } from "./taiwanese-recipes-e.mjs";
import { refineTaiwaneseSteps } from "./taiwanese-step-refinements.mjs";

export const taiwaneseRecipeDrafts = refineTaiwaneseSteps([
  ...taiwaneseRecipesA,
  ...taiwaneseRecipesB,
  ...taiwaneseRecipesC,
  ...taiwaneseRecipesD,
  ...taiwaneseRecipesE
]);
