import React from "react";
import { Badge, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TargetInfo = ({ name, img, rate, description, price, address, link }) => {
  return (
    <div className="row">
      <div className="col-lg-5 position-relative">
        <Image className="mx-auto d-block" src={img} alt={name} rounded fluid />
        {link && (
          <Link
            to={link.path}
            className="position-absolute bottom-0 start-0 m-1 ms-3"
          >
            <Badge bg="dark">{link.name}</Badge>
          </Link>
        )}
      </div>
      <div className="col-lg-7 p-0 d-flex flex-column">
        <div className="fs-5 fw-bold d-flex align-items-center mb-2">
          <div>{name}</div>
          {rate.amount > 0 && (
            <Badge className="rate ms-2">
              <i className="bi bi-star-fill"></i>{" "}
              {Math.round(rate.count / rate.amount)}
            </Badge>
          )}
        </div>
        <p className="flex-grow-1 pe-4">{description}</p>
        {address && (
          <p className="m-0">
            <span className="fw-bold">Адрес:</span> {address}
          </p>
        )}
        {price && (
          <p className="m-0">
            <span className="fw-bold">Цена:</span> {price}
          </p>
        )}
      </div>
    </div>
  );
};

TargetInfo.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  rate: PropTypes.object,
  description: PropTypes.string,
  price: PropTypes.number,
  address: PropTypes.string,
  link: PropTypes.object
};

export default TargetInfo;
