// BUILDING-POWER PROBE (v4.12 "Open Brewhouse") — is any building over-powered?
// Drives the CANONICAL engine (play.html extracted into a vm, the sim.js pattern) and measures,
// per building DESIGN, the three ways a tile can be "too good":
//   1. TRAFFIC   — uses/game (raw bldgTick events) + die ticks (the mark actually advancing):
//                  does one design warp the wharf's economy?
//   2. THE MARK  — end pips per build (+ departed cash-outs): does one design's mason's die
//                  reliably out-earn the others per die spent?
//   3. THE WINNER— P(win | built design d) vs P(win | built anything) vs 1/n: does building d
//                  predict winning beyond the generic builder effect? Plus the direct mints
//                  (Tollhouse bankO · Cooperage bankW v4.12) per game.
// Usage:  node playtests/bldg-power-probe.js [N]           (default 300; games per count)
// Env:    COUNTS=3        player counts (default 2,3,4)
//         TIER=trader     apprentice|journeyman|trader|guildmaster|cellarmaster
//         GUILD_MS=120    bulk MC budget for a guildmaster arm
//         EXCL=cooperage  ABLATION — strip the design's tiles from the printed set before the
//                         17-deal (the deal guarantee tolerates a missing Kiln: no swap-in).
// Findings land in archive/records/BUILDING-POWER-STUDY-v412.md; the probe stays (the
// port-probe/spec-value-probe convention).
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '300', 10);
const TIER = process.env.TIER || 'trader';
const COUNTS = (process.env.COUNTS || '2,3,4').split(',').map(x => parseInt(x, 10));
const EXCL = process.env.EXCL || '';
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= BUILDING-POWER RUNNER (appended in-scope) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
// ---- ABLATION: strip a design's tiles from the printed set (the 17-deal then draws from what
// remains; the Kiln/MQ guarantee finds nothing to swap in when the design is the excluded one).
if(__EXCL){var __bbd=buildBuildingDeck;buildBuildingDeck=function(){
  var d;do{d=__bbd();}while(false);
  return d.filter(function(k){return k!==__EXCL;});};}
// NOTE: filtering AFTER the deal leaves the deck a little short (15–16 of 17) — acceptable for
// an ablation arm (the design is simply absent); the base arm keeps the true 17.
// ---- per-design counters (gated on !aiSimulating so MC playout echoes never count) ----
var __B=null;
function __bReset(){__B={uses:{},ticks:{},otherTicks:{},builds:{},departPips:{}};}
function __on(){return __B&&!aiSimulating;}
var __bldgTick=bldgTick;bldgTick=function(slot){
  var b=S.buildings[slot];var k=b?b.b:null;var d0=b?b.die:0;
  var r=__bldgTick(slot);
  if(__on()&&k){__B.uses[k]=(__B.uses[k]||0)+1;
    if(b&&b.die>d0){__B.ticks[k]=(__B.ticks[k]||0)+1;
      if(b.owner!=null&&b.owner!==S.active)__B.otherTicks[k]=(__B.otherTicks[k]||0)+1;}}
  return r;};
var __commitBldg=commitBldg;commitBldg=function(slot,key,pid,feePaid){
  var r=__commitBldg(slot,key,pid,feePaid);
  if(__on()&&pid!=null&&S.buildings[slot]&&S.buildings[slot].owner===pid)
    (__B.builds[key]=__B.builds[key]||[]).push(pid);
  return r;};
var __bldgDepart=bldgDepart;bldgDepart=function(slot){
  var b=S.buildings[slot];var k=b?b.b:null;var pips=(b&&b.owner!=null&&b.die>0)?b.die:0;
  var r=__bldgDepart(slot);
  if(__on()&&k&&pips)__B.departPips[k]=(__B.departPips[k]||0)+pips;
  return r;};
function __runGame(n){
  __bReset();
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n,['P1','P2','P3','P4'].slice(0,n));UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p){p.ai={tier:__TIER};p.presPool=PRES_POOL;});
  var dealt={};S.buildDeck.concat(S.buildDisplay).forEach(function(k){dealt[k]=1;});
  SLOTS.forEach(function(s){if(S.buildings[s.id])dealt[S.buildings[s.id].b]=1;});
  var guard=0;
  while(!S.over){aiStep();if(++guard>150000)return {error:'runaway',round:S.turn,sub:UI.sub};}
  var fr=finalRows();var rows=fr.rows;var win=rows[0].p.id;
  var endPips={};SLOTS.forEach(function(s){var b=S.buildings[s.id];
    if(b&&b.owner!=null&&b.die>0)endPips[b.b]=(endPips[b.b]||0)+b.die;});
  return {round:S.turn,win:win,winTotal:rows[0].sc.total,secondTotal:rows[1]?rows[1].sc.total:0,
    dealt:Object.keys(dealt),uses:__B.uses,ticks:__B.ticks,otherTicks:__B.otherTicks,
    builds:__B.builds,departPips:__B.departPips,endPips:endPips,
    players:S.players.map(function(p){var sc=scorePlayer(p);
      return {bankO:p.bankO||0,bankW:p.bankW||0,bldg:sc.bldg||0,total:sc.total,win:p.id===win};})};
}
var __OUT={};
__COUNTS.forEach(function(n){__OUT[n]=[];
  for(var g=0;g<__N;g++){var r;
    try{r=__runGame(n);}catch(e){r={error:String(e&&e.stack||e).slice(0,300),round:(typeof S!=='undefined'&&S)?S.turn:0};}
    __OUT[n].push(r);}});
