const elm=()=>({classList:{add(){},remove(){},toggle(){}},style:{},set innerHTML(v){},get innerHTML(){return''},set textContent(v){},value:''});
global.document={getElementById:()=>elm()};global.localStorage={getItem(){return null},setItem(){}};
global.alert=m=>{throw new Error('ALERT:'+m)};global.window={};
let seed=12345; Math.random=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
let src=require('fs').readFileSync('/tmp/play.js','utf8').replace(/\(function boot\(\)\{[\s\S]*\}\)\(\);\s*$/,'');
src+=`;globalThis.E={get S(){return S},set S(v){S=v},get UI(){return UI},set UI(v){UI=v},
 freshState,cur,CELLNAME,cellOfLine,ADJ,LINES,SLOTS,STYLES,ROUTES,SHOP,routeFilled,
 doMove,chooseLine,marketGoods,buyTile,placeTile,emptySlots,brewAdvance,brewLoad,readyCasks,
 shipStart,shipPick,shipRoute,shipBuyRoute,shipsWithRoom,deliverCask,quayFallback,kontorTop,enshrineStart,enshrineReady,cellDone,
 gain,advanceAll,canPay,scorePlayer,endTurn,enshrinedTotal};`;
eval(src);
const E=globalThis.E,{CELLNAME,cellOfLine,ADJ,LINES,SLOTS,STYLES,ROUTES,SHOP}=E;

const PROF={
 0:{name:'Crimson',tag:'VOLUME/reach', reachW:2.2, standW:0.5, wish:['l_london','m_vessel','r_hopped','l_bruges','s_cog'], loads:['gruit','hopped'], enshrineTurn:99, shipPref:'value'},
 1:{name:'Azure',  tag:'QUALITY/standing', reachW:0.7, standW:2.2, wish:['m_vessel','r_dubbel','m_count','r_hopped'], loads:['dubbel','hopped'], enshrineTurn:1, shipPref:'value'},
 2:{name:'Forest', tag:'ENGINE/hybrid', reachW:1.1, standW:1.3, wish:['m_vessel','m_larder','r_hopped','l_bergen'], loads:['hopped','gruit'], enshrineTurn:4, shipPref:'value'},
};
const has=(p,id)=>{const it=SHOP.find(x=>x.id===id);if(it.kind==='route')return E.S.routes[it.route].open;if(it.kind==='room')return p.rooms.includes(it.room)&&it.room!=='vessel';return false;};
const rivalOn=(p,c)=>E.S.players.some(q=>q.id!==p.id&&q.cell===c);
function loadable(p,style){const st=STYLES[style];return p.recipes.includes(style)&&p.vessels.includes(null)&&E.canPay(p,st.in)&&!(st.cellar&&!p.rooms.includes('cellar'));}
function chooseLoad(p){const pr=PROF[p.id];for(const s of pr.loads)if(loadable(p,s))return s;for(const s of ['hopped','gruit','dubbel','tripel'])if(loadable(p,s))return s;return null;}
function shipable(p){const ready=E.readyCasks(p);if(!ready.length)return null; // casks now load into ships (or basic shipment) — no slot needed
 for(const o of ready){const open=Object.keys(ROUTES).filter(r=>E.S.routes[r].open&&E.routeFilled(r)<ROUTES[r].cap&&STYLES[o.c.style].q>=ROUTES[r].gate);
   if(open.length){const r=open.sort((a,b)=>E.shipsWithRoom(b).length-E.shipsWithRoom(a).length||E.S.routes[b].value-E.S.routes[a].value)[0];return {vi:o.i,route:r};}}
 return null;}
function enshList(p){const ready=p.vessels.map((c,i)=>({c,i})).filter(o=>o.c&&o.c.step>=o.c.ready&&o.c.enshrine);return {ready};} // enshrine only from Ready vessels now
function wantEnshrine(p){const pr=PROF[p.id];const e=enshList(p);return E.S.turn>=pr.enshrineTurn&&e.ready.length;}
function marketWish(p){const pr=PROF[p.id];for(const id of pr.wish){const it=SHOP.find(x=>x.id===id);if(!it||!E.canPay(p,it.cost))continue;
   if(it.kind==='route'&&!has(p,id)&&E.emptySlots().length)return{tile:id};
   if(it.kind==='room'){if(it.room==='vessel'&&p.maxVessels<3&&p.rooms.length<4)return{tile:id};if(it.room!=='vessel'&&!has(p,id)&&p.rooms.length<4)return{tile:id};}
   if(it.kind==='recipe'&&!p.recipes.includes(it.style)&&!SLOTS.some(s=>{const t=E.S.slots[s.id];return t&&t.type==='recipe'&&t.owner===p.id&&t.style===it.style})&&E.emptySlots().length)return{tile:id};
   if(it.kind==='ship'&&p.ships<1&&E.emptySlots().length)return{tile:id};}
 return null;}
