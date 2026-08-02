// Targeted rule checks for v4.x — v4.5b "Open Orders" + the v45c/d/e letters (KEY hanse-v45e).
// Drives the CANONICAL engine (extract play.html's <script>, stub the DOM) and asserts each
// rule directly by constructing states — no bot in the loop, so a failure is the engine's.
// Usage: node playtests/verify-v4.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

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
  // v45g [designer-ruled]: aging is REQUIRED for every Q3+ beer — an export never STARTS Ready
  ok('a Q3+ export never starts Ready (Cellarman Broyhan caps at 2, not 3 — v45g)', startDieFor(p,'broyhan')===2);
  ok('below Q3 the old cap stands (Hopped ready-at-brew with the Cellarman is fine)', startDieFor(p,'hopped')===2&&caskReady({style:'hopped',q:2,die:2}));
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

// ---- 3. BREW: pays, sets the die + pile action, flips the card; the tray gates it ----
(function(){var p=fresh();stops();
  p.grain=5;p.hops=5;p.recipes=['gruit','hopped','broyhan'];p.vessels=[null,null];p.brewed={gruit:1};
  S.pileTop[3]='reach';
  UI.brew={returnTo:'stops'};brewPick('broyhan');
  ok('brew pays the cost (1G2H)', p.grain===4&&p.hops===3);
  ok('the cask takes the pile-top action', p.vessels[0]&&p.vessels[0].act==='reach');
  ok('the die starts at the printed value (broyhan 2)', p.vessels[0].die===2);
  ok('the brew flips the recipe card (Flight record)', p.brewed.broyhan===1);
  ok('all 3 vessels are open from the START (v45h — the covers are off)', p.vslots===3&&newPlayer(0,'X').vslots===3&&newPlayer(0,'X').vessels.length===3);
  p.presPool=1;   // one die left, and it is riding the broyhan → tray 0
  ok('no die in the tray → no brew', (function(){var before=UI.sub;enterBrew('stops');return UI.sub!=='brew';})());
})();

// ---- 4. THE FLIGHT unlocks: 3rd distinct beer opens the 2nd seat ----
(function(){var p=fresh();stops();
  p.grain=9;p.hops=9;p.recipes=['gruit','hopped','keut'];p.vessels=[null,null];p.brewed={gruit:1};
  UI.brew={returnTo:'stops'};brewPick('hopped');
  UI.brew={returnTo:'stops'};brewPick('keut');
  ok('both specialist seats are open from the START (v45h)', p.sslots===2&&newPlayer(0,'X').sslots===2);
  ok('flight score counts BREWED (3 → 4★)', flightScore(p)===4);
})();

// ---- 5. GATES read the DIE as it boards (lifts included) ----
(function(){var p=fresh();stops();
  var sh=ship('s1','cog','novgorod');
  p.vessels[0]={style:'hopped',q:2,die:2,act:'source'};
  ok('a Ready die 2 cannot board Novgorod (gate 4)', !canTake('s1',0));
  S.buildings.s1={b:'maltkiln'};
  ok('a Malt Kiln at the slot lifts the boarding read (die 2+1=3 — still short)', !canTake('s1',0));
  p.vessels[1]={style:'broyhan',q:3,die:3,act:'load'};
  ok('a kiln-lifted die 4 boards Novgorod', canTake('s1',1));
  S.buildings.s2={b:'customs'};var sh2=ship('s2','cog','novgorod');
  ok('a Customs House lowers the gate one step (die 3 boards)', canTake('s2',1));
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

// ---- 7. SAIL WHEN FULL: skute on 1 · cog on 2 · cooperage +1 · rich berth −1 ----
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
  var rb=ship('s5','hulk','bruges');S.buildings.s5={b:'richberth'};
  ok('a Rich Berth sails one short (hulk at 2)', sailCap(rb)===2);
  p.ai=null;
})();

