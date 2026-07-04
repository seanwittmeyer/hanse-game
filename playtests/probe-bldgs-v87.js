// BUILDING-DESIRABILITY PROBE (v2.3 / KEY v87) — observational stats per building key under 2p+4p
// TRADER mirrors: how often each tile is placed, its owner's win-rate when placed, and (value tiles)
// the ★ actually banked through it (the demand-die contributions, owner-only per v2.3).
// Observational (confounded by the AI's own preference list) — read alongside the pricing math.
// Usage: node playtests/probe-bldgs-v87.js [N per count; default 500]
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '500', 10);
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};log=function(){};save=function(){};snapshot=function(){};
var T={}; BUILDING_KEYS.forEach(function(k){T[k]={placed:0,ownerGames:0,ownerWins:0,stars:0,sets:0,displaced:0};});
var GB=null;   // per-game: key -> {owners:Set}
var _commitBldg=commitBldg;
commitBldg=function(slot,key,ownerId){
  if(GB){T[key].placed++;(GB[key]=GB[key]||{}).o=GB[key].o||{};GB[key].o[ownerId]=1;
    var old=S.buildings[slot];if(old)T[old.b].displaced++;}
  return _commitBldg(slot,key,ownerId);
};
var _deliverCask=deliverCask;
deliverCask=function(lp,L,dest,shipSlot,full){
  if(GB&&L&&L.style!=='jopenbier'){
    var die=0,parts=[];
    if(L.bld&&L.bld.owner===L.owner){var v=caskBldgValue(L.bld,dest,L.q,L.owner);if(v>0)parts.push([L.bld.b,v]);die+=v;}
    if(shipSlot){var sb=bAt(shipSlot);var sh=S.slots[shipSlot];
      if(sb&&sb.owner===L.owner){var w=shipBldgValue(sb,dest,sh&&sh.ship);if(w>0)parts.push([sb.b,w]);die+=w;}}
    var capped=Math.min(6,die),scale=die>0?capped/die:0;
    parts.forEach(function(pr){T[pr[0]].stars+=pr[1]*scale;T[pr[0]].sets++;});
  }
  return _deliverCask(lp,L,dest,shipSlot,full);
};
[2,4].forEach(function(np){
  for(var g=0;g<__N;g++){
    S=freshState(np,['P1','P2','P3','P4']);UI={sub:'move'};undoStack=[];activeTab=0;
    S.players.forEach(function(p){p.ai={tier:'trader',persona:aiRandOf(['volume','prestige','majority'])};});
    GB={};
    var guard=0,dead=false;
    while(!S.over){aiStep();if(++guard>300000){dead=true;break;}}
    if(dead){GB=null;continue;}
    var fr=finalRows();
    Object.keys(GB).forEach(function(k){Object.keys(GB[k].o).forEach(function(pid){
      T[k].ownerGames++;
      var p=S.players[+pid];if(fr.cmp(fr.rows[0],{p:p,sc:scorePlayer(p)})===0)T[k].ownerWins++;
    });});
    GB=null;
  }
});
var games=2*__N;
console.log('BUILDING PROBE — trader mirrors, '+__N+' games each at 2p+4p (KEY '+KEY+') · fair 2p 50% / 4p 25% (mixed here)');
console.log((' tile          ').slice(0,14)+'placed/g   owner-games  owner-win%   die-sets   avg*/set   *-total/g   displaced/g');
BUILDING_KEYS.forEach(function(k){var t=T[k];var d=BUILDINGS[k];
  console.log((k+'              ').slice(0,14)
    +(t.placed/games).toFixed(2)+'       '
    +(''+t.ownerGames+'      ').slice(0,7)
    +(t.ownerGames?(100*t.ownerWins/t.ownerGames).toFixed(1):'  — ')+'%       '
    +(''+t.sets+'    ').slice(0,6)
    +(t.sets?(t.stars/t.sets).toFixed(2):'  — ')+'      '
    +(t.stars/games).toFixed(2)+'        '
    +(t.displaced/games).toFixed(2)
    +'   ['+d.verb+(d.exp?'·exp':'')+']');
});
`;

const noop = () => {};
const makeEl = () => {
  const el = { innerHTML:'', textContent:'', value:'', style:{},
    classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},
    setAttribute:noop, getAttribute:()=>null, appendChild:noop,
    addEventListener:noop, removeEventListener:noop };
  el.querySelector=()=>makeEl(); el.querySelectorAll=()=>[]; el.closest=()=>null;
  return el;
};
const document = { getElementById:()=>makeEl(), querySelector:()=>makeEl(), querySelectorAll:()=>[],
  createElement:()=>makeEl(), addEventListener:noop, body:makeEl() };
const store = {};
const localStorage = { getItem:k=>(k in store?store[k]:null), setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];} };

const ctx = { document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop}, __N:N };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;

vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#probe-bldgs' }); }
catch (e) { console.error('PROBE FAIL:', e && e.stack || e); process.exit(1); }
