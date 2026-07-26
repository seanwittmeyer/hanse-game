// FLOW PROBE — v4.2 "Tariff" (KEY hanse-v42b). Turn-by-turn economy + decision-quality oracle,
// built for the designer's 2026-07-26 questions: where are the new per-item fees biting, did the
// cost changes move the pace, is the grain-vs-hops split making decisions impactful, and are
// players choosing between GOOD options or settling for the only live one?
//
// Method (same discipline as sim.js — drive the CANONICAL engine, never a reimplementation):
// extract play.html's <script>, stub the DOM, append this driver in-scope. Two configs run in
// one vm: LIVE (v4.2 fees + the Novgorod +2) and NOFEE (all fees zeroed · vbonus 0 — a clean
// A/B isolating the v4.2 cost changes on the same engine/clock). TIER=trader by default (the
// sharpest greedy oracle). Instrumentation:
//   · every pay() attributed to its sink (brew / fee:recipe / fee:spec / fee:bldg / commission /
//     rent) by wrapping the calling flows; the toll measured in chooseLine; gain() = income
//   · per-turn snapshot at the move prompt (goods held, starved turns)
//   · blocked-channel states (an acquisition is WANTED — options exist — but no fee affordable)
//   · decision quality at the move / line / stops prompts using the engine's OWN value
//     functions (aiLineScore / aiStopValue): v1 = best option, v2 = runner-up; classified
//     forced (≤1 option) · two_good (v2 ≥ GOOD and ≥ 65% of v1) · one_good · weak (v1 < GOOD)
//     — a greedy-bot proxy for "was there a real choice", bucketed early/mid/late.
// Usage: node playtests/flow-probe.js [N-per-count]   (default 250)  Env: TIER=
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '250', 10);
const TIER = process.env.TIER || 'trader';
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
var GOOD=2.0, CLOSE=0.65;
var __tag=null, __rec=null;
// ---- spend/income attribution (wrap the flows; function declarations are reassignable) ----
var _pay=pay; pay=function(p,c){ if(__rec){var t=__tag||'other';
    var b=__rec.spend[t]=__rec.spend[t]||{g:0,h:0,n:0}; b.g+=(c.g||0); b.h+=(c.h||0); b.n++; }
  return _pay(p,c); };
var _gain=gain; gain=function(p,g,h){ var g0=p.grain,h0=p.hops; var r=_gain(p,g,h);
  if(__rec){ __rec.inc.g+=p.grain-g0; __rec.inc.h+=p.hops-h0; } return r; };
var _brewPick=brewPick; brewPick=function(st){ __tag='brew'; var r=_brewPick(st); __tag=null;
  if(__rec)__rec.brewStyles[st]=(__rec.brewStyles[st]||0)+1; return r; };
var _recipeGainPick=recipeGainPick; recipeGainPick=function(st){ __tag=st?('fee:recipe:'+st):null; var r=_recipeGainPick(st); __tag=null; return r; };
var _hirePick=hirePick; hirePick=function(k){ __tag=k?('fee:spec:'+k):null; var r=_hirePick(k); __tag=null; return r; };
var _surveyPick=surveyPick; surveyPick=function(k){ __tag=k?('fee:bldg:'+k):null; var r=_surveyPick(k); __tag=null; return r; };
var _enterHire=enterHire; enterHire=function(rt){ __tag='fee:spec:ai'; var r=_enterHire(rt); __tag=null; return r; };
var _commPlace=commPlace; commPlace=function(slot){ __tag='commission'; var r=_commPlace(slot); __tag=null; return r; };
var _commitBldg=commitBldg; commitBldg=function(slot,key,pid){ __tag='rent'; var r=_commitBldg(slot,key,pid); __tag=null; return r; };
var _chooseLine=chooseLine; chooseLine=function(w){ var p=cur(); var g0=p.grain;
  var r=_chooseLine(w); return r; };
