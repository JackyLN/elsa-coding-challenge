import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizSelection from "./pages/QuizSelection";
import QuizQuestion from "./pages/QuizQuestion";
import Leaderboard from "./pages/Leaderboard";
import ParticipantInfo from "./pages/ParticipantInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizSelection />} />
        <Route path="/participant/:sessionId" element={<ParticipantInfo />} />
        <Route path="/session/:sessionId" element={<QuizQuestion />} />
        <Route path="/leaderboard/:sessionId" element={<Leaderboard />} />

      </Routes>
    </Router>
  );
}

export default App;
