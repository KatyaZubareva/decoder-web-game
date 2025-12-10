import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieConsent, { Cookies } from "react-cookie-consent";

import { MainScreen } from './pages/MainScreen';
import { GameScreen } from './pages/GameScreen';
import { LobbyMenu } from './pages/LobbyMenu';
import { PlayerSetup } from './pages/PlayerSetup';
import { TeamSetup } from './pages/TeamSetup';
import { ProfilePage } from './pages/ProfilePage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AssignRole } from './pages/AssignRole';

import './App.css';

function App() {
  return (
    <Router>
      
      <CookieConsent
                location="top"
                buttonText="Принять"
                declineButtonText="Отклонить"
                enableDeclineButton
                expires={365}
                style={{
                    background: "rgba(0, 0, 0, 0.85)",
                    color: "#fff",
                    fontSize: "14px",
                }}
                buttonStyle={{
                    background: "#3767ED",
                    color: "#fff",
                    fontSize: "14px",
                    borderRadius: "6px",
                    padding: "8px 25px",
                }}
                declineButtonStyle={{
                    background: "#fff",
                    color: "#000",
                    fontSize: "14px",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    marginLeft: "8px",
                }}
      >
        Мы используем файлы cookie, чтобы сайт работал корректно и отображал актуальный контент. 
        Продолжая пользоваться сайтом, вы соглашаетесь с их использованием.
      </CookieConsent>

      <Routes>
        <Route path="/" element={<MainScreen />}></Route>
        <Route path='/lobby' element={<LobbyMenu />}></Route>
        <Route path='/lobby/game' element={<GameScreen />}></Route>
        <Route path='/lobby/player' element={<PlayerSetup />}></Route>
        <Route path='/lobby/player/team' element={<TeamSetup />}></Route>
        <Route path='/lobby/player/team/role' element={<AssignRole />}></Route>
        <Route path='/profile' element={<ProfilePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
