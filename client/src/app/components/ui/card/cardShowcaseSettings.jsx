import React from "react";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";

const CardShowcaseSettings = ({ _id, name, img }) => {
  return (
    <LinkContainer to={`/my-showcases/${_id}`}>
      <Card
        className="card-showcase-settings position-relative bg-dark text-white col-lg-5 m-4 d-flex flex-column justify-content-center"
        role="button"
      >
        <Card.Title className="text-center">{name}</Card.Title>
      </Card>
    </LinkContainer>
  );
};

CardShowcaseSettings.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string
};

export default CardShowcaseSettings;
