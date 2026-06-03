// Brewhouse of the Hanse — BLEND-BALANCE simulation (v0.4 economy model).
//
// Goal: test the Great Western Trail ideal — NO PURE PATH WINS; the winner runs a
// blend of two, and the winning blend varies by board. We measure blend win-rate vs
// pure win-rate across randomly-composed 2/3/4p tables.
//
// Three leanings, each a weight (wR reach / wS standing / wE engine) driving a greedy
// policy. Models the interdependence levers from DESIGN.md (GWT revision):
//   - goal-matching DNA: enshrined casks score against your reach/board state (g1..g10)
//   - value-track diminishing returns (flooding a type tanks its tokens)
//   - majorities need presence (reach) but reward commitment
//   - reach multipliers: extra vessels, owned ships (passive presence + tolls), saturation bounty
//
//   node playtests/blend-sim.js [games] [capRounds]

// ---------------- tunable constants (⚙) ----------------
const TYPES=['Gruit','Hopped','L3','L4','L5'], Q=[1,2,3,4,5];
const STEPS=[2,3,3,4,5], STANDING=[0,3,5,7,10];
const START_VAL=[3,4,6,8,11], VAL_FLOOR=[1,1,2,3,4], DECAY=1; // gradient restored: high types mint more → Engine's primary ⚙
const FRONTIER_UNLOCK=[0,0,6,14,24];
const SUMMIT=['Bock','Mumme','Broyhan','Keut'];
const COST=[ [{g:1,h:0,steps:2}],
  [{g:1,h:1,steps:3},{g:2,h:1,steps:2}],
  [{g:1,h:2,steps:3},{g:2,h:1,steps:3}],
  [{g:2,h:2,steps:4},{g:3,h:1,steps:4}],
  [{g:2,h:2,steps:5},{g:3,h:2,steps:5}] ];
// reach economy ⚙
const SHIP_PASSIVE=0.5;      // chance/round of passive presence per owned ship (cap-fire+sail)
const SHIP_TOLL=0;           // passive token faucet REMOVED (was the runaway) — ships give volume, not free tokens
const SAT_BONUS=2;           // VP tokens to whoever fills a city to cap (arms the end clock)
const MAJ_VP=3;              // end VP per route majority (base, on top of goal g6)
const SHIP_MAX=2;

function caps(n){                                              // tighter so 2-of-4 fires ~round 18-22 ⚙
  if(n<=2)return {bruges:4,london:3,bergen:2,novgorod:4};
  if(n===3)return {bruges:5,london:4,bergen:3,novgorod:5};
  return {bruges:6,london:5,bergen:4,novgorod:6};}
const ROUTE_KEYS=['bruges','london','bergen','novgorod'];
const GATE={bruges:1,london:2,bergen:2,novgorod:3};
const LANE_BASE={bruges:2,london:3,bergen:3,novgorod:4};        // presence×laneVal is reach's main board score
const LANE_MAX={bruges:4,london:5,bergen:5,novgorod:6};         // cap stacking so reach can't run away ⚙

// ---------------- goals (the GWT coupling) ----------------
const totalPres=p=>ROUTE_KEYS.reduce((a,r)=>a+(p.pres[r]||0),0);
const majorities=(G,p)=>ROUTE_KEYS.filter(r=>{const v=Object.values(G.pres[r]);const mine=G.pres[r][p.id]||0;
  return mine>0&&mine===Math.max(...v)&&v.filter(x=>x===mine).length===1;}).length;
// D — CYCLE THE COUPLINGS (full 3-way symmetric pool). Goals ride on enshrined casks, but
// the pool is balanced 3 reach-rewarding + 3 standing-rewarding + 3 engine-rewarding, all
// modest and capped (best-3 score). Every PURE path is missing two of three legs, so it
// can only fill ~1/3 of its drawn goals → must blend; which blend wins varies by the deal.
const distinctEnsh=p=>new Set(p.enshrined.map(e=>e.t)).size;
const topEnsh=p=>p.enshrined.reduce((m,e)=>Math.max(m,e.t),0);
const GOALS=[
  // reward REACH (presence / majorities) — pushes a Standing holder toward RS
  {id:'g1',rew:'R',fn:(G,p)=>Math.min(4,ROUTE_KEYS.filter(r=>(p.pres[r]||0)>0).length)},
  {id:'g2',rew:'R',fn:(G,p)=>Math.floor(totalPres(p)/2)},
  {id:'g6',rew:'R',fn:(G,p)=>4*Math.min(2,majorities(G,p))},
  // reward STANDING (quality / sets — capped, NOT raw volume) — pushes Engine/Reach holder toward S
  {id:'g3',rew:'S',fn:(G,p,c)=>Math.min(6,2*Math.max(0,p.enshrined.filter(e=>e.t===c.t).length-1))},
  {id:'g4',rew:'S',fn:(G,p)=>Math.min(6,2*p.enshrined.filter(e=>e.t>=3).length)},
  {id:'g10',rew:'S',fn:()=>3},
  // reward ENGINE (book / variety / climb) — pushes a Standing holder toward SE
  {id:'gE',rew:'E',fn:(G,p)=>2*Math.max(0,Object.keys(p.book).length-1)},
  {id:'gV',rew:'E',fn:(G,p)=>2*distinctEnsh(p)},
  {id:'g8',rew:'E',fn:(G,p)=>2*p.rooms},
];

