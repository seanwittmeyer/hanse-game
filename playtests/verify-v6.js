// verify-v6.js — the targeted rule battery for v6.0 "The Voyage" (KEY hanse-v60).
// Drives the CANONICAL engine (extracted from play.html, DOM stubbed) with deterministic
// state surgery per check. Runs in seconds; ALWAYS after an engine change.
// Usage: node playtests/verify-v6.js
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
var __PASS=0,__FAIL=0,__OUT=[];
function T(name,fn){try{const r=fn();
  if(r===true){__PASS++;__OUT.push('  ok  '+name);}
  else{__FAIL++;__OUT.push('FAIL  '+name+(r===false?'':' — '+r));}
}catch(e){__FAIL++;__OUT.push('FAIL  '+name+' — threw: '+(e&&e.message||e));}}
function mk(n){EXPANSION=false;JOPEN=false;HALLEXP=false;OVERLAND=false;
  S=freshState(n||2,['P1','P2','P3','P4'].slice(0,n||2));UI={sub:'verb'};undoStack=[];
  S.players.forEach(p=>{p.ai=null;p.presPool=PRES_POOL;});
  // determinism: clear the random warm-start furniture and ships
  SLOTS.forEach(s=>{S.slots[s.id]=null;S.buildings[s.id]=null;});
  return S;}
function ship(slot,kind,dest,load){S.slots[slot]={type:'ship',ship:kind,dest:dest,load:load||[]};return S.slots[slot];}
function cask(pid,style,die){return {owner:pid,style:style,q:STYLES[style].q,die:die,act:'source'};}

// ---- identity & setup ----
T('KEY is hanse-v60',()=>KEY==='hanse-v60');
T('MAX_ROUND is 40',()=>MAX_ROUND===40);
T('setup: sea state fields exist',()=>{mk(2);return Array.isArray(S.sea)&&!!S.posts&&!!S.factors&&!!S.passages;});
T('setup: Wadden Coast & Skagen open, Dover Strait & the Sound closed',()=>{mk(2);
  return passageOpen('wc')&&passageOpen('sk')&&!passageOpen('ds')&&!passageOpen('sd');});
T('setup: the Venture hand is retired (empty)',()=>{mk(2);return S.players.every(p=>(p.hand||[]).length===0);});
T('setup: 13 dice · 3 vessels · warm Gruit at die 1',()=>{mk(2);const p=S.players[0];
  return p.presPool===13&&p.vessels.length===3&&p.vessels[0].style==='gruit'&&p.vessels[0].die===1;});
T('setup: every tracked marker opens at the top',()=>{mk(2);
  return Object.keys(S.bourse).every(b=>S.bourse[b]===BOURSE_START)&&!('gruit' in S.bourse);});
T('setup: 3 exports dealt · ship display 4',()=>{mk(2);return S.exports.length===3&&S.shipDisplay.length===4;});
T('lanes: Bruges/Bergen 1 waypoint · London/Novgorod 2',()=>
  LANES.bruges.length===1&&LANES.bergen.length===1&&LANES.london.length===2&&LANES.novgorod.length===2);
T('London prize is the chart',()=>DEST.london.benefit==='chart');

// ---- the verb menu ----
T('verbAvail: WORK always · SAIL/TRADE closed on a fresh board',()=>{mk(2);
  return verbAvail('work')&&!verbAvail('sail')&&!verbAvail('trade');});
T('chartOptions: closed passages chartable at 2G · no factor without a delivery',()=>{mk(2);
  const o=chartOptions(S.players[0],false);
  return o.some(x=>x.k==='open'&&x.w==='ds')&&o.some(x=>x.k==='open'&&x.w==='sd')&&!o.some(x=>x.k==='factor');});
T('chartOptions: open-waypoint posts offered',()=>{mk(2);
  const o=chartOptions(S.players[0],false);
  return o.some(x=>x.k==='post'&&x.w==='wc')&&o.some(x=>x.k==='post'&&x.w==='sk');});
T('the Surveyor waives passage & post fees',()=>{mk(2);const p=S.players[0];p.upgrades=['brewmate'];
  const o=chartOptions(p,false);const open=o.find(x=>x.k==='open'&&x.w==='ds');
  return !!open&&!(open.fee.g||open.fee.h);});
