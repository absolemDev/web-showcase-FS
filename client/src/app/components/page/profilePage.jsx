import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  getUsersLoadingStatus,
  updateUserData
} from "../../store/user";
import { checkEqual } from "../../utils/checkEqual";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { Spinner } from "react-bootstrap";

const ProfilePage = () => {
  const { name, img } = useSelector(getCurrentUser());
  const defaultData = { name, img };
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const isValid = Object.keys(errors).length === 0;

  const isLoading = useSelector(getUsersLoadingStatus());

  const dispatch = useDispatch();

  const handleChange = (target) => {
    const dataEqual = checkEqual(
      { ...data, [target.name]: target.value.trim() },
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

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя не может быть пустым"
      }
    },
    img: {
      isLink: {
        message: "Поле Аватар должно быть ссылкой на изображение"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(updateUserData(data));
    setIsChanged(false);
  };

  return (
    <div className="col-md-6 shadow p-4">
      <div className="fs-5 fw-bolder mb-4">Настройки профиля</div>
      <form onSubmit={handleSubmit} className="px-4 pb-4">
        <TextField
          id="name"
          label="Имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          id="img"
          label="Аватар"
          name="img"
          value={data.img}
          onChange={handleChange}
          error={errors.img}
        />
        {isChanged && (
          <button
            className="btn btn-primary w-100 mx-auto submit"
            type="submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
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
              "Сохранить"
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
