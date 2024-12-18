import React, { useEffect, useState } from "react";
import { fetchQuestionsBySession, submitAnswer } from "../services/api";
import Question from "../components/Question";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, message } from "antd";

const { Title } = Typography;

const QuizQuestion = () => {
  const { sessionId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const participantInfo = JSON.parse(localStorage.getItem("participantInfo"));

  useEffect(() => {
    fetchQuestionsBySession(sessionId)
      .then(setQuestions)
      .catch((error) => console.error("Failed to fetch questions:", error));
  }, [sessionId]);

  const handleSubmit = async (selectedOptions) => {
    try {
      const participantInfo = JSON.parse(
        localStorage.getItem("participantInfo")
      );
      const question = questions[currentIndex];

      // Submit the answer to the backend
      const response = await submitAnswer({
        sessionId: participantInfo.sessionId,
        participantId: participantInfo.participantId,
        questionId: question.id,
        selectedOption: selectedOptions,
      });

      return response.data; // Return the backend result
    } catch (error) {
      message.error("Failed to submit the answer. Please try again.");
      return { result: false };
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate(`/leaderboard/${sessionId}`);
    }
  };

  return (
    <div>
      <Title level={2} style={{ textAlign: "center", marginTop: 30 }}>
        Question {currentIndex + 1}
      </Title>
      {questions.length > 0 && (
        <Question
          question={questions[currentIndex]}
          onSubmit={handleSubmit}
          onNext={handleNext}
        />
      )}
      {questions.length === 0 && <p>Loading...</p>}
    </div>
  );
};

export default QuizQuestion;
