import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { frenchRecipeDrafts } from '../src/french-recipes.mjs';

const file=new URL('../docs/illustration-prompts/french-prompts.json',import.meta.url);
const record=JSON.parse(await readFile(file,'utf8'));
const byId=new Map(record.entries.map(entry=>[entry.recipeId,entry]));
for(const recipe of frenchRecipeDrafts){
  const scenes=recipe.instructions.map(step=>step.imageScene);
  const sceneHash=createHash('sha256').update(JSON.stringify(scenes)).digest('hex');
  const old=byId.get(recipe.id);
  if(old){
    if(old.sceneHash&&old.sceneHash!==sceneHash)throw new Error(`${recipe.id}: scenes changed; update the prompt and review the affected source explicitly`);
    old.sceneHash=sceneHash;continue;
  }
  const columns=3,rows=Math.ceil(scenes.length/columns);
  const prompt=`Use case: illustration-story. Asset type: Recipe Nest Vault cooking-process source sheet. The attached image is a STYLE REFERENCE ONLY, not a subject reference. Match its warm ivory lightly textured paper, fine ink outlines, restrained gouache shading, natural food colours and overhead three-quarter view. Create a large landscape source sheet with exactly ${columns} equally sized columns and ${rows} equally sized rows. All subjects are centered with generous blank paper gutters and stay wholly within their cell. First ${scenes.length} cells are filled in reading order, unused cells completely blank ivory. Each cell shows the described intermediate cooking state, not a finished meal until the final cell. Static objects at rest: no floating jugs or utensils, no pouring streams. No decorative frames or national motifs. No text, numbers, letters, logos or watermarks. Absolutely no people, faces, hands, fingers, arms, sleeves or body parts. This is original non-photorealistic recipe illustration. Dish: ${recipe.name.en}.\n${scenes.map((scene,index)=>`Cell ${index+1}: ${scene}`).join('\n')}`;
  record.entries.push({recipeId:recipe.id,columns,rows,usedPanels:scenes.length,reviewed:false,sceneHash,prompt});
}
await writeFile(file,JSON.stringify(record,null,2)+'\n');
console.log(`French prompts: ${record.entries.length} source sheets, ${record.entries.reduce((n,e)=>n+e.usedPanels,0)} planned step images.`);
