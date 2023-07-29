import React from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CardAddShowcase = () => {
  return (
    <LinkContainer to="/my-showcases/create">
      <Card
        className="card-add-showcase text-white col-lg-5 m-4 p-2"
        role="button"
      >
        <Card.Body className="text-center p-0">
          <i className="bi bi-plus-square fs-1"></i>
        </Card.Body>
        <Card.Title className="text-center">Добавить витрину</Card.Title>
      </Card>
    </LinkContainer>
  );
};

export default CardAddShowcase;
