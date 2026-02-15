const SUPER_ADMIN_PASSWORD = "super_admin";
const ADMIN_PASSWORD = "admin";
const MODE = "pick"; // can be "rand" or "pick"
const ROOM_NAME = `💥 [De Paul's auto room] 5v5 (${MODE})`;
const PUBLIC = true;
const ACTIVITY_TIMEOUT = 10;
const AFK_TIMEOUT = 10 * 60;
const FIRST_PICK_TIMEOUT = 15;
const PICK_TIMEOUT = 25;
const PAUSE_TIMEOUT = 15;
const PENALTY_TIMEOUT = 10;
const AFTER_GAME_REST = 2.5;
const PREDICTION_PERIOD = 60;
const MAX_SUBSTITUTIONS = 2;
const MAX_PLAYERS = 5;
const TIME_LIMIT = 5;
const SCORE_LIMIT = 4;
const MIN_PLAYERS_FOR_STATS = MAX_PLAYERS - 1;
const MIN_VOTES_FOR_SURRENDER = MAX_PLAYERS - 2;
const MAX_ADDED_TIME = 90;
const NOTIFICATION_INTERVAL = 5 * 60;
const CHECK_AFK_INTERVAL = 60;
const LATE_SUBSTITUTION_PERIOD = 30;
const MAX_AFK_PLAYERS = 3;
const MAX_SIZE_ADJUSTMENT_RATIO = 0.3;
const SAVE_RECORDINGS = true;
const MAX_WARNINGS_PER_PLAYER = 3;
const VIOLATION_BAN_PERIOD = 3;
const YELLOW_BAN_PERIOD = 10;
const DISCORD_WEBHOOK = null;
const DISCORD_LOG_WEBHOOK = null;
const DISCORD_LINK = null;
const RED = 0xFA3E3E;
const GREEN = 0x5DB899;
const YELLOW = 0xF1CC81;
const BLUE = 0x047CC4;
const BALL_COLORS = [0xFFFFCC, 0xCCFFFF, 0xE5CCFF, 0xCCFFCC, 0xFFCCFF, 0xE5E7E9];
const TEAM_NAMES = {
  1: "RED",
  2: "BLUE",
};
const ROLE = {
  PLAYER: 0,
  ADMIN: 1,
  SUPER_ADMIN: 2,
};
const PLAYER_SCORING_RULES = {
  goals: 5,
  assists: 2, // An assist is a pass as well so you will in fact get 3 points
  ownGoals: -3,
  passes: 1,
  shotsOnTarget: 0.5,
  stoppedShots: 2,
  errorsLedToGoal: -2,
  attemptsLedToOG: 2,
  penaltiesScored: 1,
  penaltiesMissed: -1,
  touches: 0.001,
};
const TEAM_COLORS = [
  [[60, 0xFFCC00, [0xE83030]], [60, 0xFFCC00, [0x004170]]],
  [[60, 0xFFFFFF, [0xFF4A4A]], [60, 0xFFFFFF, [0x5ECFFF]]],
  [[60, 0xFFFFFF, [0xD60419]], [60, 0xFFFFFF, [0x0099FF]]],
  [[45, 0x000000, [0xFF2400, 0xFFFF00]], [45, 0x000000, [0x1F51FF, 0xFFFFFF]]],
  [[0, 0xF7FFF2, [0xE00202, 0xB00101, 0x800000]], [0, 0xF7FFF2, [0x00F7FF, 0x00D1D1, 0x00A7AD]]],
  [[90, 0xF7FFF2, [0xFF2121, 0xFF5757, 0xFC9595]], [90, 0xF7FFF2, [0x00C3FF, 0x45E0FF, 0xB5F5FC]]],
  [[45, 0xFFFFFF, [0x000000, 0xFF0000, 0x000000]], [45, 0x808080, [0xFFFFFF, 0x0096FF, 0xFFFFFF]]],
  [[45, 0xFFFFFF, [0xD60000, 0x000000, 0xD60000]], [45, 0xFFFFFF, [0x0058A3, 0x000000, 0x0058A3]]],
  [[-45, 0xFFCC00, [0xD10000, 0x8C0000, 0xD10000]], [-45, 0xFFCC00, [0x00DDFF, 0x87E3FF, 0x00DDFF]]],
  [[232, 0xFFFFFF, [0xFFCCFA, 0xFF99DD, 0xFF6176]], [129, 0xFFFFFF, [0x4D39CC, 0x7A70FF, 0x7DB1FF]]],
];
const GOALKEEPER_COLORS = {
  red: [0, 0xFFFFFF, [0x363636, 0x262626, 0x363636]],
  blue: [0, 0xFFFFFF, [0x13A720, 0x2FD835, 0x13A720]],
};
const GOAL_COMMENTARIES = {
  "-3": [
    "Một bàn thắng danh dự!",
    "Một niềm an ủi nhỏ nhoi cho đội bóng.",
  ],
  "-2": [
    "Liệu sẽ có một cuộc lội ngược dòng xảy ra?",
    "Một tia hy vọng vừa được nhen nhóm!",
    "Tỉ số đã được rút ngắn còn 2 bàn.",
    "Họ chưa chịu đầu hàng!",
    "Liệu đây có phải là sự khởi đầu của một điều kỳ diệu?",
  ],
  "-1": [
    "Cách biệt chỉ còn là 1 bàn mong manh!",
    "Áp lực đang đè nặng lên đôi vai đội dẫn trước!",
    "Chỉ cần một bàn nữa thôi và mọi thứ sẽ quay trở lại vạch xuất phát!",
    "Trận đấu giờ sẽ trở nên hấp dẫn và kịch tính hơn bao giờ hết!",
  ],
  "0": [
    "Một bàn thắng gỡ hòa vô cùng quan trọng!",
    "Trận đấu đã trở lại vạch xuất phát!",
    "Tất cả bắt đầu lại từ đầu! Và không ai muốn thua ngay lúc này!",
    "Mọi thứ như nổ tung sau bàn gỡ hòa!",
    "Thế trận đang cân bằng tuyệt đối!",
  ],
  "1": [
    "Một cách biệt đã được tạo ra!",
    "Pha ghi bàn mở ra lợi thế cho đội bóng!",
    "Lợi thế mong manh nhưng cực kỳ quý giá.",
    "Một bàn thắng có thể đã thay đổi cả cục diện trận đấu.",
  ],
  "2": [
    "Cách biệt đã được nâng lên 2 bàn!",
    "Họ đang kiểm soát hoàn toàn thế trận!",
    "Áp lực đè nặng lên hàng phòng ngự đối phương!",
    "Một khoảng cách an toàn cho đội bóng.",
    "Đội bóng đang chơi như lên đồng!",
  ],
  "3": [
    "Cách biệt đã trở nên quá lớn để hy vọng cho một cuộc lội ngược dòng.",
    "Một trận đấu gần như đã ngã ngũ.",
    "Họ đang dạy cho đối phương một bài học!",
    "Chiến thắng gần như nằm trong tay họ.",
    "Sự chênh lệch đẳng cấp đang được thể hiện rõ rệt.",
  ],
  "4": [
    "Một cơn ác mộng thực sự cho hàng thủ đối phương!",
    "Thế trận hoàn toàn một chiều trong trận đấu này.",
    "Họ đang bị nghiền nát không thương tiếc!",
    "Một tỉ số không thể cứu vãn được nữa rồi.",
    "Đây là lúc để nghĩ đến danh dự hơn là chiến thắng.",
  ],
  "5": [
    "Trận đấu đã trở thành cuộc dạo chơi.",
    "Không ai có thể ngờ tỉ số lại chênh lệch đến mức này.",
    "Một thảm họa thực sự cho đội bóng bị dẫn!",
  ],
};
const WINNING_GOAL_COMMENTARIES = [
  "VÀ ĐÓ LÀ BÀN THẮNG QUYẾT ĐỊNH",
  "DẤU CHẤM HẾT CHO NHỮNG NỖ LỰC PHÍA BÊN KIA",
  "ĐỘI BÓNG MẠNH HƠN ĐÃ LÊN TIẾNG",
  "MỘT CHIẾN THẮNG KHUẤT PHỤC",
  "CUỘC CHƠI KẾT THÚC",
  "KHÔNG THỂ NGĂN CẢN! BÀN THẮNG ẤN ĐỊNH CHIẾN THẮNG!",
  "VẬY TRẬN ĐẤU ĐƯỢC ĐÓNG LẠI VỚI BÀN THẮNG NÀY",
  "MỘT KHOẢNH KHẮC NGÔI SAO",
];
const SCORER_COMMENTARIES = {
  "1": "Pha lập công do công của",
  "2": "Cú đúp dành cho",
  "3": "Hattrick đến từ",
  "4": "THẬT KHÔNG THỂ TIN ĐƯỢC, poker cho",
  "5": "REPOCKER CHO NGƯỜI NGOÀI HÀNH TINH",
};
const PENALTY_GOAL_COMMENTARIES = [
  "Rất lạnh lùng và vô cùng bản lĩnh",
  "Rất quyết đoán, một cú sút với lực căng",
  "Vàoooo, tỉ số luân lưu đã được nâng lên",
  "Quá đơn giản và nhẹ nhàng",
  "Chính xác đến từng centimet",
];
const PENALTY_MISS_COMMENTARIES = [
  "Áp lực quá lớn đã khiến cho cầu thủ thực hiện quả luân lưu không thành công",
  "Không vàooooooo, rất đáng tiếc",
  "Không vàooooo, cái duyên trên chấm 11 mét đã không xuất hiện ngày hôm nay",
  "Không vàooo, quá thiếu may mắn",
];
const STADIUM_TRAINING = '{"name":"Practice","width":420,"height":200,"spawnDistance":170,"bg":{"type":"grass","width":370,"height":170,"kickOffRadius":75,"cornerRadius":0},"vertexes":[{"x":-370,"y":170,"trait":"ballArea"},{"x":-370,"y":-170,"trait":"ballArea"},{"x":370,"y":170,"trait":"ballArea"},{"x":370,"y":-170,"trait":"ballArea"},{"x":0,"y":200,"trait":"kickOffBarrier"},{"x":0,"y":-200,"trait":"kickOffBarrier"}],"segments":[],"goals":[],"discs":[],"planes":[{"normal":[0,1],"dist":-170,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-170,"canvas_rect":[-661,-212,661,213],"a":[-661,-170],"b":[661,-170]}}},{"normal":[0,-1],"dist":-170,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-170,"canvas_rect":[-661,-212,661,213],"a":[-661,170],"b":[661,170]}}},{"normal":[0,1],"dist":-200,"bCoef":0.1,"_data":{"extremes":{"normal":[0,1],"dist":-200,"canvas_rect":[-661,-212,661,213],"a":[-661,-200],"b":[661,-200]}}},{"normal":[0,-1],"dist":-200,"bCoef":0.1,"_data":{"extremes":{"normal":[0,-1],"dist":-200,"canvas_rect":[-661,-212,661,213],"a":[-661,200],"b":[661,200]}}},{"normal":[1,0],"dist":-420,"bCoef":0.1,"_data":{"extremes":{"normal":[1,0],"dist":-420,"canvas_rect":[-661,-212,661,213],"a":[-420,-212],"b":[-420,213]}}},{"normal":[-1,0],"dist":-420,"bCoef":0.1,"_data":{"extremes":{"normal":[-1,0],"dist":-420,"canvas_rect":[-661,-212,661,213],"a":[420,-212],"b":[420,213]}}},{"normal":[1,0],"dist":-370,"bCoef":1,"cMask":["ball"],"trait":"ballArea","_data":{"extremes":{"normal":[1,0],"dist":-370,"canvas_rect":[-661,-212,661,213],"a":[-370,-212],"b":[-370,213]}}},{"normal":[-1,0],"dist":-370,"bCoef":1,"cMask":["ball"],"trait":"ballArea","_data":{"extremes":{"normal":[-1,0],"dist":-370,"canvas_rect":[-661,-212,661,213],"a":[370,-212],"b":[370,213]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"joints":[],"redSpawnPoints":[],"blueSpawnPoints":[],"ballPhysics":{"radius":6.4},"playerPhysics":{"kickStrength":6.7},"canBeStored":false}';
const STADIUM_1v1 = '{"name":"Futsal 2v2 by Wein","width":420,"height":200,"spawnDistance":180,"bg":{"type":"hockey","width":368,"height":171,"kickOffRadius":65,"cornerRadius":0},"vertexes":[{"x":-368,"y":171,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-368,"y":65,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-368,"y":-65,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-368,"y":-171,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":368,"y":171,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":368,"y":65,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":368,"y":-65,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":368,"y":-171,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":0,"y":65,"trait":"kickOffBarrier"},{"x":0,"y":-65,"trait":"line"},{"x":-384,"y":-65,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet"},{"x":384,"y":-65,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet"},{"x":-384,"y":65,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet"},{"x":384,"y":65,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet"},{"x":368,"y":171,"bCoef":1,"trait":"ballArea"},{"x":368,"y":-171,"bCoef":1,"trait":"ballArea"},{"x":0,"y":171,"bCoef":0,"trait":"line"},{"x":0,"y":-171,"bCoef":0,"trait":"line"},{"x":0,"y":65,"trait":"kickOffBarrier"},{"x":0,"y":-65,"trait":"kickOffBarrier"},{"x":377,"y":-65,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":377,"y":-171,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-377,"y":-65,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":-377,"y":-171,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-377,"y":65,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":-377,"y":171,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":377,"y":65,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":377,"y":171,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":0,"y":199,"trait":"kickOffBarrier"},{"x":0,"y":65,"trait":"kickOffBarrier"},{"x":0,"y":-65,"trait":"kickOffBarrier"},{"x":0,"y":-199,"trait":"kickOffBarrier"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":4,"v1":5,"trait":"ballArea"},{"v0":6,"v1":7,"trait":"ballArea"},{"v0":8,"v1":9,"curve":180,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":8,"v1":9,"curve":-180,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":2,"v1":10,"curve":-35,"vis":true,"color":"FFFFFF","bCoef":0.1,"cMask":["all"],"trait":"goalNet"},{"v0":6,"v1":11,"curve":35,"vis":true,"color":"FFFFFF","bCoef":0.1,"cMask":["all"],"trait":"goalNet"},{"v0":1,"v1":12,"curve":35,"vis":true,"color":"FFFFFF","bCoef":0.1,"cMask":["all"],"trait":"goalNet"},{"v0":5,"v1":13,"curve":-35,"vis":true,"color":"FFFFFF","bCoef":0.1,"cMask":["all"],"trait":"goalNet"},{"v0":10,"v1":12,"curve":-35,"vis":true,"color":"FFFFFF","bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":-585},{"v0":11,"v1":13,"curve":35,"vis":true,"color":"FFFFFF","bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":585},{"v0":1,"v1":0,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-368},{"v0":5,"v1":4,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":368},{"v0":2,"v1":3,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-368},{"v0":6,"v1":7,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":368},{"v0":0,"v1":14,"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","y":171},{"v0":3,"v1":15,"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","y":-171},{"v0":16,"v1":17,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":9,"v1":8,"curve":-180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":19,"v1":18,"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":2,"v1":1,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":6,"v1":5,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":20,"v1":21,"vis":false,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":330},{"v0":22,"v1":23,"vis":false,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-330},{"v0":24,"v1":25,"vis":false,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-330},{"v0":26,"v1":27,"vis":false,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":330},{"v0":28,"v1":29,"trait":"kickOffBarrier"},{"v0":30,"v1":31,"trait":"kickOffBarrier"}],"goals":[{"p0":[-377,-65],"p1":[-377,65],"team":"red"},{"p0":[377,65],"p1":[377,-65],"team":"blue"}],"discs":[{"radius":5,"pos":[-368,65],"color":"FFFFFF","trait":"goalPost"},{"radius":5,"pos":[-368,-65],"color":"FFFFFF","trait":"goalPost"},{"radius":5,"pos":[368,65],"color":"FFFFFF","trait":"goalPost"},{"radius":5,"pos":[368,-65],"color":"FFFFFF","trait":"goalPost"},{"radius":3,"pos":[-384,65],"color":"FFFFFF","bCoef":0,"cMask":[""],"cGroup":["ball","red","blue"],"trait":"goalPost","_data":{"mirror":[]}},{"radius":3,"pos":[-384,-65],"color":"FFFFFF","bCoef":0,"cMask":[""],"cGroup":["ball","red","blue"],"trait":"goalPost","_data":{"mirror":[]}},{"radius":3,"pos":[384,65],"color":"FFFFFF","bCoef":0,"cMask":[""],"cGroup":["ball","red","blue"],"trait":"goalPost","_data":{"mirror":[]}},{"radius":3,"pos":[384,-65],"color":"FFFFFF","bCoef":0,"cMask":[""],"cGroup":["ball","red","blue"],"trait":"goalPost","_data":{"mirror":[]}},{"radius":3,"pos":[368,171],"color":"FFFFFF","bCoef":0,"cMask":[""],"cGroup":["ball","red","blue"],"trait":"goalPost","_data":{"mirror":[]}},{"radius":3,"pos":[-368,171],"color":"FFFFFF","bCoef":0,"cMask":[""],"cGroup":["ball","red","blue"],"trait":"goalPost","_data":{"mirror":[]}},{"radius":3,"pos":[-368,-171],"color":"FFFFFF","bCoef":0,"cMask":[""],"cGroup":["ball","red","blue"],"trait":"goalPost","_data":{"mirror":[]}},{"radius":3,"pos":[368,-171],"color":"FFFFFF","bCoef":0,"cMask":[""],"cGroup":["ball","red","blue"],"trait":"goalPost","_data":{"mirror":[]}}],"planes":[{"normal":[0,1],"dist":-171,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-171,"canvas_rect":[-702,-211,702,211],"a":[-702,-171],"b":[702,-171]}}},{"normal":[0,-1],"dist":-171,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-171,"canvas_rect":[-702,-211,702,211],"a":[-702,171],"b":[702,171]}}},{"normal":[0,1],"dist":-200,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,1],"dist":-200,"canvas_rect":[-702,-211,702,211],"a":[-702,-200],"b":[702,-200]}}},{"normal":[0,-1],"dist":-200,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,-1],"dist":-200,"canvas_rect":[-702,-211,702,211],"a":[-702,200],"b":[702,200]}}},{"normal":[1,0],"dist":-420,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[1,0],"dist":-420,"canvas_rect":[-702,-211,702,211],"a":[-420,-211],"b":[-420,211]}}},{"normal":[-1,0],"dist":-420,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[-1,0],"dist":-420,"canvas_rect":[-702,-211,702,211],"a":[420,-211],"b":[420,211]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":1},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["all"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"bCoef":0,"cMask":[""]},"arco":{"radius":2,"cMask":["n\/d"],"color":"cccccc"}},"playerPhysics":{"acceleration":0.11,"kickingAcceleration":0.1,"kickStrength":7,"radius":15,"bCoef":0.5,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"gravity":[0,0],"kickingDamping":0.96,"kickback":0},"ballPhysics":{"radius":6.4,"color":"EAFF00","bCoef":0.5,"cMask":["all"],"damping":0.99,"invMass":1,"gravity":[0,0],"cGroup":["ball"]},"joints":[],"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":true,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","kickOffReset":"partial"}';
const STADIUM_3v3 = '{"name":"Futsal 3v3 Zimska Liga from HaxMaps","width":755,"height":339,"spawnDistance":310,"bg":{"type":"hockey","width":665,"height":290,"kickOffRadius":80,"cornerRadius":0},"vertexes":[{"x":-665,"y":290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-665,"y":80,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-665,"y":-80,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-665,"y":-290,"trait":"ballArea","bCoef":1,"cMask":["ball"]},{"x":665,"y":290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":665,"y":80,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":665,"y":-80,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":665,"y":-290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":0,"y":306,"trait":"kickOffBarrier"},{"x":0,"y":80,"trait":"kickOffBarrier"},{"x":0,"y":-80,"trait":"line"},{"x":0,"y":-306,"trait":"kickOffBarrier"},{"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":-693,"y":-80},{"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":693,"y":-80},{"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":-693,"y":80},{"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":693,"y":80},{"trait":"line","x":-665,"y":-215},{"trait":"line","x":-500,"y":-50},{"trait":"line","x":665,"y":-215},{"trait":"line","x":500,"y":-50},{"trait":"line","x":-665,"y":215},{"trait":"line","x":-500,"y":50},{"trait":"line","x":665,"y":215},{"trait":"line","x":500,"y":50},{"bCoef":1,"trait":"ballArea","x":665,"y":290},{"bCoef":1,"trait":"ballArea","x":665,"y":-290},{"bCoef":0,"trait":"line","x":0,"y":290},{"bCoef":0,"trait":"line","x":0,"y":-290},{"x":0,"y":80,"trait":"kickOffBarrier"},{"x":0,"y":-80,"trait":"kickOffBarrier"},{"x":674,"y":-80,"trait":"line","cMask":["ball"],"bCoef":1},{"x":674,"y":-290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-674,"y":-80,"trait":"line","cMask":["ball"],"bCoef":1},{"x":-674,"y":-290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-674,"y":80,"trait":"line","cMask":["ball"],"bCoef":1},{"x":-674,"y":290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":674,"y":80,"trait":"line","cMask":["ball"],"bCoef":1},{"x":674,"y":290,"trait":"ballArea","cMask":["ball"],"bCoef":1}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":4,"v1":5,"trait":"ballArea"},{"v0":6,"v1":7,"trait":"ballArea"},{"v0":8,"v1":9,"trait":"kickOffBarrier"},{"v0":9,"v1":10,"trait":"kickOffBarrier","curve":180,"cGroup":["blueKO"]},{"v0":9,"v1":10,"trait":"kickOffBarrier","curve":-180,"cGroup":["redKO"]},{"v0":10,"v1":11,"trait":"kickOffBarrier"},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":2,"v1":12,"color":"FFFFFF","curve":-35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":6,"v1":13,"color":"FFFFFF","curve":35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":1,"v1":14,"color":"FFFFFF","curve":35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":5,"v1":15,"color":"FFFFFF","curve":-35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":12,"v1":14,"x":-585,"color":"FFFFFF","curve":-35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":13,"v1":15,"x":585,"color":"FFFFFF","curve":35},{"color":"FFFFFF","trait":"line","v0":16,"v1":17,"curve":90},{"color":"FFFFFF","trait":"line","v0":18,"v1":19,"curve":-90},{"color":"FFFFFF","trait":"line","v0":20,"v1":21,"curve":-90},{"color":"FFFFFF","trait":"line","v0":22,"v1":23,"curve":90},{"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":17,"v1":21,"curve":0},{"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":19,"v1":23,"curve":0},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":1,"v1":0,"cMask":["ball"],"x":-665},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":5,"v1":4,"cMask":["ball"],"x":665},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":2,"v1":3,"cMask":["ball"],"x":-665},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":6,"v1":7,"cMask":["ball"],"x":665},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":0,"v1":24,"y":290},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":3,"v1":25,"y":-290},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":26,"v1":27},{"curve":-180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":10,"v1":9},{"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":29,"v1":28},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":2,"v1":1},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":6,"v1":5},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":30,"v1":31,"cMask":["ball"],"x":614},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":32,"v1":33,"cMask":["ball"],"x":-614},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":34,"v1":35,"cMask":["ball"],"x":-614},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":36,"v1":37,"cMask":["ball"],"x":614}],"goals":[{"p0":[-674,-80],"p1":[-674,80],"team":"red"},{"p0":[674,80],"p1":[674,-80],"team":"blue"}],"discs":[{"pos":[-665,80],"trait":"goalPost","color":"FFFFFF","radius":5},{"pos":[-665,-80],"trait":"goalPost","color":"FFFFFF","radius":5},{"pos":[665,80],"trait":"goalPost","color":"FFFFFF","radius":5},{"pos":[665,-80],"trait":"goalPost","color":"FFFFFF","radius":5}],"planes":[{"normal":[0,1],"dist":-290,"trait":"ballArea"},{"normal":[0,-1],"dist":-290,"trait":"ballArea"},{"normal":[0,1],"dist":-339,"bCoef":0.2,"cMask":["all"]},{"normal":[0,-1],"dist":-339,"bCoef":0.2,"cMask":["all"]},{"normal":[1,0],"dist":-755,"bCoef":0.2,"cMask":["all"]},{"normal":[-1,0],"dist":-755,"bCoef":0.2,"cMask":["all"]}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":1},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["all"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"bCoef":0,"cMask":[""]},"arco":{"radius":2,"cMask":["n\/d"],"color":"cccccc"}},"playerPhysics":{"acceleration":0.11,"kickingAcceleration":0.1,"kickStrength":7},"ballPhysics":{"radius":6.4,"color":"9CF0E5"}}';
const STADIUM = '{"name":"De Paul Stadium","width":900,"height":404,"bg":{"type":"grass","width":773,"height":336,"kickOffRadius":95,"cornerRadius":0,"color":"718B5B"},"vertexes":[{"x":-773,"y":336,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-773,"y":100,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-773,"y":-100,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-773,"y":-336,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":773,"y":336,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":773,"y":100,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":773,"y":-100,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":773,"y":-336,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":0,"y":404,"trait":"kickOffBarrier"},{"x":0,"y":95,"trait":"kickOffBarrier"},{"x":0,"y":-95,"trait":"line"},{"x":0,"y":-404,"trait":"kickOffBarrier"},{"x":-820,"y":-100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet"},{"x":820,"y":-100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet"},{"x":-820,"y":100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet"},{"x":820,"y":100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet"},{"x":-773,"y":-241,"trait":"line"},{"x":-552,"y":-50,"trait":"line"},{"x":773,"y":-241,"trait":"line"},{"x":552,"y":-50,"trait":"line"},{"x":-773,"y":241,"trait":"line"},{"x":-552,"y":50,"trait":"line"},{"x":773,"y":241,"trait":"line"},{"x":552,"y":50,"trait":"line"},{"x":773,"y":336,"bCoef":1,"trait":"ballArea"},{"x":773,"y":-336,"bCoef":1,"trait":"ballArea"},{"x":0,"y":336,"bCoef":0,"trait":"line"},{"x":0,"y":-336,"bCoef":0,"trait":"line"},{"x":0,"y":95,"trait":"kickOffBarrier"},{"x":0,"y":-95,"trait":"kickOffBarrier"},{"x":782,"y":-98,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":782,"y":-336,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-782,"y":-98,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":-782,"y":-336,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-782,"y":98,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":-782,"y":336,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":782,"y":98,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":782,"y":336,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":-773,"y":311,"trait":"cornerDecoration"},{"x":-748,"y":336,"trait":"cornerDecoration"},{"x":-748,"y":-336,"trait":"cornerDecoration"},{"x":-773,"y":-311,"trait":"cornerDecoration"},{"x":748,"y":336,"trait":"cornerDecoration"},{"x":773,"y":311,"trait":"cornerDecoration"},{"x":773,"y":-311,"trait":"cornerDecoration"},{"x":748,"y":-336,"trait":"cornerDecoration"},{"x":-625,"y":-2.75,"trait":"line"},{"x":-625,"y":2.75,"trait":"line"},{"x":625,"y":-2.75,"trait":"line"},{"x":625,"y":2.75,"trait":"line"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":4,"v1":5,"trait":"ballArea"},{"v0":6,"v1":7,"trait":"ballArea"},{"v0":8,"v1":9,"trait":"kickOffBarrier"},{"v0":9,"v1":10,"curve":180,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":9,"v1":10,"curve":-180,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":10,"v1":11,"trait":"kickOffBarrier"},{"v0":2,"v1":12,"vis":true,"cMask":["ball"],"trait":"goalNet","y":-95},{"v0":6,"v1":13,"vis":true,"cMask":["ball"],"trait":"goalNet","y":-95},{"v0":1,"v1":14,"vis":true,"cMask":["ball"],"trait":"goalNet","y":95},{"v0":5,"v1":15,"vis":true,"cMask":["ball"],"trait":"goalNet","y":95},{"v0":12,"v1":14,"vis":true,"cMask":["ball"],"trait":"goalNet","x":-820},{"v0":13,"v1":15,"vis":true,"cMask":["ball"],"trait":"goalNet","x":585},{"v0":16,"v1":17,"curve":90,"color":"FFFFFF","trait":"line"},{"v0":18,"v1":19,"curve":-90,"color":"FFFFFF","trait":"line"},{"v0":20,"v1":21,"curve":-90,"color":"FFFFFF","trait":"line"},{"v0":22,"v1":23,"curve":90,"color":"FFFFFF","trait":"line"},{"v0":17,"v1":21,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","x":-600},{"v0":19,"v1":23,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","x":552},{"v0":1,"v1":0,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"ballArea","bias":9,"x":-665},{"v0":5,"v1":4,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"ballArea","bias":-9,"x":665},{"v0":2,"v1":3,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"ballArea","bias":-9,"x":-665},{"v0":6,"v1":7,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"ballArea","bias":9,"x":665},{"v0":0,"v1":24,"vis":true,"color":"FFFFFF","trait":"ballArea","y":290},{"v0":3,"v1":25,"vis":true,"color":"FFFFFF","trait":"ballArea","y":-290},{"v0":26,"v1":27,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":10,"v1":9,"curve":-180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":29,"v1":28,"curve":180.43077330521417,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","_data":{"mirror":{},"arc":{"a":[0,-95],"b":[0,95],"curve":180.43077330521417,"radius":95.00067131878964,"center":[0.3571428571409862,0],"from":-1.574555707480645,"to":1.574555707480645}}},{"v0":2,"v1":1,"curve":0,"vis":true,"color":"FF9494","bCoef":0,"trait":"line"},{"v0":6,"v1":5,"curve":0,"vis":true,"color":"A3BAFF","bCoef":0,"trait":"line"},{"v0":30,"v1":31,"vis":false,"color":"FFFFFF","cMask":["ball"],"trait":"ballArea","x":614},{"v0":32,"v1":33,"vis":false,"color":"FFFFFF","cMask":["ball"],"trait":"ballArea","x":-614},{"v0":34,"v1":35,"vis":false,"color":"FFFFFF","cMask":["ball"],"trait":"ballArea","x":-614},{"v0":36,"v1":37,"vis":false,"color":"FFFFFF","cMask":["ball"],"trait":"ballArea","x":614},{"v0":38,"v1":39,"vis":true,"trait":"cornerDecoration"},{"v0":40,"v1":41,"vis":true,"trait":"cornerDecoration"},{"v0":42,"v1":43,"vis":true,"trait":"cornerDecoration"},{"v0":44,"v1":45,"vis":true,"trait":"cornerDecoration"},{"v0":46,"v1":47,"trait":"line"},{"v0": 46,"v1":47,"curve":-180,"trait":"line"},{"v0":46,"v1":47,"curve":180,"trait":"line"},{"v0":48,"v1":49,"trait":"line"},{"v0":48,"v1":49,"curve":-180,"trait":"line"},{"v0":48,"v1":49,"curve":180,"trait":"line"}],"goals":[{"p0":[-782,-100],"p1":[-782,100],"team":"red"},{"p0":[782,100],"p1":[782,-100],"team":"blue"}],"discs":[{"pos":[-773,100],"trait":"goalPost"},{"pos":[-773,-100],"trait":"goalPost"},{"pos":[773,100],"trait":"goalPost"},{"pos":[773,-100],"trait":"goalPost"}],"planes":[{"normal":[0,1],"dist":-336,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-336,"canvas_rect":[-900,-404,900,404],"a":[-900,-336],"b":[900,-336]}}},{"normal":[0,-1],"dist":-336,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-336,"canvas_rect":[-900,-404,900,404],"a":[-900,336],"b":[900,336]}}},{"normal":[0,1],"dist":-404,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,1],"dist":-404,"canvas_rect":[-900,-404,900,404],"a":[-900,-404],"b":[900,-404]}}},{"normal":[0,-1],"dist":-404,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,-1],"dist":-404,"canvas_rect":[-900,-404,900,404],"a":[-900,404],"b":[900,404]}}},{"normal":[1,0],"dist":-900,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[1,0],"dist":-900,"canvas_rect":[-900,-404,900,404],"a":[-900,-404],"b":[-900,404]}}},{"normal":[-1,0],"dist":-900,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[-1,0],"dist":-900,"canvas_rect":[-900,-404,900,404],"a":[900,-404],"b":[900,404]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1.175,"cMask":["ball"]},"goalPost":{"radius":4.65,"invMass":0,"color":"C6D881","bCoef":1.25},"goalNet":{"vis":true,"color":"DDE6ED","bCoef":0.15,"cMask":["all"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"bCoef":0,"color":"FFFFFF","cMask":[""]},"cornerDecoration":{"vis":true,"color":"FFFFFF","bCoef":0,"cMask":[""],"curve":90},"arco":{"radius":2,"cMask":["n\/d"],"color":"cccccc"}},"playerPhysics":{"radius":14.75,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.655,"bCoef":0.25},"ballPhysics":{"radius":6.4,"color":"CCFF99","bCoef":0.468,"invMass":1.4},"joints":[],"redSpawnPoints":[[-310, 0], [-310, 55], [-310, -55], [-310, 110], [-310, -110], [-700, 370]],"blueSpawnPoints":[[310, 0], [310, 55], [310, -55], [310, 110], [310, -110], [700, 370]],"canBeStored":false}';
const PENALTY_STADIUM = '{"name":"De Paul Stadium | PEN","width":420,"height":200,"spawnDistance":310,"bg":{"type":"grass","width":400,"height":260,"kickOffRadius":0,"cornerRadius":0,"color":"718B5B"},"vertexes":[{"x":323,"y":260,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30},{"x":323,"y":100,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30},{"x":323,"y":-100,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30},{"x":323,"y":-260,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30},{"x":370,"y":-100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","radius":0},{"x":370,"y":100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","radius":0},{"x":332,"y":-98,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":323,"y":260,"bCoef":0,"trait":"line"},{"x":323,"y":-260,"bCoef":0,"trait":"line"},{"x":0,"y":-260,"bCoef":0,"trait":"line"},{"x":0,"y":260,"bCoef":0,"trait":"line"},{"x":323,"y":200,"bCoef":0,"trait":"line"},{"x":110,"y":200,"bCoef":0,"trait":"line"},{"x":110,"y":-200,"bCoef":0,"trait":"line"},{"x":323,"y":-200,"bCoef":0,"trait":"line"},{"x":0,"y":100,"bCoef":0,"trait":"line"},{"x":0,"y":-100,"bCoef":0,"trait":"line"},{"x":110,"y":5,"bCoef":0,"trait":"line"},{"x":110,"y":-5,"bCoef":0,"trait":"line"},{"x":55,"y":-260,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"x":65,"y":260,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"x":300,"y":-90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":365,"y":-90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":365,"y":90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":300,"y":90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":2,"v1":4,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet","y":-100},{"v0":1,"v1":5,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet","y":100},{"v0":1,"v1":0,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30,"x":665},{"v0":2,"v1":3,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30,"x":665},{"v0":2,"v1":1,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":10,"v1":7,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":10,"v1":9,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":9,"v1":8,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":11,"v1":12,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":12,"v1":13,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":13,"v1":14,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":15,"v1":16,"curve":150,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":18,"v1":17,"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":17,"v1":18,"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":5,"v1":4,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet"},{"v0":19,"v1":20,"curve":45,"vis":false,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"v0":21,"v1":22,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":22,"v1":23,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":23,"v1":24,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":24,"v1":21,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"}],"goals":[{"p0":[332,100],"p1":[332,-100],"team":"blue"},{"p0":[325,-100],"p1":[100,0],"team":"red"},{"p0":[100,0],"p1":[320,100],"team":"red"}],"discs":[{"radius":6.5,"color":"FFDEAD","bCoef":0.465,"invMass":1.4,"pos":[110,0],"cGroup":["ball","kick","score"]},{"pos":[323,100],"trait":"goalPost"},{"pos":[323,-100],"trait":"goalPost"}],"planes":[{"normal":[0,1],"dist":-260,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,1],"dist":-260,"canvas_rect":[-710,-260,710,260],"a":[-710,-260],"b":[710,-260]}}},{"normal":[0,-1],"dist":-260,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,-1],"dist":-260,"canvas_rect":[-710,-260,710,260],"a":[-710,260],"b":[710,260]}}},{"normal":[1,0],"dist":-499,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[1,0],"dist":-499,"canvas_rect":[-710,-260,710,260],"a":[-499,-260],"b":[-499,260]}}},{"normal":[-1,0],"dist":-376,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[-1,0],"dist":-376,"canvas_rect":[-710,-260,710,260],"a":[376,-260],"b":[376,260]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":4.65,"invMass":0,"color":"C6D881","bCoef":1.25},"goalNet":{"vis":true,"bCoef":0.2,"cMask":["all"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"bCoef":0,"cMask":[""]},"arco":{"radius":2,"cMask":["n/d"],"color":"cccccc"},"penArea":{"vis":false,"bCoef":0,"cMask":["red"]}},"playerPhysics":{"radius":14.75,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.9,"bCoef":0.26},"ballPhysics":"disc0","joints":[],"canBeStored":false,"redSpawnPoints":[[-100,0]],"blueSpawnPoints":[[323,0]],"kickOffReset":"full"}';
const COMMANDS_TO_VALIDATE = ["discord", "kickafk", "afk", "captains", "unmute", "clearmutes"]; // These commands can cause spam in the chat or bypass the mute
const INVISIBLE_CHARACTERS = ["	", "ㅤ"];

