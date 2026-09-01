// verify-v7.js — the v7.0 "The Guild" rule battery (KEY hanse-v70). Seconds, always.
// Drives the CANONICAL engine: extracts play.html's <script>, appends this driver in the
// SAME lexical scope (S/UI are lets), runs in a Node vm with a stubbed DOM.
// Usage: node playtests/verify-v7.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= VERIFY DRIVER (appended in-scope) =================
render=function(){};save=function(){};log=function(){};snapshot=function(){};maybeRunAI=function(){};
var __T=[],__cur=null;
function t(name,fn){__cur={name,fails:[]};
  try{fn();}catch(e){__cur.fails.push('THREW: '+(e&&e.stack||e).toString().slice(0,300));}
  __T.push(__cur);}
function eq(a,b,msg){if(JSON.stringify(a)!==JSON.stringify(b))__cur.fails.push((msg||'eq')+': got '+JSON.stringify(a)+' want '+JSON.stringify(b));}
function ok(x,msg){if(!x)__cur.fails.push(msg||'expected truthy');}
function fresh(n){EXPANSION=false;JOPEN=false;HALLEXP=false;OVERLAND=false;
  S=freshState(n||3,['P1','P2','P3','P4'].slice(0,n||3));UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p){p.ai=null;});
  return S;}
function slotOpen(){var id=null;SLOTS.forEach(function(s){if(!id&&!S.slots[s.id])id=s.id;});return id;}
function clearSlot(id){S.slots[id]=null;S.buildings[id]=null;}
function putShip(id,ship,dest,load){S.slots[id]={type:'ship',ship:ship,dest:dest,load:load||[]};return S.slots[id];}
function mkCask(style,die,act){var st=STYLES[style];return {style:style,q:st.q,die:(die!=null?die:st.q),act:act||'source'};}
function mkLg(dest,cert){return {dest:dest,cert:cert?1:0,queue:[],glut:{},letter:{},landed:{}};}

// ---------- 0 · identity & setup ----------
t('KEY is hanse-v70b',function(){eq(KEY,'hanse-v70b');});
t('setup: all 8 slots furnished, no bag, warm hulls at s6/s7',function(){fresh(3);
  var works=0;SLOTS.forEach(function(s){var b=S.buildings[s.id];if(b&&!b.v)works++;});
  eq(works,8,'works standing');
  ok(!S.worksBag||!S.worksBag.length,'no bag');
  var s6=S.slots.s6;ok(s6&&s6.type==='ship'&&s6.ship==='hulk'&&s6.dest==='bruges','s6 warm Hulk→Bruges');
  var s7=S.slots.s7;ok(s7&&s7.type==='ship'&&(s7.dest==='bruges'||s7.dest==='bergen'),'s7 warm Bruges/Bergen hull');
  eq((S.shipDisplay||[]).length,SHIP_DISPLAY,'ship display');});
t('setup: contracts — display 3, deck 11, ⚜ hands empty',function(){fresh(3);
  eq(S.contractDisplay.length,CONTRACT_DISPLAY);
  eq(S.contractDeck.length,CONTRACTS7.length-CONTRACT_DISPLAY);
  S.players.forEach(function(p){eq((p.invites||[]).length,0,'⚜ start 0');});});
t('setup: demand — one card per Kontor well; type cards only for dealt exports',function(){fresh(3);
  var dealt=0;KONTORE.forEach(function(k){var d=S.demand[k];ok(d&&d.card,'well '+k);eq((d.dice||[]).length,0);dealt++;});
  eq(dealt,4);
  var typeInDeckOrWells=[];KONTORE.forEach(function(k){var c=DEMAND_BY_K[S.demand[k].card];if(c&&c.type)typeInDeckOrWells.push(c.type);});
  S.demandDeck.forEach(function(k){var c=DEMAND_BY_K[k];if(c&&c.type)typeInDeckOrWells.push(c.type);});
  typeInDeckOrWells.forEach(function(ty){ok(S.exports.includes(ty),'type card '+ty+' is a dealt export');});});
t('setup: ladders open at rung 1; every ladder is 6 rungs of two places',function(){fresh(2);
  KONTORE.forEach(function(k){eq(ladderStep(k),0,k+' step');
    eq(LADDERS[k].length,6,k+' rungs');
    LADDERS[k].forEach(function(r){eq(r.length,2,k+' two places');});});});
t('setup: the bourse opens at the TOP and Gruit/Jopenbier are untracked',function(){fresh(3);
  Object.keys(S.bourse).forEach(function(b){eq(S.bourse[b],BOURSE_START,b);});
  ok(!('gruit' in S.bourse));ok(!('jopenbier' in S.bourse));});
t('setup: the Venture hand — one tile per theme, four themes',function(){fresh(2);
  S.players.forEach(function(p){eq(p.hand.slice().sort(),VENTURE_KEYS.slice().sort());});});
t('ships: Cog 2 free · Hulk 3 at 1G (the fee inversion) · no Skute',function(){fresh(2);
  eq(SHIP_CAP.cog,2);eq(SHIP_CAP.hulk,3);ok(!SHIP_CAP.skute,'skute retired');
  eq(COMMISSION_COST.cog,{});eq(COMMISSION_COST.hulk,{g:1});
  var p=S.players[0];p.upgrades=['shipwright'];eq(commCostFor(p,'hulk'),{},'Shipwright waives');});

