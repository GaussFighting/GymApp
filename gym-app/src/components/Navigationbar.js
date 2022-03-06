import React from "react";
import { Nav, NavItem } from "reactstrap";
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
      <Nav justified pills>
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
    </div>
  );
}

export default Navigationbar;
