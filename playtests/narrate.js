// PLAY-BY-PLAY NARRATOR — full-game logs from the CANONICAL play.html engine (no reimplementation).
// Drives the in-page AI seats (trader / guildmaster / cellarmaster) exactly like ai-ladder.js, but
// instead of aggregate stats it captures the engine's OWN log() stream — every move, line choice,
// toll, brew, age, deploy, load, sail, delivery, benefit, overbuild, tap, charter, enshrine — as a
// plain-text chronicle with turn/round headers and a per-player end-of-game digest. The point is
// QUALITATIVE review: what players actually do turn to turn (sequences, little wins, lane execution,
// failure moments, interaction, the endgame) — the thing sim.js's aggregates can't show.
//
// Usage:  node playtests/narrate.js            (runs the full 30-game matrix below → playtests/logs/)
//         node playtests/narrate.js 2p-3       (run a single game by id)
// Env:    GUILD_MS / CELLAR_MS override the bulk MC budgets (defaults 120 / 200).
//         MATRIX=path.json  load the game matrix from a JSON file instead of the inline 30
//                           (entries: {id, seed, seats:[{name, ai:{tier, persona}}]}).
//         OUT=subdir        write logs to playtests/logs/<subdir>/ instead of playtests/logs/.
//
// Design notes (mirrors the other harnesses — keep in sync if the engine bootstrap changes):
//  • log() is a reassignable function declaration — we replace it with a capture that strips the
//    HTML (icons → G/H/★ tokens) and appends chronologically (S.log itself caps at 140 lines).
//  • MC playouts temporarily no-op log/render/save and run with aiSimulating=true, then RESTORE —
//    so the capture only ever sees real-game events, never rollout spam.
//  • endTurn is wrapped (aiSimulating-guarded) to emit turn boundaries + a one-line state strip.
//  • Math.random is a per-game seeded PRNG (mulberry32) on a CLONED Math object, so every log is
//    reproducible by id ("re-run 3p-2 and round 7 is the same").
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ONLY = process.argv[2] || '';
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
const OUTDIR = path.join(__dirname, 'logs', process.env.OUT || '');
fs.mkdirSync(OUTDIR, { recursive: true });

// ---- the 30-game matrix: 10 per player count, mixing trader personas, guildmaster, cellarmaster ----
// Seat names ARE the tier (they appear in every log line, so the lane analysis reads at a glance).
const T = p => ({ name: 'Trader' + p[0].toUpperCase(), ai: { tier: 'trader', persona: p } });
const G = n => ({ name: 'Guild' + (n || ''), ai: { tier: 'guildmaster', persona: null } });
const C = n => ({ name: 'Cellar' + (n || ''), ai: { tier: 'cellarmaster', persona: null } });
const GAMES = [
  { id: '2p-1', seed: 211, seats: [T('volume'), G()] },
  { id: '2p-2', seed: 212, seats: [C(), T('prestige')] },
  { id: '2p-3', seed: 213, seats: [G(), C()] },
  { id: '2p-4', seed: 214, seats: [T('majority'), T('prestige')] },
  { id: '2p-5', seed: 215, seats: [C(), G()] },
  { id: '2p-6', seed: 216, seats: [T('volume'), T('prestige')] },
  { id: '2p-7', seed: 217, seats: [C(), C(2)] },
  { id: '2p-8', seed: 218, seats: [G(), T('majority')] },
  { id: '2p-9', seed: 219, seats: [T('prestige'), C()] },
  { id: '2p-10', seed: 220, seats: [G(), G(2)] },
  { id: '3p-1', seed: 311, seats: [T('volume'), G(), C()] },
  { id: '3p-2', seed: 312, seats: [T('prestige'), T('majority'), G()] },
  { id: '3p-3', seed: 313, seats: [C(), T('volume'), T('prestige')] },
  { id: '3p-4', seed: 314, seats: [G(), C(), T('majority')] },
  { id: '3p-5', seed: 315, seats: [T('volume'), T('prestige'), T('majority')] },
  { id: '3p-6', seed: 316, seats: [C(), G(), T('volume')] },
  { id: '3p-7', seed: 317, seats: [T('majority'), C(), G()] },
  { id: '3p-8', seed: 318, seats: [G(), T('prestige'), T('volume')] },
  { id: '3p-9', seed: 319, seats: [C(), C(2), G()] },
  { id: '3p-10', seed: 320, seats: [T('prestige'), G(), C()] },
  { id: '4p-1', seed: 411, seats: [T('volume'), T('prestige'), G(), C()] },
  { id: '4p-2', seed: 412, seats: [G(), T('majority'), C(), T('volume')] },
  { id: '4p-3', seed: 413, seats: [T('volume'), T('prestige'), T('majority'), T('volume')] },
  { id: '4p-4', seed: 414, seats: [C(), G(), T('prestige'), T('majority')] },
  { id: '4p-5', seed: 415, seats: [G(), G(2), T('volume'), T('prestige')] },
  { id: '4p-6', seed: 416, seats: [C(), T('volume'), G(), T('majority')] },
  { id: '4p-7', seed: 417, seats: [T('prestige'), C(), T('volume'), G()] },
  { id: '4p-8', seed: 418, seats: [G(), G(2), C(), C(2)] },
  { id: '4p-9', seed: 419, seats: [T('majority'), T('volume'), T('prestige'), C()] },
  { id: '4p-10', seed: 420, seats: [C(), G(), T('majority'), T('prestige')] },
].filter(g => !ONLY || g.id === ONLY);
let GAMES_ = GAMES;
if (process.env.MATRIX) {
  GAMES_ = JSON.parse(fs.readFileSync(process.env.MATRIX, 'utf8')).filter(g => !ONLY || g.id === ONLY);
  GAMES.length = 0; GAMES.push(...GAMES_);
}
// de-dupe seat names within a game (TraderV twice at 4p-3)
GAMES.forEach(g => { const seen = {}; g.seats.forEach(s => { if (seen[s.name]) s.name += ++seen[s.name]; else seen[s.name] = 1; }); });

