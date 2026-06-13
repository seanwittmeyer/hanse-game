// Strategy-analysis harness for play.html — runs N headless AI games, captures a STRUCTURED
// event stream (hooked on the engine's own functions, so it can never drift from the rules),
// and prints strategy reports: openings, timing curves, per-tier action profiles, destination
// sequencing, and win correlates. Complements sim.js (robustness/pace) and ai-ladder.js (strength).
//
// Usage:    node playtests/sim-analyze.js [N]            (N games per player count; default 300)
// Env:      COUNTS=2,3,4      player counts                       (default 2,3,4)
//           TIERS=trader      seat tiers, comma list cycled across seats and ROTATED per game —
//                             e.g. trader | journeyman | guildmaster,trader      (default trader)
//           SAVE=1            also write the raw event stream to playtests/analysis/events.jsonl
//
// Guildmaster seats run at the reduced GUILD_MS=40 bulk budget. KNOWN ISSUE: long GM runs degrade
// well past the early-game rate (~5s/game early, slowing several-fold over a long run — V8/heap
// behaviour under the wrapper layer; cause not yet isolated). Keep GM cohorts small (N<=50) or
// watch the stderr heartbeat; the trader/journeyman cohorts are unaffected (thousands of games/min).
// Events fired inside Guildmaster Monte Carlo playouts are excluded (aiSimulating guard).
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '300', 10);
const COUNTS = (process.env.COUNTS ? process.env.COUNTS.split(',').map(x => parseInt(x, 10)) : [2, 3, 4]);
const TIERS = (process.env.TIERS || 'trader').split(',').map(t => t.trim()).filter(Boolean);
const SAVE = process.env.SAVE === '1';

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// ---- instrumentation + runner, appended into the engine's scope (no backticks inside) ----
const driver = `
//================= ANALYZE DRIVER (appended) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
GUILD_MS=40;GUILD_MIN=1;   // bulk budget for any guildmaster seats

var __EV=null;   // active game's event list (null outside games; guarded vs MC playouts)
function EV(t,d){if(!__EV||aiSimulating)return;var e={t:t,r:S.turn,pid:S.active};if(d)for(var k in d)e[k]=d[k];__EV.push(e);}

// hook the engine's own functions — the stream can never drift from the rules.
// REC() is checked BEFORE building any event payload: inside Guildmaster Monte Carlo playouts these
// wrappers run millions of times, so no per-call allocation may happen unless we are recording.
function REC(){return __EV&&!aiSimulating;}
var _doMove=doMove;          doMove=function(c){if(REC())EV('move',{cell:c});return _doMove(c);};
var _chooseLine=chooseLine;  chooseLine=function(w){if(REC())EV('line',{lk:cellOfLine(cur().cell)[w]});return _chooseLine(w);};
var _brewPick=brewPick;      brewPick=function(st){if(REC())EV('brew',{style:st,q:STYLES[st].q});return _brewPick(st);};
var _buyRecipe=buyRecipe;    buyRecipe=function(st){if(REC())EV('recipe',{style:st,q:STYLES[st].q});return _buyRecipe(st);};
var _buyDisplayUp=buyDisplayUp;buyDisplayUp=function(k){if(REC())EV('buyup',{key:k});return _buyDisplayUp(k);};
var _grantUpgrade=grantUpgrade;grantUpgrade=function(p,k){if(REC())EV('up',{pid:p.id,key:k});return _grantUpgrade(p,k);};
var _deployTo=deployTo;      deployTo=function(sl){if(REC())EV('deploy',{slot:sl});return _deployTo(sl);};
var _commissionShip=commissionShip;commissionShip=function(idx){var sn=(S.shipDisplay&&S.shipDisplay[(idx!=null&&S.shipDisplay[idx])?idx:0]);if(REC()&&sn)EV('shipbuild',{dest:sn.dest,ship:sn.ship});return _commissionShip(idx);};
var _charterDest=charterDest;charterDest=function(d){if(REC())EV('charter',{dest:d});return _charterDest(d);};
var _deliverCask=deliverCask;deliverCask=function(lp,style,q,dest){if(REC())EV('deliver',{pid:lp.id,dest:dest,q:q});return _deliverCask(lp,style,q,dest);};
var _sailShip=sailShip;      sailShip=function(sl,cid){if(REC()){var t=S.slots[sl];if(t)EV('sail',{pid:(cid!=null?cid:S.active),dest:t.dest,ncask:t.load.length});}return _sailShip(sl,cid);};
var _loadOnto=loadOnto;      loadOnto=function(ss){if(REC()){var ct=S.slots[UI.load.cask];if(ct&&ct.owner!==S.active)EV('rivalload',{owner:ct.owner});}return _loadOnto(ss);};
var _reachPick=reachPick;    reachPick=function(k){if(REC())EV('pres',{dest:k});return _reachPick(k);};
var _drawPick=drawPick;      drawPick=function(g){if(REC())EV('goaldraw',{goal:g});return _drawPick(g);};
var _almsPick=almsPick;      almsPick=function(k){if(REC())EV('pres',{dest:k});return _almsPick(k);};

function mkAI(t){
  if(t==='trader')return {tier:'trader',persona:['volume','prestige','majority'][Math.floor(Math.random()*3)]};
  return {tier:t,persona:null};
}
var __AN=[];
function anGame(np,tierList,gi){
  S=freshState(np,['P1','P2','P3','P4','P5'].slice(0,np));
  UI={sub:'move'};undoStack=[];activeTab=0;
  // cycle the tier list across seats, rotated by game index so tier-vs-seat is decoupled
  S.players.forEach(function(p,i){p.ai=mkAI(tierList[(i+gi)%tierList.length]);});
  __EV=[];
  var guard=0;
  while(!S.over){aiStep();if(++guard>300000)throw new Error('guard-tripped');}
  var fr=finalRows();var win=fr.rows[0];
  var out={n:np,rounds:S.turn,players:S.players.map(function(p){
    var sc=scorePlayer(p);
    return {pid:p.id,tier:p.ai.tier,persona:p.ai.persona,winner:fr.cmp({p:p,sc:sc},win)===0,
            total:sc.total,deliv:sc.deliv,maj:sc.maj,goals:sc.goals,
            ndeliv:p.delivered.length,ndest:KONTORE.concat(['hall']).filter(function(d){return deliveredAt(p,d)>0;}).length,
            hall:deliveredAt(p,'hall'),upgrades:p.upgrades.length,ships:p.shipsSailed||0,
            goalsHeld:p.goals.length};})};
  var ev=__EV;__EV=null;
  __AN.push({out:out,ev:ev});
}
var __done=0,__t0=Date.now();
COUNTSX.forEach(function(np){for(var g=0;g<NX;g++){anGame(np,TIERSX,g);
  if(++__done%10===0)console.error('  …'+__done+' games ('+((Date.now()-__t0)/1000|0)+'s)');}});
`;

