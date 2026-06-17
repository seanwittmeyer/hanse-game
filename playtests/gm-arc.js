// Game-ARC timeline harness — "when do the milestones happen?"
// Drives the canonical in-page aiStep at a chosen TIER (guildmaster or trader), hooks the engine's own
// functions to record the ROUND of key events (brew/deliver by quality, recipe acquisition bought-vs-free,
// first building), then prints a per-cohort TIMELINE (median round per milestone) + recipe/quality/building
// stats.  GM seats are slow → SHARD (see header of gm-points.js): one count per process, small N, parallel.
//
// Usage (a shard):  COUNTS=<c> TIER=<guildmaster|trader> GMS=<ms> OUT=playtests/arc/<f>.json node playtests/gm-arc.js <N>
// Combine:          node playtests/gm-arc.js --combine playtests/arc/*.json
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

if (process.argv[2] === '--combine') { combine(process.argv.slice(3)); process.exit(0); }

const N = parseInt(process.argv[2] || '15', 10);
const COUNT = parseInt(process.env.COUNTS || '3', 10);
const TIER = process.env.TIER || 'trader';
const GMS = parseInt(process.env.GMS || '30', 10);
const OUT = process.env.OUT || '';

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= ARC DRIVER (appended) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
GUILD_MS=__GMS;GUILD_MIN=1;
var __EV=null;
function REC(){return __EV&&!aiSimulating;}           // never record inside GM Monte-Carlo playouts
function EVrec(t,d){if(!REC())return;var e={t:t,r:S.turn};if(d)for(var k in d)e[k]=d[k];__EV.push(e);}

var _buyRecipe=buyRecipe;   buyRecipe=function(st){EVrec('recipe',{pid:S.active,style:st,q:STYLES[st].q,free:0});return _buyRecipe(st);};
var _brecipePick=brecipePick; brecipePick=function(st){var pid=(UI.pendingRecipe&&UI.pendingRecipe[0])?UI.pendingRecipe[0].pid:S.active;if(st&&STYLES[st])EVrec('recipe',{pid:pid,style:st,q:STYLES[st].q,free:1});return _brecipePick(st);};
var _autoRecipe=autoRecipe; autoRecipe=function(p,dest){var n=p.recipes.length;var r=_autoRecipe(p,dest);if(p.recipes.length>n){var st=p.recipes[p.recipes.length-1];EVrec('recipe',{pid:p.id,style:st,q:STYLES[st].q,free:1});}return r;};
var _brewPick=brewPick;     brewPick=function(st){EVrec('brew',{pid:S.active,style:st,q:STYLES[st].q});return _brewPick(st);};
var _deliverCask=deliverCask; deliverCask=function(lp,L,dest,ss,full){EVrec('deliver',{pid:lp.id,dest:dest,q:L.q,style:L.style});return _deliverCask(lp,L,dest,ss,full);};
var _placeBldgOn=placeBldgOn; placeBldgOn=function(sl){var b=UI.tmp&&UI.tmp.placeBldg;EVrec('bldg',{pid:(b?b.owner:S.active)});return _placeBldgOn(sl);};

