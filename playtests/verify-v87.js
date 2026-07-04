// Targeted unit checks for the v2.3 "Privileges & Works" pass (KEY v87) — the delivery-arithmetic
// keystone: value = a PRIVILEGE (owner-only die), transform = a WORK (serves any dock), wharfage/rival-½
// retired, ship-slot value buildings folded into the ONE die (hard max 6 on the sum), Festkeller = the
// Hulk specialist, Almoner = the catch-up privilege. Also re-runs the load-bearing v86 checks (Floor,
// toll, overbuild, commission/charter effQ, Cooperage sail, human-gate, refine, Flight).
// Usage: node playtests/verify-v87.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= VERIFY v87 (appended; render/log/save noop'd) =================
render=function(){};log=function(){};save=function(){};snapshot=function(){};
function ok(name,cond){if(!cond)throw new Error('FAIL: '+name);console.log('ok — '+name);}

// (a) FLOOR = the standing 3rd line (v86 regression)
S=freshState(2,['H','A']);UI={sub:'move'};undoStack=[];
S.players[0].placed=true;S.players[0].cell='A';S.active=0;
S.players[0].vessels=[{style:'gruit',q:1,step:1,ready:1},{style:'hopped',q:2,step:0,ready:1}];
S.players[0].flipped=['staple'];
chooseLine('floor');
ok('Floor line builds 3 stops (2 casks + 1 flipped Wild)', UI.sub==='stops'&&UI.line==='floor'&&UI.stops.length===3);
resolveStop(0);srcTake(2,0);
ok('Floor cask fires and STAYS; the line continues', UI.sub==='stops'&&UI.stops.length===2&&!!S.players[0].vessels[0]);

// (b) toll applies to PUBLIC lines only (v86 regression)
S=freshState(2,['H','A']);UI={sub:'move'};S.turn=2;S.active=0;
S.players.forEach(p=>{p.placed=true;p.cell='A';});
S.players[0].grain=3;
chooseLine('floor');
ok('Floor while sharing a station pays NO toll', S.players[0].grain===3);
UI={sub:'line'};S.players[0].cell='A';
chooseLine('row');
ok('public line while sharing pays the 1G toll', S.players[0].grain===2);

// (c) OVERBUILD one rule (v86 regression): +3 banked immediately, self = rival; discard when full
S=freshState(2,['H','A']);UI={sub:'move'};S.active=0;
S.buildings['s1']={b:'staple',owner:1};
commitBldg('s1','maltkiln',0);
ok('rival overbuild: owner banks +3 immediately + flip', S.players[1].developed===3&&(S.players[1].flipped||[]).includes('staple'));
commitBldg('s1','cooperage',0);
ok('SELF overbuild also banks +3', S.players[0].developed===3);

// (d) PRIVILEGE — your cask on YOUR value building: die = printed + premium, capped at the d6 max 6
S=freshState(2,['H','A']);S.active=0;
S.buildings['s1']={b:'connoiss',owner:0};
S.slots['s1']={type:'cask',owner:0,style:'bock',q:5,act:'wild'};
const L1=captureLoad('s1');
ok('own privilege banks the die (Connoisseur 4 + Q5 premium 3 → capped 6)', loadBonus(L1,'bruges')===6);
S.players[0].delivered=[];deliverCask(S.players[0],L1,'bruges',null,true);
ok('delivery = starting value + die (Bruges 1 + 6 = 7)', S.players[0].delivered[0].val===7);

// (e) PRIVILEGE — a RIVAL's cask on your value building banks NOTHING, and NOBODY is paid
S=freshState(2,['H','A']);S.active=1;
S.buildings['s1']={b:'staple',owner:0};                             // P0's Staple Hall
S.slots['s1']={type:'cask',owner:1,style:'hopped',q:2,act:'age'};   // P1's cask docked on it
const L2=captureLoad('s1');
ok('a rival dock shows NO die', loadBonus(L2,'bruges')===0&&caskPreviewBonus('s1')===0);
S.players[1].delivered=[];deliverCask(S.players[1],L2,'bruges',null,true);
ok('rival delivery = starting value only (no share, no halving)', S.players[1].delivered[0].val===1);
ok('wharfage is gone — no payment to the building owner', S.players[0].wharfage===undefined&&scorePlayer(S.players[0]).wharf===0);