const noop = () => {};
const makeEl = () => {
  const el = {
    innerHTML: '', textContent: '', value: '', style: {},
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    setAttribute: noop, getAttribute: () => null, appendChild: noop,
    addEventListener: noop, removeEventListener: noop,
  };
  el.querySelector = () => makeEl(); el.querySelectorAll = () => []; el.closest = () => null;
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
  COUNTSX: COUNTS, NX: N, TIERSX: TIERS,
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;

vm.createContext(ctx);
const t0 = Date.now();
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+analyze' });
} catch (e) {
  console.error('RUN ERROR:', e && e.stack || e);
  process.exit(1);
}
const GAMES = ctx.__AN;

if (SAVE) {
  const dir = path.join(__dirname, 'analysis');
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, 'events.jsonl');
  const ws = fs.createWriteStream(f);
  GAMES.forEach((g, gi) => {
    ws.write(JSON.stringify({ game: gi, out: g.out }) + '\n');
    g.ev.forEach(e => ws.write(JSON.stringify(Object.assign({ game: gi }, e)) + '\n'));
  });
  ws.end();
  console.error(`raw events written to ${f}`);
}

// ================= aggregation & reports =================
const fmt = (x, d = 1) => (x == null || Number.isNaN(x)) ? '—' : Number(x).toFixed(d);
const pct = (a, b) => b ? fmt(100 * a / b, 1) + '%' : '—';
const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN;
const tierLabel = pl => pl.tier + (pl.persona ? '·' + pl.persona[0] : '');
const DESTS = ['bruges', 'london', 'bergen', 'novgorod', 'hall'];
const CELLN = { A: 'Market', B: 'Brewhouse', C: 'Harbor', D: 'Cellar' };

console.log(`Brewhouses of the Hanse — strategy analysis  |  ${GAMES.length} games  |  tiers=${TIERS.join(',')}  counts=${COUNTS.join(',')}  N=${N}/count  [${fmt((Date.now()-t0)/1000,0)}s]`);
console.log(`winner avg score ${fmt(mean(GAMES.map(g=>g.out.players.find(p=>p.winner).total)))}  ·  avg rounds ${fmt(mean(GAMES.map(g=>g.out.rounds)))}`);

