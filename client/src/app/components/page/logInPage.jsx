import React from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getServerError } from "../../store/user";
import LoginForm from "../ui/form/loginForm";
import RegisterForm from "../ui/form/registerForm";

const LoginPage = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const authError = useSelector(getServerError());
  const handleSelect = () => {
    if (authError) {
      dispatch({ type: "users/authErrorFixed" });
    }
  };
  return (
    <div className="col-md-6 shadow">
      <Tabs
        defaultActiveKey={type || "login"}
        id="login-page"
        className="mb-3"
        justify
        onSelect={handleSelect}
      >
        <Tab eventKey="login" title="Вход">
          <LoginForm />
        </Tab>
        <Tab eventKey="register" title="Регистрация">
          <RegisterForm />
        </Tab>
      </Tabs>
    </div>
  );
};

export default LoginPage;
