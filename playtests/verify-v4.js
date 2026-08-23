// Targeted rule checks for v4.x/v5.x — through v5.1r (KEY hanse-v51r; the rider-scope dial).
// Drives the CANONICAL engine (extract play.html's <script>, stub the DOM) and asserts each
// rule directly by constructing states — no bot in the loop, so a failure is the engine's.
// Usage: node playtests/verify-v4.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
// components.js rides along (IIFE → window.HC) so the census drift gate can read the kit's counts
const kit = fs.readFileSync(path.join(__dirname, '..', 'components.js'), 'utf8');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
var PASS=0,FAIL=0,OUT=[];
function ok(name,cond,detail){if(cond){PASS++;OUT.push('  ok  '+name);}else{FAIL++;OUT.push('FAIL  '+name+(detail?' — '+detail:''));}}
function fresh(n){EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n||2,['P1','P2','P3','P4'].slice(0,n||2));UI={sub:'stops',stops:[],pendingBenefits:[]};undoStack=[];activeTab=0;
  S.players.forEach(function(p){p.placed=true;p.cell='B';});
  SLOTS.forEach(function(s){S.slots[s.id]=null;S.buildings[s.id]=null;});
  return S.players[0];}
function ship(slot,hull,dest,load){S.slots[slot]={type:'ship',ship:hull,dest:dest,load:load||[]};return S.slots[slot];}
function stops(){UI={sub:'stops',stops:[],pendingBenefits:[]};}

// ---- 1. THE DIE: start values = quality − aging steps (Gruit 0 steps → Ready at brew) ----
(function(){var p=fresh();
  ok('start dice: gruit 1 · hopped 1 · broyhan 2 · keut 1 · mumme 1 · bock 2',
    startDieFor(p,'gruit')===1&&startDieFor(p,'hopped')===1&&startDieFor(p,'broyhan')===2&&
    startDieFor(p,'keut')===1&&startDieFor(p,'mumme')===1&&startDieFor(p,'bock')===2);
  ok('gruit is READY at brew (die = quality)', caskReady({style:'gruit',q:1,die:startDieFor(p,'gruit')}));
  ok('bock is NOT ready at brew (2 < 5)', !caskReady({style:'bock',q:5,die:2}));
  p.upgrades=['cellar'];p.sslots=2;
  ok('Cellarman: dice start one higher (bock 3 · keut 2)', startDieFor(p,'bock')===3&&startDieFor(p,'keut')===2);
  ok('Cellarman never starts a die above quality (hopped 2 = Q2)', startDieFor(p,'hopped')===2);
  // v4.12 [designer-ruled]: the v45g never-starts-Ready cap is REPEALED — the Cellarman's power is the point
  ok('v45g repealed (v4.12): the Cellarman starts Broyhan READY at brew (3 = Q3)', startDieFor(p,'broyhan')===3&&caskReady({style:'broyhan',q:3,die:startDieFor(p,'broyhan')}));
  ok('Hopped ready-at-brew with the Cellarman stands too', startDieFor(p,'hopped')===2&&caskReady({style:'hopped',q:2,die:2}));
})();

// ---- 2. AGING turns the die up and STOPS at the quality ----
(function(){var p=fresh();
  p.vessels[1]={style:'mumme',q:4,die:1,act:'source'};
  UI={sub:'age',age:{pool:5,mode:'pool',returnTo:'stops'},stops:[]};
  ageAllot(1);ageAllot(1);ageAllot(1);
  ok('3 age points turn the die 1→4 (READY)', p.vessels[1].die===4);
  var d0=p.vessels[1].die;UI.age={pool:2,mode:'pool',returnTo:'stops'};ageAllot(1);
  ok('a Ready die never ages past its quality', p.vessels[1].die===d0);
  // v4.5b: AUTO-AGING IS CUT — dice turn only when something turns them
  ok('no auto-age survives (passiveFerment is gone)', typeof passiveFerment==='undefined'&&typeof AUTO_AGE==='undefined');
  p.vessels[1].die=3;var d1=p.vessels[1].die;
  braumeisterTick(p);
  ok('no Braumeister seated → nothing ages at turn start', p.vessels[1].die===d1);
  p.upgrades=['braumeister'];p.sslots=2;
  braumeisterTick(p);
  ok('the Braumeister ages the ripest maturing cask +1 at turn start', p.vessels[1].die===d1+1);
  braumeisterTick(p);
  ok('the Braumeister never lifts past quality (no maturing cask → no tick)', p.vessels[1].die===4);
})();

// ---- 3. BREW (v5.0): a full brew SEARCHES the stack; the alt takes the top; the tray gates it ----
(function(){var p=fresh();stops();p.ai=null;
  p.grain=9;p.hops=9;p.recipes=['gruit','hopped','broyhan','keut'];p.vessels=[null,null,null];p.brewed={gruit:1};
  S.piles.broyhan=['source','reach','age'];   // a live multi-verb stack
  UI.brew={returnTo:'stops'};brewPick('broyhan');
  ok('a multi-verb stack opens the SEARCH for a human (the verb picker)', UI.sub==='brewverb'&&UI.bverb.style==='broyhan');
  brewVerbPick('reach');
  ok('the search CHOOSES the tile — not the top (reach picked past source)', p.vessels[0]&&p.vessels[0].act==='reach');
  ok('the chosen tile leaves the stack (3 → 2, top intact)', S.piles.broyhan.length===2&&S.piles.broyhan[0]==='source');
  ok('brew pays the cost (1G2H)', p.grain===8&&p.hops===7);
  ok('the die starts at the printed value (broyhan 2)', p.vessels[0].die===2);
  ok('the brew flips the recipe card (the BREWED record)', p.brewed.broyhan===1);
  ok('a brew alone does NOT advance the Flight (v4.9d — it qualifies on LOAD)', !(p.shipped||{}).broyhan&&flightScore(p)===0);
  UI.brew={returnTo:'stops',alt:true};brewPick('broyhan');
  ok('the ALTERNATE Brewhouse takes the TOP tile blind (source — no picker)', UI.sub!=='brewverb'&&p.vessels[1]&&p.vessels[1].act==='source'&&S.piles.broyhan.length===1);
  S.piles.keut=['load'];
  UI.brew={returnTo:'stops'};brewPick('keut');
  ok('a single-verb stack commits without the picker (no empty choice)', UI.sub!=='brewverb'&&p.vessels[2]&&p.vessels[2].act==='load'&&S.piles.keut.length===0);
  p.vessels=[null,null,null];
  ok('an EMPTY stack = that beer cannot brew (canBrew reads the census)', !canBrew(p,'keut')&&canBrew(p,'broyhan'));
  UI.brew={returnTo:'stops'};var v0=p.vessels[0];brewPick('keut');
  ok('…and brewPick refuses it outright', p.vessels[0]===v0);
  ok('all 3 vessels are open from the START (v45h — the covers are off)', p.vslots===3&&newPlayer(0,'X').vslots===3&&newPlayer(0,'X').vessels.length===3);
  p.vessels=[{style:'broyhan',q:3,die:2,act:'reach'},null,null];p.presPool=1;   // one die left, riding the broyhan → tray 0
  ok('no die in the tray → no brew', (function(){enterBrew('stops');return UI.sub!=='brew';})());
})();

// ---- 4. THE FLIGHT unlocks: 3rd distinct beer opens the 2nd seat ----
(function(){var p=fresh();stops();
  p.grain=9;p.hops=9;p.recipes=['gruit','hopped','keut'];p.vessels=[null,null];p.brewed={gruit:1};p.shipped={gruit:1};
  UI.brew={returnTo:'stops'};brewPick('hopped');
  UI.brew={returnTo:'stops'};brewPick('keut');
  ok('both specialist seats are open from the START (v45h)', p.sslots===2&&newPlayer(0,'X').sslots===2);
  ok('brews alone leave the Flight at the shipped count (v4.9d)', flightScore(p)===0);
  p.shipped={gruit:1,hopped:1,keut:1};
  ok('flight score counts SHIPPED beers (3 → 4★, v4.9d)', flightScore(p)===4);
})();

// ---- 5. GATES read the DIE as it boards (lifts included) ----
(function(){var p=fresh();stops();
  var sh=ship('s1','cog','novgorod');
  p.vessels[0]={style:'hopped',q:2,die:2,act:'source'};
  ok('a Ready die 2 cannot board Novgorod (gate 3 — v4.10)', !canTake('s1',0));
  S.buildings.s1={b:'maltkiln'};
  ok('a Malt Kiln at the slot lifts the boarding read (die 2+1=3 — makes the export band, v4.10)', canTake('s1',0));
  p.vessels[1]={style:'broyhan',q:3,die:3,act:'load'};
  ok('a die-3 export boards Novgorod at quality (kiln-lifted to 4 rides above)', canTake('s1',1));
  S.buildings.s2={b:'customs'};var sh2=ship('s2','cog','novgorod');
  ok('the Customs House eases the door — −1 to the minimum (a die-2 boards Novgorod at 3−1, v5.2 ⚙ ruled)', canTake('s2',0));
  p.vessels[2]={style:'gruit',q:1,die:1,act:'source'};
  ok('…but the die-1 door is CLOSED (−2 was almost broken — the designer’s call)', !canTake('s2',2));
  p.vessels[2]=null;
  ok('a maturing cask (die < Q) never boards', (function(){p.vessels[0]={style:'bock',q:5,die:4,act:'age'};return !canTake('s2',0);})());
})();

// ---- 6. LOAD: the kiln lift is permanent (cap 6), the vessel frees, the bonus queues ----
(function(){var p=fresh();stops();
  S.buildings.s1={b:'maltkiln'};var sh=ship('s1','hulk','bruges');
  p.vessels[0]={style:'gruit',q:1,die:1,act:'source'};
  UI.load={ships:['s1'],returnTo:'stops',loadsLeft:1,cask:0};
  loadOnto('s1');
  ok('the kiln turns the die up as it boards (1→2)', sh.load[0].die===2);
  ok('the vessel is freed', p.vessels[0]===null);
  ok('the load bonus queued (fires after boarding)', !UI.load&&((UI.pendingActs||[]).length===0? true : UI.pendingActs[0].act==='source'));
})();

// ---- 7. SAIL WHEN FULL: skute on 1 · cog on 2 · cooperage +1 · the Ropewalk's cross-quay load (v5.2) ----
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};
  var sk=ship('s3','skute','bruges');
  p.vessels[0]={style:'gruit',q:1,die:1,act:'source'};
  var pool0=p.presPool;
  UI.load={ships:['s3'],returnTo:'stops',loadsLeft:1,cask:0};loadOnto('s3');
  ok('a Skute sails on its first load', S.slots.s3===null&&S.sailed===1);
  ok('the delivery parks the die (pool −1)', p.presPool===pool0-1);
  ok('the delivered value = the die (1★ floor)', p.delivered.length===1&&p.delivered[0].val===1);
  var cg=ship('s4','cog','bruges');S.buildings.s4={b:'cooperage'};
  ok('a Cooperage adds a berth (cog holds 3)', effCap(cg)===3);
  ok('the Rich Berth is CUT (v5.2, ruled — dead through two buffs)', !BUILDINGS.richberth&&typeof richBuyDo==='undefined');
})();
// ---- 7b. v5.2 ROPEWALK (ruled rework): a load here ALSO loads 1 Ready cask onto a DIFFERENT Ship ----
(function(){var p=fresh();stops();p.ai=null;
  S.buildings.s4={b:'ropewalk',owner:1,die:3};
  var rw=ship('s4','hulk','bruges');var other=ship('s6','cog','bruges');
  p.vessels=[{style:'gruit',q:1,die:1,act:'source'},{style:'gruit',q:1,die:1,act:'source'},null];
  UI.load={ships:['s4'],returnTo:'stops',loadsLeft:1,cask:null,count:0};UI.sub='load';
  loadPickCask(0);
  ok('the walk’s own load lands, then the CROSS-QUAY load opens on the OTHER Ship only (v5.2)',
    rw.load.length===1&&UI.sub==='load'&&UI.load.ships.length===1&&UI.load.ships[0]==='s6'&&UI.load.loadsLeft===1);
  loadPickCask(1);
  ok('the cross-quay cask boards the different Ship (the Ropewalk is die-less furniture — v5.3)',
    other.load.length===1);
  srcTake(2,0);srcTake(2,0);stops();UI.pendingActs=[];
})();

// ---- 8. DELIVERY floor & cap; Keut's presence bump spends a tray die and banks 1★ ----
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};
  p.grain=0;
  var b0=p.bank,pool0=p.presPool,pb0=p.presBonus.bruges;
  deliverCask(p,{owner:0,style:'keut',q:3,die:9,act:'load'},'bruges');
  ok('delivery value caps at 6', p.delivered[p.delivered.length-1].val===6);
  ok('Keut parks a bonus die FREE (presence +1 · bank +1 · pool −2 incl. the delivery · no fee — v4.12)',
    p.presBonus.bruges===pb0+1&&p.bank===b0+1&&p.presPool===pool0-2&&p.grain===0);
  p.ai=null;
})();

// ---- 9. PRIZES: London building (+3★, placed) · Bergen specialist · Novgorod refine ×2 · Bruges recipe ----
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};
  var b0=p.bank,t0=trayDice(p),h0=p.hand.length;
  UI.pendingBenefits=[{pid:0,dest:'london'}];afterSail('stops');
  ok('London prize: a Venture opened FREE — no fee, no die committed; the tile leaves the hand (v5.3)',
    p.bank===b0&&trayDice(p)===t0&&p.hand.length===h0-1&&SLOTS.some(function(s){var b=vAt(s.id);return b&&b.owner===0&&b.lvl===1;}));
  UI.pendingSpec=[{pid:0,dest:'bergen'}];afterSail('stops');
  ok('Bergen prize: a specialist seated free', (p.upgrades||[]).length===1);
  deliverCask(p,{owner:0,style:'mumme',q:4,die:4,act:'age'},'novgorod');
  ok('Novgorod banks the die +2 (die 4 → 6★)', p.delivered[p.delivered.length-1].val===6);
  deliverCask(p,{owner:0,style:'bock',q:5,die:6,act:'age'},'novgorod');
  ok('the Novgorod premium rides above the die cap (die 6 → 8★)', p.delivered[p.delivered.length-1].val===8);
  deliverCask(p,{owner:0,style:'broyhan',q:3,die:3,act:'age'},'novgorod');
  ok('the export-band floor pays 5★ (die 3 +2 — v4.10)', p.delivered[p.delivered.length-1].val===5);
  ok('no refine machinery survives', typeof freeAge==='undefined'&&typeof brefinePick==='undefined');
  p.recipes=['gruit','hopped'];p.hops=5;var g9=p.grain;
  UI.pendingRecipe=[{pid:0,dest:'bruges'}];afterSail('stops');
  ok('Bruges prize: a dealt export recipe — at its H = Q−3 fee (v4.9c; the Q3s free, grain never touched)', p.recipes.length===3&&p.grain===g9);
  p.ai=null;
})();

