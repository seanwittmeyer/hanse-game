// Headless simulation harness for play.html — v8.0 "Brewer & Merchant" (KEY hanse-v80a).
// Drives the CANONICAL engine (never a reimplementation): extracts play.html's <script>
// blocks, stubs the DOM, and runs the engine's OWN AI (aiStep) for every seat.
// The robustness/pace gate: 0 crashes / 0 deadlocks across 2–4p; pace band 10–18 rounds ⚙
// (the v8 identity: 10–15 turns a seat; the first EMPTY supply ends it; MAX_ROUND 18 backstops).
// THE LAW (CLAUDE.md, the second override): USAGE is printed before VALUE — every verb, tile,
// specialist, building and prize reports how often it fired before any lane's win rate is
// read; no part is judged dead unless a persona committed to it ran in the corpus.
// Usage: node playtests/sim.js [N]      (N games per player count; default 100)
// Env:   TIER=apprentice|journeyman|trader|guildmaster|cellarmaster (default journeyman)
//        PERSONAS=1 — the PATHWAYS oracle (brewer · merchant · hall · majority · builder · specialist · breadth; PTIER= reads at any tier)
//        MIX=1 — one persona per seat drawn at random per game (with PERSONAS=1)
//        SUPPLY=n (THE pace dial) · SRCN=n (the Market's Source) · GUILD_MS/CELLAR_MS/GM_ROLLS (MC budgets)
// Sim outputs are NOT committed — results live in chat / distill into DESIGN.md.
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '100', 10);
const TIER = process.env.TIER || 'journeyman';
const PERSONAS = process.env.PERSONAS === '1';
const MIX = process.env.MIX === '1';
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= HEADLESS RUNNER (appended in-scope) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__SRCN>0)SRC_PRIMARY=__SRCN;
if(__GMR>0)GM_ROLLS=__GMR;
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
// ---- v8 USAGE COUNTERS — ground truth via wrapped engine functions, reset per game.
var __V=null;
function __vReset(){__V={work:0,comm:0,commMust:0,commLapse:0,posts:0,postsFree:0,kbuilds:0,raises:0,
  sails:0,sailsUnfull:0,wildSails:0,land:0,landBdie:0,ticksPost:0,ticksBldg:0,inv:0,
  carts:0,yard:0,yardGruit:0,yardRecipe:0,hall:0,hallStars:0,recipesTile:0,specs:0,
  pbuilds:0,flips:0,pacts:0,verbs:{},works:{},wildPort:{},yardZone:{},kbTile:{},prizeLondon:{},
  stranded:0,brews:0,brewsGruit:0};}
var __on=function(){return __V&&!aiSimulating;};
var __doMove=doMove;doMove=function(c){if(__on())__V.work++;return __doMove(c);};
var __enterCommission=enterCommission;enterCommission=function(rt,must){if(__on()){__V.comm++;if(must)__V.commMust++;}return __enterCommission(rt,must);};
var __commPlace=commPlace;commPlace=function(slot){var r=__commPlace(slot);return r;};
var __postPick=postPick;postPick=function(seg){var P=UI.post;var free=P&&P.ctx&&!(P.ctx.thenMaiden);var r=__postPick(seg);if(__on()){__V.posts++;if(free)__V.postsFree++;}return r;};
var __kbuildPick=kbuildPick;kbuildPick=function(k,t){var was=S.sea.kontor[k].slots.filter(function(x){return x;}).length;var r=__kbuildPick(k,t);
  if(__on()&&S.sea.kontor[k].slots.filter(function(x){return x;}).length>was){__V.kbuilds++;__V.kbTile[t]=(__V.kbTile[t]||0)+1;}return r;};
var __raiseApply=raiseApply;raiseApply=function(p,t){if(__on())__V.raises++;return __raiseApply(p,t);};
var __sailShip=sailShip;sailShip=function(slot,cid){var t=S.slots[slot];var full=t&&(t.load||[]).length>=sailCap(t);var wild=t&&t.dest==='wild';var d=t&&shipDest(t);
  var before={};SEG_KEYS.forEach(function(k){before[k]=Object.assign({},S.sea.posts[k]);});
  var r=__sailShip(slot,cid);
  if(__on()&&!S.slots[slot]){__V.sails++;if(!full)__V.sailsUnfull++;if(wild){__V.wildSails++;__V.wildPort[d]=(__V.wildPort[d]||0)+1;}
    SEG_KEYS.forEach(function(k){Object.keys(S.sea.posts[k]).forEach(function(pid){if((S.sea.posts[k][pid]||0)>(before[k][pid]||0))__V.ticksPost++;});});}
  return r;};
