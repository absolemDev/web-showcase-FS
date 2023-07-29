import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../store/user";
import { dateStamp } from "../../../utils/dateStamp";
import Rating from "./rating";
import { removeComment } from "../../../store/comments";

const Comment = ({ id, commentator, rating, createdAt, content, type }) => {
  const currentUserId = useSelector(getUserId());

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeComment(id));
  };

  return (
    <div className="bg-light card-body mt-2">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={commentator.img}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {commentator.name}
                    {type === "comment" && <Rating value={rating} />}
                    {" - "}
                    <span className="small">
                      {dateStamp(new Date(createdAt))}
                    </span>
                  </p>
                  {currentUserId === commentator._id && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={handleRemove}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  id: PropTypes.string,
  commentator: PropTypes.object,
  rating: PropTypes.number,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string
};

export default Comment;
