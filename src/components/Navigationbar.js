import React from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDumbbell,
  faMedal,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

function Navigationbar() {
  return (
    <div>
      <Navbar color="primary">
        <Nav justified="true" pills>
          <NavItem>
            <NavLink className="nav-link" to="/">
              Profile <br></br>
              <FontAwesomeIcon icon={faUser} size="2x" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/exercises">
              Exercises <br></br>
              <FontAwesomeIcon icon={faDumbbell} size="2x" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/history">
              History <br></br>
              <FontAwesomeIcon icon={faMedal} size="2x" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/startworkout">
              Start Workout <br></br>
              <FontAwesomeIcon icon={faHeartPulse} size="2x" />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