// ---- 8. DELIVERY floor & cap; Keut's presence bump spends a tray die and banks 1★ ----
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};
  var b0=p.bank,pool0=p.presPool,pb0=p.presBonus.bruges;
  deliverCask(p,{owner:0,style:'keut',q:3,die:9,act:'load'},'bruges');
  ok('delivery value caps at 6', p.delivered[p.delivered.length-1].val===6);
  ok('Keut parks a bonus die (presence +1 · bank +1 · pool −2 incl. the delivery)',
    p.presBonus.bruges===pb0+1&&p.bank===b0+1&&p.presPool===pool0-2);
  p.ai=null;
})();

// ---- 9. PRIZES: London building (+3★, placed) · Bergen specialist · Novgorod refine ×2 · Bruges recipe ----
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};
  var b0=p.bank;
  UI.pendingBenefits=[{pid:0,dest:'london'}];afterSail('stops');
  ok('London prize: a building placed, +'+BUILD_PTS+'★ banked', p.bank===b0+BUILD_PTS&&SLOTS.some(function(s){return bAt(s.id);}));
  UI.pendingSpec=[{pid:0,dest:'bergen'}];afterSail('stops');
  ok('Bergen prize: a specialist seated free', (p.upgrades||[]).length===1);
  deliverCask(p,{owner:0,style:'mumme',q:4,die:4,act:'age'},'novgorod');
  ok('Novgorod banks the die +2 (die 4 → 6★)', p.delivered[p.delivered.length-1].val===6);
  deliverCask(p,{owner:0,style:'bock',q:5,die:6,act:'age'},'novgorod');
  ok('the Novgorod premium rides above the die cap (die 6 → 8★)', p.delivered[p.delivered.length-1].val===8);
  ok('no refine machinery survives', typeof freeAge==='undefined'&&typeof brefinePick==='undefined');
  p.recipes=['gruit','hopped'];p.hops=5;var h9=p.hops;
  UI.pendingRecipe=[{pid:0,dest:'bruges'}];afterSail('stops');
  ok('Bruges prize: a dealt export recipe — AT its H = Q−2 fee (v45e)', p.recipes.length===3&&p.hops<h9);
  p.ai=null;
})();

