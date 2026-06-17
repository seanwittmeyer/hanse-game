// Guildmaster ORACLE points-analysis harness — "where are points gained under expert play?"
// Drives the CANONICAL engine + its own aiStep() with the GUILDMASTER tier in EVERY seat, plays to
// game over, and decomposes each player's final score by SOURCE:
//   Hall (fixed prestige) · kontor BASE · kontor BUILDING-bonus (the demand you authored) · wharfage ·
//   majorities · the Flight.  Also tallies deliveries by destination and by quality.
//
// >>> SHARD IT (GM games are slow) <<<  Run ONE player count per process, <=20 games/shard, several
// shards per count, in parallel; then combine. Example (2 shards each of 2p/3p/4p = 120 games):
//   mkdir -p playtests/gmpts
//   for c in 2 3 4; do for s in 1 2; do \
//     COUNTS=$c OUT=playtests/gmpts/c${c}-s${s}.json node playtests/gm-points.js 20 & \
//   done; done; wait
//   node playtests/gm-points.js --combine playtests/gmpts/*.json
//
// Env:  COUNTS=<one int>  player count (default 3)   GMS=<ms>  guildmaster MC budget/decision (default 30)
//       OUT=<file>        write the shard's JSON there (else stdout)
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

// ---------------- combine mode ----------------
if (process.argv[2] === '--combine') {
  const files = process.argv.slice(3);
  const games = [];
  files.forEach(f => { const j = JSON.parse(fs.readFileSync(f, 'utf8')); j.recs.forEach(g => games.push({ count: j.count, ...g })); });
  report(games);
  process.exit(0);
}

// ---------------- run-a-shard mode ----------------
const N = parseInt(process.argv[2] || '20', 10);
const COUNT = parseInt(process.env.COUNTS || '3', 10);
const GMS = parseInt(process.env.GMS || '30', 10);
const OUT = process.env.OUT || '';

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= GM POINTS DRIVER (appended) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
GUILD_MS=__GMS;GUILD_MIN=1;

