import React from "react";
import { Outlet } from "react-router-dom";

const ServicesLayout = () => {
  return (
    <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <Outlet />
    </div>
  );
};

export default ServicesLayout;
