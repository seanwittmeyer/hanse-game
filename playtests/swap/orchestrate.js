// Station-swap A/B orchestrator. Runs the mirror harness across {base,swap} x {gm,cm} x {2,3,4}p,
// 3 shards of 10 each (30 games/cell), at most 4 child processes at once (the "batch of 4" the user asked
// for). Streams each shard's summary line to stdout + live.log as it finishes, writes per-shard JSON, and
// runs the combiner at the end. Designed to run in the background; results land incrementally in live.log.
'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const SIM = path.join(HERE, '..', 'station-swap-sim.js');
const ROOT = path.join(HERE, '..', '..');
const BASE = process.env.BASE_HTML || '/tmp/play-baseline-v75.html';
const SWAP = process.env.SWAP_HTML || path.join(ROOT, 'play.html');
const CONC = parseInt(process.env.CONC || '4', 10);
const NPER = process.env.NPER || '10';
const LOG = path.join(HERE, 'live.log');

if (!fs.existsSync(BASE)) { console.error('missing baseline html: ' + BASE); process.exit(1); }
fs.writeFileSync(LOG, 'station-swap A/B  ' + new Date().toISOString() + '  (N=' + NPER + '/shard, conc=' + CONC + ')\n');

const jobs = [];
for (const tier of ['gm', 'cm'])
  for (const np of [2, 3, 4])
    for (const shard of [1, 2, 3])
      for (const ver of [['base', BASE], ['swap', SWAP]])
        jobs.push({ tier, np, shard, tag: ver[0], playhtml: ver[1],
          out: path.join(HERE, `${ver[0]}-${tier}-${np}p-s${shard}.json`) });

let idx = 0, active = 0, done = 0;
const t0 = Date.now();
function launch() {
  while (active < CONC && idx < jobs.length) {
    const j = jobs[idx++]; active++;
    const env = Object.assign({}, process.env, {
      PLAYHTML: j.playhtml, TIER: j.tier, NP: String(j.np), N: NPER,
      TAG: j.tag, SHARD: String(j.shard), OUT: j.out, GUILD_MS: '120', CELLAR_MS: '80',
    });
    const p = spawn('node', [SIM], { env });
    let buf = '';
    p.stdout.on('data', d => buf += d); p.stderr.on('data', d => buf += d);
    p.on('close', () => {
      active--; done++;
      const line = `(${done}/${jobs.length}) ` + buf.trim();
      console.log(line); fs.appendFileSync(LOG, line + '\n');
      if (done === jobs.length) finish(); else launch();
    });
  }
}
function finish() {
  const mins = ((Date.now() - t0) / 60000).toFixed(1);
  const tail = `ALL DONE — ${jobs.length} shards in ${mins} min`;
  console.log(tail); fs.appendFileSync(LOG, tail + '\n');
  try {
    const { execFileSync } = require('child_process');
    const rep = execFileSync('node', [path.join(HERE, 'combine.js')], { encoding: 'utf8' });
    console.log(rep); fs.appendFileSync(LOG, rep);
  } catch (e) { fs.appendFileSync(LOG, 'combine failed: ' + (e && e.message) + '\n'); }
}
launch();