// ---- 10. COMMISSION: 1G · place on a shipless slot · banks NOTHING (v4.5b de-mint) · display refills to 4 ----
(function(){var p=fresh();stops();
  p.grain=3;var b0=p.bank;
  S.shipDisplay=[{ship:'hulk',dest:'bergen'},{ship:'skute',dest:'bruges'}];S.shipDeck=[{ship:'cog',dest:'london'},{ship:'cog',dest:'bruges'},{ship:'cog',dest:'bergen'}];
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';
  commPick(0);commPlace('s6');
  ok('commission pays 1G', p.grain===2);
  ok('the hull lands on the slot', S.slots.s6&&S.slots.s6.ship==='hulk'&&S.slots.s6.dest==='bergen');
  ok('the commission banks NOTHING (v4.5b — the hull + the free load are the reward)', p.bank===b0);
  ok('the display refills toward 4', S.shipDisplay.length===4);
  ship('s7','cog','bruges');
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';commPick(0);
  var before=S.slots.s7;commPlace('s7');
  ok('one ship per slot — an occupied slot refuses', S.slots.s7===before&&S.slots.s7.ship==='cog');
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

// ---- 11. BUILDINGS: +3★ on placement · overbuild = 1G, displaced boxed · serve-anyone action ----
(function(){var p=fresh();stops();var q=S.players[1];
  p.grain=5;var b0=p.bank;
  commitBldg('s1','granary',0);
  ok('raising a building banks +'+BUILD_PTS+'★', p.bank===b0+BUILD_PTS);
  var g1=p.grain;
  commitBldg('s1','maltkiln',0);
  ok('overbuild costs the 1G rent; the displaced tile is boxed', p.grain===g1-1&&bKeyAt('s1')==='maltkiln');
  ok('no owner is tracked on buildings', S.buildings.s1.owner===undefined);
  // the serve-anyone action: P2 fires the Granary P1 raised
  commitBldg('s2','granary',0);
  S.active=1;stops();var qg=q.grain;
  UI.stops=[{kind:'bact',slot:'s2'}];resolveStop(0);
  ok('a rival may fire the building action (source picker opens)', UI.sub==='source');
  srcTake(2,0);
  ok('the rival banks the goods', q.grain===qg+2);
  S.active=0;
})();

// ---- 12. PRESENCE BUMP: a tray die at face 1 — 1★, presence, clock; tray-gated ----
(function(){var p=fresh();stops();
  p.delivered.push({style:'gruit',q:1,dest:'bruges',val:1});
  var b0=p.bank,pool0=p.presPool;
  addPresence(p,'bruges',1);
  ok('a bump parks a die (presence +1 · 1★ · pool −1)', p.presBonus.bruges===1&&p.bank===b0+1&&p.presPool===pool0-1);
  p.presPool=diceInFlight(p);   // tray = 0
  var pb=p.presBonus.bruges;
  addPresence(p,'bruges',1);
  ok('no tray die → no bump', p.presBonus.bruges===pb);
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
  p.bank=7;p.brewed={gruit:1,hopped:1,broyhan:1};
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

// ---- 17. SETUP: display of 4 ships · 17-building deck · 2 neutral seeds · warm Hulk→Bruges · Gruit die 1 ----
(function(){EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(3,['P1','P2','P3']);
  ok('ship market of 4', S.shipDisplay.length===4);
  var totalShips=S.shipDeck.length+S.shipDisplay.length+SLOTS.filter(function(s){return S.slots[s.id];}).length;
  ok('24 hulls in the box', totalShips===24);
  var bcount=S.buildDeck.length+S.buildDisplay.length+SLOTS.filter(function(s){return S.buildings[s.id];}).length;
  ok('17 buildings DEALT into the game (of the 20 printed — v4.6)', bcount===17, 'got '+bcount);
  ok('two neutral buildings seeded', SLOTS.filter(function(s){return S.buildings[s.id];}).length===2);
  ok('a warm-start ship is a Hulk → Bruges', SLOTS.some(function(s){var t=S.slots[s.id];return t&&t.ship==='hulk'&&t.dest==='bruges';}));
  ok('every house opens with a Ready Gruit (die 1) + ALL 3 vessels + 2 seats (v45h)', S.players.every(function(p){return p.vessels[0]&&p.vessels[0].die===1&&p.vslots===3&&p.vessels.length===3&&p.sslots===2;}));
  ok('specialist deck = 5 core × max(2,n−1) + 8 guild ×1 (3p → 18, v4.6)', S.impDeck.length+S.impDisplay.length===18);
  ok('12 tally dice per house (v4.5)', S.players.every(function(p){return p.presPool===12;}));
  ok('the lading row opens at 3 (deck 12 behind it)', S.ladingRow.length===3&&S.ladingDeck.length===12);
  S=freshState(2,['P1','P2']);
  ok('2p specialist deck: 5×2 + 8 guild singles (18)', S.impDeck.length+S.impDisplay.length===18);
  S=freshState(4,['P1','P2','P3','P4']);
  ok('4p specialist deck: 5×3 + 8 guild singles (23)', S.impDeck.length+S.impDisplay.length===23);
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

// ---- 19. PER-ITEM WHARF FEES (v4.2 · v45e): the fee rides the item; recipes H = Q−2 at EVERY channel ----
(function(){var p=fresh();stops();
  S.exports=['broyhan','keut','mumme'];p.recipes=['gruit','hopped'];
  p.grain=3;p.hops=2;
  UI.sub='recipegain';UI.rgain={returnTo:'stops'};recipeGainPick('broyhan');
  ok('gain-recipe pays the RECIPE’s fee (Broyhan 1H)', p.hops===1&&p.grain===3&&p.recipes.indexOf('broyhan')>=0);
  UI.sub='recipegain';UI.rgain={returnTo:'stops'};recipeGainPick('keut');
  ok('the formula holds — Keut (Q3) also 1H, grain untouched (v45e)', p.grain===3&&p.hops===0&&p.recipes.indexOf('keut')>=0);
  ok('the Bock recipe prints 3H (Q5 − 2) — the rush taxed', (RECIPE_FEE.bock||{}).h===3&&!(RECIPE_FEE.bock||{}).g);
  p.grain=9;p.hops=1;var r0=p.recipes.length;   // only mumme (2H) missing — unaffordable in HOPS (grain can't help, v45e)
  enterRecipeGain('stops');
  ok('no affordable fee → the recipe channel refuses', UI.sub!=='recipegain'&&p.recipes.length===r0);
  p.grain=5;p.hops=2;S.impDisplay=['cellar','crane','granary','hopgarden'];
  UI.sub='hire';UI.hire={returnTo:'stops'};hirePick('cellar');
  ok('hire pays the SPECIALIST’s fee (Cellarman 2H)', p.hops===0&&p.grain===5&&p.upgrades.indexOf('cellar')>=0);
  p.sslots=2;UI.sub='hire';UI.hire={returnTo:'stops'};hirePick('crane');
  ok('Stevedore fee is 1G (v4.2c)', p.grain===4&&p.upgrades.indexOf('crane')>=0);
  S.buildDisplay=['granary','maltkiln','cooperage','customs'];
  var g1=p.grain,b1=p.bank;
  UI.sub='survey';UI.survey={returnTo:'stops'};surveyPick('granary');
  placeBldgOn('s1');
  ok('a chipless building is FREE to gain (+'+BUILD_PTS+' banks)', p.grain===g1&&p.bank===b1+BUILD_PTS);
  var g2=p.grain,b2=p.bank;
  UI.sub='survey';UI.survey={returnTo:'stops'};surveyPick('maltkiln');
  placeBldgOn('s2');
  ok('a premium building pays its fee (Malt Kiln 2G)', p.grain===g2-2&&p.bank===b2+BUILD_PTS);
  // v4.2c ONE PAYMENT PER PLACEMENT: a paid fee covers the ground rent
  S.buildDisplay=['cooperage','granary','missionq','almoner'];
  var g3=p.grain,b3=p.bank;
  UI.sub='survey';UI.survey={returnTo:'stops'};surveyPick('cooperage');
  placeBldgOn('s1');   // s1 is BUILT (granary) — overbuild
  ok('ONE payment: a fee-paid gain overbuilds with NO rent (2G total)', p.grain===g3-2&&p.bank===b3+BUILD_PTS&&bKeyAt('s1')==='cooperage');
  p.grain=3;var g4=p.grain,b4=p.bank;
  commitBldg('s2','granary',0);
  ok('an otherwise-FREE placement still pays the 1G rent on overbuild', p.grain===g4-1&&p.bank===b4+BUILD_PTS&&bKeyAt('s2')==='granary');
  // the kontor prizes stay FREE
  var q=S.players[1];q.ai={tier:'journeyman'};var qg=q.grain,qb=q.bank;
  UI.pendingBenefits=[{pid:1,dest:'london'}];afterSail('stops');
  ok('London prize stays free (+'+BUILD_PTS+' banked, no fee)', q.grain===qg&&q.bank===qb+BUILD_PTS);
  q.recipes=['gruit','hopped'];q.hops=5;var qg2=q.grain,qh2=q.hops;
  UI.pendingRecipe=[{pid:1,dest:'bruges'}];afterSail('stops');
  ok('the Bruges prize PAYS the recipe fee — hops only (v45e)', q.grain===qg2&&q.hops<qh2&&q.recipes.length===3);
  q.recipes=['gruit','hopped'];q.hops=0;var qr=q.recipes.length,qg2b=q.grain;
  UI.pendingRecipe=[{pid:1,dest:'bruges'}];afterSail('stops');
  ok('no affordable recipe at Bruges → the 2-goods consolation', q.recipes.length===qr&&q.grain===qg2b+1&&q.hops===1);
  var qg3=q.grain;S.impDisplay=['cellar','crane','granary','hopgarden'];
  UI.pendingSpec=[{pid:1,dest:'bergen'}];afterSail('stops');
  ok('Bergen prize stays free', q.grain===qg3&&(q.upgrades||[]).length===1);
  q.ai=null;
})();

// ---- 20. v4.5b THE DICE PASS: Racking Hall · Assay House · Hop Exchange · Tollhouse · Bonded Store ----
(function(){var p=fresh();stops();
  p.vessels=[{style:'bock',q:5,die:4,act:'age'},{style:'hopped',q:2,die:1,act:'source'},null];p.vslots=3;
  enterRack('stops');
  ok('the Racking Hall opens on two vessel casks', UI.sub==='rack');
  rackPick(0);rackPick(1);
  ok('the swap transfers the WHOLE die — no quality cap (bock 4↔hopped 1 → 1 / 4 PAST quality, v45d)',
    p.vessels[0].die===1&&p.vessels[1].die===4&&caskReady(p.vessels[1]));
  // the designer's launder engine: a Ready Bock racks its die onto a Ready Gruit
  p.vessels=[{style:'bock',q:5,die:5,act:'age'},{style:'gruit',q:1,die:1,act:'source'},null];
  enterRack('stops');rackPick(0);rackPick(1);
  ok('the launder play: a die-5 Gruit ships while the Bock re-matures from 1 (v45d)',
    p.vessels[1].die===5&&caskReady(p.vessels[1])&&p.vessels[0].die===1&&!caskReady(p.vessels[0]));
  p.vessels=[{style:'bock',q:5,die:4,act:'age'},null,null];
  enterRack('stops');
  ok('one cask → the Racking Hall refuses', UI.sub!=='rack');
  p.vessels=[{style:'mumme',q:4,die:3,act:'age'},null,null];
  enterAssay('stops');assayPick(0);
  ok('the Assay House turns one maturing die +1 (3→4 READY)', p.vessels[0].die===4&&caskReady(p.vessels[0]));
  enterAssay('stops');
  ok('nothing maturing → the Assay House refuses', UI.sub!=='assay');
  // v45c [designer-ruled]: the Assay House is ±1 — down as well as up, floor 1
  p.vessels=[{style:'bock',q:5,die:3,act:'age'},null,null];
  enterAssay('stops');assayPick(0,-1);
  ok('the Assay House may turn a maturing die DOWN (3→2, v45c)', p.vessels[0].die===2);
  p.vessels=[{style:'bock',q:5,die:1,act:'age'},null,null];
  enterAssay('stops');assayPick(0,-1);
  ok('…but never below 1 (the floor holds)', p.vessels[0].die===1&&UI.sub==='assay');
  assaySkip();
})();
(function(){var p=fresh();stops();
  // v45d: the HOP EXCHANGE is a slot-stop ACTION — pay ≤2H, +1 per hop on VESSEL dice, past quality fine
  p.vessels=[{style:'broyhan',q:3,die:3,act:'source'},null];p.hops=3;
  enterHopex('stops');
  ok('the Hop Exchange opens as an action (hops + a die below 6)', UI.sub==='hopex');
  hopexAllot(0);
  ok('1H turns the vessel die past quality (3→4 on a Q3)', p.vessels[0].die===4&&p.hops===2);
  ok('the second hop may follow (≤2 per activation)', UI.sub==='hopex'&&UI.hopex.left===1);
  hopexAllot(0);
  ok('2H total: die 5, the activation closes itself', p.vessels[0].die===5&&p.hops===1&&UI.sub!=='hopex');
  var sh=ship('s1','cog','novgorod');
  ok('the pumped die boards Novgorod on the normal gate read (no on-load special case)', canTake('s1',0));
  p.hops=0;enterHopex('stops');
  ok('no hops → the Hop Exchange refuses', UI.sub!=='hopex');
  p.ai={tier:'journeyman'};
  S.buildings.s2={b:'tollhouse'};var t2=ship('s2','hulk','bruges');
  p.vessels[0]={style:'hopped',q:2,die:2,act:'source'};
  var b0=p.bank,o0=p.bankO||0;
  S.ladingRow=[];   // no open orders — the stamp is a clean +2 net (v45d: +3★ − 1 pip)
  UI.load={ships:['s2'],returnTo:'stops',loadsLeft:1,cask:0};loadOnto('s2');
  ok('the Tollhouse stamp: die −1 (min the gate) and +3★ banked at once (v45d)', t2.load[0].die===1&&p.bank===b0+3&&(p.bankO||0)===o0+3);
  // v45c: the AI declines a stamp that forfeits a BIGGER open lading
  S.ladingRow=[{dest:'bruges',min:3,pts:4}];
  p.vessels[0]={style:'hopped',q:2,die:3,act:'source'};   // die 3 claims the 4★ order; stamped to 2 it would not (net 2−4)
  var b1=p.bank;
  UI.load={ships:['s2'],returnTo:'stops',loadsLeft:1,cask:0};loadOnto('s2');
  ok('the AI declines a stamp that forfeits a bigger lading (die stays 3, order claimable)',
    t2.load[1].die===3&&p.bank===b1);
  S.ladingRow=[];
  ok('aiLoadOpt still stamps when no order is at stake', aiLoadOpt(p,'tollhouse',3,'s2','hopped')===true);
  p.ai=null;
})();

// ---- 20b. v45d ABBEY CELLAR: pay 3H — every maturing cask ages to READY ----
(function(){var p=fresh();stops();
  p.vessels=[{style:'bock',q:5,die:2,act:'age'},{style:'mumme',q:4,die:1,act:'source'},null];p.vslots=3;p.hops=4;
  enterAbbey('stops');
  ok('the Abbey Cellar opens (3H + something maturing)', UI.sub==='abbey');
  abbeyGo(true);
  ok('3H ages EVERY maturing cask to Ready (bock 2→5 · mumme 1→4)',
    p.hops===1&&p.vessels[0].die===5&&p.vessels[1].die===4&&caskReady(p.vessels[0])&&caskReady(p.vessels[1]));
  enterAbbey('stops');
  ok('under 3H → the Abbey refuses', UI.sub!=='abbey');
  ok('every building fee prints in GRAIN only (v45d)', Object.keys(BUILDINGS).every(function(k){var f=BUILDINGS[k].fee;return !f||!f.h;}));
  ok('the box prints 20 building tiles (v4.6 — setup deals 17)', Object.keys(BUILDINGS).reduce(function(s,k){return s+BUILDINGS[k].qty;},0)===20);
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

// ---- 21. v4.5b LADINGS: the order row — claim on a qualifying delivery · one per cask · end-of-turn refill ----
(function(){var p=fresh();stops();p.ai={tier:'journeyman'};
  S.ladingRow=[{dest:'bruges',min:3,pts:2},{dest:'london',min:4,pts:3},{dest:null,min:6,pts:3}];
  S.ladingDeck=[{dest:'bergen',min:5,pts:4}];
  var b0=p.bank,l0=(p.bankL||0);
  deliverCask(p,{owner:0,style:'hopped',q:2,die:3,act:'load'},'bruges');
  ok('a qualifying delivery queues the claim (bruges die 3+)', (UI.pendingLading||[]).length===1);
  afterSail('stops');
  ok('the claim banks the printed ★ at once and takes the tile',
    p.bank===b0+2&&(p.bankL||0)===l0+2&&(p.ladings||[]).length===1&&S.ladingRow.length===2);
  ok('the row does NOT refill mid-turn', S.ladingRow.length===2&&S.ladingDeck.length===1);
  var b1=p.bank;
  deliverCask(p,{owner:0,style:'gruit',q:1,die:1,act:'source'},'bruges');
  ok('a non-qualifying delivery claims nothing (die 1 < every open order)', (UI.pendingLading||[]).length===0&&p.bank===b1);
  UI={sub:'end'};endTurn();
  ok('the lading row refills at the END of the turn', S.ladingRow.length===3&&S.ladingDeck.length===0);
  S.players.forEach(function(q){q.ai=null;});
})();

// ---- 22. v4.6b BERGEN: every shipper seats ONE specialist (cap 1 per house per ship) ----
(function(){var p=fresh();stops();p.ai=null;
  var sh=ship('s4','cog','bergen',[{owner:0,style:'keut',q:3,die:3,act:'load'},{owner:0,style:'hopped',q:2,die:2,act:'source'}]);
  UI.pendingSpec=[];sailShip('s4',0);
  ok('two casks, one owner → ONE Bergen prize (cap 1 per house per ship)', (UI.pendingSpec||[]).length===1&&UI.pendingSpec[0].pid===0);
  var sh2=ship('s5','cog','bergen',[{owner:0,style:'keut',q:3,die:3,act:'load'},{owner:1,style:'hopped',q:2,die:2,act:'source'}]);
  UI.pendingSpec=[];sailShip('s5',0);
  ok('mixed load → EVERY house with a cask aboard gets a prize (v4.6b)', (UI.pendingSpec||[]).length===2);
  ok('…queued in load order (pick order = boarding order)', (UI.pendingSpec||[]).length===2&&UI.pendingSpec[0].pid===0&&UI.pendingSpec[1].pid===1);
  var sh3=ship('s7','hulk','bergen',[{owner:1,style:'keut',q:3,die:3,act:'load'},{owner:0,style:'gruit',q:1,die:1,act:'source'},{owner:1,style:'hopped',q:2,die:2,act:'source'}]);
  UI.pendingSpec=[];sailShip('s7',0);
  ok('a 3-cask hulk (2 of one house) → exactly 2 prizes, first pick to the first boarder', (UI.pendingSpec||[]).length===2&&UI.pendingSpec[0].pid===1&&UI.pendingSpec[1].pid===0);
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
  S.shipDisplay=[{ship:'cog',dest:'bruges'}];S.shipDeck=[];
  UI.comm={returnTo:'stops',idx:null};UI.sub='commission';commPick(0);commPlace('s6');
  ok('the Shipwright commissions with 0 goods (the 1G waived)', S.slots.s6&&S.slots.s6.ship==='cog'&&p.grain===0);
})();
(function(){var p=fresh();stops();
  ok('the Town Crier is gated until 2 kontore show your dice', !specGate(p,'towncrier'));
  p.delivered.push({style:'gruit',q:1,dest:'bruges',val:1});p.delivered.push({style:'hopped',q:2,dest:'london',val:2});
  ok('…and opens once the mats show two ports', specGate(p,'towncrier'));
  p.upgrades=['towncrier'];p.sslots=2;
  var b0=p.bank,pool0=p.presPool;
  addPresence(p,'bruges',1);
  ok('a Crier bump parks at FACE 2 — banks 2★, one die, one clock beat', p.bank===b0+2&&p.presPool===pool0-1&&p.presBonus.bruges===1);
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
  ok('the Innkeeper is gated until 3 distinct beers are brewed', !specGate(p,'innkeeper'));
  p.brewed={gruit:1,hopped:1,keut:1};
  ok('…and opens at the 3rd flip (the old seat-2 rhythm)', specGate(p,'innkeeper'));
  grantUpgrade(p,'innkeeper');
  ok('seating him opens a 4th cellar (vessels 4 · a cask may mature on the tile)', p.vessels.length===4&&p.vslots===4&&openVessel(p)>=0);
})();
(function(){var p=fresh();stops();
  p.upgrades=['chronicler','alderman'];p.sslots=2;
  p.ladings=[{dest:'bruges',min:3,pts:2},{dest:null,min:6,pts:3}];
  p.presBonus.bruges=3;p.presBonus.bergen=2;
  var sc=scorePlayer(p);
  ok('the Chronicler (+1★/lading) and Alderman (+2★/kontor≥3) score the guild line', sc.guild===4&&sc.total===sc.deliv+sc.bank+sc.maj+sc.flight+sc.guild);
  p.ladings=[1,2,3,4,5,6,7].map(function(){return {dest:null,min:6,pts:3};});
  ok('the Chronicler caps at +5', scorePlayer(p).guild===7);
  ok('the Chronicler is gated behind a first claim', !specGate({ladings:[]},'chronicler')&&specGate({ladings:[{}]},'chronicler'));
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
(function(){var p=fresh();stops();
  S.ladingRow=[{dest:'bruges',min:3,pts:2},{dest:'london',min:4,pts:3}];
  S.ladingDeck=[{dest:'bergen',min:5,pts:4}];
  enterExchange('stops');
  ok('the Merchants’ Exchange opens on a live row + deck', UI.sub==='exchange');
  exchangePick(0);
  ok('the cycled order goes UNDER the deck; its replacement posts at once',
    S.ladingRow.length===2&&S.ladingRow[1].dest==='bergen'&&S.ladingDeck.length===1&&S.ladingDeck[0].dest==='bruges');
  S.ladingDeck=[];
  enterExchange('stops');
  ok('a spent deck → the Exchange refuses', UI.sub!=='exchange');
})();
(function(){var p=fresh();stops();
  ship('s3','cog','london');ship('s4','skute','bruges',[{owner:0,style:'gruit',q:1,die:1,act:'source'}]);
  enterCapstan('stops');
  ok('the Warping Capstan opens (an empty hull + open slots)', UI.sub==='capstan');
  capPick('s4');
  ok('a LOADED hull cannot be picked', UI.cap.sid==null);
  capPick('s3');capPlace('s7');
  ok('the empty hull warps s3 → s7 (the geometry is authorable)', !S.slots.s3&&S.slots.s7&&S.slots.s7.dest==='london');
})();
(function(){
  for(var t=0;t<20;t++){S=freshState(2,['P1','P2']);
    var inGame=S.buildDeck.concat(S.buildDisplay);SLOTS.forEach(function(s){if(S.buildings[s.id])inGame.push(S.buildings[s.id].b);});
    if(inGame.length!==17){ok('setup deals 17 of the 20 (run '+t+')',false,'got '+inGame.length);return;}
    if(inGame.indexOf('maltkiln')<0||inGame.indexOf('missionq')<0){ok('the Kiln + Mission Quay deal guarantee (run '+t+')',false,inGame.join(','));return;}}
  ok('setup deals 17 of the 20 — ≥1 Kiln + ≥1 Mission Quay in every deal (20 runs)', true);
  ok('the guild-tile fees stay grain-only (the v45d audit holds)', ['victual','exchange','capstan'].every(function(k){var f=BUILDINGS[k].fee;return f&&f.g&&!f.h;}));
})();

// ---- 23. v45f: the Guildmaster's standing 'quality' persona (the designer's line) ----
(function(){
  ok('the GM defaults to the quality persona', aiPersona({ai:{tier:'guildmaster'}})==='quality');
  ok('an explicit persona (PATHWAYS) overrides it', aiPersona({ai:{tier:'guildmaster',persona:'majority'}})==='majority');
  ok('the Cellarmaster stays pure search (no default persona)', aiPersona({ai:{tier:'cellarmaster'}})===null);
  ok('greedy tiers carry no persona by default', aiPersona({ai:{tier:'trader'}})===null&&aiPersona({ai:{tier:'journeyman'}})===null);
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
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#verify-v4' });
} catch (e) {
  console.error('VERIFY RUN ERROR:', e && e.stack || e);
  process.exit(1);
}
