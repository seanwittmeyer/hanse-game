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

function achQ(p){var qs=p.recipes.map(function(r){return (r==='l5'&&!hasUpgrade(p,'cellar'))?0:STYLES[r].q;});return Math.max.apply(null,qs);}
function needShip(p){return myShips(p).length===0 && emptySlots().length>0 && canPay(p,{g:2});}
function wantRecipe(p){return (!p.recipes.includes('l3')&&canPay(p,RECIPE_BUY.l3)) ||
  (p.recipes.includes('l3')&&!p.recipes.includes('l4')&&canPay(p,RECIPE_BUY.l4));}
function pickUpgrade(list){var pref=['vessel','cellar','quay','cooperage','royal','staple','guild','warehouse','granary','hopgarden','burgher'];
  for(var i=0;i<pref.length;i++)if(list.indexOf(pref[i])>=0)return pref[i];return list[0];}
function destFor(p,q,konPref){var elig=DESTS.filter(function(d){return q>=DEST[d].gate;});
  if(q>=4 && Math.random()<0.3 && elig.indexOf('hall')>=0)return 'hall';
  var kon=elig.filter(function(d){return DEST[d].kontor;});var pool=(konPref&&kon.length)?kon:elig;
  pool.sort(function(a,b){return DEST[b].value-DEST[a].value;});return pool[0];}

function cellValue(c,p){
  var role=CELLROLE[c];
  if(role==='Source')return 1+(needShip(p)?1.5:0)+(wantRecipe(p)?0.4:0);
  if(role==='Brew')return (openVessel(p)>=0 && p.recipes.some(function(r){return canBrew(p,r);}))?3:0.1;
  if(role==='Age'){var mat=p.vessels.filter(function(v){return v&&v.step<v.ready;});if(!mat.length)return 0.1;
    return 2+(mat.some(function(v){return v.ready-v.step<=3;})?1:0);}
  if(role==='Ship'){var load=myShips(p).length&&wharfLoadableCasks(p).some(function(cs){return myShips(p).some(function(s){return canTake(s,cs);});});
    if(load)return 4;
    var rdy=readyInVessels(p).length||wharfCaskSlots().some(function(id){return S.slots[id].owner===p.id;});
    return (rdy&&canPay(p,CHARTER_COST))?2:0.1;}
  return 0;
}
// Expected occupancy toll for activating line lk (0 unless an engine defines OCCUPANCY_TOLL).
function lineToll(lk,p){
  if(typeof OCCUPANCY_TOLL==='undefined'||!OCCUPANCY_TOLL)return 0;
  return LINES[lk].cells.filter(function(c){return S.players.some(function(q){return q.id!==p.id&&q.cell===c;});}).length*OCCUPANCY_TOLL;
}
function botMove(p){
  var placing=!p.placed;var cands=placing?['A','B','C','D']:ADJ[p.cell];
  var best=null,bestv=-1,which='row';
  cands.forEach(function(tc){['row','col'].forEach(function(w){
    var lk=cellOfLine(tc)[w];var cells=LINES[lk].cells;
    var v=cells.reduce(function(a,c){return a+cellValue(c,p);},0)-lineToll(lk,p)+Math.random()*0.4;
    if(v>bestv){bestv=v;best=tc;which=w;}});});
  __chosenWhich=which;doMove(best);
}
function botLine(p){
  if(readyInVessels(p).length&&emptySlots().length){startDeploy(readyInVessels(p)[0].i,'line');return;}
  chooseLine(__chosenWhich||'row');
}
function stopPrio(s){
  if(s.kind==='cell')return {Source:0,Brew:1,Age:2,Ship:4}[CELLROLE[s.cell]];
  var t=S.slots[s.slot];if(!t)return 99;
  if(t.type==='cask'){var a=STYLES[t.style].act;return {source:0,wild:1,age:2,reach:2,load:4}[a];}
  if(t.type==='ship')return 4;
  if(t.type==='neutral')return {stall:0,counting:1,cooper:2,crane:4}[t.b];
  return 50;
}
function botStops(){var bi=0,bp=1e9;UI.stops.forEach(function(s,i){var pr=stopPrio(s);if(pr<bp){bp=pr;bi=i;}});resolveStop(bi);}
function botMarket(p){
  if(UI.stage==='shipdest'){shipDest(destFor(p,qRefBind(p),true));return;}
  if(UI.stage==='place'){placeSlot(emptySlots()[0].id);return;}
  if(needShip(p)){buyTile('s_cog');return;}
  if(!p.recipes.includes('l3')&&canPay(p,RECIPE_BUY.l3)){buyTile('r_l3');return;}
  if(p.recipes.includes('l3')&&!p.recipes.includes('l4')&&canPay(p,RECIPE_BUY.l4)){buyTile('r_l4');return;}
  var buyable=displayGrantable(p).filter(function(k){return canPay(p,UPGRADE_BUY[k]);});
  if(buyable.length&&p.grain>=5&&Math.random()<0.5){__buys++;buyDisplayUp(pickUpgrade(buyable));return;}
  if(p.hops<2)marketGoods(1,1);else marketGoods(2,0);
}
function botHarbor(p){
  if(UI.stage==='charter_cask'){var cs=charterCasks(p).slice().sort(function(a,b){return b.q-a.q;});charterPickCask(cs[0].ref);return;}
  if(UI.stage==='charter_dest'){var ref=UI.tmp.charterCask;var c=ref[0]==='v'?p.vessels[+ref.slice(2)]:S.slots[ref];charterDest(destFor(p,c.q,true));return;}
  var canLoad=myShips(p).length&&wharfLoadableCasks(p).some(function(cs){return myShips(p).some(function(s){return canTake(s,cs);});});
  if(canLoad){harborLoad();return;}
  // Charter only as a genuine relief valve: wharf jammed, end-game rush, or no hull & can't build one.
  var canCharter=canPay(p,CHARTER_COST)&&charterCasks(p).length>0;
  var jammed=emptySlots().length===0;
  var noHull=myShips(p).length===0 && !canPay(p,{g:2});
  if(canCharter && (jammed || S.ending || noHull)){__charters++;harborCharter();return;}
  var launch=myShips(p).filter(function(s){return S.slots[s].load.length>0;});
  if(launch.length&&(S.ending||emptySlots().length===0)){harborLaunch(launch[0]);return;}
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
function botBenefit(){var lp=S.players[UI.pendingBenefits[0].pid];var g=displayGrantable(lp);if(!g.length){UI.pendingBenefits.shift();afterSail(UI.benefit.returnTo);return;}benefitPick(pickUpgrade(g));}

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
    case 'end':return endTurn();
    default: throw new Error('unknown UI.sub: '+U);
  }
}

