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

// Khởi tạo room Haxball
const room = HBInit({
  roomName: "HAX7tc3",
  maxPlayers: 20,
  public: true,
  password: "trithanhbainao"
});

// Khi player join, hiển thị level cạnh tên
room.onPlayerJoin = (player) => {
  const accKey = playerAccount[player.id];
  if (accKey) {
    const acc = getOrCreateAccount(accKey);
    room.setPlayerAdmin(player.id, operators[player.id] || false);
    room.sendAnnouncement(`${player.name} [Lv.${acc.level}] đã vào phòng!`, null, 0x00FF00);
  } else {
    room.sendAnnouncement(`${player.name} chưa login account. Gõ !<mật khẩu> để login.`, player.id, 0xFFFF00);
  }
};

// Chat commands
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
      room.sendAnnouncement(`${lastKicker.name} [Lv.${accounts[accKey].level}] ghi bàn! +100 EXP`, null, 0x00FF00);
    }
  }
};

