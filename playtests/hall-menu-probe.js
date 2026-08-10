// HALL-MENU PROBE (v4.15 "Guildhall") — the designer-called menu study instrument. KEEP.
// Which benefits belong on which shelf? Drives the CANONICAL engine (play.html extracted,
// DOM stubbed) with STRONG seats — Cellarmaster + Guildmaster + a jittered/persona'd Trader —
// under swept shelf menus, and records every enshrine pick with its offered menu.
//
// Usage (one shard):
//   ARM=a1 N=3 OUT=playtests/hall-corpus/a1-s0.jsonl CMS=220 GMS=100 node playtests/hall-menu-probe.js
// Arms: base (the ruled menus) · a1/a2/a3 (cafeteria pools on shelves 1-3; Taproom stays fixed)
//       · cX:<pool1>|<pool2>|<pool3> (a custom composition, e.g. "cX:age3,goods3|brew,loadmore|brew,seal")
// Env:  N games (default 3) · COUNT players (default 3) · CMS/GMS ms budgets · JIT trader noise
//       (default 0.10) · SEAT0 rotates seat order (default: game index)
// Aggregate: ARM=agg DIR=playtests/hall-corpus node playtests/hall-menu-probe.js
'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');

// ---------- AGGREGATE MODE ----------
if(process.env.ARM==='agg'){
  const dir=process.env.DIR||path.join(__dirname,'hall-corpus');
  const rows=[];
  fs.readdirSync(dir).filter(f=>f.endsWith('.jsonl')).forEach(f=>{
    fs.readFileSync(path.join(dir,f),'utf8').split('\n').filter(Boolean).forEach(l=>{
      try{rows.push(JSON.parse(l));}catch(e){}
    });});
  const byArm={};
  rows.forEach(r=>{(byArm[r.arm]=byArm[r.arm]||[]).push(r);});
  const fmt=v=>(Math.round(v*100)/100).toFixed(2);
  const pct=(a,b)=>b?(100*a/b).toFixed(1)+'%':'—';
  const out={};
  Object.keys(byArm).sort().forEach(arm=>{
    const games=byArm[arm];
    const picks=[];games.forEach(g=>g.players.forEach(p=>p.picks.forEach(k=>picks.push(Object.assign({tier:p.tier},k)))));
    // per shelf × option: picks + share within shelf; by tier
    const shelves={};
    picks.forEach(k=>{const s=(shelves[k.shelf]=shelves[k.shelf]||{});
      const o=(s[k.opt]=s[k.opt]||{n:0,cm:0,gm:0,tr:0});o.n++;
      o[k.tier==='cellarmaster'?'cm':(k.tier==='guildmaster'?'gm':'tr')]++;});
    // hall engagement vs winning
    let winHall=0,winTot=0,hallStarsWin=0,hallStarsAll=0,crowns=0,ens=0;
    const tierWins={cellarmaster:0,guildmaster:0,trader:0};
    games.forEach(g=>{winTot++;const w=g.players.find(p=>p.win);
      if(w){tierWins[w.tier]=(tierWins[w.tier]||0)+1;if(w.ens>0)winHall++;hallStarsWin+=w.bankH||0;}
      g.players.forEach(p=>{hallStarsAll+=p.bankH||0;crowns+=p.crown?1:0;ens+=p.ens||0;});});
    const np=games.reduce((s,g)=>s+g.players.length,0)||1;
    out[arm]={games:games.length,pace:fmt(games.reduce((s,g)=>s+g.round,0)/games.length),
      shelves,winnersUsedHall:pct(winHall,winTot),tierWins,
      ensPerPlayer:fmt(ens/np),hallStarsPerPlayer:fmt(hallStarsAll/np),crownRate:pct(crowns,np)};
    console.log('\n== ARM '+arm+' — '+games.length+' games · pace '+out[arm].pace+' · enshrines/player '+out[arm].ensPerPlayer
      +' · hall★/player '+out[arm].hallStarsPerPlayer+' · crowns '+out[arm].crownRate
      +' · winners used the Hall '+out[arm].winnersUsedHall
      +' · wins CM/GM/TR '+(tierWins.cellarmaster||0)+'/'+(tierWins.guildmaster||0)+'/'+(tierWins.trader||0)+' ==');
    [3,2,1,0].forEach(si=>{const s=shelves[si];if(!s)return;
      const tot=Object.values(s).reduce((a,o)=>a+o.n,0)||1;
      const line=Object.keys(s).sort((a,b)=>s[b].n-s[a].n)
        .map(k=>k+' '+pct(s[k].n,tot)+' ('+s[k].n+' — cm'+s[k].cm+'/gm'+s[k].gm+'/tr'+s[k].tr+')').join(' · ');
      console.log('  shelf '+si+': '+line);});
  });
  fs.writeFileSync(path.join(dir,'AGG.json'),JSON.stringify(out,null,1));
  console.log('\nwrote '+path.join(dir,'AGG.json'));
  process.exit(0);
}

// ---------- RUN MODE ----------
const N=parseInt(process.env.N||'3',10);
const COUNT=parseInt(process.env.COUNT||'3',10);
const ARM=process.env.ARM||'base';
const OUT=process.env.OUT||path.join(__dirname,'hall-corpus',ARM+'-'+Date.now()+'.jsonl');
const CMS=parseInt(process.env.CMS||'220',10);
const GMS=parseInt(process.env.GMS||'100',10);
const JIT=parseFloat(process.env.JIT||'0.10');
const SEAT0=parseInt(process.env.SEAT0||'0',10);

