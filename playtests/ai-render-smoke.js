// Render-path smoke test — v4.0 "Bright Beer". Unlike sim.js / ai-ladder.js, this does NOT
// noop the render layer: it drives full AI games through the REAL render functions against DOM
// stubs, so a typo in renderBar's branches, the grid, the shop, the tableaus, or gameOver
// surfaces here instead of in the browser. Usage: node playtests/ai-render-smoke.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
// REAL render stays live; only save is stubbed (localStorage stub would work, but keep runs clean)
save=function(){};
GUILD_MS=60;CELLAR_MS=150;   // tiny MC budgets — this test is about the RENDER paths
var __renders=0;
var __origRender=render;
render=function(){__renders++;return __origRender();};
function __game(n,tiers){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n,['P1','P2','P3','P4'].slice(0,n));UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p,i){p.ai={tier:tiers[i%tiers.length]};});
  render();
  var guard=0;
  while(!S.over){aiStep();render();if(++guard>60000)throw new Error('runaway at '+UI.sub);}
  renderAid();   // the aid modal builder too
  return {round:S.turn,renders:__renders,trigger:S.endReason};
}
var __RES=[];
__RES.push(['2p jour+trader',__game(2,['journeyman','trader'])]);
__RES.push(['3p app/jour/trader',__game(3,['apprentice','journeyman','trader'])]);
__RES.push(['2p GM vs trader',__game(2,['guildmaster','trader'])]);
__RES.push(['2p CM vs GM',__game(2,['cellarmaster','guildmaster'])]);
this.__RES=__RES;
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
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop} };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#render-smoke' }); }
catch (e) { console.error('RENDER-SMOKE FAILED:', e && e.stack || e); process.exit(1); }

console.log('=== v4.0 render smoke — full AI games through the REAL render layer ===');
ctx.__RES.forEach(([name, r]) => console.log('  PASS ' + name + ' — round ' + r.round + ' (' + r.trigger + '), ' + r.renders + ' renders'));
console.log('ALL PASS');
