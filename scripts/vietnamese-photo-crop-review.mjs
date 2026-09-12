import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const records=JSON.parse(await readFile(join(root,'docs/research/vietnamese-photo-evidence.json'),'utf8'));
const out=join(root,'qa-artifacts/vietnamese-photo-crops');await mkdir(out,{recursive:true});
for(const p of records){
 const width=960,height=720,zoom=p.cropZoom||1;
 let pipeline=sharp(join(root,'assets/recipes/approved',p.sourceAsset)).rotate();
 if(zoom>1){const zw=Math.round(width*zoom),zh=Math.round(height*zoom),left=['east','right'].includes(p.cropPosition)?zw-width:['west','left'].includes(p.cropPosition)?0:Math.round((zw-width)/2);pipeline=pipeline.resize({width:zw,height:zh,fit:'cover',position:p.cropPosition}).extract({left,top:Math.round((zh-height)/2),width,height});}
 else pipeline=pipeline.resize({width,height,fit:'cover',position:p.cropPosition});
 await pipeline.jpeg({quality:90}).toFile(join(out,`${p.id}.jpg`));
}
console.log(out);
