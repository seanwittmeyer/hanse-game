// Targeted unit checks for the v2.2 "One Grammar" pass — the rules the bulk harnesses don't
// naturally exercise: the human-gate (an AI's sail handing a HUMAN owner a benefit choice),
// overbuild banking (+3 immediately, self = rival, discard when full), the d6 cap, the
// commission free-load pool (deployed only), effective-quality charters, the Floor as the
// standing 3rd line, and the Cooperage capacity-shrink sail. Usage: node playtests/verify-v86.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
//================= VERIFY v86 (appended; render/log/save noop'd) =================
render=function(){};log=function(){};save=function(){};snapshot=function(){};
function ok(name,cond){if(!cond)throw new Error('FAIL: '+name);console.log('ok — '+name);}

// (a) FLOOR = the standing 3rd line: chooseLine('floor') builds fcask/fwild stops
S=freshState(2,['H','A']);UI={sub:'move'};undoStack=[];
S.players[0].placed=true;S.players[0].cell='A';S.active=0;
S.players[0].vessels=[{style:'gruit',q:1,step:1,ready:1},{style:'hopped',q:2,step:0,ready:1}];
S.players[0].flipped=['staple'];
chooseLine('floor');
ok('Floor line builds 3 stops (2 casks + 1 flipped Wild)', UI.sub==='stops'&&UI.line==='floor'&&UI.stops.length===3
   &&UI.stops.filter(s=>s.kind==='fcask').length===2&&UI.stops.filter(s=>s.kind==='fwild').length===1);
resolveStop(0);   // gruit's Source
ok('Floor cask fires its action and STAYS in the vessel', UI.sub==='source'&&!!S.players[0].vessels[0]);
srcTake(2,0);
ok('Floor returns to its remaining stops', UI.sub==='stops'&&UI.stops.length===2);

// (b) toll applies to PUBLIC lines only, never the Floor
S=freshState(2,['H','A']);UI={sub:'move'};S.turn=2;S.active=0;
S.players.forEach(p=>{p.placed=true;p.cell='A';});
S.players[0].grain=3;
chooseLine('floor');
ok('Floor while sharing a station pays NO toll', S.players[0].grain===3);
UI={sub:'line'};S.players[0].cell='A';
chooseLine('row');
ok('public line while sharing pays the 1G toll', S.players[0].grain===2);

