// 句子数据 - 基于外研社一年级起点教材句型
// 难度等级：1=上册, 2=下册, 3=补充

// ============ 句子填空 ============
export interface SentenceItem {
  id: string;
  sentence: string;
  chinese: string;
  emoji: string;
  category: string;
  blankIndex: number;
  blankWord: string;
  blankWordChinese: string;
  difficulty: number; // 1=上册, 2=下册, 3=补充
}

export const sentenceFillItems: SentenceItem[] = [
  // 上册句型
  { id: 'sf01', sentence: "I'm Sam.", chinese: '我是萨姆。', emoji: '👋', category: 'greetings', blankIndex: 0, blankWord: "I'm", blankWordChinese: '我是', difficulty: 1 },
  { id: 'sf02', sentence: 'Good morning!', chinese: '早上好！', emoji: '🌅', category: 'greetings', blankIndex: 1, blankWord: 'morning', blankWordChinese: '早上好', difficulty: 1 },
  { id: 'sf03', sentence: 'What ___ your name?', chinese: '你叫什么名字？', emoji: '', category: 'greetings', blankIndex: 1, blankWord: "is", blankWordChinese: '是', difficulty: 1 },
  { id: 'sf04', sentence: 'My ___ is Lingling.', chinese: '我的名字是玲玲。', emoji: '', category: 'greetings', blankIndex: 1, blankWord: 'name', blankWordChinese: '名字', difficulty: 1 },
  { id: 'sf05', sentence: 'How ___ you?', chinese: '你好吗？', emoji: '😊', category: 'greetings', blankIndex: 1, blankWord: 'are', blankWordChinese: '是', difficulty: 1 },
  { id: 'sf06', sentence: "I'm ___, thank you.", chinese: '我很好，谢谢。', emoji: '', category: 'greetings', blankIndex: 1, blankWord: 'fine', blankWordChinese: '好的', difficulty: 1 },
  { id: 'sf07', sentence: 'This ___ a cat.', chinese: '这是一只猫。', emoji: '🐱', category: 'animals', blankIndex: 1, blankWord: 'is', blankWordChinese: '是', difficulty: 1 },
  { id: 'sf08', sentence: 'That ___ a dog.', chinese: '那是一只狗。', emoji: '🐶', category: 'animals', blankIndex: 1, blankWord: 'is', blankWordChinese: '是', difficulty: 1 },
  { id: 'sf09', sentence: 'I ___ a panda.', chinese: '我有一只熊猫。', emoji: '🐼', category: 'animals', blankIndex: 1, blankWord: 'have', blankWordChinese: '有', difficulty: 1 },
  { id: 'sf10', sentence: 'Point ___ the door.', chinese: '指向门。', emoji: '🚪', category: 'actions', blankIndex: 1, blankWord: 'to', blankWordChinese: '向', difficulty: 1 },
  { id: 'sf11', sentence: 'Open the ___.', chinese: '打开窗户。', emoji: '🪟', category: 'daily', blankIndex: 2, blankWord: 'window', blankWordChinese: '窗户', difficulty: 1 },
  { id: 'sf12', sentence: 'Sit ___.', chinese: '坐下。', emoji: '🪑', category: 'actions', blankIndex: 1, blankWord: 'down', blankWordChinese: '下', difficulty: 1 },
  { id: 'sf13', sentence: 'Stand ___.', chinese: '起立。', emoji: '🧍', category: 'actions', blankIndex: 1, blankWord: 'up', blankWordChinese: '起', difficulty: 1 },
  { id: 'sf14', sentence: 'It ___ a red apple.', chinese: '它是一个红苹果。', emoji: '', category: 'food', blankIndex: 1, blankWord: "is", blankWordChinese: '是', difficulty: 1 },
  { id: 'sf15', sentence: 'This ___ our classroom.', chinese: '这是我们的教室。', emoji: '🏫', category: 'school', blankIndex: 1, blankWord: 'is', blankWordChinese: '是', difficulty: 1 },
  { id: 'sf16', sentence: 'I have a ___.', chinese: '我有一本书。', emoji: '', category: 'school', blankIndex: 2, blankWord: 'book', blankWordChinese: '书', difficulty: 1 },
  { id: 'sf17', sentence: "What's ___?", chinese: '那是什么？', emoji: '❓', category: 'daily', blankIndex: 2, blankWord: 'that', blankWordChinese: '那个', difficulty: 1 },
  { id: 'sf18', sentence: 'Happy ___ to you!', chinese: '祝你生日快乐！', emoji: '🎂', category: 'greetings', blankIndex: 1, blankWord: 'birthday', blankWordChinese: '生日', difficulty: 1 },
  { id: 'sf19', sentence: 'Where ___ my hat?', chinese: '我的帽子在哪里？', emoji: '🧢', category: 'daily', blankIndex: 1, blankWord: 'is', blankWordChinese: '是', difficulty: 1 },
  { id: 'sf20', sentence: 'It ___ under the bed.', chinese: '它在床下面。', emoji: '🛏️', category: 'positions', blankIndex: 1, blankWord: 'is', blankWordChinese: '是', difficulty: 1 },
  // 下册句型
  { id: 'sf21', sentence: "He's a ___.", chinese: '他是一名医生。', emoji: '👨‍️', category: 'occupations', blankIndex: 2, blankWord: 'doctor', blankWordChinese: '医生', difficulty: 2 },
  { id: 'sf22', sentence: "She's a ___.", chinese: '她是一名护士。', emoji: '👩⚕️', category: 'occupations', blankIndex: 2, blankWord: 'nurse', blankWordChinese: '护士', difficulty: 2 },
  { id: 'sf23', sentence: '___ your nose.', chinese: '摸你的鼻子。', emoji: '👃', category: 'body', blankIndex: 0, blankWord: 'Touch', blankWordChinese: '摸', difficulty: 2 },
  { id: 'sf24', sentence: 'These ___ my eyes.', chinese: '这些是我的眼睛。', emoji: '👀', category: 'body', blankIndex: 1, blankWord: 'are', blankWordChinese: '是', difficulty: 2 },
  { id: 'sf25', sentence: 'I ___ swim.', chinese: '我会游泳。', emoji: '🏊', category: 'actions', blankIndex: 1, blankWord: 'can', blankWordChinese: '会', difficulty: 2 },
  { id: 'sf26', sentence: 'It ___ a big elephant.', chinese: '它是一头大象。', emoji: '🐘', category: 'animals', blankIndex: 1, blankWord: 'is', blankWordChinese: '是', difficulty: 2 },
  { id: 'sf27', sentence: 'The giraffe is ___.', chinese: '长颈鹿很高。', emoji: '🦒', category: 'animals', blankIndex: 3, blankWord: 'tall', blankWordChinese: '高的', difficulty: 2 },
  { id: 'sf28', sentence: 'I ___ football.', chinese: '我喜欢足球。', emoji: '', category: 'sports', blankIndex: 1, blankWord: 'like', blankWordChinese: '喜欢', difficulty: 2 },
  { id: 'sf29', sentence: 'It ___ hot today.', chinese: '今天很热。', emoji: '🔥', category: 'nature', blankIndex: 1, blankWord: 'is', blankWordChinese: '是', difficulty: 2 },
  { id: 'sf30', sentence: "What's ___ favorite sport?", chinese: '你最喜欢什么运动？', emoji: '', category: 'sports', blankIndex: 2, blankWord: 'your', blankWordChinese: '你的', difficulty: 2 },
];

