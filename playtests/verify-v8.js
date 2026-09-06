// verify-v8.js — the v8.0 "Brewer & Merchant" rule battery (KEY hanse-v80a). Seconds, always.
// Drives the CANONICAL engine: extracts play.html's <script>, appends this driver in the
// SAME lexical scope (S/UI are lets), runs in a Node vm with a stubbed DOM.
// Usage: node playtests/verify-v8.js
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
// a fresh game in PLAY phase: every seat's starter post on e1 (the queue resolved), workers off the board
function fresh(n,seg){S=freshState(n||3,['P1','P2','P3','P4'].slice(0,n||3));UI={sub:'starter'};undoStack=[];
  S.players.forEach(function(p){p.ai=null;});
  while(S.phase==='starter')starterPick(seg||'e1');
  return S;}
function clearSlot(id){S.slots[id]=null;S.buildings[id]=null;}
function clearWharf(){SLOTS.forEach(function(s){clearSlot(s.id);});}
function putShip(id,ship,dest,load,chit){S.slots[id]={type:'ship',ship:ship,dest:dest,chit:chit||null,load:load||[]};return S.slots[id];}
function mkCask(style,die,act){var st=STYLES[style];return {style:style,q:st.q,die:(die!=null?die:st.q),act:act||'source'};}
function putPost(seg,pid,face){S.sea.posts[seg][pid]=face||1;}
function putKB(k,pid,face,tile){var i=kOpenSlot(k);S.sea.kontor[k].slots[i]={tile:tile||'warehouse',pid:pid,face:face||1};}
function eleven(p){return p.supply+diceOnBoard(p);}
function loadInto(p,slot,vi){UI.load={ships:[slot],returnTo:'end',loadsLeft:1,cask:null,count:0};UI.sub='load';UI.load.cask=vi;loadOnto(slot);}
function visit(p,cell){p.placed=true;p.cell=cell;beginStops();}

// ---------- 0 · identity & setup ----------
t('KEY is hanse-v80a',function(){eq(KEY,'hanse-v80a');});
t('setup: supply 10 per seat, the starter phase in REVERSE turn order, phase starter',function(){
  S=freshState(3,['P1','P2','P3']);
  S.players.forEach(function(p){eq(p.supply,SUPPLY_DICE,'supply');eq(p.invites,START_INV,'⚜ start');eq(p.hand.slice().sort(),['A','B','C','D'],'the hand');eq(p.ktiles.slice().sort(),['guildhouse','kontorhaus','warehouse'],'the set');});
  eq(S.phase,'starter');eq(S.starterQueue,[2,1,0],'reverse order');eq(S.active,2,'the last seat first');});
t('setup: WORKS_DEAL Public Works dealt, the rest boxed, no bag; no Ship docked',function(){fresh(3);
  var works=0,ships=0;SLOTS.forEach(function(s){var b=S.buildings[s.id];if(b&&!b.p)works++;if(S.slots[s.id])ships++;});
  eq(works,WORKS_DEAL[3],'works standing');eq(ships,0,'no hull docked');
  ok(!S.worksBag&&!S.buildDeck,'no bag, no deck');
  fresh(4);works=0;SLOTS.forEach(function(s){var b=S.buildings[s.id];if(b&&!b.p)works++;});eq(works,WORKS_DEAL[4],'4p deals 4');});
t('setup: the deck is 18 with 3 wild and no Bruges hull; the display 3',function(){fresh(2);
  var all=S.shipDeck.concat(S.shipDisplay);eq(all.length,18);
  eq(all.filter(function(x){return x.dest==='wild';}).length,3,'wild');
  ok(!all.some(function(x){return x.dest==='bruges';}),'no Bruges hull');
  eq(S.shipDisplay.length,SHIP_DISPLAY);
  eq(SHIP_CAP.cog,2);eq(SHIP_CAP.hulk,3);eq(COMMISSION_COST.cog,{});eq(COMMISSION_COST.hulk,{g:1});});
t('setup: the hall die at 2, places 6 at 2p / 8 at 3p, the yard empty, the sea empty but the starters',function(){fresh(2);
  eq(S.hall.die,HALL_DIE_START);eq(S.hall.places.length,6);eq(S.yard.length,0);
  eq(Object.keys(S.sea.posts.w1).length,0);eq(Object.keys(S.sea.posts.e1).length,2,'both starters on e1');
  fresh(3);eq(S.hall.places.length,8);});
t('setup: no contract/demand/ladder/bourse/flag/venture field on S',function(){fresh(2);
  ['contractDeck','contractDisplay','demandDeck','demand','ladder','bourse','buildDeck','buildDisplay'].forEach(function(k){ok(S[k]===undefined,k+' absent');});});
t('the starter: the eleventh die stands at face 1 on W1 or E1 and never touches the supply; count 1',function(){
  S=freshState(2,['P1','P2']);UI={sub:'starter'};S.players.forEach(function(p){p.ai=null;});
  var p=cur();eq(p.id,1,'the last seat stands first');
  starterPick('w2');ok(S.phase==='starter'&&S.sea.posts.w2[1]==null,'W2 refused');
  starterPick('w1');eq(S.sea.posts.w1[1],1,'a die at 1');eq(S.players[1].supply,SUPPLY_DICE,'the supply untouched');
  eq(qualityCount(S.players[1]),1,'count 1');
  starterPick('e1');eq(S.phase,'play');eq(S.active,S.first);eq(UI.sub,'move');
  S.players.forEach(function(q){eq(eleven(q),SUPPLY_DICE+1,'eleven dice');});});
t('setup: Gruit is READY at brew and its stack is uniform (no search); the exports print six different bonuses',function(){fresh(2);
  eq(startDieFor(S.players[0],'gruit'),1);eq(STYLES.gruit.q,1);eq(STYLES.gruit.ready,0);
  eq(Object.keys(pileVerbs('gruit')),['source'],'all Gain 2 goods');
  eq(pileList('gruit').length,16-0,'16 Gruit tiles');
  S.exports.forEach(function(st){eq(Object.keys(pileVerbs(st)).length,6,st+' six different');});
  eq(Object.keys(pileVerbs('hopped')).length,8,'Hopped prints the eight');
  eq(CASK_ACT_POOL.length,8);ok(CASK_ACT_POOL.indexOf('lift')<0,'LIFT left the pool');ok(CASK_ACT_POOL.indexOf('reach')<0,'no presence placement');});

