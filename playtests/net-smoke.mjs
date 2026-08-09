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
},{timeout:20000});

await page.goto(`http://127.0.0.1:${PORT}/playtests/net-harness.html`);
await framesReady();

// ---- 1) full-game soak: AI vs AI, instant ----
console.log('SMOKE 1 — AI vs AI full game through real iframes:');
await page.click('text=AI vs AI');
await page.waitForFunction(()=>window.__hs&&window.__hs.over===true,{timeout:180000});
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
await page.waitForFunction(()=>window.__hs&&window.__hs.ver>=1,{timeout:15000});
const f0=page.frames().find(f=>f.name()==='seat0');
const f1=page.frames().find(f=>f.name()==='seat1');
const blockedBefore=await f1.evaluate(()=>{ const s=JSON.stringify(window.HANSE.S); window.doMove('A'); return s===JSON.stringify(window.HANSE.S); });
ok(blockedBefore,'the guest frame is blocked while seat 0 holds the turn');
await f0.evaluate(()=>{ const H=window.HANSE; const p=H.S.players[H.S.active];
  const ADJ={A:['B','C'],B:['A','D'],C:['A','D'],D:['B','C']};
  const c=!p.placed?'A':ADJ[p.cell][0];
  window.doMove(c); window.chooseLine('row'); window.endTurn(); });
await page.waitForFunction(()=>window.__hs&&window.__hs.ver>=2,{timeout:15000});
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

const realErrors=pageErrors.filter(t=>!/favicon\.ico|net::ERR_|unpkg\.com/.test(t));
ok(realErrors.length===0,'no page/console errors ('+JSON.stringify(realErrors.slice(0,3))+')');

await browser.close(); srv.kill();
console.log(failures?`\n*** ${failures} FAILURES ***`:'\nNET-SMOKE: ALL PASS');
process.exit(failures?1:0);