class Setting {
  constructor(setting) {
    this.msgColor = "normal";
    this.sizeAdjustment = 0;
    if ( setting !== null ) {
      Object.assign(this, setting);
    };
  };
};
class Kick {
  constructor(ballProperties, byPlayer) {
    this.properties = ballProperties;
    this.player = byPlayer;
    this.time = room.getScores().time;

    let xOpponentGoal = ( byPlayer.team == 1 ) ? stadium.goalLine.x : -stadium.goalLine.x; // The x position value of the opponent's goal
    this.isAShot = (
      (xOpponentGoal * ballProperties.xspeed > 0) && // It's a kick toward the opponent goal
      (Math.abs(ballProperties.x + ballProperties.xspeed * 97.5) > stadium.goalLine.x) && // At this speed, the ball can cross the goal line
      (Math.abs(ballProperties.y + ballProperties.yspeed * (xOpponentGoal - ballProperties.x) / ballProperties.xspeed) < stadium.goalLine.y) // Check if it's on target (not really accurate because it might hit the post)
    );
  }
};
class PlayerReport {
  constructor(player) {
    this.name = "";
    this.goals = 0;
    this.assists = 0;
    this.ownGoals = 0;
    this.cleansheets = 0;
    this.wins = 0;
    this.games = 0;
    this.motms = 0;
    this.points = 0;
    this.auth = null;
    if ( player !== null ) {
      Object.assign(this, player);
    };
  }
  getWinRate() {
    if ( this.games == 0 ) return 0; 
    return (this.wins / this.games * 100).toFixed(2);
  }
};
class PlayerStats {
  constructor(name) {
    this.name = name;
    this.goals = 0;
    this.assists = 0;
    this.ownGoals = 0;
    this.touches = 0;
    this.passes = 0;
    this.shotsOnTarget = 0;
    this.stoppedShots = 0;
    this.errorsLedToGoal = 0;
    this.attemptsLedToOG = 0;
    this.penaltiesScored = 0;
    this.penaltiesMissed = 0;
    this.meanPosition = 0; // The "zone" the player tends to play around
  }
  getPoints() {
    let points = 0;
    for (const [statName, value] of Object.entries(this)) {
      if ( PLAYER_SCORING_RULES[statName] === undefined ) continue;
      points += PLAYER_SCORING_RULES[statName] * value;
    };
    return points;
  }
};
class TeamStats {
  constructor() {
    this.substitutions = 0;
    this.possession = 0;
    this.players = {};
  }
  resetStats() {
    this.substitutions = 0;
    this.possession = 0;
    for (const playerId in this.players) {
      delete this.players[playerId];
    };
  }
};
class Penalty {
  constructor() {
    this.groups = [[], []]; // Penalty takers
    this.results = [[], []]; // Results of taken penalties (first for RED, second for BLUE)
  }
  getTurn() {
    return this.results[0].length - this.results[1].length;
  }
  // Returns the team that wins the penalty shootout
  async getPenaltyWinner() {
    // Too many penalties taken, pick the winner randomly
    if ( this.results[1].length > 15 ) {
      room.sendChat("Đã hết lượt sút penalty cho cả 2 đội, giờ trọng tài sẽ tung đồng xu để quyết định đội chiến thắng");
      await new Promise(r => setTimeout(r, 3000));
      room.sendChat("Đồng xu đã được tung lên... Và xin chúc mừng...");
      await new Promise(r => setTimeout(r, 5000));
      return getRandomInt(2);
    }

    if ( this.results[0].length > 5 ) { // "Sudden Death" round
      if ( this.results[0].length != this.results[1].length ) return null;
      if ( this.results[0].at(-1) == this.results[1].at(-1) ) return null;
      return this.results[0].at(-1) ? 1 : 2;
    };

    // One team has more penalties scored than the other team even if the other team scores all the remaining penalties
    if ( this.results[0].filter(result => result).length > 5 - this.results[1].filter(result => !result).length ) {
      return 1;
    } else if ( this.results[1].filter(result => result).length > 5 - this.results[0].filter(result => !result).length ) {
      return 2;
    };
    return null;
  }
  getPenaltyTakers() {
    let turn = this.getTurn();
    return [this.groups[turn].at(this.results[1].length % this.groups[turn].length), this.groups[turn ^ 1].at(-1)];
  }
  push(result) {
    this.results[this.getTurn()].push(result);
  }
  clear() {
    this.groups = [[], []];
    this.results = [[], []];
  }
};
class Game {
  constructor() {
    this.teams = {
      1: new TeamStats(),
      2: new TeamStats(),
    }; 
    this.penalty = new Penalty();
    this.ballRecords = [null, null, null];
  }
  getStats() {
    let stats = {
      possession: [50, 50],
      passes: [0, 0],
      shotsOnTarget: [0, 0],
    };
    if ( this.teams[1].possession + this.teams[2].possession != 0 ) {
      stats.possession[0] = ~~(game.teams[1].possession / (game.teams[1].possession + game.teams[2].possession) * 100);
      stats.possession[1] = 100 - stats.possession[0];
    };
    for (let i = 0; i < 2; i++) {
      for (const player of Object.values(this.teams[i + 1].players)) {
        stats.passes[i] += player.passes;
        stats.shotsOnTarget[i] += player.shotsOnTarget;
      };
    };
    return stats;
  }
  resetBallRecords() {
    this.ballRecords = [null, null, null];
  }
  reset() {
    this.resetBallRecords();
    this.penalty.clear();
    this.teams[1].resetStats();
    this.teams[2].resetStats();
  }
};
class BallColor {
  constructor() {
    this.index = 0;
  }
  getColor() {
    this.index++;
    return BALL_COLORS[this.index % BALL_COLORS.length];
  }
}
class Surrender {
  constructor() {
    this.votes = [new Set, new Set];
  }
  surrender(teamId) {
    let scores = room.getScores();
    prevScore = `${scores.red}-${scores.blue}`;
    handlePostGame(getOppositeTeamId(teamId));
    room.stopGame();
    room.sendAnnouncement(`🏴 Đội ${TEAM_NAMES[teamId]} đã đầu hàng`, null, 0x00FFFF, "small-italic", 0)
  }
  vote(player) {
    if ( player.team == 0 ) return;
    if ( isCaptain(player.id) ) this.surrender(player.team); // Captains can surrender anytime
    this.votes[player.team - 1].add(player.id);
    let count = 0;
    for (const voterId of this.votes[player.team - 1]) {
      let voter = room.getPlayer(voterId);
      if ( voter && (voter.team == player.team) ) count++;
    };
    room.sendAnnouncement(`${player.name} đã bỏ phiếu đầu hàng cho ${TEAM_NAMES[player.team]} (${count}/${MIN_VOTES_FOR_SURRENDER})`, null, GREEN, "small", 0);

    if ( count >= MIN_VOTES_FOR_SURRENDER ) this.surrender(player.team);
  }
  hasVoted(player) {
    if ( player.team == 0 ) return false;
    return this.votes[player.team - 1].has(player.id);
  }
  reset() {
    this.votes.forEach((votes) => votes.clear());
  }
}

