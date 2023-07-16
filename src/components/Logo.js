import React from "react";
import { NavbarBrand } from "reactstrap";
import logo from "../styles/images/oie_l8xkeuTDJC8Z-removebg-preview.png";

const Logo = () => {
  return (
    <NavbarBrand href="/" className="logo pt-5 pb-3">
      <img src={logo} alt="logo" className="logo-size" />
    </NavbarBrand>
  );
};

export default Logo;
