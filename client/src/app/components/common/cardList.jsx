import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const CardList = ({
  items,
  defaultCard: DefaultCard,
  children,
  textForEmptyItems
}) => {
  return (
    <div className="d-flex flex-column flex-md-row flex-wrap justify-content-center">
      {items.length
        ? items.map((item) => {
            return React.cloneElement(React.Children.only(children), {
              ...item,
              key: item._id
            });
          })
        : !DefaultCard && (
            <Alert variant="dark" className="flex-fill">
              {textForEmptyItems}
            </Alert>
          )}
      {DefaultCard && <DefaultCard />}
    </div>
  );
};

CardList.defaultProps = {
  textForEmptyItems: "Список пуст"
};

CardList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  defaultCard: PropTypes.func,
  children: PropTypes.node,
  textForEmptyItems: PropTypes.string
};

export default CardList;
