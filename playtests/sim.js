// Headless simulation harness for play.html — v4.1 "Counting House" (KEY hanse-v41).
// Drives the CANONICAL engine (never a reimplementation): extracts play.html's <script> blocks,
// stubs the DOM, and runs the engine's OWN AI (aiStep) for every seat. The robustness/pace gate:
// 0 crashes / 0 deadlocks across 2–4p, rounds in the 12–25 band, trigger split reported.
// Usage: node playtests/sim.js [N]      (N games per player count; default 100)
// Env:   TIER=apprentice|journeyman|trader|guildmaster|cellarmaster (default journeyman)
//        PERSONAS=1 — the v4 PATHWAYS oracle: trader seats committed round-robin to the four lanes
//                     (majority · lifter · builder · breadth); per-lane win rates reported
//        POOL=n sweeps the dice pool (THE pace dial — v4.1 cut the Sailed-Ships clock) · GUILD_MS/CELLAR_MS lower the MC budgets
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
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
if(__JIT>0){['journeyman','trader'].forEach(function(t){AI_TIERS[t].noise=__JIT;});}   // JITTER=0.15 — chaos: greedy tiers take a random legal action that often (strategy-variance probe)
// ---- v45c VERB-USAGE COUNTERS — the "underutilized systems" dashboard. Wraps the engine's
// own functions (function declarations are reassignable) so the counts are ground truth,
// not policy inference. Reset per game; averaged in the summary.
var __U=null;
function __uReset(){__U={ladings:0,rack:0,assayUp:0,assayDown:0,toll:0,hopex:0,abbey:0,kilnLift:0,bondedSail:0,bmSeat:0,bmTick:0,mq:0,
  exch:0,cap:0,victual:0,chandler:0,scargo:0,coopSail:0,customsBoard:0,rbShort:0,
  comm_skute:0,comm_cog:0,comm_hulk:0,commG:0,built:0,bldgTicks:0,
  ens0:0,ens1:0,ens2:0,ens3:0,ensStar:0,ensAct:0,seal:0,invE:0,invS:0,crown:0,   // v4.15 Guildhall
  opt_goods2:0,opt_goods3:0,opt_age3:0,opt_brew:0,opt_loadmore:0,opt_seal:0};}   // menu-pick histogram (the sweep target)   // v4.9: builds + mason-die ticks   // v4.6 + the ship-shapers, instrumented at last (the AGRICOLA-STUDY B4 item) · v4.8: commissions by hull + grain paid (the 2/1/0 A/B)
var __uOn=function(){return __U&&!aiSimulating;};   // never count MC-playout echoes
var __claimLading=claimLading;claimLading=function(lp,idx){if(__uOn()){__U.ladings++;if(typeof hallOn==='function'&&hallOn())__U.invE++;}return __claimLading(lp,idx);};
// v4.15 GUILDHALL counters — enshrines by shelf · star-vs-action · the menu-pick histogram (the sweep read)
var __enshrineDo=enshrineDo;enshrineDo=function(vi,i,opt){var p=cur();var inv0=p?(p.invites||0):0;
  var r=__enshrineDo(vi,i,opt);
  if(__uOn()&&r){__U['ens'+i]=(__U['ens'+i]||0)+1;__U.invS++;
    if(p&&(p.invites||0)>inv0-1)__U.invE++;   // the first-appearance grant refunded one
    if(opt==='star'||opt==='fixed')__U.ensStar++;else{__U.ensAct++;__U['opt_'+opt]=(__U['opt_'+opt]||0)+1;}
    if(opt==='fixed')__U.opt_goods2++;}
  return r;};
