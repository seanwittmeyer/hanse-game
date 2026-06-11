// Offline weight tuner for the Trader AI — Phase 2 of AUTOMA.md.
// Cross-entropy method (CEM) over the AI_W policy weights in play.html: each candidate weight
// vector rides into games on p.ai.w (the per-seat override), playing against the INCUMBENT
// defaults and Journeyman inside the canonical engine — fitness is measured win-rate, so every
// rules revision automatically re-grounds the tuning. Re-run this after any balance pass.
//
// Usage: node playtests/ai-tune.js [gens] [pop]      (defaults 10 generations, population 16)
// Output: per-generation progress + a confirmed final recommendation (adopt into AI_W by hand,
// then re-run the standard gates: ai-ladder, ai-render-smoke, sim).
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const GENS = parseInt(process.argv[2] || '10', 10);
const POP = parseInt(process.argv[3] || '16', 10);
const ELITE = Math.max(2, Math.round(POP / 4));
// games per fitness eval (each ~2-4 ms): 2p vs incumbent / 2p vs journeyman / 4p vs 3 incumbents
const N_INC = 160, N_JOUR = 80, N_4P = 60;
const N_CONFIRM_2P = 2000, N_CONFIRM_4P = 600;

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// ---- match runners, appended into the engine's scope; called from Node via the context ----
const driver = `
//================= AI TUNE RUNNERS (appended) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
function aiTuneGame(seatAIs){
  S=freshState(seatAIs.length,['P1','P2','P3','P4','P5'].slice(0,seatAIs.length));
  UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p,i){p.ai=seatAIs[i];});
  var guard=0;
  while(!S.over){aiStep();if(++guard>300000)throw new Error('guard-tripped');}
  var order=S.players.map(function(p,i){return i;}).sort(function(a,b){
    var A=scorePlayer(S.players[a]),B=scorePlayer(S.players[b]);
    if(B.total!==A.total)return B.total-A.total;
    return (S.players[b].grain+S.players[b].hops)-(S.players[a].grain+S.players[a].hops);});
  return order[0];
}
function aiTunePersona(){return ['volume','prestige','majority'][Math.floor(Math.random()*3)];}
// candidate (weights w) head-to-head at 2p, seats alternating; returns candidate's wins
function aiTuneH2H(w,opp,n){
  var wins=0;
  for(var g=0;g<n;g++){
    var cand={tier:'trader',persona:aiTunePersona(),w:w};
    var other=(opp==='trader')?{tier:'trader',persona:aiTunePersona()}:{tier:'journeyman',persona:null};
    var flip=(g%2===1);
    var win=aiTuneGame(flip?[other,cand]:[cand,other]);
    if(win===(flip?1:0))wins++;
  }
  return wins;
}
// candidate at a 4p table vs three incumbent traders (rotating seat); returns candidate's wins
function aiTune4p(w,n){
  var wins=0;
  for(var g=0;g<n;g++){
    var seat=g%4,seats=[];
    for(var i=0;i<4;i++)seats.push(i===seat?{tier:'trader',persona:aiTunePersona(),w:w}
                                            :{tier:'trader',persona:aiTunePersona()});
    if(aiTuneGame(seats)===seat)wins++;
  }
  return wins;
}
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
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+ai-tune' });
} catch (e) {
  console.error('RUN ERROR:', e && e.stack || e);
  process.exit(1);
}

// ---------------- the CEM loop (Node side) ----------------
// dimension: [key, lo, hi] — bounds keep samples sane; mean starts at the shipped defaults.
const DIMS = [
  ['swing',     0.2, 1.8],
  ['upBen',     0.0, 4.0],
  ['goodsBen',  0.0, 3.0],
  ['hallBase',  0.4, 1.3],
  ['hallRamp',  0.0, 1.2],
  ['leanVal',   0.9, 1.7],
  ['leanSwing', 0.9, 1.7],
  ['leanHall',  0.9, 1.7],
  ['goalW',     0.0, 2.5],
  ['buyFlush',  4.0, 10.0],
];
const DEFAULTS = { swing: 0.75, upBen: 1.5, goodsBen: 1.0, hallBase: 0.75, hallRamp: 0.55,
  leanVal: 1.05, leanSwing: 1.2, leanHall: 1.15, goalW: 1.0, buyFlush: 7 };   // keep in sync with AI_W in play.html

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const toW = vec => { const w = {}; DIMS.forEach(([k], i) => w[k] = +vec[i].toFixed(3)); return w; };
const fmtW = w => DIMS.map(([k]) => `${k}=${w[k]}`).join(' ');

// fitness: each term is ~0.5 at parity (4p fair share is 25%, so it is doubled)
function fitness(w) {
  const wrInc = ctx.aiTuneH2H(w, 'trader', N_INC) / N_INC;
  const wrJour = ctx.aiTuneH2H(w, 'journeyman', N_JOUR) / N_JOUR;
  const wr4 = ctx.aiTune4p(w, N_4P) / N_4P;
  return { f: 0.5 * wrInc + 0.25 * wrJour + 0.25 * Math.min(1, wr4 * 2), wrInc, wrJour, wr4 };
}

let mean = DIMS.map(([k]) => DEFAULTS[k]);
let sigma = DIMS.map(([, lo, hi]) => (hi - lo) / 4);
let bestEver = { f: -1, w: toW(mean) };

console.log(`Brewhouses of the Hanse — Trader weight tuner (CEM)  |  gens=${GENS} pop=${POP} elite=${ELITE}`);
console.log(`fitness = 0.5*WR(2p vs incumbent, n=${N_INC}) + 0.25*WR(2p vs journeyman, n=${N_JOUR}) + 0.25*min(1, 2*WR(4p vs 3 incumbents, n=${N_4P}))`);
console.log(`incumbent/defaults: ${fmtW(DEFAULTS)}\n`);

const t0 = Date.now();
for (let gen = 1; gen <= GENS; gen++) {
  const popn = [];
  for (let i = 0; i < POP; i++) {
    // first sample of gen 1 = the defaults themselves (so the incumbent is always in the race)
    const vec = (gen === 1 && i === 0)
      ? mean.slice()
      : mean.map((m, d) => clamp(m + sigma[d] * gauss(), DIMS[d][1], DIMS[d][2]));
    const w = toW(vec);
    const r = fitness(w);
    popn.push({ vec, w, ...r });
    if (r.f > bestEver.f) bestEver = { f: r.f, w, wrInc: r.wrInc, wrJour: r.wrJour, wr4: r.wr4 };
  }
  popn.sort((a, b) => b.f - a.f);
  const elites = popn.slice(0, ELITE);
  mean = DIMS.map((_, d) => elites.reduce((s, e) => s + e.vec[d], 0) / ELITE);
  sigma = DIMS.map((_, d) => {
    const v = elites.reduce((s, e) => s + (e.vec[d] - mean[d]) ** 2, 0) / ELITE;
    return Math.max(0.02, Math.sqrt(v));   // floor keeps late generations exploring a little
  });
  const top = popn[0];
  console.log(`gen ${String(gen).padStart(2)}  best f=${top.f.toFixed(3)} (inc ${(100*top.wrInc).toFixed(0)}% jour ${(100*top.wrJour).toFixed(0)}% 4p ${(100*top.wr4).toFixed(0)}%)  ` +
    `elite-mean f=${(elites.reduce((s,e)=>s+e.f,0)/ELITE).toFixed(3)}  [${((Date.now()-t0)/1000).toFixed(0)}s]`);
  console.log(`        mean: ${fmtW(toW(mean))}`);
}

// ---------------- confirmation at high N: final mean and best-ever vs the incumbent ----------------
console.log(`\n---- confirmation (2p n=${N_CONFIRM_2P} each + 4p n=${N_CONFIRM_4P}) ----`);
const candidates = [['final-mean', toW(mean)], ['best-ever', bestEver.w]];
let winner = null;
candidates.forEach(([name, w]) => {
  const wrInc = ctx.aiTuneH2H(w, 'trader', N_CONFIRM_2P) / N_CONFIRM_2P;
  const wrJour = ctx.aiTuneH2H(w, 'journeyman', Math.floor(N_CONFIRM_2P / 2)) / Math.floor(N_CONFIRM_2P / 2);
  const wr4 = ctx.aiTune4p(w, N_CONFIRM_4P) / N_CONFIRM_4P;
  const se = Math.sqrt(0.25 / N_CONFIRM_2P);
  console.log(`${name.padEnd(11)} vs incumbent ${(100*wrInc).toFixed(1)}% (±${(196*se).toFixed(1)})  vs journeyman ${(100*wrJour).toFixed(1)}%  4p share ${(100*wr4).toFixed(1)}% (fair 25)`);
  console.log(`            ${fmtW(w)}`);
  if (!winner || wrInc > winner.wrInc) winner = { name, w, wrInc, wrJour, wr4 };
});

const se2 = Math.sqrt(0.25 / N_CONFIRM_2P);
const sig = winner.wrInc - 1.96 * se2 > 0.5;
console.log(`\nRECOMMENDATION: ${sig
  ? `ADOPT ${winner.name} — beats the incumbent ${(100*winner.wrInc).toFixed(1)}% (CI excludes 50%). Copy into AI_W in play.html, then re-run the gates.`
  : `KEEP the incumbent — no candidate beats it significantly (best: ${winner.name} at ${(100*winner.wrInc).toFixed(1)}%). The shipped AI_W stands.`}`);
console.log(`winner weights: ${fmtW(winner.w)}\n`);
