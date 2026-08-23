// Headless simulation harness for play.html — v4.1 "Counting House" (KEY hanse-v41).
// Drives the CANONICAL engine (never a reimplementation): extracts play.html's <script> blocks,
// stubs the DOM, and runs the engine's OWN AI (aiStep) for every seat. The robustness/pace gate:
// 0 crashes / 0 deadlocks across 2–4p, rounds in the 12–25 band, trigger split reported.
// Usage: node playtests/sim.js [N]      (N games per player count; default 100)
// Env:   TIER=apprentice|journeyman|trader|guildmaster|cellarmaster (default journeyman)
//        PERSONAS=1 — the v4 PATHWAYS oracle: trader seats committed round-robin to the four lanes
//                     (majority · lifter · builder · breadth); per-lane win rates reported
//        POOL=n sweeps the dice pool (THE pace dial) · GUILD_MS/CELLAR_MS lower the MC budgets
//        ALTSRC=n / ALTAGE=n sweep the v5.0 alternate-station dials (override only when set)
//        STAPLE=n — the v5.2 Staple House premium ⚙ (override only when set; the +2/+4 A/B)
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '100', 10);
const TIER = process.env.TIER || 'journeyman';
const PERSONAS = process.env.PERSONAS === '1';
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= HEADLESS RUNNER (appended in-scope) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__POOL>0)PRES_POOL=__POOL;
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
if(__JIT>0){['journeyman','trader'].forEach(function(t){AI_TIERS[t].noise=__JIT;});}   // JITTER=0.15 — chaos: greedy tiers take a random legal action that often (strategy-variance probe)
// ---- v45c VERB-USAGE COUNTERS — the "underutilized systems" dashboard. Wraps the engine's
// own functions (function declarations are reassignable) so the counts are ground truth,
// not policy inference. Reset per game; averaged in the summary.
var __U=null;
function __uReset(){__U={manifests:0,rack:0,assayUp:0,assayDown:0,toll:0,kilnLift:0,bondedSail:0,bmSeat:0,bmTick:0,
  victual:0,chandler:0,scargo:0,coopSail:0,customsBoard:0,tideBurn:0,   // v5.4: Public Works taken by the tide (a sail from their slot)
  comm_skute:0,comm_cog:0,comm_hulk:0,commG:0,built:0,bldgTicks:0,built_survey:0,built_prize:0,
  matured:0,ropeX:0,ventL1:0,ventL2:0,vflip:0,   // v5.2/v5.5: Ropewalk cross-quay loads · Venture L1 placements · L2 overbuilds · FLIPS (the same tile turned over)
  bshiftUp:0,bshiftDown:0,vpubGold:0,vpubStep:0,brewCrash:0,glut:0,prizeStars:0,   // v5.3: the bourse — manipulation shifts · public-line freebies · brew crashes
  pours:0,judged:0,slams:0,invE:0,invS:0,tilesWon:0};}   // v4.17 Tastings — pours · benches convened · door-slams · the ⚜ economy   // v4.9: builds + mason-die ticks   // v4.6 + the ship-shapers, instrumented at last (the AGRICOLA-STUDY B4 item) · v4.8: commissions by hull + grain paid (the 2/1/0 A/B)
var __uOn=function(){return __U&&!aiSimulating;};   // never count MC-playout echoes
var __manClaim=manClaim;manClaim=function(lp,gi,li){if(__uOn())__U.manifests++;return __manClaim(lp,gi,li);};   // v5.0: Manifest lines claimed
var __invGrant=invGrant;invGrant=function(p,src){if(__uOn())__U.invE++;return __invGrant(p,src);};   // v5.0: every ⚜ faucet (Manifest claims · the Chancery · dials)
// v4.17 TASTINGS counters — pours · benches convened · door-slams · the ⚜ economy
var __pourDo=pourDo;pourDo=function(vi,ci){var ct=S&&S.tastings&&(S.tastings.open||[])[ci];
  var pre=ct?ct.bench.length:0;var lead=ct?benchLeader(ct):null;var p=cur();
  var r=__pourDo(vi,ci);
  if(__uOn()&&r){__U.pours++;__U.invS++;
    if(pre===benchSize(ct)-1){__U.judged++;if(lead&&p&&lead.pid===p.id)__U.slams++;}}
  return r;};
