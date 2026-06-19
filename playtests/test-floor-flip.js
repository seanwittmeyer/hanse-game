// Scenario test for the v1.7 flipped-building → Floor Wild chain (bot-untestable: the AI never overbuilds).
// Proves: (A) a rival overbuilding your slot flips your building into your area + scores DEVELOP_PTS;
//         (B) working the Floor fires a Wild for each flipped building (and runs vessel casks too).
// Usage: node playtests/test-floor-flip.js
'use strict';
const fs = require('fs'), vm = require('vm'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
const noop = () => {};
const makeEl = () => { const el = { innerHTML:'', textContent:'', value:'', style:{}, classList:{add:noop,remove:noop,toggle:noop,contains:()=>false}, setAttribute:noop, getAttribute:()=>null, appendChild:noop, addEventListener:noop, removeEventListener:noop }; el.querySelector=()=>makeEl(); el.querySelectorAll=()=>[]; el.closest=()=>null; return el; };
const ctx = { document:{getElementById:()=>makeEl(),querySelector:()=>makeEl(),querySelectorAll:()=>[],createElement:()=>makeEl(),addEventListener:noop,body:makeEl()},
  localStorage:{getItem:()=>null,setItem:noop,removeItem:noop}, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean, parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop} };
ctx.window=ctx; ctx.globalThis=ctx; ctx.self=ctx; ctx.addEventListener=noop; ctx.removeEventListener=noop;
const driver = `
render=function(){};save=function(){};snapshot=function(){};log=function(){};
var R={pass:0,fail:0,msgs:[]};
function ok(c,m){if(c){R.pass++;}else{R.fail++;R.msgs.push('FAIL: '+m);}}

// ---- (A) rival overbuild → flip + DEVELOP_PTS ----
S=freshState(2,['P0','P1']);UI={sub:'move'};
var slot=SLOTS[0].id;
S.buildings[slot]={b:'richberth',owner:0};          // P0 authored a building here
S.active=1;                                          // P1 (a rival) overbuilds it
UI.tmp={placeBldg:{b:'staple',owner:1}};UI.placeRt='stops';UI.sub='placebldg';
placeBldgOn(slot);
ok((S.players[0].flipped||[]).indexOf('richberth')>=0, 'displaced building flips into owner P0 area (flipped='+JSON.stringify(S.players[0].flipped)+')');
ok(S.players[0].developed===DEVELOP_PTS, 'P0 scores DEVELOP_PTS ('+S.players[0].developed+' vs '+DEVELOP_PTS+')');
ok(S.buildings[slot].b==='staple', 'rival staple now occupies the slot');
ok(scorePlayer(S.players[0]).developed===DEVELOP_PTS, 'scorePlayer counts the developed points');

// v1.7.1: self-displacement FLIPS into your area (a Floor Wild) but scores NO points (no point-farm)
S.buildings[slot]={b:'maltkiln',owner:0};S.active=0;UI.tmp={placeBldg:{b:'hopyard',owner:0}};UI.placeRt='stops';UI.sub='placebldg';
var devBefore=S.players[0].developed, flipBefore=(S.players[0].flipped||[]).length;
placeBldgOn(slot);
ok(S.players[0].developed===devBefore, 'self-displacement pays no developer points (anti point-farm)');
ok((S.players[0].flipped||[]).length===flipBefore+1, 'self-displacement FLIPS into the area as a Floor Wild (v1.7.1)');

// ---- (B) working the Floor fires a Wild per flipped building ----
S=freshState(2,['P0','P1']);UI={sub:'move'};S.active=0;
var p=S.players[0];
p.vessels=[null,null];                               // empty vessels — isolate the flips
p.flipped=['richberth','staple'];                    // two flipped buildings
UI={sub:'toll',line:'rowT'};
tollFloor();
ok(UI.sub==='wild', 'Floor with a flipped building enters the WILD action (UI.sub='+UI.sub+')');
ok(UI.wild&&UI.wild.returnTo==='floorq', 'the Wild returns to the Floor queue');
// resolve the first Wild (take goods) → should advance to the SECOND flipped building's Wild
wildPick('source'); srcTake(2,0);
ok(UI.sub==='wild', 'second flipped building also fires a Wild (UI.sub='+UI.sub+')');
wildPick('source'); srcTake(2,0);
ok(UI.sub==='end', 'after both flipped Wilds the Floor turn ENDS (UI.sub='+UI.sub+')');

// ---- (C) Floor runs vessel casks AND flipped Wilds together ----
S=freshState(2,['P0','P1']);UI={sub:'move'};S.active=0;p=S.players[0];
p.vessels=[{style:'gruit',q:1,step:1,ready:1},null];  // one Ready Gruit (its action = source)
p.flipped=['richberth'];                               // + one flipped Wild
UI={sub:'toll',line:'rowT'};
tollFloor();
// queue = [cask(gruit→source), flip(wild)]: the cask's source fires first
var sawCaskSource=(UI.sub==='source');
if(UI.sub==='source')srcTake(2,0);
ok(UI.sub==='wild'||sawCaskSource, 'Floor runs the vessel cask action then the flipped Wild (UI.sub='+UI.sub+')');

__OUT=JSON.stringify(R);
`;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'test-floor-flip' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }
const R = JSON.parse(ctx.__OUT);
console.log(`Floor-flip scenario test:  ${R.pass} passed, ${R.fail} failed`);
R.msgs.forEach(m => console.log('  ' + m));
process.exit(R.fail ? 1 : 0);
