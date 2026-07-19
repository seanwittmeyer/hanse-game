// V3-ANALYSIS — the strong-play read on a v3.0-A narrate.js corpus (playtests/logs/v3-corpus/).
// Usage: DIR=v3-corpus node playtests/v3-analysis.js
// Reports per player count AND per cohort (gg = GM-vs-GM · cc = CM-vs-CM · mx = mixed), on the
// v3 grammar: end triggers · tick composition (sails / kontor dispatches / Hall enshrines) ·
// pace/second act · the Hall shelves (which shelves + honors get claimed) · over-deploy (tap-outs
// / spoilage) · dockside pickups · stay-home Floor turns · Flight unlocks (vessel vs Specialist
// row) · Specialist buys · churn (rents/boxed) · winner lane composition · GM-vs-CM head-to-head
// in mixed games · seat fairness.
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'logs', process.env.DIR || 'v3-corpus');
const files = fs.readdirSync(DIR).filter(f => /^pbp-\dp-\w+-\d+\.log$/.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const G = [];
for (const f of files) {
  const txt = fs.readFileSync(path.join(DIR, f), 'utf8');
  const m0 = f.match(/^pbp-(\d)p-(\w+)-(\d+)\.log$/);
  const g = { id: f.replace(/^pbp-|\.log$/g, ''), n: +m0[1], cohort: m0[2] };
  const fin = txt.match(/FINAL — round (\d+) · sailed (\d+)\/(\d+) · ended by (\w+)/);
  if (!fin) { g.err = true; G.push(g); continue; }
  g.rounds = +fin[1]; g.sailed = +fin[2]; g.cap = +fin[3]; g.end = fin[4];

  let round = 1;
  g.sailRounds = []; g.chRounds = []; g.enRounds = [];
  let floorTurns = 0, noSlot = 0, deckEmpty = 0;
  for (const L of txt.split('\n')) {
    const rh = L.match(/^== R(\d+) ·/); if (rh) { round = +rh[1]; continue; }
    if (/sails to/.test(L)) g.sailRounds.push(round);
    if (/dispatches .* by charter/.test(L)) g.chRounds.push(round);
    if (/enshrines .* on /.test(L)) g.enRounds.push(round);
    if (/stays home and works the/.test(L)) floorTurns++;
    if (/no open slot/.test(L)) noSlot++;
    if (/display is empty/.test(L)) deckEmpty++;
  }
  g.floorTurns = floorTurns; g.noSlot = noSlot; g.deckEmpty = deckEmpty;
  g.tapouts = (txt.match(/tapped on the way out/g) || []).length;
  g.spoil = (txt.match(/has soured/g) || []).length;
  g.pickups = (txt.match(/dockside pickup/g) || []).length;
  g.rent = (txt.match(/pays the ground rent/g) || []).length;
  g.boxed = (txt.match(/returned to the box/g) || []).length;
  g.unlV = (txt.match(/opens Floor slot/g) || []).length;   // v3.1 ONE ROW: unlocks open the next cover (no rows)
  g.unlS = 0;
  g.specBuys = (txt.match(/fits the .* Specialist/g) || []).length;
  g.dieSets = (txt.match(/the die is set to/g) || []).length;
  g.overflow = (txt.match(/shelves are full — open floor/g) || []).length;
  // which shelves get claimed
  g.shelves = { Common: 0, Long: 0, 'Masters': 0, High: 0 };
  for (const m of txt.matchAll(/enshrines .* on the ([A-Za-z’']+)[ ’]/g)) {
    const k = m[1].startsWith('Master') ? 'Masters' : m[1].replace(/’.*/, '');
    if (g.shelves[k] != null) g.shelves[k]++;
  }
  // second act
  const half = g.rounds / 2;
  g.lastSail = g.sailRounds.length ? Math.max(...g.sailRounds) : 0;
  g.sailsH2 = g.sailRounds.filter(r => r > half).length;

  // digest seats
  const seats = [];
  const re = /^(WINNER|   #\d+)\s+(\S+) \[([^\]/]+)[^\]]*\] — TOTAL (\d+)\s+\(deliveries (\d+) · majorities (\d+) · flight (\d+)/gm;
  let m; while ((m = re.exec(txt))) seats.push({ win: m[1] === 'WINNER', name: m[2], tier: m[3], total: +m[4], dlv: +m[5], maj: +m[6], flt: +m[7] });
  // seat ORDER (P-seat) from the opening "seats:" line
  const sl = txt.match(/^seats: (.*)$/m);
  g.seatOrder = sl ? sl[1].split(' · ').map(x => x.split(' ')[0]) : [];
  g.seats = seats; g.winner = seats.find(s => s.win);
  // Hall casks per seat from digest
  g.hallCasks = (txt.match(/^\s+The Hall: (.*)$/gm) || []).reduce((s, l) => s + l.split(',').length, 0);
  G.push(g);
}

const avg = (a, k) => (a.reduce((s, g) => s + (typeof k === 'function' ? k(g) : (+g[k] || 0)), 0) / (a.length || 1));
const f1 = x => x.toFixed(1);
const pct = (a, pred) => `${a.filter(pred).length}/${a.length}`;

console.log(`v3-corpus: ${G.length} games from ${DIR} (cohorts: gg=GM-vs-GM · cc=CM-vs-CM · mx=mixed)`);
const errs = G.filter(g => g.err); if (errs.length) console.log(`!! parse errors: ${errs.map(g => g.id).join(', ')}`);

for (const n of [2, 3, 4]) {
  const all = G.filter(g => g.n === n && !g.err);
  if (!all.length) continue;
  console.log(`\n================ ${n}p (${all.length} games) ================`);
  for (const co of ['gg', 'cc', 'mx', null]) {
    const a = co ? all.filter(g => g.cohort === co) : all;
    const tag = co ? co.toUpperCase() : 'ALL';
    if (!a.length) continue;
    const ticks = avg(a, g => g.sailRounds.length + g.chRounds.length + g.enRounds.length);
    console.log(`-- ${tag} (${a.length}) rounds ${f1(avg(a, 'rounds'))} · CLOCK ${pct(a, g => g.end === 'CLOCK')} · ticks: sail ${f1(avg(a, g => g.sailRounds.length))} / disp ${f1(avg(a, g => g.chRounds.length))} / enshrine ${f1(avg(a, g => g.enRounds.length))}`
      + ` · sailsH2 ${f1(avg(a, 'sailsH2'))} · floor ${f1(avg(a, 'floorTurns'))} · tapout ${f1(avg(a, 'tapouts'))} · spoil ${f1(avg(a, 'spoil'))} · pickup ${f1(avg(a, 'pickups'))}`
      + ` · unlocks V/S ${f1(avg(a, 'unlV'))}/${f1(avg(a, 'unlS'))} · spec ${f1(avg(a, 'specBuys'))} · rent ${f1(avg(a, 'rent'))} · die-sets ${f1(avg(a, 'dieSets'))}`);
  }
  const a = all;
  const sh = { Common: avg(a, g => g.shelves.Common), Long: avg(a, g => g.shelves.Long), Masters: avg(a, g => g.shelves.Masters), High: avg(a, g => g.shelves.High) };
  console.log(`Hall shelves claimed/game: Common ${f1(sh.Common)} · Long ${f1(sh.Long)} · Masters ${f1(sh.Masters)} · High ${f1(sh.High)} · overflow ${f1(avg(a, 'overflow'))}`);
  const w = a.map(g => g.winner).filter(Boolean);
  console.log(`winners: avg TOTAL ${f1(avg(w, 'total'))} (min ${Math.min(...w.map(x => x.total))} max ${Math.max(...w.map(x => x.total))}) — lanes dlv ${f1(100 * avg(w, 'dlv') / avg(w, 'total'))}% · maj ${f1(100 * avg(w, 'maj') / avg(w, 'total'))}% · flight ${f1(100 * avg(w, 'flt') / avg(w, 'total'))}%`);
  // margins
  const margins = a.filter(g => g.seats.length > 1).map(g => { const t = g.seats.map(s => s.total).sort((x, y) => y - x); return t[0] - t[1]; });
  console.log(`win margin avg ${f1(margins.reduce((x, y) => x + y, 0) / margins.length)} · ties ${margins.filter(m => m === 0).length}`);
  // seat fairness (P1..Pn win rate) per cohort head-to-heads
  for (const co of ['gg', 'cc']) {
    const b = all.filter(g => g.cohort === co && g.winner);
    if (!b.length) continue;
    const seatWins = Array(n).fill(0);
    b.forEach(g => { const i = g.seatOrder.indexOf(g.winner.name); if (i >= 0) seatWins[i]++; });
    console.log(`${co.toUpperCase()} seat win-rate: ${seatWins.map((wn, i) => `P${i + 1} ${Math.round(100 * wn / b.length)}%`).join(' · ')}`);
  }
}

// GM vs CM head-to-head across every mixed game containing both
const mx = G.filter(g => !g.err && g.cohort === 'mx' && g.winner);
const both = mx.filter(g => g.seats.some(s => s.tier === 'guildmaster') && g.seats.some(s => s.tier === 'cellarmaster'));
const cmWins = both.filter(g => g.winner.tier === 'cellarmaster').length;
const gmWins = both.filter(g => g.winner.tier === 'guildmaster').length;
const trWins = both.filter(g => g.winner.tier === 'trader').length;
console.log(`\n================ tiers (mixed games with both MC tiers: ${both.length}) ================`);
console.log(`winner tier: CM ${cmWins} · GM ${gmWins} · trader ${trWins}`);
for (const t of ['cellarmaster', 'guildmaster', 'trader']) {
  const ss = mx.flatMap(g => g.seats.filter(s => s.tier === t));
  if (ss.length) console.log(`${t.padEnd(12)} avg score ${f1(avg(ss, 'total'))} · per-seat win ${Math.round(100 * ss.filter(s => s.win).length / ss.length)}% (n=${ss.length})`);
}

// flags for qualitative reads
console.log('\n================ flag list (games worth reading) ================');
for (const g of G.filter(g => !g.err)) {
  const flags = [];
  if (g.end !== 'CLOCK') flags.push('CEILING');
  if (g.sailsH2 === 0 && g.sailRounds.length) flags.push('NO-H2-SAIL');
  if (g.noSlot >= 6) flags.push(`no-slot×${g.noSlot}`);
  if (g.floorTurns >= 18) flags.push(`floor×${g.floorTurns}`);
  if (g.spoil >= 4) flags.push(`spoil×${g.spoil}`);
  if (g.winner && g.winner.maj >= g.winner.total / 2) flags.push('MAJ-WIN');
  if (g.winner && g.hallCasks >= 5) flags.push(`hall×${g.hallCasks}`);
  if (flags.length) console.log(`  ${g.id.padEnd(10)} ${flags.join(' · ')}`);
}
