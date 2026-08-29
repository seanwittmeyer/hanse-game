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
  // GUILD_MS/CELLAR_MS are let-declared in the engine's scope — lower them in-scope (the
  // sim.js pattern) so the S9 MC-fence scenario runs GM decisions in probe time.
  vm.runInContext(engine+'\n;\n'+netjs+'\n;try{GUILD_MS=40;CELLAR_MS=80;}catch(e){}',ctx,{filename:'engine+net.js#'+id});
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
      record.commits.push({from,actor:msg.actor,over:msg.over,schema:msg.S&&msg.S.schema,standings:msg.standings,
        diag:msg.diag,ais:msg.S&&msg.S.players?msg.S.players.map(p=>p.ai?p.ai.tier:null):null});
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

// ================= S1 — CONVERGENCE (AI vs AI, instant, runner=A · 2p/3p/4p) =================
console.log('S1 convergence — AI-vs-AI full games at every player count (runner drives, mirror applies):');
const NAMES=['Alice','Bob','Cora','Dagny'];
for(const n of [2,3,4]){
  outbox=[];record.commits=[];record.errors=[];
  const A=makeClient('A'),B=makeClient('B');
  deliver(B,{type:'INIT',seat:1,botRunner:false,aiSpeed:'instant'});
  deliver(A,{type:'INIT',seat:0,botRunner:true,aiSpeed:'instant',
    setup:{n:n,names:NAMES.slice(0,n),aiSeats:NAMES.slice(0,n).map(()=>({tier:'journeyman'}))}});
  pump({A,B});
  ok(A.HANSE.S&&A.HANSE.S.over===true,n+'p runner finished a full game (round '+(A.HANSE.S&&A.HANSE.S.turn)+')');
  ok(B.HANSE.S&&B.HANSE.S.over===true,n+'p mirror reached game over');
  ok(sig(A)===sig(B),n+'p final S byte-identical on both clients');
  ok(record.commits.length>=10&&record.commits.every(c=>c.from==='A'),n+'p single-writer held ('+record.commits.length+' commits, all from the runner)');
  ok(record.commits.every(c=>c.schema===A.HANSE.KEY),n+'p every commit stamped schema '+A.HANSE.KEY);
  ok(record.errors.length===0,n+'p zero protocol errors');
  const last=record.commits[record.commits.length-1];
  ok(!!(last&&last.over&&last.standings&&last.standings.length===n),n+'p final commit carries '+n+' standings');
  const s0=sig(B); B.doMove('A');
  ok(sig(B)===s0,n+'p mirror client action-blocked after game over');
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

// ================= S4 — UNDO: in-segment works, never crosses a commit =================
console.log('S4 undo — a takeback reaches only the actor\'s uncommitted segment:');
ok(A2.HANSE.actorSeat()===1,'setup: seat 1 is the actor');
{
  const s0=sig(B2);
  const p=B2.HANSE.S.players[1];
  B2.doMove(!p.placed?'D':ADJ[p.cell][0]);
  const s1=sig(B2);
  ok(s1!==s0,'the actor\'s move changed local state');
  const pre=record.commits.length;
  B2.doUndo();
  ok(sig(B2)===s0,'in-segment undo restored the pre-move state');
  ok(record.commits.length===pre,'the undo published nothing (actor unchanged)');
  nullTurn(B2); pump({A2,B2});
  ok(sig(A2)===sig(B2)&&A2.HANSE.actorSeat()===0,'the turn then completed normally');
  const sB=sig(B2); B2.doUndo();
  ok(sig(B2)===sB,'the previous actor cannot undo after committing (blocked)');
  const sA=sig(A2); A2.doUndo();
  ok(sig(A2)===sA,'the new actor cannot undo across the commit (stack cleared)');
}

// ================= S5 — SPECTATOR (seat -1): sees everything, drives nothing =================
console.log('S5 spectator — a seat:-1 client mirrors and is fully blocked:');
{
  const W=makeClient('W');
  deliver(W,{type:'INIT',seat:-1,botRunner:false,state:{S:clone(A2.HANSE.S),UI:clone(A2.HANSE.UI)}});
  ok(W.HANSE_NET.inited===true&&W.HANSE_NET.seat===-1,'spectator INIT accepted');
  ok(sig(W)===sig(A2),'spectator converged to the table state');
  ok(W.HANSE_NET.canDrive()===false,'spectator is never authorized');
  const sW=sig(W); W.doMove('A'); W.endTurn();
  ok(sig(W)===sW,'spectator actions are inert');
}

// ================= S6 — MID-TURN JOIN / DEVICE TRANSFER during a handoff =================
console.log('S6 mid-turn join — a fresh client takes seat 1 mid-handoff and completes the pick:');
{
  ok(A2.HANSE.actorSeat()===0,'setup: seat 0 is the actor');
  const p0=A2.HANSE.S.players[0];
  A2.doMove(!p0.placed?'A':ADJ[p0.cell][0]); A2.chooseLine('row');
  A2.HANSE.UI.sub='bspec';
  A2.HANSE.UI.pendingSpec=[{pid:1,dest:'bergen',style:'gruit',die:1}];
  A2.HANSE.UI.goodsRt='stops';
  const J=makeClient('J');   // seat 1's NEW device, joining mid-handoff
  deliver(J,{type:'INIT',seat:1,botRunner:false,state:{S:clone(A2.HANSE.S),UI:clone(A2.HANSE.UI)}});
  ok(J.HANSE.actorSeat()===1&&J.HANSE_NET.canDrive()===true,'the joining device is immediately the authorized actor');
  const pre=record.commits.length;
  J.bspecPick(null); pump({A2,B2,J});
  ok(record.commits.length>pre&&record.commits[record.commits.length-1].from==='J','the pick committed from the new device');
  ok(sig(A2)===sig(J)&&sig(B2)===sig(J),'all three clients converged (old device included)');
  ok(A2.HANSE.actorSeat()===0&&A2.HANSE.UI.sub==='stops','control returned to the interrupted turn');
  A2.endTurn(); pump({A2,B2,J});
  ok(sig(A2)===sig(J)&&A2.HANSE.actorSeat()===1,'the turn completed across all clients');
}

// ================= S8 — RESYNC_REQ re-publishes the current state =================
console.log('S8 resync — RESYNC_REQ makes the client re-commit:');
{
  const pre=record.commits.length;
  deliver(A2,{type:'RESYNC_REQ'}); pump({A2,B2});
  ok(record.commits.length===pre+1&&record.commits[record.commits.length-1].from==='A2','one fresh commit from the asked client');
  ok(sig(A2)===sig(B2),'states remain converged after the resync');
}

// ================= S7 — KEY MISMATCH: a foreign build's state is refused =================
console.log('S7 key mismatch — a STATE from another build errors and is not applied:');
{
  const bad={S:clone(A2.HANSE.S),UI:clone(A2.HANSE.UI)};
  bad.S.schema='hanse-v000';
  const sB=sig(B2), preErr=record.errors.length;
  deliver(B2,{type:'STATE',S:bad.S,UI:bad.UI}); pump({A2,B2});
  ok(record.errors.length>preErr&&/key-mismatch/.test(record.errors.join(' ')),'the client posted a key-mismatch ERROR');
  ok(sig(B2)===sB,'the mismatched state was NOT applied');
}

// ================= S9 — THE MC SIM FENCE (the UKZ3SA regression) =================
// A guildmaster seat's aiMCDecide swaps the global S for playout clones (every clone seat a
// rollout bot) and drives the same wrapped action functions. Pre-n2, every playout step fired
// afterAction→COMMIT: thousands of imagined states published, all seats ai:trader, humans
// locked out. The fence: net.js is inert while HANSE.aiSimulating is up, and every published
// state re-stamps p.ai from the platform's seat map.
console.log('S9 MC sim fence — a guildmaster turn publishes real states only, seat truth held:');
{
  outbox=[];record.commits=[];record.errors=[];
  const G=makeClient('G'),M=makeClient('M');
  deliver(M,{type:'INIT',seat:-1,botRunner:false,aiSpeed:'instant',aiSeats:[null,{tier:'guildmaster'}]});
  deliver(G,{type:'INIT',seat:0,botRunner:true,aiSpeed:'instant',aiSeats:[null,{tier:'guildmaster'}],
    setup:{n:2,names:['Alice','Guildmaster (AI)'],aiSeats:[null,{tier:'guildmaster'}]}});
  pump({G,M});
  ok(G.HANSE.S&&G.HANSE.S.players[1].ai&&G.HANSE.S.players[1].ai.tier==='guildmaster','setup seats a guildmaster at seat 1');
  ok(G.HANSE.actorSeat()===0,'setup: the human holds the first turn');
  const c0=record.commits.length;
  nullTurn(G); pump({G,M});   // Alice's null turn ends → the GM's WHOLE turn runs (MC decisions included)
  const turnCommits=record.commits.length-c0;
  ok(G.HANSE.actorSeat()===0&&G.HANSE.S.turn>=2,'the guildmaster turn completed and control returned (round '+G.HANSE.S.turn+')');
  ok(turnCommits>=2&&turnCommits<=20,'the exchange published TURN-level commits only ('+turnCommits+' — a playout leak would be hundreds)');
  ok(record.commits.every(c=>c.ais&&c.ais[0]===null),'the human seat is ai:null in EVERY published state');
  ok(record.commits.every(c=>c.ais&&c.ais[1]==='guildmaster'),'the AI seat keeps its TRUE tier in every published state (never a rollout tier)');
  ok(record.commits.every(c=>c.diag&&typeof c.diag.runner==='boolean'),'every commit carries diag{seat,runner}');
  ok(sig(G)===sig(M),'runner and spectator converged after the MC turn');
  ok(record.errors.length===0,'zero protocol errors');
  // the healing stamp: a leaked ai flag on a human seat cannot survive into a published state
  G.HANSE.S.players[0].ai={tier:'trader',persona:null};
  G.HANSE_NET.resync(); pump({G,M});
  const last=record.commits[record.commits.length-1];
  ok(last&&last.ais&&last.ais[0]===null,'a contaminated human seat is re-stamped ai:null on the next publish');
  ok(M.HANSE.S.players[0].ai===null,'the mirror never sees the contamination');
}

console.log(failures? ('\n*** '+failures+' FAILURES ***') : '\nNET-PROBE: ALL PASS');
process.exit(failures?1:0);