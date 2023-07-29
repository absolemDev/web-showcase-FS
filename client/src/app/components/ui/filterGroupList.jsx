import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";

const FilterGroupList = ({
  items,
  valueProperty,
  contentProperty,
  onSelect,
  selectedValue,
  disabled
}) => {
  return (
    <ListGroup>
      {items.map((item) => (
        <ListGroup.Item
          action
          as={"div"}
          active={item[valueProperty] === selectedValue}
          onClick={() => onSelect(item[valueProperty])}
          key={item[valueProperty]}
          className="overflow-hidden p-0 position-relative"
          role="button"
          disabled={disabled}
        >
          <div className="left-hidd-content position-absolute">&nbsp;</div>
          <div
            className={`text-nowrap px-3 py-2${
              item[contentProperty].length > 26 ? " content-animation" : ""
            }`}
          >
            {item[contentProperty]}
          </div>
          <div className="right-hidd-content position-absolute">&nbsp;</div>
        </ListGroup.Item>
      ))}
      {selectedValue && (
        <ListGroup.Item
          action
          onClick={() => onSelect(null)}
          variant="dark"
          disabled={disabled}
        >
          Сбросить
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

FilterGroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

FilterGroupList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  disabled: PropTypes.bool
};

export default FilterGroupList;
