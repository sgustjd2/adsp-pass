import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist'),port=Number(process.env.ADSP_PORT??4173);
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
  try{
    const requestPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/adsp-pass\//,'/');
    const file=path.resolve(root,'.'+(requestPath.endsWith('/')?requestPath+'index.html':requestPath));
    if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]??'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(file).pipe(res);
  }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'0.0.0.0',()=>console.log(`Local: http://localhost:${port}/adsp-pass/`));
