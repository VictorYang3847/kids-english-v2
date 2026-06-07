// Sentence Fill Items
export interface SentenceItem {
  id: string;
  sentence: string;
  chinese: string;
  emoji: string;
  category: string;
  blankIndex: number;
  blankWord: string;
  blankWordChinese: string;
}

export const sentenceFillItems: SentenceItem[] = [
  { id: 'sf01', sentence: 'I ___ a cat.', chinese: '我有一只猫。', emoji: '🐱', category: 'animals', blankIndex: 1, blankWord: 'have', blankWordChinese: '有' },
  { id: 'sf02', sentence: 'She ___ a teacher.', chinese: '她是一位老师。', emoji: '👩🏫', category: 'school', blankIndex: 1, blankWord: 'is', blankWordChinese: '是' },
  { id: 'sf03', sentence: 'I ___ to school every day.', chinese: '我每天去上学。', emoji: '🏫', category: 'school', blankIndex: 1, blankWord: 'go', blankWordChinese: '去' },
  { id: 'sf04', sentence: 'He ___ a big dog.', chinese: '他有一只大狗。', emoji: '🐶', category: 'animals', blankIndex: 1, blankWord: 'has', blankWordChinese: '有' },
  { id: 'sf05', sentence: 'We ___ happy.', chinese: '我们很开心。', emoji: '😊', category: 'greeting', blankIndex: 1, blankWord: 'are', blankWordChinese: '是' },
  { id: 'sf06', sentence: 'I ___ like apples.', chinese: '我喜欢苹果。', emoji: '🍎', category: 'fruits', blankIndex: 0, blankWord: '', blankWordChinese: '喜欢' },
  { id: 'sf07', sentence: 'She can ___.', chinese: '她会游泳。', emoji: '🏊', category: 'actions', blankIndex: 2, blankWord: 'swim', blankWordChinese: '游泳' },
  { id: 'sf08', sentence: 'This is ___ book.', chinese: '这是我的书。', emoji: '📖', category: 'daily', blankIndex: 2, blankWord: 'my', blankWordChinese: '我的' },
  { id: 'sf09', sentence: 'They ___ playing.', chinese: '他们在玩。', emoji: '🎮', category: 'actions', blankIndex: 1, blankWord: 'are', blankWordChinese: '正在' },
  { id: 'sf10', sentence: 'I ___ eat bread.', chinese: '我想吃面包。', emoji: '🍞', category: 'food', blankIndex: 1, blankWord: 'want', blankWordChinese: '想' },
  { id: 'sf11', sentence: 'The cat ___ small.', chinese: '这只猫很小。', emoji: '🐱', category: 'animals', blankIndex: 2, blankWord: 'is', blankWordChinese: '是' },
  { id: 'sf12', sentence: 'I ___ a student.', chinese: '我是一个学生。', emoji: '🧑🎓', category: 'school', blankIndex: 1, blankWord: 'am', blankWordChinese: '是' },
  { id: 'sf13', sentence: 'She ___ a red dress.', chinese: '她穿了一件红色连衣裙。', emoji: '👗', category: 'colors', blankIndex: 1, blankWord: 'wears', blankWordChinese: '穿' },
  { id: 'sf14', sentence: 'We ___ to music.', chinese: '我们听音乐。', emoji: '🎵', category: 'actions', blankIndex: 1, blankWord: 'listen', blankWordChinese: '听' },
  { id: 'sf15', sentence: 'The sun ___.', chinese: '太阳出来了。', emoji: '☀️', category: 'nature', blankIndex: 2, blankWord: 'shines', blankWordChinese: '照耀' },
  { id: 'sf16', sentence: 'I ___ my homework.', chinese: '我做作业。', emoji: '📝', category: 'school', blankIndex: 1, blankWord: 'do', blankWordChinese: '做' },
  { id: 'sf17', sentence: 'He ___ to read.', chinese: '他喜欢阅读。', emoji: '📖', category: 'actions', blankIndex: 1, blankWord: 'likes', blankWordChinese: '喜欢' },
  { id: 'sf18', sentence: 'The bird can ___.', chinese: '鸟会飞。', emoji: '🐦', category: 'animals', blankIndex: 3, blankWord: 'fly', blankWordChinese: '飞' },
  { id: 'sf19', sentence: 'I ___ water.', chinese: '我喝水。', emoji: '💧', category: 'actions', blankIndex: 1, blankWord: 'drink', blankWordChinese: '喝' },
  { id: 'sf20', sentence: 'They ___ a family.', chinese: '他们是一家人。', emoji: '👨‍👩‍👧‍👦', category: 'family', blankIndex: 1, blankWord: 'are', blankWordChinese: '是' },
];

