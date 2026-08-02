// Benefit-swap experiment (v45h) — WHAT IF London and Bergen traded prizes?
//   base:  London → building (+3★, placed) · Bergen → specialist (≤1/ship)
//   swap:  London → specialist (the ≤1/ship throttle follows the benefit) · Bergen → building
// Majorities stay as printed (London 5/3/1 · Bergen 9/5/2). The greedy tiers carry NO prize
// term (prizes are side effects), so the same policy plays both worlds — a clean A/B.
// Usage: node playtests/swap-test.js [N-per-count]      (default 150)
// Env:   SWAP=1 patches the benefits · PERSONA=1 runs the 4p lane oracle instead (round-robin)
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '150', 10);
const SWAP = process.env.SWAP === '1';
const PERSONA = process.env.PERSONA === '1';

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__SWAP){DEST.london.benefit='spec';DEST.bergen.benefit='building';}
var __OUT=[];
function runGame(n,personas){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n,S&&[]||[]);UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p,i){p.ai={tier:'trader',persona:personas?personas[i]:null};});
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)throw new Error('runaway '+UI.sub);}
  var rows=S.players.map(function(p){var sc=scorePlayer(p);
    var byDest={};KONTORE.forEach(function(k){byDest[k]=deliveredAt(p,k);});
    return {total:sc.total,deliv:sc.deliv,maj:sc.maj,flight:sc.flight,bank:sc.bank,
      bankB:p.bankB||0,bankL:p.bankL||0,specs:(p.upgrades||[]).length,byDest:byDest};});
  var win=0;rows.forEach(function(r,i){if(r.total>rows[win].total)win=i;});
  return {rounds:S.turn,reason:S.endReason||'?',rows:rows,win:win};
}
if(__PERSONA){
  var LANES=['majority','lifter','builder','breadth'];var laneW={},laneN={};
  LANES.forEach(function(l){laneW[l]=0;laneN[l]=0;});
  var errs=0;
  for(var g=0;g<__N;g++){
    var ps=LANES.slice(g%4).concat(LANES.slice(0,g%4));   // rotate lanes across seats
    try{var r=runGame(4,ps);}catch(e){errs++;continue;}
    ps.forEach(function(l){laneN[l]++;});laneW[ps[r.win]]++;
  }
  __OUT.push((__SWAP?'SWAP':'BASE')+' · 4p lane oracle · '+__N+' games'+(errs?' · '+errs+' ERR':''));
  __OUT.push('  lanes: '+LANES.map(function(l){return l+' '+(100*laneW[l]/Math.max(1,laneN[l])).toFixed(1)+'%';}).join(' · '));
}else{
  [2,3,4].forEach(function(n){
    var errs=0,rounds=0,inBand=0,margin=0;var split={};KONTORE.forEach(function(k){split[k]=0;});
    var specs=0,bankB=0,bankL=0,maj=0,tot=0,delivN=0,seats=0;
    var winSplit={};KONTORE.forEach(function(k){winSplit[k]=0;});var winDelivN=0;
    for(var g=0;g<__N;g++){
      var r;try{r=runGame(n,null);}catch(e){errs++;continue;}
      rounds+=r.rounds;if(r.rounds>=12&&r.rounds<=25)inBand++;
      var ts=r.rows.map(function(x){return x.total;}).sort(function(a,b){return b-a;});
      margin+=ts[0]-ts[1];
      r.rows.forEach(function(x,i){seats++;specs+=x.specs;bankB+=x.bankB;bankL+=x.bankL;maj+=x.maj;tot+=x.total;
        KONTORE.forEach(function(k){split[k]+=x.byDest[k];delivN+=x.byDest[k];});
        if(i===r.win)KONTORE.forEach(function(k){winSplit[k]+=x.byDest[k];winDelivN+=x.byDest[k];});});
    }
    var ok=__N-errs;if(!ok)return;
    __OUT.push((__SWAP?'SWAP':'BASE')+' · '+n+'p · '+ok+' ok'+(errs?' · '+errs+' ERR':'')
      +' · rounds '+(rounds/ok).toFixed(1)+' ('+(100*inBand/ok).toFixed(0)+'% band) · margin '+(margin/ok).toFixed(1));
    __OUT.push('  delivery split: '+KONTORE.map(function(k){return k.slice(0,4)+' '+(100*split[k]/Math.max(1,delivN)).toFixed(1)+'%';}).join(' · '));
    __OUT.push('  winner split:   '+KONTORE.map(function(k){return k.slice(0,4)+' '+(100*winSplit[k]/Math.max(1,winDelivN)).toFixed(1)+'%';}).join(' · '));
    __OUT.push('  per seat: total '+(tot/seats).toFixed(1)+' · maj '+(maj/seats).toFixed(1)+' · build★ '+(bankB/seats).toFixed(1)+' · lading★ '+(bankL/seats).toFixed(1)+' · specs '+(specs/seats).toFixed(2));
  });
}
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

const ctx = { document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop},
  __N:N, __SWAP:SWAP, __PERSONA:PERSONA };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#swaptest' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }
ctx.__OUT.forEach(l => console.log(l));
