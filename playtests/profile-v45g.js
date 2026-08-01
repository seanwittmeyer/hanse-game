// STRATEGY-PROFILE MINER (v45g) — the qualitative-side instrument. Runs jittered, persona-mixed
// trader tables and mines WINNER PROFILES: openings, power-move win-correlations, capstone events.
// Chaos: trader noise 0.15 (a random legal action that often) + a rotating persona deal
// (free seats included) so variable strategies can surface instead of one greedy consensus.
// Usage: node playtests/profile-v45g.js [N-per-count]     (default 150; runs 3p and 4p)
'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
const engine=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const N=parseInt(process.argv[2]||'150',10);

const driver=`
render=function(){};save=function(){};log=function(){};snapshot=function(){};
AI_TIERS.trader.noise=0.15;   // the chaos dial
var PERS=[null,'quality','majority','lifter','builder','breadth'];
var ROWS=[];var CAPS=[];var CUR=null;
// ---- ground-truth hooks (real game only, never MC playouts — the trader runs none) ----
var __mb=markBrewed;markBrewed=function(p,s){if(CUR&&!aiSimulating){var r=CUR[p.id];r.brews[s]=(r.brews[s]||0)+1;}return __mb(p,s);};
var __cl=claimLading;claimLading=function(lp,idx){if(CUR&&!aiSimulating){var l=(S.ladingRow||[])[idx];if(l){CUR[lp.id].ladN++;CUR[lp.id].ladPts+=l.pts;if(l.pts>=5)CUR.caps.lading5++;}}return __cl(lp,idx);};
var __rp=rackPick;rackPick=function(vi){var had=!!UI.rack;var r=__rp(vi);if(CUR&&!aiSimulating&&had&&!UI.rack){CUR[cur().id].rack++;CUR.caps.rack++;}return r;};
var __ag=abbeyGo;abbeyGo=function(x){var p=cur();var h0=p?p.hops:0;var r=__ag(x);if(CUR&&!aiSimulating&&p&&p.hops<h0){CUR[p.id].abbey++;CUR.caps.abbey++;}return r;};
var __ha=hopexAllot;hopexAllot=function(vi){var p=cur();var h0=p?p.hops:0;var r=__ha(vi);if(CUR&&!aiSimulating&&p&&p.hops<h0)CUR[p.id].hopex++;return r;};
var __lc=loadCommit;loadCommit=function(ss,vi,uo){var p=cur();var o0=p?(p.bankO||0):0;var r=__lc(ss,vi,uo);if(CUR&&!aiSimulating&&p&&(p.bankO||0)>o0)CUR[p.id].toll++;return r;};
var __cp=commPlace;commPlace=function(slot){var p=cur();var g0=p?p.grain:0;var r=__cp(slot);if(CUR&&!aiSimulating&&p&&p.grain<g0)CUR[p.id].comm++;return r;};
var __ss=sailShip;sailShip=function(slot,cid){var bonded=bKeyAt(slot)==='bonded';var r=__ss(slot,cid);if(CUR&&!aiSimulating&&bonded)CUR.caps.bonded++;return r;};
var __dm=doMove;doMove=function(cell){var p=cur();if(CUR&&!aiSimulating&&p&&CUR[p.id].open.length<3)CUR[p.id].open.push(cell);return __dm(cell);};
function runGame(n,g){
  EXPANSION=false;JOPEN=false;OVERLAND=false;
  S=freshState(n,['P1','P2','P3','P4'].slice(0,n));UI={sub:'move'};undoStack=[];
  CUR={caps:{lading5:0,rack:0,abbey:0,bonded:0,nov7:0,die6:0,flight5:0}};
  S.players.forEach(function(p,i){
    p.ai={tier:'trader',persona:PERS[(g*n+i)%PERS.length]};
    CUR[p.id]={brews:{},ladN:0,ladPts:0,rack:0,abbey:0,hopex:0,toll:0,comm:0,open:[]};});
  var guard=0;while(!S.over&&guard++<200000)aiStep();
  if(!S.over)return null;
  var fr=finalRows();var winId=fr.rows[0].p.id;
  S.players.forEach(function(p){
    var sc=scorePlayer(p);var r=CUR[p.id];
    var nov=0,d6=0,hi=0;p.delivered.forEach(function(d){if(d.dest==='novgorod'){nov++;if(d.val>=7)CUR.caps.nov7++;}if((d.val||0)>=6)d6++;if((d.val||0)>=5)hi++;});
    CUR.caps.die6+=d6;
    var q3=0,q12=0;Object.keys(r.brews).forEach(function(s){if(STYLES[s].q>=3)q3+=r.brews[s];else q12+=r.brews[s];});
    if(flightBeers(p)>=5)CUR.caps.flight5++;
    ROWS.push({n:n,win:p.id===winId?1:0,persona:(p.ai&&p.ai.persona)||'free',total:sc.total,
      deliv:sc.deliv,maj:sc.maj,flight:sc.flight,bankB:p.bankB||0,bankL:p.bankL||0,bankO:p.bankO||0,
      delivN:p.delivered.length,nov:nov,d6:d6,hi:hi,q3:q3,q12:q12,
      ladN:r.ladN,ladPts:r.ladPts,rack:r.rack,abbey:r.abbey,hopex:r.hopex,toll:r.toll,comm:r.comm,
      specs:(p.upgrades||[]).length,open:r.open.join('')});});
  CAPS.push(CUR.caps);
  return 1;
}
var errs=0;
[3,4].forEach(function(n){for(var g=0;g<${N};g++){try{if(!runGame(n,g))errs++;}catch(e){errs++;}}});
this.__OUT={rows:ROWS,caps:CAPS,errs:errs};
`;
const noop=()=>{};const el=()=>({innerHTML:'',textContent:'',value:'',style:{},disabled:false,classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},setAttribute:noop,getAttribute:()=>null,appendChild:noop,removeChild:noop,focus:noop,querySelector:()=>null,querySelectorAll:()=>[],getBoundingClientRect:()=>({left:0,top:0,right:0,bottom:0,width:0,height:0})});
const ctx={document:{getElementById:()=>el(),createElement:()=>el(),addEventListener:noop,removeEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],body:{appendChild:noop,contains:()=>false},head:{appendChild:noop}},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},console,Math,JSON,Set,Map,Array,Object,String,Number,Boolean,parseInt,parseFloat,isNaN,alert:noop,setTimeout:noop,clearTimeout:noop,Date,lucide:{createIcons:noop}};
ctx.window=ctx;ctx.globalThis=ctx;ctx.self=ctx;ctx.addEventListener=noop;ctx.removeEventListener=noop;
vm.createContext(ctx);
try{vm.runInContext(engine+'\n'+driver,ctx,{filename:'profile'});}catch(e){console.error('RUN ERROR:',e&&e.stack||e);process.exit(1);}
const {rows,caps,errs}=ctx.__OUT;
const f=(x,d=2)=>Number(x).toFixed(d);
const avg=(a,k)=>a.length?a.reduce((s,r)=>s+r[k],0)/a.length:0;
console.log('=== STRATEGY PROFILES v45g — jitter 0.15 · persona-mixed trader tables · '+rows.length+' seats · errs '+errs+' ===');
// 1 · win rate by persona
console.log('\n-- win rate by lane (chaos-jittered) --');
const byP={};rows.forEach(r=>{(byP[r.persona]=byP[r.persona]||[]).push(r);});
Object.keys(byP).forEach(k=>{const a=byP[k];console.log('  '+k.padEnd(9)+' '+f(100*avg(a,'win'),1)+'%  (n='+a.length+' · avg total '+f(avg(a,'total'),1)+')');});
// 2 · winner vs field profile
const W=rows.filter(r=>r.win),F=rows.filter(r=>!r.win);
console.log('\n-- the winner profile (winners vs the field) --');
[['total','total'],['deliv','delivery ★'],['maj','majority ★'],['flight','flight ★'],['bankB','build ★'],['bankL','lading ★'],['bankO','toll ★'],
 ['delivN','casks delivered'],['hi','5★+ deliveries'],['d6','6★+ deliveries'],['nov','novgorod casks'],['q3','Q3+ brews'],['q12','Q1-2 brews'],
 ['ladN','ladings claimed'],['rack','racks'],['abbey','abbeys'],['hopex','hopex pays'],['toll','toll stamps'],['comm','commissions'],['specs','specialists']]
 .forEach(([k,lbl])=>{console.log('  '+lbl.padEnd(17)+' W '+f(avg(W,k))+'  vs F '+f(avg(F,k))+'  ('+(avg(F,k)?'x'+f(avg(W,k)/Math.max(0.01,avg(F,k)),2):'-')+')');});
