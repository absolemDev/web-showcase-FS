import React from "react";
import CardList from "../common/cardList";
import CardShowcase from "../ui/card/cardShowcase";
import CardProduct from "../ui/card/cardProduct";
import { useDataProcessing } from "../../hooks/useDataProcessing";
import { useOutletContext } from "react-router-dom";

const MainPage = () => {
  const [entitiesCrop] = useOutletContext();
  const { isShowcasesPage } = useDataProcessing();

  const renderTextForEmptyItems = () =>
    `Список ${isShowcasesPage() ? "витрин" : "товаров и услуг"} пуст`;

  return (
    <div className="flex-grow-1">
      <CardList
        items={entitiesCrop}
        textForEmptyItems={renderTextForEmptyItems()}
      >
        {isShowcasesPage() ? <CardShowcase /> : <CardProduct />}
      </CardList>
    </div>
  );
};

export default MainPage;