// ---------- 1 · the supply and the end ----------
t('spendDie: brew, post and Kontor build each spend one; the eleven-dice identity holds after each',function(){fresh(2);var p=cur();
  p.grain=9;p.hops=9;p.placed=true;p.cell='B';UI={sub:'stops',stops:[],usedStops:[]};
  enterBrew('end',false);brewPick('gruit');
  eq(p.supply,9,'the brew spent one');eq(eleven(p),11);
  UI.post={segs:['w1'],returnTo:'end',ctx:{pid:0},pid:0};UI.sub='post';postPick('w1');
  eq(p.supply,8,'the post spent one');eq(eleven(p),11);
  putPost('e1',0,1);UI.kb={ks:['bergen'],returnTo:'end',pid:0,k:null};UI.sub='kbuild';kbuildPick('bergen','warehouse');
  eq(p.supply,7,'the Kontor build spent one');eq(eleven(p),11);
  eq(p.ktiles.length,2,'the tile left the set');});
t('checkDiceEnd fires the moment a supply hits 0; endTurn finishes the round; MAX_ROUND 18 backstops',function(){fresh(2);var p=cur();
  p.supply=1;spendDie(p);ok(S.ending,'the empty supply ends it');eq(S.endReason,'dice');
  fresh(2);eq(MAX_ROUND,18);S.turn=18;checkTriggers();ok(S.ending,'the ceiling fires');eq(S.endReason,'ceiling');});
t('no verb at supply 0: brew · post · kbuild · the post bonus · London\\'s build',function(){fresh(2);var p=cur();p.supply=0;p.grain=9;p.hops=9;
  ok(!canBrew(p,'gruit'),'no brew');
  eq(postTargets(p,FAR).length>0,true,'targets exist');UI={sub:'move'};enterPost(FAR,'end',true,{pid:0});eq(UI.sub,'end','the post lapsed');
  putPost('e1',0,1);ok(!canKBuild(p,'bergen'),'no Kontor build');
  eq(buildMenuOptions(p,true,true).indexOf('post'),-1,'no post arm');});
t('the identity holds through a whole AI game (3p journeyman)',function(){fresh(3);S.players.forEach(function(p){p.ai={tier:'journeyman'};});
  var g=0;while(!S.over&&g++<200000)aiStep();ok(S.over,'the game ended');
  S.players.forEach(function(p){eq(eleven(p),SUPPLY_DICE+1,p.name+' eleven');ok(p.supply>=0,'never negative');});});

// ---------- 2 · the quality count ----------
t('qualityCount = posts + building dice, GLOBAL; the starter counts; the Lodesman and the Customs House read +1',function(){fresh(2);var p=S.players[0];
  eq(qualityCount(p),1,'the starter');
  putPost('w1',0,1);eq(qualityCount(p),2);
  putPost('w1',1,3);eq(qualityCount(p),2,'a rival post never counts');
  putKB('bergen',0,4,'warehouse');eq(qualityCount(p),3,'a building die counts once whatever its face');
  eq(countAt(p,null),3);p.upgrades=['lodesman'];eq(countAt(p,null),4,'the Lodesman +1');
  var id='s1';clearSlot(id);S.buildings[id]={b:'customs'};eq(countAt(p,id),5,'the Customs House +1 here');});
t('canShipQ: Hopped needs 2, Bock 5; the same read at every port and at the cart',function(){fresh(2);var p=S.players[0];
  ok(canShipQ(p,1,null),'Gruit at 1');ok(!canShipQ(p,2,null),'Hopped needs 2');
  putPost('w1',0,1);ok(canShipQ(p,2,null));ok(!canShipQ(p,5,null));
  putPost('w2',0,1);putPost('e2',0,1);putKB('london',0,1);eq(qualityCount(p),5);ok(canShipQ(p,5,null),'Bock at 5');
  eq(cartCasks(p).length,0);p.vessels[0]=mkCask('bock',5);eq(cartCasks(p).length,1,'the cart reads the count');});
t('canTake refuses a cask above the count, below Q2, Gruit, or with its lane closed',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);putShip(id,'cog','bergen');
  p.vessels[0]=mkCask('hopped',2);ok(!canTake(id,0),'count 1 cannot ship Hopped');
  putPost('w1',0,1);ok(canTake(id,0),'count 2 ships it');
  p.vessels[1]=mkCask('gruit',1);ok(!canTake(id,1),'Gruit never boards');
  var lid='s2';clearSlot(lid);putShip(lid,'cog','london');ok(!canTake(lid,0),'London closed: w2 holds no post');
  putPost('w2',1,1);ok(canTake(lid,0),'a rival post opens the lane for all');
  eq(KONTOR_MIN,2,'the minimum is Q2 everywhere');});

// ---------- 3 · the chain and the Kontor buildings ----------
t('hasChain: your OWN post on every segment; Novgorod needs E1 and E2; a rival post never counts',function(){fresh(2);var p=S.players[0];
  ok(hasChain(p,'bergen'),'e1 starter = the Bergen chain');ok(!hasChain(p,'novgorod'));
  putPost('e2',1,1);ok(!hasChain(p,'novgorod'),'a rival on e2 is not yours');
  putPost('e2',0,1);ok(hasChain(p,'novgorod'));
  ok(!hasChain(p,'london'));putPost('w1',0,1);ok(!hasChain(p,'london'));putPost('w2',0,1);ok(hasChain(p,'london'));});
t('canKBuild needs the chain, an open slot, no building of yours there, a tile and a die; two players may each hold a chain',function(){fresh(2);var p=S.players[0],q=S.players[1];
  ok(canKBuild(p,'bergen'));ok(canKBuild(q,'bergen'),'both hold e1');
  ok(!canKBuild(p,'london'),'no chain');
  putKB('bergen',0,1);ok(!canKBuild(p,'bergen'),'one per player per Kontor');ok(canKBuild(q,'bergen'),'the second slot');
  putKB('bergen',1,1);eq(kOpenSlot('bergen'),-1,'2 slots at 2p');
  fresh(4);eq(S.sea.kontor.bergen.slots.length,3,'3 slots at 4p');eq(kontorSlotsN(3),2,'2 at 3p');});
