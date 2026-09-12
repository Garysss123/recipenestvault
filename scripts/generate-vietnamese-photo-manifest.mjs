import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const approved = join(root,'assets/recipes/approved');
const research = join(root,'assets/recipes/alternatives/vietnamese');
const evidencePath = join(root,'docs/research/vietnamese-photo-evidence.json');
const output = join(root,'src/vietnamese-photos.mjs');
const pinResearch = process.argv.includes('--pin-research');
const fetchMissing = process.argv.includes('--download-missing');
const accepted = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const clean = (value='') => String(value).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim();
const cleanUrl = value => { const url=new URL(value.replace(/^http:/,'https:')); for(const key of [...url.searchParams.keys()]) if(key.startsWith('utm_'))url.searchParams.delete(key); return url.toString(); };
// These exact source pixels and their normal 4:3 crops were reviewed against the written recipes.
// Changing a source requires a fresh manual pixel/recipe review before changing this allowlist.
const selections = [
 ['pho-bo','pho-bo','east',1.2,'Clear beef broth, flat noodles, thin beef, onion and green herbs; tight right crop excludes the neighboring diner.'],
 ['pho-ga','pho-ga-alt','centre',1,'Pale poached chicken, flat noodles, clear broth, scallions, onion and sliced chile; no hoisin garnish in the chosen source.'],
 ['bun-bo-hue','bun-bo-hue','attention',1,'Red lemongrass broth with sliced beef, pork, herbs and chile; no visible blood cake or sausage.'],
 ['bun-rieu','bun-rieu-alt','south',1.12,'Tomato broth, crab-pork-egg curds, fried tofu, noodles, tomato and scallions; rejected blood/sausage source is not published.'],
 ['bun-cha','bun-cha','centre',1,'Grilled pork in amber dip, separate rice vermicelli and herbs, disclosed optional fried rolls.'],
 ['bun-thit-nuong','bun-thit-nuong','centre',1,'Grilled sliced pork, rice noodles, pickled carrot/daikon, cucumber, peanuts, herbs and disclosed optional fried rolls.'],
 ['goi-cuon','goi-cuon','centre',1,'Transparent rice-paper rolls containing shrimp, pork, vermicelli and herbs; a few cooked shrimp halves are arranged alongside.'],
 ['cha-gio','cha-gio-alt','centre',1,'Blistered pale-golden fried rice-paper rolls with amber garlic-herb dipping sauce; no decorative vegetable flowers.'],
 ['banh-xeo','banh-xeo','attention',1,'Thin yellow opened crepe, shrimp and pork filling, onion, sprouts and leafy serving herbs.'],
 ['banh-cuon','banh-cuon','attention',1.25,'White translucent steamed-style rice rolls with dark wood-ear/pork filling, fried shallots and green herbs.'],
 ['banh-mi-thit','banh-mi-thit','attention',1,'Baguette with pink pork ham, pale sausage, pate, cucumber, cilantro and pickle strands.'],
 ['com-tam-suon-nuong','com-tam-suon-nuong','attention',1,'Caramelized thin pork chop, white broken rice, scallion oil and cucumber; no egg loaf or pork skin.'],
 ['cao-lau','cao-lau','attention',1,'Thick ivory-brown noodles, browned sliced pork, herbs and crisp golden square toppings with little broth.'],
 ['mi-quang','mi-quang-alt5','attention',1,'Yellow wide rice noodles, cooked tail-on shrimp and sliced pork, sesame rice crackers, crushed peanuts, greens and shallow broth. Rejected white-noodle/tomato/dried-shrimp candidate is not published.'],
 ['ca-kho-to','ca-kho-to-alt','south',1.25,'Skin-on fish steaks in glossy caramel reduction with scallions and pepper in a stovetop-safe metal pot.'],
 ['thit-kho-trung','thit-kho-trung-alt','south',1.2,'Large skin-on pork belly and whole boiled eggs in amber coconut-water braise. Normal crop excludes the original bottom watermark and side pickles.'],
 ['bo-kho','bo-kho-alt','centre',1,'Large tender beef pieces, carrots, glossy red-brown broth and fresh Thai basil. Rejected tripe/radish/noodle version is not published.'],
 ['canh-chua-ca','canh-chua-ca','attention',1,'Clear sour fish soup with pineapple, tomato, okra, sprouts, edible bac ha stems and chopped herbs.'],
 ['bun-bo-nam-bo','bun-bo-nam-bo-alt','centre',1,'Thin stir-fried beef over white vermicelli, blanched sprouts, pickled carrot, crushed peanuts and fried shallots; greens underneath.'],
 ['che-ba-mau','che-ba-mau','centre',1,'Whole-bean variation: red beans, pale black-eyed peas, green jelly strands and coconut layer in clear cups.'],
 ['banh-flan','banh-flan','attention',1,'Yellow caramel custard in a cup with coffee sauce and crushed ice, explicitly included as a serving option.']
];