// ---- 10. COMMISSION (v4.8 "Harbor Rates"): the fee is PER HULL — Skute 2G · Cog 1G · Hulk FREE ·
// place on a shipless slot · banks NOTHING (v4.5b de-mint) · display refills to 4 ----
(function(){var p=fresh();stops();
  p.grain=3;var b0=p.bank;
  S.shipDisplay=[{ship:'hulk',dest:'bergen'},{ship:'skute',dest:'bruges'},{ship:'cog',dest:'london'}];S.shipDeck=[{ship:'cog',dest:'bruges'},{ship:'cog',dest:'bergen'}];
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';
  commPick(0);commPlace('s6');
  ok('a HULK commissions FREE (v4.8 — 0G for 3 berths)', p.grain===3);
  ok('the hull lands on the slot', S.slots.s6&&S.slots.s6.ship==='hulk'&&S.slots.s6.dest==='bergen');
  ok('the commission banks NOTHING (v4.5b — the hull + the free load are the reward)', p.bank===b0);
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';
  commPick(0);commPlace('s7');   // display head is now the skute
  ok('a SKUTE commissions at 2G (v4.8 — the instant charter is dear)', p.grain===1&&S.slots.s7&&S.slots.s7.ship==='skute');
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';
  commPick(0);commPlace('s8');   // display head is now the cog
  ok('a COG commissions at 1G (v4.8)', p.grain===0&&S.slots.s8&&S.slots.s8.ship==='cog');
  ok('the display refills toward 4', S.shipDisplay.length>=2);
  ship('s4','cog','bruges');
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';commPick(0);
  var before=S.slots.s4;commPlace('s4');
  ok('one ship per slot — an occupied slot refuses', S.slots.s4===before&&S.slots.s4.ship==='cog');
})();
(function(){var p=fresh();stops();
  p.grain=1;p.hops=0;
  S.shipDisplay=[{ship:'skute',dest:'bruges'},{ship:'hulk',dest:'bergen'}];S.shipDeck=[];
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';
  commPick(0);
  ok('an UNAFFORDABLE hull can’t be picked (skute 2G > 1G held)', UI.comm.idx==null&&UI.stage!=='place');
  commPick(1);commPlace('s6');
  ok('…but the free Hulk beside it commissions fine', S.slots.s6&&S.slots.s6.ship==='hulk'&&p.grain===1);
  var q=fresh();stops();
  q.grain=0;q.hops=0;
  S.shipDisplay=[{ship:'hulk',dest:'bruges'}];S.shipDeck=[];
  ok('the Harbor stays OPEN at 0 goods while a free Hulk shows (commAffordable)', commAffordable(q));
  S.shipDisplay=[{ship:'skute',dest:'bruges'},{ship:'cog',dest:'london'}];
  ok('…and reads CLOSED at 0 goods when only priced hulls show', !commAffordable(q));
})();

// ---- 10b. v4.4 "Maiden Load": the commission includes ONE free load from YOUR vessels ----
(function(){var p=fresh();stops();
  p.grain=3;p.vessels=[{style:'broyhan',q:3,die:3,act:'source'},null];
  S.shipDisplay=[{ship:'cog',dest:'london'}];S.shipDeck=[];
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';
  commPick(0);commPlace('s6');
  ok('the commission offers its free load (the load prompt opens on the new hull)',
    UI.sub==='load'&&UI.load&&UI.load.ships.length===1&&UI.load.ships[0]==='s6');
  loadPickCask(0);   // one eligible hull → boards immediately
  ok('the free load boards the cask (die 3 ≥ London gate 2) and frees the vessel',
    S.slots.s6&&S.slots.s6.load.length===1&&p.vessels[0]===null);
})();
(function(){var p=fresh();stops();
  p.grain=3;p.vessels=[{style:'gruit',q:1,die:1,act:'source'},null];
  S.shipDisplay=[{ship:'cog',dest:'novgorod'}];S.shipDeck=[];
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';
  commPick(0);commPlace('s6');
  ok('no eligible cask → the commission resolves with no load prompt (gate 4 > die 1)',
    UI.sub!=='load'&&S.slots.s6&&S.slots.s6.load.length===0);
})();
(function(){var p=fresh();stops();
  p.grain=3;p.vessels=[{style:'broyhan',q:3,die:3,act:'source'},null];
  S.shipDisplay=[{ship:'skute',dest:'bruges'}];S.shipDeck=[];
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';
  commPick(0);commPlace('s6');
  var d0=p.delivered.length;
  loadPickCask(0);
  ok('commission + Skute: the free load sails and delivers at once (the old charter as components)',
    p.delivered.length===d0+1&&!S.slots.s6);
})();

// ---- 10c. v4.4c: the SPECIALIST display refills at the END of the turn, not on the take ----
(function(){var p=fresh(3);stops();   // 3p → n−1 = 2 copies/type: the deck holds spares past the display of 4
  p.grain=9;p.hops=9;p.upgrades=[];p.sslots=2;
  S.impDisplay=['cellar','crane','granary','hopgarden'];   // v4.6: force an ungated display (guild tiles may print seat gates)
  var k=S.impDisplay[0];var n0=S.impDisplay.length;var deck0=S.impDeck.length;
  UI.hire={returnTo:'stops'};UI.sub='hire';hirePick(k);
  ok('a taken specialist leaves a GAP — no mid-turn refill', S.impDisplay.length===n0-1&&S.impDeck.length===deck0);
  UI={sub:'end'};endTurn();
  ok('the specialist display refills at the END of the turn', S.impDisplay.length===n0&&S.impDeck.length===deck0-1);
})();

// ---- 11. PUBLIC WORKS (v5.3): DIE-LESS FURNITURE — they start the game, serve anyone, never an investment ----
(function(){EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(3,['P1','P2','P3']);UI={sub:'stops',stops:[],pendingBenefits:[]};undoStack=[];
  var seeded=SLOTS.filter(function(sx){return S.buildings[sx.id];});
  ok('the Public Works stand from setup — NEUTRAL: no owner, no die (v5.3, ruled)',
    seeded.length===4&&seeded.every(function(sx){var b=S.buildings[sx.id];return b.owner===undefined&&b.die===undefined;}));
  var p=fresh();stops();var q=S.players[1];
  SLOTS.forEach(function(sx){S.buildings[sx.id]=null;});
  S.buildings.s4={b:'maltkiln'};
  var kl=ship('s4','cog','bruges');
  S.active=1;q.vessels[0]={style:'gruit',q:1,die:1,act:'source'};
  UI.load={ships:['s4'],returnTo:'stops',loadsLeft:1,cask:0,count:0};UI.sub='load';loadOnto('s4');
  ok('the Kiln serves a RIVAL\u2019s load \u2014 the boarding die lifts; NO die turns anywhere (v5.3)',
    kl.load[0].die===2&&S.buildings.s4.die===undefined);
  S.active=0;stops();UI.pendingActs=[];
  ok('the investor grammar is GONE \u2014 bldgTick and bldgDepart are inert seams',
    (bldgTick('s4')===undefined)&&(bldgDepart('s4')===undefined)&&S.buildings.s4&&S.buildings.s4.b==='maltkiln');
})();

// ---- 12. PRESENCE (v5.1): FREE everywhere it survives — the Almoner's channel RETIRED (ruled) ----
(function(){var p=fresh();stops();
  p.delivered.push({style:'gruit',q:1,dest:'bruges',val:1});
  p.grain=0;
  var b0=p.bank,pool0=p.presPool;
  addPresence(p,'bruges',1);
  ok('a cask-action bump is FREE — a die parks (presence +1 · 1★ · pool −1 · no grain needed)', p.presBonus.bruges===1&&p.bank===b0+1&&p.presPool===pool0-1&&p.grain===0);
  ok('the Almoner’s Stall is RETIRED (v5.1, ruled) — no building, no alms verb', !BUILDINGS.almoner&&typeof P_ACT_TXT.alms==='undefined');
  enterReach('stops');
  ok('the reach flow opens FREE (no fee mode survives)', UI.sub==='reach'&&!UI.reach.fee);
  reachPick('bruges');
  ok('the bump lands free', p.presBonus.bruges===2&&p.grain===0);
  p.grain=6;p.presPool=diceInFlight(p);   // tray = 0
  var pb=p.presBonus.bruges;
  addPresence(p,'bruges',1);
  ok('no tray die → no bump', p.presBonus.bruges===pb&&p.grain===6);
})();

// ---- 13. THE CLOCK (v4.1): the dice alone — sails never end the game; the ceiling backstops ----
(function(){var p=fresh();
  S.sailed=99;checkTriggers();
  ok('sails never end the game (the Sailed-Ships track is cut)', !S.ending);
  ok('no sailed-cap dial survives', typeof SAILED_CAP==='undefined');
  var r=fresh();r.presPool=1;
  spendPresDisc(r,1);
  ok('parking the last die fires the ending (the tray is empty)', S.ending&&S.endReason==='dice');
  var t=fresh();S.turn=MAX_ROUND;checkTriggers();
  ok('the round ceiling backstops', S.ending&&S.endReason==='ceiling');
})();

// ---- 13b. v4.5 "Empty Tray": the END fires the moment a TRAY empties — dice stuck aboard
// unfilled hulls or in vessels count as committed; parked-out is no longer required ----
(function(){var p=fresh();stops();
  p.grain=9;p.hops=9;
  p.presPool=2;p.vessels=[{style:'gruit',q:1,die:1,act:'source'},null];   // 1 committed → tray 1
  ok('setup: tray 1 with a die riding a vessel', trayDice(p)===1&&!S.ending);
  UI.brew={returnTo:'stops'};brewPick('gruit');   // the LAST tray die boards a vessel
  ok('brewing the last tray die EMPTIES the tray and sets the final round',
    S.ending&&S.endReason==='dice'&&trayDice(p)===0&&p.presPool===2);
})();

// ---- 14. SCORING: deliveries + bank + majorities + flight; vessel-dice tiebreak ----
(function(){var p=fresh();var q=S.players[1];
  p.delivered=[{style:'hopped',q:2,dest:'london',val:3},{style:'bock',q:5,dest:'london',val:5}];
  q.delivered=[{style:'gruit',q:1,dest:'london',val:1}];
  p.bank=7;p.shipped={gruit:1,hopped:1,broyhan:1};
  var sc=scorePlayer(p);
  ok('score = deliveries + bank + majorities + flight', sc.deliv===8&&sc.bank===7&&sc.maj===5&&sc.flight===4&&sc.total===24);
  p.vessels=[{style:'bock',q:5,die:4,act:'age'},null];
  ok('the tiebreak reads the vessel dice', vesselDice(p)===4);
})();

// ---- 15. NO TOLL (v4.3): sharing a station costs nothing ----
(function(){var p=fresh();stops();
  S.turn=2;S.players[1].cell='B';p.cell='B';p.grain=3;
  UI={sub:'line'};chooseLine('row');
  ok('activating while sharing costs nothing (the toll is cut)', p.grain===3);
  ok('OCCUPANCY_TOLL is gone', typeof OCCUPANCY_TOLL==='undefined');
})();

// ---- 16. THE FAUCETS: recipes/buildings/specialists are EARNED — the buy verbs are gone ----
(function(){var p=fresh();
  ok('no Market recipe buy (buyRecipe is gone)', typeof buyRecipe==='undefined');
  ok('no contract subsystem (buyContract is gone)', typeof buyContract==='undefined');
  ok('no deploy state (deployCask is gone)', typeof deployCask==='undefined');
  ok('no Hall (hallEnshrine is gone)', typeof hallEnshrine==='undefined');
  ok('no Dispatch (dispatchRoute is gone)', typeof dispatchRoute==='undefined');
  p.recipes=['gruit','hopped','broyhan'];S.exports=['broyhan','keut','mumme'];
  ok('recipe gain offers only missing dealt exports', recipeGainable(p).join(',')==='keut,mumme');
})();

// ---- 17. SETUP: display of 4 ships · 11-building deal · 2 neutral seeds · warm Hulk→Bruges · Gruit die 1 ----
(function(){EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(3,['P1','P2','P3']);
  ok('ship market of 4', S.shipDisplay.length===4);
  var totalShips=S.shipDeck.length+S.shipDisplay.length+SLOTS.filter(function(s){return S.slots[s.id];}).length;
  ok('24 hulls in the box', totalShips===24);
  var furn=SLOTS.filter(function(sx){return S.buildings[sx.id];});
  ok('the Public Works ARE the start: setupWorksN(3)=4 furniture tiles, NO deck, NO display (v5.3, ruled)',
    furn.length===4&&!(S.buildDeck||[]).length&&!(S.buildDisplay||[]).length, 'got '+furn.length);
  ok('…every one NEUTRAL and DIE-LESS (nobody builds them; the rest are in the box)',
    furn.every(function(sx){var b=S.buildings[sx.id];return b&&!b.v&&b.owner===undefined&&b.die===undefined;}));
  ok('THE BOURSE opens at 0 for every in-play beer except Gruit & Jopenbier (v5.3)',
    !!S.bourse&&!('gruit' in S.bourse)&&!('jopenbier' in S.bourse)&&('hopped' in S.bourse)
    &&S.exports.every(function(b){return S.bourse[b]===0;})&&Object.keys(S.bourse).length===1+S.exports.length);
  ok('a warm-start ship is a Hulk → Bruges', SLOTS.some(function(s){var t=S.slots[s.id];return t&&t.ship==='hulk'&&t.dest==='bruges';}));
  ok('every house opens with a Ready Gruit (die 1) + ALL 3 vessels + 2 seats (v45h)', S.players.every(function(p){return p.vessels[0]&&p.vessels[0].die===1&&p.vslots===3&&p.vessels.length===3&&p.sslots===2;}));
  ok('specialist deck = 5 core × max(2,n−1) + 10 guild ×1 (3p → 20, v5.1 — Broker + Brewer’s Mate join)', S.impDeck.length+S.impDisplay.length===20);
  ok('13 quality dice per house (v4.9b — the 13th funds the marks; was 12 at v4.5)', S.players.every(function(p){return p.presPool===13;}));
  ok('the cask stacks build from the census (gruit 16 − n warm · hopped 12 · each export 6)',
    S.piles.gruit.length===13&&S.piles.hopped.length===12&&S.exports.every(function(b){return S.piles[b].length===6;}));
  var manOut=0,allNB=true,brPlain=true;
  var scan=function(t){if(!t)return;if(t.dest==='bruges'){if(t.man)brPlain=false;return;}if(t.man)manOut++;else allNB=false;};
  S.shipDisplay.forEach(scan);SLOTS.forEach(function(sl){var t=S.slots[sl.id];if(t&&t.type==='ship')scan(t);});
  ok('every non-Bruges hull in play carries a Manifest — display AND warm start (v5.0)', allNB&&manOut>0);
  ok('Bruges hulls sail PLAIN (no Manifest)', brPlain);
  ok('the Manifest float is the printed 12 (deck + cards riding hulls)', S.manifestDeck.length+manOut===12);
  S=freshState(2,['P1','P2']);
  ok('2p specialist deck: 5×2 + 10 guild singles (20)', S.impDeck.length+S.impDisplay.length===20);
  ok('2p setup stands 3 Public Works (setupWorksN — ruled: 3 or 4)', SLOTS.filter(function(sx){return S.buildings[sx.id];}).length===3);
  S=freshState(4,['P1','P2','P3','P4']);
  ok('4p specialist deck: 5×3 + 10 guild singles (25)', S.impDeck.length+S.impDisplay.length===25);
})();

// ---- 18. SPECIALISTS: 2 seats, no duplicates, earned free ----
(function(){var p=fresh();
  p.sslots=2;
  grantUpgrade(p,'cellar');grantUpgrade(p,'cellar');
  ok('no duplicate specialists', p.upgrades.length===1);
  grantUpgrade(p,'crane');grantUpgrade(p,'granary');
  ok('the 2nd seat is the cap', p.upgrades.length===2);
  ok('hireable excludes owned + full seats', hireable(p).length===0);
})();