var __judgeT=judgeTasting;judgeTasting=function(ci){var r=__judgeT(ci);if(__uOn())__U.tilesWon++;return r;};
var __rackPick=rackPick;rackPick=function(vi){var had=!!UI.rack;var r=__rackPick(vi);if(__uOn()&&had&&!UI.rack)__U.rack++;return r;};
var __assayPick=assayPick;assayPick=function(vi,dir){var had=!!UI.assay;var r=__assayPick(vi,dir);if(__uOn()&&had&&!UI.assay)__U[(dir===-1)?'assayDown':'assayUp']++;return r;};
var __loadCommit=loadCommit;loadCommit=function(shipSlot,vi){var p=cur();var bk=bKeyAt(shipSlot);
  // v5.3b: the TOLL BENCH — a load here queues the loader's ±1 Bourse shift. (The counter used to
  // watch bankO, the retired stamp's ★ payout, so it read 0 forever; it now counts the bench firing,
  // which is what the DESIGN §10 watch asks: does the Tollhouse finally see traffic?)
  var toll=bk==='tollhouse'&&Object.keys(S.bourse||{}).length>0;
  var c=p&&p.vessels[vi];var lift=(bk==='maltkiln'||bk==='bonded')&&c&&c.die<6&&caskReady(c);
  var sh0=S.slots[shipSlot];var below=sh0&&c&&bk==='customs'&&boardDie(c,shipSlot)<DEST[sh0.dest].gate;   // boarded only through the Customs relief
  var rw=UI.load&&UI.load.rwFrom;   // v5.2: this IS the Ropewalk's cross-quay load
  var r=__loadCommit(shipSlot,vi);
  if(__uOn()&&p&&c&&!p.vessels[vi]){if(lift)__U.kilnLift++;if(toll)__U.toll++;
    if(bk==='victual')__U.victual++;if(below)__U.customsBoard++;if(rw)__U.ropeX++;}return r;};
var __prizeStars=prizeStars;prizeStars=function(lp,dest,why){if(__uOn())__U.prizeStars++;return __prizeStars(lp,dest,why);};   // v5.6: prizes taken as ★
var __sailShip=sailShip;sailShip=function(slot,creditId){var bonded=bKeyAt(slot)==='bonded';
  var t9=S.slots[slot];var gl={};if(t9)(t9.load||[]).forEach(function(L){if(tracked(L.style))gl[L.style]=1;});
  if(__uOn())__U.glut+=Object.keys(gl).length;   // v5.6 THE GLUT — one step per beer TYPE per sail
  var burn=!!bKeyAt(slot);   // v5.4 THE TIDE — every Public Work at the slot sails with the Ship
  var t0=S.slots[slot];var over=t0&&(t0.load||[]).length>SHIP_CAP[t0.ship];   // a Cooperage berth actually used
  var sc=0;if(t0){var seen={};(t0.load||[]).forEach(function(L){var o=S.players[L.owner];
    if(o&&o.id!==S.active&&hasUpgrade(o,'supercargo')&&!seen[o.id]){seen[o.id]=1;sc++;}});}
  var r=__sailShip(slot,creditId);
  if(__uOn()){if(bonded)__U.bondedSail++;if(over)__U.coopSail++;__U.scargo+=sc;if(burn)__U.tideBurn++;}return r;};
var __flipVenture=flipVenture;flipVenture=function(slot,pid){var r=__flipVenture(slot,pid);if(__uOn()&&r)__U.vflip++;return r;};   // v5.5: the FLIP — a standing L1 turns over in place, no hand tile spent
var __bourseShift=bourseShift;bourseShift=function(beer,d){var r=__bourseShift(beer,d);   // v5.3: brew crashes vs manipulation shifts (arrival rises stay uncounted — the tide, not a hand)
  if(__uOn()&&r){if(__bsBrew&&r<0)__U.brewCrash++;else if(__bsMan){if(r>0)__U.bshiftUp++;else __U.bshiftDown++;}}return r;};