t('kbuildPick: the tile leaves the set, a die stands at 1, the count rises; the tile is used once',function(){fresh(2);var p=cur();
  UI.kb={ks:['bergen'],returnTo:'end',pid:0,k:null};UI.sub='kbuild';kbuildPick('bergen','kontorhaus');
  var b=bldgAt(p,'bergen');ok(b&&b.tile==='kontorhaus'&&b.face===1,'the building stands');
  eq(qualityCount(p),2);ok(p.ktiles.indexOf('kontorhaus')<0,'the tile used');
  putPost('e2',0,1);ok(canKBuild(p,'novgorod'));UI.kb={ks:['novgorod'],returnTo:'end',pid:0,k:null};UI.sub='kbuild';kbuildPick('novgorod','kontorhaus');
  ok(!bldgAt(p,'novgorod'),'a used tile cannot be built again');});

// ---------- 4 · the mandatory commission ----------
t('beginStops marks the Harbor commission stop must:true when it can; endTurn refuses while it stands',function(){fresh(2);var p=cur();
  visit(p,'C');var st=UI.stops.find(function(x){return x.kind==='cell'&&x.cell==='C'&&!x.alt;});
  ok(st&&st.must,'must');ok(mustStopsLeft(),'left');
  var t0=S.turn,a0=S.active;endTurn();eq(S.active,a0,'endTurn refused');
  var i=UI.stops.indexOf(st);resolveStop(i);eq(UI.sub,'commission','the picker opened');ok(UI.comm.must,'the flow carries the must');
  commSkip();eq(UI.sub,'commission','the must cannot be skipped');
  commPick(0);commPlace('s1');
  ok(S.slots.s1&&S.slots.s1.type==='ship','docked');ok(!mustStopsLeft(),'the must is spent');});
t('no must when the display is empty, when every slot holds a LOADED hull, or when no hull is affordable',function(){fresh(2);var p=cur();
  S.shipDisplay=[];visit(p,'C');ok(!UI.stops.some(function(x){return x.must;}),'empty display');
  fresh(2);p=cur();SLOTS.forEach(function(s){clearSlot(s.id);putShip(s.id,'cog','bergen',[{owner:1,style:'hopped',q:2,die:2,act:'source'}]);});
  visit(p,'C');ok(!UI.stops.some(function(x){return x.must;}),'every slot loaded');
  fresh(2);p=cur();S.shipDisplay=[{ship:'hulk',dest:'bergen'},{ship:'hulk',dest:'london'},{ship:'hulk',dest:'wild'}];p.grain=0;
  visit(p,'C');ok(!UI.stops.some(function(x){return x.must;}),'only Hulks and no grain');});
t('the AI resolves the must stop first; an EMPTY docked hull may be displaced, a loaded one never',function(){fresh(2);var p=cur();p.ai={tier:'journeyman'};
  visit(p,'C');aiStep();ok(UI.sub==='commission'||UI.sub==='post'||UI.sub==='load'||!mustStopsLeft(),'the commission went first');
  fresh(2);p=cur();var id='s1';clearSlot(id);putShip(id,'cog','bergen');
  S.shipDisplay=[{ship:'hulk',dest:'bergen'}];p.grain=5;var pool0=S.shipDeck.length+S.shipDisplay.length;
  UI.comm={returnTo:'end',idx:0,must:false};UI.stage='place';commPlace(id);
  ok(S.slots[id]&&S.slots[id].ship==='hulk','the hulk stands');eq(S.shipDeck.length+S.shipDisplay.length,pool0,'the displaced cog returned');
  fresh(2);p=cur();clearSlot(id);putShip(id,'cog','bergen',[{owner:0,style:'hopped',q:2,die:2}]);
  S.shipDisplay=[{ship:'hulk',dest:'bergen'}];p.grain=5;UI.comm={returnTo:'end',idx:0,must:false};UI.stage='place';commPlace(id);
  ok(S.slots[id].ship==='cog','the loaded cog stands');});

// ---------- 5 · the post after a commission ----------
t('after commPlace the post prompt offers ONLY the lowest unheld segment of that Ship\\'s lane; a wild hull every lane; a held lane none',function(){fresh(2);var p=cur();
  S.shipDisplay=[{ship:'cog',dest:'london'}];UI.comm={returnTo:'end',idx:0,must:false};UI.stage='place';commPlace('s1');
  eq(UI.sub,'post');eq(UI.post.segs,['w1'],'w1 first (the prefix)');postPick('w1');
  S.shipDisplay=[{ship:'cog',dest:'london'}];UI.comm={returnTo:'end',idx:0,must:false};UI.stage='place';commPlace('s2');
  eq(UI.post.segs,['w2'],'then w2');postSkip();
  S.shipDisplay=[{ship:'cog',dest:'novgorod'}];UI.comm={returnTo:'end',idx:0,must:false};UI.stage='place';commPlace('s3');
  eq(UI.post.segs,['e2'],'e1 held by the starter: e2');postPick('e2');
  S.shipDisplay=[{ship:'cog',dest:'bergen'}];UI.comm={returnTo:'end',idx:0,must:false};UI.stage='place';commPlace('s4');
  ok(UI.sub!=='post','a lane held whole offers no post');
  S.shipDisplay=[{ship:'cog',dest:'wild'}];UI.comm={returnTo:'end',idx:0,must:false};UI.stage='place';commPlace('s5');
  eq(UI.post.segs,['w2'],'a wild hull: every lane (only w2 is unheld)');postSkip();});
t('postPick spends a die at face 1, no goods; the bonus and London\\'s prize offer every lane; the maiden load opens after the post',function(){fresh(2);var p=cur();
  p.grain=3;p.hops=2;UI.post={segs:['w1'],returnTo:'end',ctx:{pid:0},pid:0};UI.sub='post';postPick('w1');
  eq(S.sea.posts.w1[0],1);eq(p.grain,3);eq(p.hops,2,'no fee');
  UI={sub:'move'};enterPost(FAR,'end',true,{pid:0});eq(UI.post.segs.slice().sort(),['e2','w2'],'every lane\\'s next segment');postSkip();
  p.vessels[0]=mkCask('hopped',2);putPost('w2',0,1);
  S.shipDisplay=[{ship:'cog',dest:'bergen'}];UI.comm={returnTo:'end',idx:0,must:false};UI.stage='place';commPlace('s1');
  eq(UI.sub,'load','the maiden load opened (the Bergen lane held whole → no post)');ok(UI.load.ships[0]==='s1','scoped to the new hull');});

