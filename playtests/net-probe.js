// Headless probe for the ONLINE-TABLE bridge (net.js) — two REAL clients, one router.
// Each client = the canonical play.html engine + net.js sourced into its own vm context with
// ?net=1 (the sim.js stub pattern); the probe plays the parent shell: it delivers INIT/STATE
// and fans out COMMITs, JSON-cloning every payload (structured-clone semantics — no shared refs).
// Scenarios:
//   S1 CONVERGENCE  — 2p AI vs AI on the botRunner client; every commit applied to the mirror
//                     client; final S byte-identical on both; mirror never writes; gate holds.
//   S2 TWO-WAY PLAY — 2p human vs human; alternating null turns driven on the ACTOR's client;
//                     the idle client is action-blocked; states converge after every half-turn.
//   S3 HANDOFF      — a pending Bergen prize naming the NON-active seat: the oracle flips the
//                     actor, the active client is blocked, the owner's client picks (declines),
//                     control returns, the turn completes — full round-trip over the router.
// Run: node playtests/net-probe.js    (exit 0 = all pass)
'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');

const html=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
const engine=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const netjs=fs.readFileSync(path.join(__dirname,'..','net.js'),'utf8');
const clone=x=>JSON.parse(JSON.stringify(x));

let outbox=[];   // {from, msg} — the wire
function makeClient(id){
  const noop=()=>{};
  const elStub=()=>({ innerHTML:'', textContent:'', value:'', style:{}, disabled:false,
    classList:{ add:noop, remove:noop, toggle:noop, contains:()=>false },
    setAttribute:noop, getAttribute:()=>null, appendChild:noop, removeChild:noop, focus:noop,
    querySelector:()=>null, querySelectorAll:()=>[],
    getBoundingClientRect:()=>({left:0,top:0,right:0,bottom:0,width:0,height:0}) });
  const document={ getElementById:()=>elStub(), createElement:()=>elStub(),
    addEventListener:noop, removeEventListener:noop, querySelector:()=>null, querySelectorAll:()=>[],
    body:{ appendChild:noop, contains:()=>false }, head:{ appendChild:noop } };
  const store={};
  const localStorage={ getItem:k=>(k in store?store[k]:null), setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];} };
  const ctx={
    document, localStorage, console, Math, JSON, Date, Set, Map, Array, Object, String, Number, Boolean,
    parseInt, parseFloat, isNaN, alert:noop,
    setTimeout:noop, clearTimeout:noop, setInterval:()=>0, clearInterval:noop,
    lucide:{ createIcons:noop },
    location:{ search:'?net=1' },
    __listeners:[],
    parent:{ postMessage:(msg)=>{ outbox.push({from:id,msg:clone(msg)}); } },
  };
  ctx.window=ctx; ctx.globalThis=ctx; ctx.self=ctx;
  ctx.addEventListener=(t,f)=>{ if(t==='message')ctx.__listeners.push(f); };
  ctx.removeEventListener=noop;
  vm.createContext(ctx);
  vm.runInContext(engine+'\n;\n'+netjs,ctx,{filename:'engine+net.js#'+id});
  if(!ctx.HANSE) throw new Error(id+': window.HANSE missing');
  if(!ctx.HANSE_NET) throw new Error(id+': HANSE_NET missing (net.js inert?)');
  return ctx;
}
function deliver(client,msg){ const m=clone(msg); m.hanse=1;
  client.__listeners.forEach(f=>f({data:m,origin:'probe://parent'})); }

const record={commits:[],errors:[],helloKeys:{}};
function pump(clients){   // the parent shell: route until the wire is quiet
  let guard=0;
  while(outbox.length){
    if(++guard>20000) throw new Error('router runaway');
    const {from,msg}=outbox.shift();
    if(msg.type==='HELLO'){record.helloKeys[from]=msg.key;continue;}
    if(msg.type==='ERROR'){record.errors.push(from+':'+msg.code+':'+(msg.detail||''));continue;}
    if(msg.type==='COMMIT'){
      record.commits.push({from,actor:msg.actor,over:msg.over,schema:msg.S&&msg.S.schema,standings:msg.standings});
      for(const [cid,c] of Object.entries(clients)) if(cid!==from) deliver(c,{type:'STATE',S:msg.S,UI:msg.UI});
    }
  }
}
let failures=0;
function ok(cond,label){ if(cond){console.log('  ok  '+label);} else {failures++;console.log('  FAIL '+label);} }
const sig=c=>JSON.stringify(c.HANSE.S);
const ADJ={A:['B','C'],B:['A','D'],C:['A','D'],D:['B','C']};
function nullTurn(c){ const H=c.HANSE; const p=H.S.players[H.S.active];
  const cell=!p.placed?(H.S.active===0?'A':'D'):ADJ[p.cell][0];
  c.doMove(cell); c.chooseLine('row'); c.endTurn(); }

