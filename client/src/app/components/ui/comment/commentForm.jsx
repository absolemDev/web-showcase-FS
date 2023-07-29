import React, { useState } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import RatingInput from "./ratingInput";
import { useDispatch } from "react-redux";
import { addReplyComment, createComment } from "../../../store/comments";
import { Button } from "react-bootstrap";

const CommentForm = ({ id, targetId, type }) => {
  const initialData =
    type === "comment" ? { rating: 0, content: "" } : { content: "" };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]:
        target.name === "rating" ? Number(target.value) : target.value
    }));
    delete errors[target.name];
  };

  const validatorConfig = {
    rating: {
      isRequired: {
        message: "Оцените этот товар от 1 до 5"
      }
    },
    content: {
      isRequired: {
        message: "Отзыв не может быть пустым"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({ rating: 0, content: "" });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (type === "comment") {
      dispatch(createComment({ ...data, targetId })).then(() => clearForm());
    } else {
      dispatch(addReplyComment(data, id));
    }
  };

  return (
    <div>
      {type === "comment" && <div className="fs-5 fw-bolder">Отзыв</div>}
      <form onSubmit={handleSubmit}>
        {type === "comment" && (
          <RatingInput
            value={data.rating}
            onChange={handleChange}
            name="rating"
            error={errors.rating}
          />
        )}
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          name="content"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <Button className="add-rating-button" size="sm" type="submit">
            {type === "comment" ? "Оставить отзыв" : "Ответить"}
          </Button>
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string,
  targetId: PropTypes.string,
  type: PropTypes.string
};

export default CommentForm;