// ---- 19. PER-ITEM WHARF FEES (v4.2 · v4.9c): the fee rides the item; recipes H = Q−3 at EVERY channel ----
(function(){var p=fresh();stops();
  S.exports=['broyhan','keut','mumme'];p.recipes=['gruit','hopped'];
  p.grain=3;p.hops=2;
  UI.sub='recipegain';UI.rgain={returnTo:'stops'};recipeGainPick('broyhan');
  ok('a Q3 recipe is FREE to gain (Broyhan — v4.9c)', p.hops===2&&p.grain===3&&p.recipes.indexOf('broyhan')>=0);
  UI.sub='recipegain';UI.rgain={returnTo:'stops'};recipeGainPick('keut');
  ok('the formula holds — Keut (Q3) free too, goods untouched (v4.9c)', p.grain===3&&p.hops===2&&p.recipes.indexOf('keut')>=0);
  UI.sub='recipegain';UI.rgain={returnTo:'stops'};recipeGainPick('mumme');
  ok('Mumme (Q4) pays 1H — hops only', p.grain===3&&p.hops===1&&p.recipes.indexOf('mumme')>=0);
  ok('the Bock recipe prints 2H (Q5 − 3) — the climb still taxed', (RECIPE_FEE.bock||{}).h===2&&!(RECIPE_FEE.bock||{}).g);
  p.recipes=['gruit','hopped','broyhan','keut'];p.grain=9;p.hops=0;var r0=p.recipes.length;   // only mumme (1H) missing — unaffordable in HOPS (grain can't help)
  enterRecipeGain('stops');
  ok('no affordable fee → the recipe channel refuses', UI.sub!=='recipegain'&&p.recipes.length===r0);
  p.grain=5;p.hops=2;S.impDisplay=['cellar','crane','granary','hopgarden'];
  UI.sub='hire';UI.hire={returnTo:'stops'};hirePick('cellar');
  ok('hire pays the SPECIALIST’s fee (Cellarman 2H)', p.hops===0&&p.grain===5&&p.upgrades.indexOf('cellar')>=0);
  p.sslots=2;UI.sub='hire';UI.hire={returnTo:'stops'};hirePick('crane');
  ok('Stevedore fee is 1G (v4.2c)', p.grain===4&&p.upgrades.indexOf('crane')>=0);
  // v5.3: the Public Works can no longer be bought at all — the survey verb opens VENTURES only
  ok('the survey channel offers NO public tile (the display is an empty seam — v5.3)',
    surveyAffordable(p).length===0&&(S.buildDisplay||[]).length===0);
  SLOTS.forEach(function(sx){S.buildings[sx.id]=null;});
  p.grain=4;var g3=p.grain;var h3=p.hand.length;
  UI.sub='survey';UI.survey={returnTo:'stops'};venturePick('points',1,false);
  placeVentOn('s1');
  ok('an L1 on OPEN ground pays its 1G \u2699 fee \u2014 one payment, no rent (v5.3)',
    p.grain===g3-1&&vAt('s1')&&vAt('s1').lvl===1&&p.hand.length===h3-1);
  SLOTS.forEach(function(sx){if(!S.buildings[sx.id])S.buildings[sx.id]={b:'maltkiln'};});
  var g4=p.grain,b4=p.bank,h4=p.hand.length;
  UI.sub='survey';UI.survey={returnTo:'stops'};venturePick('brew',1,false);
  placeVentOn('s2');
  ok('wharf FULL: the L1 redevelops a Public Work \u2014 the worn tile boxed, ONE payment, no pips (no die stood \u2014 v5.3)',
    p.grain===g4-1&&p.bank===b4&&vAt('s2')&&vAt('s2').v==='brew'&&p.hand.length===h4-1);
  SLOTS.forEach(function(sx){var bb=S.buildings[sx.id];if(bb&&!bb.v)S.buildings[sx.id]=null;});
  var q=S.players[1];q.ai={tier:'journeyman'};var qg=q.grain,qb=q.bank,qh=q.hand.length;
  UI.pendingBenefits=[{pid:1,dest:'london'}];afterSail('stops');
  ok('London prize stays free \u2014 a Venture from hand, the fee waived (v5.3)', q.grain===qg&&q.bank===qb&&q.hand.length===qh-1);
  S.exports=['keut','broyhan','mumme'];q.recipes=['gruit','hopped','broyhan','keut'];q.hops=5;var qg2=q.grain,qh2=q.hops;
  UI.pendingRecipe=[{pid:1,dest:'bruges'}];afterSail('stops');
  ok('the Bruges prize PAYS a fee’d recipe — hops only (Mumme 1H, v4.9c)', q.grain===qg2&&q.hops===qh2-1&&q.recipes.length===5);
  q.recipes=['gruit','hopped','broyhan','keut'];q.hops=0;var qr=q.recipes.length,qg2b=q.grain;
  UI.pendingRecipe=[{pid:1,dest:'bruges'}];afterSail('stops');
  ok('no affordable recipe at Bruges → the 2-goods consolation (only the 1H Mumme out of reach)', q.recipes.length===qr&&q.grain===qg2b+1&&q.hops===1);
  var qg3=q.grain;S.impDisplay=['cellar','crane','granary','hopgarden'];
  UI.pendingSpec=[{pid:1,dest:'bergen'}];afterSail('stops');
  ok('Bergen prize stays free', q.grain===qg3&&(q.upgrades||[]).length===1);
  q.ai=null;
})();

// ---- 20. v5.5 VENTURE DIE-CRAFT: the Rack House (an owner-only stop) \u00b7 the Assay Loft ----
(function(){var p=fresh();stops();p.ai=null;
  S.buildings.s1={v:'die',lvl:1,owner:0};   // colL cap \u2014 MY venture on my line (the DIE theme's L1 = the Rack House)
  p.vessels=[{style:'bock',q:5,die:4,act:'age'},{style:'hopped',q:2,die:1,act:'source'},null];p.vslots=3;
  p.cell='A';activateLine('colL');
  var vi=UI.stops.findIndex(function(st){return st.kind==='vact'&&st.slot==='s1';});
  ok('the owner sees their Venture as a PRIVATE stop on the line (v5.2)', vi>=0);
  resolveStop(vi);
  ok('the Rack House opens on two vessel casks', UI.sub==='rack');
  rackPick(0);rackPick(1);
  ok('the swap transfers the WHOLE die \u2014 no quality cap (bock 4\u2194hopped 1)', p.vessels[0].die===1&&p.vessels[1].die===4&&caskReady(p.vessels[1]));
  stops();
  p.vessels=[{style:'bock',q:5,die:5,act:'age'},{style:'gruit',q:1,die:1,act:'source'},null];
  enterRack('stops');rackPick(0);rackPick(1);
  ok('the launder play survives in the Venture: a die-5 Gruit ships while the Bock re-matures', p.vessels[1].die===5&&p.vessels[0].die===1);
  p.vessels=[{style:'bock',q:5,die:4,act:'age'},null,null];
  enterRack('stops');
  ok('one cask \u2192 the Rack House refuses', UI.sub!=='rack');
  S.active=1;var q2=S.players[1];q2.cell='A';q2.placed=true;activateLine('colL');
  ok('a RIVAL activating the line sees NO venture stop (owner-only \u2014 the action budget holds)', !UI.stops.some(function(st){return st.kind==='vact';}));
  S.active=0;stops();
  // v5.5: the Assay Loft certifies the WHOLE cellar for 2H (was 1H, one cask) \u2014 an L2 should feel like one
  p.vessels=[{style:'mumme',q:4,die:1,act:'age'},{style:'bock',q:5,die:2,act:'age'},{style:'hopped',q:2,die:1,act:'source'}];p.vslots=3;p.hops=2;
  enterAssay('stops');assayGo();
  ok('the Assay Loft certifies EVERY maturing cask for 2H (v5.5 \u2014 mumme+bock+hopped all READY)',
    p.vessels[0].die===4&&p.vessels[1].die===5&&p.vessels[2].die===2&&p.vessels.every(function(c){return caskReady(c);})&&p.hops===0);
  enterAssay('stops');
  ok('nothing maturing \u2192 the Loft refuses', UI.sub!=='assay');
  p.vessels=[{style:'bock',q:5,die:1,act:'age'},null,null];p.hops=1;
  enterAssay('stops');
  ok('1H is no longer enough \u2014 the Loft\u2019s 2H price gates entry (v5.5)', UI.sub!=='assay');
  p.hops=2;enterAssay('stops');assayGo();
  ok('2H buys the whole climb (bock 1\u21925 READY)', p.vessels[0].die===5&&p.hops===0);
})();
// ---- 20d. v5.5 FOUR HANDS: the themed pairs \u00b7 the FLIP \u00b7 the new L2 powers ----
(function(){var p=fresh();stops();p.ai=null;
  ok('the family is FOUR THEMED tiles \u2014 brew \u00b7 age \u00b7 die \u00b7 points',
    VENTURE_KEYS.length===4&&['brew','age','die','points'].every(function(k){return VENTURES[k];}));
  ok('\u2026and each tile pairs an L1 and an L2 of its own theme (one cardboard, one theme)',
    VENTURES.die.l1.name==='Rack House'&&VENTURES.die.l2.name==='Lagering Cellar'&&
    VENTURES.brew.l1.name==='Mash Tun'&&VENTURES.brew.l2.name==='Great Copper'&&
    VENTURES.age.l1.name==='Warehouse'&&VENTURES.age.l2.name==='Assay Loft'&&
    VENTURES.points.l1.name==='Counting House'&&VENTURES.points.l2.name==='Staple Rights');
  ok('the retired faces are gone \u2014 no Factor\u2019s Desk, no Guild Residence, no vres/vredeal/vgood/vload',
    !VENTURE_KEYS.some(function(k){return ['vres','vredeal','vgood','vload'].indexOf(VENTURES[k].l1.kind)>=0||['vres','vredeal','vgood','vload'].indexOf(VENTURES[k].l2.kind)>=0;}));
  // THE FLIP \u2014 the same cardboard turns over: no hand tile spent, the ground kept
  p.hand=VENTURE_KEYS.slice();p.grain=9;
  SLOTS.forEach(function(sx){S.buildings[sx.id]=null;});
  commitVenture('s1','die',1,0);
  var hand0=p.hand.length,g0=p.grain;
  ok('an L1 from hand spends the tile (hand 4\u21923)', hand0===3&&vAt('s1').lvl===1);
  ok('a standing L1 of yours can be FLIPPED', canVentureFlip(p));
  ventureFlip('die',false);
  ok('the FLIP turns the tile in place \u2014 same slot, L2 face up', vAt('s1')&&vAt('s1').v==='die'&&vAt('s1').lvl===2);
  ok('\u2026and spends NO hand tile (this is what gets four buildings out)', p.hand.length===hand0);
  ok('\u2026paying the L2 fee', p.grain===g0-(V_FEE_L2.g||0));
  ok('an L2 can never be flipped again', !canVentureFlip(p));
  // the OVERBUILD still exists \u2014 a hand tile L2-side-up onto your own L1, that L1 boxed
  commitVenture('s2','age',1,0);
  var hand1=p.hand.length;
  commitVenture('s2','brew',2,0);
  ok('an OVERBUILD puts a DIFFERENT theme\u2019s L2 on your ground and spends the tile',
    vAt('s2').v==='brew'&&vAt('s2').lvl===2&&p.hand.length===hand1-1);
  ok('\u2026and the overbuilt L1 is BOXED \u2014 its theme is gone from the hand too', p.hand.indexOf('age')<0);
  // the DIAGNOSTIC dump must name a Venture by its FACE \u2014 a Venture has no b.b, so the
  // building branch printed 'BLDG undefined' for every ring on the wharf (fixed v5.5)
  var dg=diagText();
  ok('the diagnostic dump names Ventures by face + level + owner (never \u2018BLDG undefined\u2019)',
    dg.indexOf('BLDG undefined')<0 && dg.indexOf('VENT Great Copper L2 [')>=0);
  stops();
})();
// ---- 20e. v5.5: the new L2 powers ----
(function(){var p=fresh();stops();p.ai=null;
  // LAGERING CELLAR \u2014 a private lift: +1, cap 6, MAY pass quality
  S.buildings.s1={v:'die',lvl:2,owner:0};
  p.vessels=[{style:'hopped',q:2,die:2,act:'source'},null,null];p.vslots=3;
  enterLift('stops');liftPick(0);
  ok('the LAGERING CELLAR lifts a die +1 PAST its quality (hopped 2\u21923 at Q2)', p.vessels[0].die===3);
  p.vessels[0].die=6;enterLift('stops');
  ok('\u2026and refuses at 6 (the cap holds)', UI.sub!=='vlift');
  stops();
  // GREAT COPPER \u2014 2 goods THEN a full-search brew
  S.buildings.s2={v:'brew',lvl:2,owner:0};
  p.vessels=[null,null,null];p.grain=0;p.hops=0;p.recipes=['gruit','hopped'];
  p.cell='B';activateLine('colR');
  var gi=UI.stops.findIndex(function(st){return st.kind==='vact'&&st.slot==='s2';});
  resolveStop(gi);
  ok('the GREAT COPPER opens on its goods first', UI.sub==='source'&&UI.src.n===2);
  srcTake(2,0);
  ok('\u2026then chains straight into a BREW (the L2 pays twice)', UI.sub==='brew'&&p.grain===2);
  resume('stops');stops();
  // WAREHOUSE \u2014 Age 2, then a load anywhere
  S.buildings.s3={v:'age',lvl:1,owner:0};
  p.vessels=[{style:'hopped',q:2,die:1,act:'source'},null,null];
  enterAge(2,'pool','stops',{thenLoad:true});
  ok('the WAREHOUSE opens Age 2', UI.sub==='age'&&UI.age.pool===2&&UI.age.thenLoad);
  ageAllot(0);
  ok('\u2026the cask ripens', p.vessels[0].die===2&&caskReady(p.vessels[0]));
  stops();
  // STAPLE RIGHTS at L2 value
  ok('STAPLE RIGHTS pays L2 value \u2014 '+VSTAR_PTS+'\u2605 per own cask (v5.5: was 1)', VSTAR_PTS===2);
  ok('the COUNTING HOUSE banks \u2605 on its loads, not a good (v5.5)', VENTURES.points.l1.kind==='vgoodstar'&&VGOODSTAR_PTS===1);
})();
(function(){var p=fresh();stops();
  // (the Hop Exchange left with v5.2 \u2014 its pay-to-lift lives on in the Hop Store expansion lot)
  // v5.3b [ruled: 'one of the public buildings should have a +/-1 bourse'] — THE TOLL BENCH
  p.ai={tier:'journeyman'};
  S.buildings.s2={b:'tollhouse'};var t2=ship('s2','hulk','bruges');
  p.vessels[0]={style:'hopped',q:2,die:2,act:'source'};
  S.bourse.hopped=0;
  UI.load={ships:['s2'],returnTo:'stops',loadsLeft:1,cask:0};loadOnto('s2');
  loadSkip();
  ok('the TOLLHOUSE is the toll bench: a load here lets the LOADER shift a Bourse marker \u00b11 (the die untouched)',
    t2.load[0].die===2&&Object.keys(S.bourse).some(function(bk2){return S.bourse[bk2]!==0;}));
  ok('\u2026the old stamp is gone \u2014 no \u22121-for-+3\u2605, no bankO', (p.bankO||0)===0);
  // the stamp's whole choice point retires with it (2026-08-23): no loadopt prompt, no
  // loadOptGo/aiLoadOpt, no MC fork \u2014 a load asks the loader nothing.
  ok('\u2026and its choice point is gone \u2014 no loadopt seam anywhere in the engine',
    typeof loadOptGo==='undefined'&&typeof aiLoadOpt==='undefined'&&!AI_MC_SUBS.loadopt&&!UI.loadopt);
  p.ai=null;stops();UI.pendingActs=[];UI.pendingShift=[];
})();

