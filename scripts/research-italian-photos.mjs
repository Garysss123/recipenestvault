import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dir = join(root, 'assets/recipes/alternatives/italian');
await mkdir(dir, {recursive:true});
const [command, id, ...words] = process.argv.slice(2);
const headers = {'User-Agent':'RecipeNestVault/0.1 (Italian licensed photo research; recipenestvault.com)'};
const api = new URL('https://commons.wikimedia.org/w/api.php');
const accepted = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
async function get(url) { const r=await fetch(url,{headers,signal:AbortSignal.timeout(45000)}); if(!r.ok) throw new Error(`HTTP ${r.status}: ${url}`); return r; }
if(command==='search') {
 api.search=new URLSearchParams({action:'query',format:'json',formatversion:'2',generator:'search',gsrsearch:words.join(' '),gsrnamespace:'6',gsrlimit:'20',prop:'imageinfo',iiprop:'url|size|extmetadata'});
 const data=await (await get(api)).json();
 const candidates=(data.query?.pages||[]).map(p=>({title:p.title,...p.imageinfo?.[0]})).filter(p=>p.width>=1200&&p.height>=800&&accepted.test(p.extmetadata?.LicenseShortName?.value||''));
 await writeFile(join(dir, `${id}-candidates.json`),JSON.stringify(candidates,null,2));
 console.log(JSON.stringify(candidates.map(p=>[p.title,p.width,p.height,p.extmetadata.LicenseShortName.value])));
} else if(command==='download') {
 const title=words.join(' ');
 api.search=new URLSearchParams({action:'query',format:'json',formatversion:'2',prop:'imageinfo',iiprop:'url|size|extmetadata',titles:title});
 let p, info;
 try { const candidate=JSON.parse(await readFile(join(dir,`${id}-selected.json`),'utf8')); if(candidate.title===title){p=candidate; info=candidate;} } catch {}
 try { if(!info){const candidates=JSON.parse(await readFile(join(dir,`${id}-candidates.json`),'utf8')); const candidate=candidates.find(p=>p.title===title); if(candidate){p=candidate; info=candidate;}} } catch {}
 if(!info){ const data=await (await get(api)).json(); p=data.query?.pages?.[0]; info=p?.imageinfo?.[0]; }
 if(!info||!accepted.test(info.extmetadata?.LicenseShortName?.value||'')||info.width<1200||info.height<800)throw new Error('Invalid source');
 await writeFile(join(dir,`${id}-selected.json`),JSON.stringify({title:p.title,...info},null,2));
 const sourceUrl=new URL(info.url); sourceUrl.search='';
 if(info.width>1280){ const thumbWidth=info.width>1920?1920:1280; const file=sourceUrl.pathname.split('/').pop(); sourceUrl.host='thumb.wikimedia.org'; sourceUrl.pathname=sourceUrl.pathname.replace('/commons/','/commons/thumb/')+`/${thumbWidth}px-${file}`; }
 const buffer=Buffer.from(await (await get(sourceUrl)).arrayBuffer());
 await writeFile(join(dir,`${id}.jpg`),buffer);
 console.log(`${id}: ${p.title}, ${info.width} x ${info.height}, ${buffer.length} bytes`);
} else throw new Error('Usage: research-italian-photos.mjs search|download id query|File:title');
