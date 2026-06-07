export interface Word {
  id: string;
  english: string;
  chinese: string;
  category: 'animals' | 'colors' | 'numbers' | 'fruits' | 'daily' | 'family' | 'food' | 'body' | 'school' | 'actions' | 'nature';
  difficulty: number;
  emoji: string;
}

export const categoryNames: Record<string, string> = {
  all: '全部',
  animals: '动物',
  colors: '颜色',
  numbers: '数字',
  fruits: '水果',
  daily: '日常用品',
  family: '家庭',
  food: '食物',
  body: '身体',
  school: '学校',
  actions: '动作',
  nature: '自然',
};

export const categoryEmojis: Record<string, string> = {
  animals: '🐾',
  colors: '🎨',
  numbers: '🔢',
  fruits: '🍎',
  daily: '🏠',
  family: '👨‍👩‍👧‍👦',
  food: '🍽️',
  body: '🫀',
  school: '🏫',
  actions: '🏃',
  nature: '🌿',
};

const animalWords: Word[] = [
  { id: 'a01', english: 'cat', chinese: '猫', category: 'animals', difficulty: 1, emoji: '🐱' },
  { id: 'a02', english: 'dog', chinese: '狗', category: 'animals', difficulty: 1, emoji: '🐶' },
  { id: 'a03', english: 'bird', chinese: '鸟', category: 'animals', difficulty: 1, emoji: '🐦' },
  { id: 'a04', english: 'rabbit', chinese: '兔子', category: 'animals', difficulty: 1, emoji: '🐰' },
  { id: 'a05', english: 'monkey', chinese: '猴子', category: 'animals', difficulty: 1, emoji: '🐵' },
  { id: 'a06', english: 'lion', chinese: '狮子', category: 'animals', difficulty: 1, emoji: '🦁' },
  { id: 'a07', english: 'tiger', chinese: '老虎', category: 'animals', difficulty: 1, emoji: '🐯' },
  { id: 'a08', english: 'elephant', chinese: '大象', category: 'animals', difficulty: 1, emoji: '🐘' },
  { id: 'a09', english: 'bear', chinese: '熊', category: 'animals', difficulty: 1, emoji: '🐻' },
  { id: 'a10', english: 'fish', chinese: '鱼', category: 'animals', difficulty: 1, emoji: '🐟' },
  { id: 'a11', english: 'duck', chinese: '鸭子', category: 'animals', difficulty: 1, emoji: '🦆' },
  { id: 'a12', english: 'pig', chinese: '猪', category: 'animals', difficulty: 1, emoji: '🐷' },
  { id: 'a13', english: 'horse', chinese: '马', category: 'animals', difficulty: 1, emoji: '🐴' },
  { id: 'a14', english: 'cow', chinese: '奶牛', category: 'animals', difficulty: 1, emoji: '🐮' },
  { id: 'a15', english: 'sheep', chinese: '羊', category: 'animals', difficulty: 1, emoji: '🐑' },
  { id: 'a16', english: 'frog', chinese: '青蛙', category: 'animals', difficulty: 1, emoji: '🐸' },
  { id: 'a17', english: 'mouse', chinese: '老鼠', category: 'animals', difficulty: 1, emoji: '🐭' },
  { id: 'a18', english: 'panda', chinese: '熊猫', category: 'animals', difficulty: 1, emoji: '🐼' },
  { id: 'a19', english: 'fox', chinese: '狐狸', category: 'animals', difficulty: 1, emoji: '🦊' },
  { id: 'a20', english: 'bee', chinese: '蜜蜂', category: 'animals', difficulty: 1, emoji: '🐝' },
];

