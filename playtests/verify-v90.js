// Targeted unit checks for the v2.6 "Dockside Pickup" pass (KEY v90): the two neutral starting Buildings
// and the greyed-not-hidden action availability (stopAvail/btnOff). verify-v87/-v88 remain the v2.3/v2.4
// gates (all three run green under v89). Usage: node playtests/verify-v90.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};log=function(){};save=function(){};snapshot=function(){};
function ok(name,cond){if(!cond)throw new Error('FAIL: '+name);console.log('ok — '+name);}

// (a) pickup eligibility: gate at effective quality; Customs/Gauger on the slot count
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(function(x){S.slots[x.id]=null;S.buildings[x.id]=null;});
S.slots['s1']={type:'cask',owner:0,style:'gruit',q:1,act:'source'};
ok('a Gruit slot takes a Bruges hull, not a London one', commPickupOK('s1','bruges')&&!commPickupOK('s1','london'));
S.buildings['s1']={b:'customs',owner:1};
ok('a Customs House on the slot relieves the gate', commPickupOK('s1','london'));

// (b) placing onto an OWN cask picks it up + captures the dock privilege on the die
S=freshState(2,['H','A']);S.active=0;UI={sub:'cell',cell:'A',stage:'place',tmp:{placeTile:{type:'ship',ship:'hulk',dest:'bruges',load:[]}}};
SLOTS.forEach(function(x){S.slots[x.id]=null;S.buildings[x.id]=null;});
S.buildings['s2']={b:'staple',owner:0};
S.slots['s2']={type:'cask',owner:0,style:'gruit',q:1,act:'source'};
placeSlot('s2');
var sh=S.slots['s2'];
ok('the hull docks ON the cask and it boards', sh&&sh.type==='ship'&&sh.load.length===1&&sh.load[0].style==='gruit');
ok('the pickup captured the dock privilege', sh.load[0].bld&&sh.load[0].bld.b==='staple');

// (c) a RIVAL pickup pays the loader bonus; a full hull sails at once
S=freshState(2,['H','A']);S.active=0;UI={sub:'cell',cell:'A',stage:'place',tmp:{placeTile:{type:'ship',ship:'cog',dest:'bruges',load:[{owner:0,style:'gruit',q:1,bld:null,vintage:0}]}},pendingBenefits:[]};
SLOTS.forEach(function(x){S.slots[x.id]=null;S.buildings[x.id]=null;});
S.slots['s3']={type:'cask',owner:1,style:'gruit',q:1,act:'source'};
var g0=S.players[0].grain,sailed0=S.sailed;S.players.forEach(function(p){p.delivered=[];});
placeSlot('s3');
ok('rival pickup pays the 1G loader bonus', S.players[0].grain===g0+1);
ok('the filled Cog SAILS at the commission', S.sailed===sailed0+1&&S.slots['s3']===null);
ok('the rival scored their own cask', S.players[1].delivered.length===1&&S.players[0].delivered.length===1);

// (d) commPlaceable lists empties first, pickups after
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(function(x){S.slots[x.id]=null;S.buildings[x.id]=null;});
S.slots['s4']={type:'cask',owner:0,style:'gruit',q:1,act:'source'};
var pk=commPlaceable('bruges');
ok('commPlaceable = 7 empties + the pickup slot', pk.length===8&&pk[pk.length-1]==='s4');

console.log('ALL v90 VERIFY CHECKS PASS');
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
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify-v90' }); }
catch (e) { console.error('VERIFY v90 FAIL:', e && e.stack || e); process.exit(1); }