var commands = { // Format: "alias: [function, availableModes, minimumRole, captainOnly]"
  help: [helpFunc, ["rand", "pick"], ROLE.PLAYER, false],
  discord: [discordFunc, ["rand", "pick"], ROLE.PLAYER, false],
  bye: [byeFunc, ["rand", "pick"], ROLE.PLAYER, false],
  stat: [showStatsFunc, ["rand", "pick"], ROLE.PLAYER, false],
  rank: [showRankingsFunc, ["rand", "pick"], ROLE.PLAYER, false],
  kickafk: [kickAfkFunc, ["rand", "pick"], ROLE.PLAYER, false],
  spec: [specFunc, ["rand", "pick"], ROLE.PLAYER, false],
  login: [loginFunc, ["rand", "pick"], ROLE.PLAYER, false],
  afk: [afkFunc, ["rand", "pick"], ROLE.PLAYER, false],
  afks: [showAfksFunc, ["rand", "pick"], ROLE.PLAYER, false],
  predict: [predictFunc, ["rand", "pick"], ROLE.PLAYER, false],
  captains: [listCaptainsFunc, ["pick"], ROLE.PLAYER, false],
  surrender: [surrenderFunc, ["pick"], ROLE.PLAYER, false],
  sub: [subFunc, ["pick"], ROLE.PLAYER, true],
  leavecap: [leaveCaptainFunc, ["pick"], ROLE.PLAYER, true],
  pause: [pauseFunc, ["pick"], ROLE.PLAYER, true],
  resume: [resumeFunc, ["pick"], ROLE.PLAYER, true],
  //msgcolor: [setMsgColorFunc, ["rand", "pick"], ROLE.PLAYER, false],
  adjustsize: [adjustSizeFunc, ["rand", "pick"], ROLE.PLAYER, false],
  yellow: [yellowCardFunc, ["rand", "pick"], ROLE.ADMIN, false],
  clearyellow: [clearYellowCardFunc, ["rand", "pick"], ROLE.ADMIN, false],
  mute: [muteFunc, ["rand", "pick"], ROLE.ADMIN, false],
  unmute: [unmuteFunc, ["rand", "pick"], ROLE.ADMIN, false],
  clearmutes: [clearMutesFunc, ["rand", "pick"], ROLE.ADMIN, false],
  ban: [banFunc, ["rand", "pick"], ROLE.ADMIN, false],
  bans: [showBansFunc, ["rand", "pick"], ROLE.ADMIN, false],
  unban: [unbanFunc, ["rand", "pick"], ROLE.ADMIN, false],
  clearbans: [clearBansFunc, ["rand", "pick"], ROLE.ADMIN, false],
  lock: [lockFunc, ["rand", "pick"], ROLE.ADMIN, false],
  unlock: [unlockFunc, ["rand", "pick"], ROLE.ADMIN, false],
  assigncap: [assignCaptainFunc, ["pick"], ROLE.ADMIN, false],
};
var identities = {}; // Store connection string/public IDs of players
var adminAuths = new Set(); // Remember admin's auth for auto-login
var afkList = new Set([0]); // Host player is always in AFK mode
var muteList = new Set();
var banList = [];
var isPlaying = false;
var isPicking = false;
var isTakingPenalty = false;
var isChatLocked = false;
var canPause = false;
var winningStreak = 0;
var prevWinner = 1;
var pickTurn = 0;
var pausedBy = 0;
var captains = {1: 0, 2: 0};
var kits = {red: null, blue: null};
var prevScore = null;
var predictions = {};
var warnings = {};
var lastMessages = []; // The last 4 messages in the form of [message, playerId, sendingTime]
var game = new Game;
var surrenderVoter = new Surrender;
var stadium = { // Stadium attributes
  goalLine: { x: 0, y: 0 },
  ballRadius: 0,
  playerRadius: 0,
};
var timeouts = {
  toPick: null,
  toResume: null,
  toTakePenalty: null,
  toAct: {},
  toQuitAfk: {},
};
var selectedCaptain = null;
var quotes = [];
var logMsg = "";
var currentStadium = null;
var ballColor = new BallColor();

var room = HBInit({
  roomName: ROOM_NAME,
  maxPlayers: 30,
  playerName: "BLV De Paul",
  public: PUBLIC,
});
room.setTeamsLock(1);
room.setKickRateLimit(6, 0, 0);
loadStadium("training").then(_ => { room.startGame() });
setInterval(randomAnnouncement, NOTIFICATION_INTERVAL * 1000);
setInterval(randomGameStat, 2.5 * 60 * 1000);
setInterval(checkAfk, CHECK_AFK_INTERVAL * 1000);
if ( MODE == "pick" ) setInterval(showSpecTable.bind(null), 5 * 1000); // Send Spectators table once every few seconds to prevent it from being faded away by other messages
updateMetadata();

async function loadStadium(name) {
  if ( (isTakingPenalty && (name != "penalty")) || (name == currentStadium) ) return;
  let _stadium = {
    "penalty": [PENALTY_STADIUM, 0, 0],
    "5v5": [STADIUM, SCORE_LIMIT, TIME_LIMIT],
    "3v3": [STADIUM_3v3, 5, 5],
    "1v1": [STADIUM_1v1, 5, 5],
    "training": [STADIUM_TRAINING, 0, 0],
  }[name];
  let wasPlaying = !!room.getScores();
  await room.stopGame();
  room.setCustomStadium(_stadium[0]);
  room.setScoreLimit(_stadium[1]);
  room.setTimeLimit(_stadium[2]);
  currentStadium = name;
  wasPlaying && room.startGame();
  // Analyze the stadium
  let parsedStadium = JSON.parse(_stadium[0]);
  if ( parsedStadium.goals.length != 0 ) {
    stadium.goalLine.x = Math.abs(parsedStadium.goals[0].p0[0]);
    stadium.goalLine.y = Math.abs(parsedStadium.goals[0].p0[1]);
  };
  stadium.ballRadius = parsedStadium.ballPhysics.radius || 10;
  stadium.playerRadius = parsedStadium.playerPhysics.radius || 15;
}

function getPlayerStats() {
  let playerList = [];
  for (let i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if ( key.length != 43 ) continue;
    playerList.push(new PlayerReport({ ...JSON.parse(localStorage.getItem(key)), auth: key }));
  };
  return playerList;
}

async function randomAnnouncement() {
  let msg;
  switch ( getRandomInt(2) ) {
    case 0: // Send Discord link
      msg = "🔔 Mã nguồn được viết bởi shelld3v (Discord). Mã nguồn: https://github.com/shelld3v/haxball-host";
      break;
    default: // Send a random quote
      try {
        (quotes.length == 0) && await fetch("https://api.quotable.io/quotes/random?limit=50", { method: "GET" }) // Fetch new quotes
          .then(response => response.json())
          .then(json => quotes = json.map(quote => `"${quote.content}" - ${quote.author}`));
      } catch (error) {
        return;
      };
      msg = quotes.pop();
  }
  room.sendAnnouncement(msg, null, YELLOW, "small-italic", 0);
  sendLogWebhook(logMsg);
  logMsg = "";
}

function randomGameStat() {
  let scores = room.getScores();
  if ( (scores == null) || (scores.time < 60) ) return;
  let fact;
  switch ( getRandomInt(5) ) {
    case 0:
      fact = `Kiểm soát bóng: 🟥 ${game.getStats().possession.map(possession => possession + "%").join(" - ")} 🟦`;
      break;
    case 1:
      let passes = game.getStats().passes;
      if ( passes[0] + passes[1] == 0 ) return;
      fact = `Lượt chuyền bóng: 🟥 ${passes.join(" - ")} 🟦`;
      break;
    case 2:
      fact = `Sút trúng đích: 🟥 ${game.getStats().shotsOnTarget.join(" - ")} 🟦`;
      break;
    case 3:
      if ( winningStreak < 3 ) return;
      fact = `Chuỗi bất bại của ${TEAM_NAMES[prevWinner]}: ${winningStreak}`;
      break;
    case 4:
      let topPasser = new PlayerStats();
      for (let teamId = 1; teamId < 3; teamId++) {
        for (const stats of Object.values(game.teams[teamId].players)) {
          if ( stats.passes <= topPasser.passes ) continue;
          topPasser = stats;
        };
      };
      if ( topPasser.passes == 0 ) return;
      fact = `Thực hiện nhiều đường chuyền nhất: ${topPasser.name} (${topPasser.passes} đường chuyền)`;
  };
  room.sendAnnouncement(`⏩⏩    ${fact}    ⏪⏪`, null, 0xCF9FFF, "small-bold");
}

