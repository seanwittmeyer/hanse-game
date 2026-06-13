// Combine multiple sim-analyze event-shard files (EVENTS_OUT) into a per-player-count findings report.
// Built for the parallel oracle: run many short shards concurrently, then aggregate here.
// Reports core health + a dedicated FLIGHT/Masterpiece block (v0.13) to evaluate the range strategy.
// Usage: node playtests/analysis-combine.js shard1.jsonl shard2.jsonl ...
'use strict';
const fs = require('fs');
const path = require('path');
const files = process.argv.slice(2).map(f => path.isAbsolute(f) ? f : path.join(process.cwd(), f));
const DESTS = ['bruges', 'london', 'bergen', 'novgorod', 'hall'];

// gather rows, keyed by player count
const byCount = {};   // n -> {games, rounds, winScore, players:[], hull, charter, sails, comm, brewQ{}, brews}
function bucket(n) { return byCount[n] = byCount[n] || { games: 0, rounds: 0, winScore: 0, players: [], hull: 0, charter: 0, sails: 0, comm: 0, brewQ: {}, brews: 0, deliv: {} }; }

files.forEach((f, fi) => {
  let curN = null;
  fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).forEach(l => {
    const e = JSON.parse(l);
    if (e.out) {                       // game header
      const b = bucket(e.out.n); curN = e.out.n;
      b.games++; b.rounds += e.out.rounds;
      const w = e.out.players.find(p => p.winner); if (w) b.winScore += w.total;
      e.out.players.forEach(p => b.players.push(p));
      return;
    }
    const b = curN != null ? byCount[curN] : null; if (!b) return;
    if (e.t === 'sail') { b.hull += (e.ncask || 0); b.sails++; }
    else if (e.t === 'charter') b.charter++;
    else if (e.t === 'shipbuild') b.comm++;
    else if (e.t === 'brew') { b.brewQ[e.q] = (b.brewQ[e.q] || 0) + 1; b.brews++; }
    else if (e.t === 'deliver') b.deliv[e.dest] = (b.deliv[e.dest] || 0) + 1;
  });
});

const fmt = (x, d = 1) => (x == null || Number.isNaN(x)) ? '—' : Number(x).toFixed(d);
const pct = (a, b) => b ? fmt(100 * a / b, 1) + '%' : '—';
const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN;

console.log(`COMBINED ORACLE FINDINGS — ${files.length} shards · counts: ${Object.keys(byCount).join('/')}p\n`);

Object.keys(byCount).map(Number).sort((a, b) => a - b).forEach(n => {
  const b = byCount[n], P = b.players, W = P.filter(p => p.winner), L = P.filter(p => !p.winner);
  const totDeliv = b.hull + b.charter;
  console.log(`================  ${n} PLAYERS  (${b.games} games, ${P.length} player-rows)  ================`);
  console.log(`avg rounds ${fmt(b.rounds / b.games)}   winner avg score ${fmt(b.winScore / b.games)}`);
  console.log(`DELIVERY:  hull ${pct(b.hull, totDeliv)}  charter ${pct(b.charter, totDeliv)}  casks/sail ${fmt(b.hull / Math.max(1, b.sails))}  commissions/game ${fmt(b.comm / b.games)}`);
  const dTot = DESTS.reduce((a, d) => a + (b.deliv[d] || 0), 0);
  console.log(`DEST SHARE:  ` + DESTS.map(d => `${d.slice(0, 4)} ${pct(b.deliv[d] || 0, dTot)}`).join('  '));
  // quality climb (from brew events) + per-player delivered-tier facts
  const q4 = (b.brewQ[4] || 0) + (b.brewQ[5] || 0);
  console.log(`CLIMB:     chosen brews/game ${fmt(b.brews / b.games)}  ·  Q4+ ${pct(q4, b.brews)} of brews (${fmt(q4 / b.games)}/game)  ·  Q5 brews/game ${fmt((b.brewQ[5] || 0) / b.games)}`);
  // ---- THE FLIGHT ----
  const tierDist = [0, 0, 0, 0, 0, 0];   // index = distinct tiers (0..5)
  P.forEach(p => tierDist[p.tiers || 0]++);
  const fullFlight = P.filter(p => p.tiers >= 5).length, qualFlight = P.filter(p => p.tiers >= 3).length;
  const mastered = P.filter(p => p.mastered).length;
  console.log(`FLIGHT:    distinct tiers delivered →  ` + [1, 2, 3, 4, 5].map(t => `${t}:${pct(tierDist[t], P.length)}`).join('  '));
  console.log(`           qualifying flight (≥3 tiers) ${pct(qualFlight, P.length)}   full flight (5) ${pct(fullFlight, P.length)}   Masterpiece earned ${pct(mastered, P.length)}`);
  console.log(`           avg Flight ★:  winners ${fmt(mean(W.map(p => p.flight || 0)))}   losers ${fmt(mean(L.map(p => p.flight || 0)))}     avg Master ★: W ${fmt(mean(W.map(p => p.master || 0)))} L ${fmt(mean(L.map(p => p.master || 0)))}`);
  // win-rate by distinct-tier bucket
  const wr = {}; [2, 3, 4, 5].forEach(t => { const set = P.filter(p => p.tiers === t); wr[t] = set.length ? pct(set.filter(p => p.winner).length, set.length) : '—'; });
  console.log(`           win-rate by tiers:  ` + [2, 3, 4, 5].map(t => `${t}-tier ${wr[t]} (n=${P.filter(p => p.tiers === t).length})`).join('   '));
  // multiple-sets potential: min count across a player's delivered tiers = complete copies of their range
  const setsOf = p => { const qs = [1, 2, 3, 4, 5].filter(q => (p.delivByQ || {})[q] > 0); return qs.length ? Math.min(...qs.map(q => p.delivByQ[q])) : 0; };
  const setBuckets = { 1: 0, 2: 0, 3: 0 };
  P.filter(p => p.tiers >= 3).forEach(p => { const s = setsOf(p); if (s >= 3) setBuckets[3]++; else if (s >= 1) setBuckets[s]++; });
  const fln = P.filter(p => p.tiers >= 3).length;
  console.log(`           MULTI-SET potential (≥3-tier players, copies of full range):  1 set ${pct(setBuckets[1], fln)}   2 sets ${pct(setBuckets[2], fln)}   3+ ${pct(setBuckets[3], fln)}`);
  // win correlates (incl new dimensions)
  const C = [['total', p => p.total], ['delivery', p => p.deliv], ['majority', p => p.maj], ['goals', p => p.goals], ['flight', p => p.flight || 0], ['master', p => p.master || 0], ['casks', p => p.ndeliv], ['distinct dests', p => p.ndest]];
  console.log(`WIN CORRELATES (W vs L):  ` + C.map(([lab, fn]) => `${lab} ${fmt(mean(W.map(fn)))}/${fmt(mean(L.map(fn)))}`).join('   '));
  console.log('');
});
