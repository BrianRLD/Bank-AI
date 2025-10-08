import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';

function App() {
  // Prueba de variable de entorno
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", apiUrl); // Esto debe salir en la consola del navegador

  const isLoggedIn = true; // ⚠️ Temporal

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/chat"
          element={isLoggedIn ? <ChatPage /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