// (c) OVERBUILD one rule: +3 banked immediately, self = rival; discard when the floor is full
S=freshState(2,['H','A']);UI={sub:'move'};S.active=0;
S.buildings['s1']={b:'staple',owner:1};
commitBldg('s1','maltkiln',0);
ok('rival overbuild: owner banks +3 immediately', S.players[1].developed===3);
ok('rival overbuild: tile flips to the owner\\'s floor', (S.players[1].flipped||[]).includes('staple'));
commitBldg('s1','cooperage',0);
ok('SELF overbuild also banks +3', S.players[0].developed===3);
S.players[0].upgrades=['granary','hopgarden','cellar'];S.players[0].flipped=['staple'];   // area 4/4
commitBldg('s1','customs',1);
ok('floor full: the +3 still banks, the tile is discarded', S.players[0].developed===6&&S.players[0].flipped.length===1);

// (d) demand die: a real d6 — building bonus + premium capped at 6
S=freshState(2,['H','A']);S.active=0;
S.buildings['s1']={b:'connoiss',owner:0};
S.slots['s1']={type:'cask',owner:0,style:'bock',q:5,act:'wild'};
const L=captureLoad('s1');
ok('captureLoad freezes the dock building', L.bld&&L.bld.b==='connoiss');
const banked=bldgValueShare(L.bld,L.owner,caskBldgValue(L.bld,'bruges',L.q,L.owner));
ok('Connoisseur 4 + Q5 premium 3 caps at the d6 max 6', banked===6);
ok('loadBonus display agrees with the cap', loadBonus(L,'bruges')===6);

// (e) commission free-load = DEPLOYED casks only, effective quality
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.slots['s1']={type:'ship',ship:'cog',dest:'novgorod',load:[]};
S.players[0].vessels=[{style:'bock',q:5,step:3,ready:3},null];      // Ready Q5 in a vessel — must NOT be eligible
S.slots['s2']={type:'cask',owner:0,style:'hopped',q:2,act:'age'};   // deployed Q2 on a Malt Kiln → effQ3 → eligible for Novgorod
S.buildings['s2']={b:'maltkiln',owner:0};
const el=commEligible(S.players[0],'s1');
ok('commission pool excludes vessels', el.every(o=>o.ref[0]!=='v'));
ok('commission pool uses EFFECTIVE quality (kilned Q2 boards a Q3 hull)', el.length===1&&el[0].ref==='s2'&&el[0].q===3);

// (f) charter uses effective quality for vessel casks too (Duckstein Q2 → effQ3 reaches Novgorod)
EXPANSION=true;
S=freshState(2,['H','A']);S.active=0;EXPANSION=false;
S.players[0].vessels=[{style:'duckstein',q:2,step:2,ready:2},null];
ok('caskEffQ counts Duckstein from a vessel', caskEffQ('v:0')===3);
const ccs=charterCasks(S.players[0]);
ok('charterCasks lists the vessel cask at effective quality', ccs.length>=1&&ccs[0].ref==='v:0'&&ccs[0].q===3);

// (g) Cooperage capacity-shrink: overbuilding it under a full-loaded hull SAILS the ship (was a strand)
S=freshState(2,['H','A']);S.active=0;
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.buildings['s3']={b:'cooperage',owner:1};
S.slots['s3']={type:'ship',ship:'cog',dest:'bruges',load:[{owner:0,style:'gruit',q:1,bld:null},{owner:0,style:'gruit',q:1,bld:null}]};   // 2/3 under Cooperage
const sailedBefore=S.sailed;
const sailed=commitBldg('s3','staple',0);   // displace the Cooperage → cap back to 2 → the hull is full → sails
ok('Cooperage displaced under a part-loaded hull → the ship sails at its new cap', sailed===true&&S.sailed===sailedBefore+1&&S.slots['s3']===null);

// (h) the HUMAN-GATE: an AI's sail delivers a HUMAN's cask → the owner's picker opens and the AI loop pauses
S=freshState(2,['H','A']);S.active=1;UI={sub:'stops',stops:[],pendingBenefits:[]};
S.players[1].ai={tier:'journeyman',persona:null};
SLOTS.forEach(sl=>{S.slots[sl.id]=null;S.buildings[sl.id]=null;});
S.slots['s4']={type:'ship',ship:'cog',dest:'london',load:[{owner:0,style:'hopped',q:2,bld:null}]};   // the human's cask aboard, 1/2
S.slots['s5']={type:'cask',owner:1,style:'hopped',q:2,act:'age'};                                    // the AI's cask to top off with
UI.load={ships:['s4'],casks:['s5'],free:true,returnTo:'stops',loadsLeft:1,cask:'s5',src:'harbor'};UI.sub='load';
loadOnto('s4');   // fills 2/2 → sails → both benefits: the AI auto-resolves, the human's LONDON choice opens
ok('human-owned London benefit opens the owner picker mid-AI-turn', UI.sub==='benefit'&&UI.pendingBenefits[0].pid===0);
ok('humanGate() reports the pause', humanGate()===true);
const pick=S.buildDisplay[0];
benefitPick(pick);
ok('the human places the earned Building NOW (no hand)', UI.sub==='placebldg'&&UI.tmp.placeBldg.b===pick&&UI.tmp.placeBldg.owner===0);
placeBldgOn('s6');
ok('the Building lands, owned by the human', bAt('s6')&&bAt('s6').owner===0&&bAt('s6').b===pick);
ok('the gate releases after the pick', humanGate()===false);

// (i) Novgorod refine is the OWNER'S choice when they have >1 maturing casks
S=freshState(2,['H','A']);S.active=1;UI={sub:'stops',stops:[],pendingBenefits:[]};
S.players[1].ai={tier:'journeyman',persona:null};
S.players[0].vessels=[{style:'gruit',q:1,step:0,ready:1},{style:'bock',q:5,step:0,ready:3}];
UI.pendingRefine=[{pid:0,dest:'novgorod'}];
afterSail('stops');
ok('refine with 2 candidates opens the owner picker', UI.sub==='brefine');
brefinePick(1);
ok('the owner\\'s chosen cask aged +1', S.players[0].vessels[1].step===1);

// (j) Jopenbier counts for the Flight; FLIGHT_PTS[6]=25
JOPEN=true;S=freshState(2,['H','A']);JOPEN=false;
ok('six flight types with the capstone on', flightTypes().length===6);
S.players[0].delivered=[{style:'gruit',q:1,dest:'bruges',val:1},{style:'hopped',q:2,dest:'london',val:1},
  {style:'broyhan',q:3,dest:'novgorod',val:2},{style:'keut',q:3,dest:'bruges',val:1},
  {style:'mumme',q:4,dest:'bergen',val:1},{style:'jopenbier',q:6,dest:'bruges',val:8}].filter(d=>S.exports.includes(d.style)||['gruit','hopped','jopenbier'].includes(d.style));
// build a guaranteed 6-distinct set from what this deal offers:
S.players[0].delivered=['gruit','hopped'].concat(S.exports).concat(['jopenbier']).map(st=>({style:st,q:STYLES[st].q,dest:'bruges',val:1}));
ok('six distinct beers score 25 (not zero)', flightScore(S.players[0])===25);

console.log('ALL v86 VERIFY CHECKS PASS');
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
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify-v86' });
} catch (e) {
  console.error('VERIFY v86 FAIL:', e && e.stack || e);
  process.exit(1);
}