// ---------------- RNG ----------------
let seed=1; const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
const ri=n=>Math.floor(rnd()*n); const pick=a=>a[ri(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=ri(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};

// ---------------- archetypes (lean weights) ----------------
const ARCH={
  'R·reach'    :{R:1.0,S:0.05,E:0.1},
  'S·standing' :{R:0.05,S:1.0,E:0.1},
  'E·engine'   :{R:0.1,S:0.1,E:1.0},
  'RS·blend'   :{R:0.65,S:0.65,E:0.15},
  'RE·blend'   :{R:0.65,S:0.15,E:0.65},
  'SE·blend'   :{R:0.15,S:0.65,E:0.65},
  'RSE·balance':{R:0.5,S:0.5,E:0.5},
};
const PURE=['R·reach','S·standing','E·engine'];
const ARCH_KEYS=Object.keys(ARCH);

// ---------------- game ----------------
function fresh(n){
  const summit=shuffle(SUMMIT).slice(0,3);
  const G={n,turn:0,round:0,ending:false,endReason:null,cap:caps(n),
    unlocked:[true,true,false,false,false],value:START_VAL.slice(),soldTotal:0,
    pres:Object.fromEntries(ROUTE_KEYS.map(r=>[r,{}])),
    laneVal:Object.fromEntries(ROUTE_KEYS.map(r=>[r,r==='bruges'?LANE_BASE.bruges:0])),
    open:Object.fromEntries(ROUTE_KEYS.map(r=>[r,r==='bruges'])),
    summit,players:[],saleLog:[]};
  for(let i=0;i<n;i++)G.players.push({id:i,grain:3,hops:2,storage:8,
    book:{0:COST[0][0],1:pick(COST[1])},vessels:[null],maxVessels:1,
    vp:0,enshrined:[],pres:{},ships:[],rooms:0,lean:null,tag:null});
  return G;
}
const canPay=(p,c)=>p.grain>=(c.g||0)&&p.hops>=(c.h||0);
const pay=(p,c)=>{p.grain-=(c.g||0);p.hops-=(c.h||0);};
const gain=(p,g,h)=>{p.grain=Math.min(p.storage,p.grain+(g||0));p.hops=Math.min(p.storage,p.hops+(h||0));};
const filled=(G,r)=>Object.values(G.pres[r]).reduce((a,b)=>a+b,0);
const satCount=G=>ROUTE_KEYS.filter(r=>filled(G,r)>=G.cap[r]).length;
const readyIdx=p=>p.vessels.findIndex(v=>v&&v.step>=v.ready);
const emptyIdx=p=>p.vessels.findIndex(v=>v===null);

function frontier(G){for(let t=2;t<5;t++)if(!G.unlocked[t]&&G.soldTotal>=FRONTIER_UNLOCK[t]){
  G.unlocked[t]=true;for(let k=0;k<t;k++)G.value[k]=Math.max(VAL_FLOOR[k],G.value[k]-1);}}
function mint(G,p,t){const v=G.value[t];p.vp+=v;G.soldTotal++;G.value[t]=Math.max(VAL_FLOOR[t],G.value[t]-DECAY);frontier(G);return v;}

function addPres(G,p,r){G.pres[r][p.id]=(G.pres[r][p.id]||0)+1;p.pres[r]=(p.pres[r]||0)+1;
  if(filled(G,r)>=G.cap[r])p.vp+=SAT_BONUS;}                 // saturation bounty

// best goal a ready cask of type t could score right now (goal-aware enshrine)
function bestGoal(G,p,t){let best={g:GOALS[GOALS.length-1],v:-1};
  for(const g of GOALS){const v=g.fn(G,p,{t});if(v>best.v)best={g,v};}return best;}

function eligible(G,t){return ROUTE_KEYS.filter(r=>G.open[r]&&Q[t]>=GATE[r]&&filled(G,r)<G.cap[r]);}

// ---------------- bot policy ----------------
function actValues(G,p){
  const L=p.lean, out=[];
  const ri_=readyIdx(p);
  if(ri_>=0){const t=p.vessels[ri_].t, val=G.value[t];
    if(STANDING[t]>0){const bg=bestGoal(G,p,t);
      out.push({a:'enshrine',vi:ri_,t,score:L.S*(STANDING[t]+bg.v*1.0)+val*0.6+L.E*val*0.3,goal:bg.g.id});}
    const el=eligible(G,t);
    if(el.length){el.sort((a,b)=>{
        const ca=G.cap[a]-filled(G,a),cb=G.cap[b]-filled(G,b);
        const closeA=ca<=1?SAT_BONUS:0,closeB=cb<=1?SAT_BONUS:0;
        return (G.laneVal[b]+closeB)-(G.laneVal[a]+closeA);});
      const r=el[0],close=(G.cap[r]-filled(G,r))<=1?SAT_BONUS:0;
      out.push({a:'ship',vi:ri_,t,r,score:L.R*(G.laneVal[r]*1.4+close+(r==='novgorod'?2:0))+val*0.6+L.E*val*0.3});}
  }
  // collect a higher recipe (engine)
  for(let t=4;t>=2;t--)if(G.unlocked[t]&&!p.book[t]){const buy={g:t-1,h:t>=2?1:0};
    if(canPay(p,buy)){out.push({a:'collect',t,buy,score:L.E*(2.2+t*0.3)});break;}}
  // build ship (reach multiplier)
  if(p.ships.length<SHIP_MAX&&canPay(p,{g:2})){const r=ROUTE_KEYS.filter(x=>G.open[x]).sort((a,b)=>G.laneVal[b]-G.laneVal[a])[0];
    if(r)out.push({a:'ship_build',r,score:L.R*2.0});}
  // open a new lane OR stack value onto an open one (reach authors the scoring landscape)
  {let did=false;
   for(const r of ROUTE_KEYS)if(!G.open[r]&&canPay(p,{g:2,h:r==='novgorod'?1:0})){
     out.push({a:'lane',r,open:true,score:L.R*2.2+(r==='novgorod'?L.S*0.5:0)});did=true;break;}
   if(!did&&canPay(p,{g:2})){const r=ROUTE_KEYS.filter(x=>G.open[x]&&G.laneVal[x]<LANE_MAX[x]).sort((a,b)=>(p.pres[b]||0)-(p.pres[a]||0))[0];
     if(r&&(p.pres[r]||0)>0)out.push({a:'lane',r,open:false,score:L.R*1.4});}}
  // extra vessel (throughput — engine/reach)
  if(p.maxVessels<3&&canPay(p,{g:3}))out.push({a:'vessel',score:(L.E+L.R)*1.1});
  // brew: load if possible else advance
  const ev=emptyIdx(p);
  let loadT=-1;{const av=Object.keys(p.book).map(Number).filter(t=>G.unlocked[t]&&canPay(p,p.book[t]));
    if(av.length){av.sort((a,b)=>(L.E?b-a:a-b));loadT=av[0];}}
  if(ev>=0&&loadT>=0)out.push({a:'brew_load',t:loadT,score:1.4+(L.E?loadT*0.15:0)});
  else if(p.vessels.some(v=>v&&v.step<v.ready))out.push({a:'brew_adv',score:1.2});
  // market goods (fallback)
  out.push({a:'market',score:(p.grain+p.hops<3)?2.0:0.6});
  return out;
}
function advAll(p){p.vessels.forEach(v=>{if(v&&v.step<v.ready)v.step++;});}
function step(G,p){
  const cands=actValues(G,p);
  cands.forEach(c=>c.score+=rnd()*0.05);
  cands.sort((a,b)=>b.score-a.score);
  const c=cands[0];
  switch(c.a){
    case 'enshrine':{const v=mint(G,p,c.t);p.enshrined.push({t:c.t,goal:c.goal});p.vessels[c.vi]=null;break;}
    case 'ship':{addPres(G,p,c.r);mint(G,p,c.t);p.vessels[c.vi]=null;break;}
    case 'collect':{pay(p,c.buy);p.book[c.t]=pick(COST[c.t]);break;}
    case 'ship_build':{pay(p,{g:2});p.ships.push({r:c.r});break;}
    case 'lane':{if(c.open){pay(p,{g:2,h:c.r==='novgorod'?1:0});G.open[c.r]=true;G.laneVal[c.r]+=LANE_BASE[c.r];}
      else{pay(p,{g:2});G.laneVal[c.r]=Math.min(LANE_MAX[c.r],G.laneVal[c.r]+2);}break;}
    case 'vessel':{pay(p,{g:3});p.maxVessels++;p.vessels.push(null);p.rooms++;break;}
    case 'brew_load':{pay(p,p.book[c.t]);const ev=emptyIdx(p);p.vessels[ev]={t:c.t,step:0,ready:p.book[c.t].steps};advAll(p);break;}
    case 'brew_adv':advAll(p);break;
    case 'market':gain(p,2,1);break;
  }
  return c.a;
}
// passive ship income each round — owned ships give VOLUME (presence), not free tokens
function shipIncome(G){for(const p of G.players)for(const s of p.ships){
  if(SHIP_TOLL)p.vp+=SHIP_TOLL;
  if(G.open[s.r]&&filled(G,s.r)<G.cap[s.r]&&rnd()<SHIP_PASSIVE)addPres(G,p,s.r);}}

const GOAL_CAP=3;  // only your best-N goals score → enshrine-spam stops running away ⚙
function score(G,p){
  let reach=0;for(const r of ROUTE_KEYS)reach+=(p.pres[r]||0)*G.laneVal[r];
  const maj=MAJ_VP*majorities(G,p);
  const stand=p.enshrined.reduce((a,e)=>a+STANDING[e.t],0);
  const gvals=p.enshrined.map(e=>GOALS.find(g=>g.id===e.goal).fn(G,p,e)).sort((a,b)=>b-a);
  const goals=gvals.slice(0,GOAL_CAP).reduce((a,b)=>a+b,0);
  return {reach,maj,stand,goals,vp:p.vp,total:reach+maj+stand+goals+p.vp};
}

function play(G,cap){
  for(let round=1;round<=cap;round++){G.round=round;
    for(let s=0;s<G.n;s++){G.turn++;step(G,G.players[s]);}
    shipIncome(G);
    if(!G.ending&&satCount(G)>=2){G.ending=true;G.endReason='cities';}
    else if(G.ending)break;
  }
  if(!G.endReason)G.endReason='cap';
  return G;
}

// ---------------- batch ----------------
function batch(n,games,cap){
  const A={};ARCH_KEYS.forEach(k=>A[k]={play:0,win:0,scoreSum:0,brk:{reach:0,maj:0,stand:0,goals:0,vp:0}});
  let endCities=0,roundSum=0,winnerBlend=0,winnerPure=0;
  for(let g=0;g<games;g++){
    seed=((g+1)*2654435761+n*40503)>>>0;
    const G=fresh(n);
    const tags=shuffle(ARCH_KEYS).slice(0,n);            // random table composition
    G.players.forEach((p,i)=>{p.tag=tags[i];p.lean=ARCH[tags[i]];});
    play(G,cap);
    if(G.endReason==='cities')endCities++; roundSum+=G.round;
    const rows=G.players.map(p=>({tag:p.tag,sc:score(G,p)})).sort((a,b)=>b.sc.total-a.sc.total);
    rows.forEach(r=>{const a=A[r.tag];a.play++;a.scoreSum+=r.sc.total;
      for(const k in a.brk)a.brk[k]+=r.sc[k];});
    A[rows[0].tag].win++;
    if(PURE.includes(rows[0].tag))winnerPure++;else winnerBlend++;
  }
  return {A,games,endCities,roundSum,winnerBlend,winnerPure};
}
const pct=(x,d)=>d?(100*x/d).toFixed(0)+'%':'—';
function report(n,R){
  const o=[],G=R.games;
  o.push(`\n############ ${n}-PLAYER · ${G} games · random tables ############`);
  o.push(`End via 2-of-4-cities ${pct(R.endCities,G)} · avg ending round ${(R.roundSum/G).toFixed(1)} · caps ${JSON.stringify(caps(n))}`);
  o.push(`WINNER was a BLEND ${pct(R.winnerBlend,G)}  vs  a PURE path ${pct(R.winnerPure,G)}   ← GWT target: blends >> pures`);
  o.push('\n  Archetype       play  wins  win%   avgScore  (reach/maj/stand/goals/VPtok)');
  ARCH_KEYS.forEach(k=>{const a=A_row(R.A[k]);if(!a.play)return;
    o.push('  '+k.padEnd(13)+String(a.play).padStart(5)+String(a.win).padStart(6)+pct(a.win,a.play).padStart(6)
      +(a.scoreSum/a.play).toFixed(1).padStart(10)+'  '+`${(a.brk.reach/a.play).toFixed(1)}/${(a.brk.maj/a.play).toFixed(1)}/${(a.brk.stand/a.play).toFixed(1)}/${(a.brk.goals/a.play).toFixed(1)}/${(a.brk.vp/a.play).toFixed(1)}`);});
  return o.join('\n');
}
const A_row=a=>a;

const GAMES=parseInt(process.argv[2]||'500',10),CAP=parseInt(process.argv[3]||'30',10);
console.log(`Brewhouse BLEND-balance sim · ${GAMES} games/config · 3 pure + 4 blend archetypes · random tables`);
[2,3,4].forEach(n=>console.log(report(n,batch(n,GAMES,CAP))));
