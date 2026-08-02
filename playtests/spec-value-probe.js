// Specialist value probe (v4.6d) — "how valuable is each specialist throughout the game?"
// Designer-called 2026-08-02. Two instruments, the probe-imps-v87 lineage:
//   PROBE — free-grant causality: seat P0 with one design (arm `start`: before turn 1;
//           arm `mid`: first open seat from turn 6 on) and read P0's win-rate lift vs a
//           no-grant CONTROL cohort. Gates are waived by the grant (noted caveat); one copy
//           is spliced from the deck for supply parity. The grant occupies 1 of 2 seats, so
//           the lift is NET of the crowded-out organic seat — the honest number.
//   OBS   — observational corpus: seats/game, average seat turn, win% when held vs not.
// All cohorts 3p trader (the canonical middle count; greedy tiers = a floor for combo tiles).
// Usage: GRANTS=cellar,scholar [ARMS=start,mid] [N=400] node playtests/spec-value-probe.js
//        CONTROL=800 node playtests/spec-value-probe.js
//        OBS=1500 node playtests/spec-value-probe.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const GRANTS = (process.env.GRANTS || '').split(',').filter(Boolean);
const ARMS = (process.env.ARMS || 'start,mid').split(',').filter(Boolean);
const N = parseInt(process.env.N || '400', 10);
const CONTROL = parseInt(process.env.CONTROL || '0', 10);
const OBS = parseInt(process.env.OBS || '0', 10);
const MID_TURN = parseInt(process.env.MID_TURN || '6', 10);

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
let engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// PREBUFF=1 — revert the v4.6d Stevedore to slot-only (A/B the buff itself; fail loud on drift)
if (process.env.PREBUFF === '1') {
  const A = "loadsLeft=Math.max(loadsLeft||1,hasUpgrade(p,'crane')?2:1);";
  const B = "if(stop.kind==='load'){enterLoad([stop.slot],'stops',1);return;}";
  if (!engine.includes(A) || !engine.includes(B)) { console.error('PREBUFF ANCHORS NOT FOUND'); process.exit(1); }
  engine = engine.replace(A, 'loadsLeft=loadsLeft||1;')
                 .replace(B, "if(stop.kind==='load'){enterLoad([stop.slot],'stops',(hasUpgrade(cur(),'crane')?2:1));return;}");
}

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
var __OUT=[];
var GRANT=null,ARM=null,OBSREC=null;
var __grant=grantUpgrade;
grantUpgrade=function(p,key){var had=p.upgrades.length;__grant(p,key);
  if(OBSREC&&p.upgrades.length>had&&!aiSimulating)OBSREC.push({pid:p.id,key:key,turn:S.turn});};
var __end=endTurn;
endTurn=function(){__end();
  if(GRANT&&ARM==='mid'&&S&&!S.over&&S.turn>=__MID){var p0=S.players[0];
    if(!p0.upgrades.includes(GRANT)&&specRoom(p0))__grant(p0,GRANT);}};
function spliceCopy(key){var i=S.impDeck.indexOf(key);if(i>=0){S.impDeck.splice(i,1);return;}
  i=S.impDisplay.indexOf(key);if(i>=0){S.impDisplay.splice(i,1);refillImpDisplay();}}
function runGame(){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  OBSREC=__OBS?[]:null;
  S=freshState(3,[]);UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p){p.ai={tier:'trader',persona:null};});
  if(GRANT){spliceCopy(GRANT);
    if(ARM==='start')__grant(S.players[0],GRANT);}
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)throw new Error('runaway '+UI.sub);}
  var rows=S.players.map(function(p){return {total:scorePlayer(p).total,ups:p.upgrades.slice()};});
  var win=0;rows.forEach(function(r,i){if(r.total>rows[win].total)win=i;});
  return {rounds:S.turn,rows:rows,win:win,obs:OBSREC,
    granted:GRANT?S.players[0].upgrades.includes(GRANT):false};
}
if(__CONTROL){
  var w=0,tot=0,rds=0,errs=0,ok=0;
  for(var g=0;g<__CONTROL;g++){GRANT=null;ARM=null;
    var r;try{r=runGame();}catch(e){errs++;continue;}
    ok++;if(r.win===0)w++;tot+=r.rows[0].total;rds+=r.rounds;}
  __OUT.push('CONTROL · 3p trader · n='+ok+(errs?' · '+errs+' ERR':'')
    +' · P0 win '+(100*w/ok).toFixed(1)+'% · P0 total '+(tot/ok).toFixed(1)+' · rounds '+(rds/ok).toFixed(1));
}else if(__OBS){
  var seat={},turnSum={},heldWin={},heldN={},games=0,wins3=[0,0,0],errs=0;
  for(var g=0;g<__OBS;g++){GRANT=null;ARM=null;
    var r;try{r=runGame();}catch(e){errs++;continue;}
    games++;wins3[r.win]++;
    r.obs.forEach(function(o){seat[o.key]=(seat[o.key]||0)+1;turnSum[o.key]=(turnSum[o.key]||0)+o.turn;});
    r.rows.forEach(function(row,i){row.ups.forEach(function(k){
      heldN[k]=(heldN[k]||0)+1;if(i===r.win)heldWin[k]=(heldWin[k]||0)+1;});});}
  __OUT.push('OBS · 3p trader · n='+games+(errs?' · '+errs+' ERR':'')+' · seat wins '+wins3.map(function(w){return (100*w/games).toFixed(0)+'%';}).join('/'));
  Object.keys(IMPROVEMENTS).forEach(function(k){
    var s=seat[k]||0,hn=heldN[k]||0,hw=heldWin[k]||0;
    __OUT.push('  '+k+': seats '+(s/games).toFixed(2)+'/g · avg seat turn '+(s?(turnSum[k]/s).toFixed(1):'—')
      +' · held-win '+(hn?(100*hw/hn).toFixed(1)+'% (n='+hn+')':'—'));});
}else{
  __GRANTS.forEach(function(key){__ARMS.forEach(function(arm){
    var w=0,tot=0,rds=0,errs=0,ok=0,gr=0;
    for(var g=0;g<__N;g++){GRANT=key;ARM=arm;
      var r;try{r=runGame();}catch(e){errs++;continue;}
      ok++;if(r.win===0)w++;tot+=r.rows[0].total;rds+=r.rounds;if(r.granted)gr++;}
    __OUT.push('PROBE '+key+' · '+arm+' · n='+ok+(errs?' · '+errs+' ERR':'')
      +' · P0 win '+(100*w/ok).toFixed(1)+'% · granted '+(100*gr/ok).toFixed(0)+'%'
      +' · P0 total '+(tot/ok).toFixed(1)+' · rounds '+(rds/ok).toFixed(1));});});
}
this.__OUT=__OUT;
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
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{createIcons:noop},
  __GRANTS:GRANTS, __ARMS:ARMS, __N:N, __CONTROL:CONTROL, __OBS:OBS, __MID:MID_TURN };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#specprobe' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }
ctx.__OUT.forEach(l => console.log(l));
