import { copyFile, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { frenchRecipeDrafts } from '../src/french-recipes.mjs';

const root=dirname(dirname(fileURLToPath(import.meta.url)));
const [id,source,version]=process.argv.slice(2);
if(!frenchRecipeDrafts.some(recipe=>recipe.id===id)||!source||(version&&!/^v[2-9]\d*$/.test(version)))throw new Error('Usage: save-french-illustration.mjs recipe-id generated-source.png [v2]');
const directory=join(root,'assets/recipes/illustration-sheets-generated/french');
const previews=join(root,'qa-artifacts/french-review/illustrations');
await mkdir(directory,{recursive:true});await mkdir(previews,{recursive:true});
const filename=`${id}${version?'-'+version:''}.png`,target=join(directory,filename);
try{await access(target);throw new Error(`Existing source must not be overwritten: ${target}`);}catch(error){if(error.code!=='ENOENT')throw error;}
const metadata=await sharp(source).metadata();
if(metadata.width<1200||metadata.height<900)throw new Error('Generated source is below the reviewed source-size gate');
await copyFile(source,target);
const preview=join(previews,filename.replace(/\.png$/,'.jpg'));
await sharp(target).resize({width:1440,withoutEnlargement:true}).jpeg({quality:86}).toFile(preview);
const promptFile=join(root,'docs/illustration-prompts/french-prompts.json');
const record=JSON.parse(await readFile(promptFile,'utf8')),entry=record.entries.find(entry=>entry.recipeId===id);
entry.sourceSheet=relative(root,target).replaceAll('\\','/');entry.sourceGeneratedPath=source;entry.reviewed=false;
await writeFile(promptFile,JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({id,source:target,preview,width:metadata.width,height:metadata.height}));
