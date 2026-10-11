// ui-game.js — drives one whole AI game through play.html's REAL UI (render on) in a headless
// Chromium and reports the end state and any page error. The battery and the sim stub render;
// this does not. Usage: node playtests/ui-game.js [players=3] [tier=trader]
'use strict';
const { launch, fileUrl } = require('./_browser.js');
const N = parseInt(process.argv[2] || '3', 10);
const TIER = process.argv[3] || 'trader';

(async () => {
  const b = await launch();
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/ERR_FILE_NOT_FOUND/.test(m.text())) errs.push('CONSOLE: ' + m.text().slice(0, 200)); });
  await p.goto(fileUrl('play.html'), { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(1200);
  const res = await p.evaluate(async ([n, tier]) => {
    setupN = n;
    for (let i = 0; i < n; i++) {
      const nm = document.getElementById('nm' + i); if (nm) nm.value = 'P' + (i + 1);
      const ai = document.getElementById('ai' + i); if (ai) ai.value = tier;
    }
    AI_SPEED = 0; startGame();
    const t0 = Date.now();
    while (!S.over && Date.now() - t0 < 180000) {
      if (aiTurn() && !aiActing) { try { aiStep(); } catch (e) { return { err: String(e) }; } }
      else { await new Promise(r => setTimeout(r, 5)); }
    }
    return {
      over: !!S.over, turn: S.turn, reason: S.endReason,
      contracts: S.players.map(x => (x.contracts || []).filter(c => c.done).length),
      totals: S.players.map(x => scorePlayer(x).total)
    };
  }, [N, TIER]);
  console.log(JSON.stringify(res));
  console.log(errs.length ? 'ERRORS: ' + errs.slice(0, 5).join(' | ') : 'no page errors');
  await b.close();
  process.exit((errs.length || res.err || !res.over) ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
