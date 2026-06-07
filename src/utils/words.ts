// 外研社新标准英语一年级起点 一年级上册+下册
// 难度等级：1=上册, 2=下册, 3=常用补充词（教材外但适合一年级）

export interface Word {
  id: string;
  english: string;
  chinese: string;
  category:
    | 'greetings'
    | 'numbers'
    | 'colors'
    | 'animals'
    | 'body'
    | 'family'
    | 'school'
    | 'food'
    | 'daily'
    | 'actions'
    | 'nature'
    | 'positions'
    | 'occupations'
    | 'sports'
    | 'clothes'
    | 'adjectives'
    | 'pronouns';
  difficulty: number; // 1=上册, 2=下册, 3=补充
  emoji: string;
}

export const categoryNames: Record<string, string> = {
  all: '全部',
  greetings: '问候',
  numbers: '数字',
  colors: '颜色',
  animals: '动物',
  body: '身体',
  family: '家庭',
  school: '学校',
  food: '食物',
  daily: '日常用品',
  actions: '动作',
  nature: '自然',
  positions: '方位',
  occupations: '职业',
  sports: '运动',
  clothes: '衣服',
  adjectives: '形容词',
  pronouns: '代词',
};

export const categoryEmojis: Record<string, string> = {
  greetings: '👋',
  numbers: '🔢',
  colors: '🎨',
  animals: '🐾',
  body: '',
  family: '👨‍👩‍👧‍',
  school: '🏫',
  food: '🍽️',
  daily: '🏠',
  actions: '',
  nature: '🌿',
  positions: '📍',
  occupations: '👷',
  sports: '⚽',
  clothes: '👕',
  adjectives: '📏',
  pronouns: '🧑',
};

// ============ 问候语 (上册 M1, M2, M9) ============
const greetingWords: Word[] = [
  { id: 'g01', english: 'hello', chinese: '你好', category: 'greetings', difficulty: 1, emoji: '👋' },
  { id: 'g02', english: 'hi', chinese: '你好', category: 'greetings', difficulty: 1, emoji: '' },
  { id: 'g03', english: 'goodbye', chinese: '再见', category: 'greetings', difficulty: 1, emoji: '👋' },
  { id: 'g04', english: 'bye', chinese: '再见', category: 'greetings', difficulty: 1, emoji: '👋' },
  { id: 'g05', english: 'morning', chinese: '早晨', category: 'greetings', difficulty: 1, emoji: '🌅' },
  { id: 'g06', english: 'afternoon', chinese: '下午', category: 'greetings', difficulty: 1, emoji: '🌇' },
  { id: 'g07', english: 'fine', chinese: '好的', category: 'greetings', difficulty: 1, emoji: '😊' },
  { id: 'g08', english: 'thank you', chinese: '谢谢你', category: 'greetings', difficulty: 1, emoji: '🙏' },
  { id: 'g09', english: 'sorry', chinese: '对不起', category: 'greetings', difficulty: 1, emoji: '😢' },
  { id: 'g10', english: 'welcome', chinese: '欢迎', category: 'greetings', difficulty: 1, emoji: '' },
  { id: 'g11', english: 'happy', chinese: '高兴的', category: 'greetings', difficulty: 1, emoji: '😄' },
  { id: 'g12', english: 'birthday', chinese: '生日', category: 'greetings', difficulty: 1, emoji: '🎂' },
  { id: 'g13', english: 'name', chinese: '名字', category: 'greetings', difficulty: 1, emoji: '📛' },
  { id: 'g14', english: 'see you', chinese: '再见', category: 'greetings', difficulty: 1, emoji: '👋' },
];

