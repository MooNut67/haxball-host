const fs = require('fs');
const ACCOUNTS_FILE = 'accounts.json';

// load accounts
let accounts = {};
if (fs.existsSync(ACCOUNTS_FILE)) {
  accounts = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'));
} else {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify({}, null, 2));
}

let playerAccount = {};

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
  room.onPlayerChat = (player, message) => {
    if (message.startsWith('!')) {
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
    if (message === '!clear') {
      const accKey = playerAccount[player.id];
      if (accKey) {
        addExp(accKey, 15);
        addClear(accKey);
        room.sendAnnouncement(`${player.name} clear bóng! +15 EXP`, null, 0x00FFFF);
      }
      return false;
    }
    return true;
  };

  room.onGameStart = () => {
    room.getPlayerList().forEach(p => {
      const accKey = playerAccount[p.id];
      if (accKey) addExp(accKey, 50);
    });
  };

  let lastKicker = null;
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
