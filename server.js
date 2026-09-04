// server.js (debug-enhanced)
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = process.env.PORT || 3000;
let page = null;
let browser = null;

async function startBot() {
  try {
    console.log('Playwright chromium executable:', chromium.executablePath());

    browser = await chromium.launch({
      headless: true,
      executablePath: chromium.executablePath(),
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    page = await browser.newPage();

    page.on('console', msg => {
      try { console.log('PAGE LOG:', msg.text()); } catch (e) { console.log('PAGE LOG ERR', e && e.message); }
    });
    page.on('pageerror', err => console.log('PAGE ERROR:', err && err.message));
    page.on('requestfailed', req => console.log('REQUEST FAILED:', req.url(), req.failure() && req.failure().errorText));

    console.log('Navigating to https://www.haxball.com ...');
    await page.goto('https://www.haxball.com', { waitUntil: 'networkidle', timeout: 60000 });

    console.log('Waiting for HBInit to appear (45s timeout)...');
    const hbReady = await page.waitForFunction(() => typeof window.HBInit !== 'undefined', { timeout: 45000 })
      .catch(e => { console.log('waitForFunction timeout/error:', e && e.message); return null; });

    // capture debug artifacts regardless of hbReady
    try {
      const title = await page.title().catch(()=>null);
      const url = page.url();
      console.log('PAGE TITLE:', title);
      console.log('PAGE URL:', url);

      // save screenshot
      const screenshotPath = '/tmp/haxball.png';
      await page.screenshot({ path: screenshotPath, fullPage: true }).catch(e => console.log('screenshot error', e && e.message));
      console.log('Saved screenshot to', screenshotPath);

      // save HTML (first 20000 chars)
      const html = await page.content().catch(()=>null);
      if (html) {
        const snippet = html.slice(0, 20000);
        fs.writeFileSync('/tmp/page.html', snippet, 'utf8');
        console.log('Saved page HTML snippet to /tmp/page.html (first 20k chars)');
      }
    } catch (e) {
      console.log('Debug artifact capture error:', e && e.message);
    }

    if (!hbReady) {
      console.log('HBInit not found — aborting room creation attempt. Check /screenshot and /debug for page state.');
      return;
    }

    console.log('HBInit found — creating room inside page.evaluate with try/catch...');
    const evalResult = await page.evaluate(() => {
      try {
        const room = HBInit({
          roomName: "HAX7tc3",
          maxPlayers: 20,
          public: true,
          password: "" // empty for public visibility during debug
        });
        window.room = room;
        room.onPlayerJoin = p => console.log('ROOM onPlayerJoin', p && p.name, p && p.id);
        return { ok: true, name: (room.getRoomData && room.getRoomData().name) || room.roomName || 'HAX7tc3' };
      } catch (err) {
        return { ok: false, error: err && err.message ? err.message : String(err) };
      }
    }).catch(e => ({ ok: false, error: 'page.evaluate failed: ' + (e && e.message) }));

    console.log('page.evaluate result:', evalResult);
    if (evalResult && evalResult.ok) {
      console.log(`Room ${evalResult.name} đã khởi tạo với đầy đủ tính năng!`);
    } else {
      console.log('Room creation failed:', evalResult && evalResult.error);
    }

  } catch (err) {
    console.error('Startup error (outer):', err && err.stack ? err.stack : err);
  }
}

startBot().catch(err => console.error('startBot error:', err && err.stack ? err.stack : err));

// HTTP server with /health, /status, /debug, /screenshot
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
      return;
    }

    if (req.url === '/status') {
      if (!page) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'page not initialized yet' }));
        return;
      }
      try {
        const status = await page.evaluate(() => {
          try {
            const room = window.room || null;
            if (!room) return { ok: false, error: 'room not found in page context' };
            const players = room.getPlayerList().map(p => ({ id: p.id, name: p.name, team: p.team }));
            const roomData = (room.getRoomData && room.getRoomData()) || { name: room.roomName || 'HAX7tc3' };
            return { ok: true, roomName: roomData.name || 'HAX7tc3', players };
          } catch (e) {
            return { ok: false, error: e && e.message ? e.message : String(e) };
          }
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(status));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
      return;
    }

    if (req.url === '/debug') {
      // return page title, url, HBInit existence, and first 2000 chars of saved HTML
      const title = page ? await page.title().catch(()=>null) : null;
      const url = page ? page.url() : null;
      const hbExists = page ? await page.evaluate(() => typeof window.HBInit !== 'undefined').catch(()=>false) : false;
      let htmlSnippet = null;
      try {
        if (fs.existsSync('/tmp/page.html')) {
          htmlSnippet = fs.readFileSync('/tmp/page.html', 'utf8').slice(0, 2000);
        }
      } catch (e) { htmlSnippet = 'read error'; }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, title, url, hbExists, htmlSnippet }));
      return;
    }

    if (req.url === '/screenshot') {
      const p = '/tmp/haxball.png';
      if (fs.existsSync(p)) {
        const img = fs.readFileSync(p);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('screenshot not found');
      }
      return;
    }

    if (req.url === '/' || req.url === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<html><body><h1>Haxball Host (debug)</h1><p>Room: HAX7tc3</p><p>Use /status, /debug, /screenshot</p></body></html>`);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(PORT, () => console.log(`HTTP server listening on port ${PORT}`));

// graceful shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down.');
  try { if (browser) await browser.close(); } catch(e){}
  server.close(() => process.exit(0));
});
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down.');
  try { if (browser) await browser.close(); } catch(e){}
  server.close(() => process.exit(0));
});
