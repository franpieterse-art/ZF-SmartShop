const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'public');
const port = Number(process.env.PORT) || 3000;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch {res.writeHead(400);return res.end('Bad request');}
  let target = path.resolve(root, '.' + pathname);
  if (!target.startsWith(root + path.sep) && target !== root) {res.writeHead(403);return res.end('Forbidden');}
  if (pathname === '/' || pathname === '/index.html') target = path.join(root,'index.html');
  fs.stat(target,(err,stat)=>{
    if(err || !stat.isFile()) {
      // Single-page application fallback for direct page loads.
      target=path.join(root,'index.html');
    }
    fs.readFile(target,(readErr,data)=>{
      if(readErr){res.writeHead(500);return res.end('App homepage missing');}
      res.writeHead(200,{'Content-Type':mime[path.extname(target).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});
      res.end(data);
    });
  });
}).listen(port,'0.0.0.0',()=>console.log(`ZF SmartShop V7 listening on ${port}`));