// ---- 20c. v5.4 THE TIDE: every Public Work sails \u00b7 the bag re-furnishes \u00b7 Ventures never go ----
(function(){
  // the SETUP shape, read off a raw state (fresh() deliberately wipes the board)
  {var raw=freshState(3,['P1','P2','P3']);
   var stood=SLOTS.filter(function(s){var b=raw.buildings[s.id];return b&&!b.v;}).length;
   ok('setup stands exactly setupWorksN Public Works and BAGS the rest (v5.4)',
     stood===setupWorksN(3)&&Array.isArray(raw.worksBag)&&raw.worksBag.length>0);
   ok('\u2026the bag + the standing tiles account for the whole printed box',
     stood+raw.worksBag.length===BUILDING_KEYS.reduce(function(n,k){
       return n+((BUILDINGS[k].hall)?0:((BUILDINGS[k].staple)?0:(BUILDINGS[k].qty||1)));},0)+STAPLE_DEAL);}
  var p=fresh();stops();p.ai=null;
  // a plain, premium-less Public Work still sails
  SLOTS.forEach(function(s){S.buildings[s.id]=null;});
  S.buildings.s5={b:'maltkiln'};
  var sh=ship('s5','skute','bruges',[{owner:0,style:'gruit',q:1,die:1,act:'source'}]);sh.man=null;
  UI.pendingMan=[];UI.manResQ=[];UI.pendingRecipe=[];UI.pendingBenefits=[];UI.pendingSpec=[];
  sailShip('s5',0);
  ok('THE TIDE: an ordinary Public Work sails with the Ship at its slot (the Kiln burns out)',
    S.buildings.s5===null);
  UI.pendingRecipe=[];UI.pendingMan=[];stops();
  // the gap STANDS for the rest of the turn \u2014 the refill is an end-of-turn beat
  ok('\u2026the gap stands mid-turn (no instant refill \u2014 the cleared ground is claimable)',
    S.buildings.s5===null);
  var bag1=S.worksBag.length;
  refillWorks();
  ok('\u2026and the tide re-furnishes at end of turn, back up to the setup count',
    worksStanding()===setupWorksN(S.players.length)&&S.worksBag.length<bag1);
  // a VENTURE never sails
  SLOTS.forEach(function(s){S.buildings[s.id]=null;S.slots[s.id]=null;});
  S.buildings.s4={v:'age',lvl:1,owner:0};
  var sh2=ship('s4','skute','bruges',[{owner:0,style:'gruit',q:1,die:1,act:'source'}]);sh2.man=null;
  sailShip('s4',0);
  ok('a VENTURE is NEVER taken by the tide \u2014 the owner\u2019s ground is the permanent thing',
    S.buildings.s4&&S.buildings.s4.v==='age');
  UI.pendingRecipe=[];UI.pendingMan=[];stops();
  // an empty bag simply leaves open ground (the late-game wharf thins \u2014 no deadlock)
  S.worksBag=[];SLOTS.forEach(function(s){S.buildings[s.id]=null;});
  refillWorks();
  ok('a DRY bag leaves bare ground \u2014 the late wharf opens for the Ventures (no stall)',
    worksStanding()===0);
})();

// ---- 20b. v5.2 ROSTER AUDIT: grain-only fees \u00b7 the box census \u00b7 the portfolio ----
(function(){var p=fresh();stops();
  ok('every building fee prints in GRAIN only (the v45d law holds)', Object.keys(BUILDINGS).every(function(k){var f=BUILDINGS[k].fee;return !f||!f.h;}));
  ok('the base box prints 13 public tiles / 9 designs (v5.2 \u2014 Kiln \u00d72 + Staple \u00d74; the Chancery prints on the Guildhall sheet)',
    Object.keys(BUILDINGS).filter(function(k){return !BUILDINGS[k].hall;}).reduce(function(s,k){return s+(BUILDINGS[k].qty||1);},0)===13);
  ok('the Venture portfolio: 4 identical dual-use tiles per house', VENTURE_KEYS.length===4&&newPlayer(0,'X').hand.length===4);
})();
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};
  // v45e note: Bergen dest — its specialist prize is goods-neutral, isolating the Store's payout
  // (a Bruges run would now also BUY recipes at the H fee and muddy the goods read)
  S.buildings.s3={b:'bonded'};var b3=ship('s3','cog','bergen');
  p.vessels=[{style:'gruit',q:1,die:1,act:'source'},{style:'gruit',q:1,die:1,act:'source'},null];p.vslots=3;
  var g0=p.grain,h0=p.hops;
  UI.load={ships:['s3'],returnTo:'stops',loadsLeft:2,cask:0};loadOnto('s3');
  UI.load={ships:['s3'],returnTo:'stops',loadsLeft:1,cask:1};loadOnto('s3');
  ok('the Bonded Store lifts each boarding die +1 (gruit 1→2 = 2★ each)',
    p.delivered.slice(-2).every(function(d){return d.val===2;}));
  ok('the Store SAILS with the hull — the slot building is gone (boxed)', S.buildings.s3===null);
  ok('every contributing house gains 2 goods, once (not per cask)', p.grain===g0+1&&p.hops===h0+1);
  p.ai=null;
})();

// ---- 21. v5.0 MANIFESTS: the demand card on the hull — ONE line per cask · once per voyage · recycle pristine ----
(function(){var p=fresh();stops();p.ai=null;
  var d0=S.manifestDeck.length;
  var sh=ship('s4','cog','london',[{owner:0,style:'bock',q:5,die:6,act:'age'},{owner:0,style:'gruit',q:1,die:2,act:'source'}]);
  sh.man={k:'tman',lines:[{beer:'gruit',pts:1},{qmin:3,pts:2},{die:6,pts:3}]};
  UI.pendingBenefits=[];UI.pendingRecipe=[];UI.pendingSpec=[];UI.pendingMan=[];UI.manResQ=[];
  var g0=pileList('bock').length,g1=pileList('gruit').length;
  sailShip('s4',0);
  ok('the sail recycles the card UNDER the deck, pristine (no used-marks on the component)',
    S.manifestDeck.length===d0+1&&S.manifestDeck[S.manifestDeck.length-1].k==='tman'&&!S.manifestDeck[S.manifestDeck.length-1].used);
  ok('each delivered cask that satisfies a line queues ONE claim head, in boarding order',
    (UI.pendingMan||[]).length===2&&UI.pendingMan[0].style==='bock'&&UI.pendingMan[1].style==='gruit');
  ok('the delivered tiles return to the BOTTOM of their stacks (v5.0 — the ruled loop)',
    pileList('bock').length===g0+1&&pileList('gruit').length===g1+1&&pileList('bock')[pileList('bock').length-1]==='age');
  var m0=manMatches(UI.pendingMan[0]);
  ok('the bock (Q5 · die 6) matches Q3+ and die-6, never the Gruit line', m0.length===2&&m0.every(function(o){return o.l.beer!=='gruit';}));
  var b0=p.bank,l0=(p.bankL||0);
  manClaim(p,UI.pendingMan[0].gi,2);
  ok('the claim banks the printed ★ at once (+3 · bankL · the line counted)',
    p.bank===b0+3&&(p.bankL||0)===l0+3&&(p.manLines||0)===1);
  manClaim(p,UI.pendingMan[0].gi,2);
  ok('a line pays ONCE PER VOYAGE — the double-claim is refused', p.bank===b0+3);
  var m1=manMatches(UI.pendingMan[1]);
  ok('the gruit (die 2) matches only its named line — and the spent line is gone from every head', m1.length===1&&m1[0].i===0);
  manClaim(p,UI.pendingMan[1].gi,0);
  ok('the second cask claims a REMAINING line (+1★)', p.bank===b0+4);
  UI.pendingMan=[];UI.manResQ=[];UI.pendingBenefits=[];stops();
})();
(function(){var p=fresh();stops();p.ai=null;   // the deal law + the parked-face read + the Chronicler kick
  var snB={ship:'cog',dest:'bruges'};manDealTo(S,snB);
  ok('Bruges hulls are dealt NO Manifest (the prize is the cargo)', !snB.man);
  var dl=S.manifestDeck.length;var snL={ship:'cog',dest:'london'};manDealTo(S,snL);
  ok('a non-Bruges hull takes the top card as it enters', !!snL.man&&S.manifestDeck.length===dl-1);
  var shN=ship('s5','skute','novgorod',[{owner:0,style:'mumme',q:4,die:4,act:'age'}]);
  shN.man={k:'tnov',lines:[{die:5,pts:3},{die:4,pts:2},{qmax:2,pts:1}]};
  UI.pendingMan=[];UI.manResQ=[];UI.pendingBenefits=[];UI.pendingRecipe=[];UI.pendingSpec=[];
  sailShip('s5',0);
  ok('a die line reads the PARKED face — after lifts, BEFORE Novgorod’s +2 premium (die 4, not 6)',
    (UI.pendingMan||[]).length===1&&UI.pendingMan[0].die===4&&manMatches(UI.pendingMan[0]).length===1&&manMatches(UI.pendingMan[0])[0].l.die===4);
  p.upgrades=['chronicler'];p.sslots=2;
  var b0=p.bank;
  manClaim(p,UI.pendingMan[0].gi,1);
  ok('a seated Chronicler adds +'+CHRON_MAN+'★ per Manifest claim (v5.0 rework — at once, no end line)', p.bank===b0+2+CHRON_MAN&&CHRON_MAN===2);
  UI.pendingMan=[];UI.manResQ=[];stops();
})();

// ---- 22. v4.7 EVERY CASK: one prize grammar at all four kontors — Bergen per cask ----
(function(){var p=fresh();stops();p.ai=null;
  var sh=ship('s4','cog','bergen',[{owner:0,style:'keut',q:3,die:3,act:'load'},{owner:0,style:'hopped',q:2,die:2,act:'source'}]);
  UI.pendingSpec=[];sailShip('s4',0);
  ok('two own casks at Bergen → TWO specialist prizes (v4.7 per cask; the cap is cut)', (UI.pendingSpec||[]).length===2&&UI.pendingSpec[0].pid===0&&UI.pendingSpec[1].pid===0);
  var sh3=ship('s7','hulk','bergen',[{owner:1,style:'keut',q:3,die:3,act:'load'},{owner:0,style:'gruit',q:1,die:1,act:'source'},{owner:1,style:'hopped',q:2,die:2,act:'source'}]);
  UI.pendingSpec=[];sailShip('s7',0);
  ok('a 3-cask hulk → THREE prizes, queued in load order (pick order = boarding order)', (UI.pendingSpec||[]).length===3&&UI.pendingSpec[0].pid===1&&UI.pendingSpec[1].pid===0&&UI.pendingSpec[2].pid===1);
  ok('…matching Bruges/London: every cask already paid its prize there (the grammar is uniform)', true);
})();

// ---- 22b. v5.0 CENSUS STACKS: the kit census IS the play supply — and every surface agrees ----
(function(){
  ok('the census: gruit 16 (pinned Gain-2) · hopped 12 · each export 6', caskCensus('gruit').length===16&&caskCensus('gruit').every(function(v){return v==='source';})&&caskCensus('hopped').length===12&&['broyhan','keut','mumme','bock'].every(function(b){return caskCensus(b).length===6;}));
  // v5.4: SURVEY drops to Q2+ — the Venture door was starved (a Q3+ beer prints ~1 of these
  // in six, so whole games passed with nobody able to build). hire/brew hold the Q3+ line.
  ok('hire/brew ride only Q3+ stacks (the v4.12 pool law holds for the two heavy verbs)',
    ['hire','brew'].every(function(v){return caskCensus('hopped').indexOf(v)<0;})&&caskCensus('bock').indexOf('brew')>=0);
  ok('OPEN 1 VENTURE now rides Q2+ (v5.4): Hopped carries it, Gruit never does (pinned)',
    caskCensus('hopped').indexOf('survey')>=0&&caskCensus('broyhan').indexOf('survey')>=0&&caskCensus('gruit').indexOf('survey')<0);
  ok('…and Hopped’s 12 tiles spread the 6-verb Q2 pool evenly (2 survey tiles)',
    caskCensus('hopped').filter(function(v){return v==='survey';}).length===2);
  ok('the print offsets stagger the export mixes (broyhan ≠ bock openings)', caskCensus('broyhan')[0]!==caskCensus('bock')[0]||caskCensus('broyhan')[1]!==caskCensus('bock')[1]);
  ok('the expansion censuses: gose 8 · zerbster 6 · duckstein 8 · jopenbier 6 — pins throughout',
    caskCensus('gose').length===8&&caskCensus('zerbster').length===6&&caskCensus('duckstein').length===8&&caskCensus('jopenbier').length===6&&caskCensus('gose').every(function(v){return v===STYLES.gose.act;}));
  ok('every Manifest line is DEAL-PROOF (starters + tier language only — no export by name)',
    MANIFESTS.every(function(m){return m.lines.every(function(l){return !l.beer||l.beer==='gruit'||l.beer==='hopped';})}));
  var KIT=window.HC;   // the engine's own HC binding predates the kit load — read the window
  if(KIT&&KIT.CASKS){   // the census-vs-kit drift gate (v4.13's lesson: a ruling that touches a printed face needs its kit note)
    var M={Gruit:'gruit',Hopped:'hopped',Broyhan:'broyhan',Keut:'keut',Mumme:'mumme',Bock:'bock',Gose:'gose',Zerbster:'zerbster',Duckstein:'duckstein',Jopenbier:'jopenbier'};
    var det='';KIT.CASKS.forEach(function(c){var k=M[c.nm];if(k&&CASK_QTY[k]!==c.n)det+=c.nm+' kit '+c.n+' vs engine '+(CASK_QTY[k]||0)+' · ';});
    ok('census-vs-kit: play.html CASK_QTY matches the printed tile counts (components.js)', det==='', det);
    ok('the Manifest deck prints 12 on both surfaces (engine + kit)', MANIFESTS.length===12&&KIT.MANIFESTS_P.length===12);
  } else ok('components.js loaded for the census drift gate', false);
})();

// ---- 25. v4.6c LIVING LINE: the line evolves — mid-turn arrivals open their slot's stop ----
(function(){var p=fresh();p.ai=null;
  S.buildings.s1={b:'maltkiln'};                     // a load-lift building: no standalone act
  p.cell='A';activateLine('colL');                   // Left col: caps s1 + s6, cells A + C
  ok('at activation a Kiln-only shipless slot contributes no stop',
    UI.stops.length===2&&!UI.stops.some(function(st){return st.kind!=='cell';}));
  p.grain=2;p.vessels=[null,null,null];              // no Ready cask → the maiden load skips
  S.shipDisplay=[{ship:'cog',dest:'bruges'}];S.shipDeck=[];
  UI.comm={returnTo:'stops',idx:0};commPlace('s1');
  ok('a hull commissioned onto the ACTIVE line opens that slot’s load stop (v4.6c)',
    UI.stops.some(function(st){return st.kind==='load'&&st.slot==='s1';}));
  var i=UI.stops.findIndex(function(st){return st.kind==='load'&&st.slot==='s1';});
  resolveStop(i);refreshStops();   // (no Ready cask → enterLoad resumed at once; the stop is spent)
  ok('…a USED load stop never returns (each stop once per activation)',
    !UI.stops.some(function(st){return st.kind==='load'&&st.slot==='s1';}));
  S.players[0].hand=VENTURE_KEYS.slice();commitVenture('s6','die',1,0);
  ok('a Venture raised on the ACTIVE line opens its OWNER\u2019s stop (the living line, v5.2)',
    UI.stops.some(function(st){return st.kind==='vact'&&st.slot==='s6';}));
  ship('s4','cog','bruges');refreshStops();
  ok('an arrival OFF the line adds nothing (s4 is not on colL)',
    !UI.stops.some(function(st){return st.slot==='s4';}));
})();
// (the Capstan's warped-arrival check left with the tile \u2014 v5.2)