// Dialogue Items
export interface DialogueItem {
  id: string;
  speakerA: string;
  speakerAChinese: string;
  speakerB: string;
  speakerBChinese: string;
  emoji: string;
  category: string;
  blankForSpeakerB: boolean;
}

export const dialogueItems: DialogueItem[] = [
  { id: 'd01', speakerA: 'Good morning!', speakerAChinese: '早上好！', speakerB: 'Good morning!', speakerBChinese: '早上好！', emoji: '🌅', category: 'greeting', blankForSpeakerB: true },
  { id: 'd02', speakerA: 'How are you?', speakerAChinese: '你好吗？', speakerB: "I'm fine, thank you!", speakerBChinese: '我很好，谢谢！', emoji: '😊', category: 'greeting', blankForSpeakerB: true },
  { id: 'd03', speakerA: "What's your name?", speakerAChinese: '你叫什么名字？', speakerB: 'My name is Tom.', speakerBChinese: '我叫汤姆。', emoji: '🙋', category: 'greeting', blankForSpeakerB: true },
  { id: 'd04', speakerA: 'Thank you!', speakerAChinese: '谢谢你！', speakerB: "You're welcome!", speakerBChinese: '不客气！', emoji: '🙏', category: 'greeting', blankForSpeakerB: true },
  { id: 'd05', speakerA: 'Goodbye!', speakerAChinese: '再见！', speakerB: 'See you later!', speakerBChinese: '回头见！', emoji: '👋', category: 'greeting', blankForSpeakerB: true },
  { id: 'd06', speakerA: 'What color is it?', speakerAChinese: '它是什么颜色？', speakerB: 'It is red.', speakerBChinese: '它是红色的。', emoji: '🎨', category: 'colors', blankForSpeakerB: true },
  { id: 'd07', speakerA: 'How old are you?', speakerAChinese: '你几岁了？', speakerB: 'I am six years old.', speakerBChinese: '我六岁了。', emoji: '🎂', category: 'numbers', blankForSpeakerB: true },
  { id: 'd08', speakerA: 'Do you like apples?', speakerAChinese: '你喜欢苹果吗？', speakerB: 'Yes, I do!', speakerBChinese: '是的，我喜欢！', emoji: '🍎', category: 'fruits', blankForSpeakerB: true },
  { id: 'd09', speakerA: 'What do you have?', speakerAChinese: '你有什么？', speakerB: 'I have a book.', speakerBChinese: '我有一本书。', emoji: '📖', category: 'daily', blankForSpeakerB: true },
  { id: 'd10', speakerA: 'Who is she?', speakerAChinese: '她是谁？', speakerB: 'She is my mother.', speakerBChinese: '她是我妈妈。', emoji: '👩', category: 'family', blankForSpeakerB: true },
  { id: 'd11', speakerA: 'What do you eat?', speakerAChinese: '你吃什么？', speakerB: 'I eat rice.', speakerBChinese: '我吃米饭。', emoji: '🍚', category: 'food', blankForSpeakerB: true },
  { id: 'd12', speakerA: 'Can you swim?', speakerAChinese: '你会游泳吗？', speakerB: 'Yes, I can!', speakerBChinese: '是的，我会！', emoji: '🏊', category: 'actions', blankForSpeakerB: true },
  { id: 'd13', speakerA: 'What is this?', speakerAChinese: '这是什么？', speakerB: 'This is a cat.', speakerBChinese: '这是一只猫。', emoji: '🐱', category: 'animals', blankForSpeakerB: true },
  { id: 'd14', speakerA: 'Where is the school?', speakerAChinese: '学校在哪里？', speakerB: 'It is over there.', speakerBChinese: '它在那边。', emoji: '🏫', category: 'school', blankForSpeakerB: true },
  { id: 'd15', speakerA: 'Is it sunny today?', speakerAChinese: '今天晴天吗？', speakerB: 'Yes, it is sunny!', speakerBChinese: '是的，是晴天！', emoji: '☀️', category: 'nature', blankForSpeakerB: true },
  { id: 'd16', speakerA: 'What is your favorite color?', speakerAChinese: '你最喜欢什么颜色？', speakerB: 'I like blue.', speakerBChinese: '我喜欢蓝色。', emoji: '💙', category: 'colors', blankForSpeakerB: true },
  { id: 'd17', speakerA: 'How many apples?', speakerAChinese: '有多少个苹果？', speakerB: 'Five apples.', speakerBChinese: '五个苹果。', emoji: '5️⃣', category: 'numbers', blankForSpeakerB: true },
  { id: 'd18', speakerA: "What's in the bag?", speakerAChinese: '书包里有什么？', speakerB: 'A pencil and a book.', speakerBChinese: '一支铅笔和一本书。', emoji: '🎒', category: 'school', blankForSpeakerB: true },
  { id: 'd19', speakerA: 'Can I have some water?', speakerAChinese: '我能喝点水吗？', speakerB: 'Sure! Here you are.', speakerBChinese: '当然！给你。', emoji: '💧', category: 'food', blankForSpeakerB: true },
  { id: 'd20', speakerA: 'Nice to meet you!', speakerAChinese: '很高兴认识你！', speakerB: 'Nice to meet you too!', speakerBChinese: '我也很高兴认识你！', emoji: '🤝', category: 'greeting', blankForSpeakerB: true },
];

