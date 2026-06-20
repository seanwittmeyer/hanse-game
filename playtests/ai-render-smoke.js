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
// 3a-EXP) the opt-in SPECIALTY BEERS expansion — a full AI game through the REAL render layer, with all three
// specialty beers FORCED into the export set so the new cask tiles, signatures, the "3 of 7" labels, Zerbster's
// parti-gyle (at brew) and Gose/Duckstein's delivery effects all render/run. Toggle off again afterwards.
EXPANSION=true;
S=freshState(3,['P1','P2','P3']);UI={sub:'move'};undoStack=[];activeTab=0;
S.exports=['gose','zerbster','duckstein'];S.pinnacleQ=Math.max.apply(null,S.exports.map(function(s){return STYLES[s].q;}));
S.players.forEach(function(p,i){p.ai={tier:['journeyman','trader','trader'][i],persona:i?'volume':null};});
render();
var eguard=0;
while(!S.over){aiStep();render();if(++eguard>100000)throw new Error('guard tripped in EXPANSION game');}
if(!S.expansion)throw new Error('EXPANSION flag not recorded on state');
console.log('render smoke EXPANSION (Specialty Beers) OK — rounds '+S.turn+', exports '+S.exports.join('/'));
EXPANSION=false;
// 3a-JOP) the EXPANSION CAPSTONE Jopenbier — drive the Q6 self-contained scoring + dock-cellar vintage +
// Flight-exclusion + the capstone tiles directly through the REAL render layer (the AI never pilots it).
JOPEN=true;EXPANSION=false;
S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];activeTab=0;S.active=0;
render();                                   // renderShop shows the always-acquirable Jopenbier item (P1 doesn't own it yet)
S.slots['s1']=null;                          // clear any warm-start occupant on s1
S.players[0].vessels[1]={style:'jopenbier',q:6,step:4,ready:4,act:'source'};
render();                                   // pCaskFace for a maturing Q6 in a vessel (the "+★/turn" hint)
if(!deployCask(1,'s1'))throw new Error('jopenbier deploy failed');
jopenVintageTick(S.players[0]);jopenVintageTick(S.players[0]);   // +2 vintage on the dock
render();                                   // pCaskFace for the deployed Q6 with the vintage badge
const jL=captureLoad('s1');
if(jL.q!==6)throw new Error('jopenbier should record Q6, got '+jL.q);
deliverCask(S.players[0],jL,'bruges',null,false);
const jd=S.players[0].delivered.slice(-1)[0];
if(jd.val!==JOPEN_BASE+2)throw new Error('jopenbier self-contained value wrong: '+jd.val+' (expected '+(JOPEN_BASE+2)+')');
if(flightBeers(S.players[0])!==0)throw new Error('jopenbier leaked into the Flight');
console.log('render smoke JOPENBIER capstone OK — banked '+jd.val+'★ (base '+JOPEN_BASE+' + vintage 2 · Q6 · Flight-excluded)');
JOPEN=false;
// 3a-BLEND) EXPANSION blending (Option A) — combine two Ready vessel casks into one +1-quality premium (human Cellar action; the AI doesn't blend).
EXPANSION=true;
S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];activeTab=0;S.active=0;
S.players[0].vessels[0]={style:'broyhan',q:3,step:1,ready:1,act:'load'};
S.players[0].vessels[1]={style:'keut',q:3,step:2,ready:2,act:'load'};
UI={sub:'tap',tap:{returnTo:'end'}};
blendStart('end');render();          // the blend stage render
blendPick(0);render();               // pick the first cask
blendPick(1);                        // pick the second → combine
var bvz=S.players[0].vessels.filter(function(c){return c;});
if(!bvz.some(function(c){return c.q===4&&c.step>=c.ready;}))throw new Error('blend did not produce a Ready Q4 cask: '+JSON.stringify(bvz));
console.log('render smoke BLEND OK — two Q3 → a premium Q4 (Ready)');
EXPANSION=false;
// 3a-ROAD) THE TRADE ROADS (Overland) — a delivery to a kontor extends the road, founds a post, scores the network,
// turns kontor majorities OFF, and a held perk (Cologne salt) fires. Driven through the real deliverCask + render.
OVERLAND=true;
S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];activeTab=0;S.active=0;
if(!(S.overland&&S.overland.on))throw new Error('overland: state not set up');
deliverCask(S.players[0],{owner:0,style:'broyhan',q:3,bld:null},'bruges',null,false);   // ship a Q3 to Bruges
if(!((S.overland.reach[0].bruges||0)>=1))throw new Error('overland: road did not advance on delivery');
if(!((S.overland.posts['br1']||[]).includes(0)))throw new Error('overland: Cologne post not founded');
if(S.overland.founder['br1']!==0)throw new Error('overland: founder not recorded');
var oSc=scorePlayer(S.players[0]);
if(!(oSc.ext>0))throw new Error('overland: inland network scored nothing');
if(oSc.maj!==0)throw new Error('overland: kontor majorities should be OFF with The Trade Roads on');
var g0=S.players[0].grain;UI={sub:'source',src:{n:2,returnTo:'end'}};srcTake(2,0);   // Cologne 'salt' perk → +1 G on Market goods
if(!(S.players[0].grain>=Math.min(S.players[0].storage,g0+3)))throw new Error('overland: salt perk (+1 G on Market goods) not applied');
render();   // exercise the inland map panel injection through the real render layer
console.log('render smoke OVERLAND (The Trade Roads) OK — Bruges reach '+S.overland.reach[0].bruges+', '+Object.keys(S.overland.founder).length+' post(s) founded, inland '+oSc.ext+'★, majorities '+oSc.maj);
OVERLAND=false;
// 3b) a guildmaster mini-game through the real render layer (tiny Monte Carlo budget)
GUILD_MS=10;GUILD_MIN=1;
S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];activeTab=0;
S.players[0].ai={tier:'guildmaster',persona:null};
S.players[1].ai={tier:'trader',persona:'volume'};
render();
var gguard=0;
while(!S.over){aiStep();render();if(++gguard>100000)throw new Error('guard tripped in GM game');}
console.log('render smoke guildmaster OK — rounds '+S.turn);
// 3c) a cellarmaster mini-game through the real render layer (tiny deep-MC budget) — with BOTH expansions
// ON, so the MC's enumeration + deep rollout exercise the specialty beers AND the Jopenbier capstone (the
// real oracle path: aiBuyableExports adds jopenbier, the deep rollout prices it, aiJopenHold cellars it).
EXPANSION=true;JOPEN=true;OVERLAND=true;
CELLAR_MS=20;CELLAR_MIN=1;CELLAR_CAP=120;
S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];activeTab=0;
S.players[0].ai={tier:'cellarmaster',persona:null};
S.players[1].ai={tier:'trader',persona:'prestige'};
render();
var cguard=0;
while(!S.over){aiStep();render();if(++cguard>100000)throw new Error('guard tripped in Cellarmaster game');}
console.log('render smoke cellarmaster OK (Specialty Beers + Jopenbier + The Trade Roads on) — rounds '+S.turn);
EXPANSION=false;JOPEN=false;OVERLAND=false;
// 3d) the opt-in Path C (turn-level UCT) Cellarmaster — keep the tree-search code crash-covered
CELLAR_MS=20;CELLAR_MIN=1;CELLAR_CAP=120;CELLAR_MCTS=true;
S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];activeTab=0;
S.players[0].ai={tier:'cellarmaster',persona:null};
S.players[1].ai={tier:'journeyman',persona:null};
render();
var pcguard=0;
while(!S.over){aiStep();render();if(++pcguard>100000)throw new Error('guard tripped in Path-C Cellarmaster game');}
CELLAR_MCTS=false;
console.log('render smoke cellarmaster (Path C UCT) OK — rounds '+S.turn);
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