// ---------- 6 · lanes, loading, wild Ships, sailing ----------
t('a lane opens once every segment holds anyone\\'s post — public',function(){fresh(2,'w1');var p=S.players[0];
  ok(!laneOpenFor(p,'london'));putPost('w2',1,1);ok(laneOpenFor(p,'london'),'a rival\\'s w2 opens London for all');
  ok(!laneOpenFor(p,'bergen'));putPost('e1',1,1);ok(laneOpenFor(p,'bergen'));ok(!laneOpenFor(p,'novgorod'));
  ok(!laneOpenFor(p,'bruges'),'Bruges is never a lane');});
t('a wild berth needs an open lane; the FIRST cask loaded names the port and sets the chit; later loads read it',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);putShip(id,'hulk','wild');putPost('w1',0,1);
  p.vessels[0]=mkCask('hopped',2);
  ok(canTake(id,0),'Bergen is open (both starters on e1)');
  loadInto(p,id,0);eq(UI.sub,'wilddest','the first load names the port');eq(UI.wild.opts,['bergen'],'only the open lane');
  wildPick('bergen');eq(S.slots[id].chit,'bergen');eq(S.slots[id].load.length,1,'then the load resolved');
  eq(shipDest(S.slots[id]),'bergen','the chit reads like a printed Kontor');
  p.vessels[1]=mkCask('hopped',2);loadInto(p,id,1);eq(S.slots[id].load.length,2,'a later load reads the chit, no prompt');});
t('a printed hull sails at once when full; the tide; every post on the lane ticks +1 (cap 6), the sailer\\'s included; the hull returns',function(){fresh(2);
  var id='s1';clearSlot(id);S.buildings[id]={b:'maltkiln'};
  putShip(id,'cog','bergen',[{owner:0,style:'hopped',q:2,die:2,act:'source'},{owner:1,style:'hopped',q:2,die:2,act:'source'}]);
  putPost('e1',0,5);putPost('e1',1,6);putPost('w1',0,1);
  var pool0=S.shipDeck.length+S.shipDisplay.length;UI={sub:'move'};
  sailShip(id,0);
  ok(!S.slots[id],'the slot cleared');ok(!S.buildings[id],'the tide took the Kiln');
  eq(S.sea.posts.e1[0],6,'ticked');eq(S.sea.posts.e1[1],6,'cap 6');eq(S.sea.posts.w1[0],1,'another lane untouched');
  eq(S.shipDeck.length+S.shipDisplay.length,pool0+1,'the hull returned');
  eq((UI.pendingLandings||[]).length,1,'the landing queued');});
t('no station verb sails unfull; the Shipmaster\\'s stop does',function(){fresh(2);var p=cur();
  ok(Object.keys(STN_A).every(function(c){return STN_A[c]!=='sailnow';})&&Object.keys(STN_P).every(function(c){return STN_P[c]!=='sailnow';}),'no station sails');
  var id='s6';clearSlot(id);putShip(id,'hulk','bergen',[{owner:0,style:'hopped',q:2,die:2,act:'source'}]);
  visit(p,'C');ok(!UI.stops.some(function(x){return x.kind==='shipmaster';}),'no Shipmaster, no stop');
  p.upgrades=['shipmaster'];visit(p,'C');ok(UI.stops.some(function(x){return x.kind==='shipmaster';}),'the Shipmaster stop');
  UI.sailn={opts:[id],returnTo:'end'};UI.sub='sailnow';sailNowPick(id);ok(!S.slots[id],'sailed unfull');});
t('the lifts cap at quality + 1: the Malt Kiln, the Bonded Store, the Lagering Cellar; 6 is the top face',function(){fresh(2);var p=cur();
  var id='s1';clearSlot(id);S.buildings[id]={b:'maltkiln'};putShip(id,'cog','bergen');
  putPost('w1',0,1);p.vessels[0]=mkCask('hopped',2);eq(boardDie(p.vessels[0],id),3,'Hopped 2 → 3');
  p.vessels[0].die=3;eq(boardDie(p.vessels[0],id),3,'cap Q+1');
  eq(liftCap(mkCask('bock',5)),6);eq(liftCap(mkCask('hopped',2)),3);
  p.vessels[1]=mkCask('bock',5);ok(liftable(p).some(function(o){return o.i===1;}),'a Ready Bock lifts to 6');
  p.vessels[1].die=6;ok(!liftable(p).some(function(o){return o.i===1;}),'never past 6');});
t('the Ropewalk offers a second load onto a DIFFERENT Ship; the Cooperage adds a berth; the Stevedore loads 2',function(){fresh(2);var p=cur();
  var a='s1',b='s2';clearSlot(a);clearSlot(b);S.buildings[a]={b:'ropewalk'};putShip(a,'hulk','bergen');putShip(b,'hulk','bergen');
  putPost('w1',0,1);p.vessels[0]=mkCask('hopped',2);p.vessels[1]=mkCask('hopped',2);
  loadInto(p,a,0);eq(UI.sub,'load','the cross-quay load opened');eq(UI.load.ships,[b],'a different Ship');
  clearSlot('s3');S.buildings.s3={b:'cooperage'};var t2=putShip('s3','cog','bergen');eq(effCap(t2),3,'2+1');
  p.upgrades=['crane'];UI={sub:'move'};enterLoad([b],'end',1);eq(UI.load.loadsLeft,2,'the Stevedore');});

// ---------- 7 · landing = two dice ----------
t('landDeliver: val = face + your building die there; no building → the face alone; the tile stays under the die',function(){fresh(2);var p=S.players[0];
  var Lg={dest:'bergen',queue:[]};UI={sub:'move'};var n0=pileList('hopped').length;
  landDeliver(p,{owner:0,style:'hopped',q:2,die:3,act:'source'},Lg);
  var d=p.delivered[p.delivered.length-1];eq(d.val,3,'face alone');eq(d.bdie,0);
  putKB('bergen',0,4,'warehouse');landDeliver(p,{owner:0,style:'hopped',q:2,die:2,act:'source'},Lg);
  d=p.delivered[p.delivered.length-1];eq(d.val,2+4,'two dice');eq(d.bdie,4);
  eq(pileList('hopped').length,n0,'no tile returned to the stack');});