function updateMetadata() {
  let month = new Date().getMonth() + 1;
  let lastPlayedMonth = localStorage.getItem("last_played_month");
  // Assign missing metadata items (inaccurately)
  lastPlayedMonth || (lastPlayedMonth = month); // This also prevents `month != lastPlayedMonth` condition below, which is good because calling `resetStorage()` would cause bugs as it uses "last_played_month" from localStorage
  localStorage.getItem("starting_month") || localStorage.setItem("starting_month", lastPlayedMonth);

  if (
    (month != lastPlayedMonth) && // New month has come, should we summarize and reset local storage?
    confirm("Đã sang tháng mới, bạn có muốn tổng kết thống kê?")
  ) resetStorage();

  localStorage.setItem("last_played_month", month);
}

// Reset data saved in the localStorage
function resetStorage() {
  let playerList = getPlayerStats();
  let topPlayers = playerList.sort(function(player1, player2) {
    if ( player1.points == player2.points ) {
      return player2.goals + player2.assists - player1.goals - player1.assists;
    };
    return player2.points - player1.points;
  }).slice(0, 5);
  let topScorers = playerList.sort(function(player1, player2) {
    if ( player1.goals == player2.goals ) {
      return player2.assists - player1.assists;
    };
    return player2.goals - player1.goals;
  }).slice(0, 5);
  let topAssisters = playerList.sort(function(player1, player2) {
    if ( player1.assists == player2.assists ) {
      return player2.goals - player1.goals;
    };
    return player2.assists - player1.assists;
  }).slice(0, 5);
  let topMOTMs = playerList.sort(function(player1, player2) {
    if ( player1.motms == player2.motms ) {
      return (player2.goals + player2.assists) - (player1.goals + player1.assists);
    };
    return player2.motms - player1.motms;
  }).slice(0, 5);
  let topGoalkeepers = playerList.sort((player1, player2) => player2.cleansheets - player1.cleansheets).slice(0, 5);
  let topOwnGoalScorers = playerList.sort((player1, player2) => player2.ownGoals - player1.ownGoals).slice(0, 5);

  let msg = `Danh sách vua phá lưới tháng ${getMonths()}:

${topScorers.map((player, index) => `${index + 1}. ${player.name} - ${player.goals} bàn thắng (${player.assists} kiến tạo)`).join("\n")}`;
  setInterval(room.sendAnnouncement.bind(null, msg, null, BLUE, "small-bold", 0), 3.5 * 60 * 1000);

  let discordFields = [
    {
      name: "Cầu thủ xuất sắc nhất",
      value: `============================\n\n*${topPlayers.map((player, index) => `${index + 1}. ${player.name} - ${player.points} sao`).join("\n")}*`,
    },
    {
      name: "Vua phá lưới",
      value: `============================\n\n*${topScorers.map((player, index) => `${index + 1}. ${player.name} - ${player.goals} bàn thắng`).join("\n")}*`,
    },
    {
      name: "Vua kiến tạo",
      value: `============================\n\n*${topAssisters.map((player, index) => `${index + 1}. ${player.name} - ${player.assists} kiến tạo`).join("\n")}*`,
    },
    {
      name: "Cầu thủ nhiều MOTM nhất",
      value: `============================\n\n*${topMOTMs.map((player, index) => `${index + 1}. ${player.name} - ${player.motms} lần nhận MOTM`).join("\n")}*`,
    },
    {
      name: "Giữ sạch lưới nhiều nhất",
      value: `============================\n\n*${topGoalkeepers.map((player, index) => `${index + 1}. ${player.name} - ${player.cleansheets} trận sạch lưới`).join("\n")}*`,
    },
    {
      name: "Báo nhất",
      value: `============================\n\n*${topOwnGoalScorers.map((player, index) => `${index + 1}. ${player.name} - ${player.ownGoals} bàn thắng phản lưới nhà`).join("\n")}*`,
    },
  ];
  sendWebhook(`✨ Số liệu thống kê trong tháng ${getMonths()}`, null, discordFields);

  for (const key in localStorage) {
    if ( key.length != 43 ) continue;
    localStorage.removeItem(key);
  }
  localStorage.setItem("starting_month", new Date().getMonth() + 1);
}

// Get months that are being monitored for statistics
function getMonths() {
  let starting_month = localStorage.getItem("starting_month");
  let ending_month = localStorage.getItem("last_played_month");
  if ( starting_month != ending_month ) return `${starting_month}-${ending_month}`;
  return starting_month;
}

// Get a chat-pingable tag from player's name
function getTag(name) {
  return "@" + name.replace(/ /g, "_");
}

// Find the number of spaces that a string takes on display, this can handle special cases like non-latin characters which take more than 1 space each character
function getDisplayLength(string) {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context.font = "16px Arial"; // This is Discord font, because the purpose of doing all this is related to display of messages on Discord
  return Math.round([...string].reduce((size, char) => size + ((char.charCodeAt(0) > 255) ? context.measureText(char).width : 8.8), 0) / 8.8);
}

// Get a random number from a range (start from 0)
function getRandomInt(rangeEnd) {
  return Math.floor(Math.random() * rangeEnd);
}

// Get a random element from an array
function randomChoice(array) {
  return array[getRandomInt(array.length)];
}

// Get value in meters from haxball length unit
function convertToMeters(value) {
  // 37 is the ratio I got by comparing a haxball pitch with a real-life futsal pitch
  return ~~(value / 37);
}

// Get the distance knowing the coordinates of 2 points
function getDistance(x, y) {
  // Use Pythagoras
  return Math.sqrt(x ** 2 + y ** 2);
}

// Return the opposite team ID of a team ID
function getOppositeTeamId(id) {
  return ( id == 1 ) ? 2 : ( id == 2 ) ? 1 : 0;
}

