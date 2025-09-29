import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainScreen } from './pages/MainScreen';
import LobbyMenu, { Menu } from './pages/LobbyMenu';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />}></Route>
        <Route path='/lobby' element={<LobbyMenu />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
