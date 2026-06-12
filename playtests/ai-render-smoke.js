// Render-path smoke test for the AI seats (Phase 1): unlike sim.js / ai-ladder.js, this does NOT
// noop the render layer — it drives full AI games through the REAL render functions against DOM
// stubs, so a typo in renderBar's AI branch, the setup selects, the speed buttons, or gameOver
// surfaces here instead of in the browser. Usage: node playtests/ai-render-smoke.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= RENDER SMOKE (appended; render NOT silenced) =================
// 1) the setup-modal path (openSetup/pickCount/startGame with stubbed inputs -> all-human game)
openSetup();pickCount(3);startGame();
if(!S||S.players.length!==3)throw new Error('startGame did not build a 3p game');
render();
// 2) exercise the speed-control helpers
aiSpeedButtons();aiSetSpeed('slow');aiSetSpeed('normal');
// 3) full AI games at 2p and 5p, one aiStep at a time, REAL render after every decision
[[2,['journeyman','trader']],[5,['apprentice','journeyman','trader','trader','apprentice']]].forEach(function(cfg){
  var n=cfg[0],tiers=cfg[1];
  S=freshState(n,['P1','P2','P3','P4','P5'].slice(0,n));UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p,i){p.ai={tier:tiers[i],persona:tiers[i]==='trader'?'majority':null};});
  render();
  var guard=0;
  while(!S.over){aiStep();render();if(++guard>100000)throw new Error('guard tripped at '+n+'p');}
  if(S.turn<5)throw new Error('suspiciously short game at '+n+'p');
  console.log('render smoke '+n+'p OK — rounds '+S.turn+', sailed '+S.sailed+'/'+S.sailedCap);
});
// 3b) a guildmaster mini-game through the real render layer (tiny Monte Carlo budget)
GUILD_MS=10;GUILD_MIN=1;
S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];activeTab=0;
S.players[0].ai={tier:'guildmaster',persona:null};
S.players[1].ai={tier:'trader',persona:'volume'};
render();
var gguard=0;
while(!S.over){aiStep();render();if(++gguard>100000)throw new Error('guard tripped in GM game');}
console.log('render smoke guildmaster OK — rounds '+S.turn);
// 4) the instant-speed driver path (synchronous whole-game loop with render swap/restore)
S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];
S.players.forEach(function(p){p.ai={tier:'journeyman',persona:null};});
localStorage.setItem('hanse-ai-speed','instant');
maybeRunAI();
if(!S.over)throw new Error('instant driver did not finish the game');
console.log('instant driver OK — rounds '+S.turn);
console.log('ALL RENDER SMOKE TESTS PASS');
`;

const noop = () => {};
const makeEl = () => {
  const el = {
    innerHTML: '', textContent: '', value: '', style: {},
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    setAttribute: noop, getAttribute: () => null, appendChild: noop,
    addEventListener: noop, removeEventListener: noop,
  };
  el.querySelector = () => makeEl();
  el.querySelectorAll = () => [];
  el.closest = () => null;
  return el;
};
const document = {
  getElementById: () => makeEl(), querySelector: () => makeEl(), querySelectorAll: () => [],
  createElement: () => makeEl(), addEventListener: noop, body: makeEl(),
};
const store = {};
const localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };

const ctx = {
  document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert: noop,
  setTimeout: noop, clearTimeout: noop,
  lucide: { createIcons: noop },
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;

vm.createContext(ctx);
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+render-smoke' });
} catch (e) {
  console.error('RENDER SMOKE FAIL:', e && e.stack || e);
  process.exit(1);
}