// ============ 对话补全 ============
export interface DialogueItem {
  id: string;
  speakerA: string;
  speakerAChinese: string;
  speakerB: string;
  speakerBChinese: string;
  emoji: string;
  category: string;
  blankForSpeakerB: boolean;
  difficulty: number;
}

export const dialogueItems: DialogueItem[] = [
  // 上册对话
  { id: 'd01', speakerA: 'Hello!', speakerAChinese: '你好！', speakerB: 'Hi!', speakerBChinese: '你好！', emoji: '👋', category: 'greetings', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd02', speakerA: 'Good morning!', speakerAChinese: '早上好！', speakerB: 'Good morning!', speakerBChinese: '早上好！', emoji: '🌅', category: 'greetings', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd03', speakerA: "What's your name?", speakerAChinese: '你叫什么名字？', speakerB: "I'm Sam.", speakerBChinese: '我是萨姆。', emoji: '🙋', category: 'greetings', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd04', speakerA: 'How are you?', speakerAChinese: '你好吗？', speakerB: "I'm fine, thank you!", speakerBChinese: '我很好，谢谢！', emoji: '😊', category: 'greetings', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd05', speakerA: 'Goodbye!', speakerAChinese: '再见！', speakerB: 'Bye!', speakerBChinese: '再见！', emoji: '', category: 'greetings', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd06', speakerA: 'What colour is it?', speakerAChinese: '它是什么颜色？', speakerB: "It's red.", speakerBChinese: '它是红色的。', emoji: '🎨', category: 'colors', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd07', speakerA: 'How old are you?', speakerAChinese: '你几岁了？', speakerB: "I'm six.", speakerBChinese: '我六岁了。', emoji: '🎂', category: 'greetings', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd08', speakerA: 'What is this?', speakerAChinese: '这是什么？', speakerB: "It's a cat.", speakerBChinese: '它是一只猫。', emoji: '🐱', category: 'animals', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd09', speakerA: 'Thank you!', speakerAChinese: '谢谢你！', speakerB: "You're welcome!", speakerBChinese: '不客气！', emoji: '🙏', category: 'greetings', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd10', speakerA: 'Where is my hat?', speakerAChinese: '我的帽子在哪里？', speakerB: "It's on the bed.", speakerBChinese: '它在床上。', emoji: '🧢', category: 'daily', blankForSpeakerB: true, difficulty: 1 },
  { id: 'd11', speakerA: 'Happy birthday!', speakerAChinese: '生日快乐！', speakerB: 'Thank you!', speakerBChinese: '谢谢你！', emoji: '🎂', category: 'greetings', blankForSpeakerB: true, difficulty: 1 },
  // 下册对话
  { id: 'd12', speakerA: "Who's he?", speakerAChinese: '他是谁？', speakerB: "He's a doctor.", speakerBChinese: '他是一名医生。', emoji: '👨‍⚕️', category: 'occupations', blankForSpeakerB: true, difficulty: 2 },
  { id: 'd13', speakerA: "Who's she?", speakerAChinese: '她是谁？', speakerB: "She's my mother.", speakerBChinese: '她是我妈妈。', emoji: '', category: 'family', blankForSpeakerB: true, difficulty: 2 },
  { id: 'd14', speakerA: 'What is that?', speakerAChinese: '那是什么？', speakerB: "It's a panda.", speakerBChinese: '它是一只熊猫。', emoji: '🐼', category: 'animals', blankForSpeakerB: true, difficulty: 2 },
  { id: 'd15', speakerA: 'Can you swim?', speakerAChinese: '你会游泳吗？', speakerB: 'Yes, I can!', speakerBChinese: '是的，我会！', emoji: '🏊', category: 'actions', blankForSpeakerB: true, difficulty: 2 },
  { id: 'd16', speakerA: 'What do you like?', speakerAChinese: '你喜欢什么？', speakerB: 'I like football.', speakerBChinese: '我喜欢足球。', emoji: '⚽', category: 'sports', blankForSpeakerB: true, difficulty: 2 },
  { id: 'd17', speakerA: "What's your favourite sport?", speakerAChinese: '你最喜欢什么运动？', speakerB: 'I like swimming.', speakerBChinese: '我喜欢游泳。', emoji: '🏊', category: 'sports', blankForSpeakerB: true, difficulty: 2 },
  { id: 'd18', speakerA: 'Touch your nose!', speakerAChinese: '摸你的鼻子！', speakerB: 'OK!', speakerBChinese: '好的！', emoji: '👃', category: 'body', blankForSpeakerB: true, difficulty: 2 },
  { id: 'd19', speakerA: 'Is it a big elephant?', speakerAChinese: '它是一头大象吗？', speakerB: 'Yes, it is!', speakerBChinese: '是的！', emoji: '🐘', category: 'animals', blankForSpeakerB: true, difficulty: 2 },
  { id: 'd20', speakerA: 'Let us sing!', speakerAChinese: '让我们一起唱歌吧！', speakerB: 'OK!', speakerBChinese: '好的！', emoji: '🎤', category: 'actions', blankForSpeakerB: true, difficulty: 2 },
];

