const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headless');

  await page.evaluate(() => {
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

    room.onPlayerJoin = (player) => {
      const accKey = playerAccount[player.id];
      if (accKey) {
        const acc = getOrCreateAccount(accKey);
        room.sendAnnouncement(`${player.name} [Lv.${acc.level}] đã vào phòng!`, null, 0x00FF00);
      } else {
        room.sendAnnouncement(`${player.name} chưa login account. Gõ !<mật khẩu> để login.`, player.id, 0xFFFF00);
      }
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
  });

  console.log("Room HAX7tc3 đã khởi tạo với đầy đủ tính năng!");
})();