// ---------- 1 · the lane gates ----------
t('laneOpenFor: OUTNUMBER at the gateway',function(){fresh(2);var p=S.players[0];
  ok(laneOpenFor(p,'bruges'),'bruges always open');
  ok(!laneOpenFor(p,'london'),'london shut at 0>0');
  p.presBonus.bruges=1;ok(laneOpenFor(p,'london'),'1 bruges > 0 london');
  p.presBonus.london=1;ok(!laneOpenFor(p,'london'),'1>1 fails — outnumber, not match');
  p.presBonus.bergen=2;ok(laneOpenFor(p,'novgorod'),'novgorod via bergen');});
t('canTake reads the lane gate and the flag',function(){fresh(2);var p=S.players[0];
  var id=slotOpen()||'s1';clearSlot(id);putShip(id,'cog','london');
  p.vessels[0]=mkCask('gruit',6);
  ok(!canTake(id,0),'lane shut');
  p.presBonus.bruges=1;ok(canTake(id,0),'lane open');
  S.slots[id].own=1;ok(!canTake(id,0),'a rival flag bars the berth');
  S.slots[id].own=0;ok(canTake(id,0),'own flag boards');});
t('commEligible respects fee AND lane',function(){fresh(2);var p=S.players[0];
  S.shipDisplay=[{ship:'hulk',dest:'london'},{ship:'cog',dest:'bruges'}];
  p.grain=5;var el=commEligible(p).map(function(o){return o.sn.dest;});
  eq(el,['bruges'],'london lane shut');
  p.presBonus.bruges=1;el=commEligible(p).map(function(o){return o.sn.dest;});
  eq(el.slice().sort(),['bruges','london']);});

// ---------- 2 · commission: displacement, flag, maiden load ----------
t('commission may displace an EMPTY docked hull (it returns to the deck)',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);putShip(id,'cog','bruges');
  S.shipDisplay=[{ship:'hulk',dest:'bruges'}];p.grain=5;
  var pool0=S.shipDeck.length+S.shipDisplay.length;   // + the docked cog = the fleet
  UI.comm={returnTo:'end',idx:0,flag:false};UI.stage='place';
  commPlace(id);
  ok(S.slots[id]&&S.slots[id].ship==='hulk','the hulk stands');
  eq(S.shipDeck.length+S.shipDisplay.length,pool0,'the displaced cog returned to the pool (hulls conserve)');});
t('commission: a LOADED hull is never displaced',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);putShip(id,'cog','bruges',[{owner:0,style:'gruit',q:1,die:1}]);
  S.shipDisplay=[{ship:'hulk',dest:'bruges'}];p.grain=5;
  UI.comm={returnTo:'end',idx:0,flag:false};UI.stage='place';
  commPlace(id);
  ok(S.slots[id].ship==='cog','the loaded cog stands');});
t('the private flag: 1G, one out at a time, only the owner boards/sails-now',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);
  S.shipDisplay=[{ship:'cog',dest:'bruges'}];p.grain=3;
  ok(commFlagOK(p,S.shipDisplay[0]),'flag affordable');
  UI.comm={returnTo:'end',idx:0,flag:true};UI.stage='place';
  var g0=p.grain;commPlace(id);
  eq(p.grain,g0-1,'flag fee 1G (cog free)');
  eq(S.slots[id].own,p.id,'flag planted');
  ok(flagOut(p),'flag out');
  ok(!commFlagOK(p,{ship:'cog',dest:'bruges'}),'no second flag');
  // sail-now: the rival can't use the flagged hull even with... no rival cask can board anyway
  S.slots[id].load=[{owner:p.id,style:'gruit',q:1,die:1}];
  ok(sailNowShips(p).includes(id),'owner sails it');
  ok(!sailNowShips(S.players[1]).includes(id),'rival cannot');});
t('the maiden load opens after a commission when a Ready cask fits',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);
  S.shipDisplay=[{ship:'cog',dest:'bruges'}];p.vessels[0]=mkCask('gruit',6);
  UI.comm={returnTo:'end',idx:0,flag:false};UI.stage='place';
  commPlace(id);
  eq(UI.sub,'load','the load flow opened');
  ok(UI.load&&UI.load.ships.length===1&&UI.load.ships[0]===id,'scoped to the new hull');});

// ---------- 3 · BUILD, the ledger ----------
t('an L1 replaces a Public Work at 2G (the worn tile boxed) or takes open ground at 1G',function(){fresh(2);var p=cur();
  var id='s2';ok(S.buildings[id]&&!S.buildings[id].v,'a work stands');
  eq(ventureL1Fee(id),V_FEE_REPLACE,'replace fee');
  clearSlot(id);eq(ventureL1Fee(id),V_FEE_L1,'open-ground fee');
  p.grain=5;
  UI.tmp={placeVent:{k:'brew',lvl:1,owner:p.id,free:false}};UI.placeRt='end';UI.sub='placevent';
  var g0=p.grain;placeVentOn(id);
  eq(p.grain,g0-1,'1G paid');
  var b=S.buildings[id];ok(b&&b.v==='brew'&&b.lvl===1&&b.owner===p.id,'the L1 stands');
  eq(b.die,1,'the LEDGER die stands at 1');
  ok(!p.hand.includes('brew'),'the tile left the hand');});
