import React from "react";
import { Outlet } from "react-router-dom";
import BackHistoryButton from "../components/common/backButton";
import FilterGroupList from "../components/ui/filterGroupList";
import { useDataProcessing } from "../hooks/useDataProcessing";
import withDataProcessing from "../components/ui/hoc/withDataProcessing";
import SearchWhithDataProcessing from "../components/ui/searchWhithDataProcessing";
import SortingPanel from "../components/ui/sortingPanel";
import { paginate } from "../utils/paginate";
import Pagination from "../components/common/pagination";

const MainLayout = () => {
  const {
    filter,
    handleFilter,
    getListCategories,
    isShowcasePage,
    isProductPage,
    getEntities,
    currentPage,
    handlePageChange,
    getPageSize
  } = useDataProcessing();

  const categories = getListCategories();
  const entities = getEntities();
  const entitiesCount = entities.length;
  const entitiesCrop = paginate(entities, currentPage, getPageSize());

  return (
    <>
      <SearchWhithDataProcessing />
      <div className="row gx-0 flex-grow-1">
        <div className="col-3">
          <div className="px-3 py-2 text-white bg-dark">Категории:</div>
          <FilterGroupList
            items={categories}
            selectedValue={filter}
            onSelect={handleFilter}
            valueProperty="classifire"
            disabled={isProductPage()}
          />
        </div>
        <div className="col-9 border-start border-3 border-white d-flex flex-column">
          <div className="main-panel bg-dark text-light p-2 mb-1 d-flex">
            {(isShowcasePage() || isProductPage()) && <BackHistoryButton />}
            <SortingPanel />
          </div>
          <Outlet context={[entitiesCrop]} />
          {!isProductPage() && (
            <Pagination
              currentPage={currentPage}
              itemsCount={entitiesCount}
              onPageChange={handlePageChange}
              pageSize={getPageSize()}
            />
          )}
        </div>
      </div>
    </>
  );
};

const MainLayoutWhithDataProcessing = withDataProcessing(MainLayout);

export default MainLayoutWhithDataProcessing;