const colorWords: Word[] = [
  { id: 'c01', english: 'red', chinese: '红色', category: 'colors', difficulty: 1, emoji: '🔴' },
  { id: 'c02', english: 'blue', chinese: '蓝色', category: 'colors', difficulty: 1, emoji: '🔵' },
  { id: 'c03', english: 'yellow', chinese: '黄色', category: 'colors', difficulty: 1, emoji: '🟡' },
  { id: 'c04', english: 'green', chinese: '绿色', category: 'colors', difficulty: 1, emoji: '🟢' },
  { id: 'c05', english: 'orange', chinese: '橙色', category: 'colors', difficulty: 1, emoji: '🟠' },
  { id: 'c06', english: 'purple', chinese: '紫色', category: 'colors', difficulty: 1, emoji: '🟣' },
  { id: 'c07', english: 'pink', chinese: '粉色', category: 'colors', difficulty: 1, emoji: '💗' },
  { id: 'c08', english: 'black', chinese: '黑色', category: 'colors', difficulty: 1, emoji: '⚫' },
  { id: 'c09', english: 'white', chinese: '白色', category: 'colors', difficulty: 1, emoji: '⚪' },
  { id: 'c10', english: 'brown', chinese: '棕色', category: 'colors', difficulty: 1, emoji: '🟤' },
  { id: 'c11', english: 'gray', chinese: '灰色', category: 'colors', difficulty: 1, emoji: '🩶' },
];

const numberWords: Word[] = [
  { id: 'n01', english: 'one', chinese: '一', category: 'numbers', difficulty: 1, emoji: '1️⃣' },
  { id: 'n02', english: 'two', chinese: '二', category: 'numbers', difficulty: 1, emoji: '2️⃣' },
  { id: 'n03', english: 'three', chinese: '三', category: 'numbers', difficulty: 1, emoji: '3️⃣' },
  { id: 'n04', english: 'four', chinese: '四', category: 'numbers', difficulty: 1, emoji: '4️⃣' },
  { id: 'n05', english: 'five', chinese: '五', category: 'numbers', difficulty: 1, emoji: '5️⃣' },
  { id: 'n06', english: 'six', chinese: '六', category: 'numbers', difficulty: 1, emoji: '6️⃣' },
  { id: 'n07', english: 'seven', chinese: '七', category: 'numbers', difficulty: 1, emoji: '7️⃣' },
  { id: 'n08', english: 'eight', chinese: '八', category: 'numbers', difficulty: 1, emoji: '8️⃣' },
  { id: 'n09', english: 'nine', chinese: '九', category: 'numbers', difficulty: 1, emoji: '9️⃣' },
  { id: 'n10', english: 'ten', chinese: '十', category: 'numbers', difficulty: 1, emoji: '🔟' },
];

const fruitWords: Word[] = [
  { id: 'f01', english: 'apple', chinese: '苹果', category: 'fruits', difficulty: 1, emoji: '🍎' },
  { id: 'f02', english: 'banana', chinese: '香蕉', category: 'fruits', difficulty: 1, emoji: '🍌' },
  { id: 'f03', english: 'orange', chinese: '橙子', category: 'fruits', difficulty: 1, emoji: '🍊' },
  { id: 'f04', english: 'grape', chinese: '葡萄', category: 'fruits', difficulty: 1, emoji: '🍇' },
  { id: 'f05', english: 'strawberry', chinese: '草莓', category: 'fruits', difficulty: 1, emoji: '🍓' },
  { id: 'f06', english: 'watermelon', chinese: '西瓜', category: 'fruits', difficulty: 1, emoji: '🍉' },
  { id: 'f07', english: 'peach', chinese: '桃子', category: 'fruits', difficulty: 1, emoji: '🍑' },
  { id: 'f08', english: 'pear', chinese: '梨', category: 'fruits', difficulty: 1, emoji: '🍐' },
  { id: 'f09', english: 'cherry', chinese: '樱桃', category: 'fruits', difficulty: 1, emoji: '🍒' },
  { id: 'f10', english: 'mango', chinese: '芒果', category: 'fruits', difficulty: 1, emoji: '🥭' },
];

