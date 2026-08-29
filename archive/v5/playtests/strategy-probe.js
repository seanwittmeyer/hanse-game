// Strategy probe — the full ORACLE instrument since the v5.1r refit (2026-08-21; born at
// v4.9b for buildings & specialists). Drives the CANONICAL play.html engine (sim.js
// scaffolding: extract <script>, stub DOM, run the in-page AI), wraps the engine's own
// functions in-scope so every count is ground truth, and prints per-count aggregates:
//   BUILDINGS/SPECIALISTS — who builds/seats, when, channel, the mark economy, holder deltas
//   ACTION ARCS — every core verb by game quarter + first-X timing, winners vs field
//   LANES — relative score-bucket leans, winner composition, port leans, the Flight ladder
//   BALANCE — seat fairness, margins, dead-port rates, the Manifest economy
// v5.1 refit: claimLading → manClaim (the Order row retired at v5.0); deliverCask/brewCommit
// hooked; CELLAR_MS budget hook for cellarmaster arms.
//
// Usage: node playtests/strategy-probe.js [N]     (N games per player count; default 200)
// Env:   TIER=trader|journeyman|guildmaster|...   seat tier for ALL seats (default trader)
//        COUNTS=2,3,4                             player counts (default 2,3,4)
//        MODE=obs|nobuild|nospec                  obs = observational corpus (default);
//                                                 nobuild/nospec = ONE rotating abstainer seat
//                                                 never builds / never seats (ablation arm —
//                                                 measures the cost of ignoring the system)
//        GUILD_MS=120                             bulk MC budget for guildmaster seats
//        SAVE=1                                   dump per-game JSONL to playtests/strategy-<mode>-<tier>-<n>p<-SHARD>.jsonl
//        SHARD=s1                                 filename suffix so parallel shards don't collide
//        LOAD=f1.jsonl,f2.jsonl                   skip the run: pool saved JSONL shards and re-print the report
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '200', 10);
const TIER = process.env.TIER || 'trader';
const MODE = process.env.MODE || 'obs';
const COUNTS = (process.env.COUNTS ? process.env.COUNTS.split(',').map(x => parseInt(x, 10)) : [2, 3, 4]);
const SAVE = process.env.SAVE === '1';

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// NOTE: plain string-concat driver (no template-literal interpolation inside the vm source).
const driver = `
//================= STRATEGY PROBE DRIVER (appended in-scope) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
var __G=null;      // per-game record (null outside games)
var __ABST=-1;     // abstainer pid for the ablation arms (-1 = none)
var __inHire=0,__inBenefit=0,__inCommit=0;
function __on(){return __G&&!aiSimulating;}

// ---- per-player accumulator ----
function __pp(pid){return __G.pp[pid];}
function __ppInit(n){var a=[];for(var i=0;i<n;i++)a.push({loads:0,ages:0,bumps:0,gG:0,gH:0,comm:0,commG:0,sails:0,
  mans:0,delivs:0,scargo:0,bmTicks:0,innTicks:0,chSwaps:0,crierBumps:0,shipwSaved:0,prizeForfeit:0,specConsol:0,
  firstBuildR:0,firstSeatR:0,firstBrewR:0,firstDelivR:0,firstCommR:0,rc:{}});return a;}
// the ARC recorder: every core verb round-stamped per player; bucketed to quarters at game end
function __arc(pid,verb){if(!__on()||pid==null)return;var q=__pp(pid);
  var m=q.rc[verb]=q.rc[verb]||{};m[S.turn]=(m[S.turn]||0)+1;}

// ---- ABLATION ARMS: the abstainer never engages the system (choice layer, rules untouched) ----
var __surveyAffordable=surveyAffordable;surveyAffordable=function(p){
  if(__MODE==='nobuild'&&p&&p.id===__ABST)return [];return __surveyAffordable(p);};
var __aiBenefitAuto=aiBenefitAuto;aiBenefitAuto=function(lp,dest){
  if(__MODE==='nobuild'&&lp.id===__ABST){if(__on())__pp(lp.id).prizeForfeit++;return;}
  __inBenefit++;var r=__aiBenefitAuto(lp,dest);__inBenefit--;return r;};
var __hireable=hireable;hireable=function(p){
  if(__MODE==='nospec'&&p&&p.id===__ABST)return [];return __hireable(p);};

// ---- BUILDING LEDGER: one instance per owned build; slot -> open instance index ----
function __openInst(slot){var ix=__G.slotInst[slot];return ix==null?null:__G.bldgs[ix];}
var __commitBldg=commitBldg;commitBldg=function(slot,key,pid,feePaid){
  var old=__on()?S.buildings[slot]:null;
  __inCommit++;var r=__commitBldg(slot,key,pid,feePaid);__inCommit--;
  if(__on()&&pid!=null&&S.buildings[slot]&&S.buildings[slot].owner===pid&&S.buildings[slot].b===key){
    var ch=__inBenefit?'prize':(feePaid?'fee':'free');
    __G.bldgs.push({k:key,pid:pid,r:S.turn,ms:S.buildings[slot].die,ch:ch,slot:slot,
      over:old?(old.owner!=null?'owned':'setup'):null,ticks:0,self:0,other:0,gone:0,pips:0,endPips:0,goneR:0,cause:null});
    __G.slotInst[slot]=__G.bldgs.length-1;
    var q=__pp(pid);if(!q.firstBuildR)q.firstBuildR=S.turn;__arc(pid,'build');}
  return r;};
var __bldgTick=bldgTick;bldgTick=function(slot){var b=S.buildings[slot];var d0=b&&b.die;
  var r=__bldgTick(slot);
  if(__on()&&b&&!b.v&&b.owner!=null&&b.die>d0){var inst=__openInst(slot);
    if(inst&&!inst.gone){inst.ticks++;if(b.owner===S.active)inst.self++;else inst.other++;
      if(!S.buildings[slot]){inst.gone=1;inst.pips=6;inst.goneR=S.turn;inst.cause='mature';__G.slotInst[slot]=null;}}}   // v5.2: the tick reached 6 — MATURITY
  return r;};
// v5.2 VENTURE LEDGER — placements/climbs per design, per player, per channel
var __commitVenture=commitVenture;commitVenture=function(slot,key,lvl,pid){
  var r=__commitVenture(slot,key,lvl,pid);
  if(__on()){__G.vents.push({k:key,lvl:lvl,pid:pid,r:S.turn,ch:__inBenefit?'prize':'fee'});
    var q=__pp(pid);q.nVent=(q.nVent||0)+1;__arc(pid,'build');}
  return r;};
var __bldgDepart=bldgDepart;bldgDepart=function(slot){var b=S.buildings[slot];
  var had=b&&b.owner!=null&&b.die>0;var pips=had?b.die:0;
  var r=__bldgDepart(slot);
  if(__on()&&had&&b.owner==null){var inst=__openInst(slot);
    if(inst&&!inst.gone){inst.gone=1;inst.pips=pips;inst.goneR=S.turn;inst.cause=__inCommit?'overbuild':'sail';
      __G.slotInst[slot]=null;}}
  return r;};

// ---- SPECIALIST SEATS ----
var __enterHire=enterHire;enterHire=function(rt){__inHire++;var r=__enterHire(rt);__inHire--;return r;};
var __hirePick=hirePick;hirePick=function(key){__inHire++;var r=__hirePick(key);__inHire--;return r;};
var __grantUpgrade=grantUpgrade;grantUpgrade=function(p,k){var had=hasUpgrade(p,k);
  var r=__grantUpgrade(p,k);
  if(__on()&&!had&&hasUpgrade(p,k)){__G.seats.push({k:k,pid:p.id,r:S.turn,ch:__inHire?'fee':'prize'});
    var q=__pp(p.id);if(!q.firstSeatR)q.firstSeatR=S.turn;__arc(p.id,'seat');}
  return r;};

// ---- BEHAVIOUR VERBS (per player) ----
var __gain=gain;gain=function(p,g,h){if(__on()&&p&&p.id!=null){var q=__pp(p.id);q.gG+=(g||0);q.gH+=(h||0);}
  return __gain(p,g||0,h||0);};
var __loadCommit=loadCommit;loadCommit=function(shipSlot,vi,useOpt){var p=cur();var c=p&&p.vessels[vi];
  var r=__loadCommit(shipSlot,vi,useOpt);
  if(__on()&&p&&c&&!p.vessels[vi]){__pp(p.id).loads++;__arc(p.id,'load');}
  return r;};
var __ageAllot=ageAllot;ageAllot=function(vi){var p=cur();var c=p&&p.vessels[vi];var d0=c&&c.die;
  var r=__ageAllot(vi);
  if(__on()&&c&&c.die>d0){__pp(S.active).ages++;__arc(S.active,'age');}
  return r;};
var __addPresence=addPresence;addPresence=function(lp,k,n,fee){var r=__addPresence(lp,k,n,fee);
  if(__on()&&r>0){var q=__pp(lp.id);q.bumps+=r;if(hasUpgrade(lp,'towncrier'))q.crierBumps+=r;__arc(lp.id,'bump');}
  return r;};
var __manClaim=manClaim;manClaim=function(lp,gi,li){var n0=lp.manLines||0;   // v5.0: the Manifest line claim (claimLading retired with the Order row)
  var r=__manClaim(lp,gi,li);
  if(__on()&&(lp.manLines||0)>n0){__pp(lp.id).mans++;__arc(lp.id,'man');}
  return r;};
var __deliverCask=deliverCask;deliverCask=function(lp,L,dest){var r=__deliverCask(lp,L,dest);
  if(__on()){var q=__pp(lp.id);q.delivs++;__arc(lp.id,'deliv');if(!q.firstDelivR)q.firstDelivR=S.turn;}
  return r;};
var __brewCommit=brewCommit;brewCommit=function(style,verb){var p=cur();var b0=p?(p._brews||0):0;
  var r=__brewCommit(style,verb);
  if(__on()&&p&&(p._brews||0)>b0){var q=__pp(p.id);__arc(p.id,'brew');if(!q.firstBrewR)q.firstBrewR=S.turn;}
  return r;};
var __commPlace=commPlace;commPlace=function(slot){var d=UI.comm;var sn=(d&&d.idx!=null)?(S.shipDisplay||[])[d.idx]:null;
  var p=cur();var g0=p?p.grain:0;var had=!!S.slots[slot];
  var r=__commPlace(slot);
  if(__on()&&sn&&!had&&S.slots[slot]&&S.slots[slot].type==='ship'){var q=__pp(p.id);
    q.comm++;q.commG+=(g0-p.grain);__arc(p.id,'comm');if(!q.firstCommR)q.firstCommR=S.turn;
    var printed=(COMMISSION_COST[sn.ship]||{}).g||0;
    if(hasUpgrade(p,'shipwright')&&printed>0)q.shipwSaved+=printed;}
  return r;};
var __sailShip=sailShip;sailShip=function(slot,creditId){var t0=S.slots[slot];var sc=[];
  if(__on()&&t0){var seen={};(t0.load||[]).forEach(function(L){var o=S.players[L.owner];
    if(o&&o.id!==S.active&&hasUpgrade(o,'supercargo')&&!seen[o.id]){seen[o.id]=1;sc.push(o.id);}});}
  var r=__sailShip(slot,creditId);
  if(__on()){var cid=creditId!=null?creditId:S.active;__pp(cid).sails++;__arc(cid,'sail');
    sc.forEach(function(id){__pp(id).scargo++;});}
  return r;};
var __bmTick=braumeisterTick;braumeisterTick=function(p){var d0=vesselDice(p);var r=__bmTick(p);
  if(__on()&&vesselDice(p)>d0)__pp(p.id).bmTicks++;return r;};
var __innTick=innkeeperTick;innkeeperTick=function(p){var d0=vesselDice(p);var r=__innTick(p);
  if(__on()&&vesselDice(p)>d0)__pp(p.id).innTicks++;return r;};
var __chandlerSwap=chandlerSwap;chandlerSwap=function(dir){var p=cur();var u0=p&&p.chUsed;
  var r=__chandlerSwap(dir);
  if(__on()&&p&&!u0&&p.chUsed)__pp(p.id).chSwaps++;return r;};
// the Bergen consolation (no specialist to seat -> 2 goods): countable from afterSail's gain —
// approximated per arm via the abstainer's gG jump; exact count matters only for the nospec arm,
// where hireable()===[] makes every Bergen prize a consolation. Tracked via specConsol below.
var __afterSail=afterSail;afterSail=function(rt){
  var head=(UI.pendingSpec||[])[0];var lp=head?S.players[head.pid]:null;
  var el=(lp&&__on())?hireable(lp):null;
  var r=__afterSail(rt);
  if(__on()&&lp&&el!==null&&!el.length&&(UI.pendingSpec||[])[0]!==head)__pp(lp.pid!=null?lp.pid:lp.id).specConsol++;
  return r;};

// ---- RUNNER ----
function __runGame(n,gi){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n,['P1','P2','P3','P4','P5'].slice(0,n));UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p,i){p.ai={tier:__TIER};p.presPool=PRES_POOL;});
  __ABST=(__MODE==='obs')?-1:(gi%n);
  __G={pp:__ppInit(n),bldgs:[],seats:[],vents:[],slotInst:{}};
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)return {error:'runaway',round:S.turn,sub:UI.sub};}
  // close standing instances
  __G.bldgs.forEach(function(inst){if(!inst.gone){var b=S.buildings[inst.slot];
    if(b&&b.owner===inst.pid)inst.endPips=b.die||0;}});
  var fr=finalRows();var rows=fr.rows;
  var RND=Math.max(1,S.turn);
  function __quarters(rc){var o={};Object.keys(rc).forEach(function(v){var qq=[0,0,0,0];
    Object.keys(rc[v]).forEach(function(r){var qi=Math.min(3,Math.floor(4*(parseInt(r,10)-1)/RND));qq[qi]+=rc[v][r];});
    o[v]=qq;});return o;}
  var g={n:n,rounds:S.turn,trigger:S.endReason||'?',abst:__ABST,
    win:rows[0].p.id,winTotal:rows[0].sc.total,secondTotal:rows[1]?rows[1].sc.total:0,
    players:S.players.map(function(p){var sc=scorePlayer(p);var q=__pp(p.id);
      var byDest={};p.delivered.forEach(function(d){byDest[d.dest]=(byDest[d.dest]||0)+1;});
      var arcQ=__quarters(q.rc);delete q.rc;
      return {pid:p.id,win:rows[0].p.id===p.id?1:0,total:sc.total,deliv:sc.deliv,bank:sc.bank,
        maj:sc.maj,flight:sc.flight,guild:sc.guild,bldg:sc.bldg,bankM:p.bankM||0,
        brews:p._brews||0,ndeliv:p.delivered.length,byDest:byDest,recipes:p.recipes.length,
        manLines:p.manLines||0,manPts:p.bankL||0,stapleSt:p.bankSt||0,
        nVents:q.nVent||0,ventsEnd:venturesInPlay(p),hand:(p.hand||[]).length,
        flightN:Object.keys(p.shipped||{}).filter(function(st){return STYLES[st];}).length,
        arcQ:arcQ,firsts:{brew:q.firstBrewR,deliv:q.firstDelivR,comm:q.firstCommR,build:q.firstBuildR,seat:q.firstSeatR},
        specs:p.upgrades.slice(),nBuilds:0,verbs:q};}),
    bldgs:__G.bldgs,seats:__G.seats,vents:__G.vents};
  g.bldgs.forEach(function(b){g.players[b.pid].nBuilds++;});
  __G=null;
  return g;}
var __OUT={};
__COUNTS.forEach(function(n){__OUT[n]=[];
  for(var gi=0;gi<__N;gi++){var r;
    try{r=__runGame(n,gi);}catch(e){r={error:String(e&&e.stack||e).slice(0,400)};}
    __OUT[n].push(r);}});
this.__OUT=__OUT;
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
  __N:N, __TIER:TIER, __MODE:MODE, __COUNTS:COUNTS,
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
  __CMS:parseInt(process.env.CELLAR_MS||'0',10),
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;

const t0 = Date.now();
let OUT;
if (process.env.LOAD) {
  OUT = {};
  for (const f of process.env.LOAD.split(',')) {
    for (const line of fs.readFileSync(f.trim(), 'utf8').split('\n')) {
      if (!line.trim()) continue;
      const g = JSON.parse(line);
      (OUT[g.n] = OUT[g.n] || []).push(g);
    }
  }
  for (const k of Object.keys(OUT)) if (!COUNTS.includes(+k)) COUNTS.push(+k);
  COUNTS.sort();
} else {
  vm.createContext(ctx);
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'strategy-probe.vm.js' });
  OUT = ctx.__OUT;
}

// ================= REPORT =================
const fmt = (x, d=1) => (x==null||isNaN(x)) ? '—' : x.toFixed(d);
const pct = (a,b) => b>0 ? (100*a/b).toFixed(1)+'%' : '—';
console.log('=== strategy probe — buildings & specialists · mode='+MODE+' · tier='+TIER+' · '+N+' games/count ===');
for (const n of COUNTS) {
  if (!OUT[n] || !OUT[n].length) continue;
  const games = OUT[n].filter(g => !g.error);
  const errs = OUT[n].length - games.length;
  if (errs) OUT[n].filter(g=>g.error).slice(0,2).forEach(g=>console.log('  ERR: '+g.error));
  if (!games.length) { console.log('\n--- '+n+'p: NO CLEAN GAMES ('+errs+' errors) ---'); continue; }
  const G = games.length, P = G*n;
  const avg = a => a.reduce((s,x)=>s+x,0)/a.length;
  const players = games.flatMap(g=>g.players.map(p=>({...p, g})));
  console.log('\n--- '+n+'p · '+G+' games'+(errs?' · '+errs+' ERR':'')+' · rounds '+fmt(avg(games.map(g=>g.rounds)))+' · dice-trigger '+pct(games.filter(g=>g.trigger==='dice').length,G)+' ---');

  // ---------- BUILDINGS ----------
  const allB = games.flatMap(g=>g.bldgs.map(b=>({...b, rounds:g.rounds})));
  console.log('BUILDINGS: '+fmt(allB.length/G,2)+' owned builds/game · channels: prize '+pct(allB.filter(b=>b.ch==='prize').length,allB.length)+' · fee-paid '+pct(allB.filter(b=>b.ch==='fee').length,allB.length)+' · free-take '+pct(allB.filter(b=>b.ch==='free').length,allB.length)+' · overbuilds: on-setup '+allB.filter(b=>b.over==='setup').length+' / on-owned '+allB.filter(b=>b.over==='owned').length);
  const bBucket = k => players.filter(p=>k(p.nBuilds));
  const buckets = [['0 builds', v=>v===0], ['1 build', v=>v===1], ['2+ builds', v=>v>=2]];
  console.log('  build-count buckets (baseline win '+pct(1,n)+'):');
  for (const [label, f] of buckets) {
    const b = bBucket(f); if (!b.length) continue;
    console.log('    '+label.padEnd(10)+' '+pct(b.length,P).padStart(6)+' of seats · win '+pct(b.filter(p=>p.win).length,b.length).padStart(6)+' · avg total '+fmt(avg(b.map(p=>p.total)))+' · avg mark★ (end+cashed) '+fmt(avg(b.map(p=>p.bldg+p.bankM))));
  }
  const byKey = {};
  for (const b of allB) { (byKey[b.k]=byKey[b.k]||[]).push(b); }
  console.log('  tile               blt/g   ms  tk/bld self%  sail%  over%   mat%  end◆  cash◆  life(rd)');
  Object.keys(byKey).sort((a,b)=>byKey[b].length-byKey[a].length).forEach(k=>{
    const L = byKey[k];
    const ticks = avg(L.map(b=>b.ticks));
    const selfShare = L.reduce((s,b)=>s+b.self,0), othShare = L.reduce((s,b)=>s+b.other,0);
    const gone = L.filter(b=>b.gone);
    const standing = L.filter(b=>!b.gone);
    console.log('  '+k.padEnd(18)+' '+fmt(L.length/G,2).padStart(5)+' '+fmt(avg(L.map(b=>b.ms)),1).padStart(4)+' '+fmt(ticks,2).padStart(6)+' '+pct(selfShare,selfShare+othShare).padStart(6)+' '+pct(gone.filter(b=>b.cause==='sail').length,L.length).padStart(6)+' '+pct(gone.filter(b=>b.cause==='overbuild').length,L.length).padStart(6)+' '+pct(gone.filter(b=>b.cause==='mature').length,L.length).padStart(6)+' '+fmt(standing.length?avg(standing.map(b=>b.endPips)):NaN,1).padStart(5)+' '+fmt(gone.length?avg(gone.map(b=>b.pips)):NaN,1).padStart(6)+' '+fmt(avg(L.map(b=>(b.gone?b.goneR:b.rounds)-b.r)),1).padStart(8));
  });
  const bTimed = allB.filter(b=>b.r>0);
  if (bTimed.length) {
    const rHist = [0,0,0,0];
    bTimed.forEach(b=>{const q=Math.min(3,Math.floor(4*(b.r-1)/Math.max(1,b.rounds)));rHist[q]++;});
    console.log('  build timing (game quarters): '+rHist.map(x=>pct(x,bTimed.length)).join(' / '));
  }

  // ---------- VENTURES (v5.2) ----------
  const allV = games.flatMap(g=>(g.vents||[]).map(v=>({...v, rounds:g.rounds})));
  if (allV.length||players.some(p=>p.nVents)) {
    console.log('VENTURES: '+fmt(allV.length/G,2)+' placements/game · L1 '+fmt(allV.filter(v=>v.lvl===1).length/G,2)+' · L2 climbs '+fmt(allV.filter(v=>v.lvl===2).length/G,2)+' · channels: prize '+pct(allV.filter(v=>v.ch==='prize').length,allV.length)+' · fee '+pct(allV.filter(v=>v.ch==='fee').length,allV.length));
    const vByK={};allV.forEach(v=>{const key=v.k+':L'+v.lvl;(vByK[key]=vByK[key]||[]).push(v);});
    console.log('  face                 plc/g   round');
    Object.keys(vByK).sort((a,b)=>vByK[b].length-vByK[a].length).forEach(k=>{
      const L=vByK[k];
      console.log('  '+k.padEnd(20)+' '+fmt(L.length/G,2).padStart(5)+' '+fmt(avg(L.map(v=>v.r)),1).padStart(7));});
    const vBuckets=[['0 vents',v=>v===0],['1 vent',v=>v===1],['2+ vents',v=>v>=2]];
    for (const [label,f] of vBuckets){const b=players.filter(p=>f(p.nVents||0));if(!b.length)continue;
      console.log('    '+label.padEnd(9)+' '+pct(b.length,P).padStart(6)+' of seats · win '+pct(b.filter(p=>p.win).length,b.length).padStart(6)+' · avg total '+fmt(avg(b.map(p=>p.total))));}
    console.log('  staple★/player '+fmt(avg(players.map(p=>p.stapleSt||0)),1)+' · hand left at end '+fmt(avg(players.map(p=>p.hand!=null?p.hand:4)),2)+'/4');
  }

  // ---------- SPECIALISTS ----------
  const allS = games.flatMap(g=>g.seats.map(s=>({...s, rounds:g.rounds})));
  console.log('SPECIALISTS: '+fmt(allS.length/G,2)+' seats/game · channels: prize (Bergen) '+pct(allS.filter(s=>s.ch==='prize').length,allS.length)+' · fee (Hiring/bonus) '+pct(allS.filter(s=>s.ch==='fee').length,allS.length));
  const sBuckets = [['0 seats', v=>v===0], ['1 seat', v=>v===1], ['2 seats', v=>v>=2]];
  for (const [label, f] of sBuckets) {
    const b = players.filter(p=>f(p.specs.length)); if (!b.length) continue;
    console.log('    '+label.padEnd(10)+' '+pct(b.length,P).padStart(6)+' of seats · win '+pct(b.filter(p=>p.win).length,b.length).padStart(6)+' · avg total '+fmt(avg(b.map(p=>p.total)))); }
  const corpusTotal = avg(players.map(p=>p.total));
  const sByKey = {};
  for (const s of allS) { (sByKey[s.k]=sByKey[s.k]||[]).push(s); }
  console.log('  spec           seats/g  seat-rd  hold-win  Δtotal  design stat            (corpus avg total '+fmt(corpusTotal)+')');
  const stat = (k, hs) => {
    const V = key => fmt(avg(hs.map(p=>p.verbs[key])),2);
    switch (k) {
      case 'braumeister': return 'bm ticks/g '+V('bmTicks');
      case 'innkeeper':  return 'inn ticks/g '+V('innTicks');
      case 'chandler':   return 'swaps/g '+V('chSwaps');
      case 'supercargo': return 'rival-sail pays/g '+V('scargo');
      case 'towncrier':  return 'bumps/g '+V('crierBumps');
      case 'shipwright': return 'grain saved/g '+V('shipwSaved')+' · comms/g '+V('comm');
      case 'scholar':    return 'recipes end '+fmt(avg(hs.map(p=>p.recipes)),2);
      case 'chronicler': return 'man-lines claimed/g '+fmt(avg(hs.map(p=>p.manLines||0)),2);
      case 'crane':      return 'loads/g '+V('loads');
      case 'granary':    return 'grain gained/g '+V('gG');
      case 'hopgarden':  return 'hops gained/g '+V('gH');
      case 'cellar':     return 'brews/g '+fmt(avg(hs.map(p=>p.brews)),2);
      case 'alderman':   return 'maj★ '+fmt(avg(hs.map(p=>p.maj)),1);
      default: return '';
    }
  };
  Object.keys(sByKey).sort((a,b)=>sByKey[b].length-sByKey[a].length).forEach(k=>{
    const L = sByKey[k];
    const holders = players.filter(p=>p.specs.includes(k));
    console.log('  '+k.padEnd(14)+' '+fmt(L.length/G,2).padStart(6)+' '+fmt(avg(L.map(s=>s.r)),1).padStart(8)+' '+pct(holders.filter(p=>p.win).length,holders.length).padStart(9)+' '+fmt(holders.length?avg(holders.map(p=>p.total))-corpusTotal:NaN,1).padStart(7)+'  '+stat(k,holders));
  });
  // holder-vs-field behaviour deltas, the four engine specs
  const behav = (label, key, verbs) => {
    const hs = players.filter(p=>p.specs.includes(key)), ns = players.filter(p=>!p.specs.includes(key));
    if (!hs.length) return;
    console.log('  Δ '+label.padEnd(13)+verbs.map(v=>v+' '+fmt(avg(hs.map(p=>p.verbs[v]||0)),1)+' vs '+fmt(avg(ns.map(p=>p.verbs[v]||0)),1)).join(' · ')+' · delivs '+fmt(avg(hs.map(p=>p.ndeliv)),1)+' vs '+fmt(avg(ns.map(p=>p.ndeliv)),1));
  };
  behav('Grain Factor','granary',['gG']);
  behav('Hop Gardener','hopgarden',['gH']);
  behav('Stevedore','crane',['loads']);
  behav('Braumeister','braumeister',['ages']);

  // ---------- ACTION ARCS ----------
  const AV=['brew','age','load','sail','deliv','comm','build','seat','man','bump'];
  console.log('ACTION ARCS (avg per player, by game quarter        Q1     Q2     Q3     Q4):');
  for (const v of AV) {
    const qs=[0,1,2,3].map(qi=>avg(players.map(p=>((p.arcQ||{})[v]||[0,0,0,0])[qi])));
    if (qs.every(x=>!x)) continue;
    console.log('  '+v.padEnd(6)+' '+qs.map(x=>fmt(x,2).padStart(6)).join(' '));
  }
  const fstKeys=['brew','deliv','comm','build','seat'];
  console.log('  first-X round — winners vs field: '+fstKeys.map(k=>{
    const w=players.filter(p=>p.win&&p.firsts&&p.firsts[k]>0), f=players.filter(p=>!p.win&&p.firsts&&p.firsts[k]>0);
    return k+' '+(w.length?fmt(avg(w.map(p=>p.firsts[k])),1):'—')+'/'+(f.length?fmt(avg(f.map(p=>p.firsts[k])),1):'—');
  }).join(' · '));

  // ---------- LANES / DOMINANT STRATEGIES ----------
  const buckKeys=['deliv','bank','maj','flight','bldg','guild'];
  const bMean={};buckKeys.forEach(k=>bMean[k]=avg(players.map(p=>p[k]||0))||0.0001);
  const leanOf=p=>{let bk=null,bv=-1;buckKeys.forEach(k=>{const v=(p[k]||0)/bMean[k];if(v>bv){bv=v;bk=k;}});return bk;};
  const byLean={};players.forEach(p=>{const k=leanOf(p);(byLean[k]=byLean[k]||[]).push(p);});
  console.log('LANES — relative lean (score bucket ÷ corpus mean; baseline win '+pct(1,n)+'):');
  Object.keys(byLean).sort((a,b)=>byLean[b].length-byLean[a].length).forEach(k=>{
    const L=byLean[k];
    console.log('  '+k.padEnd(7)+' '+pct(L.length,P).padStart(6)+' of seats · win '+pct(L.filter(p=>p.win).length,L.length).padStart(6)+' · avg total '+fmt(avg(L.map(p=>p.total))));});
  const compo=set=>buckKeys.map(k=>k+' '+pct(set.reduce((s,p)=>s+(p[k]||0),0),Math.max(1,set.reduce((s,p)=>s+p.total,0)))).join(' · ');
  console.log('  score composition — winners: '+compo(players.filter(p=>p.win)));
  console.log('  score composition — field:   '+compo(players.filter(p=>!p.win)));
  const modal=p=>{let bk='none',bv=0;Object.keys(p.byDest||{}).forEach(k=>{if(p.byDest[k]>bv){bv=p.byDest[k];bk=k;}});return bk;};
  const byPort={};players.forEach(p=>{const k=modal(p);(byPort[k]=byPort[k]||[]).push(p);});
  console.log('  modal delivery port: '+Object.keys(byPort).sort((a,b)=>byPort[b].length-byPort[a].length).map(k=>k+' '+pct(byPort[k].length,P)+' (win '+pct(byPort[k].filter(p=>p.win).length,byPort[k].length)+')').join(' · '));
  const byF={};players.forEach(p=>{const f=Math.min(6,p.flightN||0);(byF[f]=byF[f]||[]).push(p);});
  console.log('  beers shipped (Flight): '+Object.keys(byF).sort().map(k=>k+' beers '+pct(byF[k].length,P)+' (win '+pct(byF[k].filter(p=>p.win).length,byF[k].length)+')').join(' · '));

  // ---------- BALANCE ----------
  const seatW={};games.forEach(g=>{seatW[g.win]=(seatW[g.win]||0)+1;});
  console.log('BALANCE: seat wins '+Object.keys(seatW).sort().map(s=>'P'+(+s+1)+' '+pct(seatW[s],G)).join(' · ')+' · winner total '+fmt(avg(games.map(g=>g.winTotal)))+' · margin '+fmt(avg(games.map(g=>g.winTotal-(g.secondTotal||0)))));
  const deadCt={bruges:0,london:0,bergen:0,novgorod:0};
  games.forEach(g=>{const tot={};g.players.forEach(p=>Object.keys(p.byDest||{}).forEach(k=>tot[k]=(tot[k]||0)+p.byDest[k]));
    Object.keys(deadCt).forEach(k=>{if(!tot[k])deadCt[k]++;});});
  console.log('  dead-port rate (0 deliveries all game): '+Object.keys(deadCt).map(k=>k+' '+pct(deadCt[k],G)).join(' · '));
  const mc=players.filter(p=>p.manLines>0);
  console.log('  manifest economy: lines/player '+fmt(avg(players.map(p=>p.manLines||0)),2)+' · ★/player '+fmt(avg(players.map(p=>p.manPts||0)),1)+' · ★/line '+(mc.length?fmt(avg(mc.map(p=>p.manPts/p.manLines)),2):'—'));

  // ---------- ABLATION ARM ----------
  if (MODE !== 'obs') {
    const abst = games.flatMap(g=>g.players.filter(p=>p.pid===g.abst));
    const norm = games.flatMap(g=>g.players.filter(p=>p.pid!==g.abst));
    console.log('ABLATION ('+MODE+'): abstainer win '+pct(abst.filter(p=>p.win).length,abst.length)+' (baseline '+pct(1,n)+') · avg total '+fmt(avg(abst.map(p=>p.total)))+' vs field '+fmt(avg(norm.map(p=>p.total)))+' · Δ '+fmt(avg(abst.map(p=>p.total))-avg(norm.map(p=>p.total)),1));
    console.log('  abstainer profile: builds '+fmt(avg(abst.map(p=>p.nBuilds)),2)+' vs '+fmt(avg(norm.map(p=>p.nBuilds)),2)+' · specs '+fmt(avg(abst.map(p=>p.specs.length)),2)+' vs '+fmt(avg(norm.map(p=>p.specs.length)),2)+' · delivs '+fmt(avg(abst.map(p=>p.ndeliv)),1)+' vs '+fmt(avg(norm.map(p=>p.ndeliv)),1)+' · brews '+fmt(avg(abst.map(p=>p.brews)),1)+' vs '+fmt(avg(norm.map(p=>p.brews)),1)+' · mark★ '+fmt(avg(abst.map(p=>p.bldg+p.bankM)),1)+' vs '+fmt(avg(norm.map(p=>p.bldg+p.bankM)),1)+' · prize-forfeits/g '+fmt(avg(abst.map(p=>p.verbs.prizeForfeit)),2)+' · Bergen-consolations/g '+fmt(avg(abst.map(p=>p.verbs.specConsol)),2));
  }

  if (SAVE && !process.env.LOAD) {
    const f = path.join(__dirname, 'strategy-'+MODE+'-'+TIER+'-'+n+'p'+(process.env.SHARD?'-'+process.env.SHARD:'')+'.jsonl');
    fs.writeFileSync(f, games.map(g=>JSON.stringify(g)).join('\n')+'\n');
    console.log('  [saved '+f+']');
  }
}
console.log('\n('+((Date.now()-t0)/1000).toFixed(1)+'s)');
