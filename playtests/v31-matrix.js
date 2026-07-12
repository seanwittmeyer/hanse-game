// V31-PRESSURE MATRIX — the v3.1 "One Row" pressure test (designer's ask, 2026-07-12): does the
// game hold against the CHARTER-PUMP RACER (the trader persona modeled on the winning human line:
// author a kontor charter early · pump cheap fast casks through it · race the clock), and how does
// the whole AI field vary? 126 games, 42 per player count, five cohorts:
//   rc — racer vs Cellarmaster(s)        8/count   (the headline: can the arch-nemesis stop the line?)
//   rg — racer vs Guildmaster(s)         6/count
//   rt — racer vs the other personas     6/count   (volume / prestige / majority tables)
//   cc — CM-vs-CM                        8/count   (the sharp-meta baseline under v3.1)
//   mx — mixed CM + GM + racer + trader 14/count
// Seeds are disjoint from every prior corpus: 2p 561+ · 3p 661+ · 4p 761+.
// Emits 18 shard files (7 games each) into playtests/logs/v31-pressure/ + a 6×3 batch plan.
//   Run: bash playtests/v31-pressure-run.sh   Then: DIR=v31-pressure node playtests/v3-analysis.js
'use strict';
const fs = require('fs');
const path = require('path');

const T = p => ({ name: 'Trader' + p[0].toUpperCase() + (p === 'racer' ? 'acer' : ''), ai: { tier: 'trader', persona: p } });
const R = () => ({ name: 'Racer', ai: { tier: 'trader', persona: 'racer' } });
const G = n => ({ name: 'Guild' + (n || ''), ai: { tier: 'guildmaster', persona: null } });
const C = n => ({ name: 'Cellar' + (n || ''), ai: { tier: 'cellarmaster', persona: null } });
const PERS = ['volume', 'prestige', 'majority'];
let pi = 0;
const nextT = () => T(PERS[pi++ % PERS.length]);
const rot = (arr, k) => arr.map((_, i) => arr[(i + k) % arr.length]);

const MK = {
  rc: n => k => rot([R()].concat(Array.from({ length: n - 1 }, (_, i) => C(i ? i + 1 : ''))), k % n),
  rg: n => k => rot([R()].concat(Array.from({ length: n - 1 }, (_, i) => G(i ? i + 1 : ''))), k % n),
  rt: n => k => rot([R()].concat(Array.from({ length: n - 1 }, () => nextT())), k % n),
  cc: n => k => rot(Array.from({ length: n }, (_, i) => C(i ? i + 1 : '')), k % n),
  mx: n => k => {
    const pool = n === 2 ? [[C(), R()], [R(), G()], [C(), nextT()], [G(), R()], [R(), C()], [nextT(), R()], [C(), G()]]
      : n === 3 ? [[C(), R(), G()], [R(), C(), nextT()], [G(), R(), C()], [C(), nextT(), R()], [R(), G(), C()], [nextT(), C(), R()], [C(), G(), R()]]
      : [[C(), R(), G(), nextT()], [R(), C(), nextT(), G()], [G(), nextT(), C(), R()], [C(), R(), C(2), G()], [R(), G(), nextT(), C()], [nextT(), C(), R(), G()], [G(), C(), R(), nextT()]];
    return pool[k % pool.length];
  },
};
const N_GAMES = { rc: 8, rg: 6, rt: 6, cc: 8, mx: 14 };
const SEED0 = { 2: 561, 3: 661, 4: 761 };

const OUTDIR = path.join(__dirname, 'logs', 'v31-pressure');
fs.mkdirSync(OUTDIR, { recursive: true });

const shards = [];
for (const n of [2, 3, 4]) {
  let seed = SEED0[n];
  const games = [];
  for (const cohort of ['rc', 'rg', 'rt', 'cc', 'mx']) {
    const mk = MK[cohort](n);
    for (let i = 0; i < N_GAMES[cohort]; i++) games.push({ id: `${n}p-${cohort}-${i + 1}`, seed: seed++, seats: mk(i) });
  }
  // 42 games/count → 6 shards of 7
  for (let sh = 0; sh < 6; sh++) {
    const slice = games.slice(sh * 7, sh * 7 + 7);
    const file = path.join(OUTDIR, `matrix-${n}p-${sh + 1}.json`);
    fs.writeFileSync(file, JSON.stringify(slice, null, 1) + '\n');
    const heavy = slice.reduce((a, g) => a + g.seats.filter(s => s.ai.tier === 'cellarmaster').length, 0) * n;
    shards.push({ name: `${n}p-${sh + 1}`, file: path.relative(process.cwd(), file), heavy });
  }
}
shards.sort((a, b) => b.heavy - a.heavy);
const batches = Array.from({ length: 6 }, () => []);
shards.forEach((s, i) => batches[i % 6].push(s));
console.log('v31-pressure: 126 games in 18 shards → ' + OUTDIR);
console.log('batch plan (6 serial batches × 3 parallel):');
batches.forEach((b, i) => console.log('  batch ' + (i + 1) + ': ' + b.map(s => s.name + ' (heavy ' + s.heavy + ')').join(' · ')));
fs.writeFileSync(path.join(OUTDIR, 'batches.json'), JSON.stringify(batches.map(b => b.map(s => s.file)), null, 1));