// toll: measured directly inside a wrapped doMove->chooseLine window is messy; instead wrap the
// toll site by diffing in chooseLine BEFORE activateLine runs is impossible from outside — so
// approximate: count tolls by wrapping the log? log is stubbed. Track via S: re-wrap below.
// Simplest exact hook: re-implement the shared-check here (same expression the engine uses).
var _chooseLine2=chooseLine; chooseLine=function(w){ var p=cur();
  var shared=S.turn>1 && S.players.some(function(q){return q.id!==p.id&&q.cell===p.cell;});
  if(shared&&__rec){var t=Math.min(OCCUPANCY_TOLL,p.grain); if(t>0){var b=__rec.spend.toll=__rec.spend.toll||{g:0,h:0,n:0}; b.g+=t; b.n++;}}
  return _chooseLine2(w); };

function classify(vals){ if(vals.length<=1)return 'forced';
  var s=vals.slice().sort(function(a,b){return b-a;}); var v1=s[0],v2=s[1];
  if(v1<GOOD)return 'weak';
  if(v2>=GOOD&&v2>=CLOSE*v1)return 'two_good';
  return 'one_good'; }
function phase(){ return S.turn<=5?'early':(S.turn<=12?'mid':'late'); }

function observe(rec){
  var p=cur(); if(!p)return;
  var sub=UI.sub, vals=null;
  if(sub==='move'){
    rec.turns++; rec.goodsG+=p.grain; rec.goodsH+=p.hops;
    if(p.grain+p.hops<=1)rec.starved++;
    var cells=(!p.placed)?['A','B','C','D']:ADJ[p.cell];
    vals=cells.map(function(c){var o=cellOfLine(c);return Math.max(aiLineScore(p,o.row),aiLineScore(p,o.col));});
  } else if(sub==='line'){
    var o=cellOfLine(p.cell); vals=[aiLineScore(p,o.row),aiLineScore(p,o.col)];
  } else if(sub==='stops'){
    vals=(UI.stops||[]).filter(stopAvail).map(function(st){return aiStopValue(p,st);});
    if(!vals.length)vals=null;   // nothing live -> end turn is forced, not a decision
    // blocked-channel states (wanted but unaffordable), once per player-turn per channel
    ['recipe','survey','hire'].forEach(function(ch){
      var want=false;
      if(ch==='recipe')want=recipeGainable(p).length>0&&recipeAffordable(p).length===0;
      if(ch==='survey')want=(S.buildDisplay||[]).length>0&&bldgTargets(p).length>0&&surveyAffordable(p).length===0;
      if(ch==='hire')want=hireable(p).length>0&&hireAffordable(p).length===0;
      if(want){var k=p.id+':'+S.turn+':'+ch; if(!rec._blk[k]){rec._blk[k]=1;rec.blocked[ch]=(rec.blocked[ch]||0)+1;}}
    });
  }
  if(vals){ var cls=classify(vals); var ph=phase();
    var d=rec.dec[sub]; d.n++; d[cls]++;
    var e=rec.dphase[ph]; e.n++; e[cls]++;
    if(vals.length>1){var s=vals.slice().sort(function(a,b){return b-a;}); d.gap+=(s[0]-s[1]); d.gn++;}
    d.opts+=vals.length; }
}

function newRec(){ return {spend:{},inc:{g:0,h:0},brewStyles:{},turns:0,goodsG:0,goodsH:0,starved:0,
  blocked:{},_blk:{},
  dec:{move:{n:0,forced:0,two_good:0,one_good:0,weak:0,opts:0,gap:0,gn:0},
       line:{n:0,forced:0,two_good:0,one_good:0,weak:0,opts:0,gap:0,gn:0},
       stops:{n:0,forced:0,two_good:0,one_good:0,weak:0,opts:0,gap:0,gn:0}},
  dphase:{early:{n:0,forced:0,two_good:0,one_good:0,weak:0},mid:{n:0,forced:0,two_good:0,one_good:0,weak:0},late:{n:0,forced:0,two_good:0,one_good:0,weak:0}}}; }

