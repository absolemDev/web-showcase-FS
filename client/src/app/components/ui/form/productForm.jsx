import React, { useEffect, useRef, useState } from "react";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import { Button, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import SelectFieldCategory from "../selectFieldCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProductsLoadingStatus,
  updateProductData
} from "../../../store/products";
import { checkEqual } from "../../../utils/checkEqual";

const ProductForm = ({ product, showcaseId, index, onClose }) => {
  const defaultData = product
    ? {
        name: product.name,
        description: product.description,
        img: product.img,
        price: product.price,
        classifire: product.classifire
      }
    : {
        name: "",
        description: "",
        img: "",
        price: 0,
        classifire: ""
      };
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const isLoading = useSelector(getProductsLoadingStatus());
  const refFormBlock = useRef(null);

  useEffect(() => {
    refFormBlock.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  const dispatch = useDispatch();

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Поле обязателен для заполнения"
      }
    },
    description: {
      isRequired: {
        message: "Поле обязателен для заполнения"
      }
    },
    classifire: {
      isRequired: {
        message: "Выберите категорию из списка классификатора"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
    const dataEqual = checkEqual(
      { ...data, [target.name]: target.value },
      defaultData
    );
    setIsChanged(!dataEqual);
    setErrors((prevState) => {
      delete prevState[target.name];
      return { ...prevState };
    });
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = () => {
    if (validate() && !isLoading) {
      if (product) {
        dispatch(updateProductData(data, showcaseId, product._id)).then(() =>
          onClose()
        );
      } else {
        dispatch(createProduct(data, showcaseId)).then(() => onClose());
      }
      setIsChanged(false);
    }
  };

  return (
    <Row
      className="form-product border-start border-bottom border-3 ps-3 py-2"
      ref={refFormBlock}
    >
      <div className="d-flex mb-3">
        <div className="fs-5 fw-bolder me-auto">
          {index ? `#${index}. ${product.name}` : "Новый продукт"}
        </div>
        <div>
          {(!product || (product && isChanged)) && (
            <Button
              variant="success"
              className="me-2"
              onClick={handleSubmit}
              size="sm"
            >
              <i className="bi bi-check-lg"></i>
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </Button>
        </div>
      </div>
      <TextField
        label="Название"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextAreaField
        label="Описание"
        name="description"
        value={data.description}
        onChange={handleChange}
        error={errors.description}
      />
      <TextField
        label="Фото"
        name="img"
        value={data.img}
        onChange={handleChange}
        error={errors.img}
        placeholder="Ссылка на изображение"
      />
      <TextField
        label="Цена"
        name="price"
        value={data.price}
        onChange={handleChange}
        error={errors.price}
        type="number"
        min="0"
      />
      <SelectFieldCategory
        label="Категория"
        name="classifire"
        value={data.classifire}
        onChange={handleChange}
        error={errors.classifire}
      />
    </Row>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
  showcaseId: PropTypes.string,
  index: PropTypes.number,
  onClose: PropTypes.func
};

export default ProductForm;
