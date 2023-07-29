import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return (
    <Pagination className="mx-auto">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

PaginationComponent.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default PaginationComponent;