await mkdir(approved,{recursive:true});
let evidence;
if(pinResearch){
 evidence=[];
 for(const [id,candidateId,cropPosition,cropZoom,reviewNote] of selections){
  const raw=JSON.parse(await readFile(join(research,`${candidateId}-selected.json`),'utf8'));
  const metadata=raw.extmetadata;
  const license=metadata.LicenseShortName?.value||'';
  const author=clean(metadata.Artist?.value).replace(/\s*\(thảo luận\)/,'');
  // This source was read directly: its Licensing section explicitly uses PD-self worldwide release.
  const licenseUrl=metadata.LicenseUrl?.value || (id==='canh-chua-ca'&&license==='Public domain'?'https://commons.wikimedia.org/wiki/Template:PD-self':'');
  if(!accepted.test(license)||!licenseUrl||!author)throw new Error(`${id}: incomplete commercial-license evidence`);
  const data=await readFile(join(research,`${candidateId}.jpg`));
  const dimensions=await sharp(data).metadata();
  if(dimensions.width<1200||dimensions.height<800)throw new Error(`${id}: source below 1200x800`);
  await copyFile(join(research,`${candidateId}.jpg`),join(approved,`${id}.jpg`));
  evidence.push({id,commonsTitle:raw.title,title:clean(metadata.ObjectName?.value)||raw.title.replace(/^File:/,''),author,sourcePage:cleanUrl(raw.descriptionurl),originalFile:cleanUrl(raw.url),license:license==='CC0'?'CC0 1.0':license,licenseUrl:cleanUrl(licenseUrl),originalWidth:raw.width,originalHeight:raw.height,sourceWidth:dimensions.width,sourceHeight:dimensions.height,sourceAsset:`${id}.jpg`,sourceAssetSha256:createHash('sha256').update(data).digest('hex'),cropPosition,cropZoom,reviewedAt:'2026-09-12',reviewNote});
 }
 await writeFile(evidencePath,JSON.stringify(evidence,null,2)+'\n');
} else evidence=JSON.parse(await readFile(evidencePath,'utf8'));

if(evidence.length!==21||new Set(evidence.map(x=>x.id)).size!==21)throw new Error('Expected 21 unique approved records');
const photos=[];
for(const record of evidence){
 const assetPath=join(approved,record.sourceAsset);
 try { await access(assetPath); } catch {
  if(!fetchMissing) throw new Error(`${record.id}: approved source missing; use --download-missing to retrieve it`);
  const original=new URL(record.originalFile);
  if(record.sourceWidth<record.originalWidth){const filename=original.pathname.split('/').pop();original.host='thumb.wikimedia.org';original.pathname=original.pathname.replace('/commons/','/commons/thumb/')+`/${record.sourceWidth}px-${filename}`;}
  const response=await fetch(original,{headers:{'User-Agent':'RecipeNestVault/0.1 (pinned approved photograph restoration)'}});
  if(!response.ok)throw new Error(`${record.id}: HTTP ${response.status}; retry later, do not loop`);
  await writeFile(assetPath,Buffer.from(await response.arrayBuffer()));
 }
 const data=await readFile(assetPath), dimensions=await sharp(data).metadata();
 if(createHash('sha256').update(data).digest('hex')!==record.sourceAssetSha256)throw new Error(`${record.id}: approved source hash changed; review required`);
 if(dimensions.width!==record.sourceWidth||dimensions.height!==record.sourceHeight)throw new Error(`${record.id}: dimension mismatch`);
 const {originalWidth,originalHeight,sourceWidth,sourceHeight,...photo}=record;
 photos.push({...photo,relation:'dish-reference',commercialUseVerified:true,realPhoto:true,visualMatchApproved:true});
}
await writeFile(output,`// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-vietnamese-photo-manifest.mjs to verify and regenerate.\nexport const vietnamesePhotoCandidates = ${JSON.stringify(photos,null,2)};\n\nexport default vietnamesePhotoCandidates;\n`);
console.log(`Wrote ${relative(root,output)} with ${photos.length} verified records.`);
