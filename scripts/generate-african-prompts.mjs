import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { africanRecipeDrafts } from '../src/african-recipes.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const promptSet = 'african-cooking-steps-v1';
const style = 'Recipe Nest Vault established warm-ivory fine-ink-and-gouache editorial cookbook illustration: clearly hand-drawn flat 2D food and cookware, delicate charcoal contour lines, restrained translucent muted colour washes, soft handmade paper grain, very sparse warm-ivory background. Absolutely not a photograph, 3D render, or photorealism. No people, no hands, no text, no numbers, no labels, no logos, no watermark.';
const entries = africanRecipeDrafts.map((recipe) => {
  const columns = 3;
  const rows = 3;
  const steps = recipe.instructions.map((step, index) => `${index + 1}. ${step.imageScene}`);
  const unused = columns * rows - steps.length;
  const prompt = `Create one landscape 3×3 contact sheet of nine equal cooking-step panels for ${recipe.name.en}. Keep the same warm-ivory paper, fine ink contours and restrained gouache illustration style in every panel. Each panel is a separate, legible close editorial drawing with comfortable margins; use the recipe-specific vessel, ingredient state and finished appearance described below. Read left-to-right, top-to-bottom. Draw exactly one panel for each ordered stage and do not invent duplicate steps.\n${steps.join('\n')}\n${unused ? `Leave the final ${unused} unused panel${unused === 1 ? '' : 's'} completely empty and warm ivory.` : 'Use all nine panels, one stage per panel.'} No gutters wider than a fine ivory rule, no panel borders, no captions, and no text.`;
  return {
    recipeId: recipe.id,
    columns,
    rows,
    usedPanels: steps.length,
    style,
    prompt,
    sourceSheet: `assets/recipes/illustration-sheets-generated/african/${recipe.id}.png`,
    reviewed: false
  };
});
if (entries.length !== 13 || new Set(entries.map((entry) => entry.recipeId)).size !== 13 || entries.some((entry) => entry.usedPanels > 9)) throw new Error('African illustration prompt identity/grid mismatch');
const record = { promptSet, generatedAt: '2026-09-20', style, entries };
const jsonPath = join(root, 'docs', 'illustration-prompts', 'african-prompts.json');
await mkdir(dirname(jsonPath), { recursive: true });
await writeFile(jsonPath, JSON.stringify(record, null, 2) + '\n', 'utf8');
const markdown = [
  '# African recipe step illustration sheets',
  '',
  `Prompt set: \`${promptSet}\``,
  'Style: warm-ivory fine-line 2D ink and restrained gouache, consistent with the existing Recipe Nest Vault step illustrations. Every recipe gets a separate 3×3 contact sheet. Only the ordered used panels are cropped into the method; extra panels stay blank.',
  '',
  ...entries.flatMap((entry) => [`## ${entry.recipeId} (${entry.usedPanels} panels)`, '', `Source sheet: \`${entry.sourceSheet}\``, '', entry.prompt, ''])
].join('\n');
const markdownPath = join(root, 'docs', 'illustration-prompts', 'african-cooking-steps-v1.md');
await writeFile(markdownPath, markdown, 'utf8');
console.log(`Wrote ${relative(root, jsonPath)} and ${relative(root, markdownPath)} for ${entries.length} African recipe sheets.`);
