// AI-tier ladder & robustness test for play.html's in-page AI seats (Phase 1 — AUTOMA.md §6).
// Drives the CANONICAL engine and its OWN aiStep() (no reimplementation): extracts play.html's
// <script>, stubs the DOM, assigns p.ai tiers, and loops aiStep() to game over.
// The gate: 0 crashes/deadlocks, and a strictly increasing tier ladder at 2p
// (each tier should beat the one below it — target >=60% — or "harder" is a lie).
// Usage: node playtests/ai-ladder.js [N]   (N head-to-head games per pairing; default 300)
// Env:   NOGM=1 skips the slow trader-vs-guildmaster pairing; GMN=<n> sets that pairing's game count.
//
// >>> SHARD THE GUILDMASTER (big runs) <<<
// The Guildmaster's Monte-Carlo games are slow, and one long run degrades (V8/heap drift). Here the GM
// appears ONLY in the 2p trader-vs-guildmaster pairing (the 3-5p mixed tables use no GM), so shard THAT
// pairing: run several parallel instances at NO MORE THAN ~20 GM games each (N<=100 => __NGM<=20, or set
// GMN=20), then SUM the win counts. Each shard stays in the fast regime and fills a core. For
// per-PLAYER-COUNT GM sharding (the oracle cohorts), use sim-analyze.js with COUNTS=<one count>. Example
// (5 parallel ladder shards, GMN=20 each), then aggregate the pairing wins by hand or with a combiner:
//   for s in 1 2 3 4 5; do GMN=20 node playtests/ai-ladder.js 120 > playtests/ai-ladder-s"$s".txt 2>&1 & done; wait
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '300', 10);
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// ---- the test runner, appended into the engine's scope (no backticks inside) ----
const driver = `
//================= AI LADDER RUNNER (appended) =================
render=function(){};        // silence the UI layer for speed
save=function(){};
log=function(){};
snapshot=function(){};
// bulk-run budget for the guildmaster's Monte Carlo (the page default is 250ms/decision — far too
// slow for thousands of games; 40ms still gives it ~10-20 playouts per decision).
// SHARD THE GUILDMASTER for big runs — see the header note at the top of this file.
GUILD_MS=(typeof __GMS!=='undefined'&&__GMS)?__GMS:120;GUILD_MIN=1;   // GM bulk budget (GUILD_MS env overrides). v1.4: 40→120 — the stronger v1.4 Trader needs the GM given a realistic think to show its edge (40ms under-rated it; in-page GM is 250ms).
if(typeof CELLAR_MS!=='undefined'){CELLAR_MS=__CMS||80;CELLAR_MIN=1;CELLAR_CAP=600;if(typeof __CROLL==='string'&&__CROLL)CELLAR_ROLL=__CROLL;if(__CMCTS==='0')CELLAR_MCTS=false;if(__CMCTS==='1')CELLAR_MCTS=true;}   // cellarmaster bulk budget (CELLAR_MS env overrides) — small; SHARD the cellarmaster pairing. CELLAR_ROLL/CELLAR_MCTS env A/B the rollout policy & Path-C tree.

function aiTestGame(tiers){
  S=freshState(tiers.length,['P1','P2','P3','P4','P5'].slice(0,tiers.length));
  UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p,i){p.ai=tiers[i];});
  var guard=0;
  while(!S.over){aiStep();if(++guard>300000)return {error:'guard-tripped',round:S.turn};}
  var order=S.players.map(function(p,i){return i;}).sort(function(a,b){
    var A=scorePlayer(S.players[a]),B=scorePlayer(S.players[b]);
    if(B.total!==A.total)return B.total-A.total;
    return (S.players[b].grain+S.players[b].hops)-(S.players[a].grain+S.players[a].hops);});
  return {win:order[0],round:S.turn,totals:S.players.map(function(p){return scorePlayer(p).total;}),
          trigger:(S.sailed>=S.sailedCap?'clock':'ceiling')};
}
function mkAI(t){
  if(t==='trader')return {tier:'trader',persona:['volume','prestige','majority'][Math.floor(Math.random()*3)]};
  return {tier:t,persona:null};
}
var __OUT={pairs:{},mixed:{}};
// ---- head-to-head ladder at 2p (seats swapped every other game so turn order washes out) ----
// guildmaster games cost ~seconds each (Monte Carlo), so its pairing runs at a reduced count.
var __NGM=(typeof __GMN!=='undefined'&&__GMN)?__GMN:Math.max(20,Math.floor(__N/5));   // GM games in the trader-vs-GM pairing; GMN env overrides. Keep <=20/shard (see header) — N<=100 → 20.
var __NCM=(typeof __CMN!=='undefined'&&__CMN)?__CMN:10;   // cellarmaster pairing games; CMN env overrides. DOUBLY slow (deep MC vs flat MC) — keep tiny, shard it.
var __PAIRS=[['apprentice','journeyman'],['journeyman','trader'],['apprentice','trader']];
if(!__NOGM)__PAIRS.push(['trader','guildmaster']);              // NOGM=1 skips the slow flat-MC pairing
if(!__NOCM)__PAIRS.push(['guildmaster','cellarmaster']);        // NOCM=1 skips the slowest pairing; gate: the cellarmaster (new top rung) beats the GM >=60%
__PAIRS.forEach(function(pair){
  var __n=(pair[1]==='cellarmaster')?__NCM:(pair[1]==='guildmaster')?__NGM:__N;
  var w={};w[pair[0]]=0;w[pair[1]]=0;
  var sum={};sum[pair[0]]=0;sum[pair[1]]=0;
  var errs=0,rounds=0,n=0,clock=0;
  var perPersona={volume:{w:0,n:0},prestige:{w:0,n:0},majority:{w:0,n:0}};   // trader-lean diagnostics
  for(var g=0;g<__n;g++){
    var flip=(g%2===1);
    var seatTier=[flip?pair[1]:pair[0], flip?pair[0]:pair[1]];
    var ais=[mkAI(seatTier[0]),mkAI(seatTier[1])];
    var r;try{r=aiTestGame(ais);}catch(e){r={error:String(e&&e.message||e)};}
    if(r.error){errs++;continue;}
    w[seatTier[r.win]]++;rounds+=r.round;n++;if(r.trigger==='clock')clock++;
    sum[seatTier[0]]+=r.totals[0];sum[seatTier[1]]+=r.totals[1];
    ais.forEach(function(a,seat){if(a.tier==='trader'){perPersona[a.persona].n++;if(r.win===seat)perPersona[a.persona].w++;}});
  }
  __OUT.pairs[pair.join('|')]={names:pair,wins:w,scoreSum:sum,errors:errs,games:n,avgRound:rounds/Math.max(1,n),clock:clock,perPersona:perPersona};
});
// ---- mixed-table robustness at 3-4p (random tier per seat; the crash/deadlock gate) ----
[3,4].forEach(function(np){
  var errs=0,rounds=0,n=0,clock=0;
  var winsBy={apprentice:0,journeyman:0,trader:0},seatsBy={apprentice:0,journeyman:0,trader:0};
  var games=Math.max(50,Math.floor(__N/2));
  for(var g=0;g<games;g++){
    var tiers=[];for(var i=0;i<np;i++)tiers.push(mkAI(['apprentice','journeyman','trader'][Math.floor(Math.random()*3)]));
    var r;try{r=aiTestGame(tiers);}catch(e){r={error:String(e&&e.message||e)};}
    if(r.error){errs++;continue;}
    rounds+=r.round;n++;if(r.trigger==='clock')clock++;
    winsBy[tiers[r.win].tier]++;tiers.forEach(function(t){seatsBy[t.tier]++;});
  }
  __OUT.mixed[np]={errors:errs,games:n,avgRound:rounds/Math.max(1,n),clock:clock,winsBy:winsBy,seatsBy:seatsBy};
});
__OUT.KEY=KEY;
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
  __N: N, __NOGM: process.env.NOGM==='1', __GMN: parseInt(process.env.GMN||'0',10),
  __NOCM: process.env.NOCM==='1', __CMN: parseInt(process.env.CMN||'0',10), __CMS: parseInt(process.env.CELLAR_MS||'0',10), __CROLL: process.env.CELLAR_ROLL||'', __CMCTS: process.env.CELLAR_MCTS||'', __GMS: parseInt(process.env.GUILD_MS||'0',10),
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;

vm.createContext(ctx);
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+ai-ladder' });
} catch (e) {
  console.error('RUN ERROR:', e && e.stack || e);
  process.exit(1);
}

// ---------------- report ----------------
const R = ctx.__OUT;
const fmt = (x, d = 1) => Number(x).toFixed(d);
const pct = (a, b) => fmt(100 * a / b, 1) + '%';

console.log(`Brewhouses of the Hanse — AI tier ladder (KEY ${R.KEY})  |  N=${N} games per 2p pairing`);
let totalErrs = 0, ladderOK = true;

console.log('\n---- head-to-head at 2p (seats swapped; ladder gate: higher tier >=60%) ----');
Object.values(R.pairs).forEach(o => {
  const [lo, hi] = o.names;
  totalErrs += o.errors;
  const hiRate = 100 * o.wins[hi] / o.games;
  if (hiRate < 60) ladderOK = false;
  console.log(`${(lo+' vs '+hi).padEnd(26)} ${hi} wins ${pct(o.wins[hi], o.games).padStart(6)}  (${lo} ${pct(o.wins[lo], o.games)})  ` +
    `avg score ${lo} ${fmt(o.scoreSum[lo]/o.games)} / ${hi} ${fmt(o.scoreSum[hi]/o.games)}  rounds ${fmt(o.avgRound)}  clock ${pct(o.clock,o.games)}  errors ${o.errors}`);
  const pp = o.perPersona;
  if (pp && (pp.volume.n + pp.prestige.n + pp.majority.n) > 0)
    console.log(`  trader lean win-rates:   ` + ['volume','prestige','majority'].map(k => `${k} ${pp[k].n?pct(pp[k].w,pp[k].n):'—'} (n=${pp[k].n})`).join('   '));
});

console.log('\n---- mixed tables 3-5p (random tier per seat; robustness gate: 0 errors) ----');
Object.keys(R.mixed).forEach(np => {
  const o = R.mixed[np];
  totalErrs += o.errors;
  const perCap = t => o.seatsBy[t] ? pct(o.winsBy[t], o.seatsBy[t]) : '—';
  console.log(`${np}p  games ${o.games}  errors ${o.errors}  rounds ${fmt(o.avgRound)}  clock ${pct(o.clock,o.games)}  ` +
    `per-seat win-rate: apprentice ${perCap('apprentice')}  journeyman ${perCap('journeyman')}  trader ${perCap('trader')}`);
});

console.log(`\nGATES: errors ${totalErrs === 0 ? 'PASS (0)' : 'FAIL (' + totalErrs + ')'}  |  ladder ${ladderOK ? 'PASS (every higher tier >=60% at 2p)' : 'FAIL (a higher tier under 60%)'}`);
if (totalErrs > 0 || !ladderOK) process.exitCode = 1;
console.log('');
