// V3-CORPUS MATRIX — the first strong-play corpus on v3.0-A.1 (KEY hanse-v3a-v2): 162 games,
// 54 per player count in three cohorts (per the designer's ask, 2026-07-11):
//   gg — GM-vs-GM head-to-heads (every seat a Guildmaster)          18/count
//   cc — CM-vs-CM head-to-heads (every seat a Cellarmaster)         18/count
//   mx — mixed tables (CM + GM + trader personas)                   18/count
// Seeds are disjoint from every prior corpus (v94 pbp 211–220/…, recheck-v94 221–260/…):
// here 2p 261–314 · 3p 361–414 · 4p 461–514.
// Emits 18 SHARD files of 9 games each into playtests/logs/v3-corpus/. The MC tiers are
// time-budgeted, so shards are grouped to run AT MOST 3 CONCURRENTLY (4 cores — one core
// spare keeps the per-decision budgets honest); every game in the corpus runs under the same
// contention regime, so within-corpus comparisons stay fair.
//   Run: see the printed batch plan (or playtests/v3-corpus-run.sh).
// Then: node playtests/v3-analysis.js
'use strict';
const fs = require('fs');
const path = require('path');

const T = p => ({ name: 'Trader' + p[0].toUpperCase(), ai: { tier: 'trader', persona: p } });
const G = n => ({ name: 'Guild' + (n || ''), ai: { tier: 'guildmaster', persona: null } });
const C = n => ({ name: 'Cellar' + (n || ''), ai: { tier: 'cellarmaster', persona: null } });
const PERS = ['volume', 'prestige', 'majority'];
let pi = 0;
const nextT = () => T(PERS[pi++ % PERS.length]);

const GG = { 2: () => [G(), G(2)], 3: () => [G(), G(2), G(3)], 4: () => [G(), G(2), G(3), G(4)] };
const CC = { 2: () => [C(), C(2)], 3: () => [C(), C(2), C(3)], 4: () => [C(), C(2), C(3), C(4)] };
// mixed templates (cycled): always ≥1 CM and ≥1 GM; traders fill the rest (seat order rotates)
const MX = {
  2: [() => [C(), G()], () => [G(), C()], () => [C(), nextT()], () => [G(), nextT()],
      () => [nextT(), C()], () => [nextT(), G()]],
  3: [() => [C(), G(), nextT()], () => [G(), nextT(), C()], () => [nextT(), C(), G()],
      () => [C(), G(), G(2)], () => [G(), C(), C(2)], () => [C(), nextT(), G()]],
  4: [() => [C(), G(), nextT(), nextT()], () => [G(), C(), G(2), nextT()], () => [nextT(), C(), G(), C(2)],
      () => [C(), G(2), G(), nextT()], () => [G(), nextT(), C(), C(2)], () => [nextT(), G(), nextT(), C()]],
};
const SEED0 = { 2: 261, 3: 361, 4: 461 };
const PER = 18;   // games per cohort per count

const OUTDIR = path.join(__dirname, 'logs', 'v3-corpus');
fs.mkdirSync(OUTDIR, { recursive: true });

const shards = [];   // {file, heavy} — heavy = CM-seat count, for batch planning
for (const n of [2, 3, 4]) {
  let seed = SEED0[n];
  const mk = (cohort, i) => {
    const seats = cohort === 'gg' ? GG[n]() : cohort === 'cc' ? CC[n]() : MX[n][i % MX[n].length]();
    return { id: `${n}p-${cohort}-${i + 1}`, seed: seed++, seats };
  };
  for (const cohort of ['gg', 'cc', 'mx']) {
    const games = [];
    for (let i = 0; i < PER; i++) games.push(mk(cohort, i));
    for (const [half, slice] of [['A', games.slice(0, 9)], ['B', games.slice(9)]]) {
      const file = path.join(OUTDIR, `matrix-${n}p-${cohort}${half}.json`);
      fs.writeFileSync(file, JSON.stringify(slice, null, 1) + '\n');
      const cmSeats = slice.reduce((a, g) => a + g.seats.filter(s => s.ai.tier === 'cellarmaster').length, 0);
      shards.push({ name: `${n}p-${cohort}${half}`, file: path.relative(process.cwd(), file), heavy: cmSeats * n });
    }
  }
}
// batch plan: 6 batches × 3 shards, heaviest spread across batches (sort desc, deal round-robin)
shards.sort((a, b) => b.heavy - a.heavy);
const batches = [[], [], [], [], [], []];
shards.forEach((s, i) => batches[i % 6].push(s));
console.log(`${shards.length} shards written to playtests/logs/v3-corpus/ (${PER * 9} games)`);
console.log('batch plan (run each line as 3 parallel processes; lines in series):');
batches.forEach((b, i) => console.log(`  batch ${i + 1}: ${b.map(s => s.name).join('  ')}`));
fs.writeFileSync(path.join(OUTDIR, 'batches.json'), JSON.stringify(batches.map(b => b.map(s => s.name)), null, 1) + '\n');
