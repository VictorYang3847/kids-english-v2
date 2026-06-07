let lastSpokenText: string | null = null;
let lastSpokenTime: number = 0;
const DEDUPE_INTERVAL = 30000; // 30s dedup for auto-play only

export const speakWord = (word: string, force: boolean = false) => {
  if ('speechSynthesis' in window) {
    const now = Date.now();
    if (!force && word === lastSpokenText && (now - lastSpokenTime) < DEDUPE_INTERVAL) {
      return; // deduplicate non-force calls
    }
    lastSpokenText = word;
    lastSpokenTime = now;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }
};