// ============ 听句选句 ============
export interface ListenSentenceItem {
  id: string;
  sentence: string;
  chinese: string;
  emoji: string;
  category: string;
  difficulty: number;
}

export const listenSentenceItems: ListenSentenceItem[] = [
  // 上册
  { id: 'ls01', sentence: "I'm Sam.", chinese: '我是萨姆。', emoji: '👋', category: 'greetings', difficulty: 1 },
  { id: 'ls02', sentence: 'Good morning!', chinese: '早上好！', emoji: '🌅', category: 'greetings', difficulty: 1 },
  { id: 'ls03', sentence: 'My name is Lingling.', chinese: '我的名字是玲玲。', emoji: '', category: 'greetings', difficulty: 1 },
  { id: 'ls04', sentence: 'I am fine, thank you.', chinese: '我很好，谢谢。', emoji: '😊', category: 'greetings', difficulty: 1 },
  { id: 'ls05', sentence: 'This is a cat.', chinese: '这是一只猫。', emoji: '', category: 'animals', difficulty: 1 },
  { id: 'ls06', sentence: 'That is a dog.', chinese: '那是一只狗。', emoji: '🐶', category: 'animals', difficulty: 1 },
  { id: 'ls07', sentence: 'It is a red apple.', chinese: '它是一个红苹果。', emoji: '🍎', category: 'food', difficulty: 1 },
  { id: 'ls08', sentence: 'Open the door.', chinese: '打开门。', emoji: '', category: 'actions', difficulty: 1 },
  { id: 'ls09', sentence: 'Point to the window.', chinese: '指向窗户。', emoji: '🪟', category: 'actions', difficulty: 1 },
  { id: 'ls10', sentence: 'Sit down, please.', chinese: '请坐下。', emoji: '🪑', category: 'actions', difficulty: 1 },
  { id: 'ls11', sentence: 'Stand up!', chinese: '起立！', emoji: '', category: 'actions', difficulty: 1 },
  { id: 'ls12', sentence: 'This is our classroom.', chinese: '这是我们的教室。', emoji: '🏫', category: 'school', difficulty: 1 },
  { id: 'ls13', sentence: 'I have a pencil.', chinese: '我有一支铅笔。', emoji: '✏️', category: 'school', difficulty: 1 },
  { id: 'ls14', sentence: 'Happy birthday to you!', chinese: '祝你生日快乐！', emoji: '🎂', category: 'greetings', difficulty: 1 },
  { id: 'ls15', sentence: 'It is on the bed.', chinese: '它在床上。', emoji: '🛏️', category: 'positions', difficulty: 1 },
  { id: 'ls16', sentence: 'It is under the desk.', chinese: '它在课桌下面。', emoji: '🪑', category: 'positions', difficulty: 1 },
  // 下册
  { id: 'ls17', sentence: "He's a doctor.", chinese: '他是一名医生。', emoji: '👨‍⚕️', category: 'occupations', difficulty: 2 },
  { id: 'ls18', sentence: "She's a nurse.", chinese: '她是一名护士。', emoji: '‍⚕️', category: 'occupations', difficulty: 2 },
  { id: 'ls19', sentence: 'Touch your head.', chinese: '摸你的头。', emoji: '💆', category: 'body', difficulty: 2 },
  { id: 'ls20', sentence: 'Touch your nose.', chinese: '摸你的鼻子。', emoji: '', category: 'body', difficulty: 2 },
  { id: 'ls21', sentence: 'I can swim.', chinese: '我会游泳。', emoji: '🏊', category: 'actions', difficulty: 2 },
  { id: 'ls22', sentence: 'The elephant is big.', chinese: '大象很大。', emoji: '🐘', category: 'animals', difficulty: 2 },
  { id: 'ls23', sentence: 'The snake is long.', chinese: '蛇很长。', emoji: '', category: 'animals', difficulty: 2 },
  { id: 'ls24', sentence: 'I like football.', chinese: '我喜欢足球。', emoji: '⚽', category: 'sports', difficulty: 2 },
  { id: 'ls25', sentence: 'It is hot today.', chinese: '今天很热。', emoji: '🔥', category: 'nature', difficulty: 2 },
  { id: 'ls26', sentence: 'Put on your shoes.', chinese: '穿上你的鞋子。', emoji: '', category: 'clothes', difficulty: 2 },
  { id: 'ls27', sentence: 'Let us dance together.', chinese: '让我们一起跳舞吧。', emoji: '💃', category: 'actions', difficulty: 2 },
  { id: 'ls28', sentence: 'The giraffe is tall.', chinese: '长颈鹿很高。', emoji: '🦒', category: 'animals', difficulty: 2 },
  { id: 'ls29', sentence: 'My favourite sport is swimming.', chinese: '我最喜欢的运动是游泳。', emoji: '🏊', category: 'sports', difficulty: 2 },
  { id: 'ls30', sentence: 'We play together.', chinese: '我们一起玩。', emoji: '🤝', category: 'actions', difficulty: 2 },
];