// ---- driver, appended into the engine's scope (no backticks) ----
const driver = `
//================= NARRATOR RUNNER (appended) =================
render=function(){};save=function(){};snapshot=function(){};
GUILD_MS=__GMS||120;GUILD_MIN=1;
if(typeof CELLAR_MS!=='undefined'){CELLAR_MS=__CMS||200;CELLAR_MIN=1;CELLAR_CAP=600;}

// seeded PRNG (mulberry32) — Math here is a per-context clone, so this never touches the host
function __mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}

// HTML log line → plain text: lucide icons become G/H/star tokens, everything else strips
function __plain(s){return String(s)
  .replace(/<i data-lucide="wheat"[^>]*><\\/i>/g,'G')
  .replace(/<i data-lucide="sprout"[^>]*><\\/i>/g,'H')
  .replace(/<i data-lucide="star"[^>]*><\\/i>/g,'*')
  .replace(/<i data-lucide="check"[^>]*><\\/i>/g,'')
  .replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&')
  .replace(/\\s+/g,' ').trim();}

var __buf=[];
function __emit(line){__buf.push(line);}
log=function(msg){if(typeof aiSimulating!=='undefined'&&aiSimulating)return;__emit('  '+__plain(msg));};

// turn & round boundaries + a one-line state strip for the player ABOUT to act
var __turnNo=0;
function __strip(p){var sc=scorePlayer(p);
  var ves=p.vessels.map(function(c){return c?(styleShort(c.style)+(c.step>=c.ready?'!':' '+c.step+'/'+c.ready)):'-';}).join(',');
  var mine=SLOTS.map(function(s){return S.slots[s.id];}).filter(function(t){return t&&t.owner===p.id&&t.type==='cask';}).length;
  return 'G'+p.grain+' H'+p.hops+' ct'+(p.contracts||0)+' | vessels['+ves+'] deployed:'+mine
    +' | score '+sc.total+' (dlv '+sc.deliv+' maj '+sc.maj+' flt '+sc.flight+(sc.developed?' dev '+sc.developed:'')+')';}
function __turnHeader(){var p=cur();__turnNo++;
  __emit('');__emit('== R'+S.turn+' · turn '+__turnNo+' · '+p.name+' ['+p.ai.tier+(p.ai.persona?'/'+p.ai.persona:'')+'] · '+__strip(p));}
var __origEndTurn=endTurn;
endTurn=function(){if(typeof aiSimulating!=='undefined'&&aiSimulating)return __origEndTurn();
  __origEndTurn();
  if(S&&!S.over)__turnHeader();};

function __boardOpening(){
  var lines=[];
  SLOTS.forEach(function(s){var t=S.slots[s.id],b=bAt(s.id);
    if(!t&&!b)return;var d=s.id+' ('+s.line+'): ';
    if(b)d+='[bldg '+bName(b.b)+' '+(b.owner==null?'neutral':S.players[b.owner].name)+'] ';
    if(t)d+=(t.type==='ship'?('ship '+shipName(t)+'->'+DEST[t.dest].name):('cask '+styleShort(t.style)));
    lines.push('  '+d);});
  return lines;}

function __digest(){
  var out=[];out.push('');out.push('================ FINAL — round '+S.turn+' · sailed '+S.sailed+'/'+S.sailedCap
    +' · ended by '+(S.sailed>=S.sailedCap?'CLOCK':'ROUND CEILING')+' ================');
  var rows=finalRows().rows;
  rows.forEach(function(r,i){var p=r.p,sc=r.sc;
    out.push((i===0?'WINNER  ':'   #'+(i+1)+'   ')+p.name+' ['+p.ai.tier+(p.ai.persona?'/'+p.ai.persona:'')+'] — TOTAL '+sc.total
      +'  (deliveries '+sc.deliv+' · majorities '+sc.maj+' · flight '+sc.flight+' · floor '+sc.developed+')');
    var byDest={};(p.delivered||[]).forEach(function(d){(byDest[d.dest]=byDest[d.dest]||[]).push(d);});
    DESTS.forEach(function(d){var l=byDest[d];if(!l)return;
      out.push('        '+DEST[d].name+': '+l.map(function(x){return styleShort(x.style)+' Q'+x.q+'='+(x.val||0);}).join(', '));});
    var beers={};(p.delivered||[]).forEach(function(d){beers[d.style]=1;});
    out.push('        flight beers: '+Object.keys(beers).map(styleShort).join(', ')+' ('+Object.keys(beers).length+')'
      +' · specialists: '+(p.upgrades.length?p.upgrades.map(upName).join(', '):'none')
      +' · flipped: '+((p.flipped||[]).length));
  });
  var majOff=false;
  out.push('  majorities: '+KONTORE.map(function(k){var a=majorityAwards(k);
    var s=Object.keys(a).map(function(pid){return S.players[pid].name+'+'+a[pid];}).join(' ');
    return DEST[k].name+'['+(s||'none')+']';}).join('  '));
  out.push('  buildings on the wharf at end: '+SLOTS.map(function(s){var b=bAt(s.id);
    return b?(bName(b.b)+'('+(b.owner==null?'ntl':S.players[b.owner].name)+')'):null;}).filter(Boolean).join(' · '));
  return out;}

var __RESULTS=[];
__GAMES.forEach(function(cfg){
  Math.random=__mulberry32(cfg.seed);
  __buf=[];__turnNo=0;
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(cfg.seats.length,cfg.seats.map(function(s){return s.name;}));
  UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p,i){p.ai=cfg.seats[i].ai;});
  __emit('############ GAME '+cfg.id+' · seed '+cfg.seed+' · '+cfg.seats.length+'p · KEY '+KEY+' ############');
  __emit('seats: '+S.players.map(function(p){return p.name+' ['+p.ai.tier+(p.ai.persona?'/'+p.ai.persona:'')+']';}).join(' · '));
  __emit('exports dealt: '+exportLabel()+' · sailed-ships cap '+S.sailedCap+' · warm start:');
  __boardOpening().forEach(__emit);
  __turnHeader();
  var guard=0,err=null;
  try{while(!S.over){aiStep();if(++guard>300000){err='guard-tripped';break;}}}
  catch(e){err=String(e&&e.stack||e);}
  if(err)__emit('!!! ERROR: '+err);
  else __digest().forEach(__emit);
  __RESULTS.push({id:cfg.id,text:__buf.join('\\n'),round:S.turn,over:!!S.over,err:err,
    winner:(S.over?finalRows().rows[0].p.name:null),
    totals:S.players.map(function(p){return p.name+':'+scorePlayer(p).total;}).join(' ')});
});
__OUT.results=__RESULTS;__OUT.KEY=KEY;
`;