function cellValue(p,c){const act=CELLNAME[c],blk=rivalOn(p,c),pr=PROF[p.id];
 if(act==='Market'){const base=(p.grain+p.hops<3)?2.6:(marketWish(p)?2.0:1.0);return blk?Math.min(base,p.rooms.includes('larder')?1.6:1.1):base;}
 if(act==='Brewhouse'){const canLoad=chooseLoad(p),adv=p.vessels.some(v=>v&&v.step<v.ready);let v=canLoad?2.5:(adv?1.8:0.5);if(blk&&!p.rooms.includes('fermenter'))v=adv?1.2:0.3;return v;}
 if(act==='Harbor'){const s=shipable(p);if(!s)return 0.2;if(blk&&!p.rooms.includes('quay'))return 2.0*pr.reachW;return 3.0*pr.reachW;}
 if(act==='Kontor'){return wantEnshrine(p)?3.0*pr.standW:1.0;}
 return 0.5;}
function pickOption(p){const legal=(!p.placed)?['A','B','C','D']:ADJ[p.cell];let best=null;
 for(const cell of legal)for(const lk of ['row','col']){const cells=LINES[cellOfLine(cell)[lk]].cells;const val=cells.reduce((a,c)=>a+cellValue(p,c),0)+Math.random()*0.05;if(!best||val>best.val)best={cell,lk,val};}
 return best;}
function resolveCell(p){const act=CELLNAME[E.UI.cell],blk=E.UI.blocked;
 try{
  if(blk&&act==='Market'){const n=p.rooms.includes('larder')?2:1;E.gain(p,n,0);E.cellDone();return;}
  if(blk&&act==='Brewhouse'&&!p.rooms.includes('fermenter')){E.advanceAll(p);E.cellDone();return;}
  if(blk&&act==='Harbor'&&!p.rooms.includes('quay')){E.quayFallback();return;}
  if(act==='Market'){const w=marketWish(p);if(w&&(p.grain+p.hops>=3||SHOP.find(x=>x.id===w.tile).kind!=='goods')){E.buyTile(w.tile);
      if(E.UI.stage==='ship_buy_route'){const r=Object.keys(ROUTES).filter(x=>E.S.routes[x].open).sort((a,b)=>E.S.routes[b].value-E.S.routes[a].value)[0];E.shipBuyRoute(r);}
      if(E.UI.stage==='place')E.placeTile(E.emptySlots()[0].id);}else{E.marketGoods(p.hops<p.grain-1?'gh':'gg');}return;}
  if(act==='Brewhouse'){E.brewAdvance();const s=chooseLoad(p);if(s)E.brewLoad(s);E.cellDone();return;}
  if(act==='Harbor'){const s=shipable(p);if(!s){E.cellDone();return;}E.shipStart();E.shipPick(s.vi);E.shipRoute(s.route);return;}
  if(act==='Kontor'){if(wantEnshrine(p)){const e=enshList(p);E.enshrineStart();E.enshrineReady(e.ready[0].i);}else E.kontorTop();return;}
  E.cellDone();
 }catch(e){if(E.UI.sub==='cell')E.cellDone();}}
function botTurn(){const p=E.cur();const o=pickOption(p);E.doMove(o.cell);E.chooseLine(o.lk);let g=0;while(E.UI.sub==='cell'&&g++<20)resolveCell(p);E.endTurn();}

E.S=E.freshState(3,['Crimson','Azure','Forest']);E.UI={sub:'move'};
const strip=s=>s.replace(/<[^>]+>/g,'');
function snap(p){const work=SLOTS.filter(s=>{const t=E.S.slots[s.id];return t&&t.owner===p.id}).length;
 const pres=Object.keys(ROUTES).map(r=>E.S.routes[r].pres[p.id]||0).reduce((a,b)=>a+b,0);const sc=E.scorePlayer(p);
 return `G${p.grain}/H${p.hops} | brews:${p.vessels.filter(v=>v).length} slots:${work} presence:${pres} enshrined:${p.enshrined.length} | ~${sc.total}vp`;}
const out=[];
for(let round=1;round<=10;round++)for(let seat=0;seat<3;seat++){
  const p=E.cur(),pr=PROF[p.id],prev=E.S.log.length;botTurn();
  const entries=E.S.log.slice(0,E.S.log.length-prev).reverse().map(strip);
  out.push(`\n— Round ${round} · ${pr.name} (${pr.tag}) —`);entries.forEach(e=>out.push('   '+e));out.push('   = '+snap(p));}
out.push('\n================ FINAL ================');
out.push(`Heritage clock: ${E.enshrinedTotal()} / ${6+3*3} enshrined  |  ending=${E.S.ending}`);
E.S.players.forEach(p=>{const sc=E.scorePlayer(p);out.push(`${PROF[p.id].name.padEnd(8)} TOTAL ${String(sc.total).padStart(3)}  = reach ${sc.reach} + maj ${sc.maj} + standing ${sc.stand} + goals ${sc.goals}  (enshrined ${p.enshrined.length})`);});
Object.keys(ROUTES).forEach(r=>{const R=E.S.routes[r];out.push(`route ${r.padEnd(9)} value ${R.value} cap ${ROUTES[r].cap} filled ${E.routeFilled(r)} pres=${JSON.stringify(R.pres)}`);});
console.log(out.join('\n'));
