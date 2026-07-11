// RECHECK-V94 MATRIX — deterministic 120-game matrix (40 per player count) for the fresh-eyes
// re-check corpus: a CM/GM-heavy strong-play mix with a few traders mixed in (per the designer's
// ask, 2026-07-11). Seeds are disjoint from the v94 corpus (211–220/311–320/411–420): here
// 2p 221–260 · 3p 321–360 · 4p 421–460. Emits SIX shard files of 20 games each into
// playtests/logs/recheck-v94/ (run them SEQUENTIALLY — the MC tiers are time-budgeted, so
// concurrent shards weaken GM/CM play):
//   for m in 2pA 2pB 3pA 3pB 4pA 4pB; do
//     MATRIX=playtests/logs/recheck-v94/matrix-$m.json OUT=recheck-v94 node playtests/narrate.js
//   done
// Then: DIR=recheck-v94 node playtests/pbp-stats.js
'use strict';
const fs = require('fs');
const path = require('path');

const T = p => ({ name: 'Trader' + p[0].toUpperCase(), ai: { tier: 'trader', persona: p } });
const G = n => ({ name: 'Guild' + (n || ''), ai: { tier: 'guildmaster', persona: null } });
const C = n => ({ name: 'Cellar' + (n || ''), ai: { tier: 'cellarmaster', persona: null } });
const PERS = ['volume', 'prestige', 'majority'];
let pi = 0;
const nextT = () => T(PERS[pi++ % PERS.length]);

// ten-game seat templates per count (cycled 4x); ~30% trader games at 2p, 40% at 3p, 60% at 4p
// (mostly one trader per game — "a few traders mixed in"), the rest CM/GM head-to-heads.
const TEN = {
  2: [() => [C(), G()], () => [G(), C()], () => [C(), C(2)], () => [G(), G(2)], () => [C(), nextT()],
      () => [G(), nextT()], () => [C(), G()], () => [G(), C()], () => [nextT(), C()], () => [G(), C()]],
  3: [() => [C(), G(), C(2)], () => [G(), C(), G(2)], () => [C(), G(), nextT()], () => [G(), C(2), C()],
      () => [C(), nextT(), G()], () => [G(), G(2), C()], () => [C(), C(2), G()], () => [G(), C(), nextT()],
      () => [C(), G(), G(2)], () => [nextT(), C(), G()]],
  4: [() => [C(), G(), C(2), G(2)], () => [G(), C(), G(2), C(2)], () => [C(), G(), nextT(), G(2)],
      () => [G(), C(), C(2), nextT()], () => [C(), C(2), G(), G(2)], () => [G(), nextT(), C(), nextT()],
      () => [C(), G(), G(2), nextT()], () => [G(), C(2), C(), G(2)], () => [nextT(), C(), G(), C(2)],
      () => [C(), G(2), G(), nextT()]],
};
const SEED0 = { 2: 221, 3: 321, 4: 421 };

const OUTDIR = path.join(__dirname, 'logs', 'recheck-v94');
fs.mkdirSync(OUTDIR, { recursive: true });

for (const n of [2, 3, 4]) {
  const games = [];
  for (let i = 0; i < 40; i++) {
    games.push({ id: `${n}p-${i + 1}`, seed: SEED0[n] + i, seats: TEN[n][i % 10]() });
  }
  for (const [shard, slice] of [['A', games.slice(0, 20)], ['B', games.slice(20, 40)]]) {
    const file = path.join(OUTDIR, `matrix-${n}p${shard}.json`);
    fs.writeFileSync(file, JSON.stringify(slice, null, 1) + '\n');
    console.log(`${path.relative(process.cwd(), file)}: ${slice.length} games, seeds ${slice[0].seed}-${slice[slice.length - 1].seed}`);
  }
  const tally = { cellarmaster: 0, guildmaster: 0, trader: 0 };
  let traderGames = 0;
  games.forEach(g => { let t = 0; g.seats.forEach(s => { tally[s.ai.tier]++; if (s.ai.tier === 'trader') t++; }); if (t) traderGames++; });
  console.log(`  ${n}p seats: CM ${tally.cellarmaster} · GM ${tally.guildmaster} · trader ${tally.trader} (trader in ${traderGames}/40 games)`);
}