var __landDeliver=landDeliver;landDeliver=function(lp,L,Lg){var b0=0;(S.sea.kontor[Lg.dest].slots||[]).forEach(function(x){if(x)b0+=x.face;});
  var r=__landDeliver(lp,L,Lg);
  if(__on()){__V.land++;var d=lp.delivered[lp.delivered.length-1];if(d&&d.bdie)__V.landBdie+=d.bdie;
    var b1=0;(S.sea.kontor[Lg.dest].slots||[]).forEach(function(x){if(x)b1+=x.face;});__V.ticksBldg+=(b1-b0);}
  return r;};
var __yardLand=yardLand;yardLand=function(p,vi){var c=p.vessels[vi];var r=__yardLand(p,vi);
  if(__on()){__V.carts++;__V.yard++;if(c&&c.style==='gruit')__V.yardGruit++;var z=yardZone(S.yard.length-1);__V.yardZone[z]=(__V.yardZone[z]||0)+1;}return r;};
var __hallPresent=hallPresent;hallPresent=function(p,vi){var r=__hallPresent(p,vi);
  if(__on()){__V.carts++;__V.hall++;var d=p.delivered[p.delivered.length-1];if(d)__V.hallStars+=d.val;}return r;};
var __yardPick=yardPick;yardPick=function(ch,st){var n0=(function(){var b=(UI.pendingYard||[])[0];return b?S.players[b.pid].recipes.length:0;})();var b=(UI.pendingYard||[])[0];
  var r=__yardPick(ch,st);if(__on()&&b&&S.players[b.pid].recipes.length>n0)__V.yardRecipe++;return r;};
