// Browser smoke for the ONLINE-TABLE bridge — REAL iframes, REAL postMessage, the real render.
// Serves the repo over local http, opens playtests/net-harness.html in Chromium, then:
//   1) AI vs AI (instant): a FULL game soaks through the harness router; both frames' S must
//      end byte-identical; zero protocol errors.
//   2) Human vs Human: a scripted half-turn in frame A must mirror into frame B; the idle
//      frame must be action-blocked both before and after.
// Run: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_PATH=<playwright install> node playtests/net-smoke.mjs
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const ROOT=path.join(path.dirname(fileURLToPath(import.meta.url)),'..');
const PORT=8377;
let failures=0;
const ok=(c,l)=>{ if(c)console.log('  ok  '+l); else {failures++;console.log('  FAIL '+l);} };

const srv=spawn('python3',['-m','http.server',String(PORT),'--bind','127.0.0.1'],{cwd:ROOT,stdio:'ignore'});
await new Promise(r=>setTimeout(r,900));

let browser;
try{ browser=await chromium.launch(); }
catch(e){ browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}); }
const page=await browser.newPage();
const pageErrors=[];
page.on('pageerror',e=>pageErrors.push('page:'+e.message));
page.on('console',m=>{ if(m.type()==='error'){ const u=(m.location()&&m.location().url)||'';
  pageErrors.push('console:'+m.text()+' @'+u); } });

const framesReady=()=>page.waitForFunction(()=>{
  const fs=[...document.querySelectorAll('iframe')];
  return fs.length===2&&fs.every(f=>f.contentWindow&&f.contentWindow.HANSE_NET);
},undefined,{timeout:20000});

await page.goto(`http://127.0.0.1:${PORT}/playtests/net-harness.html`);
await framesReady();

// ---- 1) full-game soak: AI vs AI, instant ----
console.log('SMOKE 1 — AI vs AI full game through real iframes:');
await page.click('text=AI vs AI');
await page.waitForFunction(()=>window.__hs&&window.__hs.over===true,undefined,{timeout:180000});
const soak=await page.evaluate(()=>{
  const [a,b]=[...document.querySelectorAll('iframe')].map(f=>f.contentWindow.HANSE.S);
  return { eq:JSON.stringify(a)===JSON.stringify(b), turn:a&&a.turn,
           errors:window.__hs.errors, ver:window.__hs.ver, standings:window.__hs.standings };
});
ok(soak.eq,`both frames ended byte-identical (round ${soak.turn}, ${soak.ver} commits)`);
ok(soak.errors.length===0,'zero protocol errors ('+JSON.stringify(soak.errors)+')');
ok(!!(soak.standings&&soak.standings.length===2),'standings delivered: '+JSON.stringify(soak.standings));

// ---- 2) human vs human: one scripted half-turn + the gate ----
console.log('SMOKE 2 — Human vs Human: mirroring + the action gate:');
await page.reload(); await framesReady();
await page.click('text=Human vs Human');
await page.waitForFunction(()=>window.__hs&&window.__hs.ver>=1,undefined,{timeout:15000});
const f0=page.frames().find(f=>f.name()==='seat0');
const f1=page.frames().find(f=>f.name()==='seat1');
const blockedBefore=await f1.evaluate(()=>{ const s=JSON.stringify(window.HANSE.S); window.doMove('A'); return s===JSON.stringify(window.HANSE.S); });
ok(blockedBefore,'the guest frame is blocked while seat 0 holds the turn');
await f0.evaluate(()=>{ const H=window.HANSE; const p=H.S.players[H.S.active];
  const ADJ={A:['B','C'],B:['A','D'],C:['A','D'],D:['B','C']};
  const c=!p.placed?'A':ADJ[p.cell][0];
  window.doMove(c); window.chooseLine('row'); window.endTurn(); });
