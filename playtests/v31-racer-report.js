// V31-RACER-REPORT — the pressure-test read over playtests/logs/v31-pressure/: how the charter-pump
// RACER persona fares against every tier, plus per-seat variety stats (Floor turns, authoring,
// dispatch ticks) by tier/persona. Complements DIR=v31-pressure v3-analysis.js (corpus grammar) and
// v3-behavior.js (openings/winner shipping). Usage: node playtests/v31-racer-report.js
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'logs', process.env.DIR || 'v31-pressure');

const files = fs.readdirSync(DIR).filter(f => /^pbp-.*\.log$/.test(f));
const G = [];
for (const f of files) {
  const txt = fs.readFileSync(path.join(DIR, f), 'utf8');
  const m = f.match(/^pbp-(\d)p-([a-z]+)-(\d+)\.log$/); if (!m) continue;
  const g = { n: +m[1], cohort: m[2], id: f, txt };
  const seats = [...txt.matchAll(/^(?:WINNER| {3}#\d+) +(\S+) \[(\w+)(?:\/(\w+))?\] — TOTAL (\d+)/gm)]
    .map((x, i) => ({ name: x[1], tier: x[2], persona: x[3] || null, total: +x[4], rank: i }));
  if (!seats.length) continue;
  g.seats = seats;
  g.rounds = (txt.match(/rounds (\d+)/) || txt.match(/== R(\d+)[^=]*$/m) || [0, 0])[1];
  G.push(g);
}
console.log(`v31-pressure racer report — ${G.length} games\n`);

// ---- 1 · the racer vs the field, by cohort × count ----
console.log('== RACER performance (win rate = racer seats that finished #1) ==');
for (const co of ['rc', 'rg', 'rt', 'mx']) {
  for (const n of [2, 3, 4]) {
    const gs = G.filter(g => g.cohort === co && g.n === n && g.seats.some(s => s.persona === 'racer'));
    if (!gs.length) continue;
    let wins = 0, rsc = 0, fsc = 0, rn = 0, fn = 0;
    gs.forEach(g => {
      g.seats.forEach(s => {
        if (s.persona === 'racer') { rsc += s.total; rn++; if (s.rank === 0) wins++; }
        else { fsc += s.total; fn++; }
      });
    });
    console.log(`  ${co} ${n}p: games ${gs.length} · racer wins ${wins}/${gs.length} (${(100 * wins / gs.length).toFixed(0)}%) · racer avg ${(rsc / rn).toFixed(1)} vs field ${(fsc / fn).toFixed(1)}`);
  }
}

// ---- 2 · per-tier/persona seat stats across the WHOLE corpus ----
console.log('\n== per-seat variety (all games) ==');
const agg = {};
G.forEach(g => {
  // per-player behavior mined from the log text by player name
  g.seats.forEach(s => {
    const k = s.tier + (s.persona ? '/' + s.persona : '');
    const a = agg[k] = agg[k] || { seats: 0, wins: 0, sc: 0, floor: 0, buysPriv: 0, dieSets: 0, ensh: 0, kdisp: 0, brews: 0 };
    a.seats++; a.sc += s.total; if (s.rank === 0) a.wins++;
    const esc = s.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    a.floor += (g.txt.match(new RegExp('^' + esc + ' stays home', 'gm')) || []).length;
    a.buysPriv += (g.txt.match(new RegExp('^' + esc + ' buys ', 'gm')) || []).length;
    a.ensh += (g.txt.match(new RegExp('^' + esc + ' enshrines ', 'gm')) || []).length;
    a.kdisp += (g.txt.match(new RegExp('^' + esc + ' dispatches ', 'gm')) || []).length;
    a.brews += (g.txt.match(new RegExp('^' + esc + ' brews ', 'gm')) || []).length;
  });
});
Object.keys(agg).sort().forEach(k => {
  const a = agg[k];
  console.log(`  ${k.padEnd(18)} seats ${String(a.seats).padStart(3)} · win ${(100 * a.wins / a.seats).toFixed(0).padStart(3)}% · avg ${(a.sc / a.seats).toFixed(1).padStart(5)} · per game: floor ${(a.floor / a.seats).toFixed(1)} · buys ${(a.buysPriv / a.seats).toFixed(1)} · brews ${(a.brews / a.seats).toFixed(1)} · enshrine ${(a.ensh / a.seats).toFixed(1)} · k-dispatch ${(a.kdisp / a.seats).toFixed(1)}`);
});

// ---- 3 · head-to-head grids in the mixed cohort ----
console.log('\n== head-to-head (2p games only, any cohort) ==');
const h2h = {};
G.filter(g => g.n === 2).forEach(g => {
  const [a, b] = g.seats.slice().sort((x, y) => x.rank - y.rank);
  const key = t => t.tier + (t.persona ? '/' + t.persona : '');
  const k = [key(a), key(b)].sort().join('  vs  ');
  const rec = h2h[k] = h2h[k] || { n: 0, w: {} };
  rec.n++; rec.w[key(a)] = (rec.w[key(a)] || 0) + 1;
});
Object.keys(h2h).sort().forEach(k => {
  const r = h2h[k];
  const parts = Object.entries(r.w).map(([t, w]) => `${t} ${w}`).join(' · ');
  console.log(`  ${k}: n=${r.n} → ${parts}`);
});
