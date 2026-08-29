// Headless simulation harness for play.html — v6.0 "The Voyage" (KEY hanse-v60).
// Drives the CANONICAL engine (never a reimplementation): extracts play.html's <script>
// blocks, stubs the DOM, and runs the engine's OWN AI (aiStep) for every seat.
// The robustness/pace gate: 0 crashes / 0 deadlocks across 2–4p; pace band 15–40 rounds ⚙
// (the single-verb turn spins more, smaller rounds than v5).
// Usage: node playtests/sim.js [N]      (N games per player count; default 100)
// Env:   TIER=apprentice|journeyman|trader|guildmaster|cellarmaster (default journeyman)
//        PERSONAS=1 — the PATHWAYS oracle (majority · lifter · builder · breadth; PTIER= reads at any tier)
//        POOL=n (THE pace dial) · GUILD_MS/CELLAR_MS/GM_ROLLS (MC budgets)
// Sim outputs are NOT committed — results live in chat / distill into DESIGN.md.
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
if(__GMR>0)GM_ROLLS=__GMR;
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
// ---- v6 VERB & SEA COUNTERS — ground truth via wrapped engine functions, reset per game.
var __V=null,__inCur=0,__inPilot=0;
function __vReset(){__V={work:0,sailv:0,chartv:0,tradev:0,depart:0,land:0,legCur:0,legSail:0,legPilot:0,
  push:0,open:0,post:0,factor:0,rent:0,endCargo:0,glut:0,shiftUp:0,shiftDown:0,prizeStars:0,
  certLand:0,waitBlocked:0};}
var __on=function(){return __V&&!aiSimulating;};
var __doWork=doWork;doWork=function(c){if(__on())__V.work++;return __doWork(c);};
var __sailPick=sailPick;sailPick=function(i){var p=cur();var t=(S.sea||[])[i];
  var push=t&&p&&!shipHasCaskOf(t,p.id);
  var r=__sailPick(i);
  if(__on()){__V.sailv++;if(push)__V.push++;}
  return r;};
var __enterTradeVerb=enterTradeVerb;enterTradeVerb=function(){if(__on())__V.tradev++;return __enterTradeVerb();};
var __chartApply=chartApply;chartApply=function(p,o){if(__on()){__V.chartv++;__V[o.k==='open'?'open':(o.k==='post'?'post':'factor')]++;}
  return __chartApply(p,o);};
var __sailShip=sailShip;sailShip=function(slot,cid){if(__on())__V.depart++;return __sailShip(slot,cid);};
var __seaAdvance=seaAdvance;seaAdvance=function(i,cid){var r=__seaAdvance(i,cid);
  if(__on()&&r){if(__inCur)__V.legCur++;else if(__inPilot)__V.legPilot++;else __V.legSail++;}
  return r;};
var __theCurrent=theCurrent;theCurrent=function(){__inCur=1;var r=__theCurrent();__inCur=0;return r;};
var __pilotTick=pilotTick;pilotTick=function(p){__inPilot=1;var r=__pilotTick(p);__inPilot=0;return r;};
var __landShip=landShip;landShip=function(i,cid){var t=(S.sea||[])[i];var cert=t&&t.cert;
  var r=__landShip(i,cid);
  if(__on()){__V.land++;if(cert)__V.certLand++;}
  return r;};
var __seaEnterSpace=seaEnterSpace;seaEnterSpace=function(t){var w=LANES[t.dest][t.pos];
  if(__on()&&w)__V.rent+=(S.posts[w]||[]).length;
  return __seaEnterSpace(t);};
var __bourseShift=bourseShift;bourseShift=function(beer,d){var r=__bourseShift(beer,d);
  if(__on()&&r){if(d<0)__V.glut+=(d===BOURSE_SAIL_STEP&&__V?1:0);if(r>0)__V.shiftUp++;else __V.shiftDown++;}
  return r;};
var __prizeStars=prizeStars;prizeStars=function(lp,dest,why){if(__on())__V.prizeStars++;return __prizeStars(lp,dest,why);};
var __endCargo=endCargo;endCargo=function(){var n=0;(S.sea||[]).forEach(function(t){n+=(t.load||[]).length;});
  if(__V)__V.endCargo+=n;return __endCargo();};
