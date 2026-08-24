// KONTOR PRIZE SATURATION probe — does a port's prize still PAY late, or has it died?
// Three of the four prizes have a hard ceiling (recipes ~3 · specialist seats 2 · the Venture
// hand 4 + 4 flips); Novgorod's +2★/die has none. This instrument wraps grantPrize and counts,
// per port, how often the port's THING was still available to take vs unavailable — and the
// median round it died. Since v5.6 an unavailable thing is no longer a feel-bad (the 2-goods
// consolation retired; every prize is the thing OR ★, so ★ is the fallback) — but a port whose
// thing dies early has lost its IDENTITY, which is what this measures. DESIGN.md §10.
// Usage: node playtests/prize-probe.js [N]  (default 100 games x 2/3/4p, journeyman)
// Drives the CANONICAL engine, same harness as sim.js. Output is NOT committed (CLAUDE.md §4).
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const N = parseInt(process.argv[2] || '100', 10);
const TIER = process.env.TIER || 'journeyman';
const PERSONAS = process.env.PERSONAS === '1';
const html = fs.readFileSync(path.join(__dirname, '..', 'play.html'), 'utf8');
const engine = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const driver = `
render=function(){};save=function(){};log=function(){};snapshot=function(){};
var __P={bruges:0,brugesFall:0,london:0,londonForfeit:0,bergen:0,bergenFall:0,nov:0,seatsFull:0,handEmpty:0,recFull:0,
  fall:{bruges:[],london:[],bergen:[]}};
var __gp=grantPrize;
grantPrize=function(lp,dest){
  var t=S.turn;
  if(dest==='bruges'){ if(recipeGainable(lp).filter(function(x){return canPay(lp,recipeFeeFor(lp,x));}).length)__P.bruges++;else{__P.brugesFall++;__P.fall.bruges.push(t);} if(!recipeGainable(lp).length)__P.recFull++; }
  if(dest==='london'){ if(canVentureL1(lp)||canVentureL2(lp)||canVentureFlip(lp))__P.london++;else{__P.londonForfeit++;__P.fall.london.push(t);} if(!(lp.hand||[]).length)__P.handEmpty++; }
  if(dest==='bergen'){ if(hireable(lp).length)__P.bergen++;else{__P.bergenFall++;__P.fall.bergen.push(t);} if(!specRoom(lp))__P.seatsFull++; }
  if(dest==='novgorod')__P.nov++;
  return __gp(lp,dest);
};
for(var g=0;g<20;g++){ for(var n=2;n<=4;n++){
  S=freshState(n,['A','B','C','D'].slice(0,n));UI={sub:'move'};
  S.players.forEach(function(p){p.ai={tier:'journeyman'};});
  var guard=0;
  while(!(S.ending&&S.active===S.first&&UI.sub==='end')&&guard++<9000)aiStep();
}}
function pct(a,b){return b?(100*a/b).toFixed(1)+'%':'-';}
function med(a){if(!a.length)return '-';a=a.slice().sort(function(x,y){return x-y;});return a[Math.floor(a.length/2)];}
console.log('=== KONTOR PRIZE SATURATION -- ${N} games x 2/3/4p, tier ${TIER} ===');
console.log('(v5.6: an unavailable thing is not forfeited -- the owner takes '+PRIZE_PTS+'* instead. This reads IDENTITY, not loss.)');
console.log('BRUGES   recipe:     PAID '+__P.bruges+' ('+pct(__P.bruges,__P.bruges+__P.brugesFall)+')   took * instead '+__P.brugesFall+' ('+pct(__P.brugesFall,__P.bruges+__P.brugesFall)+')   median round it died '+med(__P.fall.bruges));
console.log('LONDON   Venture:    PAID '+__P.london+' ('+pct(__P.london,__P.london+__P.londonForfeit)+')   took * instead '+__P.londonForfeit+' ('+pct(__P.londonForfeit,__P.london+__P.londonForfeit)+')   median round it died '+med(__P.fall.london));
console.log('BERGEN   specialist: PAID '+__P.bergen+' ('+pct(__P.bergen,__P.bergen+__P.bergenFall)+')   took * instead '+__P.bergenFall+' ('+pct(__P.bergenFall,__P.bergen+__P.bergenFall)+')   median round it died '+med(__P.fall.bergen));
console.log('NOVGOROD +3*/die:    NO THING TO DIE -- pays every time '+__P.nov+' (100%)');
console.log('why it died: seats already full '+__P.seatsFull+'   venture hand empty '+__P.handEmpty+'   every recipe held '+__P.recFull);
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
  parseInt, parseFloat, isNaN, alert:noop,
  setTimeout:noop, clearTimeout:noop,
  lucide:{ createIcons:noop },
  __N:N, __TIER:TIER,
  __EXP:process.env.EXPANSION==='1', __JOP:process.env.JOPEN==='1',   // v4.14: the beer-toggle arms (EXPANSION=1 · JOPEN=1)
  __HALL:process.env.HALL==='1',                                      // v4.15: the Guildhall arm (HALL=1)
  __SINV:process.env.STARTINV!=null?process.env.STARTINV:'', __TSTARS:process.env.TSTARS!=null?process.env.TSTARS:'',   // v4.17: the Tasting dials
  __TBENCH:process.env.BENCH!=null?process.env.BENCH:'', __TCATB:process.env.CATB!=null?process.env.CATB:'', __EJ:process.env.EJUDGE!=null?process.env.EJUDGE:'', __TOUR:process.env.TOUR!=null?process.env.TOUR:'',
  __ICW:process.env.INV_CASK!=null?process.env.INV_CASK:'', __IBLDG:process.env.INV_BLDG!=null?process.env.INV_BLDG:'',
  __ASRC:process.env.ALTSRC!=null?process.env.ALTSRC:'', __AAGE:process.env.ALTAGE!=null?process.env.ALTAGE:'',   // v5.0: the primary/alt dials
  __STPL:process.env.STAPLE!=null?process.env.STAPLE:'',   // v5.2: the Staple premium dial
  __SRCN:process.env.SRCN!=null?process.env.SRCN:'',   // v5.2b: the Market primary dial
  __BMIN:process.env.BMIN!=null?process.env.BMIN:'',   // v5.3: the Bourse track ends
  __BMAX:process.env.BMAX!=null?process.env.BMAX:'',
  __POOL:parseInt(process.env.POOL||'0',10),
  __PERSONAS:PERSONAS,
  __GMS:parseInt(process.env.GUILD_MS||'0',10),
  __JIT:parseFloat(process.env.JITTER||'0'),
  __CMS:parseInt(process.env.CELLAR_MS||'0',10),
};
ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
ctx.addEventListener = noop; ctx.removeEventListener = noop;
vm.createContext(ctx);
try {
  vm.runInContext(engine + '\n' + driver, ctx, { filename: 'play.html#engine+driver' });
} catch (e) {
  console.error("RUN ERROR:", e && e.stack || e);
  process.exit(1);
}
