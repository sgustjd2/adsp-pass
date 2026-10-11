import fs from 'node:fs';
import zlib from 'node:zlib';
// 외부 이미지 라이브러리 없이 브랜드의 책·체크 기호를 PNG로 렌더링합니다.
const table=Array.from({length:256},(_,i)=>{let n=i;for(let j=0;j<8;j++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
function crc(buf){let n=0xffffffff;for(const b of buf)n=table[(n^b)&255]^(n>>>8);return (n^0xffffffff)>>>0;}
function chunk(type,bytes){const t=Buffer.from(type),size=Buffer.alloc(4),checksum=Buffer.alloc(4);size.writeUInt32BE(bytes.length);checksum.writeUInt32BE(crc(Buffer.concat([t,bytes])));return Buffer.concat([size,t,bytes,checksum]);}
function lineDist(x,y,a,b){const vx=b[0]-a[0],vy=b[1]-a[1],u=Math.max(0,Math.min(1,((x-a[0])*vx+(y-a[1])*vy)/(vx*vx+vy*vy)));return Math.hypot(x-a[0]-u*vx,y-a[1]-u*vy);}
const lines=[[[47,59],[70,56]],[[70,56],[96,67]],[[96,67],[122,56]],[[122,56],[145,59]],[[145,59],[145,133]],[[145,133],[122,130]],[[122,130],[96,140]],[[96,140],[70,130]],[[70,130],[47,133]],[[47,133],[47,59]],[[96,67],[96,140]],[[110,89],[119,98]],[[119,98],[134,79]]];
for(const size of [192,512]){
  const pixels=Buffer.alloc(size*(size*4+1));
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const px=(x+.5)/size*192,py=(y+.5)/size*192;
    const d=Math.min(...lines.map(([a,b])=>lineDist(px,py,a,b)));
    const alpha=Math.max(0,Math.min(1,4-d));
    const bg=[48,79,157],fg=[224,232,255],offset=y*(size*4+1)+1+x*4;
    for(let c=0;c<3;c++)pixels[offset+c]=Math.round(bg[c]*(1-alpha)+fg[c]*alpha);
    pixels[offset+3]=255;
  }
  const header=Buffer.alloc(13);header.writeUInt32BE(size,0);header.writeUInt32BE(size,4);header[8]=8;header[9]=6;
  fs.writeFileSync(`dist/icon-${size}.png`,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',zlib.deflateSync(pixels)),chunk('IEND',Buffer.alloc(0))]));
}
