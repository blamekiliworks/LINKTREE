import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ReleasePage } from './pages/ReleasePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<ReleasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
