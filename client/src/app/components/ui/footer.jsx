import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark p-1">
      <Link
        to="https://github.com/absolemDev"
        className="text-light text-decoration-none"
      >
        &#169; absolemDev
      </Link>
    </footer>
  );
};

export default Footer;
