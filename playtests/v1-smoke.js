/* Headless smoke test for play-v1.html (v1.0 "Demand").
   Goal: 0 crashes / 0 deadlocks across many random-bot games; report pace + scores.
   Mirrors sim.js: extract <script>, run in a vm with DOM/localStorage stubbed,
   drive the engine through its exposed __V1 api with a progress-guaranteed bot. */
const fs=require('fs'), vm=require('vm'), path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','play-v1.html'),'utf8');
const m=html.match(/<script>([\s\S]*?)<\/script>/);
if(!m){ console.error('no <script> found'); process.exit(1); }
const src=m[1];

function makeCtx(){
  const ctx={ console, setTimeout:()=>0, clearTimeout:()=>0, Math, Date, JSON,
    localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
    document:undefined, window:undefined };
  ctx.globalThis=ctx;
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx;
}
const STN=['A','B','C','D'];
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

function playGame(n){
  const ctx=makeCtx(); const V=ctx.__V1; const api=V.api;
  V.freshState(n); V.beginTurn();
  let steps=0, guard=0, lastActive=-1, attempted=new Set();
  const S=()=>V.S; const UI=()=>V.UI;
  while(!S().over){
    if(++steps>60000) throw new Error('runaway steps');
    const ui=UI();
    // new turn? reset per-turn attempt tracking
    if(S().active!==lastActive){ lastActive=S().active; attempted=new Set(); }
    // dismiss/resolve a choice panel first
    if(ui.choice){
      const live=ui.choice.opts.map((o,i)=>({o,i})).filter(x=>!x.o.dis &&
        !/^(No |Back|Cancel|Skip)/.test(x.o.label));
      if(live.length){ const c=pick(live); c.o.fn(); }
      else { ui.choice=null; } // nothing useful -> dismiss
      continue;
    }
    const p=V.P();
    switch(ui.sub){
      case 'place': api.doPlace(pick(STN)); break;
      case 'move':  api.doMove(pick(api.ADJ[p.station])); break;
      case 'toll':  api.payToll(); break;
      case 'floor': api.payToll(); break;
      case 'line':  api.chooseLine(pick(api.stationLines(p.station))); break;
      case 'age': {
        const mv=p.vessels.map((v,i)=>({v,i})).filter(x=>x.v&&!x.v.ready);
        if(ui.agePts>0 && mv.length) api.ageInto(pick(mv).i); else api.ageDone();
        break; }
      case 'turn': {
        // 1) deploy a ready cask if room
        const dep=api.deployable(p);
        if(dep.length && api.openSlot() && Math.random()<0.8){ api.deployCask(pick(dep).i); break; }
        // 2) use an un-attempted station on the line
        const line=ui.turn.line; const stns=api.LINES[line].stns.filter(s=>!ui.turn.usedStn[s] && !attempted.has('s'+s));
        if(stns.length){ const s=pick(stns); attempted.add('s'+s); api.useStation(s); break; }
        // 3) use a slot building on the line
        const slots=api.LINES[line].slots.filter(s=>S().slots[s] && !ui.turn.usedSlot[s] && !attempted.has('b'+s));
        if(slots.length){ const s=pick(slots); attempted.add('b'+s); api.useSlotBuilding(s); break; }
        // 4) nothing left -> end turn
        V.endTurn();
        break; }
      case 'over': break;
      default: throw new Error('unknown sub: '+ui.sub);
    }
    if(++guard>200000) throw new Error('deadlock guard');
  }
  const sc=V.finalScores();
  return {rounds:S().round, sailed:S().sailed, cap:S().cap, ended:S().ending, top:sc[0].total, win:sc[0].name, scores:sc, n};
}

const N=parseInt(process.argv[2]||'80',10);
let crashes=0, deadlocks=0; const byN={};
for(const n of [2,3,4]){ byN[n]={games:0,rounds:0,minR:99,maxR:0,clock:0,top:0,minT:9999,maxT:0}; }
for(let g=0; g<N; g++){
  for(const n of [2,3,4]){
    try{
      const r=playGame(n); const b=byN[n];
      b.games++; b.rounds+=r.rounds; b.minR=Math.min(b.minR,r.rounds); b.maxR=Math.max(b.maxR,r.rounds);
      b.clock+=(r.ended?1:0); b.top+=r.top; b.minT=Math.min(b.minT,r.top); b.maxT=Math.max(b.maxT,r.top);
    }catch(e){ crashes++; if(/deadlock|runaway/.test(e.message))deadlocks++; if(crashes<=5)console.error('  ✗ '+n+'p:',e.message); }
  }
}
console.log('\nBrewhouses v1.0 "Demand" — smoke  (N='+N+' per player count)');
console.log('crashes:',crashes,' deadlocks:',deadlocks);
for(const n of [2,3,4]){ const b=byN[n]; if(!b.games){console.log(n+'p: no games');continue;}
  console.log(n+'p: games '+b.games+' | rounds avg '+(b.rounds/b.games).toFixed(1)+' ['+b.minR+'-'+b.maxR+']'
    +' | clock-ended '+(100*b.clock/b.games).toFixed(0)+'%'
    +' | winner score avg '+(b.top/b.games).toFixed(1)+' ['+b.minT+'-'+b.maxT+']'); }
console.log(crashes===0?'\nPASS (no crashes/deadlocks)':'\nFAIL');
process.exit(crashes===0?0:1);