function tbVec(p){var sc=scorePlayer(p);return [sc.total, p.grain+p.hops, wharfCaskSlots().filter(function(id){return S.slots[id].owner===p.id;}).length];}
function runGame(n){
  S=freshState(n,NAMES.slice(0,n));UI={sub:'move'};undoStack=[];activeTab=0;
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
  return {
    n:n, round:S.turn, sailed:S.sailed, sailedCap:S.sailedCap,
    trigger:(S.sailed>=S.sailedCap?'clock':(S.turn>=MAX_ROUND?'ceiling':'other')),
    winSeat:win, winTotal:scores[win].total, secondTotal:scores[second].total,
    winDeliv:scores[win].deliv, winMaj:scores[win].maj, winGoals:scores[win].goals,
    winByDest:byDest, winValKontor:valDest.kontor, winValHall:valDest.hall,
    winShips:wp.shipsSailed, winUpgrades:wp.upgrades.length,
    totalUpgrades:totalUpgrades, buys:__buys, totalDeliv:totalDeliv, charters:__charters
  };
}

var __NRUN = (typeof __N!=='undefined')?__N:200;
var __RESULTS={};
[2,3,4].forEach(function(n){
  var arr=[];for(var g=0;g<__NRUN;g++){
    try{arr.push(runGame(n));}catch(e){arr.push({error:String(e&&e.message||e),n:n});}
  }
  __RESULTS[n]=arr;
});
__RESULTS.KEY=KEY;
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

const ctx = {
  document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert: noop,
  setTimeout: noop, clearTimeout: noop,
  lucide: { createIcons: noop },
  __N: N,
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
  console.log(`seat win-rate:        ` + Object.keys(seatWins).map(s => `P${+s + 1} ${pct(seatWins[s], ok.length)}`).join('   '));
  console.log(`winner lean:          prestige(Hall>kontor) ${pct(prestigeWins, ok.length)}   blended(both>0) ${pct(balancedWins, ok.length)}`);
  console.log(`UPGRADES (all plyrs): total/game ${fmt(totalUp)}   earned-via-ship ${fmt(earned)} (${pct(earned, totalUp)})   bought ${fmt(buys)} (${pct(buys, totalUp)})`);
  console.log(`upgrades per WINNER:  avg ${fmt(avg(ok.map(r => r.winUpgrades)))}   (max ${Math.max(...ok.map(r => r.winUpgrades))})`);
  console.log(`charters/game:        avg ${fmt(charters)}`);
  console.log(`winner deliveries by destination (share of winners' casks):`);
  console.log(`   ` + Object.keys(winByDest).map(k => `${k} ${pct(winByDest[k], totalWinDeliv)}`).join('   '));
}

console.log(`Brewhouses of the Hanse — headless sim (v0.7, KEY ${R.KEY})  |  N=${N} games per player count`);
[2, 3, 4].forEach(n => summarize(n, R[n]));
console.log('');