const POOLS={   // the cafeteria arms (shelves 1-3; the Taproom stays FIXED per the ruling)
  a1:['goods3','age3','presence','invite','lift1','brew'],
  a2:['goods2','age2','ageall','loadmore','seal','brewfree'],
  a3:['goods4','load2','lift2','recipe','spec','commission'],
};

const html=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
const engine=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');

const driver=`
render=function(){};save=function(){};log=function(){};snapshot=function(){};
GUILD_MS=__GMS;CELLAR_MS=__CMS;
if(__JIT>0)AI_TIERS.trader.noise=__JIT;   // chaos on the trader seat (rollouts absorb it as exploration)
// the swept menus (shelves 1-3; shelf 0 stays the fixed Taproom)
if(__POOL1)HALL_SHELVES[1].opts=__POOL1.split(',').filter(Boolean);
if(__POOL2)HALL_SHELVES[2].opts=__POOL2.split(',').filter(Boolean);
if(__POOL3)HALL_SHELVES[3].opts=__POOL3.split(',').filter(Boolean);
// record every REAL enshrine pick (playout echoes excluded) with the offered menu
var __PICKS=[];
var __enshrineDo=enshrineDo;enshrineDo=function(vi,i,opt){
  var p=cur();var menu=(S&&S.hallInv)?hallMenuFor(p,i):[];
  var r=__enshrineDo(vi,i,opt);
  if(r&&!aiSimulating)__PICKS.push({shelf:i,opt:opt,tier:(p.ai&&p.ai.tier)||'human',offered:menu.length,round:S.turn});
  return r;};
var __INV={};
var __claimLading=claimLading;claimLading=function(lp,idx){var r=__claimLading(lp,idx);
  if(!aiSimulating&&hallOn())__INV[lp.id]=(__INV[lp.id]||0)+1;return r;};
function __game(gi){
  __PICKS=[];__INV={};
  EXPANSION=false;JOPEN=false;OVERLAND=false;HALLEXP=true;
  S=freshState(__COUNT,['P1','P2','P3','P4'].slice(0,__COUNT));UI={sub:'move'};undoStack=[];
  var seats=[{tier:'cellarmaster'},{tier:'guildmaster'},
             {tier:'trader',persona:['majority','lifter','builder','breadth'][gi%4]},
             {tier:'trader'}].slice(0,__COUNT);
  var off=(__SEAT0+gi)%__COUNT;
  S.players.forEach(function(p,i){p.ai=seats[(i+off)%__COUNT];p.presPool=PRES_POOL;});
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)return {error:'runaway',sub:UI.sub};}
  var fr=finalRows();var win=fr.rows[0].p.id;
  return {arm:'__ARM',round:S.turn,trigger:S.endReason||'?',
    players:S.players.map(function(p){var sc=scorePlayer(p);
      return {tier:(p.ai&&p.ai.tier)||'?',persona:(p.ai&&p.ai.persona)||null,win:p.id===win,
        total:sc.total,bankH:p.bankH||0,crown:sc.ext>0,claims:(p.ladings||[]).length,
        invClaims:__INV[p.id]||0,ens:__PICKS.filter(function(k){return k.pid===p.id;}).length,
        picks:__PICKS.filter(function(k){return k.pid===p.id;})}; })};
}
// pid rides each pick (patch above lacks it — wrap once more, cheaply)
var __enshrineDo2=enshrineDo;enshrineDo=function(vi,i,opt){var p=cur();var n0=__PICKS.length;
  var r=__enshrineDo2(vi,i,opt);
  if(__PICKS.length>n0)__PICKS[__PICKS.length-1].pid=p.id;
  return r;};
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

let p1='',p2='',p3='';
if(POOLS[ARM]){p1=p2=p3=POOLS[ARM].join(',');}
else if(ARM.startsWith('cX:')){const seg=ARM.slice(3).split('|');p1=seg[0]||'';p2=seg[1]||'';p3=seg[2]||'';}

const ctx={document:documentStub,localStorage:localStorageStub,console,Math,JSON,Date,Set,Map,Array,Object,String,Number,Boolean,
  parseInt,parseFloat,isNaN,alert:noop,setTimeout:noop,clearTimeout:noop,lucide:{createIcons:noop},
  __N:N,__COUNT:COUNT,__GMS:GMS,__CMS:CMS,__JIT:JIT,__SEAT0:SEAT0,
  __POOL1:p1,__POOL2:p2,__POOL3:p3};
ctx.window=ctx;ctx.globalThis=ctx;ctx.self=ctx;
ctx.addEventListener=noop;ctx.removeEventListener=noop;
vm.createContext(ctx);
try{
  vm.runInContext(engine+'\n'+driver.replace(/__ARM/g,ARM),ctx,{filename:'play.html#hall-menu-probe'});
}catch(e){console.error('PROBE RUN ERROR:',e&&e.stack||e);process.exit(1);}

fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT,ctx.__OUTROWS.map(r=>JSON.stringify(r)).join('\n')+'\n');
const errs=ctx.__OUTROWS.filter(r=>r.error).length;
console.log('ARM '+ARM+' — '+ctx.__OUTROWS.length+' games ('+errs+' errors) → '+OUT);
if(errs)process.exit(1);
