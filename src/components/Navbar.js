import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import { getUser } from "../services/user";
import { logout } from "../redux/actions/authActions";

import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

const NavbarMain = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(getUser());
  const [navbarColor, setNavbarColor] = useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  function handleLogout() {
    dispatch(logout());
    setUser(getUser());
  }

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <div>
      <Navbar
        className={`fixed-top ${navbarColor}`}
        color-on-scroll="300"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/home"
              title="Boticash"
              tag={Link}
            >
              Boticash
            </NavbarBrand>
            <button
              aria-expanded={navbarCollapse}
              className={`navbar-toggler navbar-toggler ${
                navbarCollapse ? "toggled" : ""
              }`}
              onClick={toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            navbar
            isOpen={navbarCollapse}
          >
            <Nav className="" navbar>
              {isAuthenticated() && (
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    exact
                    to="/compras"
                    activeClassName="active"
                  >
                    Compras
                  </NavLink>
                </NavItem>
              )}
              {isAuthenticated() && (
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    exact
                    to="/cashback"
                    activeClassName="active"
                  >
                    Cashback
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  exact
                  to="/sobre"
                  activeClassName="active"
                >
                  Sobre
                </NavLink>
              </NavItem>
              {isAuthenticated() ? (
                <>
                  <NavItem>
                    <NavLink color="info">Olá, {user.name}</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      exact
                      to="/home"
                      onClick={() => handleLogout()}
                      activeClassName="active"
                    >
                      Sair
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      exact
                      to="/entrar"
                      activeClassName="active"
                    >
                      Entrar
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <Link to="/registrar">
                      <Button color="info">Registre-se</Button>
                    </Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarMain;
