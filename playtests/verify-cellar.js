// One-off verification of the v1.4.1 "Flexible Cellar" — drives the CANONICAL play.html engine in a vm
// (same pattern as sim.js) and asserts the two chaining combos actually work end-to-end:
//   (a) Tap -> Buy  : Tap a Gruit (Source +2 goods) to gain grain, THEN buy a private Improvement with it.
//   (b) Tap -> Age  : Tap a "wild" cask -> brew a beer, THEN have the Cellar's Age age the new cask.
// Also checks: any-order (Age can be taken AFTER a Tap), once-per-visit gating, and Undo restores menu state.
const fs=require('fs'),path=require('path'),vm=require('vm');
const html=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
const engine=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');

const driver=`
function _assert(c,m){ if(!c){ throw new Error('ASSERT FAILED: '+m); } else { __LOG.push('ok: '+m); } }
function _setup(){
  S=freshState(2,['T','U']); UI={sub:'move'}; undoStack=[]; S.active=0;
  // wipe the warm-start board so it can't interfere with our controlled scenario
  SLOTS.forEach(function(s){S.slots[s.id]=null;S.buildings[s.id]=null;});
  return cur();
}
var __LOG=[];

// ---------- (a) Tap -> Buy ----------
(function(){
  var p=_setup();
  p.vessels=[ {style:'gruit',q:1,step:1,ready:1,act:'source'}, null ];   // a Ready Gruit whose Tap = Source +2 goods
  p.grain=1; p.hops=0; p.upgrades=[]; p.flipped=[];                       // Granary Right costs 3G — unaffordable at 1G
  S.impDisplay=['granary','cellar','vessel','hopgarden']; S.impDeck=[];   // v82: force Granary face-up so the Tap→Buy chain is deterministic
  _assert(!canPay(p,IMPROVEMENTS.granary.cost),'(a) precondition: cannot afford Granary (3G) with 1G');
  enterCellarMenu('stops');
  _assert(UI.sub==='tap'&&!!UI.cellar,'(a) Cellar menu opened (UI.sub tap + UI.cellar)');
  _assert(cellarCanTap(p)&&cellarCanImp(p)===false,'(a) Tap available; Improvement not yet affordable');
  tapPick('v:0');                                                        // Tap the Gruit -> fires Source
  _assert(UI.sub==='source','(a) Tap chained into the Source sub-action');
  srcTake(2,0);                                                          // take the 2 grain
  _assert(p.grain===3,'(a) gained +2 grain from the tapped Gruit (1 -> 3)');
  _assert(UI.sub==='tap'&&!!UI.cellar,'(a) returned to the Cellar menu after the Tap');
  _assert(UI.cellar.usedTap===true,'(a) Tap marked used (once per visit)');
  _assert(cellarCanImp(p)===true,'(a) Improvement is NOW affordable with the tapped grain — the chain works');
  buyImprovement('granary');                                            // buy with the grain we just gained
  _assert(hasUpgrade(p,'granary'),'(a) bought Granary Right in the SAME Cellar visit (Tap -> Buy)');
  _assert(p.grain===0,'(a) grain spent on the improvement (3 -> 0)');
  cellarDone();
  _assert(!UI.cellar&&(UI.sub==='stops'||UI.sub==='end'),'(a) Done exits the menu back to the line');
})();

// ---------- (b) Tap -> Age ----------
(function(){
  var p=_setup();
  p.recipes=['gruit','hopped']; p.grain=5; p.hops=5;                     // can afford Hopped (a cheap brew)
  p.vessels=[ {style:'hopped',q:2,step:2,ready:2,act:'wild'}, null ];    // a Ready cask whose Tap = Wild (-> brew)
  S.pileTop={2:'source',3:'source',4:'source',5:'source'};              // make the freshly-brewed cask's action deterministic
  enterCellarMenu('stops');
  _assert(cellarCanAge(p)===false,'(b) nothing to age yet (the only cask is Ready)');
  _assert(cellarCanTap(p)===true,'(b) the wild cask is tappable');
  tapPick('v:0');                                                        // Tap the wild cask -> Wild menu
  _assert(UI.sub==='wild','(b) Tap chained into the Wild sub-action');
  wildPick('brew');                                                      // choose Brew
  _assert(UI.sub==='brew','(b) Wild chained into Brew');
  brewPick('hopped');                                                    // brew a Hopped into the open vessel
  _assert(UI.sub==='tap'&&!!UI.cellar,'(b) returned to the Cellar menu after brewing');
  var young=p.vessels.filter(function(c){return c&&c.style==='hopped'&&c.step<c.ready;})[0];
  _assert(!!young,'(b) a freshly-brewed (maturing) Hopped now sits in a vessel');
  var before=young.step;
  _assert(cellarCanAge(p)===true,'(b) AGE is now available AFTER the Tap (any-order) — there is a maturing cask');
  cellarMenuAge();                                                       // take Age now
  _assert(UI.sub==='age','(b) Age entered with the Cellar pool');
  // allocate the whole pool onto the young cask
  var vi=p.vessels.indexOf(young);
  var guard=0; while(UI.sub==='age'&&UI.age.pool>0&&young.step<young.ready&&guard++<10){ ageAllot(vi); }
  if(UI.sub==='age') ageDone();
  _assert(young.step>before,'(b) the Cellar AGE matured the freshly-brewed cask (Tap -> brew -> Age, one visit): '+before+' -> '+young.step);
  _assert(!UI.cellar||UI.cellar.usedAge===true||UI.sub==='stops'||UI.sub==='end','(b) Age consumed / visit progressed');
})();

// ---------- once-per-visit + Undo ----------
(function(){
  var p=_setup();
  p.vessels=[ {style:'mumme',q:4,step:1,ready:4,act:'source'}, {style:'gruit',q:1,step:1,ready:1,act:'source'} ];  // one maturing + one Ready
  p.grain=2; p.hops=0;
  enterCellarMenu('stops');
  _assert(cellarCanAge(p)&&cellarCanTap(p),'(c) both Age and Tap available at open');
  cellarMenuAge(); var vi=0; ageAllot(vi); if(UI.sub==='age') ageDone();
  _assert(UI.cellar.usedAge===true,'(c) Age flagged used');
  _assert(cellarCanAge(p)===false,'(c) Age cannot be taken twice in one visit (once-per-visit)');
  var snapBeforeTap=undoStack.length;
  tapPick('v:1');                                                        // Tap the Ready Gruit
  if(UI.sub==='source') srcTake(2,0);
  _assert(UI.cellar&&UI.cellar.usedTap===true,'(c) Tap flagged used');
  _assert(cellarCanTap(p)===false,'(c) Tap cannot be taken twice in one visit');
  // Undo the tap+take: pop back through the snapshots
  while(undoStack.length>=snapBeforeTap+1) doUndo();
  _assert(UI.cellar&&UI.cellar.usedTap===false,'(c) Undo restored the menu state (usedTap back to false)');
})();

__RESULTS={log:__LOG};
`;

