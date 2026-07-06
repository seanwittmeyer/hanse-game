// Targeted unit checks for the v2.9/v2.9.1 pass (KEY v93/v94): the ground rent, the end-game floor
// bonus, spoilage, the ≥1★ kontor floor, and the Gauger's-Office-as-quality-lift ("a gate adjusted by
// a building adjusts the quality" — designer). Usage: node playtests/verify-v94.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};log=function(){};save=function(){};snapshot=function(){};
function ok(name,cond){if(!cond)throw new Error('FAIL: '+name);console.log('ok — '+name);}
function clearWharf(){SLOTS.forEach(function(s){S.slots[s.id]=null;S.buildings[s.id]=null;});}

// ---- v2.9.1: the Gauger's Office is a QUALITY lift (gates AND points alike) ----
S=freshState(2,['H','A']);S.active=0;clearWharf();
S.buildings['s1']={b:'gauger',owner:1};
S.slots['s1']={type:'cask',owner:0,style:'hopped',q:2,act:'age'};
ok('gauged Q2 has effective quality 3 (a green Building serves anyone)', caskEffQ('s1')===3);
S.slots['s2']={type:'ship',ship:'hulk',dest:'novgorod',load:[]};
ok('gauged Q2 boards a Novgorod hull (gate 3, no double-count)', canTake('s2','s1')===true);
var L=captureLoad('s1');
ok('capture records the gauged quality (Q3)', L.q===3);
ok('a gauged Q2 at Novgorod scores as Q3 = 2★ (not 0, not the floor)', destValue('novgorod',L.q)===2);
// no double-count: a Q1 under the gauger is effQ2 — still short of Novgorod's gate 3
S.slots['s3']={type:'cask',owner:0,style:'gruit',q:1,act:'source'};
S.buildings['s3']={b:'gauger',owner:1};
ok('gauged Q1 (effQ 2) still fails Novgorod gate 3 — the old g-- is gone', canTake('s2','s3')===false);
// the gauged quality also climbs the Hall ladder, like a kiln'd cask
ok('a gauged Q2 enshrines a rung higher (HALL 3→5)', destValue('hall',caskEffQ('s1'))===5);
// Customs is still a SHIP-side gate relief (the beer is not better)
clearWharf();
S.slots['s4']={type:'cask',owner:0,style:'hopped',q:2,act:'age'};
S.slots['s5']={type:'ship',ship:'hulk',dest:'novgorod',load:[]};
S.buildings['s5']={b:'customs',owner:1};
ok('Customs admits a Q2 onto a Novgorod hull (ship gate −1)', canTake('s5','s4')===true);
ok('a Customs-admitted Q2 still scores at the ≥1★ floor (sval(2)=1)', destValue('novgorod',captureLoad('s4').q)===1);

// ---- v2.9: every kontor pays ≥1★ ----
ok('Novgorod value floor: Q2→1 · Q3→2 · Q5→6', destValue('novgorod',2)===1&&destValue('novgorod',3)===2&&destValue('novgorod',5)===6);

// ---- v2.9: the ground rent ----
S=freshState(2,['H','A']);S.active=0;clearWharf();
S.buildings['s1']={b:'maltkiln',owner:1};
S.players[0].grain=0;
ok("can't pay the rent → the occupied slot is not a legal target", bldgTargets(S.players[0]).every(function(s){return s.id!=='s1';}));
S.players[0].grain=3;
ok('rent payable → the occupied slot is legal', bldgTargets(S.players[0]).some(function(s){return s.id==='s1';}));
var g0=S.players[0].grain, f0=(S.players[1].flipped||[]).length, d0=S.players[1].developed||0;
commitBldg('s1','staple',0);
ok('overbuild pays the 1G ground rent', S.players[0].grain===g0-1);
ok('the displaced tile flips to the owner\\'s floor (no immediate ★)', (S.players[1].flipped||[]).length===f0+1&&(S.players[1].developed||0)===d0);
ok('the floor bonus is END-GAME, computed from the flipped tiles', scorePlayer(S.players[1]).developed===DEVELOP_PTS*(S.players[1].flipped||[]).length);
// full floor → the tile is returned to the box, nothing banks
S.players[1].upgrades=['cellar','granary','hopgarden'];   // 3 specialists + 1 flipped = full (cap 4)
var f1=(S.players[1].flipped||[]).length;
commitBldg('s1','burgomstr',0);
ok('full floor (specialists crowd it) → the displaced tile is boxed, nothing banks',
   (S.players[1].flipped||[]).length===f1&&scorePlayer(S.players[1]).developed===DEVELOP_PTS*f1);

// ---- v2.9: spoilage — a Ready Q4+ may take a deployed Q1's berth ----
S=freshState(2,['H','A']);S.active=0;clearWharf();
S.slots['s1']={type:'cask',owner:1,style:'gruit',q:1,act:'source'};
S.players[0].vessels=[{style:'mumme',q:4,step:3,ready:3,act:'load'},null];
ok('spoilSlots: a Ready Q4 sees the stale Q1', spoilSlots(S.players[0].vessels[0]).some(function(s){return s.id==='s1';}));
ok('spoilSlots: a Ready Q3 does NOT', spoilSlots({style:'keut',q:3,step:2,ready:2}).length===0);
UI.deploy={returnTo:'end',vi:0};UI.sub='deploy';UI.stops=null;
deployTo('s1');
ok('the Q1 is dumped; the Q4 takes the berth', S.slots['s1']&&S.slots['s1'].q===4&&S.slots['s1'].owner===0);
console.log('ALL v94 CHECKS PASS');
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
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop} };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify-v94' });