t('every building die there ticks +1 on ANY landing (cap 6); the owner\\'s tile line fires: Warehouse 1G1H · Kontorhaus +1 ⚜ · Guildhouse a RAISE; the Agent +1 more on a rival\\'s landing',function(){fresh(3);var p=S.players[0],q=S.players[1],r=S.players[2];
  putKB('bergen',0,1,'warehouse');putKB('bergen',1,6,'kontorhaus');
  var Lg={dest:'bergen',queue:[]};UI={sub:'move'};var g0=p.grain,h0=p.hops,i1=q.invites;
  landDeliver(p,{owner:0,style:'hopped',q:2,die:2,act:'source'},Lg);
  eq(bldgDie(p,'bergen'),2,'own landing ticks');eq(bldgDie(q,'bergen'),6,'cap 6');
  eq(p.grain,g0+1);eq(p.hops,h0+1,'the Warehouse line');eq(p.invites,INV_PER_LANDING,'1 ⚜');eq(q.invites,i1,'a rival landing pays no ⚜ to q');
  landDeliver(q,{owner:1,style:'hopped',q:2,die:2,act:'source'},Lg);eq(q.invites,i1+INV_PER_LANDING+1,'the Kontorhaus +1 more');
  fresh(3);p=S.players[0];q=S.players[1];putKB('bergen',0,1,'guildhouse');q.upgrades=[];p.upgrades=['agent'];Lg={dest:'bergen',queue:[]};UI={sub:'move'};
  landDeliver(q,{owner:1,style:'hopped',q:2,die:2,act:'source'},Lg);eq(bldgDie(p,'bergen'),3,'the Agent: +1 more');
  landDeliver(p,{owner:0,style:'hopped',q:2,die:2,act:'source'},Lg);ok((UI.pendingRaise||[]).some(function(x){return x.pid===0;}),'the Guildhouse queues a RAISE');});
t('no premium, no market, no demand, no ★ arm: the retired symbols are undefined',function(){
  ['PRIZE_PTS','prizeStars','tracked','bourseShift','LADDERS','ladderAdvance','CONTRACTS7','DEMANDS7','claimContract','landPresent','landCanPresent','FLAG_FEE','flagOut','VENTURES','ledgerTick','vAt','enterVact','addPresence','presenceAt','trayDice','spendPresDisc','enterReach','commitBldg','hallOn','olEnabled','gateNeed','laneGate'].forEach(function(k){
    ok(typeof (function(){try{return eval(k);}catch(e){return undefined;}})()==='undefined',k+' is gone');});
  ok(DEST.novgorod.vbonus===undefined,'no premium');});
