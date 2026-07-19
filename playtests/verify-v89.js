// Targeted unit checks for the v2.5 "Warm Wharf" pass (KEY v89): the two neutral starting Buildings
// and the greyed-not-hidden action availability (stopAvail/btnOff). verify-v87/-v88 remain the v2.3/v2.4
// gates (all three run green under v89). Usage: node playtests/verify-v89.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};log=function(){};save=function(){};snapshot=function(){};
function ok(name,cond){if(!cond)throw new Error('FAIL: '+name);console.log('ok — '+name);}

// (a) setup seeds exactly 2 NEUTRAL green Buildings
S=freshState(2,['H','A']);
var nb=Object.keys(S.buildings).filter(function(id){return S.buildings[id]&&S.buildings[id].owner==null;});
ok('setup seeds exactly 2 neutral Buildings', nb.length===2);
ok('both are GREEN (transform) — privileges are never neutral', nb.every(function(id){return BUILDINGS[S.buildings[id].b].verb==='transform';}));
ok('neutral tiles render (tip + faces, no crash)', bldgTip(S.buildings[nb[0]]).indexOf('neutral')>=0&&pBldgFace(S.buildings[nb[0]]).length>0&&bldgTileFace(S.buildings[nb[0]],false).length>0);

// (b) a neutral Building WORKS for anyone (it is a green serves-any-dock tile)
S.buildings['s1']={b:'maltkiln',owner:null};
S.slots['s1']={type:'cask',owner:1,style:'hopped',q:2,act:'age'};
ok('a neutral Malt Kiln serves a docked cask (effQ +1)', caskEffQ('s1')===3);

// (c) overbuilding a neutral Building banks nothing + discards the tile
var d0=S.players.map(function(p){return p.developed||0;}).reduce(function(a,b){return a+b;},0);
commitBldg(nb[0]==='s1'?nb[1]:nb[0],'staple',0);
ok('overbuilding a neutral Building banks +0 and discards it',
   S.players.map(function(p){return p.developed||0;}).reduce(function(a,b){return a+b;},0)===d0
   &&S.players.every(function(p){return !(p.flipped||[]).length;}));

// (d) stopAvail — greyed-not-hidden availability
S=freshState(2,['H','A']);S.active=0;S.players[0].placed=true;S.players[0].cell='A';UI={sub:'move'};undoStack=[];
ok('Market station always live', stopAvail({kind:'cell',cell:'A'})===true);
ok('Deploy live with the warm Gruit + an open slot', stopAvail({kind:'deploy',slot:'s1'})===true);
S.players[0].vessels=[null,null];
ok('Deploy greys with no Ready cask', stopAvail({kind:'deploy',slot:'s1'})===false);
S.players[0].grain=0;S.players[0].hops=0;
ok('Brewhouse greys when it can neither brew nor deploy', stopAvail({kind:'cell',cell:'B'})===false);
ok('btnOff renders a disabled button', btnOff('x').indexOf('disabled')>=0);

console.log('ALL v89 VERIFY CHECKS PASS');
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
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify-v89' }); }
catch (e) { console.error('VERIFY v89 FAIL:', e && e.stack || e); process.exit(1); }
