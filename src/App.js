import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Simulacion from './components/Simulacion';
import SobreSimulador from './components/SobreSimulador';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulacion" element={<Simulacion />} />
        <Route path="/sobresimulador" element={<SobreSimulador />} />
      </Routes>
    </Router>
  );
}

export default App;
