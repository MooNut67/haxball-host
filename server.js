// server.js
const http = require('http');
const { chromium } = require('playwright');

const PORT = process.env.PORT || 3000;

let page = null; // page must be accessible from HTTP handlers

async function startBot() {
  try {
    console.log('Playwright chromium executable:', chromium.executablePath());

    const browser = await chromium.launch({
      headless: true,
      executablePath: chromium.executablePath(),
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    page = await browser.newPage();

    // Forward page console messages to service logs for debugging
    page.on('console', msg => {
      try {
        console.log('PAGE LOG:', msg.text());
      } catch (e) {
        console.log('PAGE LOG ERROR:', e && e.message);
      }
    });

    // Open the main Haxball page (not /headless) so the room appears in public server list
    await page.goto('https://www.haxball.com', { waitUntil: 'networkidle' });

    // Wait until HBInit is available on the page
    await page.waitForFunction(() => typeof window.HBInit !== 'undefined', { timeout: 30000 });

    // Create the room and expose it to window.room so /status can read it
    await page.evaluate(() => {
      // --- Haxball room logic ---
      let accounts = {};
      let playerAccount = {};
      let operators = {};
      let lastKicker = null;

      function getOrCreateAccount(password) {
        if (!accounts[password]) {
          accounts[password] = { level: 1, exp: 0, goals: 0, assists: 0, clears: 0 };
        }
        return accounts[password];
      }

      function addExp(accKey, amount) {
        const acc = getOrCreateAccount(accKey);
        acc.exp += amount;
        while (acc.level < 50 && acc.exp >= 1000) {
          acc.exp -= 1000;
          acc.level++;
        }
      }

      function addGoal(accKey) { getOrCreateAccount(accKey).goals++; }
      function addAssist(accKey) { getOrCreateAccount(accKey).assists++; }
      function addClear(accKey) { getOrCreateAccount(accKey).clears++; }

      const room = HBInit({
        roomName: "HAX7tc3",
        maxPlayers: 20,
        public: true,
        password: "trithanhbainao"
      });

      // Expose room to window so the Node HTTP server can query it via page.evaluate
      window.room = room;

      room.onPlayerJoin = (player) => {
        const accKey = playerAccount[player.id];
        if (accKey) {
          const acc = getOrCreateAccount(accKey);
          room.sendAnnouncement(`${player.name} [Lv.${acc.level}] đã vào phòng!`, null, 0x00FF00);
        } else {
          room.sendAnnouncement(`${player.name} chưa login account. Gõ !<mật khẩu> để login.`, player.id, 0xFFFF00);
        }
        // Also log to browser console so Playwright forwards it to service logs
        console.log('onPlayerJoin', player && player.name, player && player.id);
      };

      room.onPlayerChat = (player, message) => {
        if (message.startsWith('!') && message.length > 1 && message !== '!OP') {
          const pass = message.substring(1);
          const acc = getOrCreateAccount(pass);
          playerAccount[player.id] = pass;
          room.sendAnnouncement(
            `Login thành công: ${player.name} [Lv.${acc.level}] | EXP ${acc.exp}, Goals ${acc.goals}, Assists ${acc.assists}, Clears ${acc.clears}`,
            player.id,
            0x00FF00
          );
          return false;
        }

        if (message === '!clear') {
          const accKey = playerAccount[player.id];
          if (accKey) {
            addExp(accKey, 15);
            addClear(accKey);
            room.sendAnnouncement(`${player.name} [Lv.${accounts[accKey].level}] clear bóng! +15 EXP`, null, 0x00FFFF);
          }
          return false;
        }

        if (message === '!OP') {
          operators[player.id] = true;
          room.setPlayerAdmin(player.id, true);
          room.sendAnnouncement(`${player.name} đã vào chế độ OP!`, player.id, 0xFF0000);
          return false;
        }

        if (operators[player.id]) {
          if (message.startsWith('!kick ')) {
            const targetName = message.split(' ')[1];
            const target = room.getPlayerList().find(p => p.name === targetName);
            if (target) {
              room.kickPlayer(target.id, 'Kicked by OP', false);
            }
            return false;
          }
          if (message === '!reset') {
            accounts = {};
            room.sendAnnouncement('Toàn bộ stats đã reset bởi OP!', null, 0xFF0000);
            return false;
          }
        }

        return true;
      };

      room.onGameStart = () => {
        room.getPlayerList().forEach(p => {
          const accKey = playerAccount[p.id];
          if (accKey) addExp(accKey, 50);
        });
        console.log('onGameStart');
      };

      room.onPlayerBallKick = player => { lastKicker = player; };

      room.onTeamGoal = team => {
        if (lastKicker) {
          const accKey = playerAccount[lastKicker.id];
          if (accKey) {
            addExp(accKey, 100);
            addGoal(accKey);
            room.sendAnnouncement(`${lastKicker.name} [Lv.${accounts[accKey].level}] ghi bàn! +100 EXP`, null, 0x00FF00);
          }
        }
      };

      console.log('Room created in page context:', room.getRoomData && room.getRoomData().name);
      // --- end logic ---
    });

    console.log("Room HAX7tc3 đã khởi tạo với đầy đủ tính năng!");
  } catch (err) {
    console.error('Startup error:', err);
    // keep process alive so Render doesn't think service died
  }
}

// Start the bot (non-blocking)
startBot().catch(err => console.error('startBot error:', err));

// HTTP server with /health, /status and root HTML
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
      return;
    }

    if (req.url === '/status') {
      // If page is not ready yet, return informative response
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

    if (req.url === '/' || req.url === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!doctype html>
        <html>
          <head><meta charset="utf-8"><title>Haxball Host</title></head>
          <body style="font-family:Arial,Helvetica,sans-serif;line-height:1.6">
            <h1>Haxball Host</h1>
            <p>Room: <strong>HAX7tc3</strong></p>
            <p>Password: <strong>trithanhbainao</strong></p>
            <p>Use <code>/status</code> to see current players.</p>
          </body>
        </html>
      `);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down.');
  server.close(() => process.exit(0));
});
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down.');
  server.close(() => process.exit(0));
});
