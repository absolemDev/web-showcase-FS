import React, { useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import CheckBoxField from "../../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import {
  getServerError,
  getUsersLoadingStatus,
  signUp
} from "../../../store/user";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    licence: false
  });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const authError = useSelector(getServerError());
  const userIsLoading = useSelector(getUsersLoadingStatus());

  const dispatch = useDispatch();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    if (errors[target.name]) delete errors[target.name];
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    name: {
      isRequired: {
        message: "Имя обязатен для заполнения"
      },
      min: {
        message: "Имя должно состоять минимум из 3 символов",
        value: 3
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();
  const redirect = () => navigate("/showcases");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(signUp(data, redirect));
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-4">
      <TextField
        id="regEmail"
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        id="regPassword"
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <button
        className="btn btn-primary w-100 mx-auto submit"
        type="submit"
        disabled={!isValid || userIsLoading}
      >
        {userIsLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </>
        ) : (
          "Регистрация"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
