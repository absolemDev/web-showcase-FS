import React from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getProductById } from "../../store/products";
import { getShowcaseNameById } from "../../store/showcases";
import { getIsLoggedIn, getUserId } from "../../store/user";
import { LinkContainer } from "react-router-bootstrap";
import CommentForm from "../ui/comment/commentForm";
import CommentsList from "../ui/comment/commentsList";
import TargetInfo from "../ui/targetInfo";

const ProductPage = () => {
  const { id } = useParams();
  const { name, description, img, rate, price, owner, showcase } = useSelector(
    getProductById(id)
  );
  const showcaseName = useSelector(getShowcaseNameById(showcase));
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userId = useSelector(getUserId());

  return (
    <div className="product">
      <TargetInfo
        name={name}
        description={description}
        img={img}
        price={price}
        rate={rate}
        link={{ path: `/showcases/${showcase}`, name: showcaseName }}
      />
      <hr />
      <div>
        {isLoggedIn ? (
          <div className="ps-2">
            {userId !== owner && (
              <>
                <CommentForm targetId={id} type="comment" />
                <hr />
              </>
            )}
          </div>
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
      <div className="ps-2">
        <CommentsList targetId={id} />
      </div>
    </div>
  );
};

export default ProductPage;
