const http=require('http');
const fs=require('fs');
const path=require('path');
const root=path.join(__dirname,'public');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
  let pathname;
  try {pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch {res.writeHead(400);return res.end('Bad request');}
  if(pathname.startsWith('/api/')){res.writeHead(501,{'Content-Type':'application/json; charset=utf-8'});return res.end(JSON.stringify({error:'Automatic live price search is not configured. Use manual comparison.'}));}
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);});
}).listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('ZF SmartShop V6.1 running'));