function __runGame(n,__POFF){
  __POFF=__POFF||0;
  __vReset();
  EXPANSION=__EXP;JOPEN=__JOP;HALLEXP=false;OVERLAND=false;
  S=freshState(n,['P1','P2','P3','P4','P5'].slice(0,n));UI={sub:'verb'};undoStack=[];
  S.players.forEach(function(p,i){p.ai=__PERSONAS?{tier:__PTIER,persona:AI_PERSONAS[(i+__POFF)%AI_PERSONAS.length]}:{tier:__TIER};p.presPool=PRES_POOL;});
  var guard=0;
  while(!S.over){
    aiStep();
    if(++guard>250000)return {error:'runaway (guard tripped)',round:S.turn,sub:UI.sub};
  }
  var fr=finalRows();var rows=fr.rows;
  var byDest={bruges:0,london:0,bergen:0,novgorod:0};
  S.players.forEach(function(p){p.delivered.forEach(function(d){byDest[d.dest]=(byDest[d.dest]||0)+1;});});
  var pool={};Object.keys(S.passages||{}).forEach(function(w){pool[w]=1;});
  return {round:S.turn,trigger:S.endReason||'?',sailed:S.sailed,
    winSeat:rows[0].p.id,
    personas:S.players.map(function(q){return (q.ai&&q.ai.persona)||null;}),
    laneSeats:S.players.map(function(q){var sc=scorePlayer(q);
      return {ps:(q.ai&&q.ai.persona)||null,total:sc.total,flight:flightBeers(q),deliv:(q.delivered||[]).length};}),
    winTotal:rows[0].sc.total,secondTotal:rows[1]?rows[1].sc.total:0,
    marg:(function(){var a=rows[0],b=rows[1];if(!b)return null;
      return {d:a.sc.deliv-b.sc.deliv,bk:a.sc.bank-b.sc.bank,mj:a.sc.maj-b.sc.maj,
        fl:a.sc.flight-b.sc.flight,gu:(a.sc.guild||0)-(b.sc.guild||0),
        wCask:(a.p.delivered||[]).length,sCask:(b.p.delivered||[]).length,
        wVal:(a.p.delivered||[]).length?a.sc.deliv/(a.p.delivered||[]).length:0,
        sVal:(b.p.delivered||[]).length?b.sc.deliv/(b.p.delivered||[]).length:0};})(),
    bourseAvg:(function(){var ks=Object.keys(S.bourse||{});return ks.length?ks.reduce(function(a,b){return a+S.bourse[b];},0)/ks.length:0;})(),
    passOpen:Object.keys(S.passages||{}).length,
    postsN:SEA_KEYS.reduce(function(a,w){return a+(S.posts[w]||[]).length;},0),
    factorsN:KONTORE.reduce(function(a,k){return a+(S.factors[k]||[]).length;},0),
    atSeaEnd:0,
    byDest:byDest,
    brews:S.players.reduce(function(a,p){return a+(p._brews||0);},0)/S.players.length,
    delivs:S.players.reduce(function(a,p){return a+p.delivered.length;},0)/S.players.length,
    V:__V,
    parts:rows.map(function(r){return {deliv:r.sc.deliv,bank:r.sc.bank,maj:r.sc.maj,flight:r.sc.flight,total:r.sc.total};})};
}
var __RESULTS={};
[2,3,4].forEach(function(n){
  __RESULTS[n]=[];
  for(var g=0;g<__N;g++){
    var r;
    try{r=__runGame(n,g);}catch(e){r={error:String(e&&e.stack||e).slice(0,500),round:(typeof S!=='undefined'&&S)?S.turn:0,sub:UI&&UI.sub};}
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
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop,
  lucide:{ createIcons:noop },
  __N:N, __TIER:TIER,
  __EXP:process.env.EXPANSION==='1', __JOP:process.env.JOPEN==='1',
  __POOL:parseInt(process.env.POOL||'0',10),
  __PERSONAS:PERSONAS,
  __PTIER:process.env.PTIER||'trader',
  __GMR:parseInt(process.env.GM_ROLLS||'0',10),
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
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
console.log('=== hanse v6.0 sim — '+N+' games/count · '+(PERSONAS?'PATHWAYS (trader personas)':('tier '+TIER))+' ===');
let anyErr=0;
[2,3,4].forEach(n=>{
  const arr=R[n]; const errs=arr.filter(r=>r.error); const ok=arr.filter(r=>!r.error);
  anyErr+=errs.length;
  if(errs.length)console.log(`\n-- ${n}p ERRORS (${errs.length}) --\n`+errs.slice(0,3).map(e=>e.error+' @round '+e.round+(e.sub?' sub='+e.sub:'')).join('\n'));
  if(!ok.length){console.log(`\n== ${n}p: ALL FAILED ==`);return;}
  const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
  const rounds=ok.map(r=>r.round);
  const within=ok.filter(r=>r.round>=15&&r.round<=40).length;
  const trig={};ok.forEach(r=>trig[r.trigger]=(trig[r.trigger]||0)+1);
  const seat={};ok.forEach(r=>seat[r.winSeat]=(seat[r.winSeat]||0)+1);
  const dd={bruges:0,london:0,bergen:0,novgorod:0};ok.forEach(r=>Object.keys(dd).forEach(k=>dd[k]+=r.byDest[k]||0));
  const dsum=Object.values(dd).reduce((a,b)=>a+b,0)||1;
  console.log(`\n== ${n}p · ${ok.length} ok / ${errs.length} err ==`);
  console.log(`rounds avg ${fmt(avg(rounds))} (min ${Math.min(...rounds)} max ${Math.max(...rounds)}) · in 15–40 band ${pct(within,ok.length)}`);
  console.log(`triggers: ${Object.keys(trig).map(k=>k+' '+pct(trig[k],ok.length)).join(' · ')} · voyages landed avg ${fmt(avg(ok.map(r=>r.sailed)))}`);
  console.log(`winner total avg ${fmt(avg(ok.map(r=>r.winTotal)))} · margin avg ${fmt(avg(ok.map(r=>r.winTotal-r.secondTotal)))} · seat wins ${Object.keys(seat).map(s=>'P'+(+s+1)+' '+pct(seat[s],ok.length)).join(' ')}`);
  { const M=ok.map(r=>r.marg).filter(Boolean);
    if(M.length){const m=k=>fmt(avg(M.map(x=>x[k])));
      console.log(`  margin decomposition (winner − 2nd): deliveries ${m('d')} · bank ${m('bk')} · majorities ${m('mj')} · flight ${m('fl')} · guild ${m('gu')}`);
      console.log(`  why: winner ships ${fmt(avg(M.map(x=>x.wCask)))} casks @ ${fmt(avg(M.map(x=>x.wVal)))}★ vs 2nd ${fmt(avg(M.map(x=>x.sCask)))} @ ${fmt(avg(M.map(x=>x.sVal)))}★`);
      const marg=ok.map(r=>r.winTotal-r.secondTotal).sort((a,b)=>a-b);
      const q=f=>marg[Math.min(marg.length-1,Math.floor(f*marg.length))];
      console.log(`  margin shape: median ${q(0.5)} · p90 ${q(0.9)} · blowouts (>25★) ${pct(marg.filter(x=>x>25).length,marg.length)} · close (≤10★) ${pct(marg.filter(x=>x<=10).length,marg.length)}`);}}
  console.log(`per-player: brews ${fmt(avg(ok.map(r=>r.brews)))} · landings ${fmt(avg(ok.map(r=>r.delivs)))}`);
  console.log(`delivery split: ${Object.keys(dd).map(k=>k+' '+pct(dd[k],dsum)).join(' · ')}`);
  const us={};ok.forEach(r=>Object.keys(r.V).forEach(k=>us[k]=(us[k]||0)+r.V[k]));
  Object.keys(us).forEach(k=>us[k]/=ok.length);
  console.log(`VERBS/game: WORK ${fmt(us.work)} · SAIL ${fmt(us.sailv)} (pushes ${fmt(us.push)}) · CHART ${fmt(us.chartv)} (open ${fmt(us.open)} · post ${fmt(us.post)} · factor ${fmt(us.factor)}) · TRADE ${fmt(us.tradev)}`);
  console.log(`THE SEA/game: departs ${fmt(us.depart)} · landings ${fmt(us.land)} (certified ${fmt(us.certLand)}) · legs — current ${fmt(us.legCur)} · sail ${fmt(us.legSail)} · pilot ${fmt(us.legPilot)} · post rent paid ${fmt(us.rent)} · end-cargo casks ${fmt(us.endCargo)}`);
  console.log(`the bourse: shifts UP ${fmt(us.shiftUp)} vs DOWN ${fmt(us.shiftDown)} · end track avg ${fmt(avg(ok.map(r=>r.bourseAvg)))} · prizes as ★ ${fmt(us.prizeStars)}/game`);
  console.log(`the network at end: passages opened ${fmt(avg(ok.map(r=>r.passOpen)))} of 2 · posts ${fmt(avg(ok.map(r=>r.postsN)))} · factors ${fmt(avg(ok.map(r=>r.factorsN)))}`);
  if(PERSONAS){
    const lane={}; ok.forEach(r=>{r.laneSeats.forEach(sr=>{const L=lane[sr.ps]=lane[sr.ps]||{n:0,w:0,tot:0,fl:0,dl:0};
      L.n++;L.tot+=sr.total;L.fl+=sr.flight;L.dl+=sr.deliv;
      if(sr.total===r.winTotal)L.w++;});});
    console.log('PATHWAYS win-rate by lane: '+Object.keys(lane).map(k=>`${k} ${pct(lane[k].w,lane[k].n)}`).join(' · '));
    console.log('  per-lane avg: '+Object.keys(lane).map(k=>`${k} ★${fmt(lane[k].tot/lane[k].n)} (flight ${fmt(lane[k].fl/lane[k].n)} · ${fmt(lane[k].dl/lane[k].n)} landings)`).join(' · '));
  }
});
console.log('\nGATE: '+(anyErr?('❌ '+anyErr+' errored games'):'0 crashes / 0 deadlocks.'));
process.exit(anyErr?1:0);