var __recipeGainPick=recipeGainPick;recipeGainPick=function(st){var p=cur();var n0=p.recipes.length;var r=__recipeGainPick(st);if(__on()&&p.recipes.length>n0)__V.recipesTile++;return r;};
var __grantUpgrade=grantUpgrade;grantUpgrade=function(p,k){var n0=p.upgrades.length;var r=__grantUpgrade(p,k);if(__on()&&p.upgrades.length>n0)__V.specs++;return r;};
var __placePrivOn=placePrivOn;placePrivOn=function(slot){var b0=privAt(slot);var r=__placePrivOn(slot);if(__on()&&!b0&&privAt(slot))__V.pbuilds++;return r;};
var __pbuildPick=pbuildPick;pbuildPick=function(kind,st){var r=__pbuildPick(kind,st);if(__on()&&kind==='flip')__V.flips++;return r;};
var __enterPact=enterPact;enterPact=function(slot,rt){if(__on())__V.pacts++;return __enterPact(slot,rt);};
var __fireCaskAct=fireCaskAct;fireCaskAct=function(act,rt){if(__on())__V.verbs[act]=(__V.verbs[act]||0)+1;return __fireCaskAct(act,rt);};
var __brewCommit=brewCommit;brewCommit=function(st,v){var p=cur();var n0=p._brews||0;var r=__brewCommit(st,v);if(__on()&&(p._brews||0)>n0){__V.brews++;if(st==='gruit')__V.brewsGruit++;}return r;};
var __bmGo=bmGo;bmGo=function(k,rt,free,pid){if(__on()&&free&&rt==='benefitcont')__V.prizeLondon[k]=(__V.prizeLondon[k]||0)+1;return __bmGo(k,rt,free,pid);};
var __loadCommit=loadCommit;loadCommit=function(sid,vi){var bk=bKeyAt(sid);var r=__loadCommit(sid,vi);if(__on()&&bk)__V.works[bk]=(__V.works[bk]||0)+1;return r;};
function __runGame(n,__POFF){
  __POFF=__POFF||0;
  __vReset();
  S=freshState(n,['P1','P2','P3','P4','P5'].slice(0,n));UI={sub:'starter'};undoStack=[];
  S.players.forEach(function(p,i){
    var ps=null;if(__PERSONAS)ps=__MIX?AI_PERSONAS[Math.floor(Math.random()*AI_PERSONAS.length)]:AI_PERSONAS[(i+__POFF)%AI_PERSONAS.length];
    p.ai=__PERSONAS?{tier:__PTIER,persona:ps}:{tier:__TIER};
    if(__SUPPLY>0)p.supply=__SUPPLY;});
  var guard=0;
  while(!S.over){
    aiStep();
    if(++guard>250000)return {error:'runaway (guard tripped)',round:S.turn,sub:UI.sub};
  }
  // the eleven-dice identity at the end
  var idOK=S.players.every(function(p){return p.supply+diceOnBoard(p)===(SUPPLY_DICE+1)&&p.supply>=0;});
  S.players.forEach(function(p){p.vessels.forEach(function(c){if(c&&caskReady(c))__V.stranded++;});});
  var fr=finalRows();var rows=fr.rows;
  var byDest={london:0,bergen:0,novgorod:0};
  S.players.forEach(function(p){p.delivered.forEach(function(d){if(!d.yard&&!d.hall)byDest[d.dest]=(byDest[d.dest]||0)+1;});});
  var specHeld={};S.players.forEach(function(p){p.upgrades.forEach(function(k){specHeld[k]=(specHeld[k]||0)+1;});});
  var specWin={};rows[0].p.upgrades.forEach(function(k){specWin[k]=1;});
  return {round:S.turn,trigger:S.endReason||'?',sailed:S.sailed,idOK:idOK,
    winSeat:rows[0].p.id,
    laneSeats:S.players.map(function(q){var sc=scorePlayer(q);
      return {ps:(q.ai&&q.ai.persona)||null,total:sc.total,flight:flightBeers(q),land:(q.delivered||[]).length,count:qualityCount(q),sea:sc.sea,hall:sc.hall,maj:sc.maj,wharf:sc.wharf};}),
    winTotal:rows[0].sc.total,secondTotal:rows[1]?rows[1].sc.total:0,
    marg:(function(){var a=rows[0],b=rows[1];if(!b)return null;
      return {d:a.sc.deliv-b.sc.deliv,h:a.sc.hall-b.sc.hall,sea:(a.sc.sea+a.sc.docked)-(b.sc.sea+b.sc.docked),w:a.sc.wharf-b.sc.wharf,mj:a.sc.maj-b.sc.maj,
        fl:a.sc.flight-b.sc.flight,sp:(a.sc.bank+a.sc.guild)-(b.sc.bank+b.sc.guild)};})(),
    counts:S.players.map(function(p){return qualityCount(p);}),
    supplyLeft:S.players.map(function(p){return p.supply;}),
    hallDie:S.hall.die,hallFilled:S.hall.places.filter(function(x){return x;}).length,
    chains:S.players.reduce(function(a,p){return a+FAR.filter(function(k){return hasChain(p,k);}).length;},0),
    seaShare:(function(){var t=0,s=0;S.players.forEach(function(p){var sc=scorePlayer(p);t+=sc.total;s+=sc.sea+sc.docked;});return t?s/t:0;})(),
    docked:S.players.reduce(function(a,p){return a+dockedPips(p);},0),
    invHeld:S.players.reduce(function(a,p){return a+p.invites;},0),
    byDest:byDest,specHeld:specHeld,specWin:specWin,
    V:__V,
    parts:rows.map(function(r){return {land:r.sc.deliv,hall:r.sc.hall,sea:r.sc.sea,docked:r.sc.docked,wharf:r.sc.wharf,maj:r.sc.maj,flight:r.sc.flight,spec:r.sc.bank+r.sc.guild,total:r.sc.total};})};
}
var __RESULTS={};
[2,3,4].forEach(function(n){
  __RESULTS[n]=[];
  for(var g=0;g<__N;g++){
    var r;
    try{r=__runGame(n,g);}catch(e){r={error:String(e&&e.stack||e).slice(0,600),round:(typeof S!=='undefined'&&S)?S.turn:0,sub:UI&&UI.sub};}
    __RESULTS[n].push(r);
  }
});
this.__RESULTS=__RESULTS;
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
const ctx = {
  document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop,
  lucide:{ createIcons:noop },
  __N:N, __TIER:TIER,
  __SUPPLY:parseInt(process.env.SUPPLY||'0',10),
  __SRCN:parseInt(process.env.SRCN||'0',10),
  __PERSONAS:PERSONAS, __MIX:MIX,
  __PTIER:process.env.PTIER||'trader',
  __GMR:parseInt(process.env.GM_ROLLS||'0',10),
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
  __CMS:parseInt(process.env.CELLAR_MS||'0',10),
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+driver' });
} catch (e) {
  console.error('RUN ERROR:', e && e.stack || e);
  process.exit(1);
}

