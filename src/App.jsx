import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PestSimulator from './pages/PestSimulator';
import CircleOfCompetence from './pages/CircleOfCompetence';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/simulator" element={<PestSimulator />} />
        <Route path="/competence" element={<CircleOfCompetence />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