const dailyWords: Word[] = [
  { id: 'd01', english: 'book', chinese: '书', category: 'daily', difficulty: 1, emoji: '📖' },
  { id: 'd02', english: 'pen', chinese: '钢笔', category: 'daily', difficulty: 1, emoji: '🖊️' },
  { id: 'd03', english: 'pencil', chinese: '铅笔', category: 'daily', difficulty: 1, emoji: '✏️' },
  { id: 'd04', english: 'bag', chinese: '书包', category: 'daily', difficulty: 1, emoji: '🎒' },
  { id: 'd05', english: 'cup', chinese: '杯子', category: 'daily', difficulty: 1, emoji: '☕' },
  { id: 'd06', english: 'bed', chinese: '床', category: 'daily', difficulty: 1, emoji: '🛏️' },
  { id: 'd07', english: 'chair', chinese: '椅子', category: 'daily', difficulty: 1, emoji: '🪑' },
  { id: 'd08', english: 'table', chinese: '桌子', category: 'daily', difficulty: 1, emoji: '🪵' },
  { id: 'd09', english: 'door', chinese: '门', category: 'daily', difficulty: 1, emoji: '🚪' },
  { id: 'd10', english: 'window', chinese: '窗户', category: 'daily', difficulty: 1, emoji: '🪟' },
  { id: 'd11', english: 'clock', chinese: '时钟', category: 'daily', difficulty: 1, emoji: '🕐' },
  { id: 'd12', english: 'phone', chinese: '电话', category: 'daily', difficulty: 1, emoji: '📱' },
  { id: 'd13', english: 'key', chinese: '钥匙', category: 'daily', difficulty: 1, emoji: '🔑' },
  { id: 'd14', english: 'hat', chinese: '帽子', category: 'daily', difficulty: 1, emoji: '🧢' },
  { id: 'd15', english: 'shoe', chinese: '鞋子', category: 'daily', difficulty: 1, emoji: '👟' },
];

const familyWords: Word[] = [
  { id: 'fa01', english: 'father', chinese: '爸爸', category: 'family', difficulty: 1, emoji: '👨' },
  { id: 'fa02', english: 'mother', chinese: '妈妈', category: 'family', difficulty: 1, emoji: '👩' },
  { id: 'fa03', english: 'brother', chinese: '兄弟', category: 'family', difficulty: 1, emoji: '👦' },
  { id: 'fa04', english: 'sister', chinese: '姐妹', category: 'family', difficulty: 1, emoji: '👧' },
  { id: 'fa05', english: 'grandpa', chinese: '爷爷', category: 'family', difficulty: 1, emoji: '👴' },
  { id: 'fa06', english: 'grandma', chinese: '奶奶', category: 'family', difficulty: 1, emoji: '👵' },
  { id: 'fa07', english: 'baby', chinese: '宝宝', category: 'family', difficulty: 1, emoji: '👶' },
  { id: 'fa08', english: 'family', chinese: '家庭', category: 'family', difficulty: 1, emoji: '👨‍👩‍👧‍👦' },
  { id: 'fa09', english: 'son', chinese: '儿子', category: 'family', difficulty: 1, emoji: '👦' },
  { id: 'fa10', english: 'daughter', chinese: '女儿', category: 'family', difficulty: 1, emoji: '👧' },
];

