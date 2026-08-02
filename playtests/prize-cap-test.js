// Bergen prize-cap A/B (v4.6b) — the "per-die expansion" dial recorded at v4.5b, designer-called 2026-08-02.
//   A (live, cap-1): EVERY house with a cask aboard seats ONE specialist (max 1/house/ship — v4.6b).
//   B (per-die):     EVERY CASK grants its owner a specialist prize (2 own casks → 2 picks;
//                    the natural throttles remain: 2 seats · never-two-of-a-kind · display of 4,
//                    end-of-turn refill · seat-gates · fizzle pays the 2-goods consolation PER PRIZE).
// Context the A/B illuminates: Bruges (recipes, fee-throttled) and London (buildings) are ALREADY
// per-cask — Bergen is the only capped prize. The greedy tiers carry no prize term, so one policy
// plays both worlds — a clean A/B (but note: nobody deliberately stacks casks to farm B).
// Usage: node playtests/prize-cap-test.js [N-per-count]   (default 300)
// Env:   PERDIE=1 patches the cap out (variant B) · PERSONA=1 runs the 4p lane oracle instead
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '300', 10);
const PERDIE = process.env.PERDIE === '1';
const PERSONA = process.env.PERSONA === '1';

const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
let engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// ---- variant B: surgical source patch on the exact v4.6b cap line (fail loud on drift) ----
const CAP_ANCHOR = "if(DEST[t.dest].benefit==='spec'){if(!specGiven[L.owner]){specGiven[L.owner]=1;grantPrize(owner,t.dest);}}";
if (!engine.includes(CAP_ANCHOR)) { console.error('CAP ANCHOR NOT FOUND — engine drifted; update prize-cap-test.js'); process.exit(1); }
if (PERDIE) engine = engine.replace(CAP_ANCHOR, "if(DEST[t.dest].benefit==='spec'){grantPrize(owner,t.dest);}");

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
var __OUT=[];
// ---- instrumentation: wrap sailShip (per-sail cask census) + afterSail (prize-head outcomes).
// Function declarations share the engine's scope, and internal recursion resolves through the
// binding — reassigning the identifier hooks every call, the engine's own included.
var STAT=null,CUR=null;
var __sail=sailShip;
sailShip=function(slot,creditId){
  if(!aiSimulating&&STAT){var t=S.slots[slot];var by={};t.load.forEach(function(L){by[L.owner]=(by[L.owner]||0)+1;});
    var mx=0;Object.keys(by).forEach(function(k){if(by[k]>mx)mx=by[k];});
    STAT.sails++;STAT.sailsBy[t.dest]=(STAT.sailsBy[t.dest]||0)+1;
    if(t.dest==='bergen'){STAT.bSails++;if(mx>=2)STAT.bMulti++;STAT.bMaxHist[Math.min(mx,3)]=(STAT.bMaxHist[Math.min(mx,3)]||0)+1;}
    if(t.dest==='bruges'&&mx>=2)STAT.rMulti++;
    CUR={spec:{},rec:{}};}
  return __sail(slot,creditId);};
var __after=afterSail;
afterSail=function(rt){
  if(!aiSimulating&&STAT){
    if((UI.pendingRecipe||[]).length){var b=UI.pendingRecipe[0];var lp=S.players[b.pid];
      var opts=(S.exports||[]).filter(function(x){return lp.recipes.indexOf(x)<0&&canPay(lp,recipeFeeFor(lp,x));});
      if(!opts.length)STAT.recFizzle++;else{STAT.recTake++;if(CUR){CUR.rec[b.pid]=(CUR.rec[b.pid]||0)+1;if(CUR.rec[b.pid]===2)STAT.recBig++;}}}
    else if(!(UI.pendingBenefits||[]).length&&(UI.pendingSpec||[]).length){var b2=UI.pendingSpec[0];var lp2=S.players[b2.pid];
      if(!hireable(lp2).length)STAT.specFizzle++;else{STAT.specTake++;if(CUR){CUR.spec[b2.pid]=(CUR.spec[b2.pid]||0)+1;if(CUR.spec[b2.pid]===2)STAT.specBig++;}}}}
  return __after(rt);};
function newStat(){return {sails:0,sailsBy:{},bSails:0,bMulti:0,bMaxHist:{},rMulti:0,
  specTake:0,specFizzle:0,specBig:0,recTake:0,recFizzle:0,recBig:0};}