await page.waitForFunction(()=>window.__hs&&window.__hs.ver>=2,undefined,{timeout:15000});
const after=await page.evaluate(()=>{
  const [a,b]=[...document.querySelectorAll('iframe')].map(f=>f.contentWindow.HANSE);
  return { eq:JSON.stringify(a.S)===JSON.stringify(b.S), actor:a.actorSeat() };
});
ok(after.eq,'the half-turn mirrored into the guest frame');
ok(after.actor===1,'the turn passed to seat 1');
const blockedHost=await f0.evaluate(()=>{ const s=JSON.stringify(window.HANSE.S); window.doMove('A'); return s===JSON.stringify(window.HANSE.S); });
ok(blockedHost,'the host frame is blocked while seat 1 holds the turn');
const bannerTxt=await f1.evaluate(()=>document.getElementById('netbar')&&document.getElementById('netbar').textContent);
ok(/YOUR MOVE/.test(bannerTxt||''),'the guest banner shows YOUR MOVE ("'+bannerTxt+'")');

// ---- 3) rejoin: reload the guest frame mid-game; the harness re-seats it from the latest state ----
console.log('SMOKE 3 — guest reload/rejoin mid-game:');
await page.evaluate(()=>{ document.getElementById('f1').contentWindow.location.reload(); });
await page.waitForFunction(()=>{
  const f=document.getElementById('f1');
  return f.contentWindow&&f.contentWindow.HANSE_NET&&f.contentWindow.HANSE_NET.inited&&f.contentWindow.HANSE&&f.contentWindow.HANSE.S;
},undefined,{timeout:25000});
const f1b=page.frames().find(f=>f.name()==='seat1');
const rejoin=await page.evaluate(async ()=>{
  const get=(id)=>document.getElementById(id).contentWindow;
  for(let i=0;i<40;i++){
    const a=get('f0').HANSE, b=get('f1').HANSE;
    if(a&&a.S&&b&&b.S) return { eq:JSON.stringify(a.S)===JSON.stringify(b.S), actor:b.actorSeat() };
    await new Promise(r=>setTimeout(r,250));
  }
  const probe=(w)=>{ try{ return {hanse:!!w.HANSE,net:!!w.HANSE_NET,ready:w.document.readyState,href:w.location.href.slice(-40)}; }catch(e){ return {err:String(e).slice(0,80)}; } };
  return { diag:{ f0:probe(get('f0')), f1:probe(get('f1')) } };
});
ok(!rejoin.diag&&rejoin.eq,'the reloaded guest converged to the live state'+(rejoin.diag?' DIAG '+JSON.stringify(rejoin.diag):''));
ok(!rejoin.diag&&rejoin.actor===1,'the reloaded guest still holds the turn');
await f1b.evaluate(()=>{ const H=window.HANSE; const p=H.S.players[H.S.active];
  const ADJ={A:['B','C'],B:['A','D'],C:['A','D'],D:['B','C']};
  const c=!p.placed?'D':ADJ[p.cell][0];
  window.doMove(c); window.chooseLine('row'); window.endTurn(); });
try{
  await page.waitForFunction(()=>window.__hs&&window.__hs.ver>=3,undefined,{timeout:15000});
}catch(e){
  const d=await f1b.evaluate(()=>({sub:window.HANSE.UI&&window.HANSE.UI.sub,active:window.HANSE.S&&window.HANSE.S.active,
    turn:window.HANSE.S&&window.HANSE.S.turn,seat:window.HANSE_NET.seat,inited:window.HANSE_NET.inited,
    canDrive:window.HANSE_NET.canDrive(),banner:document.getElementById('netbar')&&document.getElementById('netbar').textContent}));
  const hs=await page.evaluate(()=>window.__hs);
  console.log('  DIAG reloaded-guest:',JSON.stringify(d));
  console.log('  DIAG harness:',JSON.stringify(hs));
  throw e;
}
const after2=await page.evaluate(()=>{
  const [a,b]=[...document.querySelectorAll('iframe')].map(f=>f.contentWindow.HANSE);
  return { eq:JSON.stringify(a.S)===JSON.stringify(b.S), actor:a.actorSeat() };
});
ok(after2.eq,'the post-rejoin half-turn mirrored back to the host');
ok(after2.actor===0,'the turn passed back to seat 0');

const realErrors=pageErrors.filter(t=>!/favicon\.ico|net::ERR_|unpkg\.com/.test(t));
ok(realErrors.length===0,'no page/console errors ('+JSON.stringify(realErrors.slice(0,3))+')');

await browser.close(); srv.kill();
console.log(failures?`\n*** ${failures} FAILURES ***`:'\nNET-SMOKE: ALL PASS');
process.exit(failures?1:0);