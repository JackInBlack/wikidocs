import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";

const LogoWrapper = () => (
  <StyledLogoWrapper>
    <LogoLink to="/">888WIKI DOCS</LogoLink>
  </StyledLogoWrapper>
);

const StyledLogoWrapper = styled.div`
  p {
    margin: 0;
    font-size: 1.6rem;
  }
`;

const LogoLink = styled(Link)`
  position: relative;
  align: center;
  display: inline-block;
  text-decoration: none;
  font-size: 25px;
  padding: 0rem 0.5rem 0rem;
  font-weight: normal;
  color: ${(p) => p.theme.colors.text};
`;

export default LogoWrapper;
