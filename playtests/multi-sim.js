// ⚠ STALE (pre-v0.5): targets the retired ship-cargo/deliverCask API. Needs a rewrite to the v0.5
// deploy/enshrine + demand-market engine before it will run. See DESIGN.md §19 v0.5.
// Multi-game engine simulation for Brewhouse of the Hanse.
// Runs many games (each a distinct seed → distinct random openings + bot tie-breaks)
// against the REAL play.html engine, headlessly. Aggregates the ship-toll economy,
// recipe economy, end-clock behaviour, and win rates by archetype / starting recipe.
//
//   node playtests/multi-sim.js [games] [cap_rounds]
//
// Requires /tmp/play.js (extract: awk '/<script>/{f=1;next} /<\/script>/{f=0} f' play.html > /tmp/play.js)

const elm=()=>({classList:{add(){},remove(){},toggle(){}},style:{},set innerHTML(v){},get innerHTML(){return''},set textContent(v){},value:''});
global.document={getElementById:()=>elm()};global.localStorage={getItem(){return null},setItem(){}};
global.alert=m=>{throw new Error('ALERT:'+m)};global.window={};

// seedable LCG; reseeded per game
let seed=1;
Math.random=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};

let src=require('fs').readFileSync('/tmp/play.js','utf8').replace(/\(function boot\(\)\{[\s\S]*\}\)\(\);\s*$/,'');
src+=`;globalThis.E={get S(){return S},set S(v){S=v},get UI(){return UI},set UI(v){UI=v},
 freshState,cur,CELLNAME,cellOfLine,ADJ,LINES,SLOTS,STYLES,ROUTES,SHOP,routeFilled,endN,
 doMove,chooseLine,marketGoods,buyTile,placeTile,emptySlots,brewAdvance,brewLoad,readyCasks,
 shipStart,shipPick,shipRoute,shipBuyRoute,shipsWithRoom,deliverCask,quayFallback,kontorTop,enshrineStart,enshrineReady,cellDone,
 gain,advanceAll,canPay,scorePlayer,endTurn,enshrinedTotal};`;
eval(src);
const E=globalThis.E,{CELLNAME,cellOfLine,ADJ,LINES,SLOTS,STYLES,ROUTES,SHOP}=E;

// ---- archetype profiles (improved to actually build & use ships) ----
const ARCH=[
 {tag:'VOLUME/reach',   reachW:2.4, standW:0.4, maxShips:2, enshrineTurn:99,
  wish:['s_cog','m_vessel','l_london','s_hulk','l_bergen','r_hopped'], loads:['hopped','gruit','dubbel']},
 {tag:'QUALITY/standing',reachW:0.6, standW:2.4, maxShips:0, enshrineTurn:1,
  wish:['m_vessel','r_dubbel','m_count','r_tripel','m_cellar'], loads:['tripel','dubbel','hopped']},
 {tag:'ENGINE/hybrid',  reachW:1.2, standW:1.3, maxShips:1, enshrineTurn:5,
  wish:['m_vessel','s_cog','m_larder','l_bergen','r_hopped'], loads:['hopped','dubbel','gruit']},
 {tag:'TEMPO/wide',     reachW:1.8, standW:0.9, maxShips:2, enshrineTurn:7,
  wish:['s_cog','l_bruges','m_vessel','s_cog','l_london'], loads:['gruit','hopped','dubbel']},
 {tag:'PREMIUM/long',   reachW:1.0, standW:1.8, maxShips:1, enshrineTurn:3,
  wish:['m_vessel','r_tripel','l_novgorod','m_cellar','s_hulk'], loads:['tripel','dubbel','hopped']},
];
const CN=['Crimson','Azure','Forest','Amber','Violet'];
let PROF={}; // id -> profile (assigned per game)