var __sealPick=sealPick;sealPick=function(i){var had=!!UI.seal;var r=__sealPick(i);if(__uOn()&&had&&i>=0)__U.seal++;return r;};
var __rackPick=rackPick;rackPick=function(vi){var had=!!UI.rack;var r=__rackPick(vi);if(__uOn()&&had&&!UI.rack)__U.rack++;return r;};
var __assayPick=assayPick;assayPick=function(vi,dir){var had=!!UI.assay;var r=__assayPick(vi,dir);if(__uOn()&&had&&!UI.assay)__U[(dir===-1)?'assayDown':'assayUp']++;return r;};
var __loadCommit=loadCommit;loadCommit=function(shipSlot,vi,useOpt){var p=cur();var bk=bKeyAt(shipSlot);
  var o0=p?(p.bankO||0):0;var c=p&&p.vessels[vi];var lift=(bk==='maltkiln'||bk==='bonded')&&c&&c.die<6&&caskReady(c);
  var sh0=S.slots[shipSlot];var below=sh0&&c&&bk==='customs'&&boardDie(c,shipSlot)<DEST[sh0.dest].gate;   // boarded only through the Customs relief
  var r=__loadCommit(shipSlot,vi,useOpt);
  if(__uOn()&&p&&c&&!p.vessels[vi]){if(lift)__U.kilnLift++;if((p.bankO||0)>o0)__U.toll++;
    if(bk==='victual')__U.victual++;if(below)__U.customsBoard++;}return r;};
var __hopexAllot=hopexAllot;hopexAllot=function(vi){var p=cur();var h0=p?p.hops:0;var r=__hopexAllot(vi);
  if(__uOn()&&p&&p.hops<h0)__U.hopex++;return r;};   // v45d: each paid hop at the Exchange
var __abbeyGo=abbeyGo;abbeyGo=function(pay3){var p=cur();var h0=p?p.hops:0;var r=__abbeyGo(pay3);
  if(__uOn()&&p&&p.hops<h0)__U.abbey++;return r;};   // v45d: a paid Abbey firing
var __sailShip=sailShip;sailShip=function(slot,creditId){var bonded=bKeyAt(slot)==='bonded';
  var t0=S.slots[slot];var over=t0&&(t0.load||[]).length>SHIP_CAP[t0.ship];   // a Cooperage berth actually used
  var short=t0&&bKeyAt(slot)==='richberth'&&(t0.load||[]).length<SHIP_CAP[t0.ship];   // a Rich Berth short sail
  var sc=0;if(t0){var seen={};(t0.load||[]).forEach(function(L){var o=S.players[L.owner];
    if(o&&o.id!==S.active&&hasUpgrade(o,'supercargo')&&!seen[o.id]){seen[o.id]=1;sc++;}});}
  var r=__sailShip(slot,creditId);
  if(__uOn()){if(bonded)__U.bondedSail++;if(over)__U.coopSail++;if(short)__U.rbShort++;__U.scargo+=sc;}return r;};
var __exchangePick=exchangePick;exchangePick=function(i){var had=!!UI.exch;var r=__exchangePick(i);
  if(__uOn()&&had&&!UI.exch)__U.exch++;return r;};
var __capPlace=capPlace;capPlace=function(slot){var had=UI.cap&&UI.cap.sid!=null;var r=__capPlace(slot);
  if(__uOn()&&had&&!UI.cap)__U.cap++;return r;};
var __chandlerSwap=chandlerSwap;chandlerSwap=function(dir){var p=cur();var u0=p&&p.chUsed;var r=__chandlerSwap(dir);
  if(__uOn()&&p&&!u0&&p.chUsed)__U.chandler++;return r;};
var __grantUpgrade=grantUpgrade;grantUpgrade=function(p,k){var had=hasUpgrade(p,k);var r=__grantUpgrade(p,k);
  if(__uOn()&&k==='braumeister'&&!had&&hasUpgrade(p,k))__U.bmSeat++;return r;};
var __bmTick=braumeisterTick;braumeisterTick=function(p){var d0=vesselDice(p);var r=__bmTick(p);
  if(__uOn()&&vesselDice(p)>d0)__U.bmTick++;return r;};
var __commitBldg=commitBldg;commitBldg=function(slot,key,pid,feePaid){var r=__commitBldg(slot,key,pid,feePaid);
  if(__uOn()&&pid!=null&&S.buildings[slot]&&S.buildings[slot].owner===pid)__U.built++;return r;};
