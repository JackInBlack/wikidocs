import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";
import Logo from "./icons/Logo";

const LogoWrapper = () => (
  <StyledLogoWrapper>
    <LogoLink to="/">
      <ButtonContainer>
        <Logo width={120} height={60} />
      </ButtonContainer>
    </LogoLink>
  </StyledLogoWrapper>
);

/*const StyledLogoWrapper = styled.div`
  p {
    margin: 0;
    font-size: 1.6rem;
  }
`;
*/

const ButtonContainer = styled.div`
  border-radius: 5px;
  display: flex;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.sidebar};
  transition: background-color ${(p) => p.theme.transition};
  &:hover {
    background-color: #ddd;
  }
`;

const StyledLogoWrapper = styled.div`
  margin: auto;
  display: block;
`;

const LogoLink = styled(Link)`
  text-align: center;
  display: block;
  text-decoration: none;
  color: ${(p) => p.theme.colors.text};
  transition: color ${(p) => p.theme.transition};
  &:hover,
  &:focus {
    color: ${(p) => p.theme.colors.primary};
  }
  svg {
    margin: auto;
    display: block;
  }
`;

export default LogoWrapper;