function __countBy(arr,keyfn){var o={};arr.forEach(function(x){var k=keyfn(x);o[k]=(o[k]||0)+1;});return o;}
function __decompose(p){
  var hall=0,kbase=0,kbonus=0;
  p.delivered.forEach(function(d){
    if(d.dest==='hall'){hall+=d.val;}
    else{var base=DEST[d.dest].value; kbase+=base; kbonus+=(d.val-base);}   // kbonus = value-buildings the cask shipped through (+ rich berths)
  });
  var sc=scorePlayer(p);
  return {total:sc.total, maj:sc.maj, flight:sc.flight, wharf:(p.wharfage||0),
          hall:hall, kbase:kbase, kbonus:kbonus, deliv:sc.deliv,
          nDeliv:p.delivered.length,
          byDest:__countBy(p.delivered,function(d){return d.dest;}),
          byQ:__countBy(p.delivered,function(d){return d.q;}),
          upg:(p.upgrades||[]).length,
          bldg:SLOTS.filter(function(s){var b=S.buildings[s.id];return b&&b.owner===p.id;}).length};
}
function __runOne(np){
  S=freshState(np,['P1','P2','P3','P4','P5'].slice(0,np));UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p){p.ai={tier:'guildmaster',persona:null};});
  var guard=0;
  while(!S.over){aiStep();if(++guard>800000)return null;}
  var order=S.players.map(function(_,i){return i;}).sort(function(a,b){
    var A=scorePlayer(S.players[a]),B=scorePlayer(S.players[b]);
    if(B.total!==A.total)return B.total-A.total;
    return (S.players[b].grain+S.players[b].hops)-(S.players[a].grain+S.players[a].hops);});
  return {win:order[0], round:S.turn, sailed:S.sailed,
          players:S.players.map(function(p){return __decompose(p);})};
}
var __RECS=[];
for(var g=0; g<__N; g++){ var r=__runOne(__COUNT); if(r)__RECS.push(r); }
var __RESULT=JSON.stringify({count:__COUNT, n:__RECS.length, recs:__RECS});
`;

const noop = () => {};
const makeEl = () => { const el = { innerHTML:'', textContent:'', value:'', style:{}, classList:{add:noop,remove:noop,toggle:noop,contains:()=>false}, setAttribute:noop, getAttribute:()=>null, appendChild:noop, addEventListener:noop, removeEventListener:noop }; el.querySelector=()=>makeEl(); el.querySelectorAll=()=>[]; el.closest=()=>null; return el; };
const document = { getElementById:()=>makeEl(), querySelector:()=>makeEl(), querySelectorAll:()=>[], createElement:()=>makeEl(), addEventListener:noop, body:makeEl() };
const store = {}; const localStorage = { getItem:k=>(k in store?store[k]:null), setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];} };
const ctx = { document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean, parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop}, __N:N, __COUNT:COUNT, __GMS:GMS };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx; ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'gm-points' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }

if (OUT) { fs.writeFileSync(OUT, ctx.__RESULT); process.stderr.write(`shard ${COUNT}p x${N} -> ${OUT} (${JSON.parse(ctx.__RESULT).n} games)\n`); }
else process.stdout.write(ctx.__RESULT + '\n');

// ---------------- reporting ----------------
function report(games) {
  const fmt = (x, d = 1) => Number(x).toFixed(d);
  const counts = [...new Set(games.map(g => g.count))].sort();
  console.log(`\nGUILDMASTER ORACLE — where points are gained  (${games.length} games; all seats Guildmaster)\n`);
  counts.forEach(c => {
    const gs = games.filter(g => g.count === c);
    const winners = gs.map(g => g.players[g.win]);
    const all = gs.flatMap(g => g.players);
    const rounds = gs.map(g => g.round);
    const avg = (a, k) => a.reduce((s, r) => s + (r[k] || 0), 0) / a.length;
    const sumDest = recs => { const o = {}; recs.forEach(r => Object.entries(r.byDest).forEach(([k, v]) => o[k] = (o[k] || 0) + v)); return o; };
    const sumQ = recs => { const o = {}; recs.forEach(r => Object.entries(r.byQ).forEach(([k, v]) => o[k] = (o[k] || 0) + v)); return o; };
    const line = (label, recs) => {
      const t = avg(recs, 'total');
      const parts = [['Hall', 'hall'], ['kontor base', 'kbase'], ['kontor BUILD', 'kbonus'], ['wharfage', 'wharf'], ['majorities', 'maj'], ['Flight', 'flight']];
      const seg = parts.map(([nm, k]) => { const v = avg(recs, k); return `${nm} ${fmt(v).padStart(5)} (${fmt(100 * v / t).padStart(4)}%)`; }).join('  ·  ');
      console.log(`  ${label.padEnd(8)} total ${fmt(t)}   ${seg}`);
    };
    console.log(`==== ${c} PLAYERS  (${gs.length} games · avg ${fmt(avg(gs.map(g => ({ r: g.round })), 'r') || rounds.reduce((a, b) => a + b, 0) / rounds.length)} rounds) ====`);
    line('WINNERS', winners);
    line('all', all);
    const wd = sumDest(winners), td = Object.values(wd).reduce((a, b) => a + b, 0);
    console.log(`  winner deliveries by destination: ` + ['bruges', 'london', 'bergen', 'novgorod', 'hall'].map(k => `${k} ${fmt(100 * (wd[k] || 0) / td)}%`).join('  '));
    const wq = sumQ(winners), tq = Object.values(wq).reduce((a, b) => a + b, 0);
    console.log(`  winner deliveries by quality:     ` + [1, 2, 3, 4, 5].map(q => `Q${q} ${fmt(100 * (wq[q] || 0) / tq)}%`).join('  '));
    console.log(`  winner: ${fmt(avg(winners, 'nDeliv'))} deliveries · ${fmt(avg(winners, 'bldg'))} buildings · ${fmt(avg(winners, 'upg'))} improvements/game`);
    console.log('');
  });
}
