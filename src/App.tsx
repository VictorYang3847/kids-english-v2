import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MatchGame from './pages/MatchGame';
import ListeningGame from './pages/ListeningGame';
import SpellingGame from './pages/SpellingGame';
import QuizGame from './pages/QuizGame';
import SentenceFillGame from './pages/SentenceFillGame';
import DialogueGame from './pages/DialogueGame';
import ListenMatchGame from './pages/ListenMatchGame';
import WordBook from './pages/WordBook';
import SentenceBook from './pages/SentenceBook';
import WordPracticeHub from './pages/WordPracticeHub';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<MatchGame />} />
        <Route path="/word-book" element={<WordBook />} />
        <Route path="/sentence-book" element={<SentenceBook />} />
        <Route path="/practice" element={<WordPracticeHub />} />
        <Route path="/listening" element={<ListeningGame />} />
        <Route path="/spelling" element={<SpellingGame />} />
        <Route path="/quiz" element={<QuizGame />} />
        <Route path="/sentence-fill" element={<SentenceFillGame />} />
        <Route path="/dialogue" element={<DialogueGame />} />
        <Route path="/listen-match" element={<ListenMatchGame />} />
      </Routes>
    </HashRouter>
  );
}