// ---- 1. OPENINGS: each player's turn-1 placement + first line, win-rate vs fair ----
console.log('\n==== OPENINGS (turn-1 placement + first line; win-rate vs fair share) ====');
COUNTS.forEach(np => {
  const tally = {};
  GAMES.filter(g => g.out.n === np).forEach(g => {
    const firstMove = {}, firstLine = {};
    g.ev.forEach(e => {
      if (e.t === 'move' && e.r === 1 && firstMove[e.pid] === undefined) firstMove[e.pid] = e.cell;
      if (e.t === 'line' && e.r === 1 && firstLine[e.pid] === undefined) firstLine[e.pid] = e.lk;
    });
    g.out.players.forEach(pl => {
      const key = (CELLN[firstMove[pl.pid]] || '?') + ' + ' + (firstLine[pl.pid] || '?');
      (tally[key] = tally[key] || { n: 0, w: 0 }).n++;
      if (pl.winner) tally[key].w++;
    });
  });
  const fair = 100 / np;
  const rows = Object.entries(tally).sort((a, b) => b[1].n - a[1].n);
  console.log(`-- ${np}p (fair = ${fmt(fair)}%):`);
  rows.forEach(([k, v]) => console.log(`   ${k.padEnd(22)} picked ${String(v.n).padStart(5)}×   wins ${pct(v.w, v.n).padStart(6)}   (${(100*v.w/v.n-fair>=0?'+':'')}${fmt(100*v.w/v.n-fair)} vs fair)`));
});

// ---- helpers over per-player event timelines ----
function firstRound(g, pid, pred) {
  for (const e of g.ev) if (e.pid === pid && pred(e)) return e.r;
  return null;
}
function perPlayer(fn) { // collect [{pl, g, value}] across all games
  const out = [];
  GAMES.forEach(g => g.out.players.forEach(pl => out.push({ pl, g, v: fn(g, pl) })));
  return out;
}

// ---- 2. TIMING: winners vs losers — when the engine comes online ----
console.log('\n==== TIMING (avg round of first …; winners vs losers; %never in parens) ====');
const TIMERS = [
  ['first voyage (sail/charter)', (g, pl) => firstRound(g, pl.pid, e => (e.t === 'sail') || e.t === 'charter')],
  ['first export recipe', (g, pl) => firstRound(g, pl.pid, e => e.t === 'recipe')],
  ['first upgrade', (g, pl) => firstRound(g, pl.pid, e => e.t === 'up')],
  ['first Hall delivery', (g, pl) => firstRound(g, pl.pid, e => e.t === 'deliver' && e.dest === 'hall')],
  ['first Bergen delivery', (g, pl) => firstRound(g, pl.pid, e => e.t === 'deliver' && e.dest === 'bergen')],
  ['first Q4+ brew', (g, pl) => firstRound(g, pl.pid, e => e.t === 'brew' && e.q >= 4)],
];
TIMERS.forEach(([label, fn]) => {
  const rows = perPlayer(fn);
  const w = rows.filter(r => r.pl.winner), l = rows.filter(r => !r.pl.winner);
  const f = set => `${fmt(mean(set.filter(r => r.v != null).map(r => r.v)))} (${pct(set.filter(r => r.v == null).length, set.length)} never)`;
  console.log(`   ${label.padEnd(28)} winners ${f(w).padEnd(20)} losers ${f(l)}`);
});