// ================= S1 — CONVERGENCE (AI vs AI, instant, runner=A) =================
console.log('S1 convergence — 2p AI vs AI (runner drives, mirror applies):');
for(let run=0;run<2;run++){
  outbox=[];record.commits=[];record.errors=[];
  const A=makeClient('A'),B=makeClient('B');
  deliver(B,{type:'INIT',seat:1,botRunner:false,aiSpeed:'instant'});
  deliver(A,{type:'INIT',seat:0,botRunner:true,aiSpeed:'instant',
    setup:{n:2,names:['Alice','Bob'],aiSeats:[{tier:'journeyman'},{tier:'journeyman'}]}});
  pump({A,B});
  ok(A.HANSE.S&&A.HANSE.S.over===true,'run'+run+' runner finished a full game (round '+(A.HANSE.S&&A.HANSE.S.turn)+')');
  ok(B.HANSE.S&&B.HANSE.S.over===true,'run'+run+' mirror reached game over');
  ok(sig(A)===sig(B),'run'+run+' final S byte-identical on both clients');
  ok(record.commits.length>=10&&record.commits.every(c=>c.from==='A'),'run'+run+' single-writer held ('+record.commits.length+' commits, all from the runner)');
  ok(record.commits.every(c=>c.schema===A.HANSE.KEY),'run'+run+' every commit stamped schema '+A.HANSE.KEY);
  ok(record.errors.length===0,'run'+run+' zero protocol errors');
  const last=record.commits[record.commits.length-1];
  ok(!!(last&&last.over&&last.standings&&last.standings.length===2),'run'+run+' final commit carries standings');
  const s0=sig(B); B.doMove('A');
  ok(sig(B)===s0,'run'+run+' mirror client action-blocked after game over');
}

// ================= S2 — TWO-WAY PLAY (human vs human null turns) =================
console.log('S2 two-way play — 2p human vs human, 8 alternating half-turns:');
outbox=[];record.commits=[];record.errors=[];
const A2=makeClient('A2'),B2=makeClient('B2');
deliver(B2,{type:'INIT',seat:1,botRunner:false});
deliver(A2,{type:'INIT',seat:0,botRunner:true,setup:{n:2,names:['Alice','Bob'],aiSeats:[null,null]}});
pump({A2,B2});
ok(sig(A2)===sig(B2),'state 0 mirrored to the guest');
let twoWayOK=true,gateOK=true,convergeOK=true;
for(let t=0;t<8;t++){
  const actor=A2.HANSE.actorSeat();
  const act=(actor===0)?A2:B2, idle=(actor===0)?B2:A2;
  const before=sig(idle); idle.doMove('A');
  if(sig(idle)!==before)gateOK=false;
  nullTurn(act); pump({A2,B2});
  if(sig(A2)!==sig(B2))convergeOK=false;
  if(A2.HANSE.actorSeat()!==1-actor)twoWayOK=false;
}
ok(gateOK,'the idle client was action-blocked on every half-turn');
ok(convergeOK,'states converged after every half-turn');
ok(twoWayOK,'the turn alternated seat 0 ↔ seat 1 through both clients');
ok(A2.HANSE.S.turn>=4,'rounds advanced (round '+A2.HANSE.S.turn+' after 8 half-turns)');
ok(record.commits.filter(c=>c.from==='A2').length>=4&&record.commits.filter(c=>c.from==='B2').length>=4,'both clients committed their own turns');

// ================= S3 — HANDOFF (an out-of-turn Bergen prize) =================
console.log('S3 handoff — a pending prize for the NON-active seat crosses clients:');
if(A2.HANSE.actorSeat()!==0){ nullTurn(B2); pump({A2,B2}); }
ok(A2.HANSE.actorSeat()===0,'setup: seat 0 is the actor');
const pA=A2.HANSE.S.players[0];
A2.doMove(!pA.placed?'A':ADJ[pA.cell][0]); A2.chooseLine('row');   // mid-turn: sub 'stops'
A2.HANSE.UI.sub='bspec';
A2.HANSE.UI.pendingSpec=[{pid:1,dest:'bergen',style:'gruit',die:1}];
A2.HANSE.UI.goodsRt='stops';
ok(A2.HANSE.actorSeat()===1,'the oracle names the prize owner (seat 1) while seat 0 holds the turn');
A2.bspecPick(null);
ok(A2.HANSE.UI.pendingSpec&&A2.HANSE.UI.pendingSpec.length===1,'the active client is blocked from taking the owner\'s pick');
deliver(B2,{type:'STATE',S:clone(A2.HANSE.S),UI:clone(A2.HANSE.UI)});   // the handoff state reaches the owner
ok(B2.HANSE_NET.canDrive()===true,'the owner\'s client is authorized');
const preCommits=record.commits.length;
B2.bspecPick(null);                                                    // the owner declines the prize
pump({A2,B2});
ok(record.commits.length>preCommits&&record.commits[record.commits.length-1].from==='B2','the owner\'s pick committed from the owner\'s client');
ok(A2.HANSE.actorSeat()===0&&B2.HANSE.actorSeat()===0,'control returned to the active seat on both clients');
ok(sig(A2)===sig(B2),'states converged across the handoff');
ok(A2.HANSE.UI.sub==='stops','the interrupted turn resumed at its stops');
A2.endTurn(); pump({A2,B2});
ok(A2.HANSE.actorSeat()===1&&sig(A2)===sig(B2),'the turn then completed and passed normally');

console.log(failures? ('\n*** '+failures+' FAILURES ***') : '\nNET-PROBE: ALL PASS');
process.exit(failures?1:0);