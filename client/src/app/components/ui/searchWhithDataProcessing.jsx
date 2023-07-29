import React, { useEffect, useState } from "react";
import SearchField from "../common/form/searchField";
import { useDataProcessing } from "../../hooks/useDataProcessing";

const SearchWhithDataProcessing = () => {
  const [seach, setSearch] = useState("");
  const {
    searchRegExp,
    handleSearchRegExp,
    isShowcasesPage,
    isShowcasePage,
    isProductPage,
    getShowcaseName
  } = useDataProcessing();

  useEffect(() => {
    if (!searchRegExp) setSearch("");
  }, [searchRegExp]);

  const handleSearch = () => {
    const trimedValue = seach.trim();
    handleSearchRegExp(trimedValue);
  };

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleCancel = () => {
    setSearch("");
    handleSearchRegExp(null);
  };

  const renderPlaceholder = () => {
    return `Поиск по ${
      isShowcasesPage()
        ? "витринам..."
        : isShowcasePage()
        ? `"${getShowcaseName()}"...`
        : "товарим и услугам..."
    }`;
  };

  return (
    <SearchField
      value={seach}
      onChange={handleChange}
      onSearch={handleSearch}
      onCancel={handleCancel}
      placeholder={renderPlaceholder()}
      disabled={isProductPage()}
    />
  );
};

export default SearchWhithDataProcessing;