function mkAI(){ if(__TIER==='trader')return {tier:'trader',persona:['volume','prestige','majority'][Math.floor(Math.random()*3)]}; return {tier:__TIER,persona:null}; }
function runOne(np){
  S=freshState(np,['P1','P2','P3','P4'].slice(0,np));UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p){p.ai=mkAI();});
  __EV=[];var guard=0;
  while(!S.over){aiStep();if(++guard>800000)break;}
  return {np:np, rounds:S.turn, exports:(S.exports||[]).slice(), ev:__EV, players:S.players.map(function(p){return p.id;})};
}
var __GAMES=[];for(var g=0;g<__N;g++)__GAMES.push(runOne(__COUNT));
var __RESULT=JSON.stringify({count:__COUNT, tier:__TIER, n:__GAMES.length, games:__GAMES});
`;

const noop = () => {};
const makeEl = () => { const el = { innerHTML:'', textContent:'', value:'', style:{}, classList:{add:noop,remove:noop,toggle:noop,contains:()=>false}, setAttribute:noop, getAttribute:()=>null, appendChild:noop, addEventListener:noop, removeEventListener:noop }; el.querySelector=()=>makeEl(); el.querySelectorAll=()=>[]; el.closest=()=>null; return el; };
const document = { getElementById:()=>makeEl(), querySelector:()=>makeEl(), querySelectorAll:()=>[], createElement:()=>makeEl(), addEventListener:noop, body:makeEl() };
const ctx = { document, localStorage:{getItem:()=>null,setItem:noop,removeItem:noop}, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean, parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop}, __N:N, __COUNT:COUNT, __TIER:TIER, __GMS:GMS };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx; ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'gm-arc' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }

if (OUT) { fs.writeFileSync(OUT, ctx.__RESULT); process.stderr.write(`arc ${COUNT}p ${TIER} x${N} -> ${OUT}\n`); }
else process.stdout.write(ctx.__RESULT + '\n');

// ---------------- combine / report ----------------
function combine(files) {
  const blobs = files.map(f => JSON.parse(fs.readFileSync(f, 'utf8')));
  // group by tier+count
  const groups = {};
  blobs.forEach(b => { const key = b.tier + '|' + b.count; (groups[key] = groups[key] || { tier:b.tier, count:b.count, games:[] }).games.push(...b.games); });
  const med = arr => { if (!arr.length) return null; const s = arr.slice().sort((a,b)=>a-b); return s[Math.floor((s.length-1)/2)]; };
  const avg = arr => arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0;
  const pct = (a,b) => b ? (100*a/b).toFixed(0)+'%' : '—';

  Object.values(groups).sort((a,b)=>a.tier<b.tier?-1:a.tier>b.tier?1:a.count-b.count).forEach(G => {
    // per player-game, first-occurrence rounds
    const PG = [];   // one entry per (game,player)
    G.games.forEach(g => {
      g.players.forEach(pid => {
        const ev = g.ev.filter(e => e.pid === pid);
        const firstBy = (t, pred) => { const m = ev.filter(e => e.t===t && pred(e)).map(e=>e.r); return m.length ? Math.min(...m) : null; };
        const rec = { rounds:g.rounds,
          brewQ:{}, delQ:{},
          recipesBought: ev.filter(e=>e.t==='recipe'&&!e.free).length,
          recipesFree:   ev.filter(e=>e.t==='recipe'&& e.free).length,
          bldgs:         ev.filter(e=>e.t==='bldg').length,
          firstBldg:     firstBy('bldg', ()=>true),
          // round the player has all 3 dealt exports (2 starters + 3 = 5 recipes): the 3rd export acquisition
          recipeFull: (()=>{ const acq = ev.filter(e=>e.t==='recipe').map(e=>e.r).sort((a,b)=>a-b); return acq.length>=3?acq[2]:null; })(),
          firstRecipe: (()=>{ const acq = ev.filter(e=>e.t==='recipe').map(e=>e.r); return acq.length?Math.min(...acq):null; })(),
        };
        [2,3,4,5].forEach(q => { rec.brewQ[q]=firstBy('brew',e=>e.q===q); rec.delQ[q]=firstBy('deliver',e=>e.q===q&&e.dest!=='hall'?true:e.q===q); });
        // deliveries by dest (count)
        rec.delByDest = {}; ev.filter(e=>e.t==='deliver').forEach(e=>rec.delByDest[e.dest]=(rec.delByDest[e.dest]||0)+1);
        rec.firstNovgorod = firstBy('deliver', e=>e.dest==='novgorod');
        PG.push(rec);
      });
    });
    const npg = PG.length;
    const col = sel => med(PG.map(sel).filter(x=>x!=null));
    const rate = sel => PG.filter(sel).length;

    console.log(`\n================  ${G.tier.toUpperCase()} · ${G.count}p  (${G.games.length} games, ${npg} player-games, avg ${avg(G.games.map(g=>g.rounds)).toFixed(1)} rounds)  ================`);
    // timeline: milestone -> median round
    const miles = [
      ['brew Q2', col(r=>r.brewQ[2])], ['deliver Q2', col(r=>r.delQ[2])],
      ['1st recipe', col(r=>r.firstRecipe)], ['1st building', col(r=>r.firstBldg)],
      ['brew Q3', col(r=>r.brewQ[3])], ['deliver Q3', col(r=>r.delQ[3])],
      ['full recipes (3 exports)', col(r=>r.recipeFull)],
      ['brew Q4', col(r=>r.brewQ[4])], ['deliver Q4', col(r=>r.delQ[4])],
      ['brew Q5', col(r=>r.brewQ[5])], ['deliver Q5', col(r=>r.delQ[5])],
    ].filter(m=>m[1]!=null).sort((a,b)=>a[1]-b[1]);
    const maxR = Math.max(...miles.map(m=>m[1]), 1);
    console.log('  TIMELINE (median round of first occurrence):');
    miles.forEach(m => { const bar = '─'.repeat(Math.round(20*m[1]/maxR)); console.log(`   R${String(m[1]).padStart(2)} ${bar}▶ ${m[0]}`); });
    console.log('  RECIPES:   bought/plyr ' + avg(PG.map(r=>r.recipesBought)).toFixed(2) + '   FREE-via-Novgorod/plyr ' + avg(PG.map(r=>r.recipesFree)).toFixed(2)
      + '   reach full set: ' + pct(rate(r=>r.recipeFull!=null), npg) + ' (median R' + (col(r=>r.recipeFull)||'—') + ')');
    console.log('  CLIMB:     deliver Q4 ' + pct(rate(r=>r.delQ[4]!=null), npg) + '   deliver Q5 ' + pct(rate(r=>r.delQ[5]!=null), npg)
      + '   buildings/plyr ' + avg(PG.map(r=>r.bldgs)).toFixed(2));
    console.log('  ORDER:     1st building median R' + (col(r=>r.firstBldg)||'—') + '  vs  full-recipes median R' + (col(r=>r.recipeFull)||'—')
      + '   → buildings ' + ((col(r=>r.firstBldg)||99) < (col(r=>r.recipeFull)||99) ? 'BEFORE' : 'AFTER') + ' full recipes');
    console.log('  NOVGOROD:  delivered there by ' + pct(rate(r=>(r.delByDest.novgorod||0)>0), npg) + ' of player-games; median 1st visit R' + (col(r=>r.firstNovgorod)||'—')
      + '   avg Novgorod deliveries/plyr ' + avg(PG.map(r=>r.delByDest.novgorod||0)).toFixed(2));
  });
}
