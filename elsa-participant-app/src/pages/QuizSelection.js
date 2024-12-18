import React, { useEffect, useState } from "react";
import { fetchQuizSessions } from "../services/api";
import { useNavigate } from "react-router-dom";
import { List, Button, Typography, Card } from "antd";

const { Title } = Typography;

const QuizSelection = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizSessions().then(setSessions);
  }, []);

  return (
    <Card style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Available Quizzes
      </Title>
      <List
        bordered
        dataSource={sessions}
        renderItem={(session) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => navigate(`/participant/${session.id}`)}
              >
                Join
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`${session.name} - (${session.sessionName})`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuizSelection;