const noop=()=>{};
const makeEl=()=>{const el={innerHTML:'',textContent:'',value:'',style:{},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},setAttribute:noop,getAttribute:()=>null,appendChild:noop,addEventListener:noop,removeEventListener:noop};el.querySelector=()=>makeEl();el.querySelectorAll=()=>[];el.closest=()=>null;return el;};
const document={getElementById:()=>makeEl(),querySelector:()=>makeEl(),querySelectorAll:()=>[],createElement:()=>makeEl(),addEventListener:noop,body:makeEl()};
const store={};const localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];}};
const ctx={document,localStorage,console,Math,JSON,Date,Set,Map,Array,Object,String,Number,Boolean,parseInt,parseFloat,isNaN,alert:noop,setTimeout:noop,clearTimeout:noop,lucide:{createIcons:noop}};
ctx.window=ctx;ctx.globalThis=ctx;ctx.self=ctx;ctx.addEventListener=noop;ctx.removeEventListener=noop;
vm.createContext(ctx);
try{ vm.runInContext(engine+'\n'+driver,ctx,{filename:'play.html#engine+verify'}); }
catch(e){ console.error('VERIFY FAILED:',e&&e.message||e); process.exit(1); }
ctx.__RESULTS.log.forEach(l=>console.log('  '+l));
console.log('\nALL CELLAR CHAIN CHECKS PASS ('+ctx.__RESULTS.log.length+' assertions)');