var __bsMan=false,__bsBrew=false;
var __bshiftPick=bshiftPick;bshiftPick=function(sel){__bsMan=true;var r=__bshiftPick(sel);__bsMan=false;return r;};
var __afterSail=afterSail;afterSail=function(rt){__bsMan=true;var r=__afterSail(rt);__bsMan=false;return r;};   // the Bergen AI rider shifts directly inside afterSail
var __brewCommit=brewCommit;brewCommit=function(style,verb){var m0=__bsMan;__bsMan=false;__bsBrew=true;var r=__brewCommit(style,verb);__bsBrew=false;__bsMan=m0;return r;};
var __resolveStop=resolveStop;resolveStop=function(i){var st=UI.stops&&UI.stops[i];var pk=null;
  if(st&&st.kind==='vpub'){var b=vAt(st.slot);pk=b&&vFace(b).pub;}
  var r=__resolveStop(i);
  if(__uOn()&&pk){if(pk==='vgold')__U.vpubGold++;else if(pk==='vstep')__U.vpubStep++;}return r;};
var __commitVenture=commitVenture;commitVenture=function(slot,key,lvl,pid){var r=__commitVenture(slot,key,lvl,pid);
  if(__uOn())__U[lvl===2?'ventL2':'ventL1']++;return r;};   // v5.2: Venture placements / climbs
var __chandlerSwap=chandlerSwap;chandlerSwap=function(dir){var p=cur();var u0=p&&p.chUsed;var r=__chandlerSwap(dir);
  if(__uOn()&&p&&!u0&&p.chUsed)__U.chandler++;return r;};
var __grantUpgrade=grantUpgrade;grantUpgrade=function(p,k){var had=hasUpgrade(p,k);var r=__grantUpgrade(p,k);
  if(__uOn()&&k==='braumeister'&&!had&&hasUpgrade(p,k))__U.bmSeat++;return r;};
var __bmTick=braumeisterTick;braumeisterTick=function(p){var d0=vesselDice(p);var r=__bmTick(p);
  if(__uOn()&&vesselDice(p)>d0)__U.bmTick++;return r;};
// v5.1r: builds by CHANNEL — chosen (the survey load-bonus) vs prize (London/Bergen benefit).
// beginPlaceBldg carries the channel in rt ('benefitcont' = the prize continuation); aiBenefitAuto
// is the AI's direct prize path (commitBldg without a beginPlaceBldg head).
var __bldChan=null;
var __beginPlaceBldg=beginPlaceBldg;beginPlaceBldg=function(key,owner,rt,feePaid){
  __bldChan=(rt==='benefitcont')?'prize':'survey';return __beginPlaceBldg(key,owner,rt,feePaid);};
var __aiBenefitAuto=aiBenefitAuto;aiBenefitAuto=function(lp,dest){__bldChan='prize';var r=__aiBenefitAuto(lp,dest);__bldChan=null;return r;};
var __commitBldg=commitBldg;commitBldg=function(slot,key,pid,feePaid){var r=__commitBldg(slot,key,pid,feePaid);
  if(__uOn()&&pid!=null&&S.buildings[slot]&&S.buildings[slot].owner===pid){__U.built++;
    __U[(__bldChan==='prize')?'built_prize':'built_survey']++;__bldChan=null;}return r;};
var __bldgTick=bldgTick;bldgTick=function(slot){var b=S.buildings[slot];var d0=b&&b.die;var r=__bldgTick(slot);
  if(__uOn()&&b&&!b.v&&b.die>d0){__U.bldgTicks++;
    if(!S.buildings[slot])__U.matured++;}   // v5.2: the tick reached 6 — the investment matured (the slot emptied)
  return r;};
var __commPlace=commPlace;commPlace=function(slot){var d=UI.comm;var sn=(d&&d.idx!=null)?(S.shipDisplay||[])[d.idx]:null;
  var p=cur();var g0=p?p.grain:0;var had=!!S.slots[slot];
  var r=__commPlace(slot);
  if(__uOn()&&sn&&!had&&S.slots[slot]&&S.slots[slot].type==='ship'){
    __U['comm_'+sn.ship]=(__U['comm_'+sn.ship]||0)+1;__U.commG+=(g0-(p?p.grain:0));}   // grain delta inside commPlace = the fee actually paid (Shipwright waivers read 0)
  return r;};
