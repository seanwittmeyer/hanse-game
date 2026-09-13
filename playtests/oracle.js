// oracle.js — the v8 TURN ORACLE: drives the canonical play.html engine headlessly (the same
// vm harness as sim.js) and writes a per-turn trace of every game as JSON lines, for
// playtests/oracle-study.js to read. Sim outputs are never committed.
// Usage: node playtests/oracle.js [N]           (N games per player count; default 20)
// Env:   TIER= (apprentice · journeyman · trader · guildmaster · cellarmaster; default journeyman)
//        PERSONAS=1 (the committed lanes, round-robin) · MIX=1 (random lane per seat) · PTIER= (the lanes' tier, default trader)
//        COUNTS=2,3,4 · SEED=n · GOFF=n (game offset — shards rotate the lanes) · OUT=file.jsonl (append)
//        SUPPLY= · SRCN= · MUST= · GUILD_MS / CELLAR_MS / GM_ROLLS — override only when set · PLAY=path (another build of the engine)
// Fan out: run shards in parallel with distinct SEED/GOFF and one OUT each; the study merges a directory.
'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path');
const N=parseInt(process.argv[2]||'20',10);
const TIER=process.env.TIER||'journeyman';
const PERSONAS=process.env.PERSONAS==='1',MIX=process.env.MIX==='1';
const COUNTS=(process.env.COUNTS||'2,3,4').split(',').map(x=>parseInt(x,10)).filter(x=>x>=2&&x<=5);
const SEED=parseInt(process.env.SEED||'1',10),GOFF=parseInt(process.env.GOFF||'0',10);
const OUT=process.env.OUT||'';
const html=fs.readFileSync(process.env.PLAY||path.join(__dirname,'..','play.html'),'utf8');
const engine=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const driver=fs.readFileSync(path.join(__dirname,'oracle-driver.js'),'utf8');
// a seeded PRNG stands in for Math.random so a shard replays (mulberry32)
let rs=SEED>>>0;function rng(){rs=(rs+0x6D2B79F5)>>>0;let t=rs;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;}
const M={};Object.getOwnPropertyNames(Math).forEach(k=>{M[k]=Math[k];});M.random=rng;
const noop=()=>{};
const elStub=()=>({innerHTML:'',textContent:'',value:'',style:{},disabled:false,
  classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},
  setAttribute:noop,getAttribute:()=>null,appendChild:noop,removeChild:noop,focus:noop,
  querySelector:()=>null,querySelectorAll:()=>[],
  getBoundingClientRect:()=>({left:0,top:0,right:0,bottom:0,width:0,height:0})});
const document={getElementById:()=>elStub(),createElement:()=>elStub(),
  addEventListener:noop,removeEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],
  body:{appendChild:noop,contains:()=>false},head:{appendChild:noop}};
const store={};
const localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];}};
const ctx={document,localStorage,console,Math:M,JSON,Date,Set,Map,Array,Object,String,Number,Boolean,
  parseInt,parseFloat,isNaN,alert:noop,setTimeout:noop,clearTimeout:noop,lucide:{createIcons:noop},
  __N:N,__TIER:TIER,__PERSONAS:PERSONAS,__MIX:MIX,__PTIER:process.env.PTIER||'trader',__COUNTS:COUNTS,__SEED:SEED,__GOFF:GOFF,
  __seed:s=>{rs=(s>>>0)||1;},
  __SUPPLY:parseInt(process.env.SUPPLY||'0',10),__SRCN:parseInt(process.env.SRCN||'0',10),__MUST:parseInt(process.env.MUST||'-1',10),
  __GMR:parseInt(process.env.GM_ROLLS||'0',10),__GMS:parseInt(process.env.GUILD_MS||'0',10),__CMS:parseInt(process.env.CELLAR_MS||'0',10)};
ctx.window=ctx;ctx.globalThis=ctx;ctx.self=ctx;ctx.addEventListener=noop;ctx.removeEventListener=noop;
vm.createContext(ctx);
const t0=Date.now();
try{vm.runInContext(engine+'\n'+driver,ctx,{filename:'play.html#engine+oracle'});}
catch(e){console.error('RUN ERROR:',e&&e.stack||e);process.exit(1);}
const cfg={label:PERSONAS?((MIX?'mix':'lanes')+'/'+(process.env.PTIER||'trader')):TIER,tier:TIER,personas:PERSONAS,mix:MIX,ptier:process.env.PTIER||'trader',seed:SEED,goff:GOFF,must:process.env.MUST||'',supply:process.env.SUPPLY||''};
const out=ctx.__OUT;const errs=out.filter(r=>r.error);
if(OUT){fs.appendFileSync(OUT,JSON.stringify({cfg})+'\n'+out.map(r=>JSON.stringify(Object.assign({cfg:cfg.label},r))).join('\n')+'\n');}
console.log('oracle '+cfg.label+' · counts '+COUNTS.join('/')+' · '+N+' games each · seed '+SEED+'/'+GOFF+' · '+out.length+' games, '+errs.length+' errors · '+((Date.now()-t0)/1000).toFixed(0)+'s'+(OUT?' → '+path.basename(OUT):''));
if(errs.length)console.log(errs.slice(0,3).map(e=>'  ✗ '+e.error.slice(0,200)+' @round '+e.round).join('\n'));
process.exit(errs.length?1:0);
