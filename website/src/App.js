import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieConsent, { Cookies } from "react-cookie-consent";

import { MainScreen } from './pages/MainScreen';
import { GameScreen } from './pages/GameScreen';
import { LobbyMenu } from './pages/LobbyMenu';
import { ProfilePage } from './pages/ProfilePage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import './App.css';
import Docs from './pages/Docs';

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
                    background: "rgba(255, 255, 255, 0.6)",
                    color: "#374151",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    borderBottom: "1px solid #E5E7EB",
                    backdropFilter: "blur(10px)",
                    padding: "16px 24px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    alignItems: "center",
                }}
                contentStyle={{
                    flex: "1 1 0%",
                    margin: "0",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "0 16px",
                }}
                buttonStyle={{
                    background: "#4F46E5",
                    color: "#fff",
                    fontSize: "14px",
                    borderRadius: "12px",
                    padding: "10px 24px",
                    fontWeight: "600",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 10px rgba(79, 70, 229, 0.2)",
                    height: "42px",
                    minWidth: "100px",
                }}
                declineButtonStyle={{
                    background: "#fff",
                    color: "#374151",
                    fontSize: "14px",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    fontWeight: "600",
                    border: "1px solid #D1D5DB",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    height: "42px",
                    minWidth: "100px",
                }}
                buttonWrapperStyle={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginLeft: "16px",
                }}
                overlayStyle={{
                    background: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(4px)",
                }}
                onAccept={() => {
                    console.log("Cookies accepted");
                }}
                onDecline={() => {
                    console.log("Cookies declined");
                }}
      >
        Мы используем файлы cookie, чтобы сайт работал корректно и отображал актуальный контент. 
        Продолжая пользоваться сайтом, вы соглашаетесь с их использованием.
      </CookieConsent>

      <Routes>
        <Route path="/" element={<MainScreen />}></Route>
        <Route path='/lobby' element={<LobbyMenu />}></Route>
        <Route path='/lobby/game' element={<GameScreen />}></Route>
        <Route path='/profile' element={<ProfilePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/docs' element={<Docs />}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
