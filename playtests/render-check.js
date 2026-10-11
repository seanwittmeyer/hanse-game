// render-check.js — loads rulebook.html, print.html and play.html in a headless Chromium and
// fails on any page error or console error (a missing art file is ignored). The rule battery
// never loads the kit or the rulebook; this does. Run after any edit to a page or components.js.
// Usage: node playtests/render-check.js [page.html ...]      (see _browser.js for PW_CORE / PW_CHROME)
'use strict';
const { launch, fileUrl } = require('./_browser.js');
const args = process.argv.slice(2);
const pages = args.length ? args : ['rulebook.html', 'print.html', 'play.html'];
const IGNORE = /favicon|ERR_FILE_NOT_FOUND.*\.(png|jpe?g|svg|webp|woff2?|ttf)/i;

(async () => {
  const b = await launch();
  let bad = 0;
  for (const f of pages) {
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
    p.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text().slice(0, 160)); });
    await p.goto(fileUrl(f), { waitUntil: 'load', timeout: 60000 });
    await p.waitForTimeout(2500);
    const real = errs.filter(e => !IGNORE.test(e));
    console.log(f + ': ' + (real.length ? 'ERRORS (' + real.length + ')' : 'clean'));
    real.slice(0, 6).forEach(e => console.log('   ' + e));
    if (real.length) bad++;
    await p.close();
  }
  await b.close();
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
