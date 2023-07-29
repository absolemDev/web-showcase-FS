import React from "react";
import { Badge, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import { useDataProcessing } from "../../../hooks/useDataProcessing";

const CardProduct = ({ _id, name, img, price, rate, showcase }) => {
  const { getShowcaseName, isProductsPage } = useDataProcessing();
  return (
    <Card className="card-product col-md-6 col-lg-4">
      <LinkContainer to={`/products/${_id}`}>
        <div className="position-relative">
          <Card.Img variant="top" src={img} role="button" />
          {rate.amount > 0 && (
            <Badge
              className="rate position-absolute top-0 end-0 m-1"
              role="button"
            >
              <i className="bi bi-star-fill"></i>{" "}
              {Math.round(rate.count / rate.amount)}
            </Badge>
          )}
          {isProductsPage() && (
            <Badge bg="dark" className="position-absolute bottom-0 start-0 m-1">
              {getShowcaseName(showcase)}
            </Badge>
          )}
        </div>
      </LinkContainer>
      <Card.Body className="d-flex align-items-start flex-column">
        <LinkContainer to={`/products/${_id}`}>
          <Card.Title role="button">{name}</Card.Title>
        </LinkContainer>
        <div className="mt-auto">
          <Card.Text>Цена: {price}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

CardProduct.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.number,
  rate: PropTypes.object,
  showcase: PropTypes.string
};

export default CardProduct;
