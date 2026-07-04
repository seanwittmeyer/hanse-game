// Targeted unit checks for the v2.4 "Three Tiles" pass (KEY v88): the tile-type badges, the London
// building-OR-improvement choice, the Q3+ 'Hire' cask action, and the Floor-lane improvement dials
// (per-vessel Lagering, the cost re-prices). verify-v87.js remains the v2.3 delivery-arithmetic gate
// (still green under v88 — run both). Usage: node playtests/verify-v88.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};log=function(){};save=function(){};snapshot=function(){};
function ok(name,cond){if(!cond)throw new Error('FAIL: '+name);console.log('ok — '+name);}

// (a) the improvement re-prices (lift the floor)
ok('Extra Vessel 3G · Hop Garden 4G · Lagering 2G · Quay 3G',
   IMPROVEMENTS.vessel.cost.g===3&&IMPROVEMENTS.hopgarden.cost.g===4&&IMPROVEMENTS.lagering.cost.g===2&&IMPROVEMENTS.quay.cost.g===3);

// (b) Lagering Cellar ages EVERY maturing cask (was one)
S=freshState(2,['H','A']);S.active=0;
S.players[0].upgrades=['lagering'];
S.players[0].vessels=[{style:'mumme',q:4,step:0,ready:3},{style:'bock',q:5,step:1,ready:3}];
lageringTick(S.players[0]);
ok('Lagering ticks every maturing cask +1', S.players[0].vessels[0].step===1&&S.players[0].vessels[1].step===2);

// (c) the 'hire' pool gate: never on Q2, present at Q3+
var q2ok=true;for(var i=0;i<400;i++)if(pileDraw(2)==='hire')q2ok=false;
var q3hit=false;for(var i=0;i<800&&!q3hit;i++)if(pileDraw(3)==='hire')q3hit=true;
ok('Hire never appears on a Q2 pile', q2ok);
ok('Hire appears on a Q3 pile', q3hit);

// (d) Hire (human): picker opens, the pick grants + takes from the display
S=freshState(2,['H','A']);S.active=0;UI={sub:'stops',stops:[]};
S.impDisplay=['granary','cellar','quay','crane'];S.impDeck=['vessel'];
fireCaskAct('hire','stops');
ok('Hire opens the picker for a human', UI.sub==='hire');
hirePick('granary');
ok('the hired improvement is granted + the display refills', S.players[0].upgrades.includes('granary')&&!S.impDisplay.slice(0,4).every(k=>k!=='vessel')&&S.impDisplay.length===4);

// (e) Hire dead case: nothing eligible → the action resolves as a no-op
S=freshState(2,['H','A']);S.active=0;UI={sub:'stops',stops:[]};
S.players[0].upgrades=['granary','cellar','quay','crane'];   // area 4/4 (cap)
S.impDisplay=['vessel'];
fireCaskAct('hire','stops');
ok('Hire with a full area resolves without a picker', UI.sub!=='hire');

// (f) Hire (AI seat): auto-grants by preference
S=freshState(2,['H','A']);S.active=0;UI={sub:'stops',stops:[]};
S.players[0].ai={tier:'journeyman',persona:null};
S.impDisplay=['quay','cellar','granary','vessel'];S.impDeck=[];
fireCaskAct('hire','stops');
ok('an AI seat auto-hires (prefers Aging Cellar)', S.players[0].upgrades.includes('cellar')&&UI.sub!=='hire');

// (g) London benefit = a Building OR an Improvement: the improvement path grants free
S=freshState(2,['H','A']);S.active=0;UI={sub:'stops',stops:[],pendingBenefits:[{pid:0,dest:'london'}]};
UI.benefit={returnTo:'stops'};
S.impDisplay=['hopgarden','granary','cellar','crane'];S.impDeck=[];
var g0=S.players[0].grain;
benefitPickImp('hopgarden');
ok('London may take a free Improvement instead of a Building', S.players[0].upgrades.includes('hopgarden')&&S.players[0].grain===g0&&UI.pendingBenefits.length===0);

// (h) AI London fallback: empty Building display → takes an eligible improvement
S=freshState(2,['H','A']);S.active=0;UI={sub:'stops',stops:[],pendingBenefits:[]};
S.buildDisplay=[];S.buildDeck=[];
S.impDisplay=['granary','cellar','quay','crane'];S.impDeck=[];
aiBenefitAuto(S.players[0],'london');
ok('AI London benefit falls back to a free Improvement when no Building is takeable', S.players[0].upgrades.length===1);

// (i) the type badges: Privilege (blue) / Work (green) / Improvement (purple)
S=freshState(2,['H','A']);
ok('a value tile badges as Privilege', pBldgFace({b:'staple'}).includes('>Privilege<'));
ok('a transform tile badges as Work', pBldgFace({b:'maltkiln'}).includes('>Work<'));
ok('an improvement badges as Improvement', pImpFace('granary').includes('>Improvement<'));

console.log('ALL v88 VERIFY CHECKS PASS');
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
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify-v88' }); }
catch (e) { console.error('VERIFY v88 FAIL:', e && e.stack || e); process.exit(1); }
