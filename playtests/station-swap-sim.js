// Station-swap A/B harness — mirror matches (all seats the SAME tier) for the Brewhouse<->Cellar grid swap.
// Drives the CANONICAL engine + its own aiStep() (no reimplementation). Reads an arbitrary play.html so the
// SAME harness can run the pre-swap baseline file and the post-swap working tree, isolating the topology.
//
// Usage:  TIER=cm NP=4 N=10 TAG=swap SHARD=1 OUT=playtests/swap/swap-cm-4p-s1.json \
//           PLAYHTML=play.html node playtests/station-swap-sim.js
// Env:
//   PLAYHTML  path to the html to test            (default play.html — the swapped working tree)
//   TIER      cm | gm   -> cellarmaster | guildmaster
//   NP        player count 2..5                   (default 2)
//   N         games this shard                    (default 10)
//   TAG       free label echoed into the result   (e.g. base / swap)
//   SHARD     free label echoed into the result
//   OUT       write a JSON aggregate here         (optional; for cross-shard combining)
//   GUILD_MS  guildmaster MC budget ms            (default 120)
//   CELLAR_MS cellarmaster MC budget ms           (default 80)
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const PLAYHTML = process.env.PLAYHTML || path.join(__dirname, '..', 'play.html');
const TIER = (process.env.TIER || 'gm').toLowerCase();
const NP = parseInt(process.env.NP || '2', 10);
const N = parseInt(process.env.N || '10', 10);
const TAG = process.env.TAG || '';
const SHARD = process.env.SHARD || '';
const OUT = process.env.OUT || '';
const tierName = TIER === 'cm' ? 'cellarmaster' : 'guildmaster';

const htmlPath = path.isAbsolute(PLAYHTML) ? PLAYHTML : path.join(process.cwd(), PLAYHTML);
const html = fs.readFileSync(htmlPath, 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= STATION-SWAP MIRROR RUNNER (appended) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
GUILD_MS=__GMS||120;GUILD_MIN=1;
if(typeof CELLAR_MS!=='undefined'){CELLAR_MS=__CMS||80;CELLAR_MIN=1;CELLAR_CAP=600;}
if(typeof EXPANSION!=='undefined')EXPANSION=false;
if(typeof JOPEN!=='undefined')JOPEN=false;
if(typeof OVERLAND!=='undefined')OVERLAND=false;
var __TIER=__TIERNAME, __NP=__NPLAYERS, __N=__NGAMES;
function __tb(p){var sc=scorePlayer(p).total;var dq=(typeof deployedCaskQ==='function')?deployedCaskQ(p):0;return [sc,dq,p.grain+p.hops];}
function __cmp(a,b){for(var i=0;i<3;i++){if(b[i]!==a[i])return b[i]-a[i];}return 0;}
function __game(){
  S=freshState(__NP,['P1','P2','P3','P4','P5'].slice(0,__NP));
  UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p){p.ai={tier:__TIER,persona:null};});
  var guard=0;
  while(!S.over){aiStep();if(++guard>400000)return {error:'guard'};}
  var idx=S.players.map(function(p,i){return i;});
  var keyed=idx.map(function(i){return {i:i,tb:__tb(S.players[i])};});
  keyed.sort(function(a,b){return __cmp(a.tb,b.tb);});
  var win=keyed[0].i;
  var tie=(keyed.length>1 && keyed[0].tb[0]===keyed[1].tb[0])?1:0;   // top-two equal on raw total
  return {win:win, round:S.turn, totals:S.players.map(function(p){return scorePlayer(p).total;}),
          trigger:(S.sailed>=S.sailedCap?'clock':'ceiling'), tie:tie};
}
var __R={tier:__TIER,np:__NP,games:0,errors:0,winsBySeat:[],clock:0,inBand:0,ties:0,
         roundSum:0,roundMin:1e9,roundMax:0, winnerSum:0,winnerMin:1e9,winnerMax:0, allScoreSum:0,allScoreN:0};
for(var s=0;s<__NP;s++)__R.winsBySeat.push(0);
for(var g=0;g<__N;g++){
  var r;try{r=__game();}catch(e){r={error:String(e&&e.message||e)};}
  if(r.error){__R.errors++;continue;}
  __R.games++; __R.winsBySeat[r.win]++; if(r.trigger==='clock')__R.clock++; __R.ties+=r.tie;
  if(r.round>=12&&r.round<=25)__R.inBand++;
  __R.roundSum+=r.round; if(r.round<__R.roundMin)__R.roundMin=r.round; if(r.round>__R.roundMax)__R.roundMax=r.round;
  var wt=r.totals[r.win]; __R.winnerSum+=wt; if(wt<__R.winnerMin)__R.winnerMin=wt; if(wt>__R.winnerMax)__R.winnerMax=wt;
  r.totals.forEach(function(t){__R.allScoreSum+=t;__R.allScoreN++;});
}
__R.KEY=KEY;
globalThis.__RESULT=__R;
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
  parseInt, parseFloat, isNaN, alert: noop, setTimeout: noop, clearTimeout: noop,
  lucide: { createIcons: noop },
  __TIERNAME: tierName, __NPLAYERS: NP, __NGAMES: N,
  __GMS: parseInt(process.env.GUILD_MS || '0', 10), __CMS: parseInt(process.env.CELLAR_MS || '0', 10),
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;

vm.createContext(ctx);
const t0 = Date.now();
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+station-swap' });
} catch (e) {
  console.error('RUN ERROR:', e && e.stack || e);
  process.exit(1);
}
const R = ctx.__RESULT;
const secs = ((Date.now() - t0) / 1000).toFixed(1);
const fmt = (x, d = 1) => Number(x).toFixed(d);
const g = Math.max(1, R.games);
const seatStr = R.winsBySeat.map((w, i) => 'P' + (i + 1) + ' ' + w).join('/');
const out = {
  tag: TAG, shard: SHARD, tier: R.tier, np: R.np, key: R.KEY, secs: Number(secs),
  games: R.games, errors: R.errors, ties: R.ties, clock: R.clock, inBand: R.inBand,
  winsBySeat: R.winsBySeat,
  avgRound: R.roundSum / g, minRound: R.roundMin, maxRound: R.roundMax,
  avgWinner: R.winnerSum / g, minWinner: R.winnerMin, maxWinner: R.winnerMax,
  avgAll: R.allScoreSum / Math.max(1, R.allScoreN),
};
console.log(`[${TAG}|${R.tier}|${R.np}p|shard ${SHARD}] games ${R.games} err ${R.errors} ties ${R.ties}  ` +
  `rounds ${fmt(out.avgRound)} (${R.roundMin}-${R.roundMax})  inBand ${fmt(100 * R.inBand / g)}%  ` +
  `winner ${fmt(out.avgWinner)} (${R.winnerMin}-${R.winnerMax})  allAvg ${fmt(out.avgAll)}  ` +
  `clock ${fmt(100 * R.clock / g)}%  seats ${seatStr}  ${secs}s  KEY ${R.KEY}`);
if (OUT) {
  fs.mkdirSync(path.dirname(path.isAbsolute(OUT) ? OUT : path.join(process.cwd(), OUT)), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 0));
}
if (R.errors > 0) process.exitCode = 1;
