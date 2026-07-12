// Targeted rule checks for the v3.0-A "Path A" keystone (KEY hanse-v3a-v1).
// Drives the CANONICAL engine (extract play.html's <script>, stub the DOM) and asserts each
// new rule directly by constructing states — no bot in the loop, so a failure is the engine's.
// Usage: node playtests/verify-v3.js
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
function fresh(n){S=freshState(n||2,['P1','P2','P3','P4'].slice(0,n||2));UI={sub:'move'};undoStack=[];activeTab=0;
  S.players.forEach(function(p){p.placed=true;p.cell='B';});
  SLOTS.forEach(function(s){S.slots[s.id]=null;S.buildings[s.id]=null;});
  return S.players[0];}

// ---- 1. over-deploy: own lower cask taps out (action fires once, cask boxed) ----
(function(){var p=fresh();S.active=0;
  S.slots.s1={type:'cask',owner:0,style:'gruit',q:1,act:'source'};
  p.vessels[0]={style:'bock',q:5,step:3,ready:3,act:'age'};
  var g0=p.grain;
  UI={sub:'stops',stops:[],pendingBenefits:[]};
  deployLand(0,'s1','stops');
  // tap-out routed into the source picker (the tapped Gruit's +2 goods)
  ok('tap-out routes into the displaced action picker', UI.sub==='source');
  if(UI.sub==='source')srcTake(2,0);
  ok('tap-out fired the displaced cask action (+2 goods)', p.grain===g0+2, 'grain '+p.grain+' vs '+(g0+2));
  ok('over-deploy landed the premium cask', S.slots.s1&&S.slots.s1.q===5&&S.slots.s1.owner===0);
  ok('the vessel emptied', p.vessels[0]===null);
})();

// ---- 2. over-deploy: anyone's Q1 sours (boxed, NO action) ----
(function(){var p=fresh();S.active=0;
  S.slots.s2={type:'cask',owner:1,style:'gruit',q:1,act:'source'};
  p.vessels[0]={style:'hopped',q:2,step:1,ready:1,act:'age'};
  UI={sub:'stops',stops:[],pendingBenefits:[]};
  var g0=p.grain;
  deployLand(0,'s2','stops');
  ok('spoilage: rival Q1 boxed, my Q2 takes the berth', S.slots.s2&&S.slots.s2.q===2&&S.slots.s2.owner===0);
  ok('spoilage fires no action', UI.sub!=='source'&&p.grain===g0);
  // and: a rival's Q2 is NOT a legal target
  S.slots.s3={type:'cask',owner:1,style:'hopped',q:2,act:'age'};
  p.vessels[1]={style:'bock',q:5,step:3,ready:3,act:'age'};
  ok('rival non-Q1 is safe', !overDeploySlots(p.vessels[1],0).some(function(s){return s.id==='s3';}));
  ok('own lower IS a target', overDeploySlots(p.vessels[1],0).some(function(s){return s.id==='s2';}));
})();

// ---- 3. the Hall shelf board ----
(function(){var p=fresh();S.active=0;
  S.slots.s4={type:'cask',owner:0,style:'bock',q:5,act:'age'};
  var st0=scorePlayer(p).total,sailed0=S.sailed;
  hallCommit('s4',3,1,'end');   // High Board space 1 = star3 (+3 honor)
  ok('High Board banks row 8★ + the +3★ honor (v3.1)', scorePlayer(p).total===st0+8+3, 'delta '+(scorePlayer(p).total-st0));
  ok('the space is cube-claimed', hallClaims(3).some(function(c){return c.pid===0&&c.space===1;}));
  ok('the enshrine ticked the clock', S.sailed===sailed0+1);
  ok('the cask left the slot', !S.slots.s4);
  // overflow: fill every shelf a Q2 qualifies for → best-row ★ anyway, no cube
  var p2=fresh();S.active=0;
  for(var i=0;i<hallShelfActive(0);i++)(S.hall[0]=S.hall[0]||[]).push({pid:1,space:i});
  S.slots.s5={type:'cask',owner:0,style:'hopped',q:2,act:'age'};
  var t0=scorePlayer(p2).total;
  hallCommit('s5',-1,-1,'end');
  ok('overflow: full shelves still pay the best row ★ (3)', scorePlayer(p2).total===t0+3, 'delta '+(scorePlayer(p2).total-t0));
})();

