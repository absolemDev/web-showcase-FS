import React from "react";
import { Button } from "react-bootstrap";
import CardList from "../common/cardList";
import CardProduct from "../ui/card/cardProduct";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getShowcaseById } from "../../store/showcases";
import { getUserId } from "../../store/user";
import TargetInfo from "../ui/targetInfo";

const ShowcasePage = () => {
  const { id } = useParams();
  const { name, description, address, img, rate, owner } = useSelector(
    getShowcaseById(id)
  );
  const [entitiesCrop] = useOutletContext();
  const navigate = useNavigate();
  const userId = useSelector(getUserId());

  return (
    <div className="showcase flex-grow-1 position-relative">
      {userId === owner && (
        <Button
          variant="light"
          className="position-absolute top-0 end-0"
          onClick={() => navigate(`/my-showcases/${id}`)}
          size="sm"
        >
          <i className="bi bi-gear-fill"></i>
        </Button>
      )}
      <TargetInfo
        name={name}
        description={description}
        address={address}
        img={img}
        rate={rate}
      />
      <hr />
      <CardList items={entitiesCrop} textForEmptyItems="Список продуктов пуст">
        <CardProduct />
      </CardList>
    </div>
  );
};

export default ShowcasePage;
