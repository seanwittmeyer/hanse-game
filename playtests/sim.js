// Headless simulation harness for play.html (v0.7 "The Wharf").
// Drives the CANONICAL engine (not a reimplementation): it extracts play.html's
// <script>, APPENDS a heuristic bot + game runner into the SAME lexical scope
// (so the bot can call freshState/endTurn/etc. and read the let-scoped S/UI),
// stubs the DOM, and runs N games per player count. Usage: node playtests/sim.js [N]
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '500', 10);
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// ---- the bot + runner, appended into the engine's scope (no backticks inside) ----
const driver = `
//================= HEADLESS BOT (appended) =================
render=function(){};        // silence the UI layer for speed/memory
save=function(){};
log=function(){};
snapshot=function(){};      // bot never undoes

var __chosenWhich='row', __buys=0, __charters=0;
var NAMES=['P1','P2','P3','P4','P5'];

function achQ(p){var qs=p.recipes.map(function(r){return (STYLES[r].cellar&&!hasUpgrade(p,'cellar'))?0:STYLES[r].q;});return Math.max.apply(null,qs);}
function needShip(p){
  if(!(S.shipDisplay&&S.shipDisplay.length)||emptySlots().length===0||!canPay(p,{g:2}))return false;
  var qs=[];p.vessels.forEach(function(c){if(c)qs.push(c.q);});
  wharfCaskSlots().forEach(function(id){var t=S.slots[id];if(t.owner===p.id)qs.push(t.q);});
  var bq=qs.length?Math.max.apply(null,qs):achQ(p);
  return !myShips(p).some(function(sid){var t=S.slots[sid];return t.load.length<effCap(t)&&bq>=DEST[t.dest].gate;});
}
// This game's dealt export beers the bot will climb (skips the Q5 cellar beer — a known greedy blind spot;
// a CELLARMASTER seat (__cellar) INCLUDES it, to diagnose whether a well-played Q5 path is competitive).
function buyableExports(p){return (S.exports||[]).filter(function(s){return !p.recipes.includes(s)&&(p.__cellar||!STYLES[s].cellar)&&canPay(p,RECIPE_BUY[s]);});}
function wantRecipe(p){return buyableExports(p).length>0;}
function pickUpgrade(list){var pref=['vessel','cellar','granary','hopgarden'];
  for(var i=0;i<pref.length;i++)if(list.indexOf(pref[i])>=0)return pref[i];return list[0];}
// v1.0: London/Novgorod give a free BUILDING from the display. Prefer flexible value buildings.
function pickBuilding(list){var pref=['staple','richberth','burgomstr','ch_bruges','ch_london','ch_bergen','ch_novgo','maltkiln','cooperage','crane','connoiss','festkeller','customs','hopyard','gauger','lagering','reliquary','hansediet','workshop','almoner'];
  for(var i=0;i<pref.length;i++)if(list.indexOf(pref[i])>=0)return pref[i];return list[0];}
function aBuildSlots(){return SLOTS.filter(function(s){return !S.buildings[s.id];});}
function destFor(p,q,konPref){var elig=DESTS.filter(function(d){return q>=DEST[d].gate;});
  if(q>=4 && Math.random()<0.3 && elig.indexOf('hall')>=0)return 'hall';
  var kon=elig.filter(function(d){return DEST[d].kontor;});var pool=(konPref&&kon.length)?kon:elig;
  pool.sort(function(a,b){return DEST[b].value-DEST[a].value;});return pool[0];}

// ---- STRATEGY PERSONAS (opt-in via __PERSONAS) ----
// The greedy default value-ranks kontore, so it NEVER ships prestige (Hall) or stacks Bergen's big
// majority — the design's headline volume-vs-prestige axis goes untested. Personas let a bot COMMIT to a
// lean so we can measure whether each lean can win (the GWT blend thesis). 'volume' == the exact greedy
// baseline (so __PERSONAS off reproduces prior results); 'prestige' ships to the Hall (Q×2); 'majority'
// stacks one kontor (Bergen, the richest majority) to win it.
var __PERSON=(typeof __PERSONAS!=='undefined')?__PERSONAS:false;
function persona(p){return p.__persona||'volume';}
function bestKon(elig){var k=elig.filter(function(d){return DEST[d].kontor;});
  k.sort(function(a,b){return DEST[b].value-DEST[a].value;});return k[0];}
function personaDest(p,q){
  if(p.__cellar){                                   // CELLARMASTER: earn the Aging Cellar early (London/Novgorod),
    var ce=DESTS.filter(function(d){return q>=DEST[d].gate;});   // then ship the high end to the Hall (prestige + the Flight's top tiers)
    if(q>=4&&ce.indexOf('hall')>=0)return 'hall';
    if(q>=3&&ce.indexOf('novgorod')>=0)return 'novgorod';
    if(q>=2&&ce.indexOf('london')>=0)return 'london';
    return ce[0]||'bruges';
  }
  if(!__PERSON||persona(p)==='volume')return destFor(p,q,true);   // baseline-preserving
  var elig=DESTS.filter(function(d){return q>=DEST[d].gate;});
  if(persona(p)==='prestige')return (elig.indexOf('hall')>=0)?'hall':(bestKon(elig)||elig[0]);
  // 'majority': contest the RICHEST reachable majorities (by 1st-tier payout). A real majority player
  // doesn't camp one fixed kontor while rivals sweep the rest — it locks the best, then shifts to the next
  // once it safely leads, denying a scatter-shipper free 1st places. (v0.10: majorities live at all four.)
  var ks=elig.filter(function(d){return DEST[d].kontor;})
             .sort(function(a,b){return (DEST[b].maj[0]||0)-(DEST[a].maj[0]||0);});
  if(!ks.length)return elig[0];
  var top=ks[0];
  if(ks[1]){                                                      // already safely leading the richest? build the next
    var others=0;S.players.forEach(function(q2){if(q2.id!==p.id)others=Math.max(others,presenceAt(q2,top));});
    if(presenceAt(p,top)-others>=2)top=ks[1];
  }
  return top;
}

function cellValue(c,p){
  var role=CELLROLE[c];
  if(role==='Source')return 1+(needShip(p)?1.5:0)+(wantRecipe(p)?0.4:0);
  if(role==='Brew')return (openVessel(p)>=0 && p.recipes.some(function(r){return canBrew(p,r);}))?3:0.1;
  if(role==='Age'){var mat=p.vessels.filter(function(v){return v&&v.step<v.ready;});if(!mat.length)return 0.1;
    return 2+(mat.some(function(v){return v.ready-v.step<=3;})?1:0);}
  if(role==='Ship'){var load=myShips(p).length&&wharfLoadableCasks(p).some(function(cs){return myShips(p).some(function(s){return canTake(s,cs);});});
    if(load)return 4;
    var rdy=readyInVessels(p).length||wharfCaskSlots().some(function(id){return S.slots[id].owner===p.id;});
    return (rdy&&canPay(p,charterCost(p)))?2:0.1;}
  return 0;
}
// Occupancy toll the bot would pay for MOVING onto cell c (0 unless an engine defines OCCUPANCY_TOLL):
// only the destination cell is tolled, and only if a rival sits there.
function cellToll(c,p){
  if(typeof OCCUPANCY_TOLL==='undefined'||!OCCUPANCY_TOLL)return 0;
  return S.players.some(function(q){return q.id!==p.id&&q.cell===c;})?OCCUPANCY_TOLL:0;
}
function botMove(p){
  var placing=!p.placed;var cands=placing?['A','B','C','D']:ADJ[p.cell];
  var best=null,bestv=-1,which='row';
  cands.forEach(function(tc){var toll=placing?0:cellToll(tc,p);['row','col'].forEach(function(w){
    var lk=cellOfLine(tc)[w];var cells=LINES[lk].cells;
    var v=cells.reduce(function(a,c){return a+cellValue(c,p);},0)-toll+Math.random()*0.4;
    if(v>bestv){bestv=v;best=tc;which=w;}});});
  __chosenWhich=which;doMove(best);
}
function botLine(p){
  if(readyInVessels(p).length&&emptySlots().length){startDeploy(readyInVessels(p)[0].i,'line');return;}
  chooseLine(__chosenWhich||'row');
}
function stopPrio(s){
  if(s.kind==='cell')return {Source:0,Brew:1,Age:2,Ship:4}[CELLROLE[s.cell]];
  if(s.kind==='bldg')return 3;   // a line-effect Building (Crane / Lagering)
  var t=S.slots[s.slot];if(!t)return 99;
  if(t.type==='cask'){var a=t.act||STYLES[t.style].act;var pr={source:0,wild:1,age:2,reach:2,load:4,convert:1,survey:1}[a];return pr==null?2:pr;}
  if(t.type==='ship')return 4;
  return 50;
}
function botStops(){var bi=0,bp=1e9;UI.stops.forEach(function(s,i){var pr=stopPrio(s);if(pr<bp){bp=pr;bi=i;}});resolveStop(bi);}
function botMarket(p){
  if(UI.stage==='place'){placeSlot(emptySlots()[0].id);return;}                 // a commissioned ship → a slot
  if(UI.stage==='commload'){var el=commEligible(p,UI.tmp.commShipSlot);
    if(!el.length){commSkip();return;}el.sort(function(a,b){return b.q-a.q;});commLoad(el[0].ref);return;}
  // place a held Building (the starting tile / a Survey draw) so authorship is live
  if((p.hand||[]).length && aBuildSlots().length){placeHeld(0);return;}
  if(needShip(p)){buyTile('s_cog');return;}
  if((p.contracts||0)===0&&canPay(p,CONTRACT_BUY)
     &&(emptySlots().length<=1||S.ending||(myShips(p).length===0&&readyInVessels(p).length>0))){buyContract();return;}
  var ex=buyableExports(p);
  if(ex.length){ex.sort(function(a,b){return STYLES[a].q-STYLES[b].q;});buyRecipe(ex[0]);return;}
  // buy a Building when flush + a slot is open (authors the variable value); else a private improvement
  if(p.grain>=4 && aBuildSlots().length){
    var disp=(S.buildDisplay||[]).map(function(k,i){return {k:k,i:i};}).filter(function(o){return canPay(p,BUILDINGS[o.k].cost);});
    if(disp.length){var pk=pickBuilding(disp.map(function(o){return o.k;}));var pick=disp.find(function(o){return o.k===pk;})||disp[0];buyBuilding(pick.i);return;}}
  if(p.grain>=5 && grantableBuy(p,'vessel') && canPay(p,IMPROVEMENTS.vessel.cost)){buyImprovement('vessel');return;}
  if(p.hops<2)marketGoods(1,1);else marketGoods(2,0);
}
function botPlaceBldg(){var bs=aBuildSlots();placeBldgOn((bs[0]||SLOTS[0]).id);}
function botHarbor(p){
  if(UI.stage==='enshrine'){var ec=enshrineCasks(p).filter(function(o){return personaDest(p,o.q)==='hall';}).sort(function(a,b){return b.q-a.q;});
    if(ec.length){enshrinePick(ec[0].ref);return;}afterSail('stops');return;}
  if(UI.stage==='charter_cask'){var cs=charterCasks(p).slice().sort(function(a,b){return b.q-a.q;});charterPickCask(cs[0].ref);return;}
  if(UI.stage==='charter_dest'){var ref=UI.tmp.charterCask;var c=ref[0]==='v'?p.vessels[+ref.slice(2)]:S.slots[ref];
    var ds=DESTS.filter(function(d){return d!=='hall'&&c.q>=DEST[d].gate;});var d=personaDest(p,c.q);charterDest(ds.indexOf(d)>=0?d:(ds[0]||'bruges'));return;}
  // ENSHRINE (v0.15): a Ready Q2+ cask whose persona-destination is the Hall → showcase it locally (no boat)
  if(enshrineCasks(p).some(function(o){return personaDest(p,o.q)==='hall';})){harborEnshrine();return;}
  var canLoad=myShips(p).length&&wharfLoadableCasks(p).some(function(cs){return myShips(p).some(function(s){return canTake(s,cs);});});
  if(canLoad){harborLoad();return;}
  // Charter only as a genuine relief valve: wharf jammed, end-game rush, or no hull & can't build one.
  var canCharter=(p.contracts||0)>0&&canPay(p,charterCost(p))&&charterCasks(p).length>0;
  var jammed=emptySlots().length===0;
  var noHull=myShips(p).length===0 && !canPay(p,{g:2});
  // v0.16: no partial early-launch — a hull sails only when full (loadOnto handles it). The relief valve
  // is the contract-gated Charter when the slots jam, the end nears, or there's a stranded Ready cask.
  if(canCharter && (jammed || S.ending || noHull)){__charters++;harborCharter();return;}
  cellDone();
}
// Bind a new ship to the best-value destination its CURRENT casks can actually fill.
function qRefBind(p){var qs=[];p.vessels.forEach(function(c){if(c)qs.push(c.q);});
  wharfCaskSlots().forEach(function(id){if(S.slots[id].owner===p.id)qs.push(S.slots[id].q);});
  return qs.length?Math.max.apply(null,qs):achQ(p);}
function botCell(p){var role=CELLROLE[UI.cell];if(role==='Source')botMarket(p);else if(role==='Ship')botHarbor(p);else cellDone();}
function botBrew(p){var aff=p.recipes.filter(function(r){return canBrew(p,r)&&openVessel(p)>=0;});
  if(!aff.length){resume(UI.brew.returnTo);return;}aff.sort(function(a,b){return STYLES[b].q-STYLES[a].q;});brewPick(aff[0]);}
function botAge(p){var mat=p.vessels.map(function(c,i){return {c:c,i:i};}).filter(function(o){return o.c&&o.c.step<o.c.ready;});
  if(!mat.length){if(UI.age.mode==='pool')ageDone();else ageSkip();return;}
  mat.sort(function(a,b){return (a.c.ready-a.c.step)-(b.c.ready-b.c.step);});ageAllot(mat[0].i);}
function botSource(p){var n=UI.src.n;if(n>=2){if(p.hops<2)srcTake(1,1);else srcTake(2,0);}else{if(p.hops<1)srcTake(0,1);else srcTake(1,0);}}
function botReach(){reachPick(UI.reach.ks[0]);}
function botWild(p){
  if(myShips(p).length&&wharfLoadableCasks(p).some(function(cs){return myShips(p).some(function(s){return canTake(s,cs);});}))wildPick('ship');
  else if(p.vessels.some(function(c){return c&&c.step<c.ready;}))wildPick('age');
  else if(openVessel(p)>=0&&p.recipes.some(function(r){return canBrew(p,r);}))wildPick('brew');
  else wildPick('source');
}
function botLoad(p){var L=UI.load;
  if(!L.cask){var elig=L.casks.filter(function(cs){return L.ships.some(function(s){return canTake(s,cs);});});
    if(!elig.length){loadSkip();return;}elig.sort(function(a,b){return S.slots[b].q-S.slots[a].q;});loadPickCask(elig[0]);return;}
  var ships=L.ships.filter(function(s){return canTake(s,L.cask);});
  if(!ships.length){loadBack();return;}
  ships.sort(function(a,b){var sa=S.slots[a],sb=S.slots[b];
    var fa=(sa.load.length+1>=effCap(sa))?1:0,fb=(sb.load.length+1>=effCap(sb))?1:0;if(fa!==fb)return fb-fa;
    var oa=sa.owner===p.id?1:0,ob=sb.owner===p.id?1:0;if(oa!==ob)return ob-oa;
    return DEST[sb.dest].value-DEST[sa.dest].value;});
  loadOnto(ships[0]);
}
function botDeploy(){var es=emptySlots();if(!es.length){deploySkipAll();return;}deployTo(es[0].id);}
function botBenefit(){var disp=S.buildDisplay||[];if(!disp.length){benefitPick(null);return;}   // London/Novgorod → a free Building
  benefitPick(pickBuilding(disp.slice()));}

function botActOnce(){var p=cur();var U=UI.sub;
  switch(U){
    case 'move':return botMove(p);
    case 'line':return botLine(p);
    case 'stops':return botStops();
    case 'cell':return botCell(p);
    case 'brew':return botBrew(p);
    case 'age':return botAge(p);
    case 'source':return botSource(p);
    case 'convert':return convertSkip();
    case 'reach':return botReach();
    case 'wild':return botWild(p);
    case 'load':return botLoad(p);
    case 'deploy':return botDeploy();
    case 'benefit':return botBenefit();
    case 'placebldg':return botPlaceBldg();
    case 'toll':return tollPay();              // the bot pays the occupancy toll (the Floor is a human option)
    case 'goodspick':return goodsPick(2,0);    // liquidity owner-choice — the bot takes 2 grain
    case 'end':return endTurn();
    default: throw new Error('unknown UI.sub: '+U);
  }
}

function tbVec(p){var sc=scorePlayer(p);return [sc.total, p.grain+p.hops, wharfCaskSlots().filter(function(id){return S.slots[id].owner===p.id;}).length];}
function runGame(n){
  S=freshState(n,NAMES.slice(0,n));UI={sub:'move'};undoStack=[];activeTab=0;
  // ---- starting-token override hook (balance testing; null = canonical 3G/2H, equal seats) ----
  // __SC.g/__SC.h override the flat start; __SC.comp[seat] adds per-seat grain (seat compensation
  // for the FIXED first-player order). Capped at storage. Does not touch play.html's constants.
  if(typeof __SC!=='undefined'&&__SC){S.players.forEach(function(p,seat){
    if(__SC.g!=null)p.grain=__SC.g; if(__SC.h!=null)p.hops=__SC.h;
    if(__SC.comp)p.grain+=(__SC.comp[seat]||0);
    if(p.grain>p.storage)p.grain=p.storage; if(p.hops>p.storage)p.hops=p.storage;
  });}
  // ---- assign strategy personas (opt-in), shuffled so persona is decoupled from seat ----
  if(__PERSON){var pool=shuffle(['volume','prestige','majority']);var base=[];
    for(var i=0;i<n;i++)base.push(pool[i%3]);   // shuffled pool → all 3 leans appear even at 2p (random 2-of-3)
    shuffle(base);S.players.forEach(function(pl,seat){pl.__persona=base[seat];if(pl.__persona==='majority')pl.__majTarget='bergen';});}
  // CELLARMASTER diagnostic: mark __CELLAR random seats as Q5-committed (decoupled from seat order)
  if(typeof __CELLAR!=='undefined'&&__CELLAR>0){var cs2=shuffle(S.players.map(function(_,i){return i;}));
    for(var ci=0;ci<Math.min(__CELLAR,n);ci++)S.players[cs2[ci]].__cellar=true;}
  __buys=0;__charters=0;var guard=0;
  while(true){
    botActOnce();
    if(++guard>300000)return {error:'guard-tripped',n:n,round:S.turn};
    if(S.ending&&S.active===S.first&&UI.sub==='end')break; // gameOver fired inside endTurn
  }
  var scores=S.players.map(function(p){return scorePlayer(p);});
  // winner via the engine's tiebreak (total, goods, wharf casks)
  var order=S.players.map(function(p,i){return i;}).sort(function(a,b){
    var A=tbVec(S.players[a]),B=tbVec(S.players[b]);for(var i=0;i<3;i++)if(B[i]!==A[i])return B[i]-A[i];return 0;});
  var win=order[0], second=order[1];
  var wp=S.players[win];
  var byDest={bruges:0,london:0,bergen:0,novgorod:0,hall:0};
  var valDest={kontor:0,hall:0};
  wp.delivered.forEach(function(d){byDest[d.dest]++;var v=destValue(d.dest,d.q);if(d.dest==='hall')valDest.hall+=v;else valDest.kontor+=v;});
  var totalUpgrades=S.players.reduce(function(a,p){return a+p.upgrades.length;},0);
  var totalDeliv=S.players.reduce(function(a,p){return a+p.delivered.length;},0);
  // all-deliveries destination tally (to confirm prestige/majority leans are actually exercised)
  var allByDest={bruges:0,london:0,bergen:0,novgorod:0,hall:0};
  S.players.forEach(function(p){p.delivered.forEach(function(d){allByDest[d.dest]++;});});
  var playerStats=S.players.map(function(p,i){var ts={};p.delivered.forEach(function(d){ts[d.q]=1;});
    return {persona:persona(p),cellar:!!p.__cellar,total:scores[i].total,won:(i===win),
      deliv:scores[i].deliv,maj:scores[i].maj,goals:scores[i].goals,
      q5:p.delivered.filter(function(d){return d.q===5;}).length,
      q4plus:p.delivered.filter(function(d){return d.q>=4;}).length, hall:p.delivered.filter(function(d){return d.dest==='hall';}).length,
      tiers:Object.keys(ts).length,flight:scores[i].flight,master:scores[i].master};});
  return {
    n:n, round:S.turn, sailed:S.sailed, sailedCap:S.sailedCap,
    trigger:(S.sailed>=S.sailedCap?'clock':(S.turn>=MAX_ROUND?'ceiling':'other')),
    winSeat:win, winTotal:scores[win].total, secondTotal:scores[second].total,
    winDeliv:scores[win].deliv, winMaj:scores[win].maj, winGoals:scores[win].goals,
    winByDest:byDest, winValKontor:valDest.kontor, winValHall:valDest.hall,
    winShips:wp.shipsSailed, winUpgrades:wp.upgrades.length, winPersona:persona(wp),
    totalUpgrades:totalUpgrades, buys:__buys, totalDeliv:totalDeliv, charters:__charters,
    allByDest:allByDest, playerStats:playerStats
  };
}

// apply DEST re-stat tuning (mutates the engine's DEST object properties in-place; play.html untouched)
if(typeof __TUNE!=='undefined'&&__TUNE&&__TUNE.dest){Object.keys(__TUNE.dest).forEach(function(d){
  if(DEST[d])Object.assign(DEST[d],__TUNE.dest[d]);});}
var __NRUN = (typeof __N!=='undefined')?__N:200;
var __CNT  = (typeof __COUNTS!=='undefined')?__COUNTS:[2,3,4];
var __RESULTS={};
__CNT.forEach(function(n){
  var arr=[];for(var g=0;g<__NRUN;g++){
    try{arr.push(runGame(n));}catch(e){arr.push({error:String(e&&e.message||e),n:n});}
  }
  __RESULTS[n]=arr;
});
__RESULTS.KEY=KEY; __RESULTS.counts=__CNT;
`;