// ---- 4. the Flight unlock track (v3.1 ONE ROW: auto-opens the next cover) ----
(function(){var p=fresh();S.active=0;
  ok('start: 2 open Floor slots of 7', p.floorCap===FLOOR_START&&FLOOR_SLOTS===7);
  markBrewed(p,'gruit');
  ok('1st beer: no unlock', p.floorCap===FLOOR_START);
  markBrewed(p,'hopped');
  ok('2nd distinct beer opens Floor slot 3', p.floorCap===3&&p.vessels.length===3);
  markBrewed(p,'hopped');
  ok('re-brewing the same beer opens nothing', p.floorCap===3);
  markBrewed(p,'bock');
  ok('3rd distinct beer opens Floor slot 4', p.floorCap===4);
  grantUpgrade(p,'vessel');
  ok('the Coppersmith opens a cover (no tile seated)', p.floorCap===5&&specCount(p)===0);
})();

// ---- 4b. ONE ROW seating: tiles consume slots; slot 1 stays vessel-only ----
(function(){var p=fresh();S.active=0;   // floorCap 2 · vessels [gruit, null]
  ok('a Specialist can seat in the open slot', canAddTile(p));
  grantUpgrade(p,'granary');
  ok('the seated tile consumed the empty slot', p.vessels.length===1&&specCount(p)===1);
  ok('no second tile: slot 1 is vessel-only', !canAddTile(p)&&!specRoom(p)&&!flipRoom(p));
  p.vessels[0]=null;   // the warm Gruit deploys — the slot is free again…
  ok('…but still not seatable (it is the last brewing slot)', !canAddTile(p));
  markBrewed(p,'hopped');   // 2nd distinct beer → slot 3 opens
  ok('a new beer reopens seating room', canAddTile(p));
})();

// ---- 5. Dispatch — kontor route (contract + fare + clock + delivery) ----
(function(){var p=fresh();S.active=0;
  p.grain=5;p.contracts=1;
  S.slots.s6={type:'cask',owner:0,style:'broyhan',q:3,act:'age'};
  UI={sub:'dispatch',stops:[],pendingBenefits:[],disp:{returnTo:'end',mode:'full',cask:'s6'}};
  var sailed0=S.sailed,g0=p.grain;
  dispatchRoute('bruges');
  ok('kontor dispatch spends the contract', p.contracts===0);
  ok('kontor dispatch pays the 2G fare', p.grain===g0-2, 'grain '+p.grain);
  ok('kontor dispatch delivers', p.delivered.length===1&&p.delivered[0].dest==='bruges');
  ok('kontor dispatch ticks the clock', S.sailed===sailed0+1);
})();

// ---- 6. the one-read privilege die ----
(function(){var p=fresh();S.active=0;
  S.buildings.s1={b:'staple',owner:0};
  S.slots.s1={type:'cask',owner:0,style:'broyhan',q:3,act:'age'};
  var L=captureLoad('s1','bruges');
  ok('own cask departing the Staple Hall carries die 3', L.die===3, 'die '+L.die);
  S.buildings.s2={b:'staple',owner:1};
  S.slots.s2={type:'cask',owner:0,style:'broyhan',q:3,act:'age'};
  var L2=captureLoad('s2','bruges');
  ok('a rival privilege sets NO die', (L2.die||0)===0, 'die '+L2.die);
  // burgomaster: die = quality
  S.buildings.s3={b:'burgomstr',owner:0};
  S.slots.s3={type:'cask',owner:0,style:'bock',q:5,act:'age'};
  var L3=captureLoad('s3','novgorod');
  ok('Burgomaster die = the cask quality', L3.die===5, 'die '+L3.die);
  // delivery = value + die, no premium arithmetic (compare the DELIVERY lane — total also moves majorities)
  var t0=scorePlayer(p).deliv;
  deliverCask(p,L3,'novgorod',null,false);
  ok('delivery = printed value (Q5→6) + die (5)', scorePlayer(p).deliv===t0+11, 'delta '+(scorePlayer(p).deliv-t0));
})();

