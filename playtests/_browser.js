// _browser.js — finds playwright-core and a Chromium for the headless page checks
// (render-check.js · ui-game.js). Nothing here touches the game.
//   PW_CORE=   a playwright-core module to require (default: `playwright-core` on the require
//              path, then /tmp/pwtest/node_modules/playwright-core — put one there with
//              `mkdir -p /tmp/pwtest && cd /tmp/pwtest && npm i playwright-core`)
//   PW_CHROME= a Chromium executable (default: the newest chromium-* under
//              $PLAYWRIGHT_BROWSERS_PATH or /opt/pw-browsers, else playwright's own lookup)
'use strict';
const fs = require('fs');
const path = require('path');

function pwCore() {
  const tries = [process.env.PW_CORE, 'playwright-core', '/tmp/pwtest/node_modules/playwright-core'].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (e) { /* next */ } }
  console.error('playwright-core not found. Install one and point PW_CORE at it:\n'
    + '  mkdir -p /tmp/pwtest && cd /tmp/pwtest && npm i playwright-core\n'
    + '  PW_CORE=/tmp/pwtest/node_modules/playwright-core node ' + path.relative(process.cwd(), process.argv[1]));
  process.exit(2);
}

function chromePath() {
  if (process.env.PW_CHROME) return process.env.PW_CHROME;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  try {
    const d = fs.readdirSync(root).filter(n => /^chromium-\d+$/.test(n))
      .sort((a, b) => parseInt(a.slice(9), 10) - parseInt(b.slice(9), 10)).pop();
    if (d) { const p = path.join(root, d, 'chrome-linux', 'chrome'); if (fs.existsSync(p)) return p; }
  } catch (e) { /* fall through */ }
  return undefined;
}

module.exports.launch = async function () {
  const { chromium } = pwCore();
  return chromium.launch({ executablePath: chromePath(), args: ['--no-sandbox'] });
};
module.exports.fileUrl = f => 'file://' + path.resolve(__dirname, '..', f);