t('replacing a Public Work: 2G, the work is gone',function(){fresh(2);var p=cur();
  var id='s3';ok(S.buildings[id]&&!S.buildings[id].v);
  p.grain=5;
  UI.tmp={placeVent:{k:'age',lvl:1,owner:p.id,free:false}};UI.placeRt='end';UI.sub='placevent';
  var g0=p.grain;placeVentOn(id);
  eq(p.grain,g0-2,'2G paid');
  var b=S.buildings[id];ok(b&&b.v==='age','the Venture replaced the work');});
t('the FLIP keeps the tile AND the ledger die; no hand tile spent',function(){fresh(2);var p=cur();
  var id='s4';clearSlot(id);
  S.buildings[id]={v:'die',lvl:1,owner:p.id,die:4};
  p.hand=['brew','age','points'];p.grain=5;
  UI.build={returnTo:'end',free:false,pid:p.id};UI.sub='build';
  var h0=p.hand.length,g0=p.grain;
  buildPick('flip','die',id);
  var b=S.buildings[id];eq(b.lvl,2,'flipped to L2');eq(b.die,4,'the die rides');
  eq(p.hand.length,h0,'no hand tile spent');eq(p.grain,g0-2,'the L2 fee');});
t('the OVERBUILD boxes the L1 and the ledger die rides',function(){fresh(2);var p=cur();
  var id='s5';clearSlot(id);
  S.buildings[id]={v:'die',lvl:1,owner:p.id,die:5};
  p.hand=['brew','age','points'];p.grain=5;
  UI.tmp={placeVent:{k:'points',lvl:2,owner:p.id,free:false}};UI.placeRt='end';UI.sub='placevent';
  placeVentOn(id);
  var b=S.buildings[id];eq(b.v,'points','the new theme stands');eq(b.lvl,2);eq(b.die,5,'the die rides the overbuild');
  ok(!p.hand.includes('points'));});
t('a rival is NEVER displaced: ventureL1Slots skips rival Ventures',function(){fresh(2);var p=S.players[0];
  var id='s6';clearSlot(id);S.buildings[id]={v:'brew',lvl:1,owner:1,die:1};
  ok(!ventureL1Slots(p).some(function(s){return s.id===id;}),'a rival L1 is not ground');});
t('the LEDGER: rival use ticks +1 (cap 6), then pays +1★/serve; the owner ticks nothing',function(){fresh(2);
  var id='s7';clearSlot(id);S.buildings[id]={v:'die',lvl:2,owner:0,die:1};
  ledgerTick(id,0);eq(S.buildings[id].die,1,'owner free');
  ledgerTick(id,1);eq(S.buildings[id].die,2,'rival ticks');
  S.buildings[id].die=6;var bk0=S.players[0].bank;
  ledgerTick(id,1);eq(S.buildings[id].die,6,'cap 6');
  eq(S.players[0].bank,bk0+LEDGER_OVER_PTS,'overflow pays the owner');
  eq(S.players[0].bankLg,LEDGER_OVER_PTS,'tracked as ledger ★');});
t('a flanking Venture is a STOP for any visitor; a rival visit ticks at entry',function(){fresh(2);
  var p=cur();p.placed=true;p.cell='A';
  var id=FLANKS.A[0];clearSlot(id);S.buildings[id]={v:'die',lvl:1,owner:1,die:1};
  p.vessels[0]=mkCask('hopped',1);p.vessels[1]=mkCask('gruit',1);
  beginStops();
  ok(UI.stops.some(function(st){return st.kind==='vact'&&st.slot===id;}),'the vact stop stands');
  var i=UI.stops.findIndex(function(st){return st.kind==='vact'&&st.slot===id;});
  resolveStop(i);
  eq(S.buildings[id].die,2,'the rival visit ticked the ledger');
  eq(UI.sub,'rack','the Rack House flow opened for the visitor');});
t('the ledger die commits the clock (trayDice counts it) and can END the game',function(){fresh(2);var p=cur();
  p.presPool=4;p.vessels=[mkCask('gruit',1),null,null];   // 1 in vessels
  var base=trayDice(p);
  var id='s8';clearSlot(id);
  S.buildings[id]={v:'brew',lvl:1,owner:p.id,die:1};
  eq(trayDice(p),base-1,'the ledger die is committed');
  p.presPool=2;   // vessels 1 + ledger 1 = 2 committed → tray 0
  checkDiceEnd();ok(S.ending,'the empty tray ends it');});
t('canVentureL1 needs a tray die for the ledger',function(){fresh(2);var p=cur();
  p.presPool=1;p.vessels=[mkCask('gruit',1),null,null];   // the one die is in a vessel
  ok(!canVentureL1(p),'no tray die → no L1');});

// ---------- 4 · contracts & the claim ----------
function loadInto(p,slot,vi){UI.load={ships:[slot],returnTo:'end',loadsLeft:1,cask:vi,count:0};UI.sub='load';loadCommit(slot,vi);}
t('a matching load may CLAIM — ONE per turn; the AI auto-claims',function(){fresh(2);var p=cur();
  p.ai={tier:'journeyman'};
  var id='s1';clearSlot(id);putShip(id,'hulk','bruges');
  S.contractDisplay=['q12a','hulka','bru'];
  p.vessels[0]=mkCask('gruit',6);
  loadInto(p,id,0);
  eq((p.invites||[]).length,1,'the AI claimed one');
  eq(UI.claimed,1,'the turn claim is spent');
  eq(S.contractDisplay.length,2,'the card left the display');
  p.vessels[1]=mkCask('gruit',6);
  loadInto(p,id,1);
  eq((p.invites||[]).length,1,'one claim per turn');});
t('a human load queues the claim; cpickPick resolves it',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);putShip(id,'hulk','bruges');
  S.contractDisplay=['q12a','hulka','lon'];
  p.vessels[0]=mkCask('gruit',6);
  loadInto(p,id,0);
  ok((UI.pendingClaims||[]).length===1,'queued');
  ok(UI.pendingClaims[0].opts.includes('q12a')&&UI.pendingClaims[0].opts.includes('hulka'),'both matches offered');
  ok(!UI.pendingClaims[0].opts.includes('lon'),'the London card does not match');
  UI.goodsRt='end';UI.sub='cpick';
  cpickPick('hulka');
  eq((p.invites||[]).length,1);eq(p.invites[0],'hulka');});
t('the Herald pays 1G 1H on a claim',function(){fresh(2);var p=cur();
  p.upgrades=['herald'];S.contractDisplay=['q12a'];
  var g0=p.grain,h0=p.hops;
  claimContract(p,'q12a');
  eq(p.grain,g0+1);eq(p.hops,h0+1);});
t('endTurn refills the contract display and re-deals retired demand',function(){fresh(2);
  S.contractDisplay=['q12a'];
  S.demand.bruges={card:null,dice:[]};
  endTurn();
  eq(S.contractDisplay.length,CONTRACT_DISPLAY,'display refilled');
  ok(S.demand.bruges.card,'a fresh demand dealt');});

// ---------- 5 · land: DELIVER vs PRESENT ----------
t('DELIVER: die + marker (+ the demand market line), the glut set, the prize queued',function(){fresh(2);var p=S.players[0];
  S.demand.bruges={card:'q2pa',dice:[]};
  S.bourse[S.exports[0]]=2;
  var st=S.exports[0];
  var Lg=mkLg('bruges');var L={owner:0,style:st,q:STYLES[st].q,die:4,act:'source'};
  UI={sub:'move'};
  landDeliver(p,L,Lg);
  var d=p.delivered[p.delivered.length-1];
  eq(d.val,4+2+DEMAND_DELIVER_STAR,'die 4 + marker +2 + the demand line');
  ok(Lg.glut[st],'the glut is set');
  ok((UI.pendingRecipe||[]).length===1,'the Bruges prize queued');});
t('PRESENT: spend an ⚜ · die + the card bonus ONLY · no marker, no glut, no prize · the ladder climbs · the die takes the seat',function(){fresh(2);var p=S.players[0];
  var st=S.exports[0];
  S.demand.bruges={card:'q2pa',dice:[]};S.bourse[st]=3;
  p.invites=['q12a'];
  var deck0=S.contractDeck.length;var lad0=ladderStep('bruges');
  var Lg=mkLg('bruges');var L={owner:0,style:st,q:STYLES[st].q,die:4,act:'source'};
  UI={sub:'move'};
  landPresent(p,L,Lg);
  var d=p.delivered[p.delivered.length-1];
  eq(d.val,4+DEMAND_BY_K['q2pa'].bonus,'die + bonus, OFF the bourse');
  ok(d.hall===1,'marked a hall landing');
  eq(Object.keys(Lg.glut).length,0,'no glut');
  eq((UI.pendingRecipe||[]).length,0,'no prize');
  eq(S.contractDeck.length,deck0+1,'the ⚜ recycled under the deck');
  eq(ladderStep('bruges'),lad0+1,'the ladder climbed');
  eq(S.demand.bruges.dice.length,1,'the die seats at the hall');});
t('the demand card retires when its seats fill; presenting needs a seat AND a match AND an ⚜',function(){fresh(2);var p=S.players[0];
  var st=S.exports[0];
  S.demand.bruges={card:'q2pa',dice:[]};p.invites=['q12a','q3a'];
  var L={owner:0,style:st,q:STYLES[st].q,die:4};
  ok(landCanPresent(p,L,'bruges'),'presentable');
  ok(!landCanPresent(p,{owner:0,style:'gruit',q:1,die:4},'bruges'),'Gruit never matches (Q2+)');
  var Lg=mkLg('bruges');
  landPresent(p,L,Lg);landPresent(p,{owner:0,style:st,q:STYLES[st].q,die:3},Lg);
  ok(!S.demand.bruges.card,'the card retired at '+DEMAND_SEATS+' dice');
  ok(!landCanPresent(p,L,'bruges'),'no card → no present');});
t('presented dice count as parked: presence, the lane gates, the clock',function(){fresh(2);var p=S.players[0];
  var st=S.exports[0];
  S.demand.bruges={card:'q2pa',dice:[]};p.invites=['q12a'];
  var Lg=mkLg('bruges');
  landPresent(p,{owner:0,style:st,q:STYLES[st].q,die:4},Lg);
  eq(presenceAt(p,'bruges'),1+((STYLES[st].bonusPres)||0),'presence (+ any printed perk, e.g. Keut’s)');
  ok(laneOpenFor(p,'london'),'the hall landing opens the lane');});
