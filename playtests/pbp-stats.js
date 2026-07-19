// PBP-STATS — quantitative summary over the narrate.js play-by-play logs (playtests/logs/pbp-*.log).
// Complements the qualitative read: counts the event vocabulary per game (voyages by kind, overbuild
// economy, spoilage, tolls, rival-loading, dead stops, Floor turns, per-seat deliveries) so trends
// spotted while reading can be checked against every game at once. Usage: node playtests/pbp-stats.js
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'logs', process.env.DIR || '');
const files = fs.readdirSync(DIR).filter(f => /^pbp-\d+p-\d+\.log$/.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const count = (txt, re) => (txt.match(re) || []).length;
const rows = [];
for (const f of files) {
  const txt = fs.readFileSync(path.join(DIR, f), 'utf8');
  const id = f.replace(/^pbp-|\.log$/g, '');
  const fin = txt.match(/FINAL — round (\d+) · sailed (\d+)\/(\d+) · ended by (\w+)/);
  const turns = txt.match(/^== R\d+ · turn (\d+)/gm) || [];
  // a "thin turn" = a turn block with <=1 engine line after the header (move-and-nothing turns)
  const blocks = txt.split(/^== R/m).slice(1);
  let thin = 0;
  for (const b of blocks) {
    const lines = b.split('\n').filter(l => /^  \S/.test(l));
    if (lines.length <= 1) thin++;
  }
  const r = {
    id,
    rounds: fin ? +fin[1] : NaN,
    sailed: fin ? `${fin[2]}/${fin[3]}` : '?',
    end: fin ? fin[4] : 'ERR',
    turns: turns.length,
    sails: count(txt, /sails to/g),
    charters: count(txt, /charters a/g),
    enshrines: count(txt, /enshrines/g),
    overbuilds: count(txt, /is displaced/g),
    neutralTear: count(txt, /torn down/g),
    rent: count(txt, /ground rent to overbuild/g),
    boxed: count(txt, /returned to the box \(/g),
    flips: count(txt, /FLIPS to/g),
    spoil: count(txt, /has soured/g),
    tolls: count(txt, /occupancy toll/g),
    rivalLoads: count(txt, /loader bonus/g),
    pickups: count(txt, /dockside pickup/g),
    floorTurns: count(txt, /works the .*Floor/g),
    taps: count(txt, /TAPS/g),
    hires: count(txt, /hires the/g),
    specBuys: count(txt, /fits the/g),
    bldgBuys: count(txt, /buys the .*at the .*Market — place|authors/g),
    surveys: count(txt, /surveys the guild/g),
    deadStops: count(txt, /↳ (nothing to|no Ready cask|no open slot|no charter contract|nothing maturing|no eligible|Survey: the Building display is empty|no kontor)/g),
    nothingToLoad: count(txt, /nothing eligible to load/g),
    thinTurns: thin,
  };
  rows.push(r);
}

const cols = ['id','rounds','sailed','end','turns','sails','charters','enshrines','overbuilds','rent','boxed','spoil','tolls','rivalLoads','pickups','floorTurns','taps','hires','specBuys','surveys','deadStops','nothingToLoad','thinTurns'];
console.log(cols.join('\t'));
for (const r of rows) console.log(cols.map(c => r[c]).join('\t'));

// aggregates per player count
const byN = {};
for (const r of rows) { const n = r.id.split('p')[0]; (byN[n] = byN[n] || []).push(r); }
console.log('\n-- averages per player count --');
for (const n of Object.keys(byN)) {
  const a = byN[n]; const avg = k => (a.reduce((s, r) => s + (+r[k] || 0), 0) / a.length).toFixed(1);
  console.log(`${n}p (${a.length} games): rounds ${avg('rounds')} · sails ${avg('sails')} · charters ${avg('charters')} · enshrines ${avg('enshrines')} · overbuilds ${avg('overbuilds')} · spoil ${avg('spoil')} · tolls ${avg('tolls')} · rivalLoads ${avg('rivalLoads')} · deadStops ${avg('deadStops')} · thinTurns ${avg('thinTurns')}/${avg('turns')} turns`);
}
