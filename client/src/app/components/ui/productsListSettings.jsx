import React, { useState } from "react";
import ProductSettings from "./productSettings";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getShowcaseProducts } from "../../store/products";
import PropTypes from "prop-types";
import ProductForm from "./form/productForm";

const ProductsListSettings = ({ showcaseId }) => {
  const products = useSelector(getShowcaseProducts(showcaseId));
  const [editProduct, setEditProduct] = useState(null);

  const handleEdit = (id) => {
    setEditProduct(id);
  };

  return (
    <div className="col-md-10 offset-md-3 shadow mt-4 mx-auto p-4">
      <div className="fs-5 fw-bold mb-2">Список продкутов:</div>
      <Row className="fw-bold border-bottom border-3 p-2">
        <Col xs={1}>#</Col>
        <Col xs={3}>Название</Col>
        <Col xs={5}>Категория</Col>
        <Col xs={1}>Цена</Col>
        <Col xs={2}></Col>
      </Row>
      {products.map((item, index) => (
        <ProductSettings
          key={item._id}
          product={item}
          showcaseId={showcaseId}
          index={index + 1}
          onEdit={handleEdit}
          isEdit={item._id === editProduct}
        />
      ))}
      {editProduct === "new" && (
        <ProductForm
          showcaseId={showcaseId}
          onClose={() => setEditProduct(null)}
        />
      )}
      {editProduct !== "new" && (
        <Button
          onClick={() => setEditProduct("new")}
          className="button-add-product my-2 w-100 "
        >
          <i className="bi bi-plus-square me-2"></i>Добавить продукт
        </Button>
      )}
    </div>
  );
};

ProductsListSettings.propTypes = {
  showcaseId: PropTypes.string
};

export default ProductsListSettings;