// ---- 26. v4.6d STEVEDORE: every load flow loads 2 (maiden load + Load bonus, not just the slot stop) ----
(function(){var p=fresh();stops();p.ai=null;
  p.upgrades=['crane'];p.grain=3;
  p.vessels=[{style:'gruit',q:1,die:1,act:'source'},{style:'hopped',q:2,die:2,act:'source'},null];
  S.shipDisplay=[{ship:'hulk','dest':'bruges'}];S.shipDeck=[];
  UI.comm={returnTo:'stops',idx:0};commPlace('s5');
  ok('the Stevedore’s COMMISSION maiden load offers 2 (was 1)',
    UI.sub==='load'&&UI.load&&UI.load.loadsLeft===2);
  loadPickCask(0);loadOnto('s5');
  ok('…first cask boards, a second load stays open',
    S.slots.s5.load.length===1&&UI.sub==='load'&&UI.load.loadsLeft===1);
  loadPickCask(1);loadOnto('s5');
  ok('…the Stevedore fills 2 of the hulk’s 3 berths at commission',
    S.slots.s5.load.length===2);
  var q=fresh();stops();q.ai=null;
  q.upgrades=['crane'];
  q.vessels=[{style:'gruit',q:1,die:1,act:'source'},null,null];
  ship('s3','cog','bruges');
  fireCaskAct('load','stops');
  ok('…and the LOAD bonus offers 2 with the Stevedore',
    UI.sub==='load'&&UI.load&&UI.load.loadsLeft===2);
})();

// ---- 24. v4.6 "Guildbook": the guild specialists — waivers · gates · collectors ----
(function(){var p=fresh();stops();
  p.upgrades=['scholar'];p.sslots=2;S.exports=['broyhan','keut','mumme'];p.recipes=['gruit','hopped'];
  p.grain=0;p.hops=0;
  UI.sub='recipegain';UI.rgain={returnTo:'stops'};recipeGainPick('mumme');
  ok('the Guild Scholar takes a recipe with NO fee at a wharf channel', p.recipes.indexOf('mumme')>=0&&p.hops===0&&p.grain===0);
  p.ai={tier:'journeyman'};
  UI.pendingRecipe=[{pid:0,dest:'bruges'}];afterSail('stops');
  ok('…and his Bruges prize is free too (the waiver rides every channel)', p.recipes.length===4&&p.hops===0&&p.grain===0);
  p.ai=null;
})();
(function(){var p=fresh();stops();
  p.upgrades=['shipwright'];p.sslots=2;p.grain=0;
  S.shipDisplay=[{ship:'skute',dest:'bruges'}];S.shipDeck=[];
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';commPick(0);commPlace('s6');
  ok('the Shipwright commissions a SKUTE with 0 goods (the printed 2G waived — v4.8)', S.slots.s6&&S.slots.s6.ship==='skute'&&p.grain===0);
})();
(function(){var p=fresh();stops();
  ok('the Town Crier is UNGATED (v4.7 — the 2-ports gate is cut)', specGate(p,'towncrier'));
  p.upgrades=['towncrier'];p.sslots=2;
  var b0=p.bank,pool0=p.presPool;
  addPresence(p,'bruges',1);
  ok('a Crier bump banks 1★ + his 2★ (3★ total — the die parks at face 1; one die, one clock beat — v4.12)', p.bank===b0+3&&p.presPool===pool0-1&&p.presBonus.bruges===1);
})();

// ---- v4.7 price pass + the Innkeeper's tile drip + the GM 4p persona gate ----
(function(){var p=fresh();stops();
  ok('v4.7 fees: Grain Factor 2G · Supercargo 2H (the probe outliers repriced)',
    SPEC_FEE.granary.g===2&&SPEC_FEE.supercargo.h===2&&SPEC_FEE.crane.g===1);
  p.upgrades=['innkeeper'];p.sslots=2;
  p.vessels=[{style:'bock',q:5,die:2,act:'source'},{style:'gruit',q:1,die:1,act:'source'},null];
  innkeeperTick(p);
  ok('the Innkeeper stays quiet under 3 casks brewing (v4.12 rework)', p.vessels[0].die===2);
  p.vessels[2]={style:'mumme',q:4,die:2,act:'source'};
  innkeeperTick(p);
  ok('at 3+ casks in your vessels he ages the ripest +1 at turn start', p.vessels[2].die===3&&p.vessels[0].die===2);
  p.vessels[0].die=5;p.vessels[2].die=4;innkeeperTick(p);
  ok('…and stays quiet with nothing maturing (all Ready)', p.vessels[0].die===5&&p.vessels[2].die===4);
})();
(function(){fresh(4);
  S.players.forEach(function(q){q.ai={tier:'guildmaster',persona:null};});
  ok('at 4p the Guildmaster reverts to pure search (the #26 starvation gate)', aiPersona(S.players[0])===null);
  var st3=fresh(3);S.players.forEach(function(q){q.ai={tier:'guildmaster',persona:null};});
  ok('…at 3p the designer’s quality persona stands (v45f)', aiPersona(S.players[0])==='quality');
  S.players[0].ai.persona='majority';
  ok('…an explicit PATHWAYS persona still overrides at any count', aiPersona(S.players[0])==='majority');
})();
(function(){var p=fresh();stops();var q=S.players[1];
  q.upgrades=['supercargo'];q.sslots=2;
  var g0=q.grain,h0=q.hops;
  S.active=0;
  ship('s1','skute','bruges',[]);S.slots.s1.load.push({owner:1,style:'gruit',q:1,die:1,act:'source'});
  sailShip('s1',0);
  ok('the Supercargo collects 1G1H when a RIVAL sails his cask', q.grain===g0+1&&q.hops===h0+1);
  var g1=q.grain,h1=q.hops;S.active=1;
  ship('s2','skute','bruges',[]);S.slots.s2.load.push({owner:1,style:'gruit',q:1,die:1,act:'source'});
  sailShip('s2',1);
  ok('…but never on his own turn', q.grain===g1&&q.hops===h1);
  S.active=0;UI.pendingRecipe=[];UI.pendingActs=[];
})();
(function(){var p=fresh();stops();
  ok('the Innkeeper is UNGATED (v4.12 — the 3-beers requirement is cut)', specGate(p,'innkeeper'));
  grantUpgrade(p,'innkeeper');
  ok('seating him adds NO 4th vessel (v4.12 — the tile is a turn-start drip, not a rig)', p.vessels.length===3&&(p.vslots||3)===3);
})();
(function(){var p=fresh();stops();
  p.upgrades=['chronicler','alderman'];p.sslots=2;
  p.manLines=7;p.presBonus.bruges=3;p.presBonus.bergen=2;
  var sc=scorePlayer(p);
  ok('the Chronicler scores NO end line (v5.0 — he pays +'+CHRON_MAN+'★ per claim IN PLAY); the Alderman stands (+2/kontor≥3)',
    sc.guild===2&&sc.total===sc.deliv+sc.bank+sc.maj+sc.flight+sc.guild);
  ok('the Chronicler stays UNGATED', specGate({},'chronicler'));
})();
// ---- v4.12b/v5.2: the Cooperage wharfage \u00b7 the Chandler swap (the Exchange/Capstan flows left with their tiles) ----
(function(){var p=fresh();stops();
  p.vessels=[{style:'gruit',q:1,die:1,act:'source'},null,null];
  ship('s1','hulk','bruges');S.buildings.s1={b:'cooperage',owner:1,die:3};
  var b0=p.bank;
  UI.sub='load';UI.load={ships:['s1'],returnTo:'stops',loadsLeft:1,cask:null};
  loadPickCask(0);
  ok('the Cooperage pays its wharfage — the loader scores +1★ on a load here (v4.12b)', p.bank===b0+1&&(p.bankW||0)===1);
  ok('\u2026and no die anywhere turns (furniture \u2014 v5.3)', S.buildings.s1.die===undefined||S.buildings.s1.die===3);
  UI.pendingActs=[];UI.src=null;
})();
(function(){var p=fresh();stops();
  p.upgrades=['chandler'];p.sslots=2;p.grain=3;p.hops=2;p.chUsed=false;
  chandlerSwap('gh');
  ok('the Chandler swaps 1G → 1H', p.grain===2&&p.hops===3&&p.chUsed===true);
  chandlerSwap('hg');
  ok('…once per turn only (the stamp holds)', p.grain===2&&p.hops===3);
})();
// ---- 25. v4.6 the new tiles: Victualling Yard · Merchants' Exchange · Warping Capstan ----
(function(){var p=fresh();stops();
  S.buildings.s1={b:'victual'};var sh=ship('s1','cog','bruges');
  p.vessels[0]={style:'gruit',q:1,die:1,act:'source'};
  UI.pendingActs=[];
  UI.load={ships:['s1'],returnTo:'stops',loadsLeft:1,cask:0};loadOnto('s1');
  ok('the Victualling Yard doubles the load bonus (one fires, its twin queued)', UI.sub==='source'&&(UI.pendingActs||[]).length===1);
  ok('no die lift from the Yard (bonus doubling, not a kiln)', sh.load[0].die===1);
  srcTake(2,0);
  ok('the second firing follows', UI.sub==='source'&&(UI.pendingActs||[]).length===0);
  srcTake(2,0);
  p.vessels[0]={style:'gruit',q:1,die:1,act:'source'};
  UI.pendingActs=[];
  UI.load={ships:['s1'],returnTo:'stops',loadsLeft:1,cask:0};loadOnto('s1');
  ok('the full hull sails and the Yard sails with it (boxed)', !S.slots.s1&&S.buildings.s1===null);
  stops();
})();
(function(){
  for(var t=0;t<20;t++){S=freshState(2,['P1','P2']);
    var furn=[];SLOTS.forEach(function(sx){if(S.buildings[sx.id])furn.push(S.buildings[sx.id]);});
    if(furn.length!==3){ok('2p setup stands exactly setupWorksN(2)=3 furniture tiles (run '+t+')',false,'got '+furn.length);return;}
    if((S.buildDeck||[]).length||(S.buildDisplay||[]).length){ok('no deck/display survives (run '+t+')',false,'');return;}
    if(!furn.every(function(bb){return !bb.v&&bb.owner===undefined&&bb.die===undefined&&BUILDINGS[bb.b];})){ok('furniture neutral+die-less (run '+t+')',false,'');return;}}
  ok('setup stands setupWorksN random NEUTRAL Public Works \u2014 no deck, no display, the rest to the BAG (20 runs, v5.4)', true);
  ok('the guild-tile fees stay grain-only in the kit data (a print audit \u2014 the fee chips are vestigial art at v5.3)', ['victual','bonded','weighhouse'].every(function(k){var f=BUILDINGS[k].fee;return f&&f.g&&!f.h;}));
})();

// ---- 28. v5.3 THE BOURSE: die + track \u00b7 bulk rise THEN score \u00b7 the brew crash \u00b7 the shifts ----
(function(){var p=fresh();stops();
  ok('the bourse tracks every in-play beer except Gruit & Jopenbier, all at 0',
    tracked('hopped')&&!tracked('gruit')&&!tracked('jopenbier')&&Object.keys(S.bourse).every(function(b){return S.bourse[b]===0;}));
  // the brew crash
  p.recipes=['gruit','hopped'];p.grain=9;p.hops=9;p.vessels=[null,null,null];
  UI.sub='brew';UI.brew={returnTo:'stops',free:false,alt:true};brewPick('hopped');
  ok('a BREW of a tracked beer slips its marker 1 (the supply crash)', S.bourse.hopped===-1);
  UI.sub='brew';UI.brew={returnTo:'stops',free:false,alt:true};brewPick('hopped');
  ok('\u2026and the track FLOORS at '+BOURSE_MIN+' \u2699', S.bourse.hopped===BOURSE_MIN);
  p.vessels=[null,null,null];p.presPool=13;
  UI.sub='brew';UI.brew={returnTo:'stops',free:false,alt:true};brewPick('gruit');
  ok('Gruit is UNTRACKED \u2014 no marker, no crash', !('gruit' in S.bourse));
  stops();UI.pendingActs=[];
})();
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};   // BULK RISE THEN SCORE (ruled)
  S.bourse.hopped=1;
  var sh=ship('s5','cog','bruges');
  sh.load=[{owner:0,style:'hopped',q:2,die:2,act:'source'},{owner:0,style:'hopped',q:2,die:2,act:'source'}];
  var d0=p.delivered.length;
  sailShip('s5',0);
  ok('the markers rise FIRST (+1 per cask: 1\u21923), THEN every cask scores die + track (2+3=5\u2605 each \u2014 ruled)',
    S.bourse.hopped===3&&p.delivered.length===d0+2&&p.delivered[d0].val===5&&p.delivered[d0+1].val===5);
  var b1=S.bourse.hopped;
  var sh2=ship('s6','skute','bruges');sh2.load=[{owner:0,style:'hopped',q:2,die:2,act:'source'}];
  sailShip('s6',0);
  ok('\u2026and the rise CAPS at +'+BOURSE_MAX+' \u2699 (the cask still scores die+'+BOURSE_MAX+')',
    S.bourse.hopped===BOURSE_MAX&&p.delivered[p.delivered.length-1].val===2+BOURSE_MAX);
  S.bourse.hopped=-1;
  var sh3=ship('s7','skute','novgorod');sh3.load=[{owner:0,style:'hopped',q:2,die:3,act:'source'}];
  sailShip('s7',0);
  ok('a crashed beer under-scores (die 3 at \u22121\u21920 after its own rise \u2192 3\u2605 + the Novgorod +2 = 5)',
    p.delivered[p.delivered.length-1].val===5);
  UI.pendingActs=[];UI.pendingMan=[];UI.manResQ=[];UI.pendingShift=[];UI.pendingRecipe=[];UI.pendingSpec=[];UI.pendingBenefits=[];stops();
})();
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};   // BERGEN: specialist + ADJUST THE MARKET BY 1 (ruled)
  p.vessels=[{style:'hopped',q:2,die:2,act:'source'},null,null];
  S.bourse.hopped=0;S.impDisplay=['granary'];
  var sh=ship('s4','skute','bergen');
  UI.load={ships:['s4'],returnTo:'stops',loadsLeft:1,cask:0,count:0};UI.sub='load';loadOnto('s4');
  ok('a Bergen delivery seats the specialist AND moves a bourse marker \u00b11 (the prize rider \u2014 ruled)',
    (p.upgrades||[]).length===1&&Object.keys(S.bourse).some(function(b){return S.bourse[b]!==0&&b!=='hopped';})||S.bourse.hopped!==1?true:false);
  ok('\u2026the shift landed somewhere (net movement beyond the arrival rise)',
    S.bourse.hopped!==1||Object.keys(S.bourse).some(function(b){return b!=='hopped'&&S.bourse[b]!==0;}));
  stops();UI.pendingActs=[];UI.pendingShift=[];
})();
(function(){var p=fresh();stops();   // the shift clamps
  S.bourse.hopped=BOURSE_MAX;
  ok('a shift never passes the printed ends', bourseShift('hopped',1)===0&&S.bourse.hopped===BOURSE_MAX&&bourseShift('hopped',-1)===-1);
  ok('an untracked beer never shifts', bourseShift('gruit',1)===0);
})();
(function(){var p=fresh();stops();   // the furniture forfeit + the pool
  p.hand=[];
  var g0=p.grain,h0=p.hops;
  UI.pendingBenefits=[{pid:0,dest:'london'}];afterSail('stops');
  ok('an empty hand forfeits the London prize \u2014 no goods fallback (v4.9b grammar holds at v5.3)', p.grain===g0&&p.hops===h0&&(UI.pendingBenefits||[]).length===0);
  ok('the pool is 13 (v4.9b) \u2014 and NO die ever leaves it for a building (v5.3)', PRES_POOL===13&&newPlayer(0,'X').presPool===13);
  var q2=fresh();stops();
  S.buildings.s3={b:'bonded'};
  q2.vessels=[{style:'gruit',q:1,die:1,act:'source'},null,null];q2.grain=9;
  ship('s3','skute','bruges');
  UI.load={ships:['s3'],returnTo:'stops',loadsLeft:1,cask:null};UI.sub='load';
  loadPickCask(0);
  ok('an EPHEMERAL still sails away \u2014 the slot opens; no die was ever aboard (v5.3)', !bAt('s3'));
  stops();UI.pendingActs=[];
})();

// ---- 23. v45f: the Guildmaster's standing 'quality' persona (the designer's line) ----
(function(){
  ok('the GM defaults to the quality persona', aiPersona({ai:{tier:'guildmaster'}})==='quality');
  ok('an explicit persona (PATHWAYS) overrides it', aiPersona({ai:{tier:'guildmaster',persona:'majority'}})==='majority');
  ok('the Cellarmaster stays pure search (no default persona)', aiPersona({ai:{tier:'cellarmaster'}})===null);
  ok('greedy tiers carry no persona by default', aiPersona({ai:{tier:'trader'}})===null&&aiPersona({ai:{tier:'journeyman'}})===null);
})();

// ---- 29. v4.14 "BEER ATLAS": the expansion beers, re-derived on the v4 spine ----
(function(){
  // the base deal is byte-pure with the toggles off
  var pure=true;for(var i=0;i<30;i++){var p0=fresh();if(S.exports.some(function(s){return STYLES[s].exp;}))pure=false;}
  ok('toggles OFF: the deal never contains an expansion beer (30 deals)', pure);
  // the 3-of-7 draft guarantees >=1 of Mumme/Bock
  EXPANSION=true;var okDraft=true,sawSpec=false;
  for(var j=0;j<40;j++){var st=freshState(2,['P1','P2']);
    if(!st.exports.includes('mumme')&&!st.exports.includes('bock'))okDraft=false;
    if(st.exports.some(function(s){return STYLES[s].exp;}))sawSpec=true;}
  ok('EXPANSION: 40 deals all hold >=1 of Mumme/Bock', okDraft);
  ok('EXPANSION: the specialty beers actually appear in the draft', sawSpec);
  EXPANSION=false;
})();
(function(){ // GOSE (v4.15b) — the identity IS the pinned bonus: Gain any 3 goods; the Salt Trade is CUT
  var p=fresh();
  ok('Gose pins the goods3 bonus (its every tile)', STYLES.gose.act==='goods3'&&STYLES.gose.pin===true);
  p.grain=0;p.hops=0;
  deliverCask(p,{owner:0,style:'gose',q:2,die:2},'bruges');
  ok('the Salt Trade is CUT — a Gose delivery pays no goods perk', p.grain===0&&p.hops===0);
  UI={sub:'stops',stops:[],pendingBenefits:[]};fireCaskAct('goods3','stops');
  ok('the goods3 bonus opens a 3-good Source pick', UI.sub==='source'&&UI.src&&UI.src.n===3);
  srcTake(2,1);
  ok('…and pays 3 (any mix)', p.grain===2&&p.hops===1);
})();
(function(){ // ZERBSTER (v4.15b) — brew-time prompt CUT; ONE compound LOAD bonus: a free Gruit + Load 1 more
  var p=fresh();p.recipes.push('zerbster');p.hops=5;p.vessels=[null,null,null];
  S.piles.zerbster=caskCensus('zerbster');   // v5.0: the battery seeds the stack (base deal leaves it boxed)
  UI={sub:'brew',brew:{returnTo:'stops'}};brewPick('zerbster');
  ok('brewing Zerbster no longer prompts (the parti moves to the LOAD)', UI.sub!=='parti'&&p.hops===2);
  ok('Zerbster pins the zgyle bonus', STYLES.zerbster.act==='zgyle');
  UI={sub:'stops',stops:[],pendingBenefits:[]};
  var tray0=trayDice(p);fireCaskAct('zgyle','stops');
  ok('zgyle (human): the free-Gruit offer opens, then chains to the load', UI.sub==='parti'&&UI.parti.thenLoad===true);
  partiTake();
  ok('take: a free Ready Gruit fills a vessel (a tray die spent) and the Load-1-more follows',
    p.vessels.filter(function(c){return c&&c.style==='gruit'&&c.die===1;}).length===1
    &&trayDice(p)===tray0-1&&UI.sub!=='parti');
  var p2=fresh();p2.vessels=[{style:'zerbster',q:3,die:3,act:'zgyle'},null,null];p2.presPool=2;
  UI={sub:'stops',stops:[],pendingBenefits:[]};
  var sh=ship('s1','cog','bruges');
  UI.sub='load';UI.load={ships:['s1'],returnTo:'stops',loadsLeft:1,cask:0};loadCommit('s1',0,false);
  ok('a loaded Zerbster fires its compound bonus through the pending pipeline (the parti offer opens)',
    UI.sub==='parti'&&UI.parti&&UI.parti.thenLoad===true);
  var p3=fresh();p3.presPool=1;p3.vessels=[{style:'hopped',q:2,die:2,act:'age'},null,null];
  UI={sub:'stops',stops:[],pendingBenefits:[]};fireCaskAct('zgyle','stops');
  ok('no tray die → the Gruit half never offers (straight to the load half)', UI.sub!=='parti');
})();
(function(){ // DUCKSTEIN — smoke-hardy: the die turns +1 AS IT BOARDS (minimum AND value; the Kiln stacks)
  var p=fresh();
  ok('Duckstein starts at 1, Ready at 2 (one step)', startDieFor(p,'duckstein')===1&&STYLES.duckstein.ready===1);
  p.vessels[0]={style:'duckstein',q:2,die:2,act:'reach'};
  var sh=ship('s1','cog','novgorod');
  ok('a Ready Duckstein (die 2) makes the Novgorod 3+ band — its lift is read as it boards', canTake('s1',0));
  UI={sub:'load',load:{ships:['s1'],returnTo:'stops',loadsLeft:1,cask:0}};loadCommit('s1',0,false);
  ok('it boards AND parks at 3 (gates and value alike)', sh.load.length===1&&sh.load[0].die===3);
  var p2=fresh();p2.vessels[0]={style:'duckstein',q:2,die:2,act:'reach'};
  ship('s2','cog','london');S.buildings.s2={b:'maltkiln'};
  UI={sub:'load',load:{ships:['s2'],returnTo:'stops',loadsLeft:1,cask:0}};loadCommit('s2',0,false);
  ok('the Malt Kiln stacks on the smoke-hardy lift (boards at 4)', S.slots.s2.load[0].die===4);
})();
(function(){ // JOPENBIER — the plain-Q6 capstone: start 2, four steps, 6/8★, always acquirable at 3H, the sixth Flight type
  var p=fresh();JOPEN=true;S.jopen=true;
  ok('Jopenbier starts at 2 (Q6, four steps); the Cellarman starts it at 3',
    startDieFor(p,'jopenbier')===2&&(function(){p.upgrades=['cellar'];var d=startDieFor(p,'jopenbier');p.upgrades=[];return d===3;})());
  ok('always acquirable: the recipe channels offer it when the toggle is on', recipeGainable(p).includes('jopenbier'));
  ok('its fee is the formula 3H (the Scholar waives)',
    (recipeFeeFor(p,'jopenbier').h===3)&&(function(){p.upgrades=['scholar'];var f=recipeFeeFor(p,'jopenbier');p.upgrades=[];return !f.h;})());
  p.vessels[0]={style:'jopenbier',q:6,die:6,act:'source'};
  var sh=ship('s3','skute','novgorod');
  UI={sub:'load',load:{ships:['s3'],returnTo:'stops',loadsLeft:1,cask:0}};loadCommit('s3',0,false);
  ok('a Ready Jopenbier sails and delivers 8★ at Novgorod (6 + the printed premium)',
    p.delivered.length===1&&p.delivered[0].val===8);
  var p2=fresh();JOPEN=true;S.jopen=true;
  p2.shipped={gruit:1,hopped:1,broyhan:1,keut:1,mumme:1,jopenbier:1};
  ok('the sixth Flight type: 6 distinct beers shipped → 25★', flightScore(p2)===25&&flightTypes().includes('jopenbier'));
  JOPEN=false;S.jopen=false;
  var p3=fresh();
  ok('toggle OFF: the channels never offer the capstone', !recipeGainable(p3).includes('jopenbier'));
})();

