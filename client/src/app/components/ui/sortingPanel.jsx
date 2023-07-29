import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDataProcessing } from "../../hooks/useDataProcessing";

const SortingPanel = () => {
  const { sortBy, handleSort, isProductPage, isShowcasesPage } =
    useDataProcessing();
  const sortFields = [
    {
      path: "name",
      label: "Название",
      hidden: isProductPage()
    },
    {
      path: "rate",
      label: "Рейтинг",
      hidden: isProductPage()
    },
    {
      path: "price",
      label: "Цена",
      hidden: isProductPage() || isShowcasesPage()
    }
  ];

  const renderSortArrow = (field) => {
    if (field.path === sortBy.path) {
      return sortBy.order === "asc" ? (
        <i className="bi bi-caret-up-fill"></i>
      ) : (
        <i className="bi bi-caret-down-fill"></i>
      );
    }
    return <i className="p-2"></i>;
  };

  const handleClick = (field) => {
    if (sortBy.path === field.path) {
      handleSort({
        ...sortBy,
        order: sortBy.order === "asc" ? "desc" : "asc"
      });
    } else {
      handleSort({ path: field.path, order: "asc" });
    }
  };

  return (
    <ButtonGroup className="ms-auto">
      {sortFields.map((field) => (
        <Button
          key={field.path}
          className={`py-0 border-0${field.hidden ? " d-none" : ""}`}
          variant="dark"
          onClick={() => handleClick(field)}
        >
          {renderSortArrow(field)}
          {field.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SortingPanel;