t('Novgorod: +3★ premium ON DELIVER only; no prize at all',function(){fresh(2);var p=S.players[0];
  var st=S.exports[0];S.bourse[st]=0;
  S.demand.novgorod={card:null,dice:[]};   // neutralize the market line for the clean read
  var Lg=mkLg('novgorod');
  UI={sub:'move'};
  landDeliver(p,{owner:0,style:st,q:STYLES[st].q,die:5},Lg);
  eq(p.delivered[p.delivered.length-1].val,5+3,'die + the premium');
  eq((UI.pendingRecipe||[]).length+((UI.pendingBenefits||[]).length)+((UI.pendingSpec||[]).length),0,'no prize queue');});
t('the first-landing letter draws a contract after the sail resolves',function(){fresh(2);var p=S.players[0];
  var Lg=mkLg('bruges');var inv0=(p.invites||[]).length;
  landDeliver(p,{owner:0,style:'gruit',q:1,die:2},Lg);
  ok(Lg.letter[0],'the letter is marked');
  landingClose(Lg);
  eq((p.invites||[]).length,inv0+1,'the letter drew a contract');});
t('the GLUT: one step per delivered TYPE; certified cargo skips; presents never glut',function(){fresh(2);
  var st=S.exports[0];S.bourse[st]=3;
  var Lg=mkLg('bruges');Lg.glut[st]=1;
  landingClose(Lg);
  eq(S.bourse[st],2,'one step down');
  var Lg2=mkLg('bruges',true);Lg2.glut={};Lg2.cert=1;
  landingClose(Lg2);
  eq(S.bourse[st],2,'certified — no move');});
t('the COPER: after the glut, step ONE landed beer +1 (the market’s one hand)',function(){fresh(2);var p=S.players[0];
  p.upgrades=['coper'];var st=S.exports[0];S.bourse[st]=1;
  var Lg=mkLg('bruges');(Lg.landed[0]={})[st]=1;Lg.glut[st]=1;
  UI={sub:'move'};
  landingClose(Lg);
  eq(S.bourse[st],0,'the glut fell first');
  ok((UI.pendingCoper||[]).length===1,'the Coper queued');
  UI.csh={styles:[st],pid:0};UI.goodsRt='end';UI.sub='copshift';
  copshiftPick(st);
  eq(S.bourse[st],1,'the Coper talked it back');});
t('DOWN ONLY: no engine channel shifts the bourse up except the Coper',function(){fresh(2);
  ok(typeof enterBshift==='undefined','the shift picker is gone');
  ok(typeof aiTradeValue==='undefined','TRADE is gone');});

// ---------- 6 · sail — instant, enacted ----------
t('a full Ship sails AT ONCE and the tide takes the slot’s Public Work for good',function(){fresh(2);var p=cur();
  var id='s1';var hadWork=S.buildings[id]&&!S.buildings[id].v;
  putShip(id,'cog','bruges',[{owner:0,style:'gruit',q:1,die:2,act:'source'}]);
  var deck0=S.shipDeck.length+S.shipDisplay.length;
  var sailed0=S.sailed;
  sailShip(id,0);
  ok(!S.slots[id],'the slot cleared');
  if(hadWork)ok(!S.buildings[id],'the tide took the work');
  eq(S.sailed,sailed0+1);
  ok((UI.pendingLandings||[]).length===1,'the landing queued');
  eq(S.shipDeck.length+S.shipDisplay.length,deck0+1,'the hull returned');});
t('afterSail resolves the landing queue: an AI cask DELIVERS inline; the close then fires',function(){fresh(2);
  S.players.forEach(function(q){q.ai={tier:'journeyman'};});
  var st=S.exports[0];S.bourse[st]=3;
  var id='s1';clearSlot(id);
  putShip(id,'cog','bruges',[{owner:0,style:st,q:STYLES[st].q,die:STYLES[st].q,act:'source'},
                             {owner:1,style:'gruit',q:1,die:1,act:'source'}]);
  UI={sub:'move'};
  sailShip(id,0);afterSail('end');
  eq(S.players[0].delivered.length,1,'seat 0 landed');
  eq(S.players[1].delivered.length,1,'seat 1 landed');
  eq(S.bourse[st],2,'the glut closed the landing');});
t('SAIL-now sails an unfull Ship carrying YOUR cask',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);
  putShip(id,'hulk','bruges',[{owner:0,style:'gruit',q:1,die:1,act:'source'}]);
  ok(sailNowShips(p).includes(id));
  ok(!sailNowShips(S.players[1]).includes(id),'no cask of theirs aboard');
  UI.sailn={opts:[id],returnTo:'end'};UI.sub='sailnow';
  sailNowPick(id);
  ok(!S.slots[id],'sailed unfull');});
t('the Cooperage adds a berth (it sails full at cap+1)',function(){fresh(2);
  var id='s1';clearSlot(id);
  S.buildings[id]={b:'cooperage'};
  var t2=putShip(id,'cog','bruges');
  eq(effCap(t2),3,'2+1');});
t('the SUPERCARGO pays when a rival sails your cask',function(){fresh(2);
  var p1=S.players[1];p1.upgrades=['supercargo'];
  var id='s1';clearSlot(id);
  putShip(id,'cog','bruges',[{owner:1,style:'gruit',q:1,die:1,act:'source'}]);
  var g0=p1.grain,h0=p1.hops;
  S.active=0;
  sailShip(id,0);
  eq(p1.grain,g0+1,'1G');eq(p1.hops,h0+1,'1H');});