// ============ 数字 (上册 M3, 下册 M3) ============
const numberWords: Word[] = [
  { id: 'n01', english: 'one', chinese: '一', category: 'numbers', difficulty: 1, emoji: '1️⃣' },
  { id: 'n02', english: 'two', chinese: '二', category: 'numbers', difficulty: 1, emoji: '2️' },
  { id: 'n03', english: 'three', chinese: '三', category: 'numbers', difficulty: 1, emoji: '3️⃣' },
  { id: 'n04', english: 'four', chinese: '四', category: 'numbers', difficulty: 1, emoji: '4️⃣' },
  { id: 'n05', english: 'five', chinese: '五', category: 'numbers', difficulty: 1, emoji: '5️' },
  { id: 'n06', english: 'six', chinese: '六', category: 'numbers', difficulty: 1, emoji: '6️⃣' },
  { id: 'n07', english: 'seven', chinese: '七', category: 'numbers', difficulty: 1, emoji: '7️⃣' },
  { id: 'n08', english: 'eight', chinese: '八', category: 'numbers', difficulty: 1, emoji: '8️' },
  { id: 'n09', english: 'nine', chinese: '九', category: 'numbers', difficulty: 1, emoji: '9️⃣' },
  { id: 'n10', english: 'ten', chinese: '十', category: 'numbers', difficulty: 1, emoji: '🔟' },
  { id: 'n11', english: 'eleven', chinese: '十一', category: 'numbers', difficulty: 2, emoji: '' },
  { id: 'n12', english: 'twelve', chinese: '十二', category: 'numbers', difficulty: 2, emoji: '🔢' },
];

// ============ 颜色 (上册 M4) ============
const colorWords: Word[] = [
  { id: 'c01', english: 'red', chinese: '红色', category: 'colors', difficulty: 1, emoji: '🔴' },
  { id: 'c02', english: 'blue', chinese: '蓝色', category: 'colors', difficulty: 1, emoji: '🔵' },
  { id: 'c03', english: 'yellow', chinese: '黄色', category: 'colors', difficulty: 1, emoji: '🟡' },
  { id: 'c04', english: 'green', chinese: '绿色', category: 'colors', difficulty: 1, emoji: '' },
  { id: 'c05', english: 'white', chinese: '白色', category: 'colors', difficulty: 1, emoji: '⚪' },
  { id: 'c06', english: 'black', chinese: '黑色', category: 'colors', difficulty: 1, emoji: '⚫' },
  { id: 'c07', english: 'orange', chinese: '橙色', category: 'colors', difficulty: 3, emoji: '🟠' },
  { id: 'c08', english: 'pink', chinese: '粉色', category: 'colors', difficulty: 3, emoji: '💗' },
];

// ============ 动物 (上册 M2/M6, 下册 M5/M6) ============
const animalWords: Word[] = [
  { id: 'a01', english: 'cat', chinese: '猫', category: 'animals', difficulty: 1, emoji: '🐱' },
  { id: 'a02', english: 'dog', chinese: '狗', category: 'animals', difficulty: 1, emoji: '🐶' },
  { id: 'a03', english: 'bird', chinese: '鸟', category: 'animals', difficulty: 1, emoji: '🐦' },
  { id: 'a04', english: 'panda', chinese: '熊猫', category: 'animals', difficulty: 1, emoji: '' },
  { id: 'a05', english: 'bear', chinese: '熊', category: 'animals', difficulty: 1, emoji: '🐻' },
  { id: 'a06', english: 'fox', chinese: '狐狸', category: 'animals', difficulty: 1, emoji: '🦊' },
  { id: 'a07', english: 'fish', chinese: '鱼', category: 'animals', difficulty: 2, emoji: '🐟' },
  { id: 'a08', english: 'rabbit', chinese: '兔子', category: 'animals', difficulty: 2, emoji: '' },
  { id: 'a09', english: 'cow', chinese: '奶牛', category: 'animals', difficulty: 2, emoji: '🐮' },
  { id: 'a10', english: 'pig', chinese: '猪', category: 'animals', difficulty: 2, emoji: '🐷' },
  { id: 'a11', english: 'duck', chinese: '鸭子', category: 'animals', difficulty: 2, emoji: '🦆' },
  { id: 'a12', english: 'chicken', chinese: '鸡', category: 'animals', difficulty: 2, emoji: '🐔' },
  { id: 'a13', english: 'snake', chinese: '蛇', category: 'animals', difficulty: 2, emoji: '' },
  { id: 'a14', english: 'elephant', chinese: '大象', category: 'animals', difficulty: 2, emoji: '🐘' },
  { id: 'a15', english: 'giraffe', chinese: '长颈鹿', category: 'animals', difficulty: 2, emoji: '🦒' },
  { id: 'a16', english: 'tiger', chinese: '老虎', category: 'animals', difficulty: 2, emoji: '🐯' },
  { id: 'a17', english: 'horse', chinese: '马', category: 'animals', difficulty: 2, emoji: '' },
  { id: 'a18', english: 'lion', chinese: '狮子', category: 'animals', difficulty: 2, emoji: '🦁' },
  { id: 'a19', english: 'monkey', chinese: '猴子', category: 'animals', difficulty: 3, emoji: '🐵' },
  { id: 'a20', english: 'frog', chinese: '青蛙', category: 'animals', difficulty: 3, emoji: '🐸' },
];