const has=(p,id)=>{const it=SHOP.find(x=>x.id===id);if(it.kind==='route')return E.S.routes[it.route].open;if(it.kind==='room')return p.rooms.includes(it.room)&&it.room!=='vessel';return false;};
const rivalOn=(p,c)=>E.S.players.some(q=>q.id!==p.id&&q.cell===c);
function loadable(p,style){const st=STYLES[style];return p.recipes.includes(style)&&p.vessels.includes(null)&&E.canPay(p,st.in)&&!(st.cellar&&!p.rooms.includes('cellar'));}
function chooseLoad(p){const pr=PROF[p.id];for(const s of pr.loads)if(loadable(p,s))return s;for(const s of ['hopped','gruit','dubbel','tripel'])if(loadable(p,s))return s;return null;}
function shipable(p){const ready=E.readyCasks(p);if(!ready.length)return null;
 for(const o of ready){const open=Object.keys(ROUTES).filter(r=>E.S.routes[r].open&&E.routeFilled(r)<E.S.routes[r].cap&&STYLES[o.c.style].q>=ROUTES[r].gate);
   if(open.length){ // prefer a route where I own a ship with room (fill it → sail dividend); else any ship with room; else highest value
     const r=open.sort((a,b)=>{
       const am=E.shipsWithRoom(a).filter(s=>s.ship.owner===p.id).length, bm=E.shipsWithRoom(b).filter(s=>s.ship.owner===p.id).length;
       if(am!==bm)return bm-am;
       const ar=E.shipsWithRoom(a).length, br=E.shipsWithRoom(b).length; if(ar!==br)return br-ar;
       return E.S.routes[b].value-E.S.routes[a].value;})[0];
     return {vi:o.i,route:r};}}
 return null;}
function enshList(p){const ready=p.vessels.map((c,i)=>({c,i})).filter(o=>o.c&&o.c.step>=o.c.ready&&o.c.enshrine);return {ready};}
function wantEnshrine(p){const pr=PROF[p.id];return E.S.turn>=pr.enshrineTurn&&enshList(p).ready.length;}
function shipCount(p){return SLOTS.filter(s=>{const t=E.S.slots[s.id];return t&&t.type==='ship'&&t.owner===p.id}).length;}
function marketWish(p){const pr=PROF[p.id];for(const id of pr.wish){const it=SHOP.find(x=>x.id===id);if(!it||!E.canPay(p,it.cost))continue;
   if(it.kind==='route'&&!has(p,id)&&E.emptySlots().length)return{tile:id};
   if(it.kind==='room'){if(it.room==='vessel'&&p.maxVessels<3&&p.rooms.length<4)return{tile:id};if(it.room!=='vessel'&&!has(p,id)&&p.rooms.length<4)return{tile:id};}
   if(it.kind==='recipe'&&!p.recipes.includes(it.style)&&STYLES[it.style].lvl<=E.S.frontier)return{tile:id}; // recipes → book, frontier-gated
   if(it.kind==='ship'&&shipCount(p)<pr.maxShips&&E.emptySlots().length&&Object.keys(ROUTES).some(r=>E.S.routes[r].open))return{tile:id};}
 return null;}
function cellValue(p,c){const act=CELLNAME[c],blk=rivalOn(p,c),pr=PROF[p.id];
 if(act==='Market'){const base=(p.grain+p.hops<3)?2.6:(marketWish(p)?2.1:0.9);return blk?Math.min(base,p.rooms.includes('larder')?1.6:1.1):base;}
 if(act==='Brewhouse'){const canLoad=chooseLoad(p),adv=p.vessels.some(v=>v&&v.step<v.ready);let v=canLoad?2.6:(adv?1.9:0.4);if(blk&&!p.rooms.includes('fermenter'))v=adv?1.2:0.3;return v;}
 if(act==='Harbor'){const s=shipable(p);if(!s)return 0.2;if(blk&&!p.rooms.includes('quay'))return 2.0*pr.reachW;return 3.0*pr.reachW;}
 if(act==='Kontor'){return wantEnshrine(p)?3.2*pr.standW:0.9;}
 return 0.5;}
function pickOption(p){const legal=(!p.placed)?['A','B','C','D']:ADJ[p.cell];let best=null;
 for(const cell of legal)for(const lk of ['row','col']){const cells=LINES[cellOfLine(cell)[lk]].cells;const val=cells.reduce((a,c)=>a+cellValue(p,c),0)+Math.random()*0.05;if(!best||val>best.val)best={cell,lk,val};}
 return best;}