t('the Weigh House certifies the whole sail',function(){fresh(2);
  var id='s1';clearSlot(id);S.buildings[id]={b:'weighhouse'};
  putShip(id,'cog','bruges',[{owner:0,style:'gruit',q:1,die:1,act:'source'}]);
  sailShip(id,0);
  ok(UI.pendingLandings[0].cert===1,'certified');});
t('STAPLE RIGHTS (Venture L2): +2★/own cask on the sail; a rival’s sail ticks once',function(){fresh(2);
  var id='s1';clearSlot(id);
  S.buildings[id]={v:'points',lvl:2,owner:1,die:1};
  putShip(id,'cog','bruges',[{owner:1,style:'gruit',q:1,die:1,act:'source'}]);
  var bk0=S.players[1].bank;
  S.active=0;sailShip(id,0);
  eq(S.players[1].bank,bk0+VSTAR_PTS,'the owner’s cask paid');
  eq(S.buildings[id].die,2,'the rival’s sail ticked the ledger');});
t('the LIFT load bonus turns the die at boarding (Victualling doubles it)',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);putShip(id,'cog','novgorod');
  p.presBonus.bergen=1;
  p.vessels[0]=mkCask('hopped',2,'lift');   // Ready at 2; the lift boards it at 3 — the Novgorod gate
  eq(boardDie(p.vessels[0],id),3,'lift +1');
  ok(canTake(id,0),'the lift clears the gate');
  S.buildings[id]={b:'victual'};
  eq(boardDie(p.vessels[0],id),4,'the Yard doubles the lift');});

// ---------- 7 · prizes ----------
t('every prize is the thing OR the ★ OR (seats empty) a demand refresh',function(){fresh(2);var p=S.players[0];
  S.demand.bergen={card:'q2pa',dice:[]};
  ok(canRefreshDemand('bergen'),'refreshable while no die seats');
  S.demand.bergen.dice.push({owner:0,die:3,style:'hopped'});
  ok(!canRefreshDemand('bergen'),'a seated die locks the card');
  var bk0=p.bank;prizeStars(p,'bergen');
  eq(p.bank,bk0+PRIZE_PTS,'the ★ arm');});
t('London’s prize is one BUILD, fee-waived (the AI takes it when the build beats the ★)',function(){fresh(2);
  var p=S.players[0];p.ai={tier:'journeyman'};p.grain=0;p.hops=0;
  var id='s1';clearSlot(id);S.buildings[id]=null;
  UI={sub:'move'};UI.pendingBenefits=[{pid:0,dest:'london'}];
  afterSail('end');
  var built=0;SLOTS.forEach(function(s){var b=S.buildings[s.id];if(b&&b.v&&b.owner===0)built++;});
  ok(built===1||p.bank>=PRIZE_PTS,'a free build landed (or the ★ if valued higher)');});
t('the Bruges recipe prize still pays its printed fee (never the waiver)',function(){fresh(2);
  var p=S.players[0];p.ai={tier:'journeyman'};
  p.grain=9;p.hops=9;
  UI={sub:'move'};UI.pendingRecipe=[{pid:0,dest:'bruges'}];
  var n0=p.recipes.length;var h0=p.hops;
  afterSail('end');
  if(p.recipes.length>n0){var got=p.recipes[p.recipes.length-1];
    eq(h0-p.hops,(RECIPE_FEE[got]||{}).h||0,'the fee was paid');}
  else ok(p.bank>=PRIZE_PTS,'or the ★');});

// ---------- 8 · scoring ----------
t('majorityAwards pays the LADDER rung — two places at every count, the presence gate stands',function(){fresh(2);
  var p0=S.players[0],p1=S.players[1];
  p0.presBonus.bruges=3;p1.presBonus.bruges=1;
  var a=majorityAwards('bruges');
  eq(a[0],LADDERS.bruges[0][0],'1st at rung 1');
  eq(a[1],LADDERS.bruges[0][1],'2nd pays at 2p');
  ladderAdvance('bruges');ladderAdvance('bruges');
  a=majorityAwards('bruges');
  eq(a[0],LADDERS.bruges[2][0],'the climbed rung pays');
  p1.presBonus.bruges=0;a=majorityAwards('bruges');
  ok(!a[1],'no parked dice, no share');});
t('ties split the rung’s places',function(){fresh(3);
  S.players[0].presBonus.london=2;S.players[1].presBonus.london=2;
  var a=majorityAwards('london');
  var r=LADDERS.london[0];var share=Math.floor((r[0]+r[1])/2);
  eq(a[0],share);eq(a[1],share);});
t('scorePlayer: the ledger pips score to the owner; the total adds them',function(){fresh(2);
  var id='s1';clearSlot(id);S.buildings[id]={v:'brew',lvl:1,owner:0,die:5};
  var sc=scorePlayer(S.players[0]);
  eq(sc.bldg,5,'the pips');
  eq(sc.total,sc.deliv+sc.bank+sc.maj+sc.flight+sc.guild+5+sc.ext,'in the total');});
t('the Chronicler pays on EVERY landing — deliver and present',function(){fresh(2);var p=S.players[0];
  p.upgrades=['chronicler'];var st=S.exports[0];
  S.demand.bruges={card:'q2pa',dice:[]};p.invites=['q12a'];
  var bk0=p.bankL||0;
  landDeliver(p,{owner:0,style:st,q:STYLES[st].q,die:3},mkLg('bruges'));
  landPresent(p,{owner:0,style:st,q:STYLES[st].q,die:3},mkLg('bruges'));
  eq((p.bankL||0)-bk0,2*CHRON_PTS,'both landings paid');});
