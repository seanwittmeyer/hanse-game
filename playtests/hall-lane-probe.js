// HALL-LANE PROBE (v4.16 "Standing Orders") — the volume-lane oracle. KEEP.
// Designer-called 2026-08-12: "It should be a lane or strategy to go volume there [the Hall] —
// going there should compensate for the lack of majorities points and should have a mechanism
// to allow continued access via invites." This instrument answers WHICH dial print makes that
// true, with 3p tables of STRONG seats — Cellarmaster (pure search) + Guildmaster (the
// designer's 'quality' persona) + a COMMITTED-LANE Guildmaster (persona 'hall') — seats
// rotated per game. The lane read: the committed seat's win rate vs the plain GM at the SAME
// budget (fair ≈ equal thirds; the CM is the strong benchmark).
//
// Usage (one shard):
//   ARM=pips N=10 SEAT0=0 OUT=playtests/lane-corpus/pips-s0.jsonl \
//     PIPS=1 LADDER= ICW=0 IBLDG=0 CMS=220 GMS=100 node playtests/hall-lane-probe.js
// Dials ride env per shard: PIPS=0|1 · LADDER="0,2,5,9,14" · ICW=0.12 · IBLDG=0|1
//   (HALL_STARS / HALL_MENU sweeps from the menu study also pass through: HSTARS= · HMENU=)
// Aggregate: ARM=agg DIR=playtests/lane-corpus node playtests/hall-lane-probe.js
'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');

// ---------- AGGREGATE MODE ----------
if(process.env.ARM==='agg'){
  const dir=process.env.DIR||path.join(__dirname,'lane-corpus');
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
    const seat=k=>games.flatMap(g=>g.players.filter(p=>k==='cm'?p.tier==='cellarmaster':(k==='gm'?(p.tier==='guildmaster'&&!p.hall):(p.tier==='guildmaster'&&p.hall))));
    const T={cm:seat('cm'),gm:seat('gm'),hall:seat('hall')};
    const wins=k=>T[k].filter(p=>p.win).length;
    const avg=(a,f)=>a.length?a.reduce((s,p)=>s+f(p),0)/a.length:0;
    const S={};
    ['cm','gm','hall'].forEach(k=>{S[k]={
      n:T[k].length,win:pct(wins(k),T[k].length),total:fmt(avg(T[k],p=>p.total),1),
      ens:fmt(avg(T[k],p=>p.ens)),hallStars:fmt(avg(T[k],p=>(p.bankH||0)+(p.ext||0)),1),
      maj:fmt(avg(T[k],p=>p.maj),1),deliv:fmt(avg(T[k],p=>p.delivN)),
      claims:fmt(avg(T[k],p=>p.claims)),inv:fmt(avg(T[k],p=>p.invEarned))};});
    // invite flow by source (all players)
    const allP=games.flatMap(g=>g.players);
    const srcTot={};allP.forEach(p=>{Object.keys(p.invSrc||{}).forEach(s=>srcTot[s]=(srcTot[s]||0)+p.invSrc[s]);});
    const srcLine=Object.keys(srcTot).sort((a,b)=>srcTot[b]-srcTot[a]).map(s=>s+' '+fmt(srcTot[s]/allP.length)).join(' · ');
    // kontor health: % of games each port went undelivered
    const ports={bruges:0,london:0,bergen:0,novgorod:0};
    games.forEach(g=>{Object.keys(ports).forEach(k=>{if(!(g.ports&&g.ports[k]))ports[k]++;});});
    const deadLine=Object.keys(ports).map(k=>k.slice(0,3)+' '+pct(ports[k],games.length)+'%').join(' · ');
    // shelf fill at end + picks
    const fills=[0,1,2,3].map(i=>fmt(avg(games,g=>(g.shelves&&g.shelves[i])||0)));
    const caps=games[0]&&games[0].caps?games[0].caps.join('/'):'?';
    const picks={};games.forEach(g=>g.players.forEach(p=>(p.picks||[]).forEach(k=>{
      const key=k.shelf+':'+k.opt;picks[key]=(picks[key]||0)+1;})));
    const pickLine=Object.keys(picks).sort((a,b)=>picks[b]-picks[a]).slice(0,10).map(k=>k+' '+picks[k]).join(' · ');
    const pace=fmt(avg(games,g=>g.round),1);
    const crowns=allP.filter(p=>p.crown).length;
    out[arm]={games:games.length,errors:errs,pace,seats:S,invPerPlayer:srcLine,deadPort:deadLine,
      shelfFill:fills.join('/')+' of '+caps,crowns:pct(crowns,allP.length)+'%',picks:pickLine};
    console.log('\n== ARM '+arm+' — '+games.length+' games'+(errs?(' ('+errs+' ERRORS)'):'')+' · pace '+pace+' ==');
    console.log('  seat        n    win%   total   ens   hall★   maj   deliv  claims  inv');
    ['cm','gm','hall'].forEach(k=>{const s=S[k];
      console.log('  '+(k==='hall'?'GM-hall':k.toUpperCase()).padEnd(10)+String(s.n).padStart(3)
        +s.win.padStart(8)+String(s.total).padStart(8)+String(s.ens).padStart(6)+String(s.hallStars).padStart(8)
        +String(s.maj).padStart(6)+String(s.deliv).padStart(7)+String(s.claims).padStart(8)+String(s.inv).padStart(5));});
    console.log('  invites/player by source: '+srcLine);
    console.log('  dead-port %: '+deadLine+' · shelf fill '+out[arm].shelfFill+' · crowns '+out[arm].crowns);
    console.log('  top picks (shelf:opt): '+pickLine);
  });
  fs.writeFileSync(path.join(dir,'AGG.json'),JSON.stringify(out,null,1));
  console.log('\nwrote '+path.join(dir,'AGG.json'));
  process.exit(0);
}

