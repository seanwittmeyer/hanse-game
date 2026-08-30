// net.js — Brewhouses of the Hanse · the ONLINE-TABLE bridge.
// Loaded by play.html on every page view but FULLY INERT unless the page was opened with ?net=1
// (the engine's NET const). In net mode a parent shell (the platform: lobby + backend) embeds
// this page in an iframe and speaks postMessage; the engine stays the one canonical
// implementation — this file adds seats, authority and transport, never rules.
//
// PROTOCOL (every message is {hanse:1, type, ...}; all payloads structured-clone/JSON-safe):
//   child → parent : HELLO {key, app}      on load, repeated every 2s until an INIT lands
//                    COMMIT {seq, S, UI, actor, over, standings}
//                        the authoritative state — sent after every ACTOR CHANGE and turn
//                        commit; the parent stores it (bump its own version) and fans it out
//                        to every OTHER client as a STATE
//                    ERROR {code, detail}
//   parent → child : INIT {seat, botRunner, aiSpeed?, setup:{n, names, aiSeats}}   fresh table (host)
//                    INIT {seat, botRunner, aiSpeed?, state:{S, UI}}               join / resume
//                    INIT {seat, botRunner}                                        join, state follows as STATE
//                    STATE {S, UI}          a remote commit to apply (parent never echoes the sender)
//                    RESYNC_REQ             → child re-sends its current state as a COMMIT
//
// AUTHORITY: exactly ONE client may write at any moment — the ACTOR's client. actorSeat() is
// the engine's humanGate() oracle returned as a seat id: a pending prize queue's head names its
// owner (the out-of-turn picks: Bruges recipe · London building+placement · Bergen specialist ·
// Manifest claim — v5.0), otherwise the active seat. AI seats are driven only by the botRunner client (the
// host). Every action function is gated on this; the parent applies last-write-wins on top.
// UNDO never crosses a commit — the stack clears on every commit/apply, so a takeback reaches
// only your own uncommitted segment (the friendly-table rule).
(function(){
'use strict';
if(typeof window==='undefined')return;
var H=window.HANSE;
if(!H||!H.NET)return;   // solo page (or a harness that concatenated this file without ?net=1): inert

var mySeat=null, botRunner=false, parentOrigin=null, inited=false;
var seq=0, lastSentSig='', lastActor=null, helloTimer=null;
var seatTruth=null;   // n2: the platform's seat map ({tier}|null per seat) — AUTHORITATIVE over p.ai

// n2: the MC pair (aiMCDecide) swaps the global S for playout clones and drives the same
// wrapped action functions — the shim must be INERT while a simulation is up, or every
// playout step becomes a COMMIT (the UKZ3SA incident: imagined futures streamed as real states).
function simming(){return !!H.aiSimulating;}

// n2: re-stamp who is AI from the platform's seat map — on every apply and before every
// commit — so no engine-internal mutation of p.ai can ever survive into a published state.
function stampSeats(){
  if(!seatTruth||!H.S||!H.S.players)return;
  H.S.players.forEach(function(p,i){p.ai=seatTruth[i]||null;});
}

// the whole UI-entry action surface (the buttons' onclick functions + endTurn + undo)
var GATED=['doMove','resolveStop','backToStops','srcTake','srcSkip','commPick','commPlace','commBack','commSkip',
  'brewPick','brewVerbPick','brewVerbBack','ageAllot','ageDone','ageSkip','exchangePick','exchangeSkip','capPick','capPlace','capSkip','rackPick','rackSkip',
  'hopexAllot','hopexDone','abbeyGo','assayPick','assaySkip','reachPick','reachSkip','recipeGainPick','surveyPick','placeBldgOn',
  'hirePick','loadPickCask','loadOnto','loadOptGo','loadBack','loadSkip','precipePick','bspecPick','benefitPick','manPick',
  'chandlerSwap','ageRiderGo','chSwapGo','richBuyGo','doUndo','endTurn'];   // v5.1: the rider prompts (age riders · the Chandler-on-Source swap · the Rich Berth buy) join the gate
// local-table controls that must never run under a platform shell
var BLOCKED=['newGame','openSetup','startGame'];

function esc(s){return String(s==null?'':s).replace(/[<>&"'`]/g,'').slice(0,24)||'Player';}
function actorP(){var a=H.actorSeat();return (a==null||!H.S)?null:H.S.players[a];}
function canDrive(){
  if(!inited||!H.S||mySeat==null)return false;
  var a=H.actorSeat(); if(a==null)return false;
  var p=H.S.players[a]; if(!p)return false;
  return p.ai ? (botRunner&&H.aiActing) : (a===mySeat);
}

// ---- gating wrappers. Function declarations are window properties, so wrapping here
// intercepts BOTH the inline onclick handlers and engine-internal calls (aiStep included —
// which is exactly how bot turns stay legal on the botRunner while blocked everywhere else).
GATED.forEach(function(fn){
  var orig=window[fn];
  if(typeof orig!=='function'){try{console.warn('[net] missing action fn:',fn);}catch(e){}return;}
  window[fn]=function(){
    if(simming())return orig.apply(this,arguments);   // n2: MC playouts see the raw engine — no gate, no commit
    if(!canDrive()){pulse();return;}
    var r=orig.apply(this,arguments);
    afterAction();
    return r;
  };
});
BLOCKED.forEach(function(fn){
  if(typeof window[fn]!=='function')return;
  window[fn]=function(){pulse();};
});
// bots run ONLY on the botRunner client (the engine calls maybeRunAI internally after commits);
// n2: a HIDDEN tab does not INITIATE bot turns — a throttled/backgrounded runner stops racing
// the watchdog takeover; on return to visibility it resumes if still current.
var origMaybe=window.maybeRunAI;
window.maybeRunAI=function(){
  if(simming())return origMaybe.apply(this,arguments);
  if(!botRunner)return;
  if(typeof document!=='undefined'&&document.hidden)return;
  return origMaybe.apply(this,arguments);
};
if(typeof document!=='undefined'&&document.addEventListener){
  document.addEventListener('visibilitychange',function(){
    if(!document.hidden&&inited&&botRunner&&H.S&&!H.S.over)window.maybeRunAI();
  });
}

function afterAction(){
  if(!H.S)return;
  var a=H.actorSeat();
  if(a!==lastActor){lastActor=a;commit();}
  else if(H.S.over)commit();
  banner();
}

function commit(){
  if(!inited||!H.S)return;
  if(simming())return;   // n2: NEVER publish a playout clone — the hard fence behind the wrapper fence
  stampSeats();          // n2: the platform's seat map is authoritative in every published state
  var sig;
  try{sig=JSON.stringify(H.S)+'|'+JSON.stringify(H.UI);}catch(e){return;}
  if(sig===lastSentSig)return;
  lastSentSig=sig;
  post({type:'COMMIT',seq:++seq,S:H.S,UI:H.UI,actor:H.actorSeat(),over:!!H.S.over,
        standings:H.S.over?H.standings():null,
        diag:{seat:mySeat,runner:botRunner}});   // n2: for the platform's table log
  H.clearUndo();   // published — a takeback may no longer cross this point
}

function post(msg){
  msg.hanse=1;
  try{window.parent.postMessage(msg,parentOrigin||'*');}catch(e){}
}

function applyState(st){
  if(!st||!st.S){banner();return;}
  if(st.S.schema&&st.S.schema!==H.KEY){
    post({type:'ERROR',code:'key-mismatch',detail:'table build '+st.S.schema+' vs page '+H.KEY});
    fatal('This table was started on build '+st.S.schema+' — this page runs '+H.KEY+'. Rejoin once the platform points at a matching build.');
    return;
  }
  H.S=st.S;
  H.UI=(st.UI&&st.UI.sub)?st.UI:{sub:'move'};
  try{H.S.players.forEach(function(p){p.name=esc(p.name);});}catch(e){}
  stampSeats();   // n2: an applied state can never re-teach this table who is AI
  H.syncFlagsFromS();
  H.clearUndo();
  lastActor=H.actorSeat();
  lastSentSig='';
  H.render();
  banner();
  if(H.S.over){H.gameOver();return;}
  var p=actorP();
  if(p&&p.ai&&botRunner)window.maybeRunAI();
}

function init(d){
  mySeat=(d.seat|0);
  botRunner=!!d.botRunner;
  H.setAiSpeed((d.aiSpeed==='slow'||d.aiSpeed==='normal'||d.aiSpeed==='instant')?d.aiSpeed:'normal');
  // n2: any INIT may carry the seat map (the platform sends it on every INIT); setup's own
  // aiSeats remains the fallback so older parents keep working.
  if(Array.isArray(d.aiSeats))seatTruth=d.aiSeats;
  else if(d.setup&&Array.isArray(d.setup.aiSeats))seatTruth=d.setup.aiSeats;
  inited=true;
  if(helloTimer){clearInterval(helloTimer);helloTimer=null;}
  if(d.state&&d.state.S){applyState(d.state);return;}
  if(d.setup&&d.setup.n){
    var names=(d.setup.names||[]).map(esc);
    while(names.length<d.setup.n)names.push('Player '+(names.length+1));
    H.S=H.freshState(d.setup.n,names.slice(0,d.setup.n));
    (d.setup.aiSeats||[]).forEach(function(ai,i){var p=H.S.players[i];if(p)p.ai=ai||null;});
    H.UI={sub:'move'};
    H.syncFlagsFromS();
    H.clearUndo();
    lastActor=H.actorSeat();
    H.render();
    banner();
    commit();   // state 0 — the platform stores the fresh table
    var p=actorP();
    if(p&&p.ai&&botRunner)window.maybeRunAI();
    return;
  }
  banner();   // seat assigned; the table's first STATE follows
}

window.addEventListener('message',function(ev){
  var d=ev&&ev.data;
  if(!d||d.hanse!==1)return;
  if(parentOrigin===null){
    if(d.type!=='INIT')return;      // the first trusted message must be the INIT
    parentOrigin=ev.origin;
  } else if(ev.origin!==parentOrigin)return;
  if(d.type==='INIT')init(d);
  else if(d.type==='STATE')applyState({S:d.S,UI:d.UI});
  else if(d.type==='RESYNC_REQ'){lastSentSig='';commit();}
});

// ---- the status banner (bottom bar) + the blocked-click pulse ----
var bar=null,fatalMsg=null,pulseT=null;
function ensureBar(){
  if(bar)return bar;
  bar=document.createElement('div');
  bar.id='netbar';
  bar.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99999;font:600 13px/1.5 system-ui,sans-serif;'+
    'padding:7px 14px;text-align:center;color:#fff;background:#555;box-shadow:0 -1px 6px rgba(0,0,0,.35)';
  if(document.body)document.body.appendChild(bar);
  return bar;
}
function banner(){
  var b=ensureBar();
  if(fatalMsg){b.textContent=fatalMsg;b.style.background='#8a1f1f';return;}
  if(!inited){b.textContent='Online table — connecting to the lobby…';b.style.background='#555';return;}
  if(!H.S){b.textContent='Online table — seat '+(mySeat+1)+' · waiting for the table state…';b.style.background='#555';return;}
  var me=(mySeat!=null&&mySeat>=0)?H.S.players[mySeat]:null,a=H.actorSeat(),ap=(a!=null)?H.S.players[a]:null;
  var who=me?me.name:((mySeat==null||mySeat<0)?'watching':('seat '+(mySeat+1)));   // seat -1 = a spectator
  if(H.S.over){b.textContent='You are '+who+' — GAME OVER (see the Final Standing).';b.style.background='#3b3b6e';return;}
  if(!ap){b.textContent='You are '+who;b.style.background='#555';return;}
  if(ap.ai){b.textContent='You are '+who+' — '+ap.name+' (AI) is playing…';b.style.background='#7a4a1f';}
  else if(a===mySeat){b.textContent='You are '+who+' — YOUR MOVE.';b.style.background='#1f6f3f';}
  else{b.textContent='You are '+who+' — waiting for '+ap.name+'…';b.style.background='#7a4a1f';}
}
function pulse(){
  var b=ensureBar();
  b.style.background='#8a1f1f';
  if(pulseT)clearTimeout(pulseT);
  pulseT=setTimeout(function(){banner();},350);
}
function fatal(msg){fatalMsg=msg;banner();}

// exposed for the parent bridge, the harness and the probes
window.HANSE_NET={
  version:2,   // n2: sim fence + authoritative seat map + hidden-runner fence + commit diag
  get seat(){return mySeat;},
  get botRunner(){return botRunner;},
  get inited(){return inited;},
  get seatTruth(){return seatTruth;},
  canDrive:canDrive,
  resync:function(){lastSentSig='';commit();}
};

function hello(){post({type:'HELLO',key:H.KEY,app:H.APP_VERSION});}
hello();
helloTimer=setInterval(hello,2000);
banner();
})();