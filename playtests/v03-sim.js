// Brewhouse of the Hanse — v0.3 ECONOMY simulation.
//
// This is NOT the full action-grid engine (that lives in play.html and is exercised by
// multi-sim.js). It is an abstract economic model of the v0.3 subsystems that did not
// exist in the engine yet, built to answer: do the NEW mechanics interlock?
//   - recipe book with variable per-instance cost profiles
//   - type ladder: anchored Gruit->Hopped spine + variable historical summit (L3-L5)
//   - type VALUE TRACK that decays as a type's market saturates (production-driven)
//   - VP TOKENS minted on every sale (ship OR enshrine), scaled by current type value
//   - end trigger = 2 of 4 kontor cities saturated
// Turn = one of the four cell-actions (Market / Brewhouse / Harbor / Kontor), one per turn,
// matching the real "one line per turn" tempo.
//
//   node playtests/v03-sim.js [games] [capRounds] [trace]
//     trace = print a turn-by-turn log of one 3p game

// ---------- config (all ⚙ placeholders, mirrors the docs) ----------
const TYPES   = ['Gruit','Hopped','L3','L4','L5'];      // L3-L5 reskinned per game from the summit roster
const Q       = [1,2,3,4,5];
const STEPS   = [2,3,3,4,5];                            // brew length LOAD->READY (RULES §2)
const STANDING= [0,3,5,7,10];                           // printed standing (gruit can't enshrine)
const START_VAL=process.env.FLAT?[7,7,7,7,7]:[5,6,7,9,12]; // value-track start per type (FLAT=1 flattens the gradient)
const VAL_FLOOR=[2,2,3,3,4];
const DECAY   = 1;                                      // value lost per sale of that type
const FRONTIER_UNLOCK=[0,0,6,14,24];                    // cumulative league sales that unlock L3/L4/L5
const SUMMIT_POOL=['Bock','Mumme','Broyhan','Keut'];    // historical Hanse beers dealt to L3-L5
const ROUTES = {
  bruges  :{cap:8,gate:1,val:1},
  london  :{cap:6,gate:2,val:2},
  bergen  :{cap:5,gate:2,val:2},
  novgorod:{cap:9,gate:3,val:3},
};
// recipe cost-profile variants (the "two Dubbels cost differently" lever)
const COST_VARIANTS={
  0:[{g:1,h:0,steps:2}],
  1:[{g:1,h:1,steps:3},{g:2,h:1,steps:2}],              // a faster-but-pricier Hopped
  2:[{g:1,h:2,steps:3},{g:2,h:1,steps:3},{g:2,h:0,steps:4}],
  3:[{g:2,h:2,steps:4},{g:3,h:1,steps:4},{g:1,h:3,steps:3}],
  4:[{g:2,h:2,steps:5},{g:3,h:2,steps:5}],
};

// ---------- seedable RNG ----------
let seed=1; const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
const ri=n=>Math.floor(rnd()*n);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=ri(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};

// ---------- archetypes ----------
const ARCH=[
  {tag:'REACH/volume',  lean:'reach',  climb:0.25},
  {tag:'QUALITY/stand', lean:'quality',climb:0.9 },
  {tag:'HYBRID',        lean:'hybrid', climb:0.6 },
  {tag:'TEMPO/wide',    lean:'reach',  climb:0.45},
];

function freshGame(n){
  const summit=shuffle(SUMMIT_POOL).slice(0,3);          // deal 3 historical beers to L3-L5
  const G={
    n, turn:0, round:0, ending:false, endReason:null,
    unlocked:[true,true,false,false,false],
    value:START_VAL.slice(),
    soldTotal:0, soldByType:[0,0,0,0,0],
    routes:Object.fromEntries(Object.keys(ROUTES).map(r=>[r,{pres:{}}])),
    summit, players:[],
    saleLog:[],                                          // {turn,type,val,mode}
  };
  for(let i=0;i<n;i++){
    // start: gruit baseline + 2 random premium recipes from currently-unlocked tiers (just Hopped at start -> plus a peek tier)
    const book={0:COST_VARIANTS[0][0], 1:pickVariant(1)};
    G.players.push({id:i,arch:null,grain:3,hops:2,storage:8,
      vessels:[null], maxVessels:1, book, vp:0, enshrined:[], goals:0, pres:{}, sales:0});
  }
  return G;
}
function pickVariant(t){const v=COST_VARIANTS[t];return {...v[ri(v.length)], t};}

const canPay=(p,c)=>p.grain>=(c.g||0)&&p.hops>=(c.h||0);
const pay=(p,c)=>{p.grain-=(c.g||0);p.hops-=(c.h||0);};
const gain=(p,g,h)=>{p.grain=Math.min(p.storage,p.grain+(g||0));p.hops=Math.min(p.storage,p.hops+(h||0));};
const routeFilled=(G,r)=>Object.values(G.routes[r].pres).reduce((a,b)=>a+b,0);
const citiesSaturated=G=>Object.keys(ROUTES).filter(r=>routeFilled(G,r)>=ROUTES[r].cap).length;
const readyVessel=p=>{for(let i=0;i<p.vessels.length;i++){const v=p.vessels[i];if(v&&v.step>=v.ready)return i;}return -1;};
const emptyVessel=p=>p.vessels.findIndex(v=>v===null);

// frontier advance: cumulative league production unlocks summit tiers + discounts older ones
function checkFrontier(G,log){
  for(let t=2;t<5;t++){
    if(!G.unlocked[t] && G.soldTotal>=FRONTIER_UNLOCK[t]){
      G.unlocked[t]=true;
      // heritage discount: every already-unlocked lower tier ticks down
      for(let k=0;k<t;k++) G.value[k]=Math.max(VAL_FLOOR[k],G.value[k]-1);
      if(log)log(`  ▲ FRONTIER: ${TYPES[t]} (${G.summit[t-2]}) unlocks — recipes enter the Market; older types discounted. values=[${G.value}]`);
    }
  }
}

// a sale (ship or enshrine): mint VP tokens = current value, then saturate that type
function sell(G,p,t,mode,log){
  const val=G.value[t];
  p.vp+=val; p.sales++;
  G.soldTotal++; G.soldByType[t]++;
  G.value[t]=Math.max(VAL_FLOOR[t],G.value[t]-DECAY);
  G.saleLog.push({turn:G.turn,type:t,val,mode});
  if(log)log(`    $ ${mode} ${TYPES[t]} → +${val} VP tokens (value now ${G.value[t]}). league sold=${G.soldTotal}`);
  checkFrontier(G,log);
}

function eligibleRoutes(G,t){
  return Object.keys(ROUTES).filter(r=>Q[t]>=ROUTES[r].gate && routeFilled(G,r)<ROUTES[r].cap && G.unlocked[t]);
}
function bestLoadType(G,p){
  // pick the highest unlocked type in the book the player can pay for & (climb) wants
  const avail=Object.keys(p.book).map(Number).filter(t=>G.unlocked[t]&&canPay(p,p.book[t]));
  if(!avail.length)return -1;
  avail.sort((a,b)=>b-a);                                // prefer higher type
  return avail[0];
}
function maybeCollectRecipe(G,p){
  // collect the highest unlocked tier not yet in book, if affordable (buy cost ~ tier)
  for(let t=4;t>=1;t--){
    if(G.unlocked[t]&&!p.book[t]){const buy={g:t<=1?1:t-1,h:t>=2?1:0};
      if(canPay(p,buy)){pay(p,buy);p.book[t]=pickVariant(t);return t;}}
  }
  return -1;
}

// ---------- bot turn (one cell-action) ----------
function botTurn(G,p,log){
  const arch=p.arch, rv=readyVessel(p);
  // 1) sell a ready cask
  if(rv>=0){
    const cask=p.vessels[rv], t=cask.t;
    const wantEnshrine = (arch.lean==='quality'||(arch.lean==='hybrid'&&rnd()<0.5)) && STANDING[t]>0;
    if(wantEnshrine){
      p.vessels[rv]=null; p.enshrined.push({t}); p.goals+=2;            // abstract goal avg ⚙
      sell(G,p,t,'ENSHRINE',log); return 'Kontor';
    }
    const elig=eligibleRoutes(G,t);
    if(elig.length){
      // reach bots push toward filling cities (smallest remaining capacity first); else highest route value
      elig.sort((a,b)=>{
        const ra=ROUTES[a].cap-routeFilled(G,a), rb=ROUTES[b].cap-routeFilled(G,b);
        if(arch.lean!=='quality'&&ra!==rb)return ra-rb;
        return ROUTES[b].val-ROUTES[a].val;});
      const r=elig[0];
      G.routes[r].pres[p.id]=(G.routes[r].pres[p.id]||0)+1; p.pres[r]=(p.pres[r]||0)+1;
      p.vessels[rv]=null; sell(G,p,t,'SHIP→'+r,log); return 'Harbor';
    }
    if(STANDING[t]>0){ // can't ship (no eligible route), enshrine instead
      p.vessels[rv]=null; p.enshrined.push({t}); p.goals+=2; sell(G,p,t,'ENSHRINE',log); return 'Kontor';
    }
  }
  // 2) quality bot collects a higher recipe when idle-ish
  if(arch.lean!=='reach' && rnd()<arch.climb){const ct=maybeCollectRecipe(G,p);if(ct>=0){if(log)log(`    + collects ${TYPES[ct]} recipe (cost profile ${JSON.stringify(p.book[ct])})`);return 'Market(recipe)';}}
  // 3) load a brew if a vessel is free
  const ev=emptyVessel(p);
  if(ev>=0){
    const t=bestLoadType(G,p);
    if(t>=0){pay(p,p.book[t]);p.vessels[ev]={t,step:0,ready:p.book[t].steps};
      // advance all (the Brewhouse fire advances all + loads)
      p.vessels.forEach(v=>{if(v&&v.step<v.ready)v.step++;});
      if(log)log(`    ⚙ loads ${TYPES[t]} (${JSON.stringify(p.book[t])}); advance all`);return 'Brewhouse(load)';}
  }
  // 4) advance brews if any in progress
  if(p.vessels.some(v=>v&&v.step<v.ready)){p.vessels.forEach(v=>{if(v&&v.step<v.ready)v.step++;});if(log)log('    ⚙ Brewhouse: advance all');return 'Brewhouse(adv)';}
  // 5) gather goods
  gain(p,2,1); if(log)log('    ⛵ Market: +2G +1H'); return 'Market(goods)';
}

// ---------- scoring (RULES §6) ----------
function score(G,p){
  let reach=0; for(const r in ROUTES) reach+=(p.pres[r]||0)*ROUTES[r].val;
  let maj=0; for(const r in ROUTES){const pr=G.routes[r].pres;const mine=pr[p.id]||0;
    if(mine>0&&mine===Math.max(...Object.values(pr))&&Object.values(pr).filter(v=>v===mine).length===1)maj+=4;}
  const stand=p.enshrined.reduce((a,c)=>a+STANDING[c.t],0);
  const goals=p.goals, vp=p.vp;
  return {reach,maj,stand,goals,vp,total:reach+maj+stand+goals+vp};
}

// ---------- run one game ----------
function playGame(G,cap,log){
  const order=shuffle([...Array(ARCH.length).keys()]).slice(0,G.n);
  G.players.forEach((p,i)=>p.arch=ARCH[order[i%order.length]]);
  if(log){log(`\n=== ${G.n}p game · summit dealt: L3=${G.summit[0]} L4=${G.summit[1]} L5=${G.summit[2]} ===`);
    log('seats: '+G.players.map(p=>p.arch.tag).join(', '));}
  for(let round=1;round<=cap;round++){
    G.round=round;
    for(let s=0;s<G.n;s++){
      G.turn++; const p=G.players[s];
      if(log)log(`T${round}.${s} ${p.arch.tag.padEnd(13)} [G${p.grain}H${p.hops} vp${p.vp} ens${p.enshrined.length} pres${Object.values(p.pres).reduce((a,b)=>a+b,0)}]`);
      const act=botTurn(G,p,log);
      if(log&&act&&!/→|\$|⚙|\+|⛵/.test(act)){}
    }
    const sat=citiesSaturated(G);
    if(!G.ending && sat>=2){G.ending=true;G.endReason=`2/4 cities saturated (round ${round})`;
      if(log)log(`  ★ ${G.endReason} — FINAL ROUND`);}
    else if(G.ending){break;}                            // we already played the final round
  }
  if(!G.endReason)G.endReason=`cap ${cap} reached`;
  return G;
}

// ---------- batch ----------
function batch(n,games,cap){
  const agg={games:0,end2city:0,endCap:0,rounds:[],frontierMax:[],
    byArch:{}, winsByArch:{}, playByArch:{}, brk:{},
    tokensThirds:[[],[],[]], summitWins:{}};
  ARCH.forEach(a=>{agg.winsByArch[a.tag]=0;agg.playByArch[a.tag]=0;agg.byArch[a.tag]=0;agg.brk[a.tag]={reach:0,maj:0,stand:0,goals:0,vp:0};});
  for(let g=0;g<games;g++){
    seed=((g+1)*2654435761+n*40503)>>>0;
    const G=playGame(freshGame(n),cap,null);
    agg.games++;
    if(G.endReason.startsWith('2/4'))agg.end2city++;else agg.endCap++;
    agg.rounds.push(G.round);
    agg.frontierMax.push(G.unlocked.lastIndexOf(true));
    // tokens/sale by third of the game (does early-selling pay more?)
    const maxT=G.turn||1;
    G.saleLog.forEach(s=>{const third=Math.min(2,Math.floor((s.turn/maxT)*3));agg.tokensThirds[third].push(s.val);});
    const rows=G.players.map(p=>({arch:p.arch.tag,sc:score(G,p)})).sort((a,b)=>b.sc.total-a.sc.total);
    rows.forEach(r=>{agg.playByArch[r.arch]++;agg.byArch[r.arch]+=r.sc.total;
      ['reach','maj','stand','goals','vp'].forEach(k=>agg.brk[r.arch][k]+=r.sc[k]);});
    agg.winsByArch[rows[0].arch]++;
  }
  return agg;
}
const avg=(a)=>a.length?(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1):'—';
const pct=(x,d)=>d?(100*x/d).toFixed(0)+'%':'—';
function report(n,a){
  const G=a.games,o=[];
  o.push(`\n############ ${n}-PLAYER · ${G} games ############`);
  o.push(`End trigger: 2-of-4-cities ${pct(a.end2city,G)} · hit round-cap ${pct(a.endCap,G)}  · avg ending round ${avg(a.rounds)} · avg top tier reached L${(a.frontierMax.reduce((x,y)=>x+y,0)/G+1).toFixed(1)}`);
  o.push(`Tokens minted per sale, by game-third (early→late): ${avg(a.tokensThirds[0])} → ${avg(a.tokensThirds[1])} → ${avg(a.tokensThirds[2])}   (should DECLINE if value-decay works)`);
  o.push('\n  Archetype       play  wins  win%   avgScore   (reach/maj/stand/goals/VPtok)');
  Object.keys(a.winsByArch).forEach(t=>{const pl=a.playByArch[t];if(!pl)return;const b=a.brk[t];
    o.push('  '+t.padEnd(14)+String(pl).padStart(4)+String(a.winsByArch[t]).padStart(6)+pct(a.winsByArch[t],pl).padStart(6)
      +(a.byArch[t]/pl).toFixed(1).padStart(10)+'   '+`${(b.reach/pl).toFixed(1)}/${(b.maj/pl).toFixed(1)}/${(b.stand/pl).toFixed(1)}/${(b.goals/pl).toFixed(1)}/${(b.vp/pl).toFixed(1)}`);});
  return o.join('\n');
}

// ---------- main ----------
const GAMES=parseInt(process.argv[2]||'300',10);
const CAP=parseInt(process.argv[3]||'30',10);
const TRACE=process.argv[4]==='trace';
console.log(`Brewhouse v0.3 economy sim · ${GAMES} games/config · cap ${CAP} rounds`);
[2,3,4].forEach(n=>console.log(report(n,batch(n,GAMES,CAP))));
if(TRACE){console.log('\n\n================ SAMPLE 3p GAME TRACE ================');
  seed=12345; playGame(freshGame(3),CAP,m=>console.log(m));}
