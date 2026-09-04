const fs = require('fs');
const ACCOUNTS_FILE = 'accounts.json';

// Load accounts
let accounts = {};
if (fs.existsSync(ACCOUNTS_FILE)) {
  accounts = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'));
} else {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify({}, null, 2));
}

let playerAccount = {};
let operators = {}; // danh sách OP

function saveAccounts() {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
}

function getOrCreateAccount(password) {
  if (!accounts[password]) {
    accounts[password] = { level: 1, exp: 0, goals: 0, assists: 0, clears: 0 };
  }
  return accounts[password];
}

function addExp(accountKey, amount) {
  const acc = getOrCreateAccount(accountKey);
  acc.exp += amount;
  while (acc.level < 50 && acc.exp >= 1000) {
    acc.exp -= 1000;
    acc.level += 1;
  }
  saveAccounts();
}

function addGoal(accountKey) {
  const acc = getOrCreateAccount(accountKey);
  acc.goals += 1;
  saveAccounts();
}

function addAssist(accountKey) {
  const acc = getOrCreateAccount(accountKey);
  acc.assists += 1;
  saveAccounts();
}

function addClear(accountKey) {
  const acc = getOrCreateAccount(accountKey);
  acc.clears += 1;
  saveAccounts();
}

// Hook vào emulator events
module.exports = function(room) {
  let lastKicker = null;

  room.onPlayerChat = (player, message) => {
    // Login bằng mật khẩu
    if (message.startsWith('!') && message.length > 1 && message !== '!OP') {
      const pass = message.substring(1);
      const acc = getOrCreateAccount(pass);
      playerAccount[player.id] = pass;
      room.sendAnnouncement(
        `Login thành công: Level ${acc.level}, EXP ${acc.exp}, Goals ${acc.goals}, Assists ${acc.assists}, Clears ${acc.clears}`,
        player.id,
        0x00FF00
      );
      return false;
    }

    // Clear bóng
    if (message === '!clear') {
      const accKey = playerAccount[player.id];
      if (accKey) {
        addExp(accKey, 15);
        addClear(accKey);
        room.sendAnnouncement(`${player.name} clear bóng! +15 EXP`, null, 0x00FFFF);
      }
      return false;
    }

    // Lệnh bí mật OP
    if (message === '!OP') {
      operators[player.id] = true;
      room.sendAnnouncement(`${player.name} đã vào chế độ OP!`, player.id, 0xFF0000);
      return false;
    }

    // Lệnh dành cho OP
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
        saveAccounts();
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

  room.onPlayerBallKick = player => {
    lastKicker = player;
  };

  room.onTeamGoal = team => {
    if (lastKicker) {
      const accKey = playerAccount[lastKicker.id];
      if (accKey) {
        addExp(accKey, 100);
        addGoal(accKey);
        room.sendAnnouncement(`${lastKicker.name} ghi bàn! +100 EXP`, null, 0x00FF00);
      }
    }
  };
};