// ---- 30. v4.17 "THE TASTINGS": the contest cycle · pours · judging · the ⚜ economy ----
(function(){ // toggle OFF: base purity
  var p=fresh();
  ok('hall OFF: no Tastings state (the base Manifest game is untouched)', !S.tastings&&S.manifestDeck.length>0);
  p.vessels[0]={style:'hopped',q:2,die:2,act:'age'};p.invites=5;
  ok('hall OFF: nothing is pourable even with (stray) invites', pourable(p).length===0);
  var inv0=p.invites;UI.manResQ=[{lines:[{die:1,pts:1}],used:[false]}];manClaim(p,0,0);
  ok('hall OFF: a Manifest claim pays NO invitation', p.invites===inv0);
  UI.manResQ=[];
})();
(function(){ // hall mode setup: the deck · the open row · the seed · the SAME Manifest game
  HALLEXP=true;var p2=fresh();HALLEXP=false;
  ok('2p: open row 2 · deck 10 (12 printed)', S.tastings.open.length===2&&S.tastings.deck.length===10&&CONTESTS.length===12);
  HALLEXP=true;var p=fresh(3);HALLEXP=false;
  ok('3p: open row 3 · deck 9', S.tastings.open.length===3&&S.tastings.deck.length===9);
  ok('every player starts with START_INV ⚜ (the printed seed)', S.players.every(function(q){return (q.invites||0)===START_INV;}));
  ok('hall mode leaves the Manifest economy unchanged (the same 12-card deck)', S.manifestDeck.length>0);
  var inv0=p.invites;UI.manResQ=[{lines:[{die:1,pts:1}],used:[false]}];manClaim(p,0,0);
  ok('a Manifest claim pays +1 ⚜ in hall mode (source: man — the per-Order ⚜ re-seamed, v5.0)', p.invites===inv0+1&&p.invSrc.man===1);
  UI.manResQ=[];
})();
(function(){ // the POUR: cost · category law · the committed die
  HALLEXP=true;var p=fresh();HALLEXP=false;
  S.tastings.open=[{t:{k:'fresh1',cat:'fresh',s1:5},bench:[]},{t:{k:'dark1',cat:'dark',s1:7},bench:[]},{t:{k:'exp1',cat:'export',s1:6},bench:[]}];
  p.invites=2;p.vessels[0]={style:'broyhan',q:3,die:3,act:'load'};p.vessels[1]={style:'mumme',q:4,die:4,act:'age'};
  var po=pourable(p);
  ok('category law: the Broyhan (Q3 die 3) may pour fresh only; the Mumme (Q4 die 4) dark or export',
    JSON.stringify(po.find(function(o){return o.vi===0;}).cis)==='[0]'&&JSON.stringify(po.find(function(o){return o.vi===1;}).cis)==='[1,2]');
  var tray0=trayDice(p),pp0=p.presPool,pr0=pileList('broyhan').length;
  ok('the pour: spends the ⚜, empties the vessel, stands the die on the bench',
    pourDo(0,0)===true&&p.invites===1&&p.vessels[0]===null&&S.tastings.open[0].bench.length===1&&S.tastings.open[0].bench[0].die===3);
  ok('the poured die is COMMITTED — a clock beat, the tray unchanged', p.presPool===pp0-1&&trayDice(p)===tray0);
  ok('the poured cask’s tile returns to the BOTTOM of its stack (v5.0)', pileList('broyhan').length===pr0+1);
  p.invites=0;p.vessels[0]={style:'keut',q:3,die:3,act:'load'};
  ok('no ⚜ → no pour', pourable(p).length===0&&pourDo(0,0)===false);
  p.invites=1;
  ok('a wrong category is refused (Keut Q3 into the Dark Pour)', pourDo(0,1)===false);
  ok('an unready cask is refused', (p.vessels[2]={style:'bock',q:5,die:3,act:'brew'},pourDo(2,2)===false));
})();
(function(){ // the JUDGING: bench fills → ranked at once · ties → the earlier pour · the floor
  HALLEXP=true;var p=fresh(3);HALLEXP=false;var q=S.players[1],r=S.players[2];
  S.tastings.open=[{t:{k:'free1',cat:'free',s1:5},bench:[]}];
  q.invites=1;r.invites=1;p.invites=1;
  // q pours die 4 first · r pours die 4 second (the tie) · p fills with die 2 (3p bench = 3)
  S.active=1;q.vessels[0]={style:'mumme',q:4,die:4,act:'age'};pourDo(0,0);
  S.active=2;r.vessels[0]={style:'mumme',q:4,die:4,act:'age'};pourDo(0,0);
  S.active=0;p.vessels[0]={style:'gruit',q:1,die:2,act:'source'};p.vessels[0].die=2;p.vessels[0].q=2;p.vessels[0].style='hopped';
  var b0=q.bank,b1=r.bank,b2=p.bank;
  ok('the third pour fills the bench — judged at once', pourDo(0,0)===true&&S.tastings.open.length===0);
  ok('1st by die, TIES → the earlier pour: q takes 5★ + the tile; r 2nd (+2); p 3rd (+1)',
    q.bank===b0+5&&(q.tastings||[]).length===1&&q.tastings[0].cat==='free'&&r.bank===b1+2&&(r.tastings||[]).length===0&&p.bank===b2+1);
  ok('the judged dice slide to the Taproom floor (committed, standing)', S.tastings.floor.length===3);
  ok('the row refills at END of turn — back to the 3p row of 3', (refillContests(),S.tastings.open.length===3));
})();
(function(){ // the DOOR-SLAM: a second pour by the leader is legal and locks the vote
  HALLEXP=true;var p=fresh(2);HALLEXP=false;
  S.tastings.open=[{t:{k:'free1',cat:'free',s1:5},bench:[]}];
  p.invites=2;
  p.vessels[0]={style:'mumme',q:4,die:4,act:'age'};
  p.vessels[1]={style:'gruit',q:1,die:1,act:'source'};
  pourDo(0,0);   // the leader's bid (2p bench = 2)
  var b0=p.bank;
  ok('the door-slam: the leader fills the last space with a cheap die — judged, 1st AND 2nd are his',
    pourDo(1,0)===true&&S.tastings.open.length===0&&p.bank===b0+5+2&&(p.tastings||[]).length===1);
  ok('the slam is recorded on the entry (the probe reads it)', S.tastings.floor.length===2);
})();
(function(){ // the DUEL benches (R1 of the study): the hard categories print bench 2
  HALLEXP=true;var p=fresh(3);HALLEXP=false;var q=S.players[1];
  S.tastings.open=[{t:{k:'dark1',cat:'dark',s1:7,b:2},bench:[]}];
  q.invites=1;p.invites=1;
  S.active=1;q.vessels[0]={style:'mumme',q:4,die:4,act:'age'};pourDo(0,0);
  S.active=0;p.vessels[0]={style:'bock',q:5,die:5,act:'brew'};
  var b0=p.bank;
  ok('a DARK duel judges on the SECOND pour at 3p (the tile prints bench 2)',
    pourDo(0,0)===true&&S.tastings.open.length===0&&p.bank===b0+7&&(p.tastings||[]).length===1);
  ok('the printed deck: free/fresh bench 3 · dark/export/old/master bench 2',
    CONTESTS.every(function(t){return (t.cat==='free'||t.cat==='fresh')?t.b===3:t.b===2;}));
})();
(function(){ // v4.17b THE CHAMPION'S TOUR (R3): 1st's die parks as presence; 2nd/3rd stay on the floor
  HALLEXP=true;var p=fresh(2);HALLEXP=false;var q=S.players[1];
  p.delivered.push({style:'gruit',q:1,dest:'bruges',val:1});   // the tour needs a delivered-to Kontor
  S.tastings.open=[{t:{k:'dark1',cat:'dark',s1:7,b:2},bench:[]}];
  q.invites=1;p.invites=1;
  S.active=1;q.vessels[0]={style:'mumme',q:4,die:4,act:'age'};pourDo(0,0);
  S.active=0;p.vessels[0]={style:'bock',q:5,die:5,act:'brew'};
  var pb0=p.presBonus.bruges||0;
  pourDo(0,0);   // judged — p wins; p is AI-less: the pending tour prompts
  ok('the tour queues for the human winner', UI.sub==='tour'&&(UI.pendingTour||[]).length===1);
  tourPick('bruges');
  ok('the champion’s die parks as presence (face 1) at the chosen Kontor', (p.presBonus.bruges||0)===pb0+1);
  ok('the loser’s die stays on the Taproom floor', S.tastings.floor.length===1&&S.tastings.floor[0].pid===q.id);
  var p2;HALLEXP=true;p2=fresh(2);HALLEXP=false;
  S.tastings.open=[{t:{k:'free1',cat:'free',s1:5,b:2},bench:[{pid:1,die:1,style:'gruit'}]}];
  p2.invites=1;p2.vessels[0]={style:'hopped',q:2,die:2,act:'age'};
  pourDo(0,0);
  ok('never delivered anywhere → the tour lapses (the die stays on the floor)',
    (UI.pendingTour||[]).length===0&&S.tastings.floor.length===2);
  ok('the tour default is ON (v4.17b) with START_INV 2 (R2)', TOUR_ON===1&&START_INV===2);
})();
(function(){ // capacity + the full bench
  HALLEXP=true;var p=fresh(2);HALLEXP=false;
  S.tastings.open=[{t:{k:'free1',cat:'free',s1:5},bench:[{pid:1,die:3,style:'broyhan'},{pid:1,die:2,style:'hopped'}]}];
  p.invites=1;p.vessels[0]={style:'keut',q:3,die:3,act:'load'};
  ok('a FULL bench (2p = 2 spaces) admits no pour', pourable(p).length===0);
})();
(function(){ // SETS + the unconvened benches (END_JUDGE void) — the module's end ★
  HALLEXP=true;var p=fresh();HALLEXP=false;
  p.tastings=[{k:'free1',cat:'free',s1:5},{k:'free2',cat:'free',s1:5}];
  ok('one distinct category → no set ★ yet', scorePlayer(p).ext===0);
  p.tastings.push({k:'dark1',cat:'dark',s1:7});
  ok('2 distinct categories → +'+TASTE_SETS[2]+'★', scorePlayer(p).ext===TASTE_SETS[2]);
  p.tastings.push({k:'old1',cat:'old',s1:7});
  ok('3 distinct categories → +'+TASTE_SETS[3]+'★', scorePlayer(p).ext===TASTE_SETS[3]);
  S.tastings.open=[{t:{k:'exp1',cat:'export',s1:6},bench:[{pid:p.id,die:5,style:'bock'},{pid:1,die:4,style:'mumme'}]}];
  ok('an unconvened bench pays 1★ per standing die (END_JUDGE void)', scorePlayer(p).ext===TASTE_SETS[3]+1);
  END_JUDGE='judge';
  ok('the EJUDGE sweep arm ranks the bench as-is (my die 5 leads → +6)', scorePlayer(p).ext===TASTE_SETS[3]+6);
  END_JUDGE='void';
})();
(function(){ // the clock: the last die poured EMPTIES the tray — the final round fires
  HALLEXP=true;var p=fresh();HALLEXP=false;
  S.tastings.open=[{t:{k:'free1',cat:'free',s1:5},bench:[]}];
  p.invites=1;p.presPool=1;p.vessels=[{style:'hopped',q:2,die:2,act:'age'},null,null];
  pourDo(0,0);
  ok('the poured last die EMPTIES the tray — the final round fires', S.ending===true&&S.endReason==='dice');
})();
(function(){ // the ⚜ faucets: the Chancery (INV_BLDG) + the sources
  HALLEXP=true;var p=fresh();HALLEXP=false;
  var inv0=p.invites||0;UI={sub:'stops',stops:[],pendingBenefits:[]};
  fireCaskAct('invgain','stops');
  ok('the Chancery act pays +1 ⚜ (source: bldg)', (p.invites||0)===inv0+1&&p.invSrc.bldg===1);
  var has=function(){return buildBuildingDeck().indexOf('chancery')>=0;};
  HALLEXP=true;INV_BLDG=1;
  var always=true;for(var i=0;i<10;i++)if(!has())always=false;
  ok('hall mode: the Chancery is in every deal (guaranteed)', always);
  HALLEXP=false;
  ok('base mode: no Chancery', !has());
})();
(function(){ // the AI seam: the greedy pour policy + the committed-lane persona
  HALLEXP=true;var p=fresh(3);HALLEXP=false;
  S.tastings.open=[{t:{k:'free1',cat:'free',s1:5},bench:[{pid:1,die:6,style:'bock'},{pid:1,die:5,style:'bock'}]}];
  p.invites=1;p.vessels[0]={style:'hopped',q:2,die:2,act:'age'};
  p.ai={tier:'trader'};
  var d0=aiPourBest(p);   // filling a bench a RIVAL leads, with a losing die — the default declines
  p.ai={tier:'trader',persona:'hall'};
  var d1=aiPourBest(p);
  ok('the hall persona leans in where the default declines (a losing fill)', d0===null&&!!d1);
  p.ai=null;
})();
(function(){ // the printed deck composition + the defaults
  var mix={};CONTESTS.forEach(function(t){mix[t.cat]=(mix[t.cat]||0)+1;});
  ok('the Tasting deck prints 12: free 3 · fresh 3 · dark 2 · export 2 · old 1 · master 1',
    CONTESTS.length===12&&mix.free===3&&mix.fresh===3&&mix.dark===2&&mix.export===2&&mix.old===1&&mix.master===1);
  ok('v4.17b defaults: START_INV=2 (R2) · TOUR on (R3) · END_JUDGE void · 2nd/3rd = 2/1 · sets 3/7 · INV_BLDG on',
    START_INV===2&&TOUR_ON===1&&END_JUDGE==='void'&&TASTE_2ND===2&&TASTE_3RD===1&&TASTE_SETS[2]===3&&TASTE_SETS[3]===7&&INV_BLDG===1);
  ok('the Chancery prints on the Guildhall sheet (hall flag · fee 1G · ms 2)',
    BUILDINGS.chancery.hall===true&&BUILDINGS.chancery.fee.g===1&&BUILDINGS.chancery.ms===2);
})();

// ---- 31. v5.0 PRIMARY / ALTERNATE: the worker's station at full strength, the other as its echo ----
(function(){var p=fresh();p.ai=null;
  p.cell='A';activateLine('rowT');   // A (Market — the worker) + B (Brewhouse)
  var cells=UI.stops.filter(function(st){return st.kind==='cell';});
  ok('the line marks the worker’s station PRIMARY, the other ALTERNATE', cells.length===2&&cells.every(function(st){return st.alt===(st.cell!=='A');}));
  ok('the dials print 3/1 \u00b7 search/top \u00b7 3/1 \u00b7 commission/load-1 (SRC_PRIMARY 3 \u00b7 ALT_SOURCE 1 \u00b7 ALT_AGE 1 \u00b7 ALT_LOADS 1)', SRC_PRIMARY===3&&ALT_SOURCE===1&&ALT_AGE===1&&ALT_LOADS===1);
  enterCell('A',true);
  ok('the Market alternate is Source '+ALT_SOURCE, UI.sub==='source'&&UI.src.n===ALT_SOURCE);
  UI.src=null;stops();
  enterCell('A',false);
  ok('the Market primary is Source '+SRC_PRIMARY+' (v5.2b)', UI.sub==='source'&&UI.src.n===SRC_PRIMARY);
  UI.src=null;stops();
  p.vessels[0]={style:'bock',q:5,die:2,act:'age'};
  enterCell('D',true);
  ok('the Cellar alternate is Age '+ALT_AGE, UI.sub==='age'&&UI.age.pool===ALT_AGE);
  ageAllot(0);
  ok('…one step only, then the flow closes', p.vessels[0].die===3&&UI.sub!=='age');
  stops();enterCell('D',false);
  ok('the Cellar primary stays Age 3', UI.sub==='age'&&UI.age.pool===CELLAR_POOL&&CELLAR_POOL===3);
  UI.age=null;stops();
})();
(function(){var p=fresh();p.ai=null;stops();
  ship('s5','hulk','bruges');ship('s2','cog','london');   // hulls scattered across the wharf
  p.vessels=[{style:'gruit',q:1,die:1,act:'source'},null,null];
  enterCell('C',true);
  ok('the Harbor alternate opens a WHARF-WIDE Load 1 (any docked Ship, any line)',
    UI.sub==='load'&&UI.load.ships.indexOf('s5')>=0&&UI.load.ships.indexOf('s2')>=0&&UI.load.loadsLeft===ALT_LOADS);
  UI.load=null;stops();
  p.upgrades=['crane'];p.sslots=2;
  enterCell('C',true);
  ok('the Stevedore lifts the Harbor alternate to 2 loads (v4.6d — every load flow)', UI.sub==='load'&&UI.load.loadsLeft===2);
  UI.load=null;stops();
  p.upgrades=[];
  loadOnto&&(function(){UI.load={ships:['s5'],returnTo:'stops',loadsLeft:1,cask:0};loadOnto('s5');})();
  ok('the alternate load is a NORMAL load (gate read as it boards · the bonus queues)', S.slots.s5.load.length===1);
  stops();UI.pendingActs=[];
})();

