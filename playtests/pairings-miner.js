// PAIRINGS MINER — what action combinations do players ACTUALLY play? Feeds the Hall CRAFT-coin
// design (HALL-STUDY.md Direction E): the Hall should sell the shortcuts players wish they had,
// so we mine (a) WITHIN-TURN verb pairings (what already combos — including via slot locality and
// the Floor), and (b) CROSS-TURN pipelines (the friction: how many turns between brew→deploy,
// deploy→load/dispatch — the gaps a "shortcut" coin would collapse).
// Usage: node playtests/pairings-miner.js [dir ...]   (default: v3-corpus + v31-pressure)
'use strict';
const fs = require('fs');
const path = require('path');
const dirs = process.argv.slice(2).length ? process.argv.slice(2) : ['v3-corpus', 'v31-pressure'];

// verb extraction: narrate lines are "  Name verbs …" (indented, engine log text stripped of HTML)
const VERBS = [
  [/ sources goods/, 'source'],
  [/ brews /, 'brew'],
  [/ sets a Ready .* on a .* slot|^\s*\S+ sets a Ready/, 'deploy'],
  [/ loads .* onto the /, 'load'],
  [/ enshrines /, 'enshrine'],
  [/ dispatches .* to /, 'k-dispatch'],
  [/ commissions the /, 'commission'],
  [/ buys .* recipe/, 'buy-recipe'],
  [/ buys .* at the .* Market — place/, 'buy-tile'],
  [/ buys a charter contract| buys .* contract/, 'buy-contract'],
  [/ fits the .* Specialist/, 'buy-spec'],
  [/ stays home/, 'FLOOR'],
];
const AGE = /ages \+\d|age points|Age \d/;

const turnRe = /^== R(\d+) · turn (\d+) · (\S+) /;
const inTurn = {};        // per (game,player): sequence of turn verb-sets
const pairCount = {};     // within-turn unordered pair counts
const turnSets = {};      // full turn-signature counts (sorted verb combos)
const gapBrewDeploy = [], gapDeployOut = [];

for (const d of dirs) {
  const DIR = path.join(__dirname, 'logs', d);
  if (!fs.existsSync(DIR)) continue;
  for (const f of fs.readdirSync(DIR).filter(x => /^pbp-.*\.log$/.test(x))) {
    const lines = fs.readFileSync(path.join(DIR, f), 'utf8').split('\n');
    let cur = null; const turns = {}; // player -> [verbSet,...]
    const flush = () => {
      if (!cur) return;
      const vs = [...cur.verbs];
      if (!vs.length) return;
      (turns[cur.p] = turns[cur.p] || []).push(new Set(vs));
      // pairs within the turn
      for (let i = 0; i < vs.length; i++) for (let j = i + 1; j < vs.length; j++) {
        const k = [vs[i], vs[j]].sort().join(' + ');
        pairCount[k] = (pairCount[k] || 0) + 1;
      }
      if (vs.length >= 2) { const sig = vs.sort().join('+'); turnSets[sig] = (turnSets[sig] || 0) + 1; }
    };
    for (const ln of lines) {
      const tm = ln.match(turnRe);
      if (tm) { flush(); cur = { p: tm[3], verbs: new Set() }; continue; }
      if (!cur) continue;
      // only lines attributed to the active player (start with their name) or sub-lines within their turn
      const own = new RegExp('^\\s*' + cur.p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' ');
      for (const [re, v] of VERBS) { if (own.test(ln) && re.test(ln)) { cur.verbs.add(v); break; } }
      if (own.test(ln) === false && AGE.test(ln) && /↳/.test(ln)) cur.verbs.add('age');   // age allocations log as sub-lines
    }
    flush();
    // cross-turn pipelines per player: turns between a brew and the NEXT deploy; a deploy and the next load/enshrine/k-dispatch
    for (const p in turns) {
      const seq = turns[p];
      let lastBrew = -1, lastDeploy = -1;
      seq.forEach((s, i) => {
        if (s.has('brew')) lastBrew = i;
        if (s.has('deploy')) { if (lastBrew >= 0) { gapBrewDeploy.push(i - lastBrew); lastBrew = -1; } lastDeploy = i; }
        if ((s.has('load') || s.has('enshrine') || s.has('k-dispatch')) && lastDeploy >= 0) { gapDeployOut.push(i - lastDeploy); lastDeploy = -1; }
      });
    }
  }
}
const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
const med = a => { if (!a.length) return 0; const s = a.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const dist = a => { const d = {}; a.forEach(x => d[x] = (d[x] || 0) + 1); return [0, 1, 2, 3].map(k => `${k}t:${(100 * (d[k] || 0) / a.length).toFixed(0)}%`).join(' '); };

console.log('== WITHIN-TURN verb pairings (both corpora, ' + dirs.join('+') + ') ==');
top(pairCount, 22).forEach(([k, v]) => console.log('  ' + String(v).padStart(5) + '  ' + k));
console.log('\n== most-played multi-verb TURN signatures ==');
top(turnSets, 16).forEach(([k, v]) => console.log('  ' + String(v).padStart(5) + '  ' + k));
console.log('\n== PIPELINE FRICTION (turns of lag — the gaps a shortcut coin collapses) ==');
console.log('  brew → its deploy:  n=' + gapBrewDeploy.length + '  median ' + med(gapBrewDeploy) + '  dist ' + dist(gapBrewDeploy));
console.log('  deploy → out (load/enshrine/dispatch):  n=' + gapDeployOut.length + '  median ' + med(gapDeployOut) + '  dist ' + dist(gapDeployOut));
