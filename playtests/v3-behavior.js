// V3-BEHAVIOR — the "how do players actually play" miner over a v3-corpus (playtests/logs/v3-corpus).
// Usage: DIR=v3-corpus node playtests/v3-behavior.js
// Reports: OPENINGS (turn-1 placements/lines, first acquisitions, first brews) · WINNER SHIPPING
// (how winners move casks: sails vs dispatches vs enshrines, destination mix, first-delivery
// timing, rival-loading) · BEER PERFORMANCE (per style: brews, deliveries, avg banked value,
// winner-vs-loser share) · QUALITY vs VOLUME (2p head-to-heads: who wins when the quality edge
// and the delivery-count edge point at different players).
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'logs', process.env.DIR || 'v3-corpus');
const files = fs.readdirSync(DIR).filter(f => /^pbp-\dp-\w+-\d+\.log$/.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const STYLE_Q = { Gruit: 1, Hopped: 2, Broyhan: 3, Keut: 3, Mumme: 4, Bock: 5, Gose: 2, Zerbster: 3, Duckstein: 2, Jopenbier: 6 };
const games = [];

for (const f of files) {
  const txt = fs.readFileSync(path.join(DIR, f), 'utf8');
  const m0 = f.match(/^pbp-(\d)p-(\w+)-(\d+)\.log$/);
  const g = { id: f.replace(/^pbp-|\.log$/g, ''), n: +m0[1], cohort: m0[2], seats: {} };
  const order = (txt.match(/^seats: (.*)$/m) || [, ''])[1].split(' · ').map(x => x.split(' ')[0]);
  order.forEach((nm, i) => g.seats[nm] = { name: nm, seat: i, brews: [], firstActs: [], deliv: [], ensh: [], disp: 0, rivalLoads: 0, floor: 0, place: null, line1: null, sourceT: 0, acquires: [], firstDelivR: null });
  g.exports = ((txt.match(/^exports dealt: (.*) · sailed-ships/m) || [, ''])[1].match(/Q\d (\w+)/g) || []).map(x => x.split(' ')[1]);

  let cur = null, round = 1, turnOfSeat = {};
  for (const L of txt.split('\n')) {
    const th = L.match(/^== R(\d+) · turn \d+ · (\S+) \[/);
    if (th) { round = +th[1]; cur = g.seats[th[2]]; turnOfSeat[th[2]] = (turnOfSeat[th[2]] || 0) + 1; continue; }
    if (!cur) continue;
    const myTurn = turnOfSeat[cur.name];
    let m;
    if ((m = L.match(/(\S+) places their worker at (\w+)/)) && g.seats[m[1]]) g.seats[m[1]].place = m[2];
    if (myTurn === 1 && (m = L.match(/activates (.+?) ·/))) cur.line1 = m[1];
    if ((m = L.match(/(\S+) brews (\w+)[^(]*\(Q\d/)) && g.seats[m[1]]) g.seats[m[1]].brews.push({ style: m[2], round });   // 'Hopped Beer'/'Gruit Ale' → first word
    if ((m = L.match(/(\S+) buys the (\w+) recipe/)) && g.seats[m[1]] && myTurn <= 3) g.seats[m[1]].acquires.push('recipe:' + m[2]);
    if ((m = L.match(/(\S+) buys (.+?) at the Market/)) && g.seats[m[1]] && myTurn <= 3) g.seats[m[1]].acquires.push('tile');
    if ((m = L.match(/(\S+) commissions the/)) && g.seats[m[1]] && myTurn <= 3) g.seats[m[1]].acquires.push('ship');
    if ((m = L.match(/(\S+) acquires a charter contract/)) && g.seats[m[1]] && myTurn <= 3) g.seats[m[1]].acquires.push('contract');
    if ((m = L.match(/(\S+) sources goods/)) && g.seats[m[1]] && myTurn <= 3) g.seats[m[1]].sourceT++;
    if ((m = L.match(/(\S+) stays home/)) && g.seats[m[1]]) g.seats[m[1]].floor++;
    if ((m = L.match(/(\S+) dispatches /)) && g.seats[m[1]]) { g.seats[m[1]].disp++; if (g.seats[m[1]].firstDelivR == null) g.seats[m[1]].firstDelivR = round; }
    if ((m = L.match(/(\S+) enshrines (\w+) Q(\d) on the ([A-Za-z’']+)/)) && g.seats[m[1]]) { g.seats[m[1]].ensh.push({ style: m[2], q: +m[3], shelf: m[4] }); if (g.seats[m[1]].firstDelivR == null) g.seats[m[1]].firstDelivR = round; }
    if ((m = L.match(/(\S+) takes a loader bonus/)) && g.seats[m[1]]) g.seats[m[1]].rivalLoads++;
    if (/sails to/.test(L) && cur.firstSailR == null) g.firstSailR = g.firstSailR || round;
  }
  // digest: totals + per-destination deliveries per seat
  const digRe = /^(WINNER|   #\d+)\s+(\S+) \[([^\]/]+)[^\]]*\] — TOTAL (\d+)\s+\(deliveries (\d+) · majorities (\d+) · flight (\d+)/gm;
  let dm, lastName = null; const digestOrder = [];
  while ((dm = digRe.exec(txt))) { const s = g.seats[dm[2]]; if (!s) continue; s.win = dm[1] === 'WINNER'; s.tier = dm[3]; s.total = +dm[4]; s.dlvPts = +dm[5]; s.majPts = +dm[6]; s.fltPts = +dm[7]; digestOrder.push(dm[2]); }
  // the per-dest lines follow each seat's digest row, indented "        Dest: Style Qq=v, ..."
  const lines = txt.split('\n'); let seatIdx = -1;
  for (const L of lines) {
    const hd = L.match(/^(?:WINNER|   #\d+)\s+(\S+) \[/); if (hd) { seatIdx = digestOrder.indexOf(hd[1]); continue; }
    const dl = L.match(/^\s{6,}([A-Za-z ]+): (.+)$/);
    if (dl && seatIdx >= 0 && digestOrder[seatIdx]) {
      const s = g.seats[digestOrder[seatIdx]]; const dest = dl[1].trim();
      if (!['Bruges', 'London', 'Bergen', 'Novgorod', 'The Hall'].includes(dest)) continue;
      for (const c of dl[2].split(',')) { const cm = c.trim().match(/^(\w+) Q(\d)=(\d+)/); if (cm) s.deliv.push({ style: cm[1], q: +cm[2], val: +cm[3], dest }); }
    }
    if (/^\s+flight beers:/.test(L)) seatIdx = -1;
  }
  games.push(g);
}

const all = games.flatMap(g => Object.values(g.seats).map(s => ({ ...s, n: g.n, cohort: g.cohort, gid: g.id })));
const f1 = x => x.toFixed(1); const f2 = x => x.toFixed(2);
const tally = (arr, key) => { const t = {}; arr.forEach(x => { const k = key(x); if (k) t[k] = (t[k] || 0) + 1; }); return Object.entries(t).sort((a, b) => b[1] - a[1]); };
console.log(`v3-behavior: ${games.length} games · ${all.length} seats`);

// ================= OPENINGS =================
console.log('\n================ OPENINGS ================');
console.log('turn-1 worker placement: ' + tally(all, s => s.place).map(([k, v]) => `${k} ${Math.round(100 * v / all.length)}%`).join(' · '));
console.log('turn-1 line:             ' + tally(all, s => s.line1).map(([k, v]) => `${k} ${Math.round(100 * v / all.length)}%`).join(' · '));
console.log('acquisitions in a seat\'s first 3 turns: ' + tally(all.flatMap(s => s.acquires.map(a => ({ a }))), x => x.a).map(([k, v]) => `${k} ${v}`).join(' · '));
const fb = all.map(s => s.brews[0]).filter(Boolean);
console.log('FIRST brew: ' + tally(fb, b => b.style).map(([k, v]) => `${k} ${Math.round(100 * v / fb.length)}% (avg R${f1(fb.filter(x => x.style === k).reduce((a, x) => a + x.round, 0) / fb.filter(x => x.style === k).length)})`).join(' · '));
const sb = all.map(s => s.brews[1]).filter(Boolean);
console.log('SECOND brew: ' + tally(sb, b => b.style).map(([k, v]) => `${k} ${Math.round(100 * v / sb.length)}%`).join(' · '));

// ================= WINNERS vs LOSERS =================
console.log('\n================ HOW WINNERS SHIP (winners vs the field) ================');
const W = all.filter(s => s.win), L = all.filter(s => !s.win && s.total != null);
const stat = (arr, fn) => f1(arr.reduce((a, s) => a + fn(s), 0) / arr.length);
console.log(`deliveries/seat: winners ${stat(W, s => s.deliv.length)} vs losers ${stat(L, s => s.deliv.length)}   (kontor ${stat(W, s => s.deliv.filter(d => d.dest !== 'The Hall').length)} vs ${stat(L, s => s.deliv.filter(d => d.dest !== 'The Hall').length)} · hall ${stat(W, s => s.deliv.filter(d => d.dest === 'The Hall').length)} vs ${stat(L, s => s.deliv.filter(d => d.dest === 'The Hall').length)})`);
console.log(`avg delivered Q: winners ${f2(W.flatMap(s => s.deliv).reduce((a, d) => a + d.q, 0) / W.flatMap(s => s.deliv).length)} vs losers ${f2(L.flatMap(s => s.deliv).reduce((a, d) => a + d.q, 0) / L.flatMap(s => s.deliv).length)}`);
console.log(`avg ★/cask:      winners ${f2(W.flatMap(s => s.deliv).reduce((a, d) => a + d.val, 0) / W.flatMap(s => s.deliv).length)} vs losers ${f2(L.flatMap(s => s.deliv).reduce((a, d) => a + d.val, 0) / L.flatMap(s => s.deliv).length)}`);
console.log(`first delivery (dispatch/enshrine) round: winners ${stat(W.filter(s => s.firstDelivR), s => s.firstDelivR)} vs losers ${stat(L.filter(s => s.firstDelivR), s => s.firstDelivR)}`);
console.log(`kontor dispatches/seat: winners ${stat(W, s => s.disp)} vs ${stat(L, s => s.disp)} · rival-loads: ${stat(W, s => s.rivalLoads)} vs ${stat(L, s => s.rivalLoads)} · floor turns: ${stat(W, s => s.floor)} vs ${stat(L, s => s.floor)} · brews: ${stat(W, s => s.brews.length)} vs ${stat(L, s => s.brews.length)}`);
const destMix = arr => { const t = {}; arr.flatMap(s => s.deliv).forEach(d => t[d.dest] = (t[d.dest] || 0) + 1); const tot = Object.values(t).reduce((a, b) => a + b, 0); return ['Bruges', 'London', 'Bergen', 'Novgorod', 'The Hall'].map(d => `${d} ${Math.round(100 * (t[d] || 0) / tot)}%`).join(' · '); };
console.log(`winner destination mix: ${destMix(W)}`);
console.log(`loser  destination mix: ${destMix(L)}`);

// ================= BEER PERFORMANCE =================
console.log('\n================ BEER PERFORMANCE (all seats) ================');
console.log('style      brewed  delivered  avg★(kontor)  avg★(hall)  in winner hands  ★/brew-good');
const COST = { Gruit: 1, Hopped: 2, Broyhan: 3, Keut: 3, Mumme: 4, Bock: 5 };
for (const st of ['Gruit', 'Hopped', 'Broyhan', 'Keut', 'Mumme', 'Bock']) {
  const brews = all.reduce((a, s) => a + s.brews.filter(b => b.style === st).length, 0);
  const dAll = all.flatMap(s => s.deliv.filter(d => d.style === st));
  const dW = W.flatMap(s => s.deliv.filter(d => d.style === st));
  const kon = dAll.filter(d => d.dest !== 'The Hall'), hall = dAll.filter(d => d.dest === 'The Hall');
  const avg = a => a.length ? f2(a.reduce((x, d) => x + d.val, 0) / a.length) : '—';
  const eff = dAll.length ? f2(dAll.reduce((x, d) => x + d.val, 0) / dAll.length / COST[st]) : '—';
  console.log(`${st.padEnd(10)} ${String(brews).padStart(5)}  ${String(dAll.length).padStart(8)}  ${String(avg(kon)).padStart(11)}  ${String(avg(hall)).padStart(9)}  ${String(Math.round(100 * dW.length / (dAll.length || 1)) + '%').padStart(14)}  ${String(eff).padStart(10)}`);
}
const expCount = {}; games.forEach(g => g.exports.forEach(e => expCount[e] = (expCount[e] || 0) + 1));
console.log('exports dealt (games):', Object.entries(expCount).map(([k, v]) => `${k} ${v}`).join(' · '));
// export-draft win effect: does having Bock in the game change quality wins?

// ================= QUALITY vs VOLUME (2p head-to-heads) =================
console.log('\n================ QUALITY vs VOLUME — 2p head-to-heads ================');
const g2 = games.filter(g => g.n === 2);
let buckets = { 'more casks & higher Q': 0, 'volume edge only': 0, 'quality edge only': 0, 'neither (fewer & lower)': 0, 'even': 0 };
let qWins = [], vWins = [];
for (const g of g2) {
  const [a, b] = Object.values(g.seats); if (a.total == null || b.total == null) continue;
  const w = a.win ? a : b, l = a.win ? b : a;
  const avgQ = s => s.deliv.length ? s.deliv.reduce((x, d) => x + d.q, 0) / s.deliv.length : 0;
  const dv = w.deliv.length - l.deliv.length, dq = avgQ(w) - avgQ(l);
  if (dv > 0 && dq > 0.2) buckets['more casks & higher Q']++;
  else if (dv > 0) buckets['volume edge only']++;
  else if (dq > 0.2) { buckets['quality edge only']++; qWins.push(g); }
  else if (dv < 0 && dq < -0.2) buckets['neither (fewer & lower)']++;
  else buckets['even']++;
  if (dv < 0 && dq > 0.2) vWins.push(g);   // (fewer casks, higher Q — the pure quality-over-volume win)
}
console.log('the 2p winner had: ' + Object.entries(buckets).map(([k, v]) => `${k} ${v}`).join(' · '));
const pure = qWins.filter(g => { const [a, b] = Object.values(g.seats); const w = a.win ? a : b, l = a.win ? b : a; return w.deliv.length < l.deliv.length; });
console.log(`PURE quality-over-volume wins (fewer casks, higher Q): ${pure.length}/${g2.length} — ${pure.map(g => g.id).join(', ') || '(none)'}`);
for (const g of pure.slice(0, 6)) {
  const [a, b] = Object.values(g.seats); const w = a.win ? a : b, l = a.win ? b : a;
  console.log(`  ${g.id}: ${w.name} won ${w.total}-${l.total} on ${w.deliv.length} casks (avgQ ${f2(w.deliv.reduce((x, d) => x + d.q, 0) / w.deliv.length)}, hall ${w.deliv.filter(d => d.dest === 'The Hall').length}) vs ${l.deliv.length} casks (avgQ ${f2(l.deliv.reduce((x, d) => x + d.q, 0) / (l.deliv.length || 1))})`);
}
// across all counts: win rate by Q4+ share buckets
console.log('\nwin rate by a seat\'s Q4+ delivery count (all counts):');
for (const [lbl, pred] of [['0 premium', s => s.deliv.filter(d => d.q >= 4).length === 0], ['1 premium', s => s.deliv.filter(d => d.q >= 4).length === 1], ['2 premium', s => s.deliv.filter(d => d.q >= 4).length === 2], ['3+ premium', s => s.deliv.filter(d => d.q >= 4).length >= 3]]) {
  const set = all.filter(s => s.total != null && pred(s));
  const fair = f1(100 * set.reduce((a, s) => a + 1 / games.find(g => g.id === s.gid).n, 0) / set.length);
  console.log(`  ${lbl.padEnd(11)} seats ${String(set.length).padStart(3)} · win ${Math.round(100 * set.filter(s => s.win).length / set.length)}% (weighted fair ≈ ${fair}%)`);
}
// hall share vs win
console.log('win rate by hall share of a seat\'s deliveries:');
for (const [lbl, lo, hi] of [['0%', -1, 0.001], ['1-33%', 0.001, 0.34], ['34-66%', 0.34, 0.67], ['67%+', 0.67, 2]]) {
  const set = all.filter(s => s.total != null && s.deliv.length && (s.deliv.filter(d => d.dest === 'The Hall').length / s.deliv.length) > lo && (s.deliv.filter(d => d.dest === 'The Hall').length / s.deliv.length) <= hi);
  if (set.length) console.log(`  ${lbl.padEnd(7)} seats ${String(set.length).padStart(3)} · win ${Math.round(100 * set.filter(s => s.win).length / set.length)}%`);
}