async function sendLogWebhook(msg) {
  if ( !DISCORD_LOG_WEBHOOK || msg.length == 0 ) return;
  try {
    await fetch(DISCORD_LOG_WEBHOOK, {
      method: "POST",
      body: JSON.stringify({ content: `\`\`\`${msg}\`\`\`` }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return;
  };
}

// Send a message to Discord Webhook
async function sendWebhook(title, content, fields, attachments) {
  if ( !DISCORD_WEBHOOK ) return;
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      body: JSON.stringify({
        embeds: [{
          color: 1752220,
          title: title,
          description: content,
          fields: fields,
        }],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return;
  };
  if ( !attachments ) return;
  for (const attachment of attachments) {
    if ( !attachment[1] ) continue;
    let form = new FormData();
    form.append(null, new File([attachment[1]], attachment[0], { "type": "text/plain" }));
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      body: form,
    });
  };
}

// Log an event
function log(msg) {
  console.log(msg);
  if ( !DISCORD_LOG_WEBHOOK ) return;
  logMsg += msg + "\n";
}

// Move AFK player to bottom of the Spectators list
function reorderPlayers() {
  room.reorderPlayers(Array.from(afkList), false);
}

function getAuth(id) {
  return identities[id][0];
}

function getConn(id) {
  return identities[id][1];
}

function getRole(player) {
  return player.admin ? ROLE.SUPER_ADMIN: adminAuths.has(getAuth(player.id)) ? ROLE.ADMIN: ROLE.PLAYER;
}

function getSetting(id) {
  return new Setting(JSON.parse(localStorage.getItem(`setting_${getAuth(id)}`)));
}

function saveSetting(id, setting) {
  localStorage.setItem(`setting_${getAuth(id)}`, JSON.stringify(setting));
}

// Return player's statistics in the room
function getStats(auth) {
  return new PlayerReport(JSON.parse(localStorage.getItem(auth)));
}

function getGameStats(player, team) {
  if ( identities[player.id] === undefined ) return new PlayerStats();
  let auth = getAuth(player.id);
  team = team || player.team;
  if ( game.teams[team].players[auth] === undefined ) {
    game.teams[team].players[auth] = new PlayerStats(player.name);
  };
  return game.teams[team].players[auth];
}

// Get a player by name or tag
function getPlayerByName(value) {
  if ( !value ) return null;
  // Find player by tag
  if ( value.startsWith("@") ) {
    return room.getPlayerList().find(player => getTag(player.name) == value);
  };
  // Find player by part of the name
  value = value.toLowerCase();
  return room.getPlayerList().find(player => player.name.toLowerCase().includes(value));
}

// Exclude AFK players from player list
function getNonAfkPlayers() {
  return room.getPlayerList().filter(player => !afkList.has(player.id));
}

function getSpectators() {
  return room.getPlayerList().filter(player => (player.team == 0) && !afkList.has(player.id));
}

// Get a player by position in Spectators list
function getPlayerByPos(number) {
  return getNonAfkPlayers().filter(player => player.team == 0)[number - 1];
}

function getMotm() {
  if ( getNonAfkPlayers().length < MAX_PLAYERS * 2 ) return [null, null];
  let motm;
  let highestPoints = Number.MIN_VALUE;
  for (let teamId = 1; teamId < 3; teamId++) {
    for (const [auth, stats] of Object.entries(game.teams[teamId].players)) {
      if ( stats.getPoints() + (teamId == prevWinner) > highestPoints ) {
        highestPoints = stats.getPoints() + (teamId == prevWinner); // Winners get an extra point
        motm = [auth, stats.name];
      };
    };
  };
  return motm;
}

function getPredictionWinners() {
  return (predictions[prevScore] || []).reduce(function(players, id) {
    if ( afkList.has(id) ) return players;
    let player = room.getPlayer(id);
    (player !== null) && (player.team !== prevWinner) && players.push(player);
    return players;
  }, []);
}

// Get the spectator with the most points
function getBestSpectatorByStats() {
  let bestPlayer = null;
  let highest = -1;
  for (const player of getSpectators()) {
    let stats = getStats(getAuth(player.id));
    if ( stats.points < highest ) continue;
    bestPlayer = player;
    highest = stats.points;
  };
  return bestPlayer;
}

function isCaptain(id) {
  return Object.values(captains).includes(id);
}

function resizePlayer(id) {
  let setting = getSetting(id);
  if ( setting.sizeAdjustment == 0 ) return;
  let playerRadius = stadium.playerRadius || room.getPlayerDiscProperties(id).radius;
  room.setPlayerDiscProperties(id, { radius: (+playerRadius) + (+setting.sizeAdjustment) });
}

// Change players' size according to their settings
function resizePlayers() {
  for (const player of room.getPlayerList()) {
    if ( player.team == 0 ) continue;
    resizePlayer(player.id);
  };
}

// Set random colors for 2 teams
function setRandomColors() {
  let colors = randomChoice(TEAM_COLORS);
  room.setTeamColors(1, ...colors[0]);
  room.setTeamColors(2, ...colors[1]);
  [kits.red, kits.blue] = colors;
}

async function avatarEffect(playerId, avatars) {
  for (const avatar of avatars) {
    await room.setPlayerAvatar(playerId, avatar);
    await new Promise(r => setTimeout(r, 500));
  };
  room.setPlayerAvatar(playerId, null);
}

async function celebrationEffect(player) {
  let players;
  let playerIds;
  switch ( getRandomInt(11) ) {
    case 0:
      avatarEffect(player.id, ["🤫", "😂", "🤫", "😂"]);
      break;
    case 1:
      avatarEffect(player.id, ["😴", "💤", "😴", "💤"]);
      break;
    case 2:
      avatarEffect(player.id, ["🖕", "🤣", "🖕", "🤣"]);
      break;
    case 3:
      let originalRadius = room.getPlayerDiscProperties(player.id).radius;
      for (let i = 1; i <= 5; i += 1) {
        await room.setPlayerDiscProperties(player.id, { radius: stadium.playerRadius - stadium.playerRadius * (i % 2) / 2 });
        await new Promise(r => setTimeout(r, 500));
      };
      room.setPlayerDiscProperties(player.id, { radius: originalRadius });
      break;
    case 4:
      room.setPlayerDiscProperties(player.id, { radius: stadium.playerRadius * 2 });
      break;
    case 5:
      playerIds = room.getPlayerList().flatMap(player_ => (player_.team == player.team) && (player_.id != player.id) ? [player_.id] : []);
      for (let i = 0; i < playerIds.length; i++) {
        room.setPlayerDiscProperties(
          playerIds[i],
          {
            x: player.position.x + stadium.playerRadius * 4 * Math.cos(Math.PI * 2 * i / playerIds.length),
            y: player.position.y + stadium.playerRadius * 4 * Math.sin(Math.PI * 2 * i / playerIds.length)
          }
        );
      };
      break;
    case 6:
      let originalColor = room.getDiscProperties(0).color;
      for (const color of [0xFF0000, 0xFF8000, 0xFFFF00, 0x80FF00, 0x00FF00, 0x00FF80, 0x00FFFF, 0x0080FF, 0x0000FF, 0x7F00FF, 0xFF00FF, 0xFF007F]) {
        await room.setDiscProperties(0, {color: color});
        await new Promise(r => setTimeout(r, 500));
      };
      room.setDiscProperties(0, {color: originalColor});
      break;
    case 7:
      playerIds = room.getPlayerList().flatMap(player_ => (player_.team == player.team && player_.id != player.id) ? [player_.id] : []);
      await Promise.all(playerIds.map(id => room.setPlayerAvatar(id, "👏🏻")));
      await new Promise(r => setTimeout(r, 2500));
      await Promise.all(playerIds.map(id => room.setPlayerAvatar(id, null)));
      break;
    case 8:
      playerIds = room.getPlayerList().flatMap(player_ => player_.team == getOppositeTeamId(player.team) ? [player_.id] : []);
      await Promise.all(playerIds.map(id => room.setPlayerAvatar(id, "🐷")));
      await new Promise(r => setTimeout(r, 2500));
      await Promise.all(playerIds.map(id => room.setPlayerAvatar(id, null)));
      break;
    case 9:
      for (const player_ of room.getPlayerList()) {
        if ( player_.team == 0 || player_.id == player.id ) continue;
        room.setPlayerDiscProperties(player_.id, {xspeed: 10 * ((player.team == 1) ? 1 : -1)});
      };
      break;
    case 10:
      for (const player_ of room.getPlayerList()) {
        if ( player_.team == 0 || player_.id == player.id ) continue;
        let a = player_.x - player.x;
        let b = player_.y - player.y;
        let l = Math.sqrt(a * a + b * b);
        room.setPlayerDiscProperties(player_.id, {xspeed: 10 * a / l, yspeed: 10 * b / l});
      };
  };
}

// Show spectators with their assigned numbers to captains for them to pick by number
function showSpecTable() {
  if ( !isPicking ) return;
  let playerList = getSpectators().map((player, index) => `${player.name} (#${index + 1})`);
  let table = " ".repeat(85) + "DANH SÁCH DỰ BỊ\n" + "_".repeat(150) + "\n" + playerList.join("  •  ") + "\n" + "_".repeat(150);
  room.sendAnnouncement(table, captains[pickTurn], BLUE, "small-bold", 2);
  room.sendAnnouncement("Hướng dẫn: nhập số hoặc tag để chọn người chơi (VD: 2 hoặc @De_Paul). Nhập '0' để tự động chọn người chơi có thống kê tốt nhất", captains[pickTurn], YELLOW, "small", 0);
}

function isPlayerValid(player) {
  // Players without a name are not allowed
  if ( player.name.trim().length == 0 ) {
    room.kickPlayer(player.id, "Người chơi không có tên");
    return false;
  };
  // Invisible characters aren't allowed
  if ( INVISIBLE_CHARACTERS.some(char => player.name.includes(char)) ) {
    room.kickPlayer(player.id, "Tên người chơi chứa kí tự không hợp lệ");
    return false;
  };

  let tag = getTag(player.name.trim());
  for (const _player of room.getPlayerList()) {
    if ( _player.id == player.id ) continue;
    // Player joined by 2 tabs
    if ( (_player.id != 0) && (getConn(_player.id) == player.conn) ) {
      room.kickPlayer(_player.id, "Bạn đã vào room bằng 1 tab khác");
      continue;
    };
    // Duplicate tag
    if ( getTag(_player.name.trim()) == tag ) {
      room.kickPlayer(player.id, "Bạn đã trùng tên với một người khác trong room, xin vui lòng đổi lại");
      return false;
    };
  };
  return true;
}

async function checkBan(player) {
  let bans = JSON.parse(localStorage.getItem("bans")) || [];
  for (let i = 0; i < bans.length; i++) {
    if ( bans[i][0] != player.conn ) continue;
    bans[i][0] = player.id;
    setTimeout(ban.bind(null, ...bans[i]), 3000);
    bans.splice(i, 1);
    break;
  };
  localStorage.setItem("bans", JSON.stringify(bans));
}

function saveIdentities(player) {
  identities[player.id] = [player.auth, player.conn];
}

function canUseCommand(command, player) {
  if ( !command[1].includes(MODE) ) return false; // Command is not available in this mode
  if ( getRole(player) < command[2] ) return false; // Role is not high enough
  if ( isCaptain(player.id) < command[3] ) return false; // Captain required
  return true;
}

// Kick player if player doesn't act in time
function afkCallback(id) {
  room.kickPlayer(id, "AFK");
  delete timeouts.toAct[id];
}

// Kick if player doesn't quit AFK mode in time
function oversleepCallback(id) {
  room.kickPlayer(id, "Bạn đã AFK quá lâu");
  delete timeouts.toQuitAfk[id];
}

function penaltyTimeoutCallback() {
  if ( !isTakingPenalty ) return;
  room.sendChat("Cầu thủ đã không thực hiện penalty trong thời gian quy định");
  // Count as a miss if player doesn't perform the penalty in time
  game.penalty.push(false);
  takePenalty();
}

// Return true if the game is ongoing, false if the game is not yet started or is technically "over"
function getGameStatus() {
  let scores = room.getScores();
  return (
    (scores !== null) &&
    (Math.max(scores.red, scores.blue, 0.5) != scores.scoreLimit) &&
    ((scores.red == scores.blue) || (scores.time < scores.timeLimit))
  );
}

async function updateTeamPlayers() {
  if ( getGameStatus() === false ) return;

  await navigator.locks.request("update_team_players", async lock => {
    let players = getNonAfkPlayers();
    let redPlayers = players.filter(player => player.team == 1);
    let bluePlayers = players.filter(player => player.team == 2);
    let maxPlayers = MAX_PLAYERS;
    if ( isTakingPenalty ) maxPlayers = 1; // One player each side for taking a penalty
    if ( (redPlayers.length >= maxPlayers) && (bluePlayers.length >= maxPlayers) ) return; // Enough players for 2 teams
    // Find team that needs new player the most
    let missingTeam = ( redPlayers.length > bluePlayers.length ) ? 2 : ( redPlayers.length < bluePlayers.length ) ? 1 : 0;
    let subPlayers = players.filter(player => player.team == 0);

    if ( missingTeam == 0 ) {
      if ( subPlayers.length < 2 ) return;
      room.setPlayerTeam(subPlayers[0].id, 1);
      room.setPlayerTeam(subPlayers[1].id, 2);
    } else if ( subPlayers.length != 0 ) {
      room.setPlayerTeam(subPlayers[0].id, missingTeam);
    } else if ( players.length != 1 ) { // If there is only 1 player, let them chill with the training map
      room.setPlayerTeam(((missingTeam == 1) ? bluePlayers : redPlayers).at(-1).id, 0);
    };
  });
}

// Update information to monitor last kickers, possession and passing accuracy
function updateBallKick(player) {
  if ( !isPlaying ) return;
  let ballProperties = room.getDiscProperties(0);
  game.ballRecords.unshift(new Kick(ballProperties, player));
  game.ballRecords.pop();

  if ( game.ballRecords[1] === null ) { // Kick-off pass
    // Disallow pausing after kick-off
    canPause = false;
    return;
  };

  let timeGap = game.ballRecords[0].time - game.ballRecords[1].time;
  let travelingDistance = getDistance(ballProperties.x - game.ballRecords[1].properties.x, ballProperties.y - game.ballRecords[1].properties.y);
  let stats = getGameStats(player);
  if ( (game.ballRecords[1] === null) || (player.id != game.ballRecords[1].player.id) ) {
    stats.touches++;
    stats.meanPosition += (player.position.x - stats.meanPosition) / stats.touches;
  }
  // If the previous kick was a shot on goal, check whether it was blocked and exclude that shot if it was
  if ( game.ballRecords[1].isAShot && (travelingDistance < stadium.playerRadius * 2) ) {
    getGameStats(game.ballRecords[1].player).shotsOnTarget--;
    game.ballRecords[1].isAShot = false;
  } else if ( game.ballRecords[0].isAShot ) {
    stats.shotsOnTarget++;
  } else if ( Math.abs(ballProperties.x + ballProperties.xspeed * 100) < stadium.goalLine.x ) { // Switch to penalty shootout when maximum added time reached
    let scores = room.getScores();
    if ( (scores.timeLimit != 0) && (scores.time - scores.timeLimit > MAX_ADDED_TIME) ) {
      startPenaltyShootout();
      return;
    };
  };

  stats = getGameStats(game.ballRecords[1].player);
  if ( (game.ballRecords[2] !== null) && game.ballRecords[2].isAShot && (game.ballRecords[1].player.team != game.ballRecords[2].player.team) ) stats.stoppedShots++;
  if ( player.team != game.ballRecords[1].player.team ) return; // Received the ball from an opponent player
  if ( (player.id != game.ballRecords[1].player.id) && (travelingDistance > 12) ) stats.passes++; // Received the ball from a teammate, so the previous kick was a pass
  game.teams[player.team].possession += timeGap; // Received the ball from a teammate or from yourself, so it was in possession
}

// Change captain of a specific team
async function updateCaptain(teamId, newCaptain) {
  // Choose a random captain from the current team
  if ( !newCaptain ) {
    // Exclude former captain and AFK players
    let players = getNonAfkPlayers();
    // How new captain is picked:
    // - Find a player who is already in the team first
    // - If 2 teams are taking penalty, get that team player from `game.penalty.groups`
    // - If no one left in the team, find someone from the Spectators
    // - As the last option, get someone from the opposite team
    newCaptain = isTakingPenalty ? room.getPlayer(game.penalty.groups[teamId - 1].at(0)) : (
      players.find(player => (player.team == teamId) && !isCaptain(player.id)) ||
      players.find(player => player.team == 0) ||
      players.find(player => (player.team == getOppositeTeamId(teamId)) && !isCaptain(player.id))
    );
    // No player left to assign
    if ( !newCaptain ) {
      // Clear captain slot
      captains[teamId] = 0;
      return;
    };
  };

  let oldCaptainId = captains[teamId];
  captains[teamId] = newCaptain.id;
  if ( newCaptain.team == teamId ) {
    // Move old captain to the bottom of the team list to prevent being re-selected as the captain next time
    room.reorderPlayers([oldCaptainId], false);
  } else if ( isTakingPenalty ) {
    // Remove old captain from the penalty group
    game.penalty.groups[teamId - 1] = game.penalty.groups[teamId - 1].filter(id => id != oldCaptainId);
    // Add new captain to the penalty group (if necessary)
    game.penalty.groups[teamId - 1].includes(newCaptain.id) || game.penalty.groups[teamId - 1].unshift(newCaptain.id);
  } else {
    // Move new captain to team
    await room.setPlayerTeam(newCaptain.id, teamId);
    // Move old captain to Spectators
    await room.setPlayerTeam(oldCaptainId, 0);
  };
  room.sendAnnouncement(`${newCaptain.name} đã được chọn làm đội trưởng của ${TEAM_NAMES[teamId]}`, null, GREEN, "bold", 0);

  // Reset pick timeout for the new captain
  if ( isPicking && (pickTurn == teamId) ) {
    clearTimeout(timeouts.toPick);
    requestPick();
  };
}

// Under certain circumstances, automatically pick, start the game and return true
function checkAutoPick() {
  if ( !isPicking ) return;
  let specPlayers = [];
  let redPlayersCount = 0;
  let bluePlayersCount = 0;
  room.getPlayerList().forEach(function(player) {
    if ( afkList.has(player.id) ) return;
    switch ( player.team ) {
      case 0:
        specPlayers.push(player);
        break;
      case 1:
        redPlayersCount++;
        break;
      case 2:
        bluePlayersCount++;
    };
  });
  if ( (redPlayersCount == bluePlayersCount) && ((specPlayers.length == 1) || (redPlayersCount >= MAX_PLAYERS)) ) {
    room.startGame();
    return true;
  };
  if ( Math.abs(redPlayersCount - bluePlayersCount) < specPlayers.length ) return false;

  // Move all players to the missing team
  for (const player of specPlayers) {
    room.setPlayerTeam(player.id, 1 + (redPlayersCount > bluePlayersCount) | 0);
  };
  room.startGame();
  return true;
}

// Request a pick from the most needed team
function requestPick() {
  if ( !isPicking || checkAutoPick() ) return;
  let players = room.getPlayerList();
  let redPlayersCount = players.filter(player => player.team == 1).length;
  let bluePlayersCount = players.filter(player => player.team == 2).length;
  pickTurn = ( redPlayersCount > bluePlayersCount ) ? 2 : 1;

  room.sendAnnouncement(`${TEAM_NAMES[pickTurn]} đang chọn người chơi...`, null, YELLOW, "small", 0);
  showSpecTable();
  room.sendAnnouncement("Đã đến lượt bạn chọn người chơi", captains[pickTurn], YELLOW, "bold", 2);
  // Kick if captain doesn't pick in time
  timeouts.toPick = setTimeout(
    room.kickPlayer.bind(null, captains[pickTurn], "Bạn đã không chọn người chơi trong thời gian quy định"),
    (( Math.min(redPlayersCount, bluePlayersCount) > 1 ) ? PICK_TIMEOUT : FIRST_PICK_TIMEOUT) * 1000,
  );
}

function helpFunc(value, player) {
  let allAlias = Object.keys(commands).filter(alias => canUseCommand(commands[alias], player));
  allAlias = allAlias.map(alias => "!" + alias)
  room.sendAnnouncement(`Các câu lệnh có sẵn: ${allAlias.join(", ")}`, player.id, GREEN);
}

function discordFunc(value, player) {
  if ( !DISCORD_LINK ) {
    room.sendAnnouncement(`Room hiện chưa có server Discord`, player.id, YELLOW, "normal", 0);
    return;
  };
  room.sendAnnouncement(`Vào server Discord của De Paul 🥰: ${DISCORD_LINK}`, null, GREEN, "normal", 0);
}

function byeFunc(value, player) {
  room.kickPlayer(player.id, "Bye, sớm quay lại room nha 👋🏻🥺");
}

function showStatsFunc(value, player) {
  let showPlayer;
  if ( !value ) {
    showPlayer = player;
  } else {
    showPlayer = getPlayerByName(value);
    if ( showPlayer === undefined ) {
      room.sendAnnouncement(`Người chơi "${value}" không tồn tại hoặc đã rời đi`, player.id, RED);
      return;
    };
  };
  let item = getStats(getAuth(showPlayer.id));
  room.sendAnnouncement(`Thống kê tháng ${getMonths()} của ${showPlayer.name} (${item.points} ⭐):`, player.id, 0x5DB899, "bold", 0);
  let str = "╭──────────────────────────────────────────────────╮";
  str += `\n| ⚽ Bàn thắng: ` + item.goals.toString().padEnd(4);
  str += `|  ✨ Cầu thủ xuất sắc nhất trận: ${item.motms}`;
  str += `\n| 👟 Kiến tạo: ` + item.assists.toString().padEnd(8);
  str += `|  🔰 Số trận đã chơi: ${item.games}`;
  str += `\n| ❌ Phản lưới: ` + item.ownGoals.toString().padEnd(4);
  str += `│  🧤 Sạch lưới: ${item.cleansheets}`;
  str += `\n| 🏆 Tỉ lệ thắng: ${item.getWinRate()}%`;
  str += "\n╰──────────────────────────────────────────────────╯";
  room.sendAnnouncement(str, player.id, 0x5DB899, "small-bold", 0);
  room.sendAnnouncement("Sử dụng !stat @người_chơi để xem thống kê của người chơi khác", player.id, YELLOW, "small-italic", 0);
}

function showRankingsFunc(value, player) {
  let playerList = getPlayerStats();
  if ( playerList.length == 0 ) {
    room.sendAnnouncement("Chưa có dữ liệu người chơi", player.id, RED);
    return;
  };

  // Sort players by points
  playerList.sort(function(player1, player2) {
    if ( player1.points == player2.points ) {
      return player2.goals + player2.assists - player1.goals - player1.assists;
    };
    return player2.points - player1.points;
  })
  let msg = `⭐ Danh sách cầu thủ hàng đầu tháng ${getMonths()} ⭐: ${playerList.slice(0, 5).map((player, index) => `${index + 1}. ${player.name} (${player.points} ⭐)`).join("  •  ")}`;
  msg += `\n (Xếp hạng của bạn: ${1 + playerList.findIndex(stats => stats.auth == getAuth(player.id)) || "Không có"})`;
  // Sort players by goals scored
  playerList.sort(function(player1, player2) {
    if ( player1.goals == player2.goals ) {
      return player2.assists - player1.assists;
    };
    return player2.goals - player1.goals;
  })
  msg += `\n⚽ Danh sách ghi bàn hàng đầu tháng ${getMonths()} ⚽: ${playerList.slice(0, 5).map((player, index) => `${index + 1}. ${player.name} (${player.goals} ⚽)`).join("  •  ")}`;
  msg += `\n (Xếp hạng của bạn: ${1 + playerList.findIndex(stats => stats.auth == getAuth(player.id)) || "Không có"})`;

  // Sort players by assists made
  playerList.sort(function(player1, player2) {
    if ( player1.assists == player2.assists ) {
      return player2.goals - player1.goals;
    };
    return player2.assists - player1.assists;
  });
  msg += `\n👟 Danh sách kiến tạo hàng đầu tháng ${getMonths()} 👟: ${playerList.slice(0, 5).map((player, index) => `${index + 1}. ${player.name} (${player.assists} 👟)`).join("  •  ")}`;
  msg += `\n (Xếp hạng của bạn: ${1 + playerList.findIndex(stats => stats.auth == getAuth(player.id)) || "Không có"})`;

  room.sendAnnouncement(msg, player.id, YELLOW, "small-italic", 0);
}

function kickAfkFunc(value, player) {
  if ( !isPlaying ) {
    room.sendAnnouncement("Chỉ có thể báo cáo AFK khi trận đấu đang diễn ra", player.id, RED);
    return;
  };

  trackAfk();
  room.sendAnnouncement("Đang theo dõi AFK, AFK sẽ sớm bị kick (hãy luôn nhớ sử dụng lệnh !kickafk để kick AFK)", null, GREEN);
}

function specFunc(value, player) {
  if ( player.team == 0 ) {
    room.sendAnnouncement("Bạn đã ở Spectators", player.id, RED);
    return;
  } else if ( getSpectators().length == 0 ) {
    room.sendAnnouncement("Đã hết người chơi để thay vào", player.id, RED);
    return;
  };

  room.setPlayerTeam(player.id, 0)
    .then(() => room.sendAnnouncement(`${player.name} đã yêu cầu và được di chuyển ra Spectators`, null, GREEN))
    .then(() => updateTeamPlayers());
  punishQuitGame(player);
}

function listCaptainsFunc(value, player) {
  for (let teamId = 1; teamId < 3; teamId++) {
    (captains[teamId] != 0) && room.sendAnnouncement(`Đội trưởng của ${TEAM_NAMES[teamId]}: ${room.getPlayer(captains[teamId]).name}`, null, GREEN, "normal", 0);
  };
}

function predictFunc(prediction, player) {
  if ( player.team != 0 ) {
    room.sendAnnouncement("Cầu thủ không được tham gia dự đoán để tránh hiện tượng bán độ", player.id, RED);
    return;
  };
  if ( !prediction ) {
    room.sendAnnouncement("Vui lòng cung cấp một tỉ số hợp lệ, có dạng RED-BLUE (VD: 3-1)", player.id, RED);
    return;
  };
  if ( Object.values(predictions).some(predictors => predictors.includes(player.id)) ) { // Has already had a prediction
    room.sendAnnouncement("Bạn chỉ có thể thực hiện một dự đoán trong một trận đấu", player.id, RED);
    return;
  };
  let scores = room.getScores();
  if ( isTakingPenalty || (scores === null) || (scores.time > PREDICTION_PERIOD) || (scores.red + scores.blue != 0) ) {
    room.sendAnnouncement("Chưa thể đoán tỉ số hoặc đã hết thời hạn dự đoán tỉ số", player.id, RED);
    return;
  };

  let score = prediction.split("-").map(goals => Number(goals));
  if ( (score.length != 2) || score.some(goals => goals % 1 !== 0) ) {
    room.sendAnnouncement("Tỉ số không hợp lệ, vui lòng đảm bảo tỉ số có dạng RED-BLUE (VD: 2-1)", player.id, RED);
    return;
  };
  let scoreLimit = room.getScores().scoreLimit;
  if ( (scoreLimit != 0) && (score.some(goals => goals > scoreLimit) || (score[0] + score[1] == scoreLimit * 2)) ) {
    room.sendAnnouncement("Tỉ số không thể xảy ra", player.id, RED);
    return;
  };
  prediction = score.join("-"); // Re-format weird scores like "0x01-0x02", even though I don't know why I should even care
  if ( predictions[prediction] === undefined ) {
    predictions[prediction] = [player.id];
  } else if ( (MODE != "pick") && (predictions[prediction].length <= MAX_PLAYERS) ) {
    predictions[prediction].push(player.id);
  } else { // Maximum winners per match reached (1 in pick mode and maximum number of players each team in rand mode) 
    room.sendAnnouncement("Đã có đủ người dự đoán tỉ số này, vui lòng dự đoán tỉ số khác", player.id, RED);
    return;
  };
  
  room.sendAnnouncement(`${player.name} đã dự đoán tỉ số RED ${prediction} BLUE`, null, GREEN);
}

function surrenderFunc(value, player) {
  if ( player.team == 0 ) {
    room.sendAnnouncement("Bạn không thể sử dụng lệnh này", player.id, RED);
    return;
  };
  let scores = room.getScores();
  if ( isTakingPenalty || (scores === null) ) {
    room.sendAnnouncement("Lệnh không khả dụng lúc này", player.id, RED);
    return;
  };
  if ( scores.time < 60 * TIME_LIMIT / 2 ) {
    room.sendAnnouncement("Chưa đủ thời gian chơi tối thiểu để có thể đầu hàng, vui lòng đợi thêm", player.id, RED);
    return;
  };
  if ( ( player.team == 1 ) ? (scores.red >= scores.blue) : (scores.blue >= scores.red) ) {
    room.sendAnnouncement("Bạn chỉ có thể đầu hàng khi đội đang thua", player.id, RED);
    return;
  };
  if ( surrenderVoter.hasVoted(player) ) {
    room.sendAnnouncement("Bạn đã bỏ phiếu đầu hàng trước đó", player.id, RED);
    return;
  }

  surrenderVoter.vote(player);
}

function subFunc(value, player) {
  if ( isTakingPenalty || (room.getScores() === null) ) {
    room.sendAnnouncement("Bạn chỉ có thể thay người khi trận đấu đang diễn ra", player.id, RED);
    return;
  };
  if ( game.teams[player.team].substitutions >= MAX_SUBSTITUTIONS ) {
    room.sendAnnouncement("Bạn đã hết lượt thay người", player.id, RED);
    return;
  };
  let sub = value.split(" ", 2);
  if ( sub[0] == "" ) {
    room.sendAnnouncement("Đặt cầu thủ muốn thay ra TRƯỚC cầu thủ muốn thay vào, bỏ trống vị trí thay vào nếu muốn tự động thay vào cầu thủ có thống kê tốt nhất trong room (VD: !sub @a @b hoặc !sub @a)", player.id, RED);
    return;
  };

  let [outPlayer, inPlayer] = [getPlayerByName(sub[0]), getPlayerByName(sub[1]) || getBestSpectatorByStats()];
  if ( !inPlayer || !outPlayer ) {
    room.sendAnnouncement("Một trong hai hoặc cả hai cầu thủ không tồn tại hoặc đã rời đi", player.id, RED);
    return;
  };
  if ( inPlayer.team != 0 ) {
    room.sendAnnouncement("Chỉ có thể thay vào người chơi từ Spectators", player.id, RED);
    return;
  };
  if ( afkList.has(inPlayer.id) ) {
    room.sendAnnouncement("Người chơi bạn muốn thay vào đang ở trạng thái AFK", player.id, RED);
    return;
  };
  if ( outPlayer.team != player.team ) {
    room.sendAnnouncement("Không thể thay ra cầu thủ không nằm trong đội bạn", player.id, RED);
    return;
  };
  room.sendAnnouncement(`🔻 ${outPlayer.name} đã được thay ra ngoài`, null, 0xFF0000, "small", 0);
  room.sendAnnouncement(`🔺 ${inPlayer.name} đã được thay vào sân`, null, 0x00FF00, "small", 0);
  room.setPlayerTeam(inPlayer.id, player.team);
  room.setPlayerTeam(outPlayer.id, 0);
  game.teams[player.team].substitutions++;
  room.sendAnnouncement(`Lượt thay người còn lại: ${MAX_SUBSTITUTIONS - game.teams[player.team].substitutions}`, player.id, YELLOW, "small-italic", 0);
}

function pauseFunc(value, player) {
  if ( !canPause ) {
    room.sendAnnouncement("Bạn không thể dừng game vào lúc này", player.id, RED);
    return;
  };

  pausedBy = player.team;
  room.pauseGame(true);
  room.sendChat(`Trận đấu đã được tạm dừng bởi đội trưởng của ${TEAM_NAMES[player.team]} để thay người`);
  room.sendAnnouncement(`Bạn có ${PAUSE_TIMEOUT} giây để thay người, dùng !resume khi đã xong việc`, player.id, YELLOW);
  timeouts.toResume = setTimeout(room.pauseGame.bind(null, false), PAUSE_TIMEOUT * 1000);
}

function resumeFunc(value, player) {
  if ( player.team != pausedBy ) {
    room.sendAnnouncement("Vui lòng đợi đội bạn thay người", player.id, RED);
    return;
  };

  room.pauseGame(false);
}

function setMsgColorFunc(value, player) {
  if ( value != "normal" ) {
    if ( !/^[0-9A-F]{6}$/i.test(value) ) {
      room.sendAnnouncement('Vui lòng nhập một mã màu hợp lệ hoặc dùng "normal" để đặt lại về mặc định (VD: !msgcolor 00FFFF hoặc !msgcolor normal)', player.id, RED);
      return;
    };
    value = `0x${value}`;
  };
  let setting = getSetting(player.id);
  setting.msgColor = value;
  saveSetting(player.id, setting);
  room.sendAnnouncement("Đã đổi màu tin nhắn thành công", player.id, GREEN);
}

function adjustSizeFunc(value, player) {
  if ( !value || isNaN(value) ) {
    room.sendAnnouncement("Vui lòng cung cấp số đơn vị muốn thay đổi, dùng 0 để chỉnh lại về bình thường (VD: !adjustsize -2)", player.id, RED);
    return;
  };
  if ( value > 0 ) {
    room.sendAnnouncement("Bạn không thể tăng kích cỡ cầu thủ", player.id, RED);
    return;
  };
  if ( Math.abs(value) > stadium.playerRadius * MAX_SIZE_ADJUSTMENT_RATIO ) {
    room.sendAnnouncement("Kích cỡ cầu thủ đã bị chỉnh tới mức không hợp lệ", player.id, RED);
    return;
  };
  let setting = getSetting(player.id);
  let gap = value - setting.sizeAdjustment;
  setting.sizeAdjustment = value;
  saveSetting(player.id, setting);

  let playerDiscProperties = room.getPlayerDiscProperties(player.id);
  (playerDiscProperties !== null) && room.setPlayerDiscProperties(player.id, { radius: playerDiscProperties.radius + gap });
  room.sendAnnouncement("Đã chỉnh và lưu kích thước cầu thủ", player.id, GREEN);
}

function assignCaptainFunc(value, player) {
  if ( !value ) {
    room.sendAnnouncement("Vui lòng cung cấp tên đội và một người chơi hợp lệ (VD: !assigncap red @De_Paul hoặc !assigncap blue paul)", player.id, RED);
    return;
  };

  let teamIds = {"red": 1, "blue": 2};
  let [team, name] = value.split(" ", 2);
  if ( teamIds[team] === undefined ) {
    room.sendAnnouncement("Tên đội phải là \"red\" hoặc \"blue\" (VD: !assigncap red paul)", player.id, RED);
    return;
  };
  let assignedPlayer = getPlayerByName(name);
  if ( !assignedPlayer ) {
    room.sendAnnouncement(`Người chơi "${value}" không tồn tại hoặc đã rời đi`, player.id, RED);
    return;
  };
  if ( afkList.has(assignedPlayer.id) ) {
    room.sendAnnouncement("Người chơi đang ở trạng thái AFK", player.id, RED);
    return;
  };

  updateCaptain(teamIds[team], assignedPlayer);
}

function leaveCaptainFunc(value, player) {
  let assignedPlayer = getPlayerByName(value);
  if ( !assignedPlayer ) {
    room.sendAnnouncement(`Người chơi "${value}" không tồn tại hoặc đã rời đi`, player.id, RED);
    return;
  };
  if ( afkList.has(assignedPlayer.id) ) {
    room.sendAnnouncement("Người chơi đang ở trạng thái AFK", player.id, RED);
    return;
  };
  if ( assignedPlayer.team == getOppositeTeamId(player.team) ) {
    room.sendAnnouncement("Người chơi đang chơi cho đội khác", player.id, RED);
    return;
  };
  if ( assignedPlayer.id == player.id ) return;

  updateCaptain(player.team, assignedPlayer);
  room.sendAnnouncement(`${player.name} đã nhường băng đội trưởng cho ${assignedPlayer.name}`, null, YELLOW, "small-italic");
}

function loginFunc(password, player) {
  switch ( password ) {
    case "":
      room.sendAnnouncement("Vui lòng đính kèm mật khẩu (VD: !login mk)", player.id, RED);
      break;
    case ADMIN_PASSWORD:
      adminAuths.add(getAuth(player.id));
      room.sendAnnouncement(`${player.name} đã đăng nhập thành công dưới tư cách là Admin`, null, GREEN, "bold");
      break;
    case SUPER_ADMIN_PASSWORD:
      room.setPlayerAdmin(player.id, true);
      room.sendAnnouncement(`${player.name} đã đăng nhập thành công dưới tư cách là Siêu Admin`, null, GREEN, "bold");
      break;
    default:
      room.kickPlayer(player.id, "Bạn đã nhập sai mật khẩu, vui lòng thử lại");
  };
}

function yellowCardFunc(value, player) {
  if ( !value ) {
    room.sendAnnouncement("Vui lòng cung cấp một người chơi hợp lệ và lý do phạt nếu có (VD: !yellow @De_Paul hoặc !yellow paul Láo)", player.id, RED);
    return;
  };

  value = value.split(" ");
  let [name, reason] = [value.shift(), value.join(" ")];
  let toPlayer = getPlayerByName(name);
  if ( !toPlayer ) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${name}"`, player.id, RED);
    return;
  };
  if ( getRole(player) < getRole(toPlayer) ) {
    room.sendAnnouncement(`Bạn không có quyền phạt thẻ vàng người chơi "${name}"`, player.id, RED);
    return;
  };

  let yellowCards = JSON.parse(localStorage.getItem("yellow_cards")) || [];
  let index = yellowCards.indexOf(getConn(toPlayer.id));
  if ( index != -1 ) { // Player has already received a yellow card
    yellowCards.splice(index, 1); // Clear the card
    ban(toPlayer.id, "Bạn đã nhận 2 thẻ vàng", YELLOW_BAN_PERIOD);
    var msg = `🟨🟨 ${toPlayer.name} đã nhận thẻ vàng thứ 2 từ ${player.name}`;
  } else {
    yellowCards.push(getConn(toPlayer.id));
    var msg = `🟨 ${toPlayer.name} đã nhận một thẻ vàng từ ${player.name} (2 thẻ vàng = ban)`;
  };
  reason && (msg += `: ${reason}`);
  room.sendAnnouncement(msg, null, YELLOW);
  localStorage.setItem("yellow_cards", JSON.stringify(yellowCards));
  log(`${toPlayer.name} was given a yellow card by ${player.name} (reason: ${reason})`);
}

function clearYellowCardFunc(value, player) {
  if ( !value ) {
    room.sendAnnouncement("Vui lòng cung cấp một người chơi hợp lệ (VD: !clearyellow @De_Paul hoặc !clearyellow paul)", player.id, RED);
    return;
  };

  let toPlayer = getPlayerByName(value);
  if ( !toPlayer ) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${value}"`, player.id, RED);
    return;
  };

  let yellowCards = JSON.parse(localStorage.getItem("yellow_cards")) || [];
  let index = yellowCards.indexOf(getConn(toPlayer.id));
  if ( index == -1 ) {
    room.sendAnnouncement(`${toPlayer.name} chưa nhận thẻ vàng nào`, player.id, RED);
    return;
  };
  yellowCards.splice(index, 1);
  localStorage.setItem("yellow_cards", JSON.stringify(yellowCards));
  room.sendAnnouncement(`🟨❌ ${toPlayer.name} đã được xóa thẻ vàng`, null, YELLOW);
  log(`${toPlayer.name}'s yellow card was cleared by ${player.name}`);
}

