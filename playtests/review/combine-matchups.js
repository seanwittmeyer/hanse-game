// Matchup-aware combiner for the review slate. Reads playtests/analysis/mu-<MATCHUP>-<n>p-s*.jsonl,
// groups by (matchup, player-count, tier), and reports per-tier strength + behavioral profile.
// Usage: node playtests/review/combine-matchups.js [glob-dir]
'use strict';
const fs = require('fs');
const path = require('path');
const dir = process.argv[2] || path.join(__dirname, '..', 'analysis');
const files = fs.readdirSync(dir).filter(f => /^mu-.*\.jsonl$/.test(f)).map(f => path.join(dir, f));

const KON = ['bruges', 'london', 'bergen', 'novgorod', 'hall'];
// key: matchup|n|tier -> aggregate
const G = {};
function agg(mu, n, tier) {
  const k = mu + '|' + n + '|' + tier;
  return G[k] = G[k] || { mu, n, tier, seats: 0, wins: 0, total: 0, deliv: 0, maj: 0, flight: 0, developed: 0,
    ndeliv: 0, hall: 0, ndest: 0, ships: 0, ups: 0, q4: 0, q5: 0, dest: { bruges:0,london:0,bergen:0,novgorod:0,hall:0 } };
}
// matchup-level: mu|n -> {games, rounds, winScore, seatWins{pid}}
const M = {};
function mlevel(mu, n){ const k = mu+'|'+n; return M[k] = M[k] || {mu,n,games:0,rounds:0,winScore:0,seatWins:{}}; }

files.forEach(f => {
  const base = path.basename(f);
  const m = base.match(/^mu-(.+?)-(\d)p-s\d+\.jsonl$/);
  if (!m) return;
  const mu = m[1], n = +m[2];
  let curMap = null;   // pid -> tier for the current game
  fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).forEach(line => {
    const e = JSON.parse(line);
    if (e.out) {
      curMap = {};
      const ml = mlevel(mu, n); ml.games++; ml.rounds += e.out.rounds;
      const w = e.out.players.find(p => p.winner); if (w) { ml.winScore += w.total; ml.seatWins[w.pid] = (ml.seatWins[w.pid]||0)+1; }
      e.out.players.forEach(p => {
        curMap[p.pid] = p.tier;
        const a = agg(mu, n, p.tier);
        a.seats++; a.wins += p.winner ? 1 : 0; a.total += p.total; a.deliv += p.deliv; a.maj += p.maj;
        a.flight += p.flight || 0; a.developed += p.developed || 0; a.ndeliv += p.ndeliv; a.hall += p.hall;
        a.ndest += p.ndest; a.ships += p.ships || 0; a.ups += p.upgrades || 0;
        const bq = p.delivByQ || {}; a.q4 += (bq[4]||0)+(bq[5]||0); a.q5 += (bq[5]||0);
      });
      return;
    }
    if (e.t === 'deliver' && curMap && curMap[e.pid] != null) {
      const a = agg(mu, n, curMap[e.pid]);
      if (a.dest[e.dest] != null) a.dest[e.dest]++;
    }
  });
});

const fmt = (x, d = 1) => (x == null || Number.isNaN(x)) ? '—' : Number(x).toFixed(d);
const pct = (a, b) => b ? fmt(100 * a / b, 1) + '%' : '—';

const MUS = ['CMvCM', 'CMvGM', 'GMvGM', 'CMvTr', 'GMvTr'];
console.log('==================  MATCHUP SLATE — per-tier strength + behavior  ==================\n');
MUS.forEach(mu => {
  [2, 3, 4].forEach(n => {
    const ml = M[mu + '|' + n]; if (!ml || !ml.games) return;
    console.log(`#### ${mu} @ ${n}p   (${ml.games} games, avg rounds ${fmt(ml.rounds/ml.games)}, winner avg score ${fmt(ml.winScore/ml.games)})`);
    const tiers = Object.keys(G).filter(k => k.startsWith(mu+'|'+n+'|')).map(k => G[k]).sort((a,b)=>b.seats-a.seats);
    tiers.forEach(a => {
      const s = a.seats, A = x => fmt(a[x]/s);
      const dtot = KON.reduce((t,d)=>t+a.dest[d],0);
      console.log(`  ${a.tier.padEnd(12)} seats ${String(s).padStart(3)}  WIN ${pct(a.wins,s).padStart(6)}  | score ${A('total').padStart(5)} = deliv ${A('deliv')} + maj ${A('maj')} + flight ${A('flight')} + dev ${A('developed')}`);
      console.log(`  ${''.padEnd(12)}            casks ${A('ndeliv')}  dests ${A('ndest')}  ships ${A('ships')}  ups ${A('ups')}  Q4+/g ${A('q4')}  Q5/g ${A('q5')}  Hall/g ${A('hall')}`);
      console.log(`  ${''.padEnd(12)}            dest mix: ` + KON.map(d => `${d.slice(0,4)} ${pct(a.dest[d],dtot)}`).join('  '));
    });
    console.log('');
  });
});

// compact strength ladder summary (per-capita win-rate of the higher tier in mixed matchups)
console.log('==================  STRENGTH SUMMARY (per-capita win-rate)  ==================');
[['CMvGM','cellarmaster','guildmaster'],['CMvTr','cellarmaster','trader'],['GMvTr','guildmaster','trader']].forEach(([mu,hi,lo])=>{
  [2,3,4].forEach(n=>{
    const H=G[mu+'|'+n+'|'+hi], L=G[mu+'|'+n+'|'+lo];
    if(!H||!L)return;
    console.log(`  ${mu} ${n}p:  ${hi} ${pct(H.wins,H.seats)} (n=${H.seats}, score ${fmt(H.total/H.seats)})   vs   ${lo} ${pct(L.wins,L.seats)} (n=${L.seats}, score ${fmt(L.total/L.seats)})`);
  });
});

// seat (turn-order) fairness — read off the MIRROR matchups, where every seat is the same tier,
// so any spread is pure first-player advantage under the strongest AI.
console.log('\n==================  SEAT / TURN-ORDER FAIRNESS (mirror matchups)  ==================');
['CMvCM','GMvGM'].forEach(mu=>{
  [2,3,4].forEach(n=>{
    const ml=M[mu+'|'+n]; if(!ml||!ml.games)return;
    const line=Array.from({length:n},(_,i)=>`P${i+1} ${pct(ml.seatWins[i]||0,ml.games)}`).join('  ');
    console.log(`  ${mu} ${n}p (${ml.games} games, fair ${fmt(100/n)}%):  ${line}`);
  });
});
console.log('');
