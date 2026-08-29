// aid-overflow.js — the player-aid FIT gate (designer-ruled 2026-08-03).
// Renders print.html headlessly and asserts every .aid face fits its 4.7x3.4 card:
// scrollHeight <= clientHeight and scrollWidth <= clientWidth (+1px slack). The aid
// keeps overflow:hidden for print safety; this gate ensures the hidden edge never
// actually clips content. Fails loud so a copy edit can't ship a silent clip.
// Run: node playtests/aid-overflow.js   (serves the repo on an ephemeral port itself)
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.css': 'text/css' };

function loadPlaywright() {
  const tries = ['playwright', '/opt/node22/lib/node_modules/playwright', process.env.PW_PATH].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (e) {} }
  throw new Error('playwright not found — set PW_PATH');
}

(async () => {
  const server = http.createServer((req, res) => {
    const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
    fs.readFile(p, (err, data) => {
      if (err) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
      res.end(data);
    });
  }).listen(0);
  await new Promise(r => server.once('listening', r));
  const port = server.address().port;

  const pw = loadPlaywright();
  const opts = {};
  if (process.env.PW_CHROMIUM) opts.executablePath = process.env.PW_CHROMIUM;
  else if (fs.existsSync('/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'))
    opts.executablePath = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
  const browser = await pw.chromium.launch(opts);
  const page = await browser.newPage({ viewport: { width: 2200, height: 1500 } });
  await page.goto('http://localhost:' + port + '/print.html', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const faces = await page.evaluate(() => [...document.querySelectorAll('.aid')].map((el, i) => ({
    i, face: el.classList.contains('back') ? 'back' : 'front',
    sh: el.scrollHeight, ch: el.clientHeight, sw: el.scrollWidth, cw: el.clientWidth,
  })));
  await browser.close();
  server.close();

  if (!faces.length) { console.error('FAIL: no .aid faces rendered'); process.exit(1); }
  let bad = 0;
  const seen = new Set();
  faces.forEach(f => {
    const over = f.sh > f.ch + 1 || f.sw > f.cw + 1;
    const key = f.face;
    if (!seen.has(key)) {
      seen.add(key);
      console.log((over ? 'FAIL' : ' ok ') + ` aid ${f.face}: scroll ${f.sw}x${f.sh} vs client ${f.cw}x${f.ch}` +
        (over ? ` — OVERFLOWS by ${Math.max(0, f.sh - f.ch)}px tall / ${Math.max(0, f.sw - f.cw)}px wide` : ''));
    }
    if (over) bad++;
  });
  if (bad) { console.error(`*** ${bad}/${faces.length} aid faces overflow — cut copy, never shrink below the .105in floor ***`); process.exit(1); }
  console.log(`ALL FIT — ${faces.length} aid faces within their cards`);
})().catch(e => { console.error(e); process.exit(1); });