function bestOpenRoute(p){return Object.keys(ROUTES).filter(x=>E.S.routes[x].open).sort((a,b)=>E.S.routes[b].value-E.S.routes[a].value)[0];}
function resolveCell(p){const act=CELLNAME[E.UI.cell],blk=E.UI.blocked;
 try{
  if(blk&&act==='Market'){const n=p.rooms.includes('larder')?2:1;E.gain(p,n,0);E.cellDone();return;}
  if(blk&&act==='Brewhouse'&&!p.rooms.includes('fermenter')){E.advanceAll(p);E.cellDone();return;}
  if(blk&&act==='Harbor'&&!p.rooms.includes('quay')){E.quayFallback();return;}
  if(act==='Market'){const w=marketWish(p);if(w){E.buyTile(w.tile);
      if(E.UI.stage==='ship_buy_route')E.shipBuyRoute(bestOpenRoute(p));
      if(E.UI.stage==='place')E.placeTile(E.emptySlots()[0].id);}else{E.marketGoods(p.hops<p.grain-1?'gh':'gg');}return;}
  if(act==='Brewhouse'){E.brewAdvance();const s=chooseLoad(p);if(s)E.brewLoad(s);E.cellDone();return;}
  if(act==='Harbor'){const s=shipable(p);if(!s){E.cellDone();return;}E.shipStart();E.shipPick(s.vi);E.shipRoute(s.route);return;}
  if(act==='Kontor'){if(wantEnshrine(p)){E.enshrineStart();E.enshrineReady(enshList(p).ready[0].i);}else E.kontorTop();return;}
  E.cellDone();
 }catch(e){if(E.UI.sub==='cell')E.cellDone();}}
function botTurn(){const p=E.cur();const o=pickOption(p);E.doMove(o.cell);E.chooseLine(o.lk);let g=0;while(E.UI.sub==='cell'&&g++<24)resolveCell(p);E.endTurn();}

// ---- telemetry from the (deterministic) log ----
const strip=s=>s.replace(/<[^>]+>/g,'');
function tally(lines,T){
 for(const l of lines){
  if(/collects a \+1G toll/.test(l)) T.tolls++;
  else if(/ships .* — loads into/.test(l)) T.harborLoads++;
  else if(/basic shipment/.test(l)) T.basicShips++;
  if(/^↳ .* loads .* \(\d+\/\d+, \+1 presence\)/.test(l)) T.capLoads++;
  if(/waits at the .* dock/.test(l)) T.shipIdle++;
  if(/sails full from/.test(l)){T.sails++;const m=l.match(/— (\d+) casks delivered/);if(m)T.cargo+=+m[1];}
  if(/docks to support/.test(l)) T.shipsBuilt++;
  if(/collects the .* recipe into the book/.test(l)) T.recipePlaced++; // recipes → book (v0.4)
  if(/final round! \(heritage clock\)/.test(l)) T.endType='heritage';
  if(/final round! \(reach clock\)/.test(l)) T.endType='reach';
 }
}

function playGame(n,gseed){
 seed=gseed>>>0||1;
 // assign archetypes round-robin-ish, shuffled by seed
 const order=[...Array(ARCH.length).keys()].sort(()=>Math.random()-0.5).slice(0,n);
 PROF={};const names=[];
 for(let i=0;i<n;i++){PROF[i]=ARCH[order[i%order.length]];names.push(CN[i]);}
 E.S=E.freshState(n,names);E.UI={sub:'move'};
 const starts=E.S.players.map(p=>p.recipes.slice(1).sort().join('+')); // the random premium pair each got
 const T={tolls:0,harborLoads:0,basicShips:0,capLoads:0,shipIdle:0,sails:0,cargo:0,shipsBuilt:0,recipePlaced:0,recipeClaims:0,endType:'none',rounds:0};
 const CAP=parseInt(process.argv[3]||'24',10);
 for(let round=1;round<=CAP;round++){
   T.rounds=round;
   for(let seat=0;seat<n;seat++){const prev=E.S.log.length;botTurn();
     tally(E.S.log.slice(0,E.S.log.length-prev).map(strip),T);}
   if(E.S.ending)break; // finished the round in which a clock fired
 }
 const rows=E.S.players.map(p=>({id:p.id,arch:PROF[p.id].tag,sc:E.scorePlayer(p),ensh:p.enshrined.length,
   pres:Object.keys(ROUTES).reduce((a,r)=>a+(E.S.routes[r].pres[p.id]||0),0),start:starts[p.id]}));
 rows.sort((a,b)=>b.sc.total-a.sc.total||(b.pres-a.pres));
 return {T,rows,n,reachedEnd:E.S.ending,endN:E.endN()};
}

// ---- run the batch ----
const GAMES=parseInt(process.argv[2]||'400',10);
function batch(n){
 const agg={games:0,winsByArch:{},playByArch:{},scoreByArch:{},breakByArch:{},
   end:{heritage:0,reach:0,none:0},endRound:[],T:{tolls:0,harborLoads:0,basicShips:0,capLoads:0,shipIdle:0,sails:0,cargo:0,shipsBuilt:0,recipePlaced:0,recipeClaims:0},
   winsByStart:{},playByStart:{},topScores:[]};
 ARCH.forEach(a=>{agg.winsByArch[a.tag]=0;agg.playByArch[a.tag]=0;agg.scoreByArch[a.tag]=0;agg.breakByArch[a.tag]={reach:0,maj:0,stand:0,goals:0,tokens:0};});
 for(let g=0;g<GAMES;g++){
   const R=playGame(n, (g+1)*2654435761 + n*40503);
   agg.games++;
   for(const k in R.T) if(typeof R.T[k]==='number') agg.T[k]+=R.T[k];
   agg.end[R.T.endType==='none'?'none':R.T.endType]++;
   if(R.reachedEnd) agg.endRound.push(R.T.rounds);
   R.rows.forEach((r,i)=>{agg.playByArch[r.arch]++;agg.scoreByArch[r.arch]+=r.sc.total;
     ['reach','maj','stand','goals','tokens'].forEach(k=>agg.breakByArch[r.arch][k]+=r.sc[k]);
     agg.playByStart[r.start]=(agg.playByStart[r.start]||0)+1;});
   const win=R.rows[0];agg.winsByArch[win.arch]++;agg.winsByStart[win.start]=(agg.winsByStart[win.start]||0)+1;
   agg.topScores.push(win.sc.total);
 }
 return agg;
}
function pct(x,d){return d?(100*x/d).toFixed(0)+'%':'—';}
function avg(x,d){return d?(x/d).toFixed(1):'—';}
function report(n,a){
 const G=a.games;const out=[];
 out.push(`\n############ ${n}-PLAYER · ${G} games ############`);
 const winScores=a.topScores.slice().sort((x,y)=>x-y);
 out.push(`Winning score: avg ${avg(a.topScores.reduce((x,y)=>x+y,0),G)} · median ${winScores[Math.floor(G/2)]} · min ${winScores[0]} · max ${winScores[G-1]}`);
 out.push(`End clock: heritage ${pct(a.end.heritage,G)} · reach ${pct(a.end.reach,G)} · neither/cap ${pct(a.end.none,G)}` + (a.endRound.length?`  (avg ending round ${avg(a.endRound.reduce((x,y)=>x+y,0),a.endRound.length)})`:''));
 out.push('\n  Archetype          play   wins   win%   avgScore   (reach/maj/stand/goals/tokens)');
 Object.keys(a.winsByArch).forEach(tag=>{const pl=a.playByArch[tag];if(!pl)return;
   const b=a.breakByArch[tag];
   out.push('  '+tag.padEnd(18)+String(pl).padStart(4)+String(a.winsByArch[tag]).padStart(7)+pct(a.winsByArch[tag],pl).padStart(7)
     +avg(a.scoreByArch[tag],pl).padStart(11)+'   '+`${avg(b.reach,pl)}/${avg(b.maj,pl)}/${avg(b.stand,pl)}/${avg(b.goals,pl)}/${avg(b.tokens,pl)}`);});
 out.push('\n  Ship-toll economy (per game):');
 out.push(`    ships built ${avg(a.T.shipsBuilt,G)} · ships sailed ${avg(a.T.sails,G)} · cargo delivered ${avg(a.T.cargo,G)}`);
 const totalShipments=a.T.harborLoads+a.T.basicShips;
 out.push(`    shipments: loaded-a-ship ${avg(a.T.harborLoads,G)} (${pct(a.T.harborLoads,totalShipments)}) · basic/no-ship ${avg(a.T.basicShips,G)} (${pct(a.T.basicShips,totalShipments)})`);
 out.push(`    tolls collected ${avg(a.T.tolls,G)} · cap-fire auto-loads ${avg(a.T.capLoads,G)} · idle dock-fees ${avg(a.T.shipIdle,G)}`);
 out.push('\n  Recipe economy (per game):');
 out.push(`    recipes collected to book ${avg(a.T.recipePlaced,G)}`);
 out.push('\n  Random opening — win% by starting premium recipe set:');
 Object.keys(a.playByStart).sort().forEach(s=>{out.push(`    ${s.padEnd(14)} played ${a.playByStart[s]||0}  ·  wins ${a.winsByStart[s]||0}  (${pct(a.winsByStart[s]||0,a.playByStart[s]||0)} of its games won)`);});
 return out.join('\n');
}

console.log(`Brewhouse multi-sim · ${GAMES} games/config · improved greedy bots · 5 archetypes`);
[3,4].forEach(n=>console.log(report(n,batch(n))));
