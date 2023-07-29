import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchField = ({
  value,
  placeholder,
  onChange,
  onSearch,
  onCancel,
  disabled
}) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.target.blur();
      onSearch();
    }
  };
  return (
    <InputGroup>
      <Form.Control
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="input-search"
        disabled={disabled}
      />
      {value && (
        <Button variant="light" onClick={onCancel} disabled={disabled}>
          <i className="bi bi-x-lg"></i>
        </Button>
      )}
      <Button
        variant="outline-secondary"
        onClick={onSearch}
        disabled={disabled}
      >
        Поиск
      </Button>
    </InputGroup>
  );
};

SearchField.defaultProps = {
  placeholder: "Поиск..."
};

SearchField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSearch: PropTypes.func,
  disabled: PropTypes.bool
};

export default SearchField;