t('afterSail: casks land in boarding order; the prizes queue; a human head pauses; the AI resolves inline',function(){fresh(2);
  S.players.forEach(function(q){q.ai={tier:'journeyman'};});
  var id='s1';clearSlot(id);putShip(id,'cog','bergen',[{owner:0,style:'hopped',q:2,die:2,act:'source'},{owner:1,style:'hopped',q:2,die:2,act:'source'}]);
  UI={sub:'move'};sailShip(id,0);afterSail('end');
  eq(S.players[0].delivered.length,1,'seat 0 landed');eq(S.players[1].delivered.length,1,'seat 1 landed');
  eq(UI.sub,'end','the pipeline drained');
  fresh(2);S.players[1].ai=null;clearSlot(id);putShip(id,'cog','bergen',[{owner:1,style:'hopped',q:2,die:2,act:'source'}]);
  UI={sub:'move'};sailShip(id,0);afterSail('end');eq(UI.sub,'bspec','a human head: Bergen\\'s seat');ok(humanGate(),'the AI pauses');eq(actorSeat(),1,'the head names its owner');});

// ---------- 8 · Bruges: the cart, the yard, the hall ----------
t('the cart offers the yard always and the hall only with an ⚜, Q2+ and an open place; Gruit never presents',function(){fresh(2);var p=cur();
  p.vessels[0]=mkCask('gruit',1);p.vessels[1]=mkCask('hopped',2);putPost('w1',0,1);
  eq(cartCasks(p).length,2);ok(!canHall(p,p.vessels[0]),'Gruit never');ok(!canHall(p,p.vessels[1]),'no ⚜');
  p.invites=1;ok(canHall(p,p.vessels[1]));ok(!canHall(p,p.vessels[0]),'still not Gruit');
  S.hall.places=S.hall.places.map(function(){return {pid:1,style:'hopped',q:2,face:2};});ok(!canHall(p,p.vessels[1]),'the hall full → the yard');});
t('the yard: the die parks on the next place, tile under it; the zone prize BEST (recipe fee waived or 2 goods) · GOOD (at its fee or 1) · OK (1); the bonus fires',function(){fresh(2);var p=cur();
  p.vessels[0]=mkCask('gruit',1,'source');UI={sub:'move'};UI.cart={returnTo:'end',n:1,count:0,vi:0};UI.sub='cart';
  cartPickCask(0);eq(UI.sub,'yardprize','the zone prize prompt');eq(S.yard.length,1);eq(p.delivered[0].yard,1);eq(p.delivered[0].val,0,'no ★');
  var b=UI.pendingYard[0];eq(b.zone,'best');
  var r0=p.recipes.length;yardPick('recipe',S.exports[0]);eq(p.recipes.length,r0+1,'a recipe');eq(p.hops,2,'the fee waived');
  eq(UI.sub,'source','then the tile\\'s Gain 2 goods fires');eq(UI.src.n,2);srcTake(2,0);eq(p.grain,5);
  eq(yardZone(0),'best');eq(yardZone(2),'good');eq(yardZone(4),'ok','2p zones 2/2');
  fresh(3);eq(yardZone(2),'best');eq(yardZone(5),'good');eq(yardZone(6),'ok','3p zones 3/3');
  p=cur();p.vessels[0]=mkCask('hopped',2);putPost('w1',0,1);S.yard=[{},{},{},{},{},{}];
  UI.cart={returnTo:'end',n:1,count:0,vi:0};UI.sub='cart';cartPickCask(0);eq(UI.pendingYard[0].zone,'ok');
  var g0=p.grain;yardPick('goods');eq(UI.sub,'source');eq(UI.src.n,1,'OK pays 1 good');
  p.upgrades=['carter'];eq(yardGoodsN(p,'ok'),2,'the Carter +1');});
t('the hall: 1 ⚜ spent, cask die + the hall die, the die parks, the place\\'s goods, then the hall die climbs (cap 6); no recipe; the Bruges pair by hall places',function(){fresh(2);var p=cur();
  p.invites=1;p.vessels[0]=mkCask('hopped',3);putPost('w1',0,1);
  UI={sub:'move'};UI.cart={returnTo:'end',n:1,count:0,vi:0};UI.sub='cart';cartPickCask(0);eq(UI.sub,'cartdoor');
  cartDoor('hall');
  eq(p.invites,0,'the ⚜ spent');var d=p.delivered[0];eq(d.hall,1);eq(d.val,3+HALL_DIE_START,'die + the hall die');
  eq(S.hall.die,HALL_DIE_START+1,'the hall die climbed');eq(S.hall.places[0].pid,0,'parked on place 1');
  ok(UI.sub==='source'&&UI.src&&UI.src.n===HALL_PRIZES[0],'the place\\'s goods (the source prompt)');srcTake(HALL_PRIZES[0],0);
  ok(!(UI.pendingYard||[]).length,'no recipe');
  eq(parkedAt(p,'bruges'),1,'Bruges weighs hall places');eq(fieldAt(p,'bruges'),0);
  S.hall.die=6;p.invites=1;p.vessels[1]=mkCask('hopped',2);UI.cart={returnTo:'end',n:1,count:0,vi:1};UI.sub='cart';cartPickCask(1);cartDoor('hall');eq(S.hall.die,6,'cap 6');
  var a=majorityAwards('bruges');eq(a[0],DEST.bruges.pair[0],'the Bruges pair');});
t('the yard carries no majority weight; the Kaufhaus and the Carter cart 2; no ⚜ from Bruges',function(){fresh(2);var p=cur();
  S.yard.push({pid:0,style:'gruit',q:1,face:1});p.delivered.push({style:'gruit',q:1,dest:'bruges',val:0,face:1,yard:1});
  eq(parkedAt(p,'bruges'),0);eq(majorityAwards('bruges')[0],undefined,'no share from the yard');
  eq(cartN(p),1);p.upgrades=['carter'];eq(cartN(p),2);clearSlot('s1');S.buildings.s1={p:'A',tier:2,owner:0};eq(cartN(p),3);
  eq(p.invites,0,'no ⚜ from the yard');});

// ---------- 9 · invitations ----------
t('1 ⚜ per cask landed at a far Kontor; a count with no cap; none from Bruges',function(){fresh(2);var p=S.players[0];
  var Lg={dest:'london',queue:[]};UI={sub:'move'};
  for(var i=0;i<9;i++)landDeliver(p,{owner:0,style:'hopped',q:2,die:2,act:'source'},Lg);
  eq(p.invites,9*INV_PER_LANDING,'no cap');eq(typeof p.invites,'number','a count');});

// ---------- 10 · the prizes ----------
t('Bergen: a free seat from the display or nothing; the specialist bonus is a second door; never two of a kind',function(){fresh(2);var p=S.players[0];
  UI={sub:'move'};UI.pendingSpec=[{pid:0,dest:'bergen'}];var k=S.impDisplay[0];UI.sub='bspec';UI.goodsRt='end';bspecPick(k);
  eq(p.upgrades,[k]);ok(S.impDisplay.indexOf(k)<0,'left the display');
  ok(!hireable(p).some(function(x){return x===k;}),'never two of a kind');
  UI={sub:'move'};enterSpecGain('end');eq(UI.sub,'specgain');specGainPick(hireable(p)[0]);eq(p.upgrades.length,2);
  ok(!specRoom(p),'two seats');});
t('London: any build, the fee waived, the die still spent — a post, a Kontor building, a wharf tile or FLIP',function(){fresh(2);var p=S.players[0];p.grain=0;p.hops=0;
  var opts=buildMenuOptions(p,true,true);ok(opts.indexOf('post')>=0&&opts.indexOf('kbuild')>=0&&opts.indexOf('priv')>=0,'all three arms');
  UI={sub:'move'};UI.afterRt='end';enterBuildMenu('benefitcont',true,0,true);eq(UI.sub,'buildmenu');
  bmPick('priv');eq(UI.sub,'pbuild');pbuildPick('place','A');eq(UI.sub,'placepriv');placePrivOn('s1');
  ok(privAt('s1')&&privAt('s1').p==='A','built for free');eq(p.grain,0);eq(p.supply,SUPPLY_DICE,'no die for a wharf tile');
  UI={sub:'move'};UI.afterRt='end';enterBuildMenu('benefitcont',true,0,true);bmPick('post');eq(UI.sub,'post');postPick(UI.post.segs[0]);eq(p.supply,SUPPLY_DICE-1,'the die still spent');});
t('Novgorod: a RAISE — one die of yours at sea +1 (cap 6); the prompt spans posts and building dice',function(){fresh(2);var p=S.players[0];
  putKB('bergen',0,6,'warehouse');
  var ts=raiseTargets(p);eq(ts.length,1,'the starter post only (the building is at 6)');
  UI={sub:'move'};UI.afterRt='end';enterRaise('benefitcont',{pid:0});eq(UI.sub,'raise');raisePick(0);eq(S.sea.posts.e1[0],2,'raised');
  UI={sub:'move'};UI.pendingRaise=[{pid:0,why:'Novgorod\\'s prize'}];afterSail('end');eq(UI.sub,'raise','the prize opens the same prompt');});
t('the recipe bonus grants at its printed fee: Broyhan 1H · Keut 1G · Mumme 1G1H · Bock 1G2H; the Scriptorium waives',function(){fresh(2);var p=cur();
  eq(RECIPE_FEE.broyhan,{h:1});eq(RECIPE_FEE.keut,{g:1});eq(RECIPE_FEE.mumme,{g:1,h:1});eq(RECIPE_FEE.bock,{g:1,h:2});
  var st=S.exports[0];var f=recipeFeeFor(p,st);p.grain=9;p.hops=9;
  UI={sub:'move'};enterRecipeGain('end',false);recipeGainPick(st);ok(p.recipes.indexOf(st)>=0);eq(9-p.grain,f.g||0);eq(9-p.hops,f.h||0,'the fee paid');
  clearSlot('s2');S.buildings.s2={p:'B',tier:1,owner:0};eq(recipeFeeFor(p,S.exports[1]),{},'the Scriptorium waives');});

// ---------- 11 · the private ladder ----------
t('a tier 1 builds only on a slot flanking its station (1G1H; over a Work +1G, the Work boxed; never over a rival); the hand tile leaves',function(){fresh(2);var p=cur();p.grain=5;p.hops=5;
  var o=pbuildOptions(p,false).find(function(x){return x.k==='place'&&x.station==='D';});
  ok(o&&o.slots.every(function(s){return FLANKS.D.indexOf(s)>=0;}),'the Cellar\\'s flanks only');
  clearSlot('s4');S.buildings.s4={b:'maltkiln'};clearSlot('s5');
  eq(privFee('s5',false),T1_FEE);eq(privFee('s4',false),{g:2,h:1},'over a Work +1G');
  UI.pb={returnTo:'end',free:false,pid:0,station:'D'};UI.sub='placepriv';placePrivOn('s4');
  var b=privAt('s4');ok(b&&b.p==='D'&&b.tier===1&&b.owner===0,'the Cold Store stands');eq(p.grain,3);eq(p.hops,4,'2G1H paid');
  ok(p.hand.indexOf('D')<0,'the hand tile left');ok(!bKeyAt('s4'),'the Work boxed');
  var q=S.players[1];q.grain=5;q.hops=5;eq(privSlots(q,'D'),['s5'],'a rival\\'s tile is not ground');});
t('tier 2 is the FLIP of your own tier 1 (2G1H), in place; one private building per player per station; no die',function(){fresh(2);var p=cur();p.grain=5;p.hops=5;
  clearSlot('s1');S.buildings.s1={p:'A',tier:1,owner:0};p.hand=['B','C','D'];
  ok(!pbuildOptions(p,false).some(function(x){return x.k==='place'&&x.station==='A';}),'one per station');
  UI.pb={returnTo:'end',free:false,pid:0,station:null};UI.sub='pbuild';pbuildPick('flip','A');
  eq(privAt('s1').tier,2,'flipped');eq(p.grain,3);eq(p.hops,4,'2G1H');eq(p.supply,SUPPLY_DICE,'no die');
  ok(!pbuildOptions(p,true).some(function(x){return x.k==='flip'&&x.station==='A';}),'no second flip');});
t('the private stop fires for its OWNER only: Granary 1G1H · Cold Store Age +2 · Counting House RAISE · Shipping Office RAISE + POST; the Guildhall brews twice and grants every recipe; the Scriptorium is passive',function(){fresh(2);var p=cur(),q=S.players[1];
  clearSlot('s1');S.buildings.s1={p:'A',tier:1,owner:0};
  visit(p,'A');ok(UI.stops.some(function(x){return x.kind==='pact'&&x.slot==='s1';}),'the owner\\'s stop');
  S.active=1;visit(q,'A');ok(!UI.stops.some(function(x){return x.kind==='pact';}),'a rival sees no stop');S.active=0;
  var g0=p.grain;UI={sub:'stops',stops:[],usedStops:[]};enterPact('s1','end');eq(p.grain,g0+1,'the Granary');
  clearSlot('s4');S.buildings.s4={p:'D',tier:1,owner:0};p.vessels[0]=mkCask('mumme',1);enterPact('s4','end');eq(UI.sub,'age');eq(UI.age.pool,2,'Age +2');ageSkip();
  clearSlot('s6');S.buildings.s6={p:'C',tier:2,owner:0};enterPact('s6','end');eq(UI.sub,'raise','the Shipping Office raises');raisePick(0);eq(UI.sub,'post','then posts once more');postSkip();
  clearSlot('s2');S.buildings.s2={p:'B',tier:2,owner:0};visit(p,'B');eq(UI.stops.filter(function(x){return x.kind==='cell'&&x.cell==='B'&&!x.alt;}).length,2,'the Guildhall\\'s second brew');
  ok(S.exports.every(function(st){return hasRecipe(p,st);}),'every dealt recipe');eq(recipeGainable(p).length,0,'nothing to gain');
  S.buildings.s2={p:'B',tier:1,owner:0};ok(!pactKind(privAt('s2')),'the Scriptorium is passive');});
t('the private tiles score their printed ★ (2 / 4) while they stand; the tide never takes them',function(){fresh(2);var p=S.players[0];
  clearSlot('s1');S.buildings.s1={p:'A',tier:1,owner:0};clearSlot('s2');S.buildings.s2={p:'B',tier:2,owner:0};
  eq(wharfPts(p),6);eq(scorePlayer(p).wharf,6);
  putShip('s1','cog','bergen',[{owner:0,style:'hopped',q:2,die:2,act:'source'},{owner:0,style:'hopped',q:2,die:2,act:'source'}]);UI={sub:'move'};sailShip('s1',0);
  ok(privAt('s1'),'the tile stands after the sail');});

// ---------- 12 · the end and the score ----------
t('gameOver: a die aboard a docked Ship scores its pips only — no landing, no ⚜, no Flight; vessels score nothing',function(){fresh(2);var p=S.players[0];
  clearSlot('s1');putShip('s1','hulk','bergen',[{owner:0,style:'hopped',q:2,die:3,act:'source'}]);
  p.vessels[0]=mkCask('bock',5);
  var sc=scorePlayer(p);eq(sc.docked,3,'the docked die');eq(p.delivered.length,0,'never landed');eq(p.invites,0,'no ⚜');
  eq(flightBeers(p),0,'the Flight does not count it');
  p.vessels[0]=null;eq(scorePlayer(p).total,sc.total,'the vessel was worth nothing');});
t('every post and building die scores its pips; the majorities pay the printed pairs by parked dice, the presence gate, ties split',function(){fresh(2);var p=S.players[0],q=S.players[1];
  putPost('w1',0,4);putKB('bergen',0,5,'warehouse');eq(scorePlayer(p).sea,1+4+5,'the starter + the post + the building');
  p.delivered.push({style:'hopped',q:2,dest:'london',val:2,face:2,bdie:0});p.delivered.push({style:'hopped',q:2,dest:'london',val:2,face:2,bdie:0});
  q.delivered.push({style:'hopped',q:2,dest:'london',val:2,face:2,bdie:0});
  var a=majorityAwards('london');eq(a[0],5);eq(a[1],2,'two places at 2p');
  q.delivered.push({style:'hopped',q:2,dest:'london',val:2,face:2,bdie:0});a=majorityAwards('london');eq(a[0],3);eq(a[1],3,'ties split');
  eq(majorityAwards('bergen')[0],undefined,'no dice, no share');});
t('the Flight counts distinct beers LANDED (field, yard, hall): 3/6/10; the buckets sum; the tiebreak is the count, then goods',function(){fresh(2);var p=S.players[0];
  p.delivered.push({style:'gruit',q:1,dest:'bruges',val:0,face:1,yard:1});p.delivered.push({style:'hopped',q:2,dest:'bruges',val:4,face:2,hall:1});p.delivered.push({style:S.exports[0],q:3,dest:'london',val:3,face:3,bdie:0});
  eq(flightBeers(p),3);eq(flightScore(p),3);eq(FLIGHT_PTS[4],6);eq(FLIGHT_PTS[5],10);
  var sc=scorePlayer(p);eq(sc.total,sc.deliv+sc.hall+sc.bank+sc.maj+sc.flight+sc.guild+sc.sea+sc.docked+sc.wharf,'the buckets');
  var q=S.players[1];q.delivered=p.delivered.slice();putPost('w1',0,1);var fr=finalRows();eq(fr.rows[0].p.id,0,'the count breaks the tie');});
t('the Chronicler +1★ per cask landed; the Guildmaster +2★ per present; the Alderman +2★ per Kontor with 3+ parked (Bruges by hall places)',function(){fresh(2);var p=S.players[0];
  p.upgrades=['chronicler','gmaster'];var Lg={dest:'bergen',queue:[]};UI={sub:'move'};
  landDeliver(p,{owner:0,style:'hopped',q:2,die:2,act:'source'},Lg);eq(p.bankL,CHRON_PTS);
  p.invites=1;p.vessels[0]=mkCask('hopped',2);putPost('w1',0,1);hallPresent(p,0);eq(p.bankH,GMASTER_PTS);eq(p.bankL,2*CHRON_PTS,'the hall is a landing too');
  p.upgrades=['alderman'];for(var i=0;i<3;i++)S.hall.places[i]={pid:0,style:'hopped',q:2,face:2};eq(scorePlayer(p).guild,2,'Bruges by hall places');});

// ---------- 13 · Gruit, aging, no kettle ----------
t('Gruit: 1G, Ready at brew, the top tile (Gain 2 goods) without a search, never boards, the cart is its road',function(){fresh(2);var p=cur();p.grain=3;
  UI={sub:'move'};UI.brew={returnTo:'end',free:false};UI.sub='brew';brewPick('gruit');
  eq(UI.sub,'end','no search picker');var c=p.vessels.filter(function(x){return x;})[0];eq(c.style,'gruit');eq(c.die,1);ok(caskReady(c));eq(c.act,'source');eq(p.grain,2);
  clearSlot('s1');putShip('s1','cog','bergen');ok(!canTake('s1',p.vessels.indexOf(c)),'never boards');ok(cartCasks(p).length===1,'carts');});
t('no automatic aging: a round passes with no die turning; the Braumeister\\'s drip turns one',function(){fresh(2);var p=S.players[0];
  p.vessels[0]=mkCask('mumme',1);S.active=1;endTurn();eq(p.vessels[0].die,1,'nothing turned');
  p.upgrades=['braumeister'];S.active=1;endTurn();eq(p.vessels[0].die,2,'the Braumeister');});
t('brew needs only a recipe, the goods, a vessel and a die — no kettle, no licence, no second kettle',function(){fresh(2);var p=cur();
  var top=S.exports.slice().sort(function(a,b){return STYLES[b].q-STYLES[a].q;})[0];p.recipes=['gruit','hopped',top];p.grain=9;p.hops=9;ok(canBrew(p,top),'the top export brews with no building');
  eq(STN_A.B,'pbuild','the Brewhouse alternate is BUILD');ok(typeof brewCostAt==='undefined','no surcharge');
  eq(STN_A.A,'loadany');eq(STN_A.D,'cart');eq(STN_A.C,'kbuild');});

// ---------- 14 · the AI never stalls ----------
t('every UI.sub in the roster has an aiStep case; a 2-seat trader game and a 4-seat game run to S.over',function(){
  var src=aiStep.toString();
  ['starter','move','stops','source','brew','brewverb','age','vlift','load','wilddest','commission','post','kbuild','raise','cart','cartdoor','yardprize','pbuild','placepriv','buildmenu','recipegain','specgain','bspec','sailnow','end'].forEach(function(k){
    ok(src.indexOf("case '"+k+"'")>=0,'aiStep handles '+k);});
  fresh(2);S.players.forEach(function(p){p.ai={tier:'trader',persona:'merchant'};});var g=0;while(!S.over&&g++<200000)aiStep();ok(S.over,'2p ended');
  fresh(4);S.players.forEach(function(p,i){p.ai={tier:'journeyman'};});g=0;while(!S.over&&g++<250000)aiStep();ok(S.over,'4p ended');});
t('the human-gate heads name their owner: yardprize · bspec · buildmenu · post · kbuild · raise · pbuild',function(){fresh(2);
  S.players[0].ai={tier:'journeyman'};S.players[1].ai=null;
  UI={sub:'yardprize',pendingYard:[{pid:1,zone:'best'}]};ok(humanGate());eq(actorSeat(),1);
  UI={sub:'post',post:{segs:['w1'],returnTo:'end',ctx:{pid:1},pid:1}};ok(humanGate());eq(actorSeat(),1);
  UI={sub:'raise',raise:{targets:[],returnTo:'end',ctx:{},pid:1}};eq(actorSeat(),1);
  UI={sub:'pbuild',pb:{returnTo:'end',free:true,pid:1}};eq(actorSeat(),1);
  UI={sub:'move'};eq(actorSeat(),0,'otherwise the active seat');ok(!humanGate());});

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