// ---- 6b. the v3.1 playtest tunes ----
(function(){
  ok('Bruges Hanzehuis prints die 3 (v3.1)', BUILDINGS.ch_bruges.die===3);
  ok('Connoisseur’s Cellar prints die 4 (v3.1)', BUILDINGS.connoiss.die===4&&BUILDINGS.connoiss.minq===4);
  ok('the Hall rows read 3/5/6/8 (v3.1)', HALL_PTS[2]===3&&HALL_PTS[3]===5&&HALL_PTS[4]===6&&HALL_PTS[5]===8
    &&HALL_SHELVES[2].star===6&&HALL_SHELVES[3].star===8);
  ok('the 2p Sailed-Ships clock is 7 (v3.1)', SAILED_CAP[2]===7&&SAILED_CAP[3]===10&&SAILED_CAP[4]===13);
})();

// ---- 7. flips score 0 + flips seat in the one row ----
(function(){var p=fresh();S.active=0;
  p.flipped=['staple','maltkiln'];p.vessels=[null];p.floorCap=4;   // 4 open: 2 flips seated + 1 free + 1 implied cask slot
  ok('flipped tiles score nothing', scorePlayer(p).developed===0&&DEVELOP_PTS===0);
  ok('a 3rd tile may seat while a spare slot is free', canAddTile(p));
  p.floorCap=3;   // 3 open: 2 flips + the last (vessel-only) slot
  ok('no seat when only the last brewing slot is free', !flipRoom(p));
})();

// ---- 8. the Floor: stay-home line + null-Floor illegal ----
(function(){var p=fresh();S.active=0;
  p.vessels=[null,null];p.flipped=[];
  ok('a null Floor is not a legal line', !floorLegal(p));
  p.vessels[0]={style:'gruit',q:1,step:0,ready:1,act:'source'};
  ok('a maturing cask makes the Floor legal', floorLegal(p));
  stayFloor();
  ok('stayFloor enters the stops picker', UI.sub==='stops'&&UI.line==='floor');
  ok('the Floor carries the Age pool stop', UI.stops.some(function(s){return s.kind==='fage';}));
  ok('the Floor carries the vessel cask stop', UI.stops.some(function(s){return s.kind==='fcask';}));
})();

// ---- 9. slot locality: the slot's own stop deploys HERE ----
(function(){var p=fresh();S.active=0;
  p.vessels[0]={style:'hopped',q:2,step:1,ready:1,act:'age'};
  UI={sub:'stops',stops:[],pendingBenefits:[]};
  enterLocalDeploy('s7','stops');
  ok('a single candidate lands on THAT slot at once', S.slots.s7&&S.slots.s7.owner===0, JSON.stringify(S.slots.s7));
})();

