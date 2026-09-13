import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=dirname(dirname(fileURLToPath(import.meta.url)));
const records=JSON.parse(await readFile(join(root,'docs/research/french-recipe-sources.json'),'utf8'));
const requested=new Set(process.argv.slice(2));
const jobs=records.filter(r=>!requested.size||requested.has(r.id)).flatMap(r=>r.urls.map((url,index)=>({id:r.id,index:index+1,url})));
const output=join(root,'qa-artifacts/french-review/sources');await mkdir(output,{recursive:true});
const results=[],nextStart=new Map();let next=0;
const clean=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
function findRecipes(value,result=[]){if(value&&typeof value==='object'){if([value['@type']].flat().includes('Recipe'))result.push(value);for(const child of Object.values(value))if(child&&typeof child==='object')findRecipes(child,result);}return result;}
function steps(value){return [value].flat().filter(Boolean).flatMap(v=>typeof v==='string'?[clean(v)]:v.itemListElement?steps(v.itemListElement):v.text?[clean(v.text)]:[]);}
await Promise.all(Array.from({length:2},async()=>{for(;;){
  const job=jobs[next++];if(!job)return;
  const host=new URL(job.url).host,at=Math.max(Date.now(),nextStart.get(host)||0);nextStart.set(host,at+2500);
  await new Promise(resolve=>setTimeout(resolve,at-Date.now()));
  try{
    const response=await fetch(job.url,{headers:{'User-Agent':'RecipeNestVault/0.1 (recipe source verification)'},signal:AbortSignal.timeout(30000)});
    const html=await response.text();
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const found=[];
    for(const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi))try{findRecipes(JSON.parse(match[1]),found);}catch{}
    const recipe=found.find(r=>steps(r.recipeInstructions).length>0);
    const title=clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
    const result={...job,status:response.status,finalUrl:response.url,title,bytes:Buffer.byteLength(html),sha256:createHash('sha256').update(html).digest('hex'),hasRecipe:!!recipe,ingredients:(recipe?.recipeIngredient||[]).map(clean),instructions:steps(recipe?.recipeInstructions),prepTime:recipe?.prepTime,cookTime:recipe?.cookTime,totalTime:recipe?.totalTime};
    await writeFile(join(output,`${job.id}-${job.index}.html`),html);
    await writeFile(join(output,`${job.id}-${job.index}.json`),JSON.stringify(result,null,2)+'\n');
    results.push(result);console.log(`${job.id}/${job.index}: HTTP ${response.status}, ${result.ingredients.length} ingredients, ${result.instructions.length} method entries`);
  }catch(error){results.push({...job,error:error.message});console.error(`${job.id}/${job.index}: ${error.message}`);}
}}));
await writeFile(join(output,'verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),results},null,2)+'\n');
if(results.some(r=>r.error||!r.hasRecipe)){console.error('Some sources require direct content inspection or replacement.');process.exitCode=1;}