this.__OUT=__OUT;this.__BKEYS=BUILDING_KEYS.slice();
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
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop,
  lucide:{ createIcons:noop },
  __N:N, __TIER:TIER, __COUNTS:COUNTS, __EXCL:EXCL,
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
  __CMS:parseInt(process.env.CELLAR_MS||'0',10),
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#bldg-power' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }

const OUT = ctx.__OUT, BKEYS = ctx.__BKEYS;
const fmt=(x,d=2)=>Number(x).toFixed(d);
const pct=(a,b)=>fmt(100*a/Math.max(1,b),1)+'%';
console.log('=== BUILDING-POWER PROBE — '+N+' games/count · tier '+TIER+(EXCL?(' · ABLATION: no '+EXCL):' · base')+' ===');
let anyErr=0;
COUNTS.forEach(n=>{
  const arr=OUT[n]; const errs=arr.filter(r=>r.error); const ok=arr.filter(r=>!r.error);
  anyErr+=errs.length;
  if(errs.length)console.log(`-- ${n}p ERRORS (${errs.length}): `+errs.slice(0,2).map(e=>e.error).join(' | '));
  if(!ok.length)return;
  const G=ok.length;
  const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
  console.log(`\n== ${n}p · ${G} games · rounds ${fmt(avg(ok.map(r=>r.round)),1)} · winner ${fmt(avg(ok.map(r=>r.winTotal)),1)} · margin ${fmt(avg(ok.map(r=>r.winTotal-r.secondTotal)),1)} ==`);
  // generic builder baseline: P(win | built >=1 building) vs 1/n
  let builtWin=0,builtN=0,anyWin=0,anyN=0;
  ok.forEach(r=>{
    const byP={};Object.keys(r.builds).forEach(k=>r.builds[k].forEach(pid=>{byP[pid]=1;}));
    for(let pid=0;pid<n;pid++){anyN++;if(pid===r.win)anyWin++;
      if(byP[pid]){builtN++;if(pid===r.win)builtWin++;}}});
  const pAny=anyWin/anyN, pBuilt=builtN?builtWin/builtN:0;
  console.log(`builder baseline: P(win)=${pct(anyWin,anyN)} · P(win|built any)=${pct(builtWin,builtN)} (n=${builtN}) — the generic builder lift is the bar a design must beat`);
  console.log('design        dealt%  builds/g  uses/g  ticks/g  rival%  pips/build  builderWin%   direct★/g');
  BKEYS.forEach(k=>{
    let dealt=0,uses=0,ticks=0,oticks=0,builds=0,pips=0,bwin=0,bn=0,direct=0;
    ok.forEach(r=>{
      if(r.dealt.indexOf(k)>=0)dealt++;
      uses+=r.uses[k]||0;ticks+=r.ticks[k]||0;oticks+=r.otherTicks[k]||0;
      pips+=(r.endPips[k]||0)+(r.departPips[k]||0);
      (r.builds[k]||[]).forEach(pid=>{builds++;bn++;if(pid===r.win)bwin++;});
      if(k==='tollhouse')direct+=r.players.reduce((a,p)=>a+p.bankO,0);
      if(k==='cooperage')direct+=r.players.reduce((a,p)=>a+p.bankW,0);
    });
    const dg=Math.max(1,dealt);
    console.log(
      k.padEnd(12)+
      pct(dealt,G).padStart(7)+
      fmt(builds/dg).padStart(9)+
      fmt(uses/dg).padStart(9)+
      fmt(ticks/dg).padStart(9)+
      (ticks?pct(oticks,ticks):'—').padStart(8)+
      (builds?fmt(pips/builds):'—').padStart(11)+
      (bn?(pct(bwin,bn)+' ('+bn+')'):'—').padStart(13)+
      (direct?fmt(direct/dg):'—').padStart(11));
  });
});
console.log(anyErr?`\n*** ${anyErr} ERRORS ***`:'\nGATE: 0 crashes / 0 deadlocks.');
process.exit(anyErr?1:0);
