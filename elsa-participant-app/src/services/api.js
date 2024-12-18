import axios from "axios";
import configs from "../config";

const API_BASE = configs.apiBase;

export const fetchQuizSessions = async () => {
  const response = await axios.get(`${API_BASE}/session`);
  return response.data;
};

export const fetchQuestionsBySession = async (sessionId) => {
  const response = await axios.get(
    `${API_BASE}/session/${sessionId}/questions`
  );
  return response.data;
};

export const createParticipant = async (participant) => {
  return axios.post(`${API_BASE}/participant`, participant);
};

export const submitAnswer = async (answer) => {
  return axios.post(`${API_BASE}/answer`, answer);
};