const foodWords: Word[] = [
  { id: 'fo01', english: 'rice', chinese: '米饭', category: 'food', difficulty: 1, emoji: '🍚' },
  { id: 'fo02', english: 'noodle', chinese: '面条', category: 'food', difficulty: 1, emoji: '🍜' },
  { id: 'fo03', english: 'egg', chinese: '鸡蛋', category: 'food', difficulty: 1, emoji: '🥚' },
  { id: 'fo04', english: 'milk', chinese: '牛奶', category: 'food', difficulty: 1, emoji: '🥛' },
  { id: 'fo05', english: 'bread', chinese: '面包', category: 'food', difficulty: 1, emoji: '🍞' },
  { id: 'fo06', english: 'cake', chinese: '蛋糕', category: 'food', difficulty: 1, emoji: '🎂' },
  { id: 'fo07', english: 'cookie', chinese: '饼干', category: 'food', difficulty: 1, emoji: '🍪' },
  { id: 'fo08', english: 'candy', chinese: '糖果', category: 'food', difficulty: 1, emoji: '🍬' },
  { id: 'fo09', english: 'chicken', chinese: '鸡肉', category: 'food', difficulty: 1, emoji: '🍗' },
  { id: 'fo10', english: 'soup', chinese: '汤', category: 'food', difficulty: 1, emoji: '🥣' },
  { id: 'fo11', english: 'cheese', chinese: '奶酪', category: 'food', difficulty: 1, emoji: '🧀' },
  { id: 'fo12', english: 'pizza', chinese: '披萨', category: 'food', difficulty: 1, emoji: '🍕' },
  { id: 'fo13', english: 'sandwich', chinese: '三明治', category: 'food', difficulty: 1, emoji: '🥪' },
  { id: 'fo14', english: 'hamburger', chinese: '汉堡', category: 'food', difficulty: 1, emoji: '🍔' },
  { id: 'fo15', english: 'ice cream', chinese: '冰淇淋', category: 'food', difficulty: 1, emoji: '🍦' },
];

const bodyWords: Word[] = [
  { id: 'b01', english: 'face', chinese: '脸', category: 'body', difficulty: 1, emoji: '😊' },
  { id: 'b02', english: 'nose', chinese: '鼻子', category: 'body', difficulty: 1, emoji: '👃' },
  { id: 'b03', english: 'mouth', chinese: '嘴巴', category: 'body', difficulty: 1, emoji: '👄' },
  { id: 'b04', english: 'eye', chinese: '眼睛', category: 'body', difficulty: 1, emoji: '👁️' },
  { id: 'b05', english: 'ear', chinese: '耳朵', category: 'body', difficulty: 1, emoji: '👂' },
  { id: 'b06', english: 'hand', chinese: '手', category: 'body', difficulty: 1, emoji: '✋' },
  { id: 'b07', english: 'foot', chinese: '脚', category: 'body', difficulty: 1, emoji: '🦶' },
  { id: 'b08', english: 'head', chinese: '头', category: 'body', difficulty: 1, emoji: '💆' },
  { id: 'b09', english: 'arm', chinese: '手臂', category: 'body', difficulty: 1, emoji: '💪' },
  { id: 'b10', english: 'leg', chinese: '腿', category: 'body', difficulty: 1, emoji: '🦵' },
  { id: 'b11', english: 'hair', chinese: '头发', category: 'body', difficulty: 1, emoji: '💇' },
  { id: 'b12', english: 'heart', chinese: '心脏', category: 'body', difficulty: 1, emoji: '❤️' },
];

const schoolWords: Word[] = [
  { id: 's01', english: 'school', chinese: '学校', category: 'school', difficulty: 1, emoji: '🏫' },
  { id: 's02', english: 'teacher', chinese: '老师', category: 'school', difficulty: 1, emoji: '👨‍🏫' },
  { id: 's03', english: 'classroom', chinese: '教室', category: 'school', difficulty: 1, emoji: '🏛️' },
  { id: 's04', english: 'ruler', chinese: '尺子', category: 'school', difficulty: 1, emoji: '📏' },
  { id: 's05', english: 'eraser', chinese: '橡皮', category: 'school', difficulty: 1, emoji: '🧹' },
  { id: 's06', english: 'desk', chinese: '课桌', category: 'school', difficulty: 1, emoji: '🪑' },
  { id: 's07', english: 'homework', chinese: '作业', category: 'school', difficulty: 1, emoji: '📝' },
  { id: 's08', english: 'student', chinese: '学生', category: 'school', difficulty: 1, emoji: '🧑‍🎓' },
  { id: 's09', english: 'library', chinese: '图书馆', category: 'school', difficulty: 1, emoji: '📚' },
  { id: 's10', english: 'blackboard', chinese: '黑板', category: 'school', difficulty: 1, emoji: '📋' },
];