const R = ctx.__RESULTS;
const fmt=(x,d=1)=>Number(x).toFixed(d);
const pct=(a,b)=>fmt(100*a/Math.max(1,b),1)+'%';
console.log('=== hanse v8.0 sim — '+N+' games/count · '+(PERSONAS?('PATHWAYS ('+(MIX?'mixed':'round-robin')+' personas, '+(process.env.PTIER||'trader')+')'):('tier '+TIER))+' ===');
let anyErr=0,anyId=0;
[2,3,4].forEach(n=>{
  const arr=R[n]; const errs=arr.filter(r=>r.error); const ok=arr.filter(r=>!r.error);
  anyErr+=errs.length;
  if(errs.length)console.log(`\n-- ${n}p ERRORS (${errs.length}) --\n`+errs.slice(0,3).map(e=>e.error+' @round '+e.round+(e.sub?' sub='+e.sub:'')).join('\n'));
  if(!ok.length){console.log(`\n== ${n}p: ALL FAILED ==`);return;}
  const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
  const rounds=ok.map(r=>r.round);
  const within=ok.filter(r=>r.round>=10&&r.round<=18).length;
  const trig={};ok.forEach(r=>trig[r.trigger]=(trig[r.trigger]||0)+1);
  const seat={};ok.forEach(r=>seat[r.winSeat]=(seat[r.winSeat]||0)+1);
  const idBad=ok.filter(r=>!r.idOK).length;anyId+=idBad;
  console.log(`\n== ${n}p · ${ok.length} ok / ${errs.length} err · eleven-dice identity ${idBad?('BROKEN in '+idBad):'holds'} ==`);
  console.log(`rounds avg ${fmt(avg(rounds))} (min ${Math.min(...rounds)} max ${Math.max(...rounds)}) · in 10–18 band ${pct(within,ok.length)}`);
  console.log(`triggers: ${Object.keys(trig).map(k=>k+' '+pct(trig[k],ok.length)).join(' · ')} · Ships sailed ${fmt(avg(ok.map(r=>r.sailed)))} · supply left at end avg ${fmt(avg(ok.map(r=>avg(r.supplyLeft))))}`);
  console.log(`winner total avg ${fmt(avg(ok.map(r=>r.winTotal)))} · margin avg ${fmt(avg(ok.map(r=>r.winTotal-r.secondTotal)))} · seat wins ${Object.keys(seat).map(s=>'P'+(+s+1)+' '+pct(seat[s],ok.length)).join(' ')}`);
  { const M=ok.map(r=>r.marg).filter(Boolean);
    if(M.length){const m=k=>fmt(avg(M.map(x=>x[k])));
      console.log(`  margin decomposition (winner − 2nd): landings ${m('d')} · hall ${m('h')} · pips ${m('sea')} · wharf ${m('w')} · majorities ${m('mj')} · flight ${m('fl')} · specialists ${m('sp')}`);
      const marg=ok.map(r=>r.winTotal-r.secondTotal).sort((a,b)=>a-b);
      const q=f=>marg[Math.min(marg.length-1,Math.floor(f*marg.length))];
      console.log(`  margin shape: median ${q(0.5)} · p90 ${q(0.9)} · blowouts (>25★) ${pct(marg.filter(x=>x>25).length,marg.length)} · close (≤10★) ${pct(marg.filter(x=>x<=10).length,marg.length)}`);}}
  const us={};ok.forEach(r=>Object.keys(r.V).forEach(k=>{if(typeof r.V[k]==='number')us[k]=(us[k]||0)+r.V[k];}));
  Object.keys(us).forEach(k=>us[k]/=ok.length);
  const sumObj=(key)=>{const o={};ok.forEach(r=>Object.keys(r.V[key]||{}).forEach(k=>o[k]=(o[k]||0)+r.V[key][k]));return o;};
  console.log(`USAGE/game — WORK ${fmt(us.work)} · brews ${fmt(us.brews)} (Gruit ${fmt(us.brewsGruit)}) · commissions ${fmt(us.comm)} (must ${fmt(us.commMust)}) · posts ${fmt(us.posts)} (by bonus/prize ${fmt(us.postsFree)}) · Kontor builds ${fmt(us.kbuilds)} [${Object.entries(sumObj('kbTile')).map(([k,v])=>k+' '+fmt(v/ok.length)).join(' · ')}] · RAISEs ${fmt(us.raises)}`);
  console.log(`  sails ${fmt(us.sails)} (unfull ${fmt(us.sailsUnfull)} · wild ${fmt(us.wildSails)}: ${Object.entries(sumObj('wildPort')).map(([k,v])=>k+' '+fmt(v/ok.length)).join(' · ')||'—'}) · landings ${fmt(us.land)} (building die share ${fmt(us.landBdie)}★) · post ticks ${fmt(us.ticksPost)} · building ticks ${fmt(us.ticksBldg)}`);
  console.log(`  carts ${fmt(us.carts)}: the yard ${fmt(us.yard)} (Gruit ${fmt(us.yardGruit)} · recipes ${fmt(us.yardRecipe)} · zones ${Object.entries(sumObj('yardZone')).map(([k,v])=>k+' '+fmt(v/ok.length)).join(' · ')||'—'}) · the hall ${fmt(us.hall)} (${fmt(us.hallStars)}★; the hall die ends ${fmt(avg(ok.map(r=>r.hallDie)))}) · ⚜ held at end ${fmt(avg(ok.map(r=>r.invHeld)))}`);
  console.log(`  private builds ${fmt(us.pbuilds)} · flips ${fmt(us.flips)} · building stops fired ${fmt(us.pacts)} · specialists seated ${fmt(us.specs)} · recipes by bonus ${fmt(us.recipesTile)} · London's prize: ${Object.entries(sumObj('prizeLondon')).map(([k,v])=>k+' '+fmt(v/ok.length)).join(' · ')||'—'}`);
  console.log(`  cask bonuses fired: ${Object.entries(sumObj('verbs')).map(([k,v])=>k+' '+fmt(v/ok.length)).join(' · ')||'—'} · Works on a load: ${Object.entries(sumObj('works')).map(([k,v])=>k+' '+fmt(v/ok.length)).join(' · ')||'—'}`);
  console.log(`  the count at end avg ${fmt(avg(ok.map(r=>avg(r.counts))))} (max ${Math.max(...ok.map(r=>Math.max(...r.counts)))}) · chains held ${fmt(avg(ok.map(r=>r.chains)))} · Ready casks stranded ${fmt(us.stranded)} · sea pips' share of the score ${pct(avg(ok.map(r=>r.seaShare)),1)} · docked pips ${fmt(avg(ok.map(r=>r.docked)))}`);
  const dd={london:0,bergen:0,novgorod:0};ok.forEach(r=>Object.keys(dd).forEach(k=>dd[k]+=r.byDest[k]||0));
  const dsum=Object.values(dd).reduce((a,b)=>a+b,0)||1;
  console.log(`  landings by Kontor: ${Object.keys(dd).map(k=>k+' '+pct(dd[k],dsum)).join(' · ')}`);
  { const held={},won={};ok.forEach(r=>{Object.keys(r.specHeld).forEach(k=>held[k]=(held[k]||0)+r.specHeld[k]);Object.keys(r.specWin).forEach(k=>won[k]=(won[k]||0)+1);});
    console.log(`  specialists (seated → share of wins): ${Object.keys(held).map(k=>k+' '+held[k]+'→'+pct(won[k]||0,held[k])).join(' · ')||'—'}`);}
  if(PERSONAS){
    const lane={}; ok.forEach(r=>{r.laneSeats.forEach(sr=>{const L=lane[sr.ps]=lane[sr.ps]||{n:0,w:0,tot:0,fl:0,ld:0,ct:0,sea:0,hall:0,maj:0,wharf:0};
      L.n++;L.tot+=sr.total;L.fl+=sr.flight;L.ld+=sr.land;L.ct+=sr.count;L.sea+=sr.sea;L.hall+=sr.hall;L.maj+=sr.maj;L.wharf+=sr.wharf;
      if(sr.total===r.winTotal)L.w++;});});
    console.log('PATHWAYS — VALUE by lane (read only after the USAGE above): '+Object.keys(lane).map(k=>`${k} ${pct(lane[k].w,lane[k].n)}`).join(' · '));
    console.log('  per-lane avg: '+Object.keys(lane).map(k=>`${k} ★${fmt(lane[k].tot/lane[k].n)} (count ${fmt(lane[k].ct/lane[k].n)} · sea ${fmt(lane[k].sea/lane[k].n)} · hall ${fmt(lane[k].hall/lane[k].n)} · maj ${fmt(lane[k].maj/lane[k].n)} · wharf ${fmt(lane[k].wharf/lane[k].n)} · ${fmt(lane[k].ld/lane[k].n)} landed · flight ${fmt(lane[k].fl/lane[k].n)})`).join(' · '));
  }
});
console.log('\nGATE: '+(anyErr?('❌ '+anyErr+' errored games'):'0 crashes / 0 deadlocks.')+(anyId?(' ❌ the eleven-dice identity broke in '+anyId+' games'):' · the eleven-dice identity holds.'));
process.exit((anyErr||anyId)?1:0);