// ============ 身体部位 (上册 M5, 下册 M4) ============
const bodyWords: Word[] = [
  { id: 'b01', english: 'head', chinese: '头', category: 'body', difficulty: 2, emoji: '💆' },
  { id: 'b02', english: 'nose', chinese: '鼻子', category: 'body', difficulty: 2, emoji: '👃' },
  { id: 'b03', english: 'face', chinese: '脸', category: 'body', difficulty: 2, emoji: '😊' },
  { id: 'b04', english: 'ear', chinese: '耳朵', category: 'body', difficulty: 2, emoji: '👂' },
  { id: 'b05', english: 'mouth', chinese: '嘴巴', category: 'body', difficulty: 2, emoji: '👄' },
  { id: 'b06', english: 'eye', chinese: '眼睛', category: 'body', difficulty: 2, emoji: '️' },
  { id: 'b07', english: 'hand', chinese: '手', category: 'body', difficulty: 2, emoji: '✋' },
  { id: 'b08', english: 'leg', chinese: '腿', category: 'body', difficulty: 2, emoji: '🦵' },
  { id: 'b09', english: 'foot', chinese: '脚', category: 'body', difficulty: 2, emoji: '🦶' },
  { id: 'b10', english: 'feet', chinese: '脚(复数)', category: 'body', difficulty: 2, emoji: '🦶' },
  { id: 'b11', english: 'body', chinese: '身体', category: 'body', difficulty: 2, emoji: '🧍' },
  { id: 'b12', english: 'hair', chinese: '头发', category: 'body', difficulty: 3, emoji: '' },
  { id: 'b13', english: 'arm', chinese: '手臂', category: 'body', difficulty: 3, emoji: '💪' },
];

// ============ 家庭 (上册/下册) ============
const familyWords: Word[] = [
  { id: 'f01', english: 'father', chinese: '爸爸', category: 'family', difficulty: 1, emoji: '👨' },
  { id: 'f02', english: 'mother', chinese: '妈妈', category: 'family', difficulty: 1, emoji: '👩' },
  { id: 'f03', english: 'brother', chinese: '哥哥/弟弟', category: 'family', difficulty: 3, emoji: '👦' },
  { id: 'f04', english: 'sister', chinese: '姐姐/妹妹', category: 'family', difficulty: 3, emoji: '👧' },
  { id: 'f05', english: 'grandpa', chinese: '爷爷', category: 'family', difficulty: 3, emoji: '👴' },
  { id: 'f06', english: 'grandma', chinese: '奶奶', category: 'family', difficulty: 3, emoji: '👵' },
  { id: 'f07', english: 'family', chinese: '家庭', category: 'family', difficulty: 1, emoji: '👨‍👩‍‍👦' },
  { id: 'f08', english: 'baby', chinese: '宝宝', category: 'family', difficulty: 2, emoji: '👶' },
  { id: 'f09', english: 'boy', chinese: '男孩', category: 'family', difficulty: 1, emoji: '👦' },
  { id: 'f10', english: 'girl', chinese: '女孩', category: 'family', difficulty: 1, emoji: '👧' },
];

