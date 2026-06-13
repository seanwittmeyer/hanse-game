// Combine multiple sim-analyze event-shard files (events written with EVENTS_OUT) into one
// headline-findings report. Lets us PARALLELIZE the slow Guildmaster oracle: run N short shards
// concurrently (each dodges the long-run GM degradation), then aggregate here.
// Usage: node playtests/analysis-combine.js shard1.jsonl shard2.jsonl ...
'use strict';
const fs = require('fs');
const path = require('path');
const files = process.argv.slice(2).map(f => path.isAbsolute(f) ? f : path.join(process.cwd(), f));

const POOL = ['source', 'age', 'load', 'reach', 'convert', 'draw', 'wild'];
const DESTS = ['bruges', 'london', 'bergen', 'novgorod', 'hall'];
let games = 0, rounds = 0, winScore = 0, playersTotal = 0;
let hull = 0, charter = 0, sails = 0, comm = 0, rivalload = 0, brews = 0, q4 = 0;
const deliv = {}; let brEarly = 0, brTot = 0;
const drawn = {}, fired = {}; let totDraw = 0, totFire = 0;
POOL.forEach(k => { drawn[k] = 0; fired[k] = 0; });
const players = [];           // every player-row across all games
const q4set = new Set();      // (shard:game:pid) that brewed a Q4+ cask

files.forEach((f, fi) => {
  const lines = fs.readFileSync(f, 'utf8').split('\n').filter(Boolean);
  lines.forEach(l => {
    const e = JSON.parse(l);
    if (e.out) {                              // game header row
      games++; rounds += e.out.rounds;
      const w = e.out.players.find(p => p.winner); if (w) winScore += w.total;
      e.out.players.forEach(p => { players.push(p); playersTotal++; });
      return;
    }
    switch (e.t) {                            // event row
      case 'sail': hull += (e.ncask || 0); sails++; break;
      case 'charter': charter++; break;
      case 'shipbuild': comm++; break;
      case 'deliver': deliv[e.dest] = (deliv[e.dest] || 0) + 1;
        if (e.dest === 'bruges') { brTot++; if (e.r <= 5) brEarly++; } break;
      case 'caskdraw': drawn[e.act] = (drawn[e.act] || 0) + 1; totDraw++; break;
      case 'caskfire': fired[e.act] = (fired[e.act] || 0) + 1; totFire++; break;
      case 'brew': brews++; if (e.q >= 4) { q4++; q4set.add(fi + ':' + e.game + ':' + e.pid); } break;
      case 'rivalload': rivalload++; break;
    }
  });
});

const fmt = (x, d = 1) => (x == null || Number.isNaN(x)) ? '—' : Number(x).toFixed(d);
const pct = (a, b) => b ? fmt(100 * a / b, 1) + '%' : '—';
const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN;
const W = players.filter(p => p.winner), L = players.filter(p => !p.winner);
const totDeliv = hull + charter;
const totDelByDest = DESTS.reduce((a, d) => a + (deliv[d] || 0), 0);

console.log(`COMBINED ORACLE FINDINGS — ${files.length} shards · ${games} games · ${playersTotal} player-rows`);
console.log(`avg rounds ${fmt(rounds / games)}   winner avg score ${fmt(winScore / games)}`);
console.log(`\nDELIVERY METHOD:  hull ${hull} (${pct(hull, totDeliv)})   charter ${charter} (${pct(charter, totDeliv)})   avg casks/sail ${fmt(hull / Math.max(1, sails))}   commissions/game ${fmt(comm / games)}`);
console.log(`\nDESTINATION SHARE (of ${totDelByDest} delivered casks):`);
console.log('   ' + DESTS.map(d => `${d.slice(0, 4)} ${pct(deliv[d] || 0, totDelByDest)}`).join('   '));
console.log(`   Bruges delivered EARLY (rounds 1-5): ${pct(brEarly, brTot)} of its ${brTot} casks`);
console.log(`\nCASK ACTIONS (drawn vs fired; fire/draw = re-use utility):  overall fire rate ${pct(totFire, totDraw)}`);
POOL.forEach(k => console.log(`   ${k.padEnd(8)} drawn ${pct(drawn[k], totDraw).padStart(6)}   fired ${pct(fired[k], totFire).padStart(6)}   fire/draw ${pct(fired[k], drawn[k]).padStart(7)}`));
console.log(`\nQUALITY CLIMB:  Q4+ brews/game ${fmt(q4 / games)}   players who NEVER brew Q4+ ${pct(playersTotal - q4set.size, playersTotal)}`);
console.log(`\nWIN CORRELATES (winners vs losers):`);
[['total', p => p.total], ['delivery', p => p.deliv], ['majority', p => p.maj], ['goals', p => p.goals],
 ['casks deliv', p => p.ndeliv], ['distinct dests', p => p.ndest], ['Hall casks', p => p.hall], ['upgrades', p => p.upgrades]]
  .forEach(([lab, fn]) => { const w = mean(W.map(fn)), l = mean(L.map(fn)); console.log(`   ${lab.padEnd(16)} W ${fmt(w).padStart(6)}  L ${fmt(l).padStart(6)}  (Δ ${(w - l >= 0 ? '+' : '') + fmt(w - l)})`); });
console.log(`\nrival-loads/game ${fmt(rivalload / games)}`);