T('post seats: 1 at 2p · 2 at 3p',()=>{mk(2);const a=postSeatsMax();mk(3);return a===1&&postSeatsMax()===2;});
T('house markers cap the network',()=>{mk(2);const p=S.players[0];
  S.posts.wc=[0];S.posts.sk=[0];S.factors.bruges=[0];S.factors.london=[0];S.factors.bergen=[0];S.factors.novgorod=[0];
  return markersUsed(p)===6&&markersLeft(p)===0&&chartOptions(p,true).every(x=>x.k==='open');});

// ---- WORK ----
T('WORK: Source 3 fires and the flank offer follows',()=>{mk(2);const p=S.players[0];
  doWork('A');const inSrc=UI.sub==='source';srcTake(3,0);
  return inSrc&&p.grain===6&&(UI.sub==='end'||UI.sub==='flank');});
T('WORK: a flanking ship opens the flank load',()=>{mk(2);const p=S.players[0];
  ship('s1','cog','bruges');
  doWork('A');srcTake(0,3);
  return UI.sub==='flank'&&UI.flank.slots.includes('s1');});
T('WORK: adjacency binds after placement',()=>{mk(2);const p=S.players[0];
  doWork('A');srcTake(1,1);flankSkip&&(UI.sub==='flank'?flankSkip():0);
  const before=p.cell;doWork('D');   // A→D is diagonal: illegal
  return before==='A'&&p.cell==='A';});
T('Harbor: commission places a hull and offers the maiden load',()=>{mk(2);const p=S.players[0];
  p.placed=true;p.cell='A';S.shipDisplay=[{ship:'hulk',dest:'bruges'}];
  doWork('C');const h=UI.sub==='harbor';harborPick('comm');commPick(0);commPlace('s3');
  return h&&S.slots.s3&&S.slots.s3.ship==='hulk';});

// ---- DEPART · the tide · certification ----
T('a full ship DEPARTS onto its lane and leaves the slot',()=>{mk(2);
  const t=ship('s1','cog','bruges',[cask(0,'gruit',1),cask(1,'gruit',1)]);
  sailShip('s1',0);
  return S.slots.s1===null&&S.sea.length===1&&S.sea[0].pos===0&&LANES.bruges[0]==='wc';});
T('the tide: the slot’s Public Work departs with the ship (boxed)',()=>{mk(2);
  S.buildings.s1={b:'maltkiln'};ship('s1','cog','bruges',[cask(0,'gruit',1),cask(1,'gruit',1)]);
  sailShip('s1',0);
  return S.buildings.s1===null;});
T('the Weigh House certifies — the flag rides the hull',()=>{mk(2);
  S.buildings.s1={b:'weighhouse'};ship('s1','cog','bruges',[cask(0,'gruit',1),cask(1,'gruit',1)]);
  sailShip('s1',0);
  return S.sea[0].cert===1;});
T('post rent pays on entering a waypoint',()=>{mk(2);const p2=S.players[1];S.posts.wc=[1];
  const g0=p2.grain;ship('s1','cog','bruges',[cask(0,'gruit',1),cask(0,'gruit',1)]);
  sailShip('s1',0);
  return p2.grain===g0+POST_RENT_G;});

// ---- the current · closures · landing ----
T('the current lands a Bruges ship off the Wadden Coast',()=>{mk(2);const p=S.players[0];
  S.sea=[{ship:'cog',dest:'bruges',load:[cask(0,'broyhan',3),cask(0,'broyhan',3)],cert:0,pos:0}];
  S.bourse.broyhan=2;
  theCurrent();
  return S.sea.length===0&&p.delivered.length===2&&p.delivered[0].val===5;});
T('priced at LANDING: the marker read at arrival, not departure',()=>{mk(2);const p=S.players[0];
  S.sea=[{ship:'skute',dest:'bruges',load:[cask(0,'broyhan',3)],cert:0,pos:0}];
  S.bourse.broyhan=3;bourseShift('broyhan',-3);   // the market crashes while the cargo is at sea
  theCurrent();
  return p.delivered[0].val===3&&p.delivered[0].mkt===0;});
T('the glut lands AFTER the sale — one step per beer type',()=>{mk(2);
  S.sea=[{ship:'hulk',dest:'bruges',load:[cask(0,'broyhan',3),cask(0,'broyhan',3),cask(0,'broyhan',3)],cert:0,pos:0}];
  S.bourse.broyhan=2;
  theCurrent();
  return S.players[0].delivered.every(d=>d.val===5)&&S.bourse.broyhan===1;});