const noop = () => {};
const makeEl = () => {
  const el = {
    innerHTML: '', textContent: '', value: '', style: {},
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    setAttribute: noop, getAttribute: () => null, appendChild: noop,
    addEventListener: noop, removeEventListener: noop,
  };
  el.querySelector = () => makeEl();
  el.querySelectorAll = () => [];
  el.closest = () => null;
  return el;
};
const document = {
  getElementById: () => makeEl(), querySelector: () => makeEl(), querySelectorAll: () => [],
  createElement: () => makeEl(), addEventListener: noop, body: makeEl(),
};
const store = {};
const localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };

// ---- player counts & starting-token scenario (balance testing) ----
// COUNTS env: comma list of player counts (default the full 2–5p range).
const COUNTS = (process.env.COUNTS ? process.env.COUNTS.split(',').map(s=>parseInt(s,10)) : [2,3,4,5]);
// Named starting-token scenarios. base => canonical 3G/2H, equal seats (no override).
const SCENARIOS = {
  base : { label:'Baseline — 3G/2H, equal seats (canonical)' },
  rich : { label:'Richer flat start — 5G/3H',          g:5, h:3 },
  lean : { label:'Leaner flat start — 2G/1H',          g:2, h:1 },
  g4h2 : { label:'Flat start — 4G/2H',                 g:4, h:2 },
  g3h3 : { label:'Flat start — 3G/3H (more hops)',     g:3, h:3 },
  comp1: { label:'Seat comp — +1G to every later seat (0,1,1,1,1)', comp:[0,1,1,1,1] },
  compH: { label:'Seat comp — half ladder (0,1,1,2,2)',            comp:[0,1,1,2,2] },
  compL: { label:'Seat comp — full ladder (0,1,2,3,4)',            comp:[0,1,2,3,4] },
};
const SCEN = process.env.SCEN || 'base';
const SC = SCENARIOS[SCEN] || SCENARIOS.base;
const __SC = (SC.g!=null || SC.h!=null || SC.comp) ? { g:SC.g, h:SC.h, comp:SC.comp } : null;
// PERSONAS=1 makes each bot COMMIT to a lean (volume/prestige/majority) so the Hall & Bergen get exercised.
const PERSONAS = process.env.PERSONAS === '1';
const CELLAR = parseInt(process.env.CELLAR || '0', 10);   // CELLARMASTER diagnostic: N Q5-committed seats per game
// TUNE: mutate DEST properties (delivery value / majority bonus / gate) to test kontore re-stats without
// touching play.html. Identity goal: 4 distinct kontore — Bruges (liquidity), London (mid-high value),
// Bergen (majority king), Novgorod (premium) — + the Hall (prestige).
const TUNES = {
  none  : {},
  // concentrate majority at Bergen (its identity); minimize the other kontore's majorities so the
  // tiered system doesn't broadly feed kontor-contesters and nerf the prestige (Hall) lean.
  concB : { dest: { bruges:{maj:[2]}, london:{maj:[2]}, bergen:{maj:[12,8,4]}, novgorod:{maj:[3]} } },
  concD : { dest: { bruges:{maj:[2]}, london:{maj:[2]}, bergen:{maj:[10,6,3]}, novgorod:{maj:[3]} } },
  concE : { dest: { bruges:{maj:[2]}, london:{maj:[2]}, bergen:{maj:[14,9,5]}, novgorod:{maj:[3]} } },
  concC : { dest: { bruges:{maj:[]},  london:{maj:[]},  bergen:{maj:[12,8,4]}, novgorod:{maj:[]}  } },
  // the "pure split" question: kontore pay NO per-cask value (benefit + majority only); the Hall stays
  // the only per-cask payout. Epsilon values keep the greedy/volume bot's destination ORDER intact
  // (novgorod > london/bergen > bruges) while contributing ~0 to scores.
  noval : { dest: { bruges:{value:0.01}, london:{value:0.02}, bergen:{value:0.03}, novgorod:{value:0.04} } },
};
const __TUNE = TUNES[process.env.TUNE || 'none'] || TUNES.none;