// ---------- RUN MODE ----------
const N=parseInt(process.env.N||'10',10);
const COUNT=3;   // the lane oracle is a 3p instrument (CM · GM · GM-hall)
const ARM=process.env.ARM||'base';
const OUT=process.env.OUT||path.join(__dirname,'lane-corpus',ARM+'-'+process.pid+'.jsonl');
const CMS=parseInt(process.env.CMS||'220',10);
const GMS=parseInt(process.env.GMS||'100',10);
const SEAT0=parseInt(process.env.SEAT0||'0',10);
const PIPS=process.env.PIPS==='1';
const LADDER=(process.env.LADDER||'').trim();
const ICW=parseFloat(process.env.ICW||'0');
const IBLDG=process.env.IBLDG==='1';
const HSTARS=(process.env.HSTARS||'').trim();
const HMENU=(process.env.HMENU||'').trim();

const html=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
const engine=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');

const driver=`
render=function(){};save=function(){};log=function(){};snapshot=function(){};
GUILD_MS=__GMS;CELLAR_MS=__CMS;
HALL_PIPS=__PIPS?1:0;
HALL_LADDER=__LADDER?__LADDER.split(',').map(function(v){return parseInt(v,10)||0;}):null;
INV_CASK_W=__ICW||0;INV_BLDG=__IBLDG?1:0;
if(__HSTARS)__HSTARS.split(',').forEach(function(v,i){if(HALL_SHELVES[i]&&+v>0)HALL_SHELVES[i].star=parseInt(v,10);});
if(__HMENU)__HMENU.split(';').forEach(function(seg){var m=seg.split(':');var si=parseInt(m[0],10);
  if(HALL_SHELVES[si]&&!HALL_SHELVES[si].fixed&&m[1])HALL_SHELVES[si].opts=m[1].split(',').filter(Boolean);});
var __PICKS=[];
var __enshrineDo=enshrineDo;enshrineDo=function(vi,i,opt){
  var p=cur();var r=__enshrineDo(vi,i,opt);
  if(r&&!aiSimulating)__PICKS.push({pid:p.id,shelf:i,opt:opt,round:S.turn});
  return r;};
function __game(gi){
  __PICKS=[];
  EXPANSION=false;JOPEN=false;OVERLAND=false;HALLEXP=true;
  S=freshState(3,['P1','P2','P3']);UI={sub:'move'};undoStack=[];
  var seats=[{tier:'cellarmaster'},{tier:'guildmaster'},{tier:'guildmaster',persona:'hall'}];
  var off=(__SEAT0+gi)%3;
  S.players.forEach(function(p,i){p.ai=seats[(i+off)%3];p.presPool=PRES_POOL;});
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)return {arm:'__ARM',error:'runaway',sub:UI.sub};}
  var fr=finalRows();var win=fr.rows[0].p.id;
  var ports={};S.players.forEach(function(p){p.delivered.forEach(function(d){ports[d.dest]=(ports[d.dest]||0)+1;});});
  return {arm:'__ARM',round:S.turn,trigger:S.endReason||'?',ports:ports,
    shelves:[0,1,2,3].map(function(i){return hallEntries(i).length;}),
    caps:[0,1,2,3].map(function(i){return hallSpacesFor(i);}),
    players:S.players.map(function(p){var sc=scorePlayer(p);
      var inv=0;Object.keys(p.invSrc||{}).forEach(function(s){inv+=p.invSrc[s];});
      return {tier:p.ai.tier,hall:p.ai.persona==='hall',win:p.id===win,
        total:sc.total,deliv:sc.deliv,bank:sc.bank,maj:sc.maj,flight:sc.flight,bldg:sc.bldg,ext:sc.ext,
        bankH:p.bankH||0,ens:__PICKS.filter(function(k){return k.pid===p.id;}).length,
        picks:__PICKS.filter(function(k){return k.pid===p.id;}),
        claims:(p.ladings||[]).length,invSrc:p.invSrc||{},invEarned:inv,invLeft:p.invites||0,
        delivN:p.delivered.length,crown:(function(){var all=true;[0,1,2,3].forEach(function(i){
          if(!hallEntries(i).some(function(e){return e.pid===p.id;}))all=false;});return all;})()};})};
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
  __N:N,__GMS:GMS,__CMS:CMS,__SEAT0:SEAT0,
  __PIPS:PIPS,__LADDER:LADDER,__ICW:ICW,__IBLDG:IBLDG,__HSTARS:HSTARS,__HMENU:HMENU};
ctx.window=ctx;ctx.globalThis=ctx;ctx.self=ctx;
ctx.addEventListener=noop;ctx.removeEventListener=noop;
vm.createContext(ctx);
try{
  vm.runInContext(engine+'\n'+driver.replace(/__ARM/g,ARM),ctx,{filename:'play.html#hall-lane-probe'});
}catch(e){console.error('PROBE RUN ERROR:',e&&e.stack||e);process.exit(1);}

fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT,ctx.__OUTROWS.map(r=>JSON.stringify(r)).join('\n')+'\n');
const errs=ctx.__OUTROWS.filter(r=>r.error).length;
console.log('ARM '+ARM+' — '+ctx.__OUTROWS.length+' games ('+errs+' errors) → '+OUT);
if(errs)process.exit(1);