t('the Flight still counts distinct beers SHIPPED',function(){fresh(2);var p=S.players[0];
  markShipped(p,'gruit');markShipped(p,'hopped');markShipped(p,S.exports[0]);
  eq(flightScore(p),FLIGHT_PTS[3]);});

// ---------- 8b · the clerk's recap ----------
t('the clerk’s recap: rival-clock gains read back, itemized by cause',function(){fresh(2);
  var p=S.players[1];
  p._recap=recapSnap(p);
  // between-turns events land on seat 1:
  p.bank+=5;p.bankSt=(p.bankSt||0)+2;p.bankW=(p.bankW||0)+1;      // staple 2 + wharfage 1 + presence 2
  p.delivered.push({style:'gruit',q:1,dest:'bruges',val:4,mkt:0});
  p.delivered.push({style:'hopped',q:2,dest:'bergen',val:6,mkt:0,hall:1});
  var id='s1';clearSlot(id);S.buildings[id]={v:'die',lvl:1,owner:1,die:3};
  p._recap.led[id]={d:1,lvl:1,k:'die'};
  (p.invites=p.invites||[]).push('q12a');
  p.grain+=1;p.hops+=1;
  var R=recapDiff(p);
  ok(R&&R.length>=7,'items collected ('+(R?R.length:0)+')');
  var has=function(s){return R.some(function(x){return x.indexOf(s)>=0;});};
  ok(has('Bruges'),'the landing named');
  ok(has('PRESENTED'),'the hall landing named');
  ok(has('staple'),'staple ★ named');
  ok(has('wharfage'),'wharfage named');
  ok(has('presence ★'),'the untracked remainder attributed to presence');
  ok(has('ledger 1'),'the ledger tick 1 → 3 named');
  ok(has('invitation'),'the ⚜ named');
  ok(has('goods'),'the goods named');});
t('endTurn wires the recap: baseline out · read-back in · silent when nothing came',function(){fresh(2);
  var p1=S.players[1];p1._recap=recapSnap(p1);
  p1.bank+=1;   // one presence bump between turns
  S.active=0;endTurn();
  eq(S.active,1,'the turn flipped');
  ok(UI.recap&&UI.recap.length===1,'the incoming human sees the one item');
  ok(!!S.players[0]._recap,'the outgoing seat re-baselined');
  endTurn();   // back to seat 0 with nothing new
  ok(!UI.recap,'a quiet cycle reads nothing');});
t('setup baselines every seat — a FIRST turn reads back rival-opening gains',function(){fresh(3);
  S.players.forEach(function(p){ok(!!p._recap,'baseline at setup');});});
t('the recap reads a Venture RAISED or ADVANCED between turns (the London-prize hole)',function(){fresh(2);
  var p=S.players[1];p._recap=recapSnap(p);
  var id='s1';clearSlot(id);S.buildings[id]={v:'brew',lvl:1,owner:1,die:1};   // raised in the window
  var id2='s2';clearSlot(id2);S.buildings[id2]={v:'die',lvl:1,owner:1,die:2};
  p._recap.led[id2]={d:2,lvl:1,k:'die'};S.buildings[id2].lvl=2;               // flipped in the window
  var R=recapDiff(p);var has=function(s){return R.some(function(x){return x.indexOf(s)>=0;});};
  ok(has('raised on s1'),'the new ground read back');
  ok(has('now stands on s2'),'the advance read back');});
t('the ⚜ hand diffs by CONTENTS — a draw and a spend in one window BOTH read',function(){fresh(2);
  var p=S.players[1];p.invites=['q12a'];p._recap=recapSnap(p);
  p.invites=['hulka'];   // spent q12a presenting · drew hulka by letter — net 0
  var R=recapDiff(p);var has=function(s){return R.some(function(x){return x.indexOf(s)>=0;});};
  ok(has('+1'),'the drawn card reads');
  ok(has('−1')&&has('spent presenting'),'the spend reads');});
t('a frozen baseline (stale build / older than one round) reads NOTHING',function(){fresh(2);
  var p=S.players[1];p._recap=recapSnap(p);p.bank+=3;
  p._recap.t=S.turn;S.turn+=2;   // two round boundaries — a frozen page
  ok(!recapDiff(p),'suppressed');
  delete p._recap.t;             // a pre-stamp baseline
  ok(!recapDiff(p),'suppressed too');});
t('a mid-game resume recomputes the recap from the persisted baseline (the boot path)',function(){fresh(2);
  var p1=S.players[1];p1._recap=recapSnap(p1);p1.bank+=2;
  S.active=0;endTurn();
  var shown=UI.recap.slice();
  S=JSON.parse(JSON.stringify(S));UI={sub:'move'};   // the save/boot round trip
  var R=recapDiff(cur());
  eq(R.join('|'),shown.join('|'),'the resume reads the same list');});

