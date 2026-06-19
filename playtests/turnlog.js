// Turn-by-turn play-log analysis for play.html — runs the canonical engine headless (instant mode),
// CAPTURES the engine's own log() narrative per turn (not stubbed), and measures game FEEL:
//   • efficiency  — decisions resolved per turn, no-op/skip rate, actions that did nothing
//   • decisions   — how often each decision type comes up; how rich a turn is
//   • Floor↔toll  — how often the occupied-station fork is offered, and toll-paid vs Floor-worked
// Plus it dumps a readable turn-by-turn transcript of one sample game for qualitative review.
//
// Usage: node playtests/turnlog.js [N]    Env: TIERS=trader|guildmaster|... (default trader) · COUNTS=3 · SAMPLE=1 (print a transcript)
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const N = parseInt(process.argv[2] || '120', 10);
const COUNTS = (process.env.COUNTS ? process.env.COUNTS.split(',') : ['3']).map(x => parseInt(x, 10));
const TIERS = (process.env.TIERS || 'trader').split(',').map(t => t.trim()).filter(Boolean);
const SAMPLE = process.env.SAMPLE === '1';
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= TURN-LOG DRIVER (appended) =================
render=function(){};save=function(){};snapshot=function(){};
GUILD_MS=__GMS||40;GUILD_MIN=1;if(typeof CELLAR_MS!=='undefined'){CELLAR_MS=60;CELLAR_MIN=1;CELLAR_CAP=400;}

// CAPTURE the narrative log (strip HTML) tagged with round + active player. Guard vs MC playouts.
var __LOG=null;
log=function(txt){ if(!__LOG||aiSimulating)return; __LOG.push({r:S.turn,p:S.active,txt:String(txt).replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/\\s+/g,' ').trim()}); };

// decision-point + fork instrumentation (hook the engine's own functions)
var __D=null;   // per-game decision tally
function mkAI(t){ if(t==='trader')return {tier:'trader',persona:['volume','prestige','majority'][Math.floor(Math.random()*3)]}; return {tier:t,persona:null}; }
var _tollPay=tollPay; tollPay=function(){ if(__D&&!aiSimulating){__D.forkOffered++;__D.tollPaid++;} return _tollPay(); };
var _tollFloor=tollFloor; tollFloor=function(){ if(__D&&!aiSimulating){__D.forkOffered++;__D.floorWorked++;} return _tollFloor(); };
var _deploySkip=(typeof deploySkip!=='undefined')?deploySkip:null; if(_deploySkip)deploySkip=function(){if(__D&&!aiSimulating)__D.skips++;return _deploySkip();};
var _loadSkip=(typeof loadSkip!=='undefined')?loadSkip:null; if(_loadSkip)loadSkip=function(){if(__D&&!aiSimulating)__D.skips++;return _loadSkip();};
var _tapSkip=tapSkip; tapSkip=function(){if(__D&&!aiSimulating)__D.skips++;return _tapSkip();};
var _runFloorNext=runFloorNext; runFloorNext=function(){if(__D&&!aiSimulating&&UI.floorQueue&&UI.floorQueue.length)__D.floorActions++;return _runFloorNext();};

