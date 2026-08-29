// AI ladder gate — v4.0 "Bright Beer". Adjacent tiers head-to-head at 2p, seats alternating;
// the gate: every higher tier ≥60% over its neighbour, 0 errors.
// Usage: node playtests/ai-ladder.js [N-per-pair]        (default 40)
// Env:   PAIR=trader,guildmaster runs ONE rung · GM_ROLLS=n fixes playouts/decision (preferred for
//        sharded bulk: a wall-clock budget makes strength depend on how many shards are running)
//        · GUILD_MS/CELLAR_MS lower the MC ms budgets for bulk
//        (bulk convention: GUILD_MS=120 · CELLAR_MS=400; shard the MC rungs across processes)
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '40', 10);
const PAIRS = process.env.PAIR
  ? [process.env.PAIR.split(',')]
  : [['apprentice','journeyman'],['journeyman','trader'],['trader','guildmaster'],['guildmaster','cellarmaster']];

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__GMR>0)GM_ROLLS=__GMR;   // ⚙ fixed playouts/decision — shards stay comparable
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
function __duel(loTier,hiTier,hiSeat){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p,i){p.ai={tier:(i===hiSeat?hiTier:loTier)};});
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)return {error:'runaway',sub:UI.sub};}
  var fr=finalRows();
  return {hiWon:fr.rows[0].p.id===hiSeat,round:S.turn,hiTotal:scorePlayer(S.players[hiSeat]).total,loTotal:scorePlayer(S.players[1-hiSeat]).total};
}
var __OUT=[];
__PAIRS.forEach(function(pr){
  var lo=pr[0],hi=pr[1],wins=0,errs=0,hiSum=0,loSum=0;
  for(var g=0;g<__N;g++){
    var r;
    try{r=__duel(lo,hi,g%2);}catch(e){r={error:String(e&&e.stack||e).slice(0,300)};}
    if(r.error){errs++;if(errs<=2)__OUT.push('  ERR ['+lo+' vs '+hi+']: '+r.error);continue;}
    if(r.hiWon)wins++;hiSum+=r.hiTotal;loSum+=r.loTotal;
  }
  var ok=__N-errs;
  __OUT.push((hi+' > '+lo+': '+(ok?(100*wins/ok).toFixed(1):'—')+'%  ('+wins+'/'+ok+(errs?(' · '+errs+' ERR'):'')+')  avg '+(ok?(hiSum/ok).toFixed(1):0)+' vs '+(ok?(loSum/ok).toFixed(1):0)));
  __OUT.push('__GATE:'+hi+':'+(ok?(100*wins/ok):0)+':'+errs);
});
this.__OUT=__OUT;
`;

const noop = () => {};
const elStub = () => ({ innerHTML:'', textContent:'', value:'', style:{}, disabled:false,
  classList:{ add:noop, remove:noop, toggle:noop, contains:()=>false },
  setAttribute:noop, getAttribute:()=>null, appendChild:noop, removeChild:noop, focus:noop,
  querySelector:()=>null, querySelectorAll:()=>[],
  getBoundingClientRect:()=>({left:0,top:0,right:0,bottom:0,width:0,height:0}) });
const document = { getElementById:()=>elStub(), createElement:()=>elStub(),
  addEventListener:noop, removeEventListener:noop, querySelector:()=>null, querySelectorAll:()=>[],
  body:{ appendChild:noop, contains:()=>false }, head:{ appendChild:noop } };
const store = {};
const localStorage = { getItem:k=>(k in store?store[k]:null), setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];} };

const ctx = { document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop},
  __N:N, __PAIRS:PAIRS,
  __GMR:parseInt(process.env.GM_ROLLS||'0',10),
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
  __CMS:parseInt(process.env.CELLAR_MS||'0',10) };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#ladder' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }

let fail = 0;
console.log('=== v4.0 AI ladder — ' + N + ' games/pair · 2p, seats alternate ===');
ctx.__OUT.forEach(l => {
  if (l.startsWith('__GATE:')) {
    const [, tier, wr, errs] = l.split(':');
    if (+wr < 60 || +errs > 0) fail++;
    return;
  }
  console.log('  ' + l);
});
console.log(fail ? '\n*** LADDER GATE FAILED (' + fail + ' rung(s) <60% or errored) ***' : '\nLADDER GATE: every rung ≥60%, 0 errors.');
process.exit(fail ? 1 : 0);
