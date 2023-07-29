import React from "react";
import { useSelector } from "react-redux";
// import { getCommentsByTarget } from "../../store/comments";
import { getIsLoggedIn, getUserId } from "../../../store/user";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import CommentForm from "./commentForm";
import { LinkContainer } from "react-router-bootstrap";

const Comments = ({ productId, productOwner }) => {
  // const comments = useSelector(getCommentsByTarget(productId));
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userId = useSelector(getUserId());

  return (
    <div>
      {isLoggedIn ? (
        <>{userId !== productOwner && <CommentForm targetId={productId} />}</>
      ) : (
        <Alert variant="dark">
          Для того чтобы оставить оценку и отзыв необходимо{" "}
          <LinkContainer to="/authorization/register">
            <Alert.Link>Зарегистрироваться</Alert.Link>
          </LinkContainer>{" "}
          или{" "}
          <LinkContainer to="/authorization/login">
            <Alert.Link>Войти</Alert.Link>
          </LinkContainer>{" "}
          в систему.
        </Alert>
      )}
    </div>
  );
};

Comments.propTypes = {
  productId: PropTypes.string,
  productOwner: PropTypes.string
};

export default Comments;
