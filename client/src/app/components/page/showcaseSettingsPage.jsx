import React from "react";
import { useSelector } from "react-redux";
import { getUserShowcaseById } from "../../store/showcases";
import { useParams } from "react-router-dom";
import ProductsListSettings from "../ui/productsListSettings";
import ShowcaseForm from "../ui/form/showcaseForm";

const ShowcaseSettingsPage = () => {
  const { id } = useParams();
  const showcase = useSelector(getUserShowcaseById(id));
  const defaultData = showcase
    ? {
        name: showcase.name,
        description: showcase.description,
        img: showcase.img,
        address: showcase.address
      }
    : {
        name: "",
        description: "",
        img: "",
        address: ""
      };

  return (
    <>
      <ShowcaseForm defaultData={defaultData} showcaseId={id} />
      {id && <ProductsListSettings showcaseId={id} />}
    </>
  );
};

export default ShowcaseSettingsPage;