function runGame(n,personas){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  STAT=newStat();CUR=null;
  S=freshState(n,S&&[]||[]);UI={sub:'move'};undoStack=[];
  S.players.forEach(function(p,i){p.ai={tier:'trader',persona:personas?personas[i]:null};});
  var guard=0;
  while(!S.over){aiStep();if(++guard>200000)throw new Error('runaway '+UI.sub);}
  var rows=S.players.map(function(p){var sc=scorePlayer(p);
    var byDest={};KONTORE.forEach(function(k){byDest[k]=deliveredAt(p,k);});
    return {total:sc.total,specs:(p.upgrades||[]).length,byDest:byDest};});
  var win=0;rows.forEach(function(r,i){if(r.total>rows[win].total)win=i;});
  return {rounds:S.turn,rows:rows,win:win,stat:STAT};
}
var TAG=__PERDIE?'B(per-die)':'A(cap-1) ';
if(__PERSONA){
  var LANES=['majority','lifter','builder','breadth'];var laneW={},laneN={};
  LANES.forEach(function(l){laneW[l]=0;laneN[l]=0;});
  var errs=0;
  for(var g=0;g<__N;g++){
    var ps=LANES.slice(g%4).concat(LANES.slice(0,g%4));
    try{var r=runGame(4,ps);}catch(e){errs++;continue;}
    ps.forEach(function(l){laneN[l]++;});laneW[ps[r.win]]++;
  }
  __OUT.push(TAG+' · 4p lane oracle · '+__N+' games'+(errs?' · '+errs+' ERR':''));
  __OUT.push('  lanes: '+LANES.map(function(l){return l+' '+(100*laneW[l]/Math.max(1,laneN[l])).toFixed(1)+'%';}).join(' · '));
}else{
  [2,3,4].forEach(function(n){
    var errs=0,rounds=0,inBand=0,margin=0;var agg=newStat();
    var split={};KONTORE.forEach(function(k){split[k]=0;});var delivN=0;
    var specs=0,twoSeat=0,tot=0,seats=0,games=0;
    for(var g=0;g<__N;g++){
      var r;try{r=runGame(n,null);}catch(e){errs++;continue;}
      games++;rounds+=r.rounds;if(r.rounds>=12&&r.rounds<=25)inBand++;
      var ts=r.rows.map(function(x){return x.total;}).sort(function(a,b){return b-a;});
      margin+=ts[0]-ts[1];
      Object.keys(agg).forEach(function(k){if(typeof agg[k]==='number')agg[k]+=r.stat[k];});
      Object.keys(r.stat.bMaxHist).forEach(function(k){agg.bMaxHist[k]=(agg.bMaxHist[k]||0)+r.stat.bMaxHist[k];});
      r.rows.forEach(function(x){seats++;specs+=x.specs;if(x.specs>=2)twoSeat++;tot+=x.total;
        KONTORE.forEach(function(k){split[k]+=x.byDest[k];delivN+=x.byDest[k];});});
    }
    if(!games)return;
    var G=games;
    __OUT.push(TAG+' · '+n+'p · '+G+' ok'+(errs?' · '+errs+' ERR':'')
      +' · rounds '+(rounds/G).toFixed(1)+' ('+(100*inBand/G).toFixed(0)+'% band) · margin '+(margin/G).toFixed(1));
    __OUT.push('  bergen: sails '+(agg.bSails/G).toFixed(2)+'/g · 2+same-house '+(agg.bMulti/G).toFixed(2)+'/g (max-house 1:'+((agg.bMaxHist[1]||0)/G).toFixed(2)+' 2:'+((agg.bMaxHist[2]||0)/G).toFixed(2)+' 3:'+((agg.bMaxHist[3]||0)/G).toFixed(2)+')');
    __OUT.push('  spec prizes: takes '+(agg.specTake/G).toFixed(2)+'/g · fizzles '+(agg.specFizzle/G).toFixed(2)+'/g (→'+(2*agg.specFizzle/G).toFixed(1)+' consolation goods/g) · 2-in-one-sail '+(agg.specBig/G).toFixed(2)+'/g');
    __OUT.push('  recipe prizes: takes '+(agg.recTake/G).toFixed(2)+'/g · fizzles '+(agg.recFizzle/G).toFixed(2)+'/g · 2+same-house Bruges sails '+(agg.rMulti/G).toFixed(2)+'/g · 2-in-one-sail '+(agg.recBig/G).toFixed(2)+'/g');
    __OUT.push('  per seat: specs '+(specs/seats).toFixed(2)+' · both-seats-filled '+(100*twoSeat/seats).toFixed(0)+'% · total '+(tot/seats).toFixed(1));
    __OUT.push('  delivery split: '+KONTORE.map(function(k){return k.slice(0,4)+' '+(100*split[k]/Math.max(1,delivN)).toFixed(1)+'%';}).join(' · '));
  });
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
  __N:N, __PERDIE:PERDIE, __PERSONA:PERSONA };
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try { vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#prizecaptest' }); }
catch (e) { console.error('RUN ERROR:', e && e.stack || e); process.exit(1); }
ctx.__OUT.forEach(l => console.log(l));