function runGame(n){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n,['P1','P2','P3','P4'].slice(0,n));UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p){p.ai={tier:__TIER};p.presPool=PRES_POOL;});
  var rec=newRec(); __rec=rec;
  var guard=0;
  while(!S.over){ observe(rec); aiStep(); if(++guard>150000){__rec=null;return {error:'runaway'};} }
  __rec=null;
  var byDest={bruges:0,london:0,bergen:0,novgorod:0}, delStars=0;
  S.players.forEach(function(p){p.delivered.forEach(function(d){byDest[d.dest]++;delStars+=d.val;});});
  rec.round=S.turn; rec.trigger=S.endReason||'?'; rec.sailed=S.sailed; rec.n=n;
  rec.byDest=byDest; rec.delStars=delStars;
  rec.winTotal=finalRows().rows[0].sc.total;
  rec.brews=S.players.reduce(function(a,p){return a+(p._brews||0);},0);
  rec.delivs=S.players.reduce(function(a,p){return a+p.delivered.length;},0);
  delete rec._blk;
  return rec;
}

function runConfig(label){
  var out={};
  [2,3,4].forEach(function(n){ var arr=[];
    for(var g=0;g<__N;g++){ var r; try{r=runGame(n);}catch(e){r={error:String(e&&e.message||e)};}
      arr.push(r); }
    out[n]=arr; });
  return out;
}

var RESULTS={};
RESULTS.live=runConfig('live');
// ---- NOFEE baseline: zero every fee + the Novgorod premium (same engine, same clock) ----
Object.keys(RECIPE_FEE).forEach(function(k){RECIPE_FEE[k]={};});
Object.keys(SPEC_FEE).forEach(function(k){SPEC_FEE[k]={};});
BUILDING_KEYS.forEach(function(k){delete BUILDINGS[k].fee;});
DEST.novgorod.vbonus=0;
RESULTS.nofee=runConfig('nofee');
this.__RESULTS=RESULTS;
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
const ctx = { document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop},
  __N:N, __TIER:TIER };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#flow-probe' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }

// ================= REPORT =================
const R = ctx.__RESULTS;
const f=(x,d=1)=>Number(x).toFixed(d);
const pct=(a,b)=>f(100*a/Math.max(1,b),1)+'%';
console.log('=== hanse v4.2b FLOW PROBE — '+N+' games/count/config · tier '+TIER+' · LIVE (fees + Novgorod+2) vs NOFEE baseline ===');
for (const cfg of ['live','nofee']) {
  console.log('\n########## CONFIG: '+cfg.toUpperCase()+' ##########');
  [2,3,4].forEach(n=>{
    const arr=R[cfg][n].filter(r=>!r.error); const errs=R[cfg][n].length-arr.length;
    if(!arr.length){console.log(n+'p: ALL FAILED');return;}
    const avg=k=>arr.reduce((s,r)=>s+r[k],0)/arr.length;
    const rounds=arr.map(r=>r.round);
    const inband=arr.filter(r=>r.round>=12&&r.round<=25).length;
    const trig={};arr.forEach(r=>trig[r.trigger]=(trig[r.trigger]||0)+1);
    console.log('\n== '+n+'p · '+arr.length+' ok'+(errs?' / '+errs+' ERR':'')+' ==');
    console.log('rounds avg '+f(avg('round'))+' (min '+Math.min(...rounds)+' max '+Math.max(...rounds)+') · band '+pct(inband,arr.length)
      +' · triggers '+Object.keys(trig).map(k=>k+' '+pct(trig[k],arr.length)).join(' · ')+' · sails '+f(avg('sailed')));
    console.log('per game: brews '+f(avg('brews'))+' · deliveries '+f(avg('delivs'))+' · delivered★ '+f(avg('delStars'))+' · winner '+f(avg('winTotal')));
    const dd={bruges:0,london:0,bergen:0,novgorod:0};arr.forEach(r=>Object.keys(dd).forEach(k=>dd[k]+=r.byDest[k]));
    const ds=Object.values(dd).reduce((a,b)=>a+b,0)||1;
    console.log('delivery split: '+Object.keys(dd).map(k=>k+' '+pct(dd[k],ds)).join(' · '));
    // economy
    const sinks={};arr.forEach(r=>Object.keys(r.spend).forEach(k=>{const b=sinks[k]=sinks[k]||{g:0,h:0,n:0};b.g+=r.spend[k].g;b.h+=r.spend[k].h;b.n+=r.spend[k].n;}));
    const per=x=>f(x/arr.length,1);
    console.log('income/game: +'+per(arr.reduce((s,r)=>s+r.inc.g,0))+'G +'+per(arr.reduce((s,r)=>s+r.inc.h,0))+'H'
      +' · goods@turn-start avg '+f(arr.reduce((s,r)=>s+r.goodsG/r.turns,0)/arr.length,2)+'G '+f(arr.reduce((s,r)=>s+r.goodsH/r.turns,0)/arr.length,2)+'H'
      +' · starved turns '+pct(arr.reduce((s,r)=>s+r.starved,0),arr.reduce((s,r)=>s+r.turns,0)));
    const fk=Object.keys(sinks).sort();
    console.log('spend/game: '+fk.map(k=>k+' '+per(sinks[k].g)+'G'+(sinks[k].h?'+'+per(sinks[k].h)+'H':'')+' (×'+per(sinks[k].n)+')').join(' · '));
    // fee items detail
    const feeItems=fk.filter(k=>k.startsWith('fee:'));
    if(feeItems.length)console.log('fee events/game: '+feeItems.map(k=>k.slice(4)+' ×'+per(sinks[k].n)).join(' · '));
    const blk={};arr.forEach(r=>Object.keys(r.blocked).forEach(k=>blk[k]=(blk[k]||0)+r.blocked[k]));
    console.log('blocked-channel turns/game (wanted, unaffordable): '+(Object.keys(blk).length?Object.keys(blk).map(k=>k+' '+per(blk[k])).join(' · '):'none'));
    // brews by style
    const bs={};arr.forEach(r=>Object.keys(r.brewStyles).forEach(k=>bs[k]=(bs[k]||0)+r.brewStyles[k]));
    const bsum=Object.values(bs).reduce((a,b)=>a+b,0)||1;
    console.log('brew mix: '+Object.keys(bs).sort((a,b)=>bs[b]-bs[a]).map(k=>k+' '+pct(bs[k],bsum)).join(' · '));
    // decisions
    for(const sub of ['move','line','stops']){
      const d={n:0,forced:0,two_good:0,one_good:0,weak:0,opts:0,gap:0,gn:0};
      arr.forEach(r=>{const x=r.dec[sub];for(const k in d)d[k]+=x[k];});
      if(!d.n)continue;
      console.log('decisions['+sub+']: n='+f(d.n/arr.length,0)+'/game · forced '+pct(d.forced,d.n)+' · TWO+ good '+pct(d.two_good,d.n)+' · one good '+pct(d.one_good,d.n)+' · weak '+pct(d.weak,d.n)
        +' · avg options '+f(d.opts/d.n,2)+' · avg v1−v2 gap '+f(d.gap/Math.max(1,d.gn),2));
    }
    for(const ph of ['early','mid','late']){
      const d={n:0,forced:0,two_good:0,one_good:0,weak:0};
      arr.forEach(r=>{const x=r.dphase[ph];for(const k in d)d[k]+=x[k];});
      if(!d.n)continue;
      console.log('phase['+ph+']: TWO+ good '+pct(d.two_good,d.n)+' · one good '+pct(d.one_good,d.n)+' · weak '+pct(d.weak,d.n)+' · forced '+pct(d.forced,d.n));
    }
  });
}