// ============ 学校用品 (上册 M6/M7) ============
const schoolWords: Word[] = [
  { id: 's01', english: 'school', chinese: '学校', category: 'school', difficulty: 1, emoji: '🏫' },
  { id: 's02', english: 'teacher', chinese: '老师', category: 'school', difficulty: 1, emoji: '👩‍' },
  { id: 's03', english: 'classroom', chinese: '教室', category: 'school', difficulty: 1, emoji: '🏛️' },
  { id: 's04', english: 'desk', chinese: '课桌', category: 'school', difficulty: 1, emoji: '🪑' },
  { id: 's05', english: 'seat', chinese: '座位', category: 'school', difficulty: 1, emoji: '🪑' },
  { id: 's06', english: 'book', chinese: '书', category: 'school', difficulty: 1, emoji: '📖' },
  { id: 's07', english: 'pen', chinese: '钢笔', category: 'school', difficulty: 1, emoji: '️' },
  { id: 's08', english: 'pencil', chinese: '铅笔', category: 'school', difficulty: 1, emoji: '✏️' },
  { id: 's09', english: 'ruler', chinese: '尺子', category: 'school', difficulty: 1, emoji: '📏' },
  { id: 's10', english: 'eraser', chinese: '橡皮', category: 'school', difficulty: 1, emoji: '' },
  { id: 's11', english: 'crayon', chinese: '彩笔', category: 'school', difficulty: 1, emoji: '🖍️' },
  { id: 's12', english: 'bag', chinese: '书包', category: 'school', difficulty: 1, emoji: '' },
  { id: 's13', english: 'pupil', chinese: '学生', category: 'school', difficulty: 2, emoji: '🧑‍' },
  { id: 's14', english: 'homework', chinese: '作业', category: 'school', difficulty: 3, emoji: '📝' },
];

// ============ 食物 (上册 M9/M11, 下册 M5/M9) ============
const foodWords: Word[] = [
  { id: 'fo01', english: 'apple', chinese: '苹果', category: 'food', difficulty: 1, emoji: '🍎' },
  { id: 'fo02', english: 'rice', chinese: '米饭', category: 'food', difficulty: 2, emoji: '🍚' },
  { id: 'fo03', english: 'egg', chinese: '鸡蛋', category: 'food', difficulty: 2, emoji: '🥚' },
  { id: 'fo04', english: 'cake', chinese: '蛋糕', category: 'food', difficulty: 1, emoji: '🎂' },
  { id: 'fo05', english: 'meat', chinese: '肉', category: 'food', difficulty: 2, emoji: '🥩' },
  { id: 'fo06', english: 'noodle', chinese: '面条', category: 'food', difficulty: 3, emoji: '🍜' },
  { id: 'fo07', english: 'milk', chinese: '牛奶', category: 'food', difficulty: 3, emoji: '🥛' },
  { id: 'fo08', english: 'bread', chinese: '面包', category: 'food', difficulty: 3, emoji: '🍞' },
  { id: 'fo09', english: 'candy', chinese: '糖果', category: 'food', difficulty: 3, emoji: '🍬' },
  { id: 'fo10', english: 'ice cream', chinese: '冰淇淋', category: 'food', difficulty: 3, emoji: '🍦' },
  { id: 'fo11', english: 'meatball', chinese: '肉丸子', category: 'food', difficulty: 2, emoji: '🧆' },
];

// ============ 日常用品 (上册 M5/M8/M10) ============
const dailyWords: Word[] = [
  { id: 'd01', english: 'window', chinese: '窗户', category: 'daily', difficulty: 1, emoji: '🪟' },
  { id: 'd02', english: 'door', chinese: '门', category: 'daily', difficulty: 1, emoji: '🚪' },
  { id: 'd03', english: 'bed', chinese: '床', category: 'daily', difficulty: 1, emoji: '🛏️' },
  { id: 'd04', english: 'hat', chinese: '帽子', category: 'daily', difficulty: 1, emoji: '🧢' },
  { id: 'd05', english: 'kite', chinese: '风筝', category: 'daily', difficulty: 1, emoji: '' },
  { id: 'd06', english: 'house', chinese: '房子', category: 'daily', difficulty: 1, emoji: '🏠' },
  { id: 'd07', english: 'box', chinese: '盒子', category: 'daily', difficulty: 1, emoji: '📦' },
  { id: 'd08', english: 'balloon', chinese: '气球', category: 'daily', difficulty: 1, emoji: '🎈' },
  { id: 'd09', english: 'doll', chinese: '洋娃娃', category: 'daily', difficulty: 1, emoji: '' },
  { id: 'd10', english: 'toy', chinese: '玩具', category: 'daily', difficulty: 2, emoji: '🧸' },
  { id: 'd11', english: 'table', chinese: '桌子', category: 'daily', difficulty: 2, emoji: '🪵' },
  { id: 'd12', english: 'cup', chinese: '杯子', category: 'daily', difficulty: 3, emoji: '' },
  { id: 'd13', english: 'chair', chinese: '椅子', category: 'daily', difficulty: 3, emoji: '🪑' },
  { id: 'd14', english: 'clock', chinese: '时钟', category: 'daily', difficulty: 3, emoji: '🕐' },
  { id: 'd15', english: 'key', chinese: '钥匙', category: 'daily', difficulty: 3, emoji: '🔑' },
];

