const fs = require('fs');
const http = require('http');
const PORT = process.env.PORT || 3000;

const ACCOUNTS_FILE = 'accounts.json';

// Load accounts
let accounts = {};
if (fs.existsSync(ACCOUNTS_FILE)) {
  accounts = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'));
} else {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify({}, null, 2));
}

let playerAccount = {};
let operators = {};
let lastKicker = null;

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

// Fake room object để minh họa (Render không có HBInit, nhưng khi chạy emulator thì thay bằng HBInit)
const room = {
  onPlayerChat: () => {},
  onGameStart: () => {},
  onPlayerBallKick: () => {},
  onTeamGoal: () => {},
  getPlayerList: () => [],
  sendAnnouncement: (msg) => console.log(msg),
  kickPlayer: (id, reason) => console.log(`Kick ${id}: ${reason}`)
};

// Chat commands
room.onPlayerChat = (player, message) => {
  if (message.startsWith('!') && message.length > 1 && message !== '!OP') {
    const pass = message.substring(1);
    const acc = getOrCreateAccount(pass);
    playerAccount[player.id] = pass;
    room.sendAnnouncement(
      `Login thành công: Level ${acc.level}, EXP ${acc.exp}, Goals ${acc.goals}, Assists ${acc.assists}, Clears ${acc.clears}`
    );
    return false;
  }

  if (message === '!clear') {
    const accKey = playerAccount[player.id];
    if (accKey) {
      addExp(accKey, 15);
      addClear(accKey);
      room.sendAnnouncement(`${player.name} clear bóng! +15 EXP`);
    }
    return false;
  }

  if (message === '!OP') {
    operators[player.id] = true;
    room.sendAnnouncement(`${player.name} đã vào chế độ OP!`);
    return false;
  }

  if (operators[player.id]) {
    if (message.startsWith('!kick ')) {
      const targetName = message.split(' ')[1];
      const target = room.getPlayerList().find(p => p.name === targetName);
      if (target) {
        room.kickPlayer(target.id, 'Kicked by OP');
      }
      return false;
    }
    if (message === '!reset') {
      accounts = {};
      saveAccounts();
      room.sendAnnouncement('Toàn bộ stats đã reset bởi OP!');
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
      room.sendAnnouncement(`${lastKicker.name} ghi bàn! +100 EXP`);
    }
  }
};

// HTTP server để Render không báo lỗi
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Haxball server đang chạy!\n');
}).listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