var __GAMES=[];
function runOne(np,tiers,gi){
  S=freshState(np,['P1','P2','P3','P4'].slice(0,np));UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p,i){p.ai=mkAI(tiers[(i+gi)%tiers.length]);});
  __LOG=[]; __D={forkOffered:0,tollPaid:0,floorWorked:0,floorActions:0,skips:0,steps:0,subCount:{},perTurnSteps:[]};
  var guard=0, lastTurnKey=null, stepsThisTurn=0;
  while(!S.over){
    var sub=UI.sub, who=S.active, tk=S.turn+'-'+who;
    if(lastTurnKey!==null&&tk!==lastTurnKey){__D.perTurnSteps.push(stepsThisTurn);stepsThisTurn=0;}
    lastTurnKey=tk;
    // count a "decision" only for substantive prompts (skip the mechanical end/move bookkeeping is still a step)
    __D.steps++; stepsThisTurn++; __D.subCount[sub]=(__D.subCount[sub]||0)+1;
    aiStep();
    if(++guard>400000)break;
  }
  __D.perTurnSteps.push(stepsThisTurn);
  var fr=finalRows(); var winPid=fr.rows[0].p.id;
  var g={np:np, rounds:S.turn, tiers:S.players.map(function(p){return p.ai.tier;}), winPid:winPid, log:__LOG, d:__D,
         scores:S.players.map(function(p){return scorePlayer(p).total;})};
  __LOG=null; __D=null; __GAMES.push(g);
}
COUNTSX.forEach(function(np){for(var g=0;g<NX;g++)runOne(np,TIERSX,g);});
var __OUT=JSON.stringify(__GAMES);
`;
const noop = () => {};
const makeEl = () => { const el = { innerHTML:'', textContent:'', value:'', style:{}, classList:{add:noop,remove:noop,toggle:noop,contains:()=>false}, setAttribute:noop, getAttribute:()=>null, appendChild:noop, addEventListener:noop, removeEventListener:noop }; el.querySelector=()=>makeEl(); el.querySelectorAll=()=>[]; el.closest=()=>null; return el; };
const document = { getElementById:()=>makeEl(), querySelector:()=>makeEl(), querySelectorAll:()=>[], createElement:()=>makeEl(), addEventListener:noop, body:makeEl() };
const store={}; const localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];}};
const ctx = { document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean, parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop}, COUNTSX:COUNTS, NX:N, TIERSX:TIERS, __GMS:parseInt(process.env.GUILD_MS||'0',10) };
ctx.window=ctx; ctx.globalThis=ctx; ctx.self=ctx; ctx.addEventListener=noop; ctx.removeEventListener=noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'turnlog' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }
const GAMES = JSON.parse(ctx.__OUT);

// ================= report =================
const fmt=(x,d=1)=>(x==null||Number.isNaN(x))?'—':Number(x).toFixed(d);
const pct=(a,b)=>b?fmt(100*a/b,1)+'%':'—';
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:NaN;
const sum=a=>a.reduce((x,y)=>x+y,0);

console.log(`Brewhouses — TURN-BY-TURN feel analysis  |  ${GAMES.length} games  |  tiers=${TIERS.join(',')}  counts=${COUNTS.join(',')}`);
console.log(`avg rounds ${fmt(mean(GAMES.map(g=>g.rounds)))}   winner avg score ${fmt(mean(GAMES.map(g=>Math.max(...g.scores))))}`);

COUNTS.forEach(np=>{
  const gs=GAMES.filter(g=>g.np===np); if(!gs.length)return;
  const allTurns=[].concat(...gs.map(g=>g.d.perTurnSteps));
  const steps=sum(gs.map(g=>g.d.steps));
  const forks=sum(gs.map(g=>g.d.forkOffered)), toll=sum(gs.map(g=>g.d.tollPaid)), floor=sum(gs.map(g=>g.d.floorWorked));
  const skips=sum(gs.map(g=>g.d.skips)), floorActs=sum(gs.map(g=>g.d.floorActions));
  const turns=sum(gs.map(g=>g.d.perTurnSteps.length));
  // aggregate sub-type frequency
  const subAgg={}; gs.forEach(g=>{for(const k in g.d.subCount)subAgg[k]=(subAgg[k]||0)+g.d.subCount[k];});
  console.log(`\n================  ${np}p  (${gs.length} games)  ================`);
  console.log(`EFFICIENCY:  decisions/turn avg ${fmt(mean(allTurns))} (min ${Math.min(...allTurns)}, max ${Math.max(...allTurns)})   turns/game ${fmt(turns/gs.length)}   decisions/game ${fmt(steps/gs.length)}`);
  console.log(`             skips (deploy/load/tap "nothing") ${fmt(skips/gs.length)}/game = ${pct(skips,steps)} of decisions`);
  console.log(`FLOOR↔TOLL:  occupied-station fork offered ${fmt(forks/gs.length)}/game (${pct(forks,turns)} of turns)   →  toll-paid ${pct(toll,forks)}  ·  Floor-worked ${pct(floor,forks)}   (Floor cask/flip actions ${fmt(floorActs/gs.length)}/game)`);
  const subRows=Object.entries(subAgg).sort((a,b)=>b[1]-a[1]);
  console.log(`DECISION MIX (share of all prompts):  `+subRows.map(([k,v])=>`${k} ${pct(v,steps)}`).join('  '));
});

// sample transcript (one mid game)
if(SAMPLE){
  const g=GAMES.find(x=>x.np===COUNTS[0])||GAMES[0];
  console.log(`\n================  SAMPLE TRANSCRIPT — ${g.np}p, ${g.rounds} rounds, tiers ${g.tiers.join('/')}, winner P${g.winPid+1}  ================`);
  let lastR=null;
  g.log.slice(0, 90).forEach(e=>{ if(e.r!==lastR){console.log(`\n--- Round ${e.r} ---`);lastR=e.r;} console.log(`  P${e.p+1}: ${e.txt}`); });
  if(g.log.length>90)console.log(`  … (${g.log.length-90} more lines)`);
}
console.log('');