// Listen Sentence Items
export interface ListenSentenceItem {
  id: string;
  sentence: string;
  chinese: string;
  emoji: string;
  category: string;
}

export const listenSentenceItems: ListenSentenceItem[] = [
  { id: 'ls01', sentence: 'I have a cat.', chinese: '我有一只猫。', emoji: '🐱', category: 'animals' },
  { id: 'ls02', sentence: 'She is my mother.', chinese: '她是我妈妈。', emoji: '👩', category: 'family' },
  { id: 'ls03', sentence: 'I like apples.', chinese: '我喜欢苹果。', emoji: '🍎', category: 'fruits' },
  { id: 'ls04', sentence: 'The cat is small.', chinese: '这只猫很小。', emoji: '🐱', category: 'animals' },
  { id: 'ls05', sentence: 'I go to school.', chinese: '我去上学。', emoji: '🏫', category: 'school' },
  { id: 'ls06', sentence: 'He can swim.', chinese: '他会游泳。', emoji: '🏊', category: 'actions' },
  { id: 'ls07', sentence: 'It is a red flower.', chinese: '它是一朵红色的花。', emoji: '🌹', category: 'nature' },
  { id: 'ls08', sentence: 'I eat rice every day.', chinese: '我每天吃米饭。', emoji: '🍚', category: 'food' },
  { id: 'ls09', sentence: 'We are happy.', chinese: '我们很开心。', emoji: '😊', category: 'greeting' },
  { id: 'ls10', sentence: 'This is my book.', chinese: '这是我的书。', emoji: '📖', category: 'daily' },
  { id: 'ls11', sentence: 'The bird can fly.', chinese: '鸟会飞。', emoji: '🐦', category: 'animals' },
  { id: 'ls12', sentence: 'I drink water.', chinese: '我喝水。', emoji: '💧', category: 'actions' },
  { id: 'ls13', sentence: 'She wears a blue dress.', chinese: '她穿了一件蓝色连衣裙。', emoji: '👗', category: 'colors' },
  { id: 'ls14', sentence: 'I have three apples.', chinese: '我有三个苹果。', emoji: '🍎', category: 'numbers' },
  { id: 'ls15', sentence: 'The sun is bright.', chinese: '太阳很明亮。', emoji: '☀️', category: 'nature' },
  { id: 'ls16', sentence: 'I do my homework.', chinese: '我做作业。', emoji: '📝', category: 'school' },
  { id: 'ls17', sentence: 'They play together.', chinese: '他们一起玩。', emoji: '🎮', category: 'actions' },
  { id: 'ls18', sentence: 'I like to sing.', chinese: '我喜欢唱歌。', emoji: '🎤', category: 'actions' },
  { id: 'ls19', sentence: 'My father is tall.', chinese: '我爸爸很高。', emoji: '👨', category: 'family' },
  { id: 'ls20', sentence: 'The sky is blue.', chinese: '天空是蓝色的。', emoji: '🌌', category: 'nature' },
];
