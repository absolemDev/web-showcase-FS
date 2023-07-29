import React, { useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import {
  getServerError,
  getUsersLoadingStatus,
  logIn
} from "../../../store/user";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const loginError = useSelector(getServerError());
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
        message: "Введите корректную электронную почту"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
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
    dispatch(logIn(data, redirect));
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-4">
      <TextField
        id="logEmail"
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        id="logPassword"
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      {loginError && <Alert variant="danger">{loginError}</Alert>}
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
          </>
        ) : (
          "Вход"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