function muteFunc(value, player) {
  if ( !value ) {
    room.sendAnnouncement("Vui lòng cung cấp người chơi, thời hạn cấm chat (đơn vị phút, để 0 để cấm vĩnh viễn) và lý do nếu có (VD: !mute @ân 1 / !mute paul 0 Ngu)", player.id, RED);
    return;
  };

  value = value.split(" ");
  let [name, period, reason] = [value.shift(), value.shift(), value.join(" ")];
  let toPlayer = getPlayerByName(name);
  if ( !toPlayer ) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${name}"`, player.id, RED);
    return;
  };
  if ( getRole(player) < getRole(toPlayer) ) {
    room.sendAnnouncement(`Bạn không có quyền cấm chat người chơi "${name}"`, player.id, RED);
    return;
  };

  if ( isNaN(period) || period < 0 ) {
    room.sendAnnouncement("Vui lòng cung cấp một thời hạn cấm chat hợp lệ (VD: !mute @De_Paul 3)", player.id, RED);
    return;
  };

  muteList.add(getConn(toPlayer.id));
  if ( period == 0 ) {
    var msg = `${toPlayer.name} đã bị cấm chat bởi ${player.name}`;
    log(`${toPlayer.name} was muted by ${player.name} (reason: ${reason})`);
  } else {
    setTimeout(muteList.delete.bind(muteList, getConn(toPlayer.id)), period * 60 * 1000);
    var msg = `${toPlayer.name} đã bị cấm chat trong ${period} phút bởi ${player.name}`;
    log(`${toPlayer.name} was muted in ${period} minutes by ${player.name} (reason: ${reason})`);
  };
  reason && (msg += `: ${reason}`);
  room.sendAnnouncement(msg, null, RED, "bold", 0);
}

function unmuteFunc(value, player) {
  if ( !value ) {
    room.sendAnnouncement("Vui lòng cung cấp một người chơi hợp lệ (VD: !unmute @De_Paul hoặc !unmute paul)", player.id, RED);
    return;
  };

  let toPlayer = getPlayerByName(value);
  if ( !toPlayer ) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${value}"`, player.id, RED);
    return;
  };

  muteList.delete(getConn(toPlayer.id));
  room.sendAnnouncement(`${toPlayer.name} đã có thể chat trở lại`, null, GREEN);
  log(`${toPlayer.name} was unmuted by ${player.name})`);
}

function clearMutesFunc(value, player) {
  muteList.clear();
  room.sendAnnouncement("Đã xóa các lượt cấm chat", null, GREEN);
  log(`${player.name} unmuted all`);
}

function lockFunc(value, player) {
  if ( isChatLocked ) return;
  isChatLocked = true;
  room.sendAnnouncement(`${player.name} đã khóa khung chat`, null, YELLOW);
  log(`${player.name} locked the chat`);
}

function unlockFunc(value, player) {
  if ( !isChatLocked ) return;
  isChatLocked = false;
  room.sendAnnouncement(`${player.name} đã mở khóa khung chat`, null, YELLOW);
  log(`${player.name} unlocked the chat`);
}

function banFunc(value, player) {
  if ( !value ) {
    room.sendAnnouncement("Vui lòng cung cấp người chơi, thời hạn ban (đơn vị giờ, để 0 để cấm vĩnh viễn) và lý do nếu có (VD: !ban @ân 24 / !ban paul 0 Phá room)", player.id, RED);
    return;
  };

  value = value.split(" ");
  let [name, period, reason] = [value.shift(), value.shift(), value.join(" ")];
  let toPlayer = getPlayerByName(name);
  if ( !toPlayer ) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${name}"`, player.id, RED);
    return;
  };
  if ( getRole(player) < getRole(toPlayer) ) {
    room.sendAnnouncement(`Bạn không có quyền cấm người chơi "${name}"`, player.id, RED);
    return;
  };
  if ( isNaN(period) || period < 0 ) {
    room.sendAnnouncement("Vui lòng cung cấp một thời hạn cấm chat hợp lệ (VD: !mute @De_Paul 3)", player.id, RED);
    return;
  };
  ban(toPlayer.id, reason, +period);
}

function showBansFunc(value, player) {
  room.sendAnnouncement(`Danh sách người chơi đã bị ban:`, player.id, GREEN);
  for (const details of banList) {
    room.sendAnnouncement(`• [${details[0]}] ${details[1]} (Lí do: ${details[2]})`, player.id, GREEN, "small", 0);
  };
}

function unbanFunc(value, player) {
  if ( !value || isNaN(value) ) {
    room.sendAnnouncement("Vui lòng cung cấp ID người chơi bị cấm, dùng !bans để xem danh sách cấm (VD: !clearban 133)", player.id, RED);
    return;
  };
  let banDetails = banList.find(details => details[0] == value);
  if ( !banDetails ) {
    room.sendAnnouncement(`Không tìm thấy người chơi bị cấm với ID ${value}`, player.id, RED);
    return;
  }
  unban(banDetails[0]);
  room.sendAnnouncement(`Đã bỏ cấm người chơi ${banDetails[1]}`, null, GREEN);
  return;
}

function clearBansFunc(value, player) {
  room.clearBans();
  banList.length = 0;
  room.sendAnnouncement("Đã xóa các lượt ban", null, GREEN);
}

function afkFunc(value, player) {
  if ( afkList.has(player.id) ) { // Escape AFK mode
    afkList.delete(player.id);
    clearTimeout(timeouts.toQuitAfk[player.id]);
    delete timeouts.toQuitAfk[player.id];
    room.sendAnnouncement(`${player.name} đã thoát chế độ AFK`, null, GREEN);
    switch ( getNonAfkPlayers().length ) {
      case 8:
        loadStadium("5v5");
        break;
      case 6:
        loadStadium("3v3");
        break;
      case 2:
        loadStadium("1v1");
    };
  } else {
    if ( getRole(player) < ROLE.ADMIN ) {
      // Only allows a limited number of AFK players including the host
      if ( afkList.size == MAX_AFK_PLAYERS ) {
        room.sendAnnouncement("Đã có quá nhiều người chơi AFK, bạn không thể AFK", player.id, RED);
        return;
      };
      timeouts.toQuitAfk[player.id] = setTimeout(oversleepCallback.bind(null, player.id), AFK_TIMEOUT * 1000);
    };
    afkList.add(player.id);
    room.sendAnnouncement(`${player.name} đã chuyển sang chế độ AFK, dùng !afk lần nữa để thoát`, null, GREEN);
    // Move the AFK player to Spectators
    if ( player.team != 0 ) {
      room.setPlayerTeam(player.id, 0);
      punishQuitGame(player);
    };
    checkAutoPick();
    switch ( getNonAfkPlayers().length ) {
      case 7:
        loadStadium("3v3");
        break;
      case 5:
        loadStadium("1v1");
        break;
      case 1:
        loadStadium("training");
    };
  };

  updateTeamPlayers();
  reorderPlayers();
  showSpecTable();
};

function showAfksFunc(value, player) {
  room.sendAnnouncement(`Danh sách những người chơi đang AFK: ${Array.from(afkList).map(id => room.getPlayer(id).name).join(", ")}`, player.id, GREEN);
}

