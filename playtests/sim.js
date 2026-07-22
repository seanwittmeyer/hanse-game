// Headless simulation harness for play.html — v4.0 "Bright Beer" (KEY hanse-v40).
// Drives the CANONICAL engine (never a reimplementation): extracts play.html's <script> blocks,
// stubs the DOM, and runs the engine's OWN AI (aiStep) for every seat. The robustness/pace gate:
// 0 crashes / 0 deadlocks across 2–4p, rounds in the 12–25 band, trigger split reported.
// Usage: node playtests/sim.js [N]      (N games per player count; default 100)
// Env:   TIER=apprentice|journeyman|trader|guildmaster|cellarmaster (default journeyman)
//        PERSONAS=1 — the v4 PATHWAYS oracle: trader seats committed round-robin to the four lanes
//                     (majority · lifter · builder · breadth); per-lane win rates reported
//        CAPS=7,10,13 sweeps SAILED_CAP · POOL=n sweeps the dice pool · GUILD_MS/CELLAR_MS lower the MC budgets
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '100', 10);
const TIER = process.env.TIER || 'journeyman';
const PERSONAS = process.env.PERSONAS === '1';
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= HEADLESS RUNNER (appended in-scope) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__POOL>0)PRES_POOL=__POOL;
if(__CAPS)SAILED_CAP=__CAPS;
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
function __runGame(n){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n,['P1','P2','P3','P4','P5'].slice(0,n));UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p,i){p.ai=__PERSONAS?{tier:'trader',persona:AI_PERSONAS[i%AI_PERSONAS.length]}:{tier:__TIER};p.presPool=PRES_POOL;});
  var guard=0;
  while(!S.over){
    aiStep();
    if(++guard>150000)return {error:'runaway (guard tripped)',round:S.turn,sub:UI.sub};
  }
  var fr=finalRows();var rows=fr.rows;
  var byDest={bruges:0,london:0,bergen:0,novgorod:0};
  S.players.forEach(function(p){p.delivered.forEach(function(d){byDest[d.dest]=(byDest[d.dest]||0)+1;});});
  return {round:S.turn,trigger:S.endReason||'?',sailed:S.sailed,
    winSeat:rows[0].p.id,winPersona:(rows[0].p.ai&&rows[0].p.ai.persona)||null,personas:S.players.map(function(q){return (q.ai&&q.ai.persona)||null;}),
    winTotal:rows[0].sc.total,secondTotal:rows[1]?rows[1].sc.total:0,
    byDest:byDest,
    brews:S.players.reduce(function(a,p){return a+(p._brews||0);},0)/S.players.length,
    delivs:S.players.reduce(function(a,p){return a+p.delivered.length;},0)/S.players.length,
    builds:S.players.reduce(function(a,p){return a+(p.bank||0);},0)/S.players.length,
    parts:rows.map(function(r){return {deliv:r.sc.deliv,bank:r.sc.bank,maj:r.sc.maj,flight:r.sc.flight,total:r.sc.total};})};
}
var __RESULTS={};
[2,3,4].forEach(function(n){
  __RESULTS[n]=[];
  for(var g=0;g<__N;g++){
    var r;
    try{r=__runGame(n);}catch(e){r={error:String(e&&e.stack||e).slice(0,400),round:(typeof S!=='undefined'&&S)?S.turn:0};}
    __RESULTS[n].push(r);
  }
});
this.__RESULTS=__RESULTS;
`;

const noop = () => {};
const elStub = () => ({ innerHTML:'', textContent:'', value:'', style:{}, disabled:false,
  classList:{ add:noop, remove:noop, toggle:noop, contains:()=>false },
  setAttribute:noop, getAttribute:()=>null, appendChild:noop, removeChild:noop, focus:noop,
  querySelector:()=>null, querySelectorAll:()=>[],
  getBoundingClientRect:()=>({left:0,top:0,right:0,bottom:0,width:0,height:0}) });
const document = { getElementById:()=>elStub(), createElement:()=>elStub(),
  addEventListener:noop, removeEventListener:noop, querySelector:()=>null, querySelectorAll:()=>[],
  body:{ appendChild:noop, contains:()=>false }, head:{ appendChild:noop } };
const store = {};
const localStorage = { getItem:k=>(k in store?store[k]:null), setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];} };

const ctx = {
  document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert:noop,
  setTimeout:noop, clearTimeout:noop,
  lucide:{ createIcons:noop },
  __N:N, __TIER:TIER,
  __POOL:parseInt(process.env.POOL||'0',10),
  __PERSONAS:PERSONAS,
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
  __CMS:parseInt(process.env.CELLAR_MS||'0',10),
  __CAPS:process.env.CAPS?(a=>({2:+a[0],3:+a[1],4:+a[2]}))(process.env.CAPS.split(',')):null,
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+driver' });
} catch (e) {
  console.error('RUN ERROR:', e && e.stack || e);
  process.exit(1);
}

const R = ctx.__RESULTS;
const fmt=(x,d=1)=>Number(x).toFixed(d);
const pct=(a,b)=>fmt(100*a/Math.max(1,b),1)+'%';
console.log('=== hanse v4.0 sim — '+N+' games/count · '+(PERSONAS?'PATHWAYS (trader personas)':('tier '+TIER))+' ===');
let anyErr=0;
[2,3,4].forEach(n=>{
  const arr=R[n]; const errs=arr.filter(r=>r.error); const ok=arr.filter(r=>!r.error);
  anyErr+=errs.length;
  if(errs.length)console.log(`\n-- ${n}p ERRORS (${errs.length}) --\n`+errs.slice(0,3).map(e=>e.error+' @round '+e.round+(e.sub?' sub='+e.sub:'')).join('\n'));
  if(!ok.length){console.log(`\n== ${n}p: ALL FAILED ==`);return;}
  const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
  const rounds=ok.map(r=>r.round);
  const within=ok.filter(r=>r.round>=12&&r.round<=25).length;
  const trig={};ok.forEach(r=>trig[r.trigger]=(trig[r.trigger]||0)+1);
  const seat={};ok.forEach(r=>seat[r.winSeat]=(seat[r.winSeat]||0)+1);
  const dd={bruges:0,london:0,bergen:0,novgorod:0};ok.forEach(r=>Object.keys(dd).forEach(k=>dd[k]+=r.byDest[k]||0));
  const dsum=Object.values(dd).reduce((a,b)=>a+b,0)||1;
  console.log(`\n== ${n}p · ${ok.length} ok / ${errs.length} err ==`);
  console.log(`rounds avg ${fmt(avg(rounds))} (min ${Math.min(...rounds)} max ${Math.max(...rounds)}) · in 12–25 band ${pct(within,ok.length)}`);
  console.log(`triggers: ${Object.keys(trig).map(k=>k+' '+pct(trig[k],ok.length)).join(' · ')} · sailed avg ${fmt(avg(ok.map(r=>r.sailed)))}`);
  console.log(`winner total avg ${fmt(avg(ok.map(r=>r.winTotal)))} · margin avg ${fmt(avg(ok.map(r=>r.winTotal-r.secondTotal)))} · seat wins ${Object.keys(seat).map(s=>'P'+(+s+1)+' '+pct(seat[s],ok.length)).join(' ')}`);
  console.log(`per-player: brews ${fmt(avg(ok.map(r=>r.brews)))} · deliveries ${fmt(avg(ok.map(r=>r.delivs)))} · bank★ ${fmt(avg(ok.map(r=>r.builds)))}`);
  console.log(`delivery split: ${Object.keys(dd).map(k=>k+' '+pct(dd[k],dsum)).join(' · ')}`);
  if(PERSONAS){const pw={},pn={};
    ok.forEach(r=>{(r.personas||[]).forEach(ps=>{if(ps)pn[ps]=(pn[ps]||0)+1;});if(r.winPersona)pw[r.winPersona]=(pw[r.winPersona]||0)+1;});
    console.log('PATHWAYS win-rate by lane: '+Object.keys(pn).map(k=>k+' '+pct(pw[k]||0,pn[k])).join(' · ')+'  (seats: '+Object.keys(pn).map(k=>pn[k]).join('/')+')');}
});
console.log(anyErr? `\n*** ${anyErr} ERRORS — GATE FAILED ***` : '\nGATE: 0 crashes / 0 deadlocks.');
process.exit(anyErr?1:0);