// ---- DOM stubs (same shape as ai-ladder.js) ----
const noop = () => {};
const makeEl = () => {
  const el = {
    innerHTML: '', textContent: '', value: '', style: {},
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    setAttribute: noop, getAttribute: () => null, appendChild: noop,
    addEventListener: noop, removeEventListener: noop,
  };
  el.querySelector = () => makeEl(); el.querySelectorAll = () => []; el.closest = () => null;
  return el;
};
const documentStub = {
  getElementById: () => makeEl(), querySelector: () => makeEl(), querySelectorAll: () => [],
  createElement: () => makeEl(), addEventListener: noop, body: makeEl(), head: makeEl(),
};
const store = {};
const localStorageStub = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
const MathClone = {};
Object.getOwnPropertyNames(Math).forEach(k => { MathClone[k] = Math[k]; });

const ctx = {
  document: documentStub, localStorage: localStorageStub, console, Math: MathClone,
  JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert: noop, setTimeout: noop, clearTimeout: noop,
  lucide: { createIcons: noop },
  __GAMES: GAMES.map(g => ({ id: g.id, seed: g.seed, seats: g.seats })),
  __GMS: parseInt(process.env.GUILD_MS || '0', 10), __CMS: parseInt(process.env.CELLAR_MS || '0', 10),
  __OUT: {},
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;

vm.createContext(ctx);
const t0 = Date.now();
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+narrate' });
} catch (e) {
  console.error('RUN ERROR:', e && e.stack || e);
  process.exit(1);
}

let errs = 0;
ctx.__OUT.results.forEach(r => {
  const file = path.join(OUTDIR, 'pbp-' + r.id + '.log');
  fs.writeFileSync(file, r.text + '\n');
  if (r.err) errs++;
  console.log(`${r.id.padEnd(6)} ${(r.err ? 'ERROR' : 'ok').padEnd(6)} rounds ${String(r.round).padStart(2)}  winner ${String(r.winner).padEnd(10)} totals ${r.totals}  -> ${path.relative(process.cwd(), file)}`);
});
console.log(`\n${ctx.__OUT.results.length} games (KEY ${ctx.__OUT.KEY}) in ${((Date.now() - t0) / 1000).toFixed(1)}s · errors ${errs}`);
if (errs) process.exitCode = 1;