function __runGame(n,__POFF){
  __POFF=__POFF||0;
  __uReset();
  EXPANSION=__EXP;JOPEN=__JOP;HALLEXP=__HALL;OVERLAND=false;   // v4.14/v4.15: the toggles ride env (default off — the base gate is unchanged)
  // v4.17 Tasting dials — override ONLY when the env var is set (a ruled default is never
  // silently forced off): STARTINV=n · TSTARS="free:5,dark:7,..." (1st ★ by category) ·
  // BENCH="2,3,3" · EJUDGE=void|judge · INV_CASK=w · INV_BLDG=0|1
  if(__SINV!=='')START_INV=parseInt(__SINV,10)||0;
  if(__TSTARS!=='')__TSTARS.split(',').forEach(function(seg){var m=seg.split(':');
    CONTESTS.forEach(function(t){if(t.cat===m[0]&&+m[1]>0)t.s1=parseInt(m[1],10);});});
  if(__TBENCH!=='')CONTEST_BENCH=__TBENCH.split(',').map(function(v){return parseInt(v,10)||3;});
  if(__TCATB!=='')__TCATB.split(',').forEach(function(seg){var m=seg.split(':');
    CONTESTS.forEach(function(t){if(t.cat===m[0]&&+m[1]>0)t.b=parseInt(m[1],10);});});
  if(__EJ!=='')END_JUDGE=__EJ;
  if(__TOUR!=='')TOUR_ON=(__TOUR==='1')?1:0;
  if(__ICW!=='')INV_CASK_W=parseFloat(__ICW)||0;
  if(__IBLDG!=='')INV_BLDG=(__IBLDG==='1')?1:0;
  if(__ASRC!=='')ALT_SOURCE=parseInt(__ASRC,10)||1;   // v5.0 primary/alt dials — override ONLY when set
  if(__AAGE!=='')ALT_AGE=parseInt(__AAGE,10)||1;
  if(__STPL!=='')STAPLE_PTS=parseInt(__STPL,10)||2;   // v5.2 ⚙: the Staple premium (the +2/+4 A/B) — override ONLY when set
  if(__SRCN!=='')SRC_PRIMARY=parseInt(__SRCN,10)||3;   // v5.2b ⚙: the Market primary (the 2/3 A/B) — override ONLY when set
  if(__FLIGHT==='off'){FLIGHT_PTS={1:0,2:0,3:0,4:0,5:0,6:0};}   // ⚙ v5.6: the counterfactual — what is DEPTH worth with no breadth bonus at all?
  if(__BMIN!=='')BOURSE_MIN=parseInt(__BMIN,10);   // v5.3 ⚙: the Bourse track ends — override ONLY when set
  if(__BMAX!=='')BOURSE_MAX=parseInt(__BMAX,10);
  S=freshState(n,['P1','P2','P3','P4','P5'].slice(0,n));UI={sub:'move'};undoStack=[];
  // v5.6: the lane roster is now LONGER than a table (5 lanes, 2-4 seats), so a fixed i%len
  // would never seat the tail lanes. Rotate the offset per game — every lane gets equal seat time.
  S.players.forEach(function(p,i){p.ai=__PERSONAS?{tier:__PTIER,persona:AI_PERSONAS[(i+__POFF)%AI_PERSONAS.length]}:{tier:__TIER};p.presPool=PRES_POOL;});
  var guard=0;
  while(!S.over){
    aiStep();
    if(++guard>150000)return {error:'runaway (guard tripped)',round:S.turn,sub:UI.sub};
  }
  var fr=finalRows();var rows=fr.rows;
  var byDest={bruges:0,london:0,bergen:0,novgorod:0};
  S.players.forEach(function(p){p.delivered.forEach(function(d){byDest[d.dest]=(byDest[d.dest]||0)+1;});});
  return {round:S.turn,trigger:S.endReason||'?',sailed:S.sailed,
    winSeat:rows[0].p.id,winPersona:(rows[0].p.ai&&rows[0].p.ai.persona)||null,personas:S.players.map(function(q){return (q.ai&&q.ai.persona)||null;}),
    laneSeats:S.players.map(function(q){var sc=scorePlayer(q);
      return {ps:(q.ai&&q.ai.persona)||null,total:sc.total,flight:flightBeers(q),deliv:(q.delivered||[]).length,fl:sc.flight,
        styles:Object.keys(q.shipped||{}).sort().join('+'),
        brews:(q._brews||0),stuck:q.vessels.filter(function(c){return c;}).length,
        sDel:sc.deliv,sBank:sc.bank,sMaj:sc.maj};}),
    winTotal:rows[0].sc.total,secondTotal:rows[1]?rows[1].sc.total:0,
    bldgPips:S.players.reduce(function(a,p){return a+(scorePlayer(p).bldg||0);},0)/S.players.length,
    stapleStars:S.players.reduce(function(a,p){return a+(p.bankSt||0);},0)/S.players.length,   // v5.2: Staple House + Staple Rights ★
    vents:S.players.reduce(function(a,p){return a+venturesInPlay(p);},0)/S.players.length,     // v5.2: Ventures standing at end
    bourseAvg:(function(){var ks=Object.keys(S.bourse||{});return ks.length?ks.reduce(function(a,b){return a+S.bourse[b];},0)/ks.length:0;})(),   // v5.3
    bourseStart:BOURSE_START,
    furn:SLOTS.filter(function(sx){var b=S.buildings[sx.id];return b&&!b.v;}).length,
    bagLeft:(S.worksBag||[]).length,   // v5.4: what the tide never got to raise
    byDest:byDest,
    brews:S.players.reduce(function(a,p){return a+(p._brews||0);},0)/S.players.length,
    delivs:S.players.reduce(function(a,p){return a+p.delivered.length;},0)/S.players.length,
    builds:S.players.reduce(function(a,p){return a+(p.bank||0);},0)/S.players.length,
    use:__U,
    parts:rows.map(function(r){return {deliv:r.sc.deliv,bank:r.sc.bank,maj:r.sc.maj,flight:r.sc.flight,total:r.sc.total};})};
}
var __RESULTS={};
[2,3,4].forEach(function(n){
  __RESULTS[n]=[];
  for(var g=0;g<__N;g++){
    var r;
    try{r=__runGame(n,g);}catch(e){r={error:String(e&&e.stack||e).slice(0,400),round:(typeof S!=='undefined'&&S)?S.turn:0};}
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
  parseInt, parseFloat, isNaN, alert:noop,
  setTimeout:noop, clearTimeout:noop,
  lucide:{ createIcons:noop },
  __N:N, __TIER:TIER,
  __EXP:process.env.EXPANSION==='1', __JOP:process.env.JOPEN==='1',   // v4.14: the beer-toggle arms (EXPANSION=1 · JOPEN=1)
  __HALL:process.env.HALL==='1',                                      // v4.15: the Guildhall arm (HALL=1)
  __SINV:process.env.STARTINV!=null?process.env.STARTINV:'', __TSTARS:process.env.TSTARS!=null?process.env.TSTARS:'',   // v4.17: the Tasting dials
  __TBENCH:process.env.BENCH!=null?process.env.BENCH:'', __TCATB:process.env.CATB!=null?process.env.CATB:'', __EJ:process.env.EJUDGE!=null?process.env.EJUDGE:'', __TOUR:process.env.TOUR!=null?process.env.TOUR:'',
  __ICW:process.env.INV_CASK!=null?process.env.INV_CASK:'', __IBLDG:process.env.INV_BLDG!=null?process.env.INV_BLDG:'',
  __ASRC:process.env.ALTSRC!=null?process.env.ALTSRC:'', __AAGE:process.env.ALTAGE!=null?process.env.ALTAGE:'',   // v5.0: the primary/alt dials
  __STPL:process.env.STAPLE!=null?process.env.STAPLE:'',   // v5.2: the Staple premium dial
  __SRCN:process.env.SRCN!=null?process.env.SRCN:'',   // v5.2b: the Market primary dial
  __FLIGHT:process.env.FLIGHT||'',   // v5.6 ⚙: FLIGHT=off zeroes the Flight ladder (the depth counterfactual)
  __BMIN:process.env.BMIN!=null?process.env.BMIN:'',   // v5.3: the Bourse track ends
  __BMAX:process.env.BMAX!=null?process.env.BMAX:'',
  __POOL:parseInt(process.env.POOL||'0',10),
  __PERSONAS:PERSONAS,
  __PTIER:process.env.PTIER||'trader',   // v5.6: read the lanes at a chosen tier (PTIER=guildmaster|cellarmaster)
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
  __JIT:parseFloat(process.env.JITTER||'0'),
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
const BOURSE_START_R=3;
console.log('=== hanse v4.1 sim — '+N+' games/count · '+(PERSONAS?'PATHWAYS (trader personas)':('tier '+TIER))+' ===');
let anyErr=0;
[2,3,4].forEach(n=>{
  const arr=R[n]; const errs=arr.filter(r=>r.error); const ok=arr.filter(r=>!r.error);
  anyErr+=errs.length;
  if(errs.length)console.log(`\n-- ${n}p ERRORS (${errs.length}) --\n`+errs.slice(0,3).map(e=>e.error+' @round '+e.round+(e.sub?' sub='+e.sub:'')).join('\n'));
  if(!ok.length){console.log(`\n== ${n}p: ALL FAILED ==`);return;}
  const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
  const rounds=ok.map(r=>r.round);
  const within=ok.filter(r=>r.round>=12&&r.round<=25).length;
  const trig={};ok.forEach(r=>trig[r.trigger]=(trig[r.trigger]||0)+1);
  const seat={};ok.forEach(r=>seat[r.winSeat]=(seat[r.winSeat]||0)+1);
  const dd={bruges:0,london:0,bergen:0,novgorod:0};ok.forEach(r=>Object.keys(dd).forEach(k=>dd[k]+=r.byDest[k]||0));
  const dsum=Object.values(dd).reduce((a,b)=>a+b,0)||1;
  console.log(`\n== ${n}p · ${ok.length} ok / ${errs.length} err ==`);
  console.log(`rounds avg ${fmt(avg(rounds))} (min ${Math.min(...rounds)} max ${Math.max(...rounds)}) · in 12–25 band ${pct(within,ok.length)}`);
  console.log(`triggers: ${Object.keys(trig).map(k=>k+' '+pct(trig[k],ok.length)).join(' · ')} · sailed avg ${fmt(avg(ok.map(r=>r.sailed)))}`);
  console.log(`winner total avg ${fmt(avg(ok.map(r=>r.winTotal)))} · margin avg ${fmt(avg(ok.map(r=>r.winTotal-r.secondTotal)))} · seat wins ${Object.keys(seat).map(s=>'P'+(+s+1)+' '+pct(seat[s],ok.length)).join(' ')}`);
  console.log(`per-player: brews ${fmt(avg(ok.map(r=>r.brews)))} · deliveries ${fmt(avg(ok.map(r=>r.delivs)))} · bank★ ${fmt(avg(ok.map(r=>r.builds)))}`);
  console.log(`delivery split: ${Object.keys(dd).map(k=>k+' '+pct(dd[k],dsum)).join(' · ')}`);
  { // v45c: the new-systems utilization dashboard (per-game averages)
    const uk=['manifests','rack','assayUp','assayDown','toll','kilnLift','bondedSail','bmSeat','bmTick','tideBurn',
      'victual','chandler','scargo','coopSail','customsBoard',
      'comm_skute','comm_cog','comm_hulk','commG','built','bldgTicks','built_survey','built_prize',
      'matured','ropeX','ventL1','ventL2',
      'bshiftUp','bshiftDown','vpubGold','vpubStep','brewCrash','glut','prizeStars','vflip',
      'pours','judged','slams','invE','invS','tilesWon'];
    const us={};uk.forEach(k=>us[k]=avg(ok.map(r=>(r.use&&r.use[k])||0)));
    console.log(`commissions/game: ${fmt(us.comm_skute+us.comm_cog+us.comm_hulk)} — skute ${fmt(us.comm_skute)} · cog ${fmt(us.comm_cog)} · hulk ${fmt(us.comm_hulk)} · grain paid ${fmt(us.commG)}`);
    console.log(`the bourse (v5.6 THE GLUT): glut steps/game ${fmt(us.glut)} (one per beer TYPE per sail) · shifts UP ${fmt(us.bshiftUp)} vs DOWN ${fmt(us.bshiftDown)} · opens at ${BOURSE_START_R} → end track avg ${fmt(avg(ok.map(r=>r.bourseAvg||0)))} · prizes taken as ★ ${fmt(us.prizeStars)}/game`);
    console.log(`public works (v5.4 THE TIDE): burned by sails ${fmt(us.tideBurn)}/game · still standing at end ${fmt(avg(ok.map(r=>r.furn||0)))} · bag left ${fmt(avg(ok.map(r=>r.bagLeft||0)))} · (builds ${fmt(us.built)} — 0 by design: nobody builds a Public Work)`);
    console.log(`ventures (v5.5 FOUR HANDS): L1 placed/game ${fmt(us.ventL1)} · L2 climbs ${fmt(us.ventL2)} · standing at end/player ${fmt(avg(ok.map(r=>r.vents||0)))} · staple★/player ${fmt(avg(ok.map(r=>r.stapleStars||0)))} · FLIPS ${fmt(us.vflip)} · ropewalk cross-loads ${fmt(us.ropeX)}`);
    console.log(`usage/game: manifest lines ${fmt(us.manifests)} · rack ${fmt(us.rack)} · assay ${fmt(us.assayUp)} · toll bench ${fmt(us.toll)} · kiln/bonded lift ${fmt(us.kilnLift)} · bonded sail-away ${fmt(us.bondedSail)} · victual loads ${fmt(us.victual)} · braumeister ${fmt(us.bmSeat)} seat / ${fmt(us.bmTick)} ticks`);
    console.log(`shapers/game: chandler ${fmt(us.chandler)} · supercargo ${fmt(us.scargo)} · coop-berth sails ${fmt(us.coopSail)} · customs boards ${fmt(us.customsBoard)}`);
    if(us.pours>0)   // v4.17 TASTINGS dashboard
      console.log(`v4.17 tastings/game: pours ${fmt(us.pours)} · benches convened ${fmt(us.judged)} · door-slams ${fmt(us.slams)} · invites earned ${fmt(us.invE)} / spent ${fmt(us.invS)}`);
  }
  if(PERSONAS){const pw={},pn={},pt={},pf={},pd={},pfl={},pb={},ps2={},pD={},pB={},pM={};
    ok.forEach(r=>{(r.personas||[]).forEach(ps=>{if(ps)pn[ps]=(pn[ps]||0)+1;});
      if(r.winPersona)pw[r.winPersona]=(pw[r.winPersona]||0)+1;
      (r.laneSeats||[]).forEach(L=>{if(!L.ps)return;
        pt[L.ps]=(pt[L.ps]||0)+L.total;pf[L.ps]=(pf[L.ps]||0)+L.flight;
        pd[L.ps]=(pd[L.ps]||0)+L.deliv;pfl[L.ps]=(pfl[L.ps]||0)+L.fl;
        pb[L.ps]=(pb[L.ps]||0)+(L.brews||0);ps2[L.ps]=(ps2[L.ps]||0)+(L.stuck||0);
        pD[L.ps]=(pD[L.ps]||0)+(L.sDel||0);pB[L.ps]=(pB[L.ps]||0)+(L.sBank||0);pM[L.ps]=(pM[L.ps]||0)+(L.sMaj||0);});});
    const lanes=Object.keys(pn);
    const st={};ok.forEach(r=>(r.laneSeats||[]).forEach(L=>{if(L.ps!=='depth')return;st[L.styles||'(none)']=(st[L.styles||'(none)']||0)+1;}));
    const top=Object.keys(st).sort((x,y)=>st[y]-st[x]).slice(0,5);
    console.log('PATHWAYS win-rate by lane: '+lanes.map(k=>k+' '+pct(pw[k]||0,pn[k])).join(' · ')+'  (seats: '+lanes.map(k=>pn[k]).join('/')+')');
    console.log('  per-lane avg: '+lanes.map(k=>k+' \u2605'+fmt((pt[k]||0)/pn[k])+' (flight '+fmt((pf[k]||0)/pn[k])+' beers = '+fmt((pfl[k]||0)/pn[k])+'\u2605 \u00b7 '+fmt((pd[k]||0)/pn[k])+' deliveries)').join(' \u00b7 '));
    console.log('  \u2605 BREAKDOWN by lane (deliveries \u00b7 bank \u00b7 majorities \u00b7 flight): '+lanes.map(k=>k+' '+fmt((pD[k]||0)/pn[k])+'/'+fmt((pB[k]||0)/pn[k])+'/'+fmt((pM[k]||0)/pn[k])+'/'+fmt((pfl[k]||0)/pn[k])).join('  \u00b7  '));
    console.log('  throughput: '+lanes.map(k=>k+' '+fmt((pb[k]||0)/pn[k])+' brews \u2192 '+fmt((pd[k]||0)/pn[k])+' shipped ('+fmt((ps2[k]||0)/pn[k])+' stuck in vessels at end)').join(' \u00b7 '));
    if(top.length)console.log('  what DEPTH committed to: '+top.map(k=>k+' \u00d7'+st[k]).join(' \u00b7 '));}
});
console.log(anyErr? `\n*** ${anyErr} ERRORS — GATE FAILED ***` : '\nGATE: 0 crashes / 0 deadlocks.');
process.exit(anyErr?1:0);
