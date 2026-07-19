// RECHECK-ANALYSIS — tests the v3-thoughts findings against a narrate.js corpus.
// Usage: DIR=recheck-v94 node playtests/recheck-analysis.js
// Reads playtests/logs/<DIR>/pbp-*.log and reports, per player count and vs the v94 baseline:
//   end triggers (clock vs ceiling) · tick composition (sails/charters/enshrines) · second-act
//   starvation (last multi-cask sail round, sails per half) · winner lane composition · bonfire
//   deliveries (Q4/Q5 sold at 1★) · Bergen contest · deploy-locks · stranded-hull signals ·
//   Floor usage · overbuild churn (rents, boxed tiles, deck-empty events).
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'logs', process.env.DIR || 'recheck-v94');
const files = fs.readdirSync(DIR).filter(f => /^pbp-\d+p-\d+\.log$/.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const G = [];
for (const f of files) {
  const txt = fs.readFileSync(path.join(DIR, f), 'utf8');
  const lines = txt.split('\n');
  const g = { id: f.replace(/^pbp-|\.log$/g, ''), n: +f.match(/^pbp-(\d)p/)[1] };
  const fin = txt.match(/FINAL — round (\d+) · sailed (\d+)\/(\d+) · ended by (\w+)/);
  if (!fin) { g.err = true; G.push(g); continue; }
  g.rounds = +fin[1]; g.sailed = +fin[2]; g.cap = +fin[3]; g.end = fin[4];

  // per-round event tracking
  let round = 1;
  g.sailRounds = []; g.charterRounds = []; g.enshrineRounds = [];
  let noSlot = 0, noLoad = 0, floorTurns = 0, deckEmpty = 0;
  for (const L of lines) {
    const rh = L.match(/^== R(\d+) ·/); if (rh) { round = +rh[1]; continue; }
    if (/sails to/.test(L)) g.sailRounds.push(round);
    if (/charters a/.test(L)) g.charterRounds.push(round);
    if (/enshrines/.test(L)) g.enshrineRounds.push(round);
    if (/no open slot/.test(L)) noSlot++;
    if (/nothing eligible to load/.test(L)) noLoad++;
    if (/works the .*Floor/.test(L)) floorTurns++;
    if (/Building display is empty/.test(L)) deckEmpty++;
  }
  g.noSlot = noSlot; g.noLoad = noLoad; g.floorTurns = floorTurns; g.deckEmpty = deckEmpty;
  g.rent = (txt.match(/ground rent to overbuild/g) || []).length;
  g.boxed = (txt.match(/returned to the box \(/g) || []).length;
  g.spoil = (txt.match(/has soured/g) || []).length;

  // second act: last sail round, sails per half
  const half = g.rounds / 2;
  g.lastSail = g.sailRounds.length ? Math.max(...g.sailRounds) : 0;
  g.sailsH1 = g.sailRounds.filter(r => r <= half).length;
  g.sailsH2 = g.sailRounds.filter(r => r > half).length;

  // digest: winner + all seats
  const seats = [];
  const re = /^(WINNER|   #\d+)\s+(\S+) \[([^\]]+)\] — TOTAL (\d+)\s+\(deliveries (\d+) · majorities (\d+) · flight (\d+) · floor (\d+)\)/gm;
  let m; while ((m = re.exec(txt))) seats.push({ win: m[1] === 'WINNER', name: m[2], tier: m[3], total: +m[4], dlv: +m[5], maj: +m[6], flt: +m[7], floor: +m[8] });
  g.seats = seats; g.winner = seats.find(s => s.win);

  // bonfires: premium casks delivered for chaff (Q4/Q5 = 1★ or 2★ at a kontor line in the digest)
  g.bonfire = (txt.match(/Q[45]=1\b/g) || []).length;
  // Hall usage from digest lines "The Hall: ..."
  g.hallCasks = (txt.match(/^\s+The Hall: (.*)$/gm) || []).reduce((s, l) => s + l.split(',').length, 0);
  // Bergen contest: how many players hold Bergen majority shares at end
  const bm = txt.match(/Bergen\[([^\]]*)\]/);
  g.bergenHolders = bm && bm[1] !== 'none' ? bm[1].trim().split(/\s+/).length : 0;
  g.bergenSole = g.bergenHolders === 1;
  G.push(g);
}

const avg = (a, k) => (a.reduce((s, g) => s + (typeof k === 'function' ? k(g) : (+g[k] || 0)), 0) / (a.length || 1));
const f1 = x => x.toFixed(1);
const pct = (a, pred) => `${a.filter(pred).length}/${a.length}`;

// v94 baseline (REVIEW-NOTES-v94.md pbp-stats block, 10 games per count)
const BASE = {
  2: { sails: 3.7, charters: 0.4, enshrines: null, rounds: null },
  3: { sails: 5.5, charters: 1.3, enshrines: null, rounds: null },
  4: { sails: 6.5, charters: 1.4, enshrines: null, rounds: null },
  endClock: '26/30', note: 'v94 corpus: 4/30 round-ceiling endings, all MC-heavy tables',
};

console.log(`recheck corpus: ${G.length} games from ${DIR}`);
const errs = G.filter(g => g.err); if (errs.length) console.log(`!! parse errors: ${errs.map(g => g.id).join(', ')}`);

for (const n of [2, 3, 4]) {
  const a = G.filter(g => g.n === n && !g.err);
  if (!a.length) continue;
  console.log(`\n================ ${n}p (${a.length} games) ================`);
  console.log(`rounds avg ${f1(avg(a, 'rounds'))} · in 12-25 band ${pct(a, g => g.rounds >= 12 && g.rounds <= 25)} · ended by CLOCK ${pct(a, g => g.end === 'CLOCK')} (v94 baseline overall ${BASE.endClock})`);
  console.log(`ticks/game: sails ${f1(avg(a, g => g.sailRounds.length))} (v94 ${BASE[n].sails}) · charters ${f1(avg(a, g => g.charterRounds.length))} (v94 ${BASE[n].charters}) · enshrines ${f1(avg(a, g => g.enshrineRounds.length))}`);
  const tickTot = avg(a, g => g.sailRounds.length + g.charterRounds.length + g.enshrineRounds.length);
  console.log(`tick composition: sails ${f1(100 * avg(a, g => g.sailRounds.length) / tickTot)}% · charters ${f1(100 * avg(a, g => g.charterRounds.length) / tickTot)}% · enshrines ${f1(100 * avg(a, g => g.enshrineRounds.length) / tickTot)}%`);
  console.log(`second act: sails H1 ${f1(avg(a, 'sailsH1'))} vs H2 ${f1(avg(a, 'sailsH2'))} · last-sail round ${f1(avg(a, 'lastSail'))} of ${f1(avg(a, 'rounds'))} · games with NO sail in 2nd half ${pct(a, g => g.sailsH2 === 0)}`);
  console.log(`jam signals: 'no open slot' ${f1(avg(a, 'noSlot'))}/game · 'nothing eligible to load' ${f1(avg(a, 'noLoad'))}/game · deck-empty events ${f1(avg(a, 'deckEmpty'))}`);
  console.log(`churn: rents ${f1(avg(a, 'rent'))} · boxed tiles ${f1(avg(a, 'boxed'))} · spoilage ${f1(avg(a, 'spoil'))} · floor turns ${f1(avg(a, 'floorTurns'))}`);
  console.log(`bonfires (Q4/Q5 sold at 1★): ${f1(avg(a, 'bonfire'))}/game · games with ≥1 ${pct(a, g => g.bonfire > 0)}`);
  console.log(`Bergen: sole-holder in ${pct(a, g => g.bergenSole)} · uncontested(≤1 holder) avg holders ${f1(avg(a, 'bergenHolders'))}`);
  const w = a.map(g => g.winner).filter(Boolean);
  console.log(`winners: avg TOTAL ${f1(avg(w, 'total'))} — composition dlv ${f1(100 * avg(w, 'dlv') / avg(w, 'total'))}% · maj ${f1(100 * avg(w, 'maj') / avg(w, 'total'))}% · flight ${f1(100 * avg(w, 'flt') / avg(w, 'total'))}% · floor ${f1(100 * avg(w, 'floor') / avg(w, 'total'))}%`);
  console.log(`winners with flight ≥9: ${pct(a, g => g.winner && g.winner.flt >= 9)} · winners with maj ≥ half their total: ${pct(a, g => g.winner && g.winner.maj >= g.winner.total / 2)}`);
  const tierWins = {};
  w.forEach(s => { tierWins[s.tier] = (tierWins[s.tier] || 0) + 1 });
  console.log(`winner tiers: ${Object.entries(tierWins).map(([t, c]) => `${t} ${c}`).join(' · ')}`);
}

// cross-count flags for the qualitative read
console.log('\n================ flag list (games worth reading) ================');
for (const g of G.filter(g => !g.err)) {
  const flags = [];
  if (g.end !== 'CLOCK') flags.push('CEILING');
  if (g.sailsH2 === 0 && g.sailRounds.length) flags.push('NO-H2-SAIL');
  if (g.noSlot >= 5) flags.push(`no-slot×${g.noSlot}`);
  if (g.bonfire >= 2) flags.push(`bonfire×${g.bonfire}`);
  if (g.boxed >= 4) flags.push(`boxed×${g.boxed}`);
  if (g.floorTurns >= 15) flags.push(`floor×${g.floorTurns}`);
  if (g.winner && g.winner.maj >= g.winner.total / 2) flags.push('MAJ-WIN');
  if (flags.length) console.log(`  ${g.id.padEnd(6)} ${flags.join(' · ')}`);
}