// ============ 动作 (上册 M5, 下册 M4/M8/M10) ============
const actionWords: Word[] = [
  { id: 'ac01', english: 'stand', chinese: '起立', category: 'actions', difficulty: 1, emoji: '🧍' },
  { id: 'ac02', english: 'sit', chinese: '坐下', category: 'actions', difficulty: 1, emoji: '🪑' },
  { id: 'ac03', english: 'open', chinese: '打开', category: 'actions', difficulty: 1, emoji: '📖' },
  { id: 'ac04', english: 'point', chinese: '指向', category: 'actions', difficulty: 1, emoji: '👆' },
  { id: 'ac05', english: 'look', chinese: '看', category: 'actions', difficulty: 1, emoji: '👀' },
  { id: 'ac06', english: 'thank', chinese: '谢谢', category: 'actions', difficulty: 1, emoji: '' },
  { id: 'ac07', english: 'touch', chinese: '触摸', category: 'actions', difficulty: 2, emoji: '👈' },
  { id: 'ac08', english: 'swim', chinese: '游泳', category: 'actions', difficulty: 2, emoji: '🏊' },
  { id: 'ac09', english: 'sing', chinese: '唱歌', category: 'actions', difficulty: 2, emoji: '' },
  { id: 'ac10', english: 'dance', chinese: '跳舞', category: 'actions', difficulty: 2, emoji: '💃' },
  { id: 'ac11', english: 'play', chinese: '玩', category: 'actions', difficulty: 2, emoji: '🎮' },
  { id: 'ac12', english: 'like', chinese: '喜欢', category: 'actions', difficulty: 2, emoji: '❤️' },
  { id: 'ac13', english: 'guess', chinese: '猜', category: 'actions', difficulty: 2, emoji: '' },
  { id: 'ac14', english: 'know', chinese: '知道', category: 'actions', difficulty: 2, emoji: '💡' },
  { id: 'ac15', english: 'help', chinese: '帮助', category: 'actions', difficulty: 2, emoji: '🤝' },
  { id: 'ac16', english: 'see', chinese: '看见', category: 'actions', difficulty: 2, emoji: '️' },
  { id: 'ac17', english: 'run', chinese: '跑', category: 'actions', difficulty: 3, emoji: '🏃' },
  { id: 'ac18', english: 'jump', chinese: '跳', category: 'actions', difficulty: 3, emoji: '🤸' },
  { id: 'ac19', english: 'walk', chinese: '走', category: 'actions', difficulty: 3, emoji: '🚶' },
  { id: 'ac20', english: 'read', chinese: '读', category: 'actions', difficulty: 3, emoji: '' },
  { id: 'ac21', english: 'write', chinese: '写', category: 'actions', difficulty: 3, emoji: '✍️' },
  { id: 'ac22', english: 'eat', chinese: '吃', category: 'actions', difficulty: 3, emoji: '🍽️' },
  { id: 'ac23', english: 'drink', chinese: '喝', category: 'actions', difficulty: 3, emoji: '🥤' },
  { id: 'ac24', english: 'sleep', chinese: '睡觉', category: 'actions', difficulty: 3, emoji: '😴' },
  { id: 'ac25', english: 'draw', chinese: '画画', category: 'actions', difficulty: 3, emoji: '' },
];

