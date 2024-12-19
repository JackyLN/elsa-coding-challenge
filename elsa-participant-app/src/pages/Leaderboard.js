import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Typography, Button, Card } from "antd";
import configs from "../config";

const { Title } = Typography;

const Leaderboard = () => {
  const { sessionId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const socket = io(`${configs.apiBase}/socket`);
  const navigate = useNavigate();

  useEffect(() => {
    // Join leaderboard room
    socket.emit("joinLeaderboard", { sessionId });

    // Handle leaderboard updates
    socket.on("leaderboardUpdate", (data) => {
      setLeaderboard(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  const handleExit = () => {
    localStorage.removeItem("participantInfo");
    navigate("/");
  };

  const columns = [
    { title: "Rank", dataIndex: "rank", key: "rank" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Score", dataIndex: "score", key: "score" },
  ];

  return (
    <Card style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Leaderboard
      </Title>
      <Table
        dataSource={leaderboard}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
      <Button
        type="primary"
        danger
        onClick={handleExit}
        style={{ marginTop: 20 }}
        block
      >
        Exit Quiz
      </Button>
    </Card>
  );
};

export default Leaderboard;
