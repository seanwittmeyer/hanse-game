// IMPROVEMENT-PARITY PROBE (v2.3 / KEY v87) — re-runs the v1.7 "free starting improvement" study:
// 2p TRADER mirrors (random personas); seat P1 is granted ONE improvement free at setup; its win-rate
// delta vs the no-grant baseline measures the improvement's standalone desirability under the live rules.
// (The granted copy sits OUTSIDE the n-1 scarce deck — same as the v1.7 study; a supply nicety, noted.)
// Usage: node playtests/probe-imps-v87.js [N per config; default 400]
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '400', 10);
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};log=function(){};save=function(){};snapshot=function(){};
var CFGS=['none'].concat(IMPROVEMENT_KEYS);
var OUT=[];
CFGS.forEach(function(key){
  var w0=0,s0=0,s1=0,err=0;
  for(var g=0;g<__N;g++){
    S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];activeTab=0;
    S.players.forEach(function(p){p.ai={tier:'trader',persona:aiRandOf(['volume','prestige','majority'])};});
    if(key!=='none')grantUpgrade(S.players[0],key);
    var guard=0,dead=false;
    while(!S.over){aiStep();if(++guard>300000){dead=true;break;}}
    if(dead){err++;continue;}
    var fr=finalRows();
    if(fr.cmp(fr.rows[0],{p:S.players[0],sc:scorePlayer(S.players[0])})===0)w0++;   // P1 wins (co-win counts)
    s0+=scorePlayer(S.players[0]).total;s1+=scorePlayer(S.players[1]).total;
  }
  var n=__N-err;
  OUT.push({key:key,win:100*w0/Math.max(1,n),s0:s0/Math.max(1,n),s1:s1/Math.max(1,n),err:err});
});
var base=OUT[0];
console.log('IMPROVEMENT-PARITY PROBE — 2p trader mirrors, P1 granted one free improvement · N='+__N+'/config (KEY '+KEY+')');
console.log('baseline (no grant): P1 wins '+base.win.toFixed(1)+'%  ·  avg P1 '+base.s0.toFixed(1)+' / P2 '+base.s1.toFixed(1));
OUT.slice(1).forEach(function(o){
  console.log((o.key+'          ').slice(0,10)+'  P1 wins '+o.win.toFixed(1)+'%  (delta '+(o.win-base.win>=0?'+':'')+(o.win-base.win).toFixed(1)+' pts)'
    +'  ·  avg P1 '+o.s0.toFixed(1)+' / P2 '+o.s1.toFixed(1)+(o.err?'  ·  errors '+o.err:''));
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
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#probe-imps' }); }
catch (e) { console.error('PROBE FAIL:', e && e.stack || e); process.exit(1); }