const ctx = {
  document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert: noop,
  setTimeout: noop, clearTimeout: noop,
  lucide: { createIcons: noop },
  __N: N, __COUNTS: COUNTS, __SC, __PERSONAS: PERSONAS, __CELLAR: CELLAR, __TUNE,
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

// ---------------- aggregation & report ----------------
const R = ctx.__RESULTS;
const fmt = (x, d = 1) => Number(x).toFixed(d);
const pct = (a, b) => fmt(100 * a / b, 1) + '%';

function summarize(n, arr) {
  const errs = arr.filter(r => r.error);
  const ok = arr.filter(r => !r.error);
  const rounds = ok.map(r => r.round);
  const avg = a => a.reduce((x, y) => x + y, 0) / a.length;
  const within = ok.filter(r => r.round >= 12 && r.round <= 25).length;
  const clock = ok.filter(r => r.trigger === 'clock').length;
  const ceiling = ok.filter(r => r.trigger === 'ceiling').length;
  const winTotals = ok.map(r => r.winTotal);
  const margins = ok.map(r => r.winTotal - r.secondTotal);
  const seatWins = {}; for (let s = 0; s < n; s++) seatWins[s] = 0;
  ok.forEach(r => seatWins[r.winSeat]++);
  // winner lean: prestige if Hall delivery-value > kontor delivery-value
  const prestigeWins = ok.filter(r => r.winValHall > r.winValKontor).length;
  const balancedWins = ok.filter(r => r.winValHall > 0 && r.winValKontor > 0).length;
  const totalUp = avg(ok.map(r => r.totalUpgrades));
  const buys = avg(ok.map(r => r.buys));
  const earned = avg(ok.map(r => r.totalUpgrades - r.buys));
  const charters = avg(ok.map(r => r.charters));
  const winByDest = { bruges: 0, london: 0, bergen: 0, novgorod: 0, hall: 0 };
  ok.forEach(r => Object.keys(winByDest).forEach(k => winByDest[k] += r.winByDest[k]));
  const totalWinDeliv = Object.values(winByDest).reduce((a, b) => a + b, 0);

  console.log(`\n================  ${n} PLAYERS  (${arr.length} games)  ================`);
  console.log(`crashes/stuck:        ${errs.length}` + (errs.length ? '  -> ' + JSON.stringify(errs.slice(0, 3)) : '  (none)'));
  console.log(`rounds:               avg ${fmt(avg(rounds))}   min ${Math.min(...rounds)}   max ${Math.max(...rounds)}   in 12-25 band: ${pct(within, ok.length)}`);
  console.log(`end trigger:          clock ${pct(clock, ok.length)}   ceiling ${pct(ceiling, ok.length)}`);
  console.log(`sailed/cap at end:    avg ${fmt(avg(ok.map(r => r.sailed)))} / ${ok[0].sailedCap}`);
  console.log(`winner total score:   avg ${fmt(avg(winTotals))}   min ${Math.min(...winTotals)}   max ${Math.max(...winTotals)}`);
  console.log(`win margin (1st-2nd): avg ${fmt(avg(margins))}   (ties: ${margins.filter(m => m === 0).length})`);
  console.log(`winner score split:   deliv ${fmt(avg(ok.map(r => r.winDeliv)))}   maj ${fmt(avg(ok.map(r => r.winMaj)))}   goals ${fmt(avg(ok.map(r => r.winGoals)))}`);
  const seatRates = Object.keys(seatWins).map(s => 100 * seatWins[s] / ok.length);
  const seatSpread = Math.max(...seatRates) - Math.min(...seatRates);
  console.log(`seat win-rate:        ` + Object.keys(seatWins).map(s => `P${+s + 1} ${pct(seatWins[s], ok.length)}`).join('   ') + `   (ideal ${fmt(100/n)}%, spread ${fmt(seatSpread)}pts)`);
  console.log(`winner lean:          prestige(Hall>kontor) ${pct(prestigeWins, ok.length)}   blended(both>0) ${pct(balancedWins, ok.length)}`);
  console.log(`UPGRADES (all plyrs): total/game ${fmt(totalUp)}   earned-via-ship ${fmt(earned)} (${pct(earned, totalUp)})   bought ${fmt(buys)} (${pct(buys, totalUp)})`);
  console.log(`upgrades per WINNER:  avg ${fmt(avg(ok.map(r => r.winUpgrades)))}   (max ${Math.max(...ok.map(r => r.winUpgrades))})`);
  console.log(`charters/game:        avg ${fmt(charters)}`);
  console.log(`winner deliveries by destination (share of winners' casks):`);
  console.log(`   ` + Object.keys(winByDest).map(k => `${k} ${pct(winByDest[k], totalWinDeliv)}`).join('   '));
  // ALL deliveries (every player) — confirms the Hall/Bergen leans are actually exercised
  const allByDest = { bruges: 0, london: 0, bergen: 0, novgorod: 0, hall: 0 };
  ok.forEach(r => Object.keys(allByDest).forEach(k => allByDest[k] += r.allByDest[k]));
  const totalAll = Object.values(allByDest).reduce((a, b) => a + b, 0);
  console.log(`ALL deliveries by destination (every player):`);
  console.log(`   ` + Object.keys(allByDest).map(k => `${k} ${pct(allByDest[k], totalAll)}`).join('   '));
  // ===== PATHWAYS TO A WIN — per-strategy win-rate + score composition =====
  // Pathways: volume / prestige / majority (personas) + deep (cellarmaster). A cellar seat is reported
  // ONLY as 'deep' (its assigned persona is ignored, since it plays the deep policy).
  if (PERSONAS || CELLAR) {
    const blank = () => ({ wins:0, n:0, total:0, deliv:0, maj:0, goals:0, flight:0, master:0, hall:0, q4:0, q5:0, tiers:0 });
    const lanes = { volume:blank(), prestige:blank(), majority:blank(), deep:blank() };
    ok.forEach(r => r.playerStats.forEach(s => {
      const lane = s.cellar ? 'deep' : (PERSONAS ? s.persona : null); if (!lane || !lanes[lane]) return;
      const g = lanes[lane];
      g.wins += s.won?1:0; g.n++; g.total += s.total; g.deliv += s.deliv; g.maj += s.maj; g.goals += s.goals;
      g.flight += s.flight||0; g.master += s.master||0; g.hall += s.hall||0; g.q4 += s.q4plus; g.q5 += s.q5; g.tiers += s.tiers;
    }));
    console.log(`PATHWAYS TO A WIN (per-capita win-rate; fair = ${fmt(100/n)}%):`);
    ['volume','prestige','majority','deep'].forEach(k => { const g = lanes[k]; if (!g.n) return;
      const a = x => fmt(g[x]/g.n);
      console.log(`   ${k.padEnd(9)} win ${pct(g.wins,g.n).padStart(6)}  score ${a('total').padStart(5)}  |  deliv ${a('deliv')} · maj ${a('maj')} · goals ${a('goals')} · flight ${a('flight')} · master ${a('master')}  |  Hall/g ${a('hall')} · Q4+/g ${a('q4')} · Q5/g ${a('q5')} · tiers ${a('tiers')}  (n=${g.n})`);
    });
  }
}

console.log(`Brewhouses of the Hanse — headless sim (KEY ${R.KEY})  |  N=${N} games per player count`);
console.log(`scenario: ${SCEN} — ${SC.label}` + (PERSONAS ? `  |  PERSONAS on` : ``) + (process.env.TUNE && process.env.TUNE!=='none' ? `  |  TUNE=${process.env.TUNE} ${JSON.stringify(__TUNE.dest)}` : ``));
(R.counts || COUNTS).forEach(n => summarize(n, R[n]));
console.log('');
