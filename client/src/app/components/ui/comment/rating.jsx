import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value }) => {
  return (
    <span className="rating ms-1">
      {Array.from({ length: 5 }).map((i, index) => (
        <i
          key={index}
          className={`bi bi-star${index + 1 <= value ? "-fill" : ""}`}
        ></i>
      ))}
    </span>
  );
};

Rating.propTypes = {
  value: PropTypes.number
};

export default Rating;
