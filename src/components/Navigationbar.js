import React, { useState } from "react";
import { Navbar, Nav, NavItem, Collapse, NavbarToggler } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDumbbell,
  faMedal,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

const Navigationbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navTogglerClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Navbar color="primary pt-0 pb-0 " expand="md">
        <div className="toggler  py-3">
          <NavbarToggler onClick={toggle} className="navbar-light" />
        </div>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="justify-content-end" justified="true " navbar pills>
            <NavItem onClick={navTogglerClose}>
              <NavLink className="nav-link" to="/">
                PROFILE <br></br>
                <FontAwesomeIcon icon={faUser} size="2x" />
              </NavLink>
            </NavItem>
            <NavItem onClick={navTogglerClose}>
              <NavLink className="nav-link" to="/exercises">
                EXERCISES <br></br>
                <FontAwesomeIcon icon={faDumbbell} size="2x" />
              </NavLink>
            </NavItem>
            <NavItem onClick={navTogglerClose}>
              <NavLink className="nav-link" to="/history">
                HISTORY <br></br>
                <FontAwesomeIcon icon={faMedal} size="2x" />
              </NavLink>
            </NavItem>
            <NavItem onClick={navTogglerClose}>
              <NavLink className="nav-link" to="/startworkout">
                START WORKOUT <br></br>
                <FontAwesomeIcon icon={faHeartPulse} size="2x" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
