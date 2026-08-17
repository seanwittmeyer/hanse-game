// TASTING PROBE (v4.17 "The Tastings") — the contest-cycle oracle. KEEP.
// Designer-ruled 2026-08-15 ("Build B… run a 200 CM/GM each, with some chaos to simulate
// some variable humans. I want this tested and iterated before we take it to the printer.")
// 3p tables: Cellarmaster (220ms, pure search) + Guildmaster (100ms, the standing 'quality'
// persona) + the CHAOS SEAT — a jittered Trader (noise 0.15 ⚙: that often it takes a random
// legal action — the variable human) whose persona rotates per game through
// majority/lifter/builder/breadth/hall. Seats rotate per game.
//
// Usage (one shard):
//   ARM=tast N=10 SEAT0=0 HALL=1 OUT=playtests/tasting-corpus/tast-s0.jsonl \
//     STARTINV=1 TSTARS= BENCH= EJUDGE= CMS=220 GMS=100 JIT=0.15 node playtests/tasting-probe.js
// HALL=0 runs the hall-less base (the control arm). Dials ride env per shard:
//   STARTINV=n · TSTARS="free:5,dark:7,…" · BENCH="2,3,3" · EJUDGE=void|judge
// Aggregate: ARM=agg DIR=playtests/tasting-corpus node playtests/tasting-probe.js
'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');

// ---------- AGGREGATE MODE ----------
if(process.env.ARM==='agg'){
  const dir=process.env.DIR||path.join(__dirname,'tasting-corpus');
  const rows=[];
  fs.readdirSync(dir).filter(f=>f.endsWith('.jsonl')).forEach(f=>{
    fs.readFileSync(path.join(dir,f),'utf8').split('\n').filter(Boolean).forEach(l=>{
      try{rows.push(JSON.parse(l));}catch(e){}
    });});
  const byArm={};
  rows.forEach(r=>{(byArm[r.arm]=byArm[r.arm]||[]).push(r);});
  const fmt=(v,d)=>v.toFixed(d==null?2:d);
  const pct=(a,b)=>b?(100*a/b).toFixed(1):'—';
  const out={};
  Object.keys(byArm).sort().forEach(arm=>{
    const games=byArm[arm].filter(g=>!g.error);
    const errs=byArm[arm].length-games.length;
    const seat=k=>games.flatMap(g=>g.players.filter(p=>k==='cm'?p.tier==='cellarmaster':(k==='gm'?p.tier==='guildmaster':p.tier==='trader')));
    const T={cm:seat('cm'),gm:seat('gm'),chaos:seat('chaos')};
    const wins=k=>T[k].filter(p=>p.win).length;
    const avg=(a,f)=>a.length?a.reduce((s,p)=>s+f(p),0)/a.length:0;
    const SS={};
    ['cm','gm','chaos'].forEach(k=>{SS[k]={
      n:T[k].length,win:pct(wins(k),T[k].length),total:fmt(avg(T[k],p=>p.total),1),
      pours:fmt(avg(T[k],p=>p.pours)),won:fmt(avg(T[k],p=>p.tilesWon)),
      hallStars:fmt(avg(T[k],p=>(p.bankH||0)+(p.ext||0)),1),maj:fmt(avg(T[k],p=>p.maj),1),
      claims:fmt(avg(T[k],p=>p.claims)),inv:fmt(avg(T[k],p=>p.invEarned))};});
    const allP=games.flatMap(g=>g.players);
    const srcTot={};allP.forEach(p=>{Object.keys(p.invSrc||{}).forEach(x=>srcTot[x]=(srcTot[x]||0)+p.invSrc[x]);});
    const srcLine=Object.keys(srcTot).sort((a,b)=>srcTot[b]-srcTot[a]).map(x=>x+' '+fmt(srcTot[x]/allP.length)).join(' · ');
    const ports={bruges:0,london:0,bergen:0,novgorod:0};
    games.forEach(g=>{Object.keys(ports).forEach(k=>{if(!(g.ports&&g.ports[k]))ports[k]++;});});
    const deadLine=Object.keys(ports).map(k=>k.slice(0,3)+' '+pct(ports[k],games.length)+'%').join(' · ');
    const judged=avg(games,g=>g.judged||0),unconv=avg(games,g=>g.unconvened||0),slams=avg(games,g=>g.slams||0);
    const catW={};games.forEach(g=>g.players.forEach(p=>(p.cats||[]).forEach(c=>catW[c]=(catW[c]||0)+1)));
    const catLine=Object.keys(catW).sort((a,b)=>catW[b]-catW[a]).map(c=>c+' '+catW[c]).join(' · ');
    const sets=allP.filter(p=>(p.cats||[]).length>=2).length;
    const pace=fmt(avg(games,g=>g.round),1);
    out[arm]={games:games.length,errors:errs,pace,seats:SS,invPerPlayer:srcLine,deadPort:deadLine,
      judgedPerGame:fmt(judged),unconvenedPerGame:fmt(unconv),slamsPerGame:fmt(slams),
      setRate:pct(sets,allP.length)+'%',catWins:catLine};
    console.log('\n== ARM '+arm+' — '+games.length+' games'+(errs?(' ('+errs+' ERRORS)'):'')+' · pace '+pace+' ==');
    console.log('  seat      n    win%   total  pours  won  hall★   maj  claims  inv');
    ['cm','gm','chaos'].forEach(k=>{const x=SS[k];
      console.log('  '+(k==='chaos'?'CHAOS':k.toUpperCase()).padEnd(8)+String(x.n).padStart(3)
        +x.win.padStart(8)+String(x.total).padStart(8)+String(x.pours).padStart(7)+String(x.won).padStart(5)
        +String(x.hallStars).padStart(7)+String(x.maj).padStart(6)+String(x.claims).padStart(8)+String(x.inv).padStart(5));});
    console.log('  tastings/game: judged '+fmt(judged)+' · unconvened at end '+fmt(unconv)+' · door-slams '+fmt(slams)
      +' · players with a 2+cat set: '+out[arm].setRate);
    console.log('  invites/player by source: '+(srcLine||'—')+' · category wins: '+(catLine||'—'));
    console.log('  dead-port %: '+deadLine);
  });
  fs.writeFileSync(path.join(dir,'AGG.json'),JSON.stringify(out,null,1));
  console.log('\nwrote '+path.join(dir,'AGG.json'));
  process.exit(0);
}

// ---------- RUN MODE ----------
const N=parseInt(process.env.N||'10',10);
const ARM=process.env.ARM||'tast';
const OUT=process.env.OUT||path.join(__dirname,'tasting-corpus',ARM+'-'+process.pid+'.jsonl');
const CMS=parseInt(process.env.CMS||'220',10);
const GMS=parseInt(process.env.GMS||'100',10);
const JIT=parseFloat(process.env.JIT||'0.15');
const SEAT0=parseInt(process.env.SEAT0||'0',10);
const HALL=process.env.HALL!=='0';
const SINV=(process.env.STARTINV||'').trim();
const TSTARS=(process.env.TSTARS||'').trim();
const TBENCH=(process.env.BENCH||'').trim();
const EJ=(process.env.EJUDGE||'').trim();

const html=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
const engine=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');

const driver=`
render=function(){};save=function(){};log=function(){};snapshot=function(){};
GUILD_MS=__GMS;CELLAR_MS=__CMS;
if(__JIT>0)AI_TIERS.trader.noise=__JIT;   // the CHAOS seat — the variable human
if(__SINV!=='')START_INV=parseInt(__SINV,10)||0;
if(__TSTARS!=='')__TSTARS.split(',').forEach(function(seg){var m=seg.split(':');
  CONTESTS.forEach(function(t){if(t.cat===m[0]&&+m[1]>0)t.s1=parseInt(m[1],10);});});
if(__TBENCH!=='')CONTEST_BENCH=__TBENCH.split(',').map(function(v){return parseInt(v,10)||3;});
if(__EJ!=='')END_JUDGE=__EJ;
var __POURS=[],__SLAMS=0,__JUDGED=0;
var __pourDo=pourDo;pourDo=function(vi,ci){var ct=S&&S.tastings&&(S.tastings.open||[])[ci];
  var pre=ct?ct.bench.length:0;var lead=ct?benchLeader(ct):null;var p=cur();
  var r=__pourDo(vi,ci);
  if(r&&!aiSimulating){__POURS.push({pid:p.id,round:S.turn});
    if(pre===benchSize()-1){__JUDGED++;if(lead&&lead.pid===p.id)__SLAMS++;}}
  return r;};
var CHAOS_PERSONAS=['majority','lifter','builder','breadth','hall'];
function __game(gi){
  __POURS=[];__SLAMS=0;__JUDGED=0;
  EXPANSION=false;JOPEN=false;OVERLAND=false;HALLEXP=__HALL;
  S=freshState(3,['P1','P2','P3']);UI={sub:'move'};undoStack=[];
  var seats=[{tier:'cellarmaster'},{tier:'guildmaster'},
             {tier:'trader',persona:CHAOS_PERSONAS[gi%CHAOS_PERSONAS.length]}];
  var off=(__SEAT0+gi)%3;
  S.players.forEach(function(p,i){p.ai=seats[(i+off)%3];p.presPool=PRES_POOL;});
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)return {arm:'__ARM',error:'runaway',sub:UI.sub};}
  var fr=finalRows();var win=fr.rows[0].p.id;
  var ports={};S.players.forEach(function(p){p.delivered.forEach(function(d){ports[d.dest]=(ports[d.dest]||0)+1;});});
  var unconv=0;if(S.tastings)(S.tastings.open||[]).forEach(function(ct){if(ct.bench.length)unconv++;});
  return {arm:'__ARM',round:S.turn,trigger:S.endReason||'?',ports:ports,
    judged:__JUDGED,slams:__SLAMS,unconvened:unconv,
    players:S.players.map(function(p){var sc=scorePlayer(p);
      var inv=0;Object.keys(p.invSrc||{}).forEach(function(x){inv+=p.invSrc[x];});
      return {tier:p.ai.tier,persona:p.ai.persona||null,win:p.id===win,
        total:sc.total,deliv:sc.deliv,bank:sc.bank,maj:sc.maj,flight:sc.flight,bldg:sc.bldg,ext:sc.ext,
        bankH:p.bankH||0,pours:__POURS.filter(function(k){return k.pid===p.id;}).length,
        tilesWon:(p.tastings||[]).length,cats:Object.keys((p.tastings||[]).reduce(function(m,t){m[t.cat]=1;return m;},{})),
        claims:(p.ladings||[]).length,invSrc:p.invSrc||{},invEarned:inv,invLeft:p.invites||0,
        delivN:p.delivered.length};})};
}
var __OUTROWS=[];
for(var g=0;g<__N;g++){__OUTROWS.push(__game(g));}
this.__OUTROWS=__OUTROWS;
`;

const noop=()=>{};
const elStub=()=>({innerHTML:'',textContent:'',value:'',style:{},disabled:false,
  classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},
  setAttribute:noop,getAttribute:()=>null,appendChild:noop,removeChild:noop,focus:noop,
  querySelector:()=>null,querySelectorAll:()=>[],
  getBoundingClientRect:()=>({left:0,top:0,right:0,bottom:0,width:0,height:0})});
const documentStub={getElementById:()=>elStub(),createElement:()=>elStub(),
  addEventListener:noop,removeEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],
  body:{appendChild:noop,contains:()=>false},head:{appendChild:noop}};
const store={};
const localStorageStub={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];}};

const ctx={document:documentStub,localStorage:localStorageStub,console,Math,JSON,Date,Set,Map,Array,Object,String,Number,Boolean,
  parseInt,parseFloat,isNaN,alert:noop,setTimeout:noop,clearTimeout:noop,lucide:{createIcons:noop},
  __N:N,__GMS:GMS,__CMS:CMS,__JIT:JIT,__SEAT0:SEAT0,__HALL:HALL,
  __SINV:SINV,__TSTARS:TSTARS,__TBENCH:TBENCH,__EJ:EJ};
ctx.window=ctx;ctx.globalThis=ctx;ctx.self=ctx;
ctx.addEventListener=noop;ctx.removeEventListener=noop;
vm.createContext(ctx);
try{
  vm.runInContext(engine+'\n'+driver.replace(/__ARM/g,ARM),ctx,{filename:'play.html#tasting-probe'});
}catch(e){console.error('PROBE RUN ERROR:',e&&e.stack||e);process.exit(1);}

fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT,ctx.__OUTROWS.map(r=>JSON.stringify(r)).join('\n')+'\n');
const errs=ctx.__OUTROWS.filter(r=>r.error).length;
console.log('ARM '+ARM+' — '+ctx.__OUTROWS.length+' games ('+errs+' errors) → '+OUT);
if(errs)process.exit(1);
