import React from "react";
import CardList from "../common/cardList";
import CardAddShowcase from "../ui/card/cardAddShowcase";
import { useSelector } from "react-redux";
import { getUserShowcases } from "../../store/showcases";
import CardShowcaseSettings from "../ui/card/cardShowcaseSettings";

const MyShowcasesPage = () => {
  const showcases = useSelector(getUserShowcases());

  return (
    <CardList items={showcases} defaultCard={CardAddShowcase}>
      <CardShowcaseSettings />
    </CardList>
  );
};

export default MyShowcasesPage;
