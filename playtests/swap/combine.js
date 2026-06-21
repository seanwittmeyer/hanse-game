// Combine station-swap shard JSONs into per-cell (30-game) stats and print a base-vs-swap table.
'use strict';
const fs = require('fs');
const path = require('path');
const HERE = __dirname;

const files = fs.readdirSync(HERE).filter(f => /^(base|swap)-(gm|cm)-\dp-s\d\.json$/.test(f));
const cells = {}; // key tag|tier|np
for (const f of files) {
  let o; try { o = JSON.parse(fs.readFileSync(path.join(HERE, f), 'utf8')); } catch (e) { continue; }
  const k = `${o.tag}|${o.tier}|${o.np}`;
  const c = cells[k] || (cells[k] = { tag: o.tag, tier: o.tier, np: o.np, games: 0, errors: 0, ties: 0,
    clock: 0, inBand: 0, roundSum: 0, roundMin: 1e9, roundMax: 0, winnerSum: 0, winnerMin: 1e9, winnerMax: 0,
    allSum: 0, allN: 0, winsBySeat: [] });
  c.games += o.games; c.errors += o.errors; c.ties += o.ties; c.clock += o.clock; c.inBand += o.inBand;
  c.roundSum += o.avgRound * o.games; c.roundMin = Math.min(c.roundMin, o.minRound); c.roundMax = Math.max(c.roundMax, o.maxRound);
  c.winnerSum += o.avgWinner * o.games; c.winnerMin = Math.min(c.winnerMin, o.minWinner); c.winnerMax = Math.max(c.winnerMax, o.maxWinner);
  c.allSum += o.avgAll * (o.games * o.np); c.allN += o.games * o.np;
  o.winsBySeat.forEach((w, i) => { c.winsBySeat[i] = (c.winsBySeat[i] || 0) + w; });
}

const fmt = (x, d = 1) => Number(x).toFixed(d);
const pct = (a, b) => b ? fmt(100 * a / b) + '%' : '—';
function seatSpread(c) {
  const g = c.games || 1; const ideal = 100 / c.np;
  const rates = c.winsBySeat.map(w => 100 * w / g);
  const spread = Math.max(...rates) - Math.min(...rates);
  return { p1: rates[0], spread };
}

const order = [];
for (const tier of ['gm', 'cm']) for (const np of [2, 3, 4]) order.push(`${tier}|${np}`);
console.log('\n================  STATION-SWAP A/B  (Brewhouse<->Cellar grid swap)  ================');
console.log('cell            ver  | games err | rounds(avg/range) inBand%  clock% | winner(avg/range)  allAvg | P1%  spread  ties');
for (const tn of order) {
  for (const tag of ['base', 'swap']) {
    const c = cells[`${tag}|${tn}`]; if (!c) continue;
    const g = c.games || 1; const ss = seatSpread(c);
    const label = `${c.tier.toUpperCase()} ${c.np}p`.padEnd(15);
    console.log(`${label} ${tag.padEnd(4)} | ${String(c.games).padStart(5)} ${String(c.errors).padStart(3)} | ` +
      `${fmt(c.roundSum / g).padStart(4)} (${c.roundMin}-${c.roundMax})   ${pct(c.inBand, g).padStart(6)}  ${pct(c.clock, g).padStart(6)} | ` +
      `${fmt(c.winnerSum / g).padStart(5)} (${c.winnerMin}-${c.winnerMax})  ${fmt(c.allSum / (c.allN || 1)).padStart(5)} | ` +
      `${fmt(ss.p1).padStart(4)} ${fmt(ss.spread).padStart(5)}  ${c.ties}`);
  }
  console.log('  ' + '-'.repeat(100));
}
// quick deltas
console.log('\nDELTAS (swap - base):  rounds | inBand% | clock% | winnerAvg');
for (const tn of order) {
  const b = cells[`base|${tn}`], s = cells[`swap|${tn}`]; if (!b || !s) continue;
  const bg = b.games || 1, sg = s.games || 1;
  const d = (a, c) => (a >= 0 ? '+' : '') + fmt(a, c);
  console.log(`${tn.toUpperCase().replace('|', ' ').padEnd(8)}  ` +
    `${d(s.roundSum / sg - b.roundSum / bg)}  | ${d(100 * s.inBand / sg - 100 * b.inBand / bg)}  | ` +
    `${d(100 * s.clock / sg - 100 * b.clock / bg)}  | ${d(s.winnerSum / sg - b.winnerSum / bg)}`);
}
console.log('');
