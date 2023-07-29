import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import CommentForm from "./commentForm";
import { useSelector } from "react-redux";
import { getUserById, getUserId } from "../../../store/user";
import { getShowcaseByProduct } from "../../../store/products";

const CommentWithReply = ({ comment }) => {
  const {
    _id: id,
    userId,
    targetId,
    rating,
    createdAt,
    content,
    reply
  } = comment;

  const user = useSelector(getUserById(userId));
  const showcase = useSelector(getShowcaseByProduct(targetId));
  const currentUserId = useSelector(getUserId());

  return (
    <>
      <Comment
        id={id}
        commentator={user}
        rating={rating}
        createdAt={createdAt}
        content={content}
        type="comment"
      />
      <div className="ps-3">
        {reply ? (
          <Comment
            commentator={showcase}
            content={reply.content}
            createdAt={reply.createdAt}
            type="reply"
          />
        ) : (
          <>
            {showcase.owner === currentUserId && (
              <CommentForm id={id} targetId={targetId} type="reply" />
            )}
          </>
        )}
      </div>
    </>
  );
};

CommentWithReply.propTypes = {
  comment: PropTypes.object
};

export default CommentWithReply;