// 3 · power-move win correlation
console.log('\n-- power-move win rates (with vs without) --');
[['rack>=1',r=>r.rack>=1],['abbey>=1',r=>r.abbey>=1],['toll>=1',r=>r.toll>=1],['hopex>=2',r=>r.hopex>=2],
 ['ladPts>=6',r=>r.ladPts>=6],['d6>=1',r=>r.d6>=1],['nov>=3',r=>r.nov>=3],['flight>=9',r=>r.flight>=9],
 ['specs>=2',r=>r.specs>=2],['q3>=4',r=>r.q3>=4],['comm>=3',r=>r.comm>=3]]
 .forEach(([lbl,fn])=>{const a=rows.filter(fn),b=rows.filter(r=>!fn(r));
   if(a.length>=8)console.log('  '+lbl.padEnd(11)+' with '+f(100*avg(a,'win'),1)+'% (n='+a.length+')  without '+f(100*avg(b,'win'),1)+'%');});
// 4 · capstone census (per game)
const G=caps.length;
console.log('\n-- capstone events (per game avg · '+G+' games) --');
[['nov7','a 7-8★ Novgorod delivery'],['die6','a 6★+ delivery'],['lading5','a 5★ lading claim'],['rack','a Racking play'],['abbey','an Abbey firing'],['bonded','a Bonded send-off'],['flight5','a 5-beer flight']]
 .forEach(([k,lbl])=>{const tot=caps.reduce((s,c)=>s+c[k],0);const inG=caps.filter(c=>c[k]>0).length;
   console.log('  '+lbl.padEnd(26)+' '+f(tot/G)+'/game · in '+f(100*inG/G,0)+'% of games');});
// 5 · winning openings (first three stations)
console.log('\n-- openings (first 3 stations) · winners vs field --');
const seq={};rows.forEach(r=>{const s=(seq[r.open]=seq[r.open]||{w:0,n:0});s.n++;s.w+=r.win;});
Object.keys(seq).filter(k=>seq[k].n>=10).sort((a,b)=>seq[b].w/seq[b].n-seq[a].w/seq[a].n).slice(0,8)
 .forEach(k=>{console.log('  '+(k||'—').padEnd(5)+' win '+f(100*seq[k].w/seq[k].n,1)+'%  (n='+seq[k].n+')'+'   [A=Market B=Brewhouse C=Harbor D=Cellar]');});
fs.writeFileSync(path.join(__dirname,'profile-v45g-rows.json'),JSON.stringify(rows));
console.log('\nrows dumped: playtests/profile-v45g-rows.json');
