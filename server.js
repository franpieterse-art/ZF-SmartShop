import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const retailers=[{id:'spar',name:'SPAR',domain:'spar.co.za',url:'https://www.spar.co.za/'},{id:'checkers',name:'Checkers',domain:'checkers.co.za',url:'https://www.checkers.co.za/'},{id:'pnp',name:'Pick n Pay',domain:'pnp.co.za',url:'https://www.pnp.co.za/'},{id:'woolworths',name:'Woolworths',domain:'woolworths.co.za',url:'https://www.woolworths.co.za/'}];
const PORT=process.env.PORT||3000;
const money=/\bR\s?([0-9]{1,5}(?:[ ,.][0-9]{3})*(?:[.,][0-9]{2})?)\b/i;
function extractPrice(s){const m=String(s||'').match(money);if(!m)return null;let v=m[1].replace(/\s/g,'');if(v.includes(',')&&v.includes('.'))v=v.replace(/,/g,'');else if(v.includes(','))v=/,\d{2}$/.test(v)?v.replace(',','.'):v.replace(/,/g,'');return Number(v)||null}
function reply(res,code,data){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'*'});res.end(JSON.stringify(data))}
async function searchItem(item,retailer){
 const key=process.env.SERPER_API_KEY;
 if(!key)return {status:'not_configured',price:null,retailer:retailer.name,item,message:'Configure SERPER_API_KEY to enable online price discovery'};
 const query=`site:${retailer.domain} ${item} price R South Africa`;
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),9000);
 try{
 const response=await fetch('https://google.serper.dev/search',{method:'POST',headers:{'X-API-KEY':key,'Content-Type':'application/json'},body:JSON.stringify({q:query,gl:'za',hl:'en',num:8}),signal:controller.signal});
 if(!response.ok)throw new Error(`Search provider HTTP ${response.status}`);
 const data=await response.json();
 const candidates=(data.organic||[]).filter(x=>{try{let host=new URL(x.link).hostname;return host===retailer.domain||host.endsWith('.'+retailer.domain)}catch{return false}}).map(x=>({...x,price:extractPrice(`${x.snippet||''} ${x.title||''}`)})).filter(x=>x.price!==null);
 // Prices extracted from search snippets are indicative, NOT verified live stock or checkout prices.
 if(!candidates.length)return {status:'not_found',price:null,retailer:retailer.name,item};
 const c=candidates[0];return {status:'indicative',price:c.price,retailer:retailer.name,item,title:c.title,source:c.link,checkedAt:new Date().toISOString(),note:'Search-result price; confirm pack size, location and checkout price. Stock unknown.'};
 }catch(e){return {status:'error',price:null,retailer:retailer.name,item,message:e.message}}finally{clearTimeout(timeout)}
}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/api/retailers')return reply(res,200,{retailers,liveConfigured:!!process.env.SERPER_API_KEY});
 if(url.pathname==='/api/search'&&req.method==='POST'){
  let body='';try{for await(const chunk of req){body+=chunk;if(body.length>20000)throw Error('Request too large')};const data=JSON.parse(body);const items=data.items;if(!Array.isArray(items)||items.length<1||items.length>15||items.some(x=>typeof x!=='string'||!x.trim()||x.length>100))return reply(res,400,{error:'Enter 1–15 valid product names (100 characters maximum each).'});
  const results=[];for(const item of items){const row=await Promise.all(retailers.map(retailer=>searchItem(item.trim(),retailer)));results.push(row)}return reply(res,200,{items,retailers,results,queriedAt:new Date().toISOString(),disclaimer:'Indicative web search prices, not verified live retailer API quotes. Availability and delivery fees not confirmed.'});
  }catch(e){return reply(res,400,{error:e.message})}
 }
 let filename=url.pathname==='/'?'/index.html':url.pathname;if(filename.includes('..'))return reply(res,403,{error:'Forbidden'});
 try{const f=path.join(base,'public',filename);const data=await fs.readFile(f);res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(data)}catch{reply(res,404,{error:'Not found'})}
}).listen(PORT,()=>console.log(`ZF SmartShop V6 AutoSearch at http://localhost:${PORT}`));