T('a CERTIFIED landing does not glut',()=>{mk(2);
  S.sea=[{ship:'cog',dest:'bruges',load:[cask(0,'broyhan',3),cask(0,'broyhan',3)],cert:1,pos:0}];
  S.bourse.broyhan=2;
  theCurrent();
  return S.bourse.broyhan===2&&S.players[0].delivered[0].val===5;});
T('a closed passage halts the current',()=>{mk(2);
  S.sea=[{ship:'cog',dest:'london',load:[cask(0,'hopped',2),cask(0,'hopped',2)],cert:0,pos:0}];
  theCurrent();
  const held=S.sea.length===1&&S.sea[0].pos===0;
  S.passages.ds=true;theCurrent();
  const moved=S.sea.length===1&&S.sea[0].pos===1;
  theCurrent();
  return held&&moved&&S.sea.length===0;});
T('the current sweeps nearest-Kontor first (both land in one sweep)',()=>{mk(2);
  S.passages.ds=true;
  S.sea=[{ship:'skute',dest:'london',load:[cask(0,'hopped',2)],cert:0,pos:0},
         {ship:'skute',dest:'bruges',load:[cask(1,'gruit',1)],cert:0,pos:0}];
  theCurrent();
  return S.sea.length===1&&S.sea[0].dest==='london'&&S.sea[0].pos===1&&S.players[1].delivered.length===1;});
T('SAIL: the push fee binds when none of your casks ride',()=>{mk(2);const p=S.players[0];
  S.sea=[{ship:'skute',dest:'bruges',load:[cask(1,'gruit',1)],cert:0,pos:0}];
  p.grain=1;const g0=p.grain;
  sailPick(0);
  return p.grain===g0-PUSH_FEE.g&&S.players[1].delivered.length===1;});
T('Novgorod pays its +3 premium at landing',()=>{mk(2);const p=S.players[0];
  S.passages.sd=true;
  S.sea=[{ship:'skute',dest:'novgorod',load:[cask(0,'bock',5)],cert:0,pos:1}];
  S.bourse.bock=1;
  theCurrent();
  return p.delivered[0].val===5+3+1;});
T('prizes still resolve per cask at landing (Bruges queues the recipe pick)',()=>{mk(2);
  S.sea=[{ship:'skute',dest:'bruges',load:[cask(0,'gruit',1)],cert:0,pos:0}];
  theCurrent();
  return (UI.pendingRecipe||[]).length===1;});
T('Keut’s perk still places presence on landing',()=>{mk(2);const p=S.players[0];
  S.sea=[{ship:'skute',dest:'bruges',load:[cask(0,'keut',3)],cert:0,pos:0}];
  theCurrent();
  return (p.presBonus.bruges||0)===1;});
T('the factor’s step queues after your landing there',()=>{mk(2);const p=S.players[0];
  S.factors.bruges=[0];
  S.sea=[{ship:'skute',dest:'bruges',load:[cask(0,'broyhan',3)],cert:0,pos:0}];
  S.bourse.broyhan=2;
  theCurrent();
  return (UI.pendingFactor||[]).length===1&&UI.pendingFactor[0].styles[0]==='broyhan';});
T('fshiftPick steps the landed beer back up',()=>{mk(2);
  S.bourse.broyhan=1;
  UI.fsh={styles:['broyhan'],dest:'bruges',pid:0};UI.goodsRt='end';UI.sub='fshift';
  fshiftPick('broyhan');
  return S.bourse.broyhan===2;});

// ---- CHART mechanics ----
T('opening a passage stands the charter’s post free',()=>{mk(2);const p=S.players[0];p.grain=4;
  UI.chart={returnTo:'end',free:false,pid:0};UI.sub='chart';
  chartDo('open','ds');
  return passageOpen('ds')&&(S.posts.ds||[]).includes(0)&&p.grain===2;});
T('a factor needs a prior delivery there',()=>{mk(2);const p=S.players[0];p.grain=8;
  const before=chartOptions(p,false).some(x=>x.k==='factor'&&x.w==='bruges');
  p.delivered.push({style:'gruit',q:1,dest:'bruges',val:1,mkt:0});
  const after=chartOptions(p,false).some(x=>x.k==='factor'&&x.w==='bruges');
  return !before&&after;});
T('TRADE unlocks with any factor',()=>{mk(2);const p=S.players[0];
  const before=verbAvail('trade');
  S.factors.bergen=[0];
  return !before&&verbAvail('trade');});