// (f) WORK — a transform serves ANY dock: a rival's cask on your Malt Kiln still ships +1 quality
S=freshState(2,['H','A']);S.active=1;
S.buildings['s2']={b:'maltkiln',owner:0};
S.slots['s2']={type:'cask',owner:1,style:'hopped',q:2,act:'age'};
ok('a rival cask on a Malt Kiln (a work) ships at effective Q3', caskEffQ('s2')===3);

// (g) SHIP-SLOT FOLD — a Rich Berth bumps only its OWNER's casks' dice at the sail
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.buildings['s3']={b:'richberth',owner:0};
S.slots['s3']={type:'ship',ship:'cog',dest:'bruges',load:[
  {owner:0,style:'gruit',q:1,bld:null},{owner:1,style:'gruit',q:1,bld:null}]};
S.players.forEach(p=>p.delivered=[]);
sailShip('s3',0);
ok('Rich Berth: the owner\\'s cask die +2 (Bruges 1+2=3)', S.players[0].delivered[0].val===3);
ok('Rich Berth: the rival\\'s cask gets NO bump (Bruges 1)', S.players[1].delivered[0].val===1);

// (h) THE ONE DIE CAP — cask building + premium + ship bump SUM to a d6 max of 6
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.buildings['s4']={b:'richberth',owner:0};
S.players[0].delivered=[];
const Lb={owner:0,style:'bock',q:5,bld:{b:'staple',owner:0},vintage:0};   // staple 3 + premium 3 = 6, + berth 2 → capped 6
S.slots['s4']={type:'ship',ship:'cog',dest:'bruges',load:[Lb,{owner:0,style:'gruit',q:1,bld:null}]};
sailShip('s4',0);
ok('the die caps the SUM at 6 (staple 3 + prem 3 + berth 2 → 6; Bruges 1+6=7)', S.players[0].delivered[0].val===7);

// (i) FESTKELLER — the Hulk specialist: +3 on a Hulk, nothing on a Cog
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.buildings['s5']={b:'festkeller',owner:0};S.players[0].delivered=[];
S.slots['s5']={type:'ship',ship:'hulk',dest:'bruges',load:[
  {owner:0,style:'gruit',q:1,bld:null},{owner:0,style:'gruit',q:1,bld:null},{owner:0,style:'gruit',q:1,bld:null}]};
sailShip('s5',0);
ok('Festkeller on a HULK: each of the owner\\'s casks +3 (Bruges 1+3=4)', S.players[0].delivered.every(d=>d.val===4));
S.buildings['s6']={b:'festkeller',owner:0};S.players[0].delivered=[];
S.slots['s6']={type:'ship',ship:'cog',dest:'bruges',load:[
  {owner:0,style:'gruit',q:1,bld:null},{owner:0,style:'gruit',q:1,bld:null}]};
sailShip('s6',0);
ok('Festkeller on a COG: no bump', S.players[0].delivered.every(d=>d.val===1));

// (j) ALMONER — the catch-up privilege: +3 where you do NOT lead, 0 where you lead
S=freshState(2,['H','A']);S.active=0;
S.players[0].delivered=[{style:'gruit',q:1,dest:'bruges',val:1}];   // P0 leads Bruges (only presence)
const bdA={b:'almoner',owner:0};
ok('Almoner pays where you do NOT lead', caskBldgValue(bdA,'london',2,0)===3);
ok('Almoner pays NOTHING where you lead', caskBldgValue(bdA,'bruges',2,0)===0);

// (k) SALT HOUSE — a goods privilege: pays only its owner's casks (no die ever)
EXPANSION=true;S=freshState(2,['H','A']);EXPANSION=false;S.active=0;
S.players[0].grain=0;S.players[0].hops=0;S.players[1].grain=0;S.players[1].hops=0;
deliverCask(S.players[0],{owner:0,style:'gruit',q:1,bld:{b:'salthouse',owner:0},vintage:0},'bruges',null,false);
ok('Salt House pays goods to its owner\\'s cask', S.players[0].grain===1&&S.players[0].hops===1);
deliverCask(S.players[1],{owner:1,style:'gruit',q:1,bld:{b:'salthouse',owner:0},vintage:0},'bruges',null,false);
ok('Salt House pays NOTHING on a rival\\'s cask', S.players[1].grain===0&&S.players[1].hops===0);

// (l) commission pool = DEPLOYED only + effective quality (v86 regression)
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.slots['s1']={type:'ship',ship:'cog',dest:'novgorod',load:[]};
S.players[0].vessels=[{style:'bock',q:5,step:3,ready:3},null];
S.slots['s2']={type:'cask',owner:0,style:'hopped',q:2,act:'age'};
S.buildings['s2']={b:'maltkiln',owner:0};
const el=commEligible(S.players[0],'s1');
ok('commission pool excludes vessels + uses effQ (kilned Q2 boards a Q3 hull)', el.length===1&&el[0].ref==='s2'&&el[0].q===3);

// (m) charter uses effective quality for vessel casks (v86 regression)
EXPANSION=true;S=freshState(2,['H','A']);S.active=0;EXPANSION=false;
S.players[0].vessels=[{style:'duckstein',q:2,step:2,ready:2},null];
const ccs=charterCasks(S.players[0]);
ok('charterCasks lists the vessel cask at effective quality', ccs.length>=1&&ccs[0].ref==='v:0'&&ccs[0].q===3);

// (n) Cooperage capacity-shrink sail (v86 regression)
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.buildings['s3']={b:'cooperage',owner:1};
S.slots['s3']={type:'ship',ship:'cog',dest:'bruges',load:[{owner:0,style:'gruit',q:1,bld:null},{owner:0,style:'gruit',q:1,bld:null}]};
const sailedBefore=S.sailed;
const sailed=commitBldg('s3','staple',0);
ok('Cooperage displaced under a part-loaded hull → the ship sails at its new cap', sailed===true&&S.sailed===sailedBefore+1&&S.slots['s3']===null);

// (o) the HUMAN-GATE (v86 regression): an AI's sail delivers a HUMAN's cask → the owner picks
S=freshState(2,['H','A']);S.active=1;UI={sub:'stops',stops:[],pendingBenefits:[]};
S.players[1].ai={tier:'journeyman',persona:null};
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.slots['s4']={type:'ship',ship:'cog',dest:'london',load:[{owner:0,style:'hopped',q:2,bld:null}]};
S.slots['s5']={type:'cask',owner:1,style:'hopped',q:2,act:'age'};
UI.load={ships:['s4'],casks:['s5'],free:true,returnTo:'stops',loadsLeft:1,cask:'s5',src:'harbor'};UI.sub='load';
loadOnto('s4');
ok('human-owned London benefit opens the owner picker mid-AI-turn', UI.sub==='benefit'&&UI.pendingBenefits[0].pid===0);
ok('humanGate() reports the pause', humanGate()===true);
const pick=S.buildDisplay[0];
benefitPick(pick);placeBldgOn('s6');
ok('the Building lands, owned by the human; the gate releases', bAt('s6')&&bAt('s6').owner===0&&humanGate()===false);

// (p) Novgorod refine is the OWNER'S choice (v86 regression)
S=freshState(2,['H','A']);S.active=1;UI={sub:'stops',stops:[],pendingBenefits:[]};
S.players[1].ai={tier:'journeyman',persona:null};
S.players[0].vessels=[{style:'gruit',q:1,step:0,ready:1},{style:'bock',q:5,step:0,ready:3}];
UI.pendingRefine=[{pid:0,dest:'novgorod'}];
afterSail('stops');
ok('refine with 2 candidates opens the owner picker', UI.sub==='brefine');
brefinePick(1);
ok('the owner\\'s chosen cask aged +1', S.players[0].vessels[1].step===1);

// (q) Jopenbier counts for the Flight; FLIGHT_PTS[6]=25 (v86 regression)
JOPEN=true;S=freshState(2,['H','A']);JOPEN=false;
S.players[0].delivered=['gruit','hopped'].concat(S.exports).concat(['jopenbier']).map(st=>({style:st,q:STYLES[st].q,dest:'bruges',val:1}));
ok('six distinct beers score 25', flightScore(S.players[0])===25);

console.log('ALL v87 VERIFY CHECKS PASS');
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
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;

vm.createContext(ctx);
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify-v87' });
} catch (e) {
  console.error('VERIFY v87 FAIL:', e && e.stack || e);
  process.exit(1);
}
