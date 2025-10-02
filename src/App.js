import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainScreen } from './pages/MainScreen';
import { GameScreen } from './pages/GameScreen';
import { LobbyMenu } from './pages/LobbyMenu';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />}></Route>
        <Route path='/lobby' element={<LobbyMenu />}></Route>
        <Route path='/game' element={<GameScreen />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