// ---------- 8c · the second kettle & the one brew grammar (v7.0a) ----------
t('the SECOND KETTLE: the Brewhouse alternate adds +1H to the recipe’s cost',function(){fresh(2);var p=cur();
  p.recipes=['gruit'];p.grain=3;p.hops=3;p.vessels=[null,null,null];
  UI.sub='brew';UI.brew={returnTo:'end',free:false,sur:1};
  var g0=p.grain,h0=p.hops;
  brewPick('gruit');
  // gruit's stack may be multi-verb → the search picker opens; commit through it
  if(UI.sub==='brewverb')brewVerbPick(Object.keys(pileVerbs('gruit'))[0]);
  eq(g0-p.grain,1,'the recipe’s 1G');
  eq(h0-p.hops,1,'+1H — the kettle’s surcharge');
  ok(p.vessels.some(function(c){return c&&c.style==='gruit';}),'the cask stands');});
t('the second kettle’s availability reads the +1H (a hopless house cannot fire it)',function(){fresh(2);var p=cur();
  p.recipes=['gruit'];p.grain=3;p.hops=0;p.vessels=[null,null,null];
  ok(stationActAvail(p,'B','brew'),'the free kettle brews');
  ok(!stationActAvail(p,'B','brewtop'),'the second kettle needs the hop');
  p.hops=1;ok(stationActAvail(p,'B','brewtop'),'one hop opens it');});
t('EVERY brew searches — the load-bonus and the Mash Tun offer the tile choice too',function(){fresh(2);var p=cur();
  p.recipes=['gruit'];p.grain=5;p.hops=5;p.vessels=[null,null,null];
  S.piles.gruit=['source','age','load'];   // a multi-verb stack forces the search picker
  UI.sub='brew';UI.brew={returnTo:'end',free:false,sur:0};
  brewPick('gruit');
  eq(UI.sub,'brewverb','the search picker opened (no top-tile channel anywhere)');
  brewVerbPick('age');
  var c=p.vessels.filter(function(x){return x;}).pop();
  eq(c.act,'age','the CHOSEN tile rides the cask');});
t('the HIRE channel and SPEC_FEE are retired — Bergen’s free prize is the one door',function(){
  ok(typeof enterHire==='undefined','enterHire gone');
  ok(typeof SPEC_FEE==='undefined','SPEC_FEE gone');
  ok(typeof hireable==='function','the Bergen eligibility read survives');});

// ---------- 8d · v7.0b — BUILD leaves the counter ----------
t('v7.0b: the Market ALT is Source 1 — BUILD is off the stations',function(){fresh(2);var p=cur();
  eq(STN_A.A,'source1');
  ok(stationActAvail(p,'A','source1'),'always available');
  ok(!Object.keys(STN_A).some(function(c){return STN_A[c]==='build';}),'no station seats build');
  p.placed=true;p.cell='A';UI={sub:'stops',stops:[],usedStops:[]};
  enterCell('A',true);
  eq(UI.sub,'source','the source picker opened');
  eq(UI.src.n,ALT_SOURCE,'the lesser counter');});
t('v7.0b: BUILD holds the pool seat SAIL held; the sail bonus is gone',function(){
  eq(CASK_ACT_POOL[6],'build','seat 7 of 8');
  ok(CASK_ACT_POOL.indexOf('sailb')<0,'sailb out of the pool');
  ok(!!CASK_ACT.build&&!CASK_ACT.sailb,'the text follows');
  ok(typeof sailbGo==='undefined','the sailbq flow is gone');});
t('v7.0b: the BUILD bonus opens the PRICED build flow (never the waiver)',function(){fresh(2);var p=cur();
  UI={sub:'move'};
  fireCaskAct('build','end');
  eq(UI.sub,'build','the build flow opened');
  ok(UI.build&&UI.build.free===false,'at the printed fee');
  buildSkip();
  eq(UI.sub,'end','skip routes home');
  // nothing playable → it resumes quietly
  p.hand=[];p.grain=0;p.hops=0;UI={sub:'move'};
  fireCaskAct('build','end');
  eq(UI.sub,'end','no playable build resumes');});

// ---------- 9 · the clock ----------
t('MAX_ROUND is 22 and backstops the end',function(){fresh(2);
  eq(MAX_ROUND,22);
  S.turn=22;checkTriggers();ok(S.ending,'the ceiling fires');});
t('the retired systems are GONE from the engine',function(){
  ok(typeof theCurrent==='undefined','the current');
  ok(typeof seaShips==='undefined','sea ships');
  ok(typeof chartOptions==='undefined','chart');
  ok(typeof endCargo==='undefined','end cargo');
  ok(typeof KONTORHAUS==='undefined','Kontorhaus');
  ok(typeof POST_UPGS==='undefined','establishments');
  ok(!BUILDINGS.tollhouse,'the Tollhouse');
  ok(!IMPROVEMENTS.broker&&!IMPROVEMENTS.brewmate,'the sea singles');
  ok(IMPROVEMENTS.coper&&IMPROVEMENTS.herald&&IMPROVEMENTS.chandler,'the v7 bench');});

// ---------- report ----------
var fails=0;
__T.forEach(function(x){if(x.fails.length){fails++;
  console.log('✗ '+x.name);x.fails.forEach(function(f){console.log('   - '+f);});}});
console.log((__T.length-fails)+'/'+__T.length+' PASS'+(fails?' · '+fails+' FAIL':''));
this.__VERIFY={total:__T.length,fails:fails};
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
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify' });
} catch (e) {
  console.error('RUN ERROR:', e && e.stack || e);
  process.exit(1);
}
process.exit(ctx.__VERIFY && ctx.__VERIFY.fails ? 1 : 0);
