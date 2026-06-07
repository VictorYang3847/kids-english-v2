import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MatchGame from './pages/MatchGame';
import ListeningGame from './pages/ListeningGame';
import SpellingGame from './pages/SpellingGame';
import QuizGame from './pages/QuizGame';
import SentenceFillGame from './pages/SentenceFillGame';
import DialogueGame from './pages/DialogueGame';
import ListenMatchGame from './pages/ListenMatchGame';
import WordBook from './pages/WordBook';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<MatchGame />} />
        <Route path="/listening" element={<ListeningGame />} />
        <Route path="/spelling" element={<SpellingGame />} />
        <Route path="/quiz" element={<QuizGame />} />
        <Route path="/sentence-fill" element={<SentenceFillGame />} />
        <Route path="/dialogue" element={<DialogueGame />} />
        <Route path="/listen-match" element={<ListenMatchGame />} />
        <Route path="/words" element={<WordBook />} />
      </Routes>
    </Router>
  );
}
