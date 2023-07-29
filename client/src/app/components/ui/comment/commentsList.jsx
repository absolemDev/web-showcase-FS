import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCommentsByTarget } from "../../../store/comments";
import CommentWithReply from "./commentWhithReply";

const CommentsList = ({ targetId }) => {
  const comments = useSelector(getCommentsByTarget(targetId));
  if (comments.length) {
    return comments.map((item) => (
      <CommentWithReply key={item._id} comment={item} />
    ));
  } else {
    return <div className="fw-bold">Этот товар еще не оценили</div>;
  }
};
CommentsList.propTypes = {
  targetId: PropTypes.string
};

export default CommentsList;
