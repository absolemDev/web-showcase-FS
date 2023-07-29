import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackHistoryButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      className="back-history-button py-0 border-0"
      onClick={() => navigate(-1)}
    >
      <i className="bi bi-caret-left-fill"></i>
      Назад
    </Button>
  );
};

export default BackHistoryButton;
