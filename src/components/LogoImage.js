import styled from "@emotion/styled";
import React from "react";
import Logo from "/static/888SP-LOGO.png";

const LogoImage = () => {
  return (
    <NavLogo>
      <img src={Logo} alt="Logo" />
    </NavLogo>
  );
};
const NavLogo = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
`;

export default LogoImage;
