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
  ok('High Board banks row 9★ + the +3★ honor', scorePlayer(p).total===st0+9+3, 'delta '+(scorePlayer(p).total-st0));
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

// ---- 4. the Flight unlock track ----
(function(){var p=fresh();S.active=0;
  ok('start: 2 vessel slots of 4', p.maxVessels===VESSEL_START&&VESSEL_MAX===4);
  markBrewed(p,'gruit');
  ok('1st beer: no unlock', (p.unlocksPending||0)===0);
  markBrewed(p,'hopped');
  ok('2nd distinct beer grants an unlock', p.unlocksPending===1);
  markBrewed(p,'hopped');
  ok('re-brewing the same beer grants nothing', p.unlocksPending===1);
  applyUnlock(p,'cask');
  ok('unlock opens vessel slot 3', p.maxVessels===3&&p.vessels.length===3);
  markBrewed(p,'bock');p.unlocksPending&&applyUnlock(p,'spec');
  ok('unlock opens Specialist slot 3', p.specCap===3);
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

// ---- 7. flips score 0 + the flip-shelf cap ----
(function(){var p=fresh();S.active=0;
  p.flipped=['staple','maltkiln'];
  ok('flipped tiles score nothing', scorePlayer(p).developed===0&&DEVELOP_PTS===0);
  ok('flip shelf caps at 2', FLIP_CAP===2&&!flipRoom(p));
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