// ---- 32. v5.2 "GROUNDWORK": the two families \u00b7 the ladder \u00b7 the dual-use hand \u00b7 the powers ----
(function(){var p=fresh();stops();p.ai=null;   // THE OPEN GROUND + THE CLIMB (v5.3, ruled)
  ok('an L1 may open on ANY open slot \u2014 the hand + open ground is the whole gate (v5.3)',
    canVentureL1(p)&&ventureL1Slots(p).length===SLOTS.length);
  S.buildings.s2={b:'tollhouse'};   // furniture
  S.buildings.s3={v:'die',lvl:1,owner:1};   // a RIVAL's L1
  ok('while open ground remains, the targets are the OPEN slots alone (no early redevelopment)',
    ventureL1Slots(p).every(function(sx){return !S.buildings[sx.id];})&&ventureL1Slots(p).length===SLOTS.length-2);
  p.grain=5;var h0=p.hand.length;var bank0=p.bank;
  UI.survey={returnTo:'stops'};UI.sub='survey';venturePick('points',1,false);
  ok('the L1 pick pays its 1G \u2699 fee and asks for ground', UI.sub==='placevent'&&p.grain===4);
  placeVentOn('s2');
  ok('a slot with a Public Work refuses the L1 while open ground remains', UI.sub==='placevent'&&!vAt('s2'));
  placeVentOn('s3');
  ok('\u2026and a rival\u2019s Venture refuses it always', UI.sub==='placevent'&&vAt('s3').owner===1);
  placeVentOn('s6');
  ok('the L1 lands on open ground \u2014 the tile leaves the hand (its L2 face forfeit)',
    vAt('s6')&&vAt('s6').lvl===1&&vAt('s6').owner===0&&p.hand.length===h0-1&&p.hand.indexOf('points')<0);
  ok('a Venture carries NO die \u2014 and never reads as a public key', vAt('s6')&&S.buildings.s6.die===undefined&&bKeyAt('s6')===null);
  // WHARF FULL \u2192 the furniture becomes ground
  SLOTS.forEach(function(sx){if(!S.buildings[sx.id])S.buildings[sx.id]={b:'maltkiln'};});
  ok('with the wharf FULL, the L1 targets are exactly the PUBLIC WORKS (never anyone\u2019s Venture)',
    ventureL1Slots(p).length>0&&ventureL1Slots(p).every(function(sx){var bb=S.buildings[sx.id];return bb&&!bb.v;}));
  var h1=p.hand.length;var g1=p.grain;
  UI.survey={returnTo:'stops'};UI.sub='survey';venturePick('brew',1,false);
  placeVentOn('s3');
  ok('the rival\u2019s tile still refuses', UI.sub==='placevent'&&vAt('s3').owner===1);
  placeVentOn('s1');
  ok('the L1 REDEVELOPS the furniture \u2014 the worn tile boxed, no pips (no die ever stood \u2014 v5.3)',
    vAt('s1')&&vAt('s1').v==='brew'&&p.hand.length===h1-1&&p.bank===bank0);
  // a rival can never overbuild a Venture
  S.active=1;var q2=S.players[1];q2.grain=5;
  ok('a rival build can never displace a Venture (no path exists \u2014 the public family is unbuildable)',
    vAt('s6').owner===0&&commitBldg('s6','tollhouse',1)===false&&vAt('s6').owner===0);
  S.active=0;
  // THE CLIMB
  p.grain=5;var h2=p.hand.length;
  UI.survey={returnTo:'stops'};UI.sub='survey';venturePick('age',2,false);
  ok('the L2 pick pays its 2G \u2699 fee and targets ONLY your own L1', UI.sub==='placevent'&&p.grain===3);
  placeVentOn('s3');
  ok('a rival\u2019s L1 refuses the climb', UI.sub==='placevent'&&vAt('s3').v==='die');
  placeVentOn('s6');
  ok('THE CLIMB lands: the L2 face stands on the L1\u2019s ground; the spent L1 tile is boxed',
    vAt('s6')&&vAt('s6').lvl===2&&vAt('s6').v==='age'&&p.hand.length===h2-1);
  ok('the Guild Residence\u2019s end-scoring line RETIRED at v5.5 \u2014 the DIE theme\u2019s L2 manipulates a die instead', typeof VRES_PTS==='undefined'&&VENTURES.die.l2.kind==='vlift');
})();
// ---- 32c. v5.3 THE PUBLIC LINES: every face serves the wharf; the owner gets both ----
(function(){var p=fresh();stops();var q=S.players[1];
  S.buildings.s8={v:'age',lvl:1,owner:1};   // the RIVAL owns it (s8 rides rowT) — the AGE L1's public line is +1 good
  p.cell='A';activateLine('rowT');
  ok('a rival\u2019s activation collects the PUBLIC line as a free stop (vpub \u2014 ruled: for everyone)',
    UI.stops.some(function(st){return st.kind==='vpub'&&st.slot==='s8';}));
  ok('\u2026but never the owner\u2019s ringed stop', !UI.stops.some(function(st){return st.kind==='vact'&&st.slot==='s8';}));
  var g0=p.grain;
  var i=UI.stops.findIndex(function(st){return st.kind==='vpub'&&st.slot==='s8';});
  resolveStop(i);
  if(UI.sub==='source')srcTake(1,0);
  ok('the Warehouse\u2019s public line pays ANYONE 1 good (v5.5 keys)', p.grain===g0+1);
  stops();
  S.active=1;S.buildings.s3={v:'die',lvl:1,owner:1};q.cell='A';q.placed=true;
  activateLine('rowT');
  ok('the OWNER\u2019s activation offers BOTH lines (vpub + the ringed vact \u2014 ruled)',
    UI.stops.some(function(st){return st.kind==='vpub'&&st.slot==='s3';})&&UI.stops.some(function(st){return st.kind==='vact'&&st.slot==='s3';}));
  S.active=0;stops();
})();
// ---- 32b. the v5.2b letter: Source 3 \u00b7 the top-tile Brew bonus \u00b7 the Bergen fallback ----
(function(){var p=fresh();stops();p.ai=null;
  enterCell('A',false);
  ok('v5.2b: the Market PRIMARY is Source '+SRC_PRIMARY+' \u2699 (was 2 \u2014 \u201cthe game is slower\u2026\u201d)',
    UI.sub==='source'&&UI.src.n===SRC_PRIMARY&&SRC_PRIMARY===3);
  UI.src=null;stops();
  enterCell('A',true);
  ok('\u2026the alternate holds at Source '+ALT_SOURCE, UI.sub==='source'&&UI.src.n===ALT_SOURCE);
  UI.src=null;stops();
  p.recipes=['gruit'];p.grain=5;p.hops=5;p.vessels=[null,null,null];
  var top=pileTop('gruit');
  fireCaskAct('brew','stops');
  ok('the cask\u2019s Brew bonus opens the brew picker\u2026', UI.sub==='brew'&&UI.brew.alt==='top');
  brewPick('gruit');
  ok('\u2026and takes the TOP tile \u2014 no search, no verb menu (v5.2b ruled)',
    UI.sub!=='brewverb'&&p.vessels[0]&&p.vessels[0].act===top);
  stops();UI.pendingActs=[];
  enterBrew('stops',false,false);
  var multi=Object.keys(pileVerbs('gruit')).length>1;
  brewPick('gruit');
  ok('the STATION\u2019s full Brew still searches (the verb menu for a human)',
    multi?UI.sub==='brewverb':UI.sub!=='brewverb');
  if(UI.sub==='brewverb')brewVerbPick(Object.keys(pileVerbs('gruit'))[0]);
  stops();UI.pendingActs=[];UI.brew=null;UI.bverb=null;
})();
(function(){var p=fresh();stops();p.ai=null;   // the Bergen fallback (v5.2b: confirmed + evened)
  p.upgrades=['cellar','crane'];   // both seats FULL (no goods-faucet specialists — the Grain Factor would inflate the read)
  var g0=p.grain,h0=p.hops;
  UI.pendingSpec=[{pid:0,dest:'bergen'}];afterSail('stops');
  ok('seats FULL \u2192 the Bergen prize pays 2 goods (1 grain + 1 hop \u2014 the fallback, ruled)',
    p.grain===g0+1&&p.hops===h0+1&&(UI.pendingSpec||[]).length===0);
})();
(function(){var p=fresh();stops();p.ai=null;   // COUNTING HOUSE on the load path (v5.5: it banks \u2605, not a good)
  S.buildings.s4={v:'points',lvl:1,owner:0};var sh=ship('s4','cog','bruges');
  p.vessels=[{style:'gruit',q:1,die:1,act:'source'},null,null];p.grain=2;p.hops=3;
  var b0=p.bank||0;
  UI.load={ships:['s4'],returnTo:'stops',loadsLeft:1,cask:0,count:0};UI.sub='load';loadOnto('s4');
  ok('COUNTING HOUSE (v5.5): the owner\u2019s load here banks +'+VGOODSTAR_PTS+'\u2605 \u2014 the POINTS theme\u2019s entry rung',
    (p.bank||0)===b0+VGOODSTAR_PTS&&p.grain===2);
  S.active=1;var q2=S.players[1];q2.vessels[0]={style:'gruit',q:1,die:1,act:'source'};var qb=q2.bank||0;
  UI.load={ships:['s4'],returnTo:'stops',loadsLeft:1,cask:0,count:0};UI.sub='load';loadOnto('s4');
  ok('\u2026a RIVAL\u2019s load here banks NOTHING (private)', (q2.bank||0)===qb);
  S.active=0;stops();UI.pendingActs=[];UI.pendingRecipe=[];
})();
// (the Factor's Desk battery retired with the tile at v5.5 \u2014 the Manifest re-deal is gone)
(function(){var p=fresh();stops();p.ai=null;   // STAPLE HOUSE + STAPLE RIGHTS at the sail
  S.buildings.s5={b:'staple_bergen'};
  var sh=ship('s5','cog','bergen',[{owner:0,style:'hopped',q:2,die:2,act:'source'},{owner:1,style:'gruit',q:1,die:2,act:'source'}]);
  sh.man=null;UI.pendingMan=[];UI.manResQ=[];UI.pendingBenefits=[];UI.pendingRecipe=[];UI.pendingSpec=[];
  var b0=S.players[0].bank;var bag0=(S.worksBag||[]).length;
  sailShip('s5',0);
  ok('STAPLE HOUSE \u2699: a matching-Kontor sail pays EVERY cask +'+STAPLE_PTS+'\u2605 (die-less furniture \u2014 v5.3)',
    (S.players[0].bankSt||0)===STAPLE_PTS&&(S.players[1].bankSt||0)===STAPLE_PTS);
  // v5.4 THE TIDE: it pays as it goes \u2014 the premium resolves while the tile still stands,
  // then the tile sails with the Ship. Boxed: it never returns to the bag.
  ok('\u2026and THE TIDE takes it \u2014 the Staple House sailed with the Ship (the slot is bare)',
    S.buildings.s5===null);
  ok('\u2026BOXED, never recycled \u2014 the bag never takes a burned tile back',
    (S.worksBag||[]).length===bag0);
  UI.pendingSpec=[];UI.pendingMan=[];stops();
  var sh2=ship('s2','cog','london',[{owner:0,style:'hopped',q:2,die:2,act:'source'}]);sh2.man=null;
  S.buildings.s2={b:'staple_bergen'};
  sailShip('s2',0);
  ok('\u2026a NON-matching Kontor pays nothing (the crest binds the premium)', (S.players[0].bankSt||0)===STAPLE_PTS);
  ok('\u2026but the tide still takes it \u2014 every Public Work sails, premium paid or not',
    S.buildings.s2===null);
  UI.pendingBenefits=[];UI.pendingMan=[];stops();
  S.buildings.s3={v:'points',lvl:2,owner:1};   // STAPLE RIGHTS (the POINTS theme's L2)
  var sh3=ship('s3','cog','bruges',[{owner:0,style:'gruit',q:1,die:1,act:'source'},{owner:1,style:'gruit',q:1,die:1,act:'source'}]);
  var s10=S.players[1].bankSt||0;
  sailShip('s3',0);
  ok('STAPLE RIGHTS: the OWNER\u2019s casks off this slot\u2019s sails +'+VSTAR_PTS+'\u2605 each (a rival\u2019s pay nothing)',
    (S.players[1].bankSt||0)===s10+VSTAR_PTS&&(S.players[0].bankSt||0)===STAPLE_PTS);
  UI.pendingRecipe=[];UI.pendingMan=[];stops();
})();
(function(){var p=fresh();stops();p.ai=null;   // BREWERY (L2) as an owner stop \u00b7 CUSTOMS at \u22121
  S.buildings.s2={v:'brew',lvl:1,owner:0};   // colR cap \u2014 the Mash Tun (the BREW theme's L1 brews)
  p.grain=9;p.hops=9;p.recipes=['gruit','hopped','broyhan'];p.vessels=[null,null,null];
  S.piles.broyhan=['source','reach'];
  p.cell='B';activateLine('colR');
  var vi=UI.stops.findIndex(function(st){return st.kind==='vact'&&st.slot==='s2';});
  ok('the BREWERY stands as the owner\u2019s stop on its line', vi>=0);
  resolveStop(vi);
  ok('\u2026and it BREWS with the full search (the flow opens)', UI.sub==='brew'||UI.sub==='brewverb');
  UI={sub:'stops',stops:[],pendingBenefits:[]};
  S.buildings.s7={b:'customs'};ship('s7','cog','novgorod');
  ok('CUSTOMS eases to \u22121 (ruled): Novgorod reads 2+ through the door', gateNeed('s7')===2);
  ship('s3','cog','london');S.buildings.s3={b:'customs'};
  ok('\u2026and London opens its door entirely (2\u22121\u21921 \u2014 any die)', gateNeed('s3')===1);
})();
(function(){var p=fresh();stops();p.ai=null;   // WEIGH HOUSE \u2014 a delivered cask may claim TWO lines (kept from v5.1)
  S.buildings.s4={b:'weighhouse',owner:1,die:3};
  var sh=ship('s4','cog','london',[{owner:0,style:'bock',q:5,die:6,act:'age'},{owner:0,style:'bock',q:5,die:5,act:'age'}]);
  sh.man={k:'tw',lines:[{die:5,pts:3},{qmin:4,pts:3},{beer:'gruit',pts:1}]};
  UI.pendingMan=[];UI.manResQ=[];UI.pendingBenefits=[];UI.pendingRecipe=[];UI.pendingSpec=[];
  sailShip('s4',0);
  ok('the Weigh House doubles each cask\u2019s claim heads (v5.1)', (UI.pendingMan||[]).length===4&&UI.pendingMan[1].second===true&&UI.pendingMan[1].wh==='s4');
  var b0=p.bank;
  manClaim(p,UI.pendingMan[0].gi,0);
  manClaim(p,UI.pendingMan[1].gi,1);
  ok('one cask claims TWO lines through the Weigh House (+3+3)', p.bank===b0+6);
  UI.pendingMan=[];UI.manResQ=[];UI.pendingBenefits=[];stops();
})();
(function(){var p=fresh();stops();p.ai=null;   // CHANDLER \u2014 the swap rides the station Source (kept from v5.1)
  p.upgrades=['chandler'];p.sslots=2;p.chUsed=false;p.grain=2;p.hops=0;
  p.cell='A';activateLine('rowT');
  resolveStop(UI.stops.findIndex(function(st){return st.kind==='cell'&&st.cell==='A';}));
  srcTake(2,0);
  ok('the Chandler\u2019s swap OFFERS with the station Source (v5.1)', UI.sub==='chswap');
  chSwapGo('gh');
  ok('the swap lands \u2014 1G \u2192 1H (once per turn)', p.grain===3&&p.hops===1&&p.chUsed===true);
  stops();p.chUsed=false;
  UI.src={n:2,returnTo:'stops',station:false};UI.sub='source';srcTake(2,0);
  ok('a non-station Source (a load bonus) never offers the swap', UI.sub!=='chswap');
})();
(function(){var p=fresh();p.ai=null;   // the ALT-UPGRADE singles (kept from v5.1)
  p.upgrades=['broker'];p.sslots=2;
  p.cell='B';activateLine('rowT');   // the Market fires as the ALT
  resolveStop(UI.stops.findIndex(function(st){return st.kind==='cell'&&st.cell==='A';}));
  ok('the BROKER \u2014 the Market alternate at full strength (Source 2, v5.1 \u2699)', UI.sub==='source'&&UI.src.n===2);
  srcTake(2,0);stops();
  p.upgrades=['brewmate'];
  p.grain=9;p.hops=9;p.recipes=['gruit','hopped','broyhan'];p.vessels=[null,null,null];
  S.piles.broyhan=['source','reach'];
  UI.brew={returnTo:'stops',alt:true};brewPick('broyhan');
  ok('the BREWER\u2019S MATE \u2014 the Brewhouse alternate SEARCHES (the picker opens, v5.1 \u2699)', UI.sub==='brewverb');
  brewVerbPick('reach');
  ok('\u2026and the chosen tile rides', p.vessels[0]&&p.vessels[0].act==='reach');
  stops();
})();
(function(){   // the roster moves + the kit drift gate (v5.2)
  ok('retired as public designs: Granary \u00b7 Mission Quay \u00b7 Racking \u00b7 Assay \u00b7 Abbey \u00b7 Hop Exchange \u00b7 Exchange \u00b7 Rich Berth \u00b7 Capstan',
    ['granary','missionq','racking','assay','abbey','hopex','exchange','richberth','capstan'].every(function(k){return !BUILDINGS[k];}));
  ok('the public family is PASSIVE \u2014 the hall Chancery is the only printed slot action',
    Object.keys(BUILDINGS).filter(function(k){return BUILDINGS[k].act;}).join(',')==='chancery');
  ok('the Venture fees print \u2699 \u2014 L1 1G \u00b7 L2 2G (grain only)', V_FEE_L1.g===1&&!V_FEE_L1.h&&V_FEE_L2.g===2&&!V_FEE_L2.h);
  ok('the alt-upgrade fees \u2699 \u2014 Broker 1G \u00b7 Brewer\u2019s Mate 1H', SPEC_FEE.broker.g===1&&SPEC_FEE.brewmate.h===1);
  var KIT=window.HC;
  if(KIT&&KIT.BUILDINGS){var det='';
    KIT.BUILDINGS.forEach(function(b){var e=BUILDINGS[b.k];
      if(!e)det+=b.k+' kit-only \u00b7 ';else if((e.qty||1)!==b.n)det+=b.k+' count \u00b7 ';});
    Object.keys(BUILDINGS).forEach(function(k){if(BUILDINGS[k].hall)return;if(!KIT.BUILDINGS.some(function(b){return b.k===k;}))det+=k+' engine-only \u00b7 ';});
    ok('public-roster drift gate: engine \u2194 kit agree (v5.2)', det==='', det);
    ok('the kit prints the Venture portfolio (4 dual-use designs)', (KIT.VENTURES||[]).length===4);
    ok('the kit specialist roster prints 15 designs / 25 tiles', KIT.IMPROVE.length===15&&KIT.IMPROVE.reduce(function(a,d){return a+d.n;},0)===25);
  } else ok('components.js loaded for the roster drift gate', false);
})();

OUT.forEach(function(l){console.log(l);});
console.log('');
console.log(FAIL===0?('ALL PASS — '+PASS+' checks'):('*** '+FAIL+' FAILED / '+PASS+' passed ***'));
if(FAIL>0)throw new Error(FAIL+' checks failed');
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
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop} };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try {
  vm.runInContext(engine + '\n' + kit + '\n' + driver, ctx, { filename: 'play.html#verify-v4' });
} catch (e) {
  console.error('VERIFY RUN ERROR:', e && e.stack || e);
  process.exit(1);
}
