import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getShowcaseExist, getUserShowcaseAccess } from "../../store/showcases";
import { getProductExist } from "../../store/products";
import PropTypes from "prop-types";

const ProtectPage = ({ component: Component, path }) => {
  const { id } = useParams();
  const showcaseAccess = useSelector(getUserShowcaseAccess(id));
  const showcaseExist = useSelector(getShowcaseExist(id));
  const productExist = useSelector(getProductExist(id));

  switch (path) {
    case "/showcases":
      return showcaseExist ? <Component /> : <Navigate to={path} />;
    case "/products":
      return productExist ? <Component /> : <Navigate to={path} />;
    case "/my-showcases":
      return showcaseAccess ? <Component /> : <Navigate to={path} />;
    default:
      return <Navigate to="/showcases" />;
  }
};

ProtectPage.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string
};

export default ProtectPage;
