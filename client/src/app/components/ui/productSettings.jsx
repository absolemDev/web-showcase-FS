import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { getProductsLoadingStatus, removeProduct } from "../../store/products";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryNameByClass } from "../../store/categories";
import ProductForm from "./form/productForm";

const ProductSettings = ({ product, showcaseId, isEdit, onEdit, index }) => {
  const isLoading = useSelector(getProductsLoadingStatus());
  const categoryName = useSelector(getCategoryNameByClass(product.classifire));

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeProduct(showcaseId, product._id));
  };

  const handleOpenForm = () => {
    onEdit(product._id);
  };

  const handleCloseForm = () => {
    onEdit(null);
  };

  return (
    <>
      {isEdit ? (
        <ProductForm
          product={product}
          showcaseId={showcaseId}
          index={index}
          onClose={handleCloseForm}
        />
      ) : (
        <Row className="border-bottom border-3 p-2">
          <Col xs={1}>{index}</Col>
          <Col xs={3}>{product.name}</Col>
          <Col xs={5}>{categoryName}</Col>
          <Col xs={1}>{product.price}</Col>
          <Col xs={2} className="text-end p-0">
            <Button onClick={handleOpenForm} size="sm">
              <i className="bi bi-pencil-square"></i>
            </Button>
            <Button
              variant="danger"
              className="ms-2 me-1"
              disabled={isLoading}
              onClick={handleDelete}
              size="sm"
            >
              <i className="bi bi-trash-fill"></i>
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

ProductSettings.propTypes = {
  product: PropTypes.object,
  showcaseId: PropTypes.string,
  isEdit: PropTypes.bool,
  onEdit: PropTypes.func,
  index: PropTypes.number
};

export default ProductSettings;
