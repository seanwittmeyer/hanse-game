// Targeted unit checks for the v2.8 "Deploy First" pass (KEY v92): the vessel-outlet grammar.
// (1) Load, Charter, Enshrine all require a DEPLOYED cask; (2) the Quaymaster is the invested
// exception (all three verbs reach the vessels); (3) Commission is the one universal vessel-direct
// door — its free load takes ANY player's deployed cask (rival-loading rules) or your own vessels.
// verify-v87/-v88/-v89/-v90 remain the earlier gates (all run green under v92).
// Usage: node playtests/verify-v92.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};log=function(){};save=function(){};snapshot=function(){};
function ok(name,cond){if(!cond)throw new Error('FAIL: '+name);console.log('ok — '+name);}

// (a) CHARTER deploy-first: without the Quaymaster only deployed casks list; with it, vessels too
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(function(x){S.slots[x.id]=null;S.buildings[x.id]=null;});
S.players[0].vessels=[{style:'hopped',q:2,step:2,ready:2},null];   // Ready, in a vessel
S.slots['s5']={type:'cask',owner:0,style:'gruit',q:1,act:'source'};  // deployed
var cc=charterCasks(S.players[0]);
ok('Charter without Quaymaster = deployed casks ONLY', cc.length===1&&cc[0].ref==='s5');
S.players[0].upgrades=['quay'];
cc=charterCasks(S.players[0]);
ok('Charter with Quaymaster also reaches the vessels', cc.length===2&&cc.some(function(o){return o.ref==='v:0';}));

// (b) ENSHRINE deploy-first: same split (Q2+ gate holds on both sides)
S.players[0].upgrades=[];
S.slots['s6']={type:'cask',owner:0,style:'hopped',q:2,act:'age'};
var ec=enshrineCasks(S.players[0]);
ok('Enshrine without Quaymaster = deployed Q2+ ONLY (the Q1 gruit + the vessel excluded)', ec.length===1&&ec[0].ref==='s6');
S.players[0].upgrades=['quay'];
ec=enshrineCasks(S.players[0]);
ok('Enshrine with Quaymaster also reaches the Q2+ vessel cask', ec.length===2&&ec.some(function(o){return o.ref==='v:0';}));

// (c) HARBOR LOAD pool: vessels only with the Quaymaster (regression — the original Private Quay rule)
S.players[0].upgrades=[];
var lp=harborLoadPool(S.players[0]);
ok('Harbor Load pool without Quaymaster has no vessel refs', !lp.some(function(r){return isVRef(r);}));
S.players[0].upgrades=['quay'];
lp=harborLoadPool(S.players[0]);
ok('Harbor Load pool with Quaymaster lists the vessel', lp.some(function(r){return r==='v:0';}));

// (d) COMMISSION pool: ANY player's deployed cask + your own Ready vessels; the gate still filters
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(function(x){S.slots[x.id]=null;S.buildings[x.id]=null;});
S.slots['s1']={type:'ship',ship:'hulk',dest:'london',load:[]};       // gate Q2
S.slots['s2']={type:'cask',owner:1,style:'hopped',q:2,act:'age'};    // a RIVAL's deployed Q2 — eligible
S.slots['s3']={type:'cask',owner:1,style:'gruit',q:1,act:'source'};  // a rival's Q1 — under the gate
S.players[0].vessels=[{style:'keut',q:3,step:3,ready:3},{style:'gruit',q:1,step:0,ready:2}];  // one Ready Q3, one immature
var el=commEligible(S.players[0],'s1');
ok('commission pool = the rival deployed Q2 + your Ready vessel (gate + readiness filter)',
   el.length===2&&el.some(function(o){return o.ref==='s2'&&o.owner===1;})&&el.some(function(o){return o.ref==='v:0'&&o.owner===0;}));

// (e) commLoad of a RIVAL's deployed cask: loader bonus paid, the owner rides the hull
UI={sub:'cell',cell:'A',stage:'commload',tmp:{commShipSlot:'s1'},pendingBenefits:[],stops:[]};
var g0=S.players[0].grain;
commLoad('s2');
var sh=S.slots['s1'];
ok('the rival cask boards + the slot clears', sh.load.length===1&&sh.load[0].owner===1&&S.slots['s2']===null);
ok('the commissioner takes the 1G loader bonus', S.players[0].grain===g0+1);

// (f) commLoad from your OWN vessel: the vessel clears, NO loader bonus; a filled hull sails
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(function(x){S.slots[x.id]=null;S.buildings[x.id]=null;});
S.slots['s1']={type:'ship',ship:'cog',dest:'bruges',load:[{owner:0,style:'gruit',q:1,bld:null,vintage:0}]};  // 1/2
S.players[0].vessels=[{style:'hopped',q:2,step:2,ready:2},null];
S.players.forEach(function(p){p.delivered=[];});
UI={sub:'cell',cell:'A',stage:'commload',tmp:{commShipSlot:'s1'},pendingBenefits:[],stops:[]};
g0=S.players[0].grain;var sailed0=S.sailed;
commLoad('v:0');
ok('the vessel cask boards + the vessel clears (no loader bonus on your own cask)',
   S.players[0].vessels[0]===null&&S.players[0].grain>=g0);
ok('the filled Cog SAILS at once — both casks deliver', S.sailed===sailed0+1&&S.slots['s1']===null&&S.players[0].delivered.length===2);

console.log('ALL v92 VERIFY CHECKS PASS');
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
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify-v92' }); }
catch (e) { console.error('VERIFY v92 FAIL:', e && e.stack || e); process.exit(1); }