// ============ 自然 (上册/下册) ============
const natureWords: Word[] = [
  { id: 'na01', english: 'sun', chinese: '太阳', category: 'nature', difficulty: 3, emoji: '☀️' },
  { id: 'na02', english: 'rain', chinese: '雨', category: 'nature', difficulty: 3, emoji: '🌧️' },
  { id: 'na03', english: 'tree', chinese: '树', category: 'nature', difficulty: 2, emoji: '🌳' },
  { id: 'na04', english: 'flower', chinese: '花', category: 'nature', difficulty: 3, emoji: '🌸' },
  { id: 'na05', english: 'grass', chinese: '草', category: 'nature', difficulty: 3, emoji: '' },
  { id: 'na06', english: 'sky', chinese: '天空', category: 'nature', difficulty: 3, emoji: '🌌' },
  { id: 'na07', english: 'snow', chinese: '雪', category: 'nature', difficulty: 3, emoji: '❄️' },
  { id: 'na08', english: 'cloud', chinese: '云', category: 'nature', difficulty: 3, emoji: '☁️' },
];

// ============ 方位 (上册 M10, 下册 M2) ============
const positionWords: Word[] = [
  { id: 'p01', english: 'in', chinese: '在...里', category: 'positions', difficulty: 1, emoji: '' },
  { id: 'p02', english: 'on', chinese: '在...上', category: 'positions', difficulty: 1, emoji: '📌' },
  { id: 'p03', english: 'under', chinese: '在...下', category: 'positions', difficulty: 1, emoji: '⬇️' },
  { id: 'p04', english: 'here', chinese: '这里', category: 'positions', difficulty: 2, emoji: '📍' },
  { id: 'p05', english: 'over there', chinese: '在那边', category: 'positions', difficulty: 2, emoji: '👉' },
];

// ============ 职业 (下册 M1) ============
const occupationWords: Word[] = [
  { id: 'o01', english: 'doctor', chinese: '医生', category: 'occupations', difficulty: 2, emoji: '👨‍️' },
  { id: 'o02', english: 'nurse', chinese: '护士', category: 'occupations', difficulty: 2, emoji: '👩‍️' },
  { id: 'o03', english: 'driver', chinese: '司机', category: 'occupations', difficulty: 2, emoji: '🚗' },
  { id: 'o04', english: 'policeman', chinese: '警察', category: 'occupations', difficulty: 2, emoji: '' },
  { id: 'o05', english: 'Ms', chinese: '女士', category: 'occupations', difficulty: 1, emoji: '👩' },
];

// ============ 运动 (下册 M8/M9) ============
const sportWords: Word[] = [
  { id: 'sp01', english: 'football', chinese: '足球', category: 'sports', difficulty: 2, emoji: '⚽' },
  { id: 'sp02', english: 'ping-pong', chinese: '乒乓球', category: 'sports', difficulty: 2, emoji: '🏓' },
  { id: 'sp03', english: 'basketball', chinese: '篮球', category: 'sports', difficulty: 1, emoji: '🏀' },
  { id: 'sp04', english: 'swimming', chinese: '游泳', category: 'sports', difficulty: 2, emoji: '🏊' },
  { id: 'sp05', english: 'sport', chinese: '运动', category: 'sports', difficulty: 2, emoji: '🏅' },
];

// ============ 衣服 (下册 M8) ============
const clothesWords: Word[] = [
  { id: 'cl01', english: 'shoe', chinese: '鞋子', category: 'clothes', difficulty: 2, emoji: '' },
  { id: 'cl02', english: 'sock', chinese: '袜子', category: 'clothes', difficulty: 2, emoji: '🧦' },
  { id: 'cl03', english: 'shirt', chinese: '衬衫', category: 'clothes', difficulty: 2, emoji: '👔' },
  { id: 'cl04', english: 'shorts', chinese: '短裤', category: 'clothes', difficulty: 2, emoji: '🩳' },
  { id: 'cl05', english: 'clothes', chinese: '衣服', category: 'clothes', difficulty: 2, emoji: '👕' },
  { id: 'cl06', english: 'dress', chinese: '连衣裙', category: 'clothes', difficulty: 3, emoji: '👗' },
];

