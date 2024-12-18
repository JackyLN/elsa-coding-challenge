import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Input, Button, Typography, message } from "antd";
import { createParticipant } from "../services/api";

const { Title } = Typography;

const ParticipantInfo = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!name || !email) {
      message.error("Please enter both name and email.");
      return;
    }

    try {
      // Register participant via API
      const response = await createParticipant({
        quizSessionId: sessionId,
        name,
        email,
      });

      const participant = response.data;

      // Save participant details to localStorage
      if (participant) {
        localStorage.setItem(
          "participantInfo",
          JSON.stringify({
            participantId: participant.id,
            sessionId: sessionId,
            name: participant.name,
            email: participant.email,
          })
        );
        // Navigate to the Question Screen
        navigate(`/session/${sessionId}`);
      }

      
    } catch (error) {
      message.error("Failed to register. Please try again.");
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "50px auto", padding: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Enter Your Information
      </Title>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Button type="primary" onClick={handleSubmit} block>
        Submit
      </Button>
    </Card>
  );
};

export default ParticipantInfo;
