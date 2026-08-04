// PORT-ECONOMY PROBE — playtest #29 follow-up (2026-08-04). Two questions off the live table:
// (1) DEAD PORT: how often does Novgorod (gate 4) go undelivered — especially when Bock is NOT
//     dealt (pinnacle Q4) — and how badly does the ship deck clog with hulls bound for it?
// (2) HOPS BINDING: #29 ended H 0/0/1 with the Abbey never firing — is the hops economy tight
//     as a function of the dealt exports (Mumme's 3H brew + the H=Q−2 tariff), or was that
//     table an outlier?
// Drives the canonical play.html engine (sim.js scaffolding). Usage: node playtests/port-probe.js [N]
// Env: TIER= (default trader) · COUNTS=2,3,4
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '300', 10);
const TIER = process.env.TIER || 'trader';
const COUNTS = (process.env.COUNTS ? process.env.COUNTS.split(',').map(x => parseInt(x, 10)) : [2, 3, 4]);

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
var __G=null;
function __on(){return __G&&!aiSimulating;}
var __abbeyGo=abbeyGo;abbeyGo=function(pay3){var p=cur();var h0=p?p.hops:0;var r=__abbeyGo(pay3);
  if(__on()&&p&&p.hops<h0)__G.abbey++;return r;};
var __hopexAllot=hopexAllot;hopexAllot=function(vi){var p=cur();var h0=p?p.hops:0;var r=__hopexAllot(vi);
  if(__on()&&p&&p.hops<h0)__G.hopex++;return r;};
function __runGame(n){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n,['P1','P2','P3','P4','P5'].slice(0,n));UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p){p.ai={tier:__TIER};p.presPool=PRES_POOL;});
  __G={abbey:0,hopex:0};
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)return {error:'runaway'};}
  var byDest={bruges:0,london:0,bergen:0,novgorod:0};
  S.players.forEach(function(p){p.delivered.forEach(function(d){byDest[d.dest]++;});});
  // end-state hull orientation: display + deck-top-4 exposure + hulls parked on slots
  var novBoard=0,hullsBoard=0;
  SLOTS.forEach(function(s){var t=S.slots[s.id];if(t&&t.type==='ship'){hullsBoard++;if(t.dest==='novgorod')novBoard++;}});
  var novMkt=(S.shipDisplay||[]).filter(function(x){return x.dest==='novgorod';}).length;
  var novMajAwarded=Object.keys(majorityAwards('novgorod')).length>0;
  var hEnd=S.players.map(function(p){return p.hops;});
  var g={n:n,rounds:S.turn,exports:S.exports.slice(),bock:S.exports.indexOf('bock')>=0,
    byDest:byDest,novMkt:novMkt,novBoard:novBoard,hullsBoard:hullsBoard,novMajAwarded:novMajAwarded,
    hEnd:hEnd,h0players:hEnd.filter(function(h){return h===0;}).length,
    abbeyBuilt:Object.keys(S.buildings).some(function(k){return S.buildings[k]&&S.buildings[k].b==='abbey';}),
    abbey:__G.abbey,hopex:__G.hopex};
  __G=null;return g;}
var __OUT={};
__COUNTS.forEach(function(n){__OUT[n]=[];
  for(var i=0;i<__N;i++){var r;try{r=__runGame(n);}catch(e){r={error:String(e&&e.stack||e).slice(0,300)};}
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
const ctx = { document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop},
  __N:N, __TIER:TIER, __COUNTS:COUNTS };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
const t0 = Date.now();
vm.runInContext(engine + '\n' + driver, ctx, { filename: 'port-probe.vm.js' });
const OUT = ctx.__OUT;

const pct = (a,b) => b>0 ? (100*a/b).toFixed(1)+'%' : '—';
const avg = (a,f) => a.length ? a.reduce((s,x)=>s+f(x),0)/a.length : NaN;
console.log('=== port-economy probe — dead-Novgorod + hops binding · tier='+TIER+' · '+N+'/count ===');
for (const n of COUNTS) {
  const gs = (OUT[n]||[]).filter(g=>!g.error);
  if (!gs.length) continue;
  const arms = [['Bock dealt', gs.filter(g=>g.bock)], ['NO Bock (pinnacle Q4)', gs.filter(g=>!g.bock)]];
  console.log('\n--- '+n+'p · '+gs.length+' games ---');
  for (const [label, a] of arms) {
    if (!a.length) continue;
    const totDel = avg(a,g=>g.byDest.bruges+g.byDest.london+g.byDest.bergen+g.byDest.novgorod);
    const novDel = avg(a,g=>g.byDest.novgorod);
    console.log('  '+label.padEnd(22)+' '+pct(a.length,gs.length).padStart(6)+' of games · Novgorod share '+pct(novDel,totDel).padStart(6)
      +' · DEAD (0 deliv) '+pct(a.filter(g=>g.byDest.novgorod===0).length,a.length).padStart(6)
      +' · maj unawarded '+pct(a.filter(g=>!g.novMajAwarded).length,a.length).padStart(6));
    console.log('  '.padEnd(24)+' end clog: Nov hulls in market '+avg(a,g=>g.novMkt).toFixed(2)+'/4 · on slots '+avg(a,g=>g.novBoard).toFixed(2)
      +' · hops end/player '+avg(a,g=>g.hEnd.reduce((s,x)=>s+x,0)/g.hEnd.length).toFixed(2)
      +' · players at H0 '+pct(a.reduce((s,g)=>s+g.h0players,0), a.length*n)
      +' · abbey fires/g '+avg(a,g=>g.abbey).toFixed(2)+' (built '+pct(a.filter(g=>g.abbeyBuilt).length,a.length)+')'
      +' · hopex pays/g '+avg(a,g=>g.hopex).toFixed(2));
  }
}
console.log('\n('+((Date.now()-t0)/1000).toFixed(1)+'s)');
