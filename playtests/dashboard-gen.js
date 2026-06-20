// Dashboard data generator — refreshes the FAST sections of ../dashboard-data.js by running the
// canonical harnesses (persona oracle, FREE_IMP, turn-log) and parsing their output. The SLOW
// strong-AI sections (ladder, seat, climb) are kept as a static block below — update them after a
// matchup run (playtests/review/run-matchups.sh + combine-matchups.js).
//
// Usage:  node playtests/dashboard-gen.js [N]     (N = fast-sim games/count; default 800)
'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const N = parseInt(process.argv[2] || '800', 10);
const here = __dirname, root = path.join(here, '..');
const run = (cmd, env) => { process.stderr.write(`  · ${cmd}\n`); return execSync(cmd, { cwd: root, env: Object.assign({}, process.env, env), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); };
const COUNTS = ['2', '3', '4'];
const num = (s, re) => { const m = s.match(re); return m ? parseFloat(m[1]) : null; };
// body of a "=====  <hdr>  =====" section, between the header's trailing === and the next === header
const segFor = (text, hdrRe) => { const b = text.split(hdrRe)[1] || ''; return b.replace(/^[^=]*={6,}/, '').split(/={6,}/)[0]; };

// ---- 1. PERSONA ORACLE → lanes (win% + avg total) + winner totals ----
console.error('Running persona oracle (lanes/scores)…');
const persona = run(`node playtests/sim.js ${N}`, { PERSONAS: '1', CELLAR: '1' });
const lanes = { fair: { "2": 50, "3": 33.3, "4": 25 }, rows: ["prestige", "deep", "volume", "majority", "demand"], data: {} };
const scores = { winner: {}, range: {}, laneAvg: {} };
lanes.rows.forEach(k => { lanes.data[k] = {}; scores.laneAvg[k] = {}; });
COUNTS.forEach(n => {
  const seg = segFor(persona, new RegExp(`={6,}\\s+${n} PLAYERS`));
  scores.winner[n] = num(seg, /winner total score:\s+avg ([\d.]+)/);
  const mn = num(seg, /min (\d+)\s+max/), mx = num(seg, /max (\d+)/);
  scores.range[n] = (mn != null && mx != null) ? `${mn}–${mx}` : '';
  lanes.rows.forEach(lane => {
    const re = new RegExp(`${lane}\\s+win\\s+([\\d.]+)%\\s+score\\s+([\\d.]+)`);
    const m = seg.match(re);
    if (m) { lanes.data[lane][n] = parseFloat(m[1]); scores.laneAvg[lane][n] = parseFloat(m[2]); }
  });
});
lanes.finding = "Prestige (Hall) + Deep dominate heads-up (2p) and converge to fair at 4p. The contested-kontor lanes need a crowd to pay; the Hall is player-count-invariant.";
scores.finding = "All lanes score within a few points of each other — balance lives in win-rate, not ceiling. Prestige wins more with lower totals (low-variance). Scores peak at 3p.";

// ---- 2. FREE_IMP → improvements (Δ vs fair) ----
console.error('Running free-starting-improvement experiment…');
const imp = run(`node playtests/sim.js ${Math.max(N, 1200)}`, { FREE_IMP: '1' });
const improvements = { rows: ["hopgarden", "granary", "cellar", "lagering", "crane", "quay", "vessel"],
  label: { hopgarden: "Hop Garden", granary: "Granary", cellar: "Aging Cellar", lagering: "Lagering", crane: "Harbor Crane", quay: "Private Quay", vessel: "Extra Vessel" }, data: {} };
improvements.rows.forEach(k => improvements.data[k] = {});
COUNTS.forEach(n => {
  const seg = (imp.split(new RegExp(`-- ${n}p \\(fair`))[1] || '').split(/-- \dp \(fair|={6,}/)[0];
  improvements.rows.forEach(k => { const m = seg.match(new RegExp(`${k}\\s+win\\s+[\\d.]+%\\s+\\(([+-][\\d.]+) vs fair\\)`)); if (m) improvements.data[k][n] = parseFloat(m[1]); });
});
improvements.finding = "Hop Garden is the clear #1 at every count (the hops-led economy). Throughput perks (Crane/Quay/Vessel) score negative — the greedy bot can't pilot them. Even free, the best is only ~+10% → v1.7 made them cheaper + Cellar-bought.";

// ---- 3. TURN-LOG → feel ----
console.error('Running turn-by-turn feel analysis…');
const tl = run(`node playtests/turnlog.js 100`, { COUNTS: '2,3,4', TIERS: 'trader' });
const feel = { decisionsPerTurn: num(tl, /decisions\/turn avg ([\d.]+)/), roundsAvg: num(tl, /avg rounds ([\d.]+)/), skipPct: null, floorToll: {},
  decisionMix: [["stops", 33], ["cell (Market/Harbor)", 12], ["move", 8], ["line", 8], ["load", 5], ["deploy", 5], ["brew", 5], ["source", 5], ["age", 3], ["toll", 2], ["tap", 2]] };
COUNTS.forEach(n => {
  const seg = segFor(tl, new RegExp(`={6,}\\s+${n}p`));
  if (feel.skipPct == null) feel.skipPct = num(seg, /= ([\d.]+)% of decisions/);
  feel.floorToll[n] = { forks: num(seg, /\(([\d.]+)% of turns\)/), toll: num(seg, /toll-paid ([\d.]+)%/), floor: num(seg, /Floor-worked ([\d.]+)%/) };
});
// the searching Guildmaster's Floor-work rate at the fork (static — a slow GM turnlog run; refresh via TIERS=guildmaster)
feel.floorSearch = { label: "Guildmaster (search)", "2": 32, "3": 25, "4": 26 };
feel.finding = "Crisp & efficient: only ~2% of decisions are no-op skips. The Floor (alt-line) is a SUBTLE skill decision — the heuristic Trader pays the 1G toll 100% (never sees it), but the SEARCHING Guildmaster works the Floor 25–32% of the time at the fork. So it's a genuine board-reading choice greedy play (and many humans) under-use, not a dead lane.";

// ---- SLOW (strong-AI) sections — STATIC; update after a matchup-slate run ----
const SLOW = {
  ladder: { rows: [
      { name: "Cellarmaster vs Guildmaster", hi: "CM", "2": 63.3, "3": 47.8, "4": 30.8 },
      { name: "Cellarmaster vs Trader", hi: "CM", "2": 70.0, "3": 37.0, "4": 17.5 },
      { name: "Guildmaster vs Trader", hi: "GM", "2": 48.3, "3": 27.2, "4": 14.2 } ],
    finding: "CM > GM at every count. BUT the optimal STRATEGY flips: CM (deep) crushes the Trader 70% at 2p, yet LOSES at 4p — a volume rusher fills the clock before the deep climb matures. (GM throttled here.)" },
  seat: { before: { label: "v63 (with +1G seat comp)", "2": [33, 67], "3": [22, 35, 43], "4": [15, 40, 20, 25] },
    after: { label: "v64 (comp removed)", "2": [50, 50] },
    finding: "The +1G/later-seat comp OVER-corrected under strong play (P2 won ~67% at 2p). v1.7 removed it — GMvGM-2p went 33/67 → 50/50." },
  climb: { deliverRate: { q4plus: { "2": 6, "3": 20, "4": 23 }, q5: { "2": 15, "3": 17, "4": 21 } },
    timeline: [ { ev: "brew Q2", r: 1 }, { ev: "deliver Q2", r: 4 }, { ev: "brew Q3", r: 5 }, { ev: "full recipes", r: 10 }, { ev: "brew Q5", r: 11 }, { ev: "deliver Q5", r: 12 }, { ev: "game ends", r: 13 } ],
    finding: "Q5 delivers at median R12 in a ~13-round game — right at the buzzer. Only 15–21% of Trader games ever land a Q5: a committed, high-variance capstone, not a default." }
};

// ---- assemble + write ----
const KEY = (fs.readFileSync(path.join(root, 'play.html'), 'utf8').match(/hanse-hotseat-(v\d+)/) || [, 'v?'])[1];
const DASH = { meta: {
    version: process.env.DASH_VERSION || "v1.8 “Quality Pays”", key: KEY, date: new Date().toISOString().slice(0, 10),
    games: `~${(N * 3 * 2 / 1000).toFixed(0)}k fast (persona/free-imp) + turn-log feel + 900 strong-AI`,
    note: "Fast sections = persona oracle (committed-lane bots), regenerated by dashboard-gen.js. Strong-AI ladder ran at a throttled bulk budget. Flipped-building feature is bot-untestable." },
  lanes, scores, ladder: SLOW.ladder, seat: SLOW.seat, climb: SLOW.climb, improvements, feel };
const out = "// Brewhouses of the Hanse — simulation dashboard DATA (auto-generated by playtests/dashboard-gen.js).\n// Fast sections refresh on each run; SLOW strong-AI sections are static (update after a matchup slate).\nwindow.DASH = " + JSON.stringify(DASH, null, 2) + ";\n";
fs.writeFileSync(path.join(root, 'dashboard-data.js'), out);
console.error(`\n✓ wrote dashboard-data.js  (KEY ${KEY})`);
console.log(JSON.stringify({ lanes: lanes.data, winner: scores.winner, improvements: improvements.data, feel: { decisionsPerTurn: feel.decisionsPerTurn, skipPct: feel.skipPct, floorToll: feel.floorToll } }, null, 1));
