import "./App.css";
import LoginPage from "./Components/LoginPage";
import { Routes, Route } from "react-router-dom";
import ChatRoom from "./Components/ChatRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/chatroom" element={<ChatRoom />} />
    </Routes>
  );
}

export default App;
