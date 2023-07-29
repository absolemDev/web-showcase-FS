import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUsersListLoadedStatus, loadUsersList } from "../../../store/user";
import {
  getCategoriesDataLoadedStatus,
  loadCategoriesList
} from "../../../store/categories";
import {
  getShowcasesDataLoadedStatus,
  loadShowcasesList
} from "../../../store/showcases";
import {
  getProductsDataLoadedStatus,
  loadProductsList
} from "../../../store/products";
import { Spinner } from "react-bootstrap";
import {
  getCommentsDataLoadedStatus,
  loadCommentsList
} from "../../../store/comments";

const AppLoader = ({ children }) => {
  const categorieIsLoaded = useSelector(getCategoriesDataLoadedStatus());
  const showcasesIsLoaded = useSelector(getShowcasesDataLoadedStatus());
  const productsIsLoaded = useSelector(getProductsDataLoadedStatus());
  const commentsIsLoaded = useSelector(getCommentsDataLoadedStatus());
  const usersIsLoaded = useSelector(getUsersListLoadedStatus());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadShowcasesList());
    dispatch(loadProductsList());
    dispatch(loadCategoriesList());
    dispatch(loadCommentsList());
    dispatch(loadUsersList());
  }, []);

  if (
    categorieIsLoaded &&
    showcasesIsLoaded &&
    productsIsLoaded &&
    commentsIsLoaded &&
    usersIsLoaded
  ) {
    return children;
  } else {
    return (
      <div className="spinner-wrapper">
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default AppLoader;
