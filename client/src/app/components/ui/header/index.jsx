import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { getIsLoggedIn } from "../../../store/user";
import NavProfile from "./navProfile";

const NavBar = () => {
  const { pathname } = useLocation();
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" className="p-0">
        <Container className="p-0">
          <Navbar.Brand href="/" className="ps-3">
            Logo
          </Navbar.Brand>
          <Nav className="me-auto" activeKey={"/" + pathname.split("/")[1]}>
            <Nav.Item>
              <LinkContainer to="/showcases">
                <Nav.Link className="p-3">Витрины</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/products">
                <Nav.Link className="p-3">Товары и услуги</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            {isLoggedIn && (
              <Nav.Item>
                <LinkContainer to="/my-showcases">
                  <Nav.Link className="p-3">Мои витрины</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavProfile />
            ) : (
              <LinkContainer to="/authorization">
                <Nav.Link>
                  <i className="bi bi-box-arrow-in-right fs-4 nav-profile px-2"></i>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