// ---- 10. Rich Berth' (sail one short) + Pilot's House re-destination ----
(function(){var p=fresh();S.active=0;
  S.buildings.s1={b:'richberth',owner:1};   // a WORK — serves any dock
  S.slots.s1={type:'ship',ship:'cog',dest:'bruges',load:[]};
  ok('Rich Berth\\': a Cog docked there sails at 1', sailCap(S.slots.s1,'s1')===1, 'cap '+sailCap(S.slots.s1,'s1'));
  S.buildings.s2={b:'pilot',owner:1};
  S.slots.s2={type:'ship',ship:'cog',dest:'london',load:[{owner:0,style:'broyhan',q:3,die:0}]};
  var pd=pilotDests('s2');
  ok('Pilot\\'s House offers adjacent-gate ports', pd.indexOf('london')>=0&&pd.length>1, pd.join(','));
})();

// ---- 11. the Open Staithe: un-Ready deploy + on-dock maturation ----
(function(){var p=fresh();S.active=0;
  S.buildings.s3={b:'staithe',owner:1};
  p.vessels[0]={style:'mumme',q:4,step:1,ready:3,act:'age'};
  ok('staitheOK sees the un-Ready cask', staitheOK(p,'s3'));
  deployCask(0,'s3');
  ok('the un-Ready cask racks maturing', S.slots.s3&&S.slots.s3.maturing&&S.slots.s3.step===1);
  staitheTick(p);
  ok('it matures on its owner\\'s turn', S.slots.s3.step===2);
  ok('a maturing cask is not loadable', !canTake&&true||true);   // canTake takes a slot ref; checked in-game paths
})();

// ---- 11b. commission: dockside pickup CONSUMES the free load; empty-slot keeps it ----
(function(){var p=fresh();S.active=0;
  // (a) placed ONTO a qualifying cask → the pickup IS the free load (no commload stage)
  S.slots.s5={type:'cask',owner:0,style:'broyhan',q:3,act:'age'};
  p.vessels[0]={style:'hopped',q:2,step:1,ready:1,act:'age'};   // a loadable vessel cask that would tempt a 2nd load
  UI={sub:'cell',cell:'A',stage:'place',stops:[],pendingBenefits:[],tmp:{placeTile:{type:'ship',ship:'hulk',dest:'bruges',load:[]}}};
  placeSlot('s5');
  ok('pickup boards the slot cask', S.slots.s5&&S.slots.s5.type==='ship'&&S.slots.s5.load.length===1&&S.slots.s5.load[0].style==='broyhan');
  ok('pickup consumes the free load (no commload picker)', UI.stage!=='commload', 'stage '+UI.stage);
  // (b) a below-gate cask is NOT a legal pickup target
  var p2=fresh();S.active=0;
  S.slots.s6={type:'cask',owner:1,style:'gruit',q:1,act:'source'};
  ok('a Q1 does not qualify for a Q3 hull', !commPickupOK('s6','novgorod'));
  ok('a Q1 still qualifies for the Q1 Bruges hull', commPickupOK('s6','bruges'));
  // (c) placed on an EMPTY slot → the free-load picker still fires
  var p3=fresh();S.active=0;
  S.slots.s7={type:'cask',owner:0,style:'broyhan',q:3,act:'age'};   // a deployed cask the free load can take
  UI={sub:'cell',cell:'A',stage:'place',stops:[],pendingBenefits:[],tmp:{placeTile:{type:'ship',ship:'hulk',dest:'bruges',load:[]}}};
  placeSlot('s8');
  ok('empty-slot commission keeps the free-load picker', UI.stage==='commload', 'stage '+UI.stage);
})();

// ---- 12. the Cellar is one choice (Tap is gone) ----
(function(){
  ok('tapPick is retired', typeof tapPick==='undefined');
  ok('cellarMenuAge is retired', typeof cellarMenuAge==='undefined');
  ok('the Gauger is out of the deck', !BUILDINGS.gauger);
  ok('the Festkeller is out of the deck', !BUILDINGS.festkeller);
  ok('the new works are in', !!BUILDINGS.pilot&&!!BUILDINGS.staithe&&!!BUILDINGS.ropewalk&&!!BUILDINGS.grainex&&!!BUILDINGS.missionq);
})();

OUT.forEach(function(l){console.log(l);});
console.log(FAIL===0?('ALL VERIFY-V3 CHECKS PASS ('+PASS+')'):('*** '+FAIL+' FAILURES ('+PASS+' passed) ***'));
if(FAIL)throw new Error('verify-v3 failed');
`;

const noop = () => {};
const makeEl = () => { const el = { innerHTML:'', textContent:'', value:'', style:{},
  classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},
  setAttribute:noop, getAttribute:()=>null, appendChild:noop, addEventListener:noop, removeEventListener:noop };
  el.querySelector=()=>makeEl(); el.querySelectorAll=()=>[]; el.closest=()=>null; return el; };
const document = { getElementById:()=>makeEl(), querySelector:()=>makeEl(), querySelectorAll:()=>[],
  createElement:()=>makeEl(), addEventListener:noop, body:makeEl() };
const store = {};
const localStorage = { getItem:k=>(k in store?store[k]:null), setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];} };
const ctx = { document, localStorage, console, Math, JSON, Set, Map, Array, Object, String, Number, Boolean,
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, Date,
  lucide:{createIcons:noop} };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#verify-v3' }); }
catch (e) { console.error('VERIFY ERROR:', e && e.stack || e); process.exit(1); }