T('the Chart-1 load bonus (survey) opens the chart flow, fee waived',()=>{mk(2);const p=S.players[0];
  p.grain=0;p.hops=0;
  fireCaskAct('survey','end');
  return UI.sub==='chart'&&UI.chart.free===true&&chartOptions(p,true).length>0;});
T('London’s prize resolves as a free chart for an AI seat',()=>{mk(2);const p=S.players[0];p.ai={tier:'journeyman'};
  p.grain=0;p.delivered.push({style:'hopped',q:2,dest:'london',val:2,mkt:0});
  UI.pendingBenefits=[{pid:0,dest:'london'}];
  afterSail('end');
  const built=passageOpen('ds')||passageOpen('sd')||SEA_KEYS.some(w=>(S.posts[w]||[]).includes(0))||KONTORE.some(k=>hasFactorAt(p,k));
  return built&&(UI.pendingBenefits||[]).length===0;});

// ---- the clock ----
T('dice at sea count as committed (the tray reads them)',()=>{mk(2);const p=S.players[0];
  const t0=trayDice(p);
  S.sea=[{ship:'cog',dest:'bruges',load:[cask(0,'gruit',1)],cert:0,pos:0}];
  return trayDice(p)===t0-1;});
T('the empty tray still sets the final round',()=>{mk(2);const p=S.players[0];
  p.presPool=1;p.vessels=[null,null,null];
  S.sea=[{ship:'cog',dest:'bruges',load:[cask(0,'gruit',1)],cert:0,pos:0}];
  checkDiceEnd();
  return S.ending===true&&S.endReason==='dice';});
T('MAX_ROUND 40 backstops',()=>{mk(2);S.turn=40;checkTriggers();
  return S.ending===true&&S.endReason==='ceiling';});
T('END-GAME CARGO: the die alone — no marker, no premium, no prize, no glut',()=>{mk(2);const p=S.players[0];
  S.passages.sd=true;
  S.sea=[{ship:'skute',dest:'novgorod',load:[cask(0,'bock',5)],cert:0,pos:1}];
  S.bourse.bock=3;
  endCargo();
  return p.delivered[0].val===5&&S.bourse.bock===3&&(UI.pendingRecipe||[]).length===0&&S.sea.length===0;});

// ---- carried law ----
T('majorities: 2p pays two places · presence gates',()=>{mk(2);
  S.players[0].presBonus.bergen=3;S.players[1].presBonus.bergen=1;
  const a=majorityAwards('bergen');
  return a[0]===9&&a[1]===5;});
T('the boarding gate reads the die as it boards (Kiln lifts past)',()=>{mk(2);const p=S.players[0];
  S.buildings.s1={b:'maltkiln'};ship('s1','skute','novgorod');
  p.vessels[1]=cask(0,'hopped',2);p.vessels[1].q=2;
  return canTake('s1',1)===true&&gateNeed('s1')===3;});
T('the Pilot advances a ship with your cask at turn start',()=>{mk(2);const p=S.players[0];
  p.upgrades=['broker'];S.passages.ds=true;
  S.sea=[{ship:'cog',dest:'london',load:[cask(0,'hopped',2),cask(1,'hopped',2)],cert:0,pos:0}];
  pilotTick(p);
  return S.sea[0].pos===1;});
T('the Supercargo pays on an off-turn landing',()=>{mk(2);const p2=S.players[1];
  p2.upgrades=['supercargo'];const g0=p2.grain,h0=p2.hops;
  S.active=0;
  S.sea=[{ship:'skute',dest:'bruges',load:[cask(1,'gruit',1)],cert:0,pos:0}];
  theCurrent();
  return p2.grain===g0+1&&p2.hops===h0+1;});
T('scorePlayer: no venture/building bucket scores',()=>{mk(2);
  const sc=scorePlayer(S.players[0]);
  return sc.bldg===0;});
T('the Flight ladder carries',()=>{mk(2);const p=S.players[0];
  p.shipped={gruit:1,hopped:1,broyhan:1};
  return flightScore(p)===FLIGHT_PTS[3];});

__OUT.forEach(l=>console.log(l));
console.log('');
console.log(__FAIL?('FAILED — '+__FAIL+' of '+(__PASS+__FAIL)+' checks'):('ALL PASS — '+__PASS+' checks'));
this.__FAIL=__FAIL;
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
  parseInt, parseFloat, isNaN, alert:noop, setTimeout:noop, clearTimeout:noop, lucide:{ createIcons:noop } };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+verify' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }
process.exit(ctx.__FAIL ? 1 : 0);
