const http = require('http');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
const port = Number(process.env.PORT) || 3000;
http.createServer((req,res)=>{if(req.url==='/'||req.url==='/index.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html);}else{res.writeHead(404);res.end('Not found');}}).listen(port,'0.0.0.0',()=>console.log(`ZF SmartShop V7 on ${port}`));