const actionWords: Word[] = [
  { id: 'ac01', english: 'run', chinese: '跑', category: 'actions', difficulty: 1, emoji: '🏃' },
  { id: 'ac02', english: 'jump', chinese: '跳', category: 'actions', difficulty: 1, emoji: '🤸' },
  { id: 'ac03', english: 'walk', chinese: '走', category: 'actions', difficulty: 1, emoji: '🚶' },
  { id: 'ac04', english: 'swim', chinese: '游泳', category: 'actions', difficulty: 1, emoji: '🏊' },
  { id: 'ac05', english: 'fly', chinese: '飞', category: 'actions', difficulty: 1, emoji: '🕊️' },
  { id: 'ac06', english: 'read', chinese: '读', category: 'actions', difficulty: 1, emoji: '📖' },
  { id: 'ac07', english: 'write', chinese: '写', category: 'actions', difficulty: 1, emoji: '✍️' },
  { id: 'ac08', english: 'sing', chinese: '唱', category: 'actions', difficulty: 1, emoji: '🎤' },
  { id: 'ac09', english: 'dance', chinese: '跳舞', category: 'actions', difficulty: 1, emoji: '💃' },
  { id: 'ac10', english: 'eat', chinese: '吃', category: 'actions', difficulty: 1, emoji: '🍽️' },
  { id: 'ac11', english: 'drink', chinese: '喝', category: 'actions', difficulty: 1, emoji: '🥤' },
  { id: 'ac12', english: 'sleep', chinese: '睡觉', category: 'actions', difficulty: 1, emoji: '😴' },
  { id: 'ac13', english: 'play', chinese: '玩', category: 'actions', difficulty: 1, emoji: '🎮' },
  { id: 'ac14', english: 'draw', chinese: '画画', category: 'actions', difficulty: 1, emoji: '🎨' },
  { id: 'ac15', english: 'listen', chinese: '听', category: 'actions', difficulty: 1, emoji: '👂' },
];

const natureWords: Word[] = [
  { id: 'na01', english: 'sun', chinese: '太阳', category: 'nature', difficulty: 1, emoji: '☀️' },
  { id: 'na02', english: 'moon', chinese: '月亮', category: 'nature', difficulty: 1, emoji: '🌙' },
  { id: 'na03', english: 'star', chinese: '星星', category: 'nature', difficulty: 1, emoji: '⭐' },
  { id: 'na04', english: 'tree', chinese: '树', category: 'nature', difficulty: 1, emoji: '🌳' },
  { id: 'na05', english: 'flower', chinese: '花', category: 'nature', difficulty: 1, emoji: '🌸' },
  { id: 'na06', english: 'rain', chinese: '雨', category: 'nature', difficulty: 1, emoji: '🌧️' },
  { id: 'na07', english: 'cloud', chinese: '云', category: 'nature', difficulty: 1, emoji: '☁️' },
  { id: 'na08', english: 'snow', chinese: '雪', category: 'nature', difficulty: 1, emoji: '❄️' },
  { id: 'na09', english: 'wind', chinese: '风', category: 'nature', difficulty: 1, emoji: '💨' },
  { id: 'na10', english: 'river', chinese: '河', category: 'nature', difficulty: 1, emoji: '🏞️' },
  { id: 'na11', english: 'mountain', chinese: '山', category: 'nature', difficulty: 1, emoji: '⛰️' },
  { id: 'na12', english: 'sky', chinese: '天空', category: 'nature', difficulty: 1, emoji: '🌌' },
  { id: 'na13', english: 'sea', chinese: '海', category: 'nature', difficulty: 1, emoji: '🌊' },
  { id: 'na14', english: 'rainbow', chinese: '彩虹', category: 'nature', difficulty: 1, emoji: '🌈' },
  { id: 'na15', english: 'grass', chinese: '草', category: 'nature', difficulty: 1, emoji: '🌿' },
];

export const words: Word[] = [
  ...animalWords,
  ...colorWords,
  ...numberWords,
  ...fruitWords,
  ...dailyWords,
  ...familyWords,
  ...foodWords,
  ...bodyWords,
  ...schoolWords,
  ...actionWords,
  ...natureWords,
];