// ---- 3. PER-TIER ACTION PROFILE (avg per player per game) ----
console.log('\n==== ACTION PROFILE by tier (avg per player per game) ====');
const profiles = {};
GAMES.forEach(g => g.out.players.forEach(pl => {
  const key = tierLabel(pl);
  const pr = (profiles[key] = profiles[key] || { n: 0, st: { A: 0, B: 0, C: 0, D: 0 }, brews: 0, q4brews: 0,
    deliv: {}, charters: 0, rload: 0, pres: 0, ups: 0, buys: 0, ships: 0, wins: 0 });
  pr.n++; if (pl.winner) pr.wins++;
  g.ev.forEach(e => {
    if (e.pid !== pl.pid) return;
    if (e.t === 'move') pr.st[e.cell]++;
    else if (e.t === 'brew') { pr.brews++; if (e.q >= 4) pr.q4brews++; }
    else if (e.t === 'deliver') pr.deliv[e.dest] = (pr.deliv[e.dest] || 0) + 1;
    else if (e.t === 'charter') pr.charters++;
    else if (e.t === 'rivalload') pr.rload++;
    else if (e.t === 'pres') pr.pres++;
    else if (e.t === 'up') pr.ups++;
    else if (e.t === 'buyup') pr.buys++;
    else if (e.t === 'sail') pr.ships++;
  });
}));
Object.entries(profiles).sort((a, b) => b[1].n - a[1].n).forEach(([k, p]) => {
  const d = DESTS.map(x => `${x.slice(0, 4)} ${fmt((p.deliv[x] || 0) / p.n)}`).join(' · ');
  console.log(`-- ${k}  (n=${p.n}, win ${pct(p.wins, p.n)})`);
  console.log(`   stations/game: Mkt ${fmt(p.st.A / p.n)} · Brw ${fmt(p.st.B / p.n)} · Hbr ${fmt(p.st.C / p.n)} · Clr ${fmt(p.st.D / p.n)}    brews ${fmt(p.brews / p.n)} (Q4+ ${fmt(p.q4brews / p.n)})`);
  console.log(`   deliveries/game: ${d}`);
  console.log(`   sails ${fmt(p.ships / p.n)} · charters ${fmt(p.charters / p.n)} · rival-loads ${fmt(p.rload / p.n)} · presence-actions ${fmt(p.pres / p.n)} · upgrades ${fmt(p.ups / p.n)} (bought ${fmt(p.buys / p.n)})`);
});

// ---- 4. DESTINATION SEQUENCING: when each destination gets fed ----
console.log('\n==== DESTINATION TIMING (share of deliveries by phase: rounds 1-5 / 6-10 / 11+) ====');
DESTS.forEach(d => {
  let e1 = 0, e2 = 0, e3 = 0;
  GAMES.forEach(g => g.ev.forEach(e => { if (e.t === 'deliver' && e.dest === d) { if (e.r <= 5) e1++; else if (e.r <= 10) e2++; else e3++; } }));
  const tot = e1 + e2 + e3;
  console.log(`   ${d.padEnd(9)} ${String(tot).padStart(6)} casks   early ${pct(e1, tot).padStart(6)}   mid ${pct(e2, tot).padStart(6)}   late ${pct(e3, tot).padStart(6)}`);
});

// ---- 4b. DELIVERY METHOD: casks delivered by HULL (a ship sailing) vs CHARTER ----
console.log('\n==== DELIVERY METHOD (casks delivered by hull vs charter; per count) ====');
COUNTS.forEach(np => {
  let hull = 0, charter = 0, sails = 0;
  GAMES.filter(g => g.out.n === np).forEach(g => g.ev.forEach(e => {
    if (e.t === 'sail') { hull += (e.ncask || 0); sails++; }
    else if (e.t === 'charter') charter++;
  }));
  let comm = 0, ng = 0; GAMES.filter(g=>g.out.n===np).forEach(g=>{ng++;g.ev.forEach(e=>{if(e.t==='shipbuild')comm++;});});
  const tot = hull + charter;
  console.log(`   ${np}p   hull ${String(hull).padStart(6)} (${pct(hull, tot)})   charter ${String(charter).padStart(6)} (${pct(charter, tot)})   ` +
    `avg casks/sail ${fmt(hull / Math.max(1, sails))}   commissions/game ${fmt(comm/Math.max(1,ng))}   total deliveries ${tot}`);
});

// ---- 5. WIN CORRELATES ----
console.log('\n==== WIN CORRELATES (avg, winners vs losers) ====');
const C = [
  ['total score', pl => pl.total], ['delivery pts', pl => pl.deliv], ['majority pts', pl => pl.maj],
  ['goal pts', pl => pl.goals], ['casks delivered', pl => pl.ndeliv], ['distinct destinations', pl => pl.ndest],
  ['Hall casks', pl => pl.hall], ['upgrades', pl => pl.upgrades], ['ships sailed', pl => pl.ships],
  ['goals held at end', pl => pl.goalsHeld],
];
const allP = []; GAMES.forEach(g => g.out.players.forEach(pl => allP.push(pl)));
C.forEach(([label, fn]) => {
  const w = mean(allP.filter(p => p.winner).map(fn)), l = mean(allP.filter(p => !p.winner).map(fn));
  console.log(`   ${label.padEnd(24)} winners ${fmt(w).padStart(6)}   losers ${fmt(l).padStart(6)}   (Δ ${(w-l>=0?'+':'')}${fmt(w - l)})`);
});
console.log('');