function punishQuitGame(player) {
  if (
    (getRole(player) >= ROLE.ADMIN) || // Admins receive no punishment
    (getGameStatus() === false) || // No punishment if the player quits after the game is over
    (getNonAfkPlayers().length < MAX_PLAYERS * 2 + 3) // No punishment if there are less than 3 spectators (the "captain slot" isn't that desired)
  ) return;
  let banMessage = "Bạn đã mắc quá nhiều lỗi vi phạm";
  let playerConn = getConn(player.id);
  if ( playerConn in warnings ) {
    warnings[playerConn]++;
  } else {
    warnings[playerConn] = 1;
  };
  room.sendAnnouncement(`${player.name} đã nhận ${warnings[playerConn]}/${MAX_WARNINGS_PER_PLAYER} cảnh cáo trong ngày do hành vi rời trận`, null, RED, "small-italic", 0);
  if ( warnings[playerConn] < MAX_WARNINGS_PER_PLAYER ) return;
  delete warnings[playerConn]; // Reset warnings record after punishment
  room.sendAnnouncement(`${player.name} đã nhận hình phạt (ban ${VIOLATION_BAN_PERIOD} giờ) do mắc quá nhiều lỗi vi phạm`, null, RED, "small-bold", 0);
  if ( room.getPlayer(player.id) === null ) { // Player left, save ban record so the next time the player joins, ban them
    let bans = JSON.parse(localStorage.getItem("bans")) || [];
    bans.push([playerConn, banMessage, VIOLATION_BAN_PERIOD]);
    localStorage.setItem("bans", JSON.stringify(bans));
    return;
  };
  ban(player.id, banMessage, VIOLATION_BAN_PERIOD);
}

function unban(playerId) {
  room.clearBan(playerId);
  banList = banList.filter(details => details[0] != playerId);
}

function ban(playerId, reason, timeout) {
  if ( timeout != 0 ) {
    reason = reason.length ? reason + `. Cấm sẽ hết hạn sau ${timeout} giờ` : `Cấm sẽ hết hạn sau ${timeout} giờ`;
    setTimeout(unban.bind(null, playerId), timeout * 60 * 60 * 1000);
  };
  room.kickPlayer(playerId, reason, true);
}

// Pick a player from the Spectators to move to a team
async function pick(pickedPlayer, team) {
  if ( !pickedPlayer ) { // No player provided, therefore select player with the best statistics
    pickedPlayer = getBestSpectatorByStats();
    if ( !pickedPlayer ) return; // Just in case there is any weird race condition bug:/
  };

  clearTimeout(timeouts.toPick);
  await room.setPlayerTeam(pickedPlayer.id, team);
  room.sendAnnouncement(`${pickedPlayer.name} đã được chọn vào ${TEAM_NAMES[team]}`, null, GREEN, "small", 0);
  requestPick();
}

function handleCommand(player, input) {
  // Get alias and value from command
  let splitIndex = input.indexOf(" ");
  splitIndex = ( splitIndex != -1 ) ? splitIndex : input.length;
  let [alias, value] = [input.slice(0, splitIndex).toLowerCase(), input.slice(splitIndex + 1).trim()];
  let command = commands[alias];
  if ( !command || !canUseCommand(command, player) ) {
    room.sendAnnouncement(`Không thể xác định lệnh !${alias}, dùng !help để xem các lệnh`, player.id, RED);
    return false;
  };

  return command[0](value, player);
}

// Update stats about goals, assists and own goals
function updateGoalStats(team) {
  let [shot, assist] = game.ballRecords;
  if ( shot === null ) return;

  if ( shot.player.team != team ) { // Own goal
    // Not an own goal but probably a clearing/goalkeeping effort
    if (
      assist && // Someone's kick resulted in this goal
      assist.isAShot && // The previous kick was a shot on target
      (assist.player.team == team) && // The previous kick came from an opponent player
      (stadium.goalLine.x - Math.abs(shot.properties.x) < stadium.playerRadius * 4) && // The gap between the ball and the goal-line was pretty small it probably was an effort to clear the ball
      (shot.time - assist.time < 3) // The time between 2 kicks wasn't too big, otherwise, it sounds nothing like a save
    ) {
      // Correct the credits
      [shot, assist] = game.ballRecords.slice(1);
    } else {
      getGameStats(shot.player).ownGoals++;
      room.sendChat(`Một bàn phản lưới nhà do sai lầm của ${getTag(shot.player.name)}`);
      (assist !== null) && (assist.player.team == team) && getGameStats(assist.player).attemptsLedToOG++;
      return;
    };
  };

  let ballPosition = room.getBallPosition();
  let shooterStats = getGameStats(shot.player);
  shooterStats.goals++;
  let comment = SCORER_COMMENTARIES[shooterStats.goals] || `Thật điên rồ, bàn thắng thứ ${shooterStats.goals} trong trận đấu này của`;
  comment = comment.concat(" ", getTag(shot.player.name));
  celebrationEffect(shot.player);
  if ( assist !== null ) {
    let assisterStats = getGameStats(assist.player);
    if ( assist.player.team != team ) {
      assisterStats.errorsLedToGoal++;
    } else if ( assist.player.id != shot.player.id ) { // Not a solo goal
      assisterStats.assists++;
      if ( assisterStats.assists != 1 ) { // Multiple assists O_O
        comment = comment.concat(", ", `${getTag(assist.player.name)} đã có cho mình kiến tạo thứ ${assisterStats.assists} trong trận đấu`);
      } else {
        comment = comment.concat(", ", `đường kiến tạo từ ${getTag(assist.player.name)}`);
      };
    };
  };
  room.sendChat(comment);

  // Calculate goal stats
  let speed = convertToMeters(getDistance(shot.properties.xspeed, shot.properties.yspeed) * 60); // There are 60 frames per second
  let distance = convertToMeters(getDistance(shot.properties.x - ballPosition.x, shot.properties.y - ballPosition.y));
  room.sendAnnouncement(`Khoảng cách: ${distance || "dưới 1"}m | Lực sút: ${speed} (m/s)`, null, 0x00FF00, "small", 0);
}

function saveStats() {
  let motmAuth = getMotm()[0];
  for (let teamId = 1; teamId < 3; teamId++) {
    let gk = [0, null];
    for (const [auth, report] of Object.entries(game.teams[teamId].players)) {
      let item = getStats(auth);
      item.name = report.name;
      item.goals += report.goals;
      item.assists += report.assists;
      item.ownGoals += report.ownGoals;
      item.games++;
      if ( teamId == prevWinner ) {
        item.wins++;
        item.points++;
      } else if ( (item.points != 0) && (auth != motmAuth) ) {
        item.points--;
      };
      if ( auth == motmAuth ) item.motms++;
      if (
        (prevScore.split("-").filter(score => score == "0").length > teamId != prevWinner) &&
        (
          (gk[1] === null) ||
          ((item.meanPosition - gk[0]) * (teamId * 2 - 3) > 0)
        )
      ) gk = [item.meanPosition, item.auth];
      delete item.auth; // Unused value
      localStorage.setItem(auth, JSON.stringify(item));
    };
    if ( gk[1] !== null ) {
      let stats = getStats(gk[1]);
      stats.cleansheets++;
      localStorage.setItem(gk[1], JSON.stringify(stats));
    };
  };
}

function reportStats() {
  let scoreline = ` RED ${prevScore} BLUE`;
  let time;
  if ( game.penalty.results[0].length != 0 ) {
    scoreline += ` (Luân lưu: ${game.penalty.results.map(results => results.filter(Boolean).length).join("-")})`;
    time = 60 * TIME_LIMIT + MAX_ADDED_TIME;
  } else {
    time = room.getScores().time;
  };
  let minutes = Math.floor(time / 60);
  let elapsedTime = `${minutes}:${Math.round(time - minutes * 60).toString().padStart(2, "0")}`;
  room.sendAnnouncement(scoreline, null, YELLOW, "bold", 0);

  let stats = game.getStats();
  let motm = getMotm()[1];
  let contributions = [[], []];
  let playerStats = [["Người chơi                       ", "Đội ", "Bàn", "Kiến tạo", "Phản lưới", "Đường chuyền", "Sút trúng đích", "Chặn cú sút", "Nỗ lực tạo ra bàn thắng phản lưới", "Sai lầm dẫn đến bàn thua", "Penalty thành công", "Penalty không thành công", "Chạm bóng"]];
  playerStats.push(["-".repeat(playerStats[0].reduce((length, name) => length + name.length + 3, 0) - 3)]);
  for (let i = 0; i < 2; i++) {
    for (const [auth, player] of Object.entries(game.teams[i + 1].players)) {
      playerStats.push([
        player.name.padEnd(33 + player.name.length - getDisplayLength(player.name), " "), // https://stackoverflow.com/a/38901550
        TEAM_NAMES[i + 1].padEnd(4, " "),
        player.goals.toString().padEnd(playerStats[0][2].length, " "),
        player.assists.toString().padEnd(playerStats[0][3].length, " "),
        player.ownGoals.toString().padEnd(playerStats[0][4].length, " "),
        player.passes.toString().padEnd(playerStats[0][5].length, " "),
        player.shotsOnTarget.toString().padEnd(playerStats[0][6].length, " "),
        player.stoppedShots.toString().padEnd(playerStats[0][7].length, " "),
        player.attemptsLedToOG.toString().padEnd(playerStats[0][8].length, " "),
        player.errorsLedToGoal.toString().padEnd(playerStats[0][9].length, " "),
        player.penaltiesScored.toString().padEnd(playerStats[0][10].length, " "),
        player.penaltiesMissed.toString().padEnd(playerStats[0][11].length, " "),
        player.touches.toString().padEnd(playerStats[0][12].length, " ")
      ]);
      if ( player.goals + player.assists + player.ownGoals == 0 ) continue;
      let msg = player.name + " (";
      if ( player.goals == 1 ) {
        msg += "⚽";
      } else if ( player.goals != 0 ) { // More than 1 goal
        msg += `${player.goals}⚽`;
      };
      if ( player.assists == 1 ) {
        msg += "👟";
      } else if ( player.assists != 0 ) { // More than 1 assist
        msg += `${player.assists}👟`;
      };
      if ( player.ownGoals == 1 ) {
        msg += "🥅";
      } else if ( player.ownGoals != 0 ) { // More than 1 own goal
        msg += `${player.ownGoals}🥅`;
      };
      msg += ")";
      contributions[i].push(msg);
    };
  };
  if ( motm !== null ) playerStats.push([""], [`Man of the Match: ${motm}`]);

  // Generate a room message about game statistics
  let statsMsg = `Kiểm soát bóng: 🔴 ${stats.possession.map(possession => possession + "%").join(" - ")} 🔵
Sút trúng đích: 🔴 ${stats.shotsOnTarget.join(" - ")} 🔵
Lượt chuyền bóng: 🔴 ${stats.passes.join(" - ")} 🔵`;
  if ( contributions[0].length != 0 ) {
    statsMsg += `\nRED: ${contributions[0].join("  •  ")}`;
  };
  if ( contributions[1].length != 0 ) {
    statsMsg += `\nBLUE: ${contributions[1].join("  •  ")}`;
  };
  if ( motm !== null ) statsMsg += `\nCầu thủ xuất sắc nhất trận: ${motm} 🎇`;
  statsMsg += `\nChuỗi bất bại: ${winningStreak} trận 🔥`;
  room.sendAnnouncement(statsMsg, null, YELLOW, "small-bold", 0);

  // Generate a Discord embed about game statistics
  let discordMsg = `**RED (captain: ${room.getPlayer(captains[1]).name})**
\`\`\`ansi
[2;31m${contributions[0].join("\n")}\`\`\`
**BLUE (captain: ${room.getPlayer(captains[2]).name})**
\`\`\`ansi
[2;34m${contributions[1].join("\n")}\`\`\``;
  let discordFields = [
    {
      name: "Thống kê trận đấu",
      value: "=======================\n\n**Kiểm soát bóng**\n**Sút trúng đích**\n**Lượt chuyền bóng**",
      inline: true,
    },
    {
      name: "🔴 **RED**",
      value: `==========\n\n${stats.possession[0]}%\n${stats.shotsOnTarget[0]}\n${stats.passes[0]}`,
      inline: true,
    },
    {
      name: "🔵 **BLUE**",
      value: `==========\n\n${stats.possession[1]}%\n${stats.shotsOnTarget[1]}\n${stats.passes[1]}`,
      inline: true,
    },
    {
      name: "",
      value: `MOTM: ${motm}\nThời gian: ${elapsedTime}\nChuỗi bất bại: ${winningStreak} trận`,
      inline: false,
    },
  ];
  sendWebhook(`🌟 ${scoreline}`, discordMsg, discordFields, [[new Date().toString().slice(0, 21).replace(":", "h") + ".hbr2", room.stopRecording()], ["players_report.txt", playerStats.map(arr => arr.join(" | ")).join("\n")]]);
}

function celebrateGoal(team) {
  // Get ScoresObject
  let scores = room.getScores();
  let goalDiff = scores.red - scores.blue;
  if ( team == 2 ) goalDiff = -goalDiff;
  // Get score line in string
  let scoreline = `${scores.red}-${scores.blue}`;

  var scream = "VÀOOO"; // Goal screamer
  var comment = "bàn thắng mang lại không nhiều giá trị";
  // Design a good comment :P
  if (
    ((scores.scoreLimit != 0) && [scores.red, scores.blue].includes(scores.scoreLimit)) || // Maximum goals reached
    ((scores.timeLimit != 0) && (scores.time > scores.timeLimit - 7.5)) // Overtime or last-second goal
  ) {
    scream = "VÀOOOOOOOO";
    // Pick a random comment
    comment = randomChoice(WINNING_GOAL_COMMENTARIES);
  } else {
    if ( (scores.timeLimit != 0) && (scores.time > scores.timeLimit - 10) ) goalDiff = -3;
    var comments = GOAL_COMMENTARIES[goalDiff];
    if ( comments ) comment = comments[Math.floor(Math.random() * comments.length)];
  };

  room.sendChat(`${scream} ${scoreline}! ${comment}`);
}

function celebratePenalty(team) {
  if ( team == 1 ) {
    room.sendChat(randomChoice(PENALTY_GOAL_COMMENTARIES));
  } else {
    room.sendChat(randomChoice(PENALTY_MISS_COMMENTARIES));
  };
}

function checkSpam(player, message) {
  let time = new Date().getTime();
  if (
    (lastMessages.length > 0) &&
    (message === lastMessages[0][0]) &&
    (message === lastMessages[1][0]) &&
    (time - lastMessages[0][2] < 3000)
  ) { // 2 duplicate messages in a row
    muteFunc(`${getTag(player.name)} 1 Spam`, room.getPlayer(0));
    return true;
  } else if (
    (lastMessages.length == 4) &&
    (lastMessages.every(message => message[1] == player.id)) &&
    (time - lastMessages.pop()[2] < 8000)
  ) { // Sending too many messages in a short period of time
    muteFunc(`${getTag(player.name)} 1 Nhắn quá nhanh`, room.getPlayer(0));
    return true;
  };
  lastMessages.unshift([message, player.id, time]);
  if ( lastMessages.length > 4 ) lastMessages.pop();
  return false;
}

// Only track AFKs if there are many players in the room
function checkAfk() {
  if ( !isPlaying || getNonAfkPlayers().length < MAX_PLAYERS * 2 ) return;
  trackAfk();
}

// Track all players on the pitch to find and kick AFK players
function trackAfk() {
  // Track every player on the pitch
  room.getPlayerList().forEach(function(player) {
    if ( player.team == 0 ) return;
    if ( timeouts.toAct[player.id] !== undefined ) return; // Player has already been monitored
    timeouts.toAct[player.id] = setTimeout(afkCallback.bind(null, player.id), ACTIVITY_TIMEOUT * 1000);
  });
}

// Stop all AFK trackers
function clearAfkRecords() {
  for (const id of Object.keys(timeouts.toAct)) {
    clearTimeout(timeouts.toAct[id]);
    delete timeouts.toAct[id];
  };
}

function clearAfkRecord(id) {
  if ( !timeouts.toAct[id] ) return;
  clearTimeout(timeouts.toAct[id]);
  delete timeouts.toAct[id];
}

function initiateChat(player) {
  let msg = `Nhập !help để xem các câu lệnh
Discord: ${DISCORD_LINK}`;
  room.sendAnnouncement(msg, player.id, GREEN, "normal", 0);
  room.sendAnnouncement(`Số cảnh cáo bạn đã nhận trong ngày: ${warnings[player.conn] || 0}/${MAX_WARNINGS_PER_PLAYER}`, player.id, YELLOW, "small-italic", 0);
}

async function startPenaltyShootout() {
  isTakingPenalty = true;
  prevScore = Array(2).fill(room.getScores().red).join("-");
  let deepestPositions = [Number.MAX_VALUE, Number.MIN_VALUE];
  // Store players' team and role (GK or not) for the penalty shootout
  room.getPlayerList().forEach(function(player) {
    if ( player.team == 0 ) return;
    let group = game.penalty.groups[player.team - 1];
    let stats = getGameStats(player);
    if (
      (group.length == 0) ||
      ((stats.meanPosition - deepestPositions[player.team - 1]) * (player.team * 2 - 3) > 0)
    ) { // The lowest player will be assigned to the GK role
      group.push(player.id); // GK is the player in the last index of the array
      deepestPositions[player.team - 1] = stats.meanPosition;
    } else {
      group.unshift(player.id);
    };
  });
  await room.stopGame();
  loadStadium("penalty");
  room.sendChat("Vậy là những phút thi đấu chính thức của trận đấu đã hết, 2 đội sẽ bước đến loạt sút luân lưu");
  await new Promise(r => setTimeout(r, AFTER_GAME_REST * 1000));
  takePenalty();
}

async function endPenaltyShootout(winner) {
  // Put players back to where they were before the penalty shootout
  for (let i = 0; i < 2; i++) {
    for (const id of game.penalty.groups[i]) {
      await room.setPlayerTeam(id, i + 1);
    };
  };
  room.reorderPlayers(Object.values(captains), true); // Move captains to top of the list
  handlePostGame(winner);
  isTakingPenalty = false;
  await room.stopGame();
  let playersCount = getNonAfkPlayers().length;
  if ( playersCount < 2 ) {
    loadStadium("training");
  } else if ( playersCount < 6 ) {
    loadStadium("1v1");
  } else if ( playersCount < 8 ) {
    loadStadium("3v3");
  } else {
    loadStadium("5v5");
  };
}