var __bldgTick=bldgTick;bldgTick=function(slot){var b=S.buildings[slot];var d0=b&&b.die;var r=__bldgTick(slot);
  if(__uOn()&&b&&b.die>d0)__U.bldgTicks++;return r;};
var __commPlace=commPlace;commPlace=function(slot){var d=UI.comm;var sn=(d&&d.idx!=null)?(S.shipDisplay||[])[d.idx]:null;
  var p=cur();var g0=p?p.grain:0;var had=!!S.slots[slot];
  var r=__commPlace(slot);
  if(__uOn()&&sn&&!had&&S.slots[slot]&&S.slots[slot].type==='ship'){
    __U['comm_'+sn.ship]=(__U['comm_'+sn.ship]||0)+1;__U.commG+=(g0-(p?p.grain:0));}   // grain delta inside commPlace = the fee actually paid (Shipwright waivers read 0)
  return r;};
function __runGame(n){
  __uReset();
  EXPANSION=__EXP;JOPEN=__JOP;HALLEXP=__HALL;OVERLAND=false;   // v4.14/v4.15: the toggles ride env (default off — the base gate is unchanged)
  if(__HSTARS){__HSTARS.split(',').forEach(function(v,i){if(HALL_SHELVES[i]&&+v>0)HALL_SHELVES[i].star=parseInt(v,10);});}   // v4.15 sweep: star values by shelf
  if(__HMENU){__HMENU.split(';').forEach(function(seg){var m=seg.split(':');var si=parseInt(m[0],10);
    if(HALL_SHELVES[si]&&!HALL_SHELVES[si].fixed&&m[1])HALL_SHELVES[si].opts=m[1].split(',').filter(Boolean);});}   // v4.15 sweep: menus by shelf index (1-3)
  // v4.16b: the lane dials override ONLY when the env var is set — the RULED defaults
  // (HALL_PIPS=1 · INV_BLDG=1) must not be silently forced off by an unset hook.
  if(__HPIPS!=='')HALL_PIPS=(__HPIPS==='1')?1:0;                     // HALL_PIPS=0|1 · HALL_LADDER="0,2,5,9,14" · INV_CASK=0.12 · INV_BLDG=0|1
  if(__HLAD!=='')HALL_LADDER=__HLAD==='null'?null:__HLAD.split(',').map(function(v){return parseInt(v,10)||0;});
  if(__ICW!=='')INV_CASK_W=parseFloat(__ICW)||0;
  if(__IBLDG!=='')INV_BLDG=(__IBLDG==='1')?1:0;
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
    bldgPips:S.players.reduce(function(a,p){return a+(scorePlayer(p).bldg||0);},0)/S.players.length,
    byDest:byDest,
    brews:S.players.reduce(function(a,p){return a+(p._brews||0);},0)/S.players.length,
    delivs:S.players.reduce(function(a,p){return a+p.delivered.length;},0)/S.players.length,
    builds:S.players.reduce(function(a,p){return a+(p.bank||0);},0)/S.players.length,
    use:__U,
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
  __EXP:process.env.EXPANSION==='1', __JOP:process.env.JOPEN==='1',   // v4.14: the beer-toggle arms (EXPANSION=1 · JOPEN=1)
  __HALL:process.env.HALL==='1',                                      // v4.15: the Guildhall arm (HALL=1)
  __HSTARS:process.env.HALL_STARS||'', __HMENU:process.env.HALL_MENU||'',   // v4.15: menu sweeps — HALL_STARS="2,4,6,9" · HALL_MENU="1:age3,goods3;2:brew,loadmore;3:brew,seal"
  __HPIPS:process.env.HALL_PIPS!=null?process.env.HALL_PIPS:'', __HLAD:process.env.HALL_LADDER!=null?process.env.HALL_LADDER:'',   // v4.16b: raw strings — empty = keep the ruled default
  __ICW:process.env.INV_CASK!=null?process.env.INV_CASK:'', __IBLDG:process.env.INV_BLDG!=null?process.env.INV_BLDG:'',
  __POOL:parseInt(process.env.POOL||'0',10),
  __PERSONAS:PERSONAS,
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
  __JIT:parseFloat(process.env.JITTER||'0'),
  __CMS:parseInt(process.env.CELLAR_MS||'0',10),
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
console.log('=== hanse v4.1 sim — '+N+' games/count · '+(PERSONAS?'PATHWAYS (trader personas)':('tier '+TIER))+' ===');
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
  { // v45c: the new-systems utilization dashboard (per-game averages)
    const uk=['ladings','rack','assayUp','assayDown','toll','hopex','abbey','kilnLift','bondedSail','bmSeat','bmTick',
      'exch','cap','victual','chandler','scargo','coopSail','customsBoard','rbShort',
      'comm_skute','comm_cog','comm_hulk','commG','built','bldgTicks',
      'ens0','ens1','ens2','ens3','ensStar','ensAct','seal','invE','invS',
      'opt_goods2','opt_goods3','opt_age3','opt_brew','opt_loadmore','opt_seal'];
    const us={};uk.forEach(k=>us[k]=avg(ok.map(r=>(r.use&&r.use[k])||0)));
    console.log(`commissions/game: ${fmt(us.comm_skute+us.comm_cog+us.comm_hulk)} — skute ${fmt(us.comm_skute)} · cog ${fmt(us.comm_cog)} · hulk ${fmt(us.comm_hulk)} · grain paid ${fmt(us.commG)}`);
    console.log(`mason's marks (v4.9): builds/game ${fmt(us.built)} · die ticks ${fmt(us.bldgTicks)} · end pips/player ${fmt(avg(ok.map(r=>r.bldgPips||0)))}`);
    console.log(`v4.5b usage/game: ladings ${fmt(us.ladings)} · rack ${fmt(us.rack)} · assay ${fmt(us.assayUp)}▲/${fmt(us.assayDown)}▼ · toll ${fmt(us.toll)} · hopex-pay ${fmt(us.hopex)} · abbey ${fmt(us.abbey)} · kiln/bonded lift ${fmt(us.kilnLift)} · bonded sail-away ${fmt(us.bondedSail)} · braumeister ${fmt(us.bmSeat)} seat / ${fmt(us.bmTick)} ticks`);
    console.log(`v4.6 usage/game: exchange ${fmt(us.exch)} · capstan ${fmt(us.cap)} · victual loads ${fmt(us.victual)} · chandler ${fmt(us.chandler)} · supercargo ${fmt(us.scargo)} · coop-berth sails ${fmt(us.coopSail)} · customs boards ${fmt(us.customsBoard)} · richberth short ${fmt(us.rbShort)}`);
    if(us.ens0+us.ens1+us.ens2+us.ens3>0)   // v4.15 GUILDHALL dashboard — the menu-sweep read
      console.log(`v4.15 guildhall/game: enshrines Tap ${fmt(us.ens0)} · Table ${fmt(us.ens1)} · Masters ${fmt(us.ens2)} · Reliquary ${fmt(us.ens3)} — ★picks ${fmt(us.ensStar)} vs actions ${fmt(us.ensAct)} · invites earned ${fmt(us.invE)} / spent ${fmt(us.invS)} · seals ${fmt(us.seal)} · picks: g2 ${fmt(us.opt_goods2)} g3 ${fmt(us.opt_goods3)} age3 ${fmt(us.opt_age3)} brew ${fmt(us.opt_brew)} load ${fmt(us.opt_loadmore)} seal ${fmt(us.opt_seal)}`);
  }
  if(PERSONAS){const pw={},pn={};
    ok.forEach(r=>{(r.personas||[]).forEach(ps=>{if(ps)pn[ps]=(pn[ps]||0)+1;});if(r.winPersona)pw[r.winPersona]=(pw[r.winPersona]||0)+1;});
    console.log('PATHWAYS win-rate by lane: '+Object.keys(pn).map(k=>k+' '+pct(pw[k]||0,pn[k])).join(' · ')+'  (seats: '+Object.keys(pn).map(k=>pn[k]).join('/')+')');}
});
console.log(anyErr? `\n*** ${anyErr} ERRORS — GATE FAILED ***` : '\nGATE: 0 crashes / 0 deadlocks.');
process.exit(anyErr?1:0);
