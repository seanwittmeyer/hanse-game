// Persona duel — equal-SKILL lane test (v45h). Two Guildmasters, same MC budget,
// different committed lanes: seat A the designer's 'quality' line, seat B the challenger
// persona. Answers "can a seasoned volume/majority/builder player beat a seasoned quality
// player?" — the question the greedy-tier corpora can't (they measure lanes at casual skill).
// Usage: node playtests/persona-duel.js [N]           (default 16)
// Env:   VS=breadth  (the challenger persona: breadth|majority|builder|lifter|search)
//        GUILD_MS=80 (bulk budget — both seats pay it, keep uniform across shards)
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '16', 10);
const VS = process.env.VS || 'breadth';

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__GMS>0)GUILD_MS=__GMS;
var __OUT=[];
var chWins=0,errs=0,rounds=0;
var agg={q:{t:0,d:0,m:0,f:0,b:0},c:{t:0,d:0,m:0,f:0,b:0}};   // totals + parts per side
for(var g=0;g<__N;g++){
  try{
    EXPANSION=false;JOPEN=false;OVERLAND=false;
    S=freshState(2,['P1','P2']);UI={sub:'move'};undoStack=[];
    var chSeat=g%2;   // seats alternate for first-player fairness
    S.players.forEach(function(p,i){
      p.ai={tier:'guildmaster',persona:(i===chSeat?(__VS==='search'?null:__VS):'quality')};});
    var guard=0;
    while(!S.over){aiStep();if(++guard>200000)throw new Error('runaway '+UI.sub);}
    var ch=scorePlayer(S.players[chSeat]),qu=scorePlayer(S.players[1-chSeat]);
    if(ch.total>qu.total)chWins++;             // ties fall to quality (tiebreak noise, rare)
    rounds+=S.turn;
    agg.c.t+=ch.total;agg.c.d+=ch.deliv;agg.c.m+=ch.maj;agg.c.f+=ch.flight;agg.c.b+=ch.bank;
    agg.q.t+=qu.total;agg.q.d+=qu.deliv;agg.q.m+=qu.maj;agg.q.f+=qu.flight;agg.q.b+=qu.bank;
  }catch(e){errs++;if(errs<=2)__OUT.push('  ERR: '+String(e&&e.stack||e).slice(0,200));}
}
var ok=__N-errs;
function row(k,n){var a=agg[k];return 'total '+(a.t/n).toFixed(1)+' = deliv '+(a.d/n).toFixed(1)+' + maj '+(a.m/n).toFixed(1)+' + bank '+(a.b/n).toFixed(1)+' + flight '+(a.f/n).toFixed(1);}
__OUT.push(__VS+' vs quality: challenger wins '+(ok?(100*chWins/ok).toFixed(1):'—')+'%  ('+chWins+'/'+ok+(errs?(' · '+errs+' ERR'):'')+') · rounds avg '+(ok?(rounds/ok).toFixed(1):0));
if(ok){__OUT.push('  '+__VS.padEnd(9)+row('c',ok));__OUT.push('  '+'quality'.padEnd(9)+row('q',ok));}
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
  __N:N, __VS:VS, __GMS:parseInt(process.env.GUILD_MS||'0',10) };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#personaduel' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }
ctx.__OUT.forEach(l => console.log(l));
