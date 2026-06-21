// Line-usage probe — answers "how often do the bots actually ACTIVATE each line?" (vs which station the
// worker sits on). Hooks activateLine() (every public line) + tollFloor() (the private Floor alternative),
// tallies the role-PAIR worked each turn, and derives per-station fire shares. Base game, mirror match.
// Usage: PLAYHTML=/tmp/play-baseline.html TIER=gm NP=3 N=20 node playtests/swap/line-usage.js
'use strict';
const fs = require('fs'), vm = require('vm'), path = require('path');
const PLAYHTML = process.env.PLAYHTML || path.join(__dirname, '..', '..', 'play.html');
const TIER = (process.env.TIER || 'gm').toLowerCase();
const NP = parseInt(process.env.NP || '3', 10);
const N = parseInt(process.env.N || '20', 10);
const TAG = process.env.TAG || (PLAYHTML.includes('baseline') ? 'base' : PLAYHTML.includes('swap') ? 'swap' : 'cur');
const tierName = TIER === 'cm' ? 'cellarmaster' : 'guildmaster';
const html = fs.readFileSync(PLAYHTML, 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
GUILD_MS=__GMS||100;GUILD_MIN=1;
if(typeof CELLAR_MS!=='undefined'){CELLAR_MS=__CMS||70;CELLAR_MIN=1;CELLAR_CAP=600;}
if(typeof EXPANSION!=='undefined')EXPANSION=false;
if(typeof JOPEN!=='undefined')JOPEN=false;
if(typeof OVERLAND!=='undefined')OVERLAND=false;
var __LC={}, __floor=0, __lines=0, __turns=0;
function __real(){return typeof aiSimulating==='undefined'||!aiSimulating;}   // exclude GM/CM Monte-Carlo rollout turns — count only the REAL game
var __oAL=activateLine; activateLine=function(lk){ if(__real()){var pr=LINES[lk].cells.map(function(c){return CELLROLE[c];}).slice().sort().join('+'); __LC[pr]=(__LC[pr]||0)+1; __lines++;} return __oAL(lk); };
if(typeof tollFloor!=='undefined'){ var __oTF=tollFloor; tollFloor=function(){ if(__real())__floor++; return __oTF.apply(this,arguments); }; }
if(typeof endTurn!=='undefined'){ var __oET=endTurn; endTurn=function(){ if(__real())__turns++; return __oET.apply(this,arguments); }; }
for(var g=0; g<__N; g++){
  S=freshState(__NP,['P1','P2','P3','P4','P5'].slice(0,__NP));
  UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p){p.ai={tier:__TIER,persona:null};});
  var guard=0; while(!S.over){aiStep();if(++guard>400000)break;}
}
globalThis.__OUT={LC:__LC, floor:__floor, lines:__lines, turns:__turns, games:__N, KEY:KEY};
`;
const noop = () => {};
const makeEl = () => { const el = { innerHTML:'',textContent:'',value:'',style:{},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},setAttribute:noop,getAttribute:()=>null,appendChild:noop,addEventListener:noop,removeEventListener:noop }; el.querySelector=()=>makeEl(); el.querySelectorAll=()=>[]; el.closest=()=>null; return el; };
const document = { getElementById:()=>makeEl(), querySelector:()=>makeEl(), querySelectorAll:()=>[], createElement:()=>makeEl(), addEventListener:noop, body:makeEl() };
const store = {}; const localStorage = { getItem:k=>(k in store?store[k]:null), setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];} };
const ctx = { document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean, parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop}, __TIER:tierName, __NP:NP, __N:N, __GMS:parseInt(process.env.GUILD_MS||'0',10), __CMS:parseInt(process.env.CELLAR_MS||'0',10) };
ctx.window=ctx; ctx.globalThis=ctx; ctx.self=ctx; ctx.addEventListener=noop; ctx.removeEventListener=noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename:'play.html#engine+line-usage' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }
const R = ctx.__OUT;
const fmt = (x,d=1)=>Number(x).toFixed(d);
const totalLines = R.lines || 1;
// station fire share: each line fires BOTH its roles
const stn = {Source:0,Brew:0,Age:0,Ship:0};
Object.keys(R.LC).forEach(pr=>{ pr.split('+').forEach(role=>{ stn[role]=(stn[role]||0)+R.LC[pr]; }); });
const pairs = Object.keys(R.LC).sort((a,b)=>R.LC[b]-R.LC[a]);
console.log(`\n[${TAG} | ${tierName} | ${NP}p | ${R.games} games | KEY ${R.KEY}]`);
console.log(`  public-line activations: ${R.lines}  (Floor turns: ${R.floor})   avg lines/game ${fmt(R.lines/R.games)}`);
console.log('  LINE (role-pair) usage — share of public lines worked:');
pairs.forEach(pr=>console.log(`    ${pr.padEnd(14)} ${String(R.LC[pr]).padStart(5)}  ${fmt(100*R.LC[pr]/totalLines).padStart(5)}%`));
console.log('  STATION fire share (each line fires both its stations):');
['Source','Brew','Age','Ship'].forEach(s=>console.log(`    ${s.padEnd(8)} ${fmt(100*stn[s]/(totalLines*2)).padStart(5)}%`));