// ============ 形容词 (下册 M5/M6) ============
const adjectiveWords: Word[] = [
  { id: 'ad01', english: 'big', chinese: '大的', category: 'adjectives', difficulty: 2, emoji: '📏' },
  { id: 'ad02', english: 'small', chinese: '小的', category: 'adjectives', difficulty: 2, emoji: '🔍' },
  { id: 'ad03', english: 'fat', chinese: '胖的', category: 'adjectives', difficulty: 2, emoji: '' },
  { id: 'ad04', english: 'thin', chinese: '瘦的', category: 'adjectives', difficulty: 2, emoji: '📏' },
  { id: 'ad05', english: 'tall', chinese: '高的', category: 'adjectives', difficulty: 2, emoji: '' },
  { id: 'ad06', english: 'short', chinese: '矮的/短的', category: 'adjectives', difficulty: 2, emoji: '📏' },
  { id: 'ad07', english: 'long', chinese: '长的', category: 'adjectives', difficulty: 2, emoji: '📏' },
  { id: 'ad08', english: 'cute', chinese: '可爱的', category: 'adjectives', difficulty: 2, emoji: '' },
  { id: 'ad09', english: 'strong', chinese: '强壮的', category: 'adjectives', difficulty: 2, emoji: '💪' },
  { id: 'ad10', english: 'hot', chinese: '热的', category: 'adjectives', difficulty: 2, emoji: '🔥' },
  { id: 'ad11', english: 'good', chinese: '好的', category: 'adjectives', difficulty: 1, emoji: '👍' },
  { id: 'ad12', english: 'old', chinese: '年老的', category: 'adjectives', difficulty: 3, emoji: '👴' },
];

// ============ 代词 (上册/下册) ============
const pronounWords: Word[] = [
  { id: 'pr01', english: 'I', chinese: '我', category: 'pronouns', difficulty: 1, emoji: '🧑' },
  { id: 'pr02', english: 'you', chinese: '你', category: 'pronouns', difficulty: 1, emoji: '🧑' },
  { id: 'pr03', english: 'he', chinese: '他', category: 'pronouns', difficulty: 2, emoji: '👨' },
  { id: 'pr04', english: 'she', chinese: '她', category: 'pronouns', difficulty: 2, emoji: '👩' },
  { id: 'pr05', english: 'it', chinese: '它', category: 'pronouns', difficulty: 1, emoji: '🧑' },
  { id: 'pr06', english: 'we', chinese: '我们', category: 'pronouns', difficulty: 2, emoji: '👥' },
  { id: 'pr07', english: 'they', chinese: '他(她/它)们', category: 'pronouns', difficulty: 2, emoji: '👥' },
  { id: 'pr08', english: 'me', chinese: '我(宾格)', category: 'pronouns', difficulty: 2, emoji: '🧑' },
  { id: 'pr09', english: 'them', chinese: '他(她/它)们(宾格)', category: 'pronouns', difficulty: 2, emoji: '👥' },
  { id: 'pr10', english: 'this', chinese: '这个', category: 'pronouns', difficulty: 1, emoji: '👆' },
  { id: 'pr11', english: 'that', chinese: '那个', category: 'pronouns', difficulty: 1, emoji: '👉' },
  { id: 'pr12', english: 'our', chinese: '我们的', category: 'pronouns', difficulty: 1, emoji: '🤝' },
  { id: 'pr13', english: 'my', chinese: '我的', category: 'pronouns', difficulty: 1, emoji: '' },
  { id: 'pr14', english: 'these', chinese: '这些', category: 'pronouns', difficulty: 2, emoji: '👆' },
];

export const words: Word[] = [
  ...greetingWords,
  ...numberWords,
  ...colorWords,
  ...animalWords,
  ...bodyWords,
  ...familyWords,
  ...schoolWords,
  ...foodWords,
  ...dailyWords,
  ...actionWords,
  ...natureWords,
  ...positionWords,
  ...occupationWords,
  ...sportWords,
  ...clothesWords,
  ...adjectiveWords,
  ...pronounWords,
];
