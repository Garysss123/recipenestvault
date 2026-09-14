import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const ids=['cochinita-alt3','mole-alt3','birria-alt2','chiles-alt2','huevos-alt2'];
const cols=2,cardW=640,imageH=430,labelH=54,gap=16,rows=Math.ceil(ids.length/cols);
const width=cols*cardW+(cols+1)*gap,height=rows*(imageH+labelH)+(rows+1)*gap,composites=[];
for(const [i,id] of ids.entries()){const x=gap+(i%cols)*(cardW+gap),y=gap+Math.floor(i/cols)*(imageH+labelH+gap);const source=join(root,'assets','recipes','alternatives','mexican',`${id}.jpg`);const image=await sharp(source).rotate().resize({width:cardW,height:imageH,fit:'cover',position:'attention'}).jpeg({quality:90}).toBuffer();const label=Buffer.from(`<svg width="${cardW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fffaf7"/><text x="16" y="34" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#272225">${i+1}. ${id}</text></svg>`);composites.push({input:image,left:x,top:y},{input:label,left:x,top:y+imageH});}
const out=join(root,'qa-artifacts','mexican-review','mexican-photo-refined.jpg');await mkdir(dirname(out),{recursive:true});await sharp({create:{width,height,channels:3,background:'#f7f2ed'}}).composite(composites).jpeg({quality:90}).toFile(out);console.log(out);
