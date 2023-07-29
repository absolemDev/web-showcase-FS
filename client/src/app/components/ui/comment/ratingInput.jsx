import React from "react";
import PropTypes from "prop-types";

const RatingInput = ({ name, value, onChange, error }) => {
  const handleChange = (value) => {
    onChange({ name, value });
  };

  return (
    <div className="d-flex align-items-center">
      <div className="rating fs-4 me-2">
        {Array.from({ length: 5 }).map((i, index) => (
          <i
            key={index}
            className={`bi bi-star${index + 1 <= value ? "-fill" : ""}`}
            onClick={() => handleChange(index + 1)}
            role="button"
          ></i>
        ))}
      </div>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

RatingInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default RatingInput;