async function takePenalty() {
  let winner = await game.penalty.getPenaltyWinner();
  // Found the winner in this penalty shootout
  if ( winner !== null ) {
    room.sendChat(`${TEAM_NAMES[winner]} là những người chiến thắng, sau màn trình diễn đáng kinh ngạc của họ!`);
    endPenaltyShootout(winner);
    return;
  };

  room.stopGame();
  // Put previous penalty taker and goalkeeper back to the Spectators
  for (const player of room.getPlayerList()) {
    await room.setPlayerTeam(player.id, 0);
  };
  switch ( game.penalty.getTurn() ) {
    case 0:
      room.setTeamColors(1, ...kits.red);
      room.setTeamColors(2, ...GOALKEEPER_COLORS.blue);
      break;
    case 1:
      room.setTeamColors(1, ...kits.blue);
      room.setTeamColors(2, ...GOALKEEPER_COLORS.red);
  };

  let [penaltyTaker, goalkeeper] = game.penalty.getPenaltyTakers();
  await room.setPlayerTeam(penaltyTaker, 1);
  await room.setPlayerTeam(goalkeeper, 2);
  room.startGame();
  room.setPlayerDiscProperties(penaltyTaker, {invMass: 9999}); // Prevent penalty taker from mis-kicking the ball (in some penalty stadiums the ball's invMass is bigger than players')

  let penResults = [[], []];
  for (let i = 0; i < 2; i++) {
    game.penalty.results[i].forEach(function(result) {
      switch ( result ) {
        case ( true ):
          penResults[i].push("🟢");
          break;
        case ( false ):
          penResults[i].push("🔴");
      };
    });
    if ( penResults[i].length < 5 ) {
      penResults[i].push("⚪".repeat(5 - penResults[i].length));
    } else if ( game.penalty.getTurn() <= i ) {
      penResults[i].push("⚪");
    };
  };
  room.sendAnnouncement(` RED ${penResults[0].reverse().join("")} - ${penResults[1].join("")} BLUE`, null, BLUE, "bold", 0);
  if ( game.penalty.results.flat(1).length == 10 ) {
    room.sendChat('Giờ ta sẽ đến loạt sút "Sudden Death", một đội thực hiện thành công và đội còn lại đá trượt thì kết quả sẽ được định đoạt');
  };
  room.sendChat(`Bây giờ ${getTag(room.getPlayer(penaltyTaker).name)} sẽ bước lên để thực hiện quả penalty`);
  room.sendAnnouncement(`Bạn có ${PENALTY_TIMEOUT} giây để thực hiện quả penalty`, penaltyTaker, YELLOW);
  timeouts.toTakePenalty = setTimeout(penaltyTimeoutCallback, PENALTY_TIMEOUT * 1000);
}

async function randPlayers() {
  // Prediction winners
  let predictionWinners = getPredictionWinners();
  (predictionWinners.length != 0) && room.sendChat(`Chúc mừng ${predictionWinners.map(winner => getTag(winner.name)).join(", ")} đã dự đoán đúng tỉ số và nhận được 1 suất đá chính`);

  let players = getNonAfkPlayers();
  // Get player list and suffle it
  let idList = players.sort(function(player1, player2) {
    if ( players.length <= MAX_PLAYERS * 2 + 1 ) return Math.random() - 0.5;
    // Sort players of the winning team to be on top of the list so they will be picked up in the same team  
    if ( player1.team == prevWinner ) return -1;
    if ( player2.team == prevWinner ) return 1;
    // Prediction winners get advantages over others
    for (const winner of predictionWinners) {
      if ( player1.id == winner.id ) return -1;
      if ( player2.id == winner.id ) return 1;
    };
    // Random order
    return Math.random() - 0.5;
  }).map(player => player.id);

  // Max number of players for each team
  let maxIndex = Math.min(idList.length, 10);
  let winnerMaxIndex = ~~(maxIndex / 2);
  // Move players to teams and Spectators correctly
  idList.forEach(function(id, index) {
    if ( index < winnerMaxIndex ) {
      room.setPlayerTeam(id, prevWinner);
    } else if ( index < maxIndex ) {
      room.setPlayerTeam(id, getOppositeTeamId(prevWinner));
    } else {
      room.setPlayerTeam(id, 0);
    };
  });

  room.startGame();
}

async function pickPlayers() {
  let players = getNonAfkPlayers();
  // Change captain of the losing team
  let captain = getPredictionWinners()[0];
  if ( captain !== undefined ) {
    room.sendChat(`Chúc mừng ${getTag(captain.name)} đã dự đoán đúng tỉ số và nhận được chiếc băng đội trưởng`);
  } else {
    captain = (afkList.has(selectedCaptain) ? null : room.getPlayer(selectedCaptain)) || players.find(player => player.team == 0);
    selectedCaptain = null;
  };
  await updateCaptain(getOppositeTeamId(prevWinner), captain);
  // Move players to Spectators
  for (const player of players) {
    if (
      isCaptain(player.id) ||
      ((players.length > MAX_PLAYERS * 2 + 1) && (player.team == prevWinner))
    ) continue;
    await room.setPlayerTeam(player.id, 0);
  };
  isPicking = true;
  requestPick();
}

function personalizeMsg(message, player) {
  let color = getRole(player) == ROLE.SUPER_ADMIN ? 0xDE3163 : getRole(player) == ROLE.ADMIN ? 0xFFD580 : 0xFFFFFF;
  let newMessage = `[${getStats(getAuth(player.id)).points}★] ${player.name.trim()}: ${message}`;
  newMessage = (getRole(player) == ROLE.SUPER_ADMIN ? "[SUPER ADMIN] " : getRole(player) == ROLE.ADMIN ? "[ADMIN] " : "") + newMessage;
  //let color = getSetting(player.id).msgColor;
  //if ( color == "normal" ) color = 0xFFFFFF;
  if ( message.includes("@") ) {
    for (const _player of room.getPlayerList()) {
      if ( message.includes(getTag(_player.name)) ) {
        room.sendAnnouncement(newMessage, _player.id, color, "bold", 2);
      } else {
        room.sendAnnouncement(newMessage, _player.id, color);
      };
    };
    return;
  };
  room.sendAnnouncement(newMessage, null, color);
}

function reset() {
  game.reset();
  surrenderVoter.reset();
  predictions = {};
}

function handlePostGame(winner) {
  if ( winner == prevWinner ) {
    winningStreak++;
  } else {
    winningStreak = 1;
    prevWinner = winner;
  };
  if ( getNonAfkPlayers().length < MIN_PLAYERS_FOR_STATS * 2 ) return;
  reportStats();
  saveStats();
}

room.onPlayerJoin = async function(player) {
  if ( !isPlayerValid(player) ) return;
  saveIdentities(player);
  initiateChat(player);
  await updateTeamPlayers();
  reorderPlayers();
  checkBan(player);
  if ( MODE == "pick" ) {
    // Assign captains if missing
    for (let teamId = 1; teamId < 3; teamId++) {
      if ( captains[teamId] == 0 ) {
        updateCaptain(teamId, player);
        break;
      };
    };
    showSpecTable();
  };
  switch ( getNonAfkPlayers().length ) {
    case 8:
      loadStadium("5v5");
      break;
    case 6:
      loadStadium("3v3");
      break;
    case 2:
      loadStadium("1v1");
  };
}

room.onPlayerLeave = async function(player) {
  if ( player.team != 0 ) { // An active player just left
    await updateTeamPlayers();
    punishQuitGame(player);
    if ( !isTakingPenalty ) {
      switch ( getNonAfkPlayers().length ) {
      case 7:
        loadStadium("3v3");
        break;
      case 5:
        loadStadium("1v1");
        break;
      case 1:
        loadStadium("training");
    };
  } else if ( afkList.has(player.id) ) { // Player was in AFK list
    // Remove from AFK list
    afkList.delete(player.id);
  };
  delete identities[player.id]; // Delete unused record
  
  if ( isTakingPenalty ) {
    // A penalty taker left the room
    for (let i = 0; i < 2; i++) {
      let index = game.penalty.groups[i].indexOf(player.id);
      if ( index == -1 ) continue;
      game.penalty.groups[i].splice(index, 1);
      if ( game.penalty.groups[i].length == 0 ) {
        room.sendChat(`Toàn bộ cầu thủ sút luân lưu của ${TEAM_NAMES[i + 1]} đã rời phòng, ${TEAM_NAMES[i + 1]} đã bị xử thua`);
        await endPenaltyShootout(2 - i);
        break;
      };
    };
  };

  // A captain left, assign another one
  let isCaptainOf = ( player.id == captains[1] ) ? 1 : ( player.id == captains[2] ) ? 2 : 0;
  if ( isCaptainOf != 0 ) {
    await updateCaptain(isCaptainOf);
  };
  checkAutoPick() || showSpecTable();
};

room.onPlayerTeamChange = async function(changedPlayer, byPlayer) {
  if ( isTakingPenalty ) {
    // The current penalty taker was moved to the Spectators by an admin, consider it a failed penalty
    if ( (changedPlayer.team == 0) && (byPlayer.id != 0) && Object.values(game.penalty.groups).some(group => group.includes(changedPlayer.id)) ) {
      clearTimeout(timeouts.toTakePenalty);
      penaltyTimeoutCallback();
    };
    return;
  };

  if ( changedPlayer.team == 0 ) {
    // Remove player from AFK tracklist
    clearAfkRecord(changedPlayer.id);
    reorderPlayers();
    if ( MODE == "pick" ) {
      // Captain was moved to Spectators, assign captain
      let isCaptainOf = ( changedPlayer.id == captains[1] ) ? 1 : ( changedPlayer.id == captains[2] ) ? 2 : 0;
      if ( isCaptainOf != 0 ) {
        updateCaptain(isCaptainOf);
      } else {
        showSpecTable();
      };
    };
  } else if ( afkList.has(changedPlayer.id) ) { // Move AFK players back to Spectators
    room.setPlayerTeam(changedPlayer.id, 0);
    room.sendAnnouncement("Người chơi đang ở trạng thái AFK", byPlayer.id, RED);
  } else {
    let scores = room.getScores();
    if ( scores === null ) return;
    resizePlayer(changedPlayer.id);
    room.sendAnnouncement("Bạn đã được thay vào sân", changedPlayer.id, BLUE, "small", 2);
    if ( isPlaying ) {
      timeouts.toAct[changedPlayer.id] = setTimeout(afkCallback.bind(null, changedPlayer.id), ACTIVITY_TIMEOUT * 1000);
    };
    // Player was moved in in late of the game, we should not take away his chance of being a captain
    if (
      (MODE == "pick") &&
      (selectedCaptain === null) &&
      scores.timeLimit &&
      (scores.timeLimit - scores.time < LATE_SUBSTITUTION_PERIOD)
    ) {
      selectedCaptain = changedPlayer.id;
      room.sendAnnouncement(`❗❗ ${changedPlayer.name} đã bị thay vào trận muộn nên vẫn sẽ được chọn làm đội trưởng trận sau`, null, YELLOW, "small-italic");
    };
  };
}

room.onPlayerBallKick = function(player) {
  if ( isTakingPenalty ) return;
  updateBallKick(player);
  // (getRole(player) == ROLE.VIP) && room.setDiscProperties(0, {color: ballColor.getColor()}); // Switch ball color
}

room.onTeamGoal = function(team) {
  if ( isTakingPenalty ) {
    clearTimeout(timeouts.toTakePenalty);
    getGameStats(room.getPlayerList().find(player => player.team == 1), game.penalty.getTurn() + 1)[(team == 1) ? "penaltiesScored" : "penaltiesMissed"]++;
    celebratePenalty(team);
    game.penalty.push(team == 1);
    return;
  };

  isPlaying = false; // The game is basically "off" until a position reset
  celebrateGoal(team);
  updateGoalStats(team);
}

room.onPositionsReset = function() {
  if ( isTakingPenalty ) {
    takePenalty();
    return;
  };

  resizePlayers();
  isPlaying = true;
  game.resetBallRecords();
  // Allows captains to pause the game before kick-off
  if ( (MODE == "pick") && (room.getScores().time != 0) && getSpectators().length ) {
    canPause = true;
    for (const captain of Object.values(captains)) {
      room.sendAnnouncement('Bạn có thể dừng game bằng lệnh !pause để thay người (dùng "!sub @thay_ra @thay_vào") trước khi kick-off', captain, YELLOW);
    };
  };
}

room.onPlayerChat = function(player, message) {
  if ( player.id == 0 ) return;
  clearAfkRecord(player.id);

  message = message.trimEnd();
  if ( !message ) return false; // Empty messages are not allowed
  if ( isPicking && isCaptain(player.id) && !message.includes(" ") && (Number.isInteger(+message) || message.startsWith("@")) ) { // Captain picks someone
    if ( player.team != pickTurn ) {
      room.sendAnnouncement("Chưa đến lượt bạn chọn", player.id, RED);
      return false;
    };

    switch ( message[0] ) {
      case "0": // Smart auto-pick
        pick(null, player.team);
        return false;
      case "@":
        var pickedPlayer = getPlayerByName(message);
        break;
      default:
        var pickedPlayer = getPlayerByPos(message);
    }

    if ( pickedPlayer === undefined ) {
      room.sendAnnouncement("Người chơi không tồn tại hoặc đã rời đi", player.id, RED);
    } else if ( afkList.has(pickedPlayer.id) ) {
      room.sendAnnouncement("Người chơi đang ở trạng thái AFK", player.id, RED);
    } else if ( pickedPlayer.team != 0 ) {
      room.sendAnnouncement("Người chơi không ở Spectators", player.id, RED);
    } else {
      pick(pickedPlayer, player.team);
    };

    return false;
  };
  // Perform some validations on the message
  if ( !message.startsWith("!") || COMMANDS_TO_VALIDATE.some(command => message.substring(1).startsWith(command)) ) {
    if ( muteList.has(getConn(player.id)) ) {
      room.sendAnnouncement("Không thể chat, bạn đã bị cấm", player.id, RED);
      return false;
    };
    if ( getRole(player) < ROLE.ADMIN ) {
      if ( isChatLocked ) {
        room.sendAnnouncement("Khung chat hiện đang bị khóa", player.id, RED);
        return false;
      }
      // Disallow Spectators from messaging when 2 teams are taking penalty
      if ( isTakingPenalty && (player.team == 0) ) {
        room.sendAnnouncement("Bạn chưa thể chat vào lúc này", player.id, RED);
        return false;
      };
      if ( (getRole(player) < ROLE.ADMIN) && checkSpam(player, message) ) return false;
    };
  };
  if ( message.startsWith("!") ) {
    handleCommand(player, message.slice(1));
    return false;
  };
  personalizeMsg(message, player);
  log(`[${player.name}]: ${message}`);
  return false;
}

room.onPlayerActivity = function(player) {
  clearAfkRecord(player.id);
}

room.onPlayerKicked = function(kickedPlayer, reason, banned, byPlayer) {
  let action = "kicked";
  if ( banned ) {
    banList.push([kickedPlayer.id, kickedPlayer.name, reason]);
    action = "banned";
  };
  // Log this to monitor kicking activity
  log(`${kickedPlayer.name} was ${action} by ${byPlayer.name} (reason: ${reason})`);
}

room.onTeamVictory = function(scores) {
  isPlaying = false;
  prevScore = `${scores.red}-${scores.blue}`;
  handlePostGame(( scores.red > scores.blue ) ? 1 : 2);
}

room.onGameStart = function(byPlayer) {
  isPlaying = true;
  isPicking = false;
  resizePlayers();
  if ( isTakingPenalty ) return;
  reset();
  // Stop forcing captain to pick
  clearTimeout(timeouts.toPick);
  setRandomColors();
  trackAfk();
  if ( DISCORD_WEBHOOK && SAVE_RECORDINGS ) room.startRecording();
  room.sendChat(`Quý vị khán giả có ${PREDICTION_PERIOD} giây để dự đoán tỉ số với !predict và có cơ hội nhận 1 suất đá chính.`);
  let players = getNonAfkPlayers();
  if ( players.length >= 8 ) {
    let points = [0, 0];
    for (const player of players) {
      if ( player.team == 0 ) continue;
      points[player.team - 1] += getStats(getAuth(player.id)).points;
    };
    let red_chance = ~~((50 + points[0]) / (100 + points[0] + points[1]) * 100); // 50 is the pseudocount in Bayesian probability
    setTimeout(
      room.sendAnnouncement.bind(
        null,
        `Máy tính dự đoán tỉ lệ thắng: ${red_chance}% ${"🟥".repeat(Math.round(red_chance / 10))}${"🟦".repeat(10 - Math.round(red_chance / 10))} ${100 - red_chance}%`,
        null,
        YELLOW,
        "small",
        0
      ),
      3000,
    );
  };
}

room.onGameStop = async function(byPlayer) {
  isPlaying = false;
  clearAfkRecords(); // Stop monitoring AFK when the game is stopped
  if ( (byPlayer !== null) && (byPlayer.id != 0) ) { // It wasn't a game over or stopped by host player
    room.sendChat("Trận đấu đã bị hủy bỏ vì thời tiết xấu");
    room.stopRecording();
    return;
  };
  if ( isTakingPenalty ) return;
  await new Promise(r => setTimeout(r, AFTER_GAME_REST * 1000)); // Have a little rest
  if ( room.getScores() !== null ) return;
  if ( MODE == "rand" ) {
    randPlayers();
  } else {
    pickPlayers();
  };
}

room.onGamePause = function(byPlayer) {
  isPlaying = false;
  clearAfkRecords(); // Stop monitoring AFK when the game is paused
}

room.onGameUnpause = function(byPlayer) {
  isPlaying = true;
  canPause = false;
}

room.onTeamsLockChange = function(locked, byPlayer) {
  // Make sure teams are always locked
  !locked && room.setTeamsLock(true);
}
