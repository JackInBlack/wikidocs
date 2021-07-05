import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import useCycleColor from "../hooks/useCycleColor";
import mediaqueries from "../styles/media";
import ColorToggle from "./icons/ColorToggle";
import IconButton from "./icons/IconButton";
import Menu from "./icons/Menu";
import LogoWrapper from "./LogoWrapper";

const Header = ({ navOpen, setNavOpen }) => {
  const { cycleColorMode } = useCycleColor();
  return (
    <StyledHeader navOpen={navOpen}>
      <HeaderSection>
        <NavIconButton>
          <IconButton
            label="Apri Navigazione"
            icon={<Menu />}
            size={30}
            onClick={() => {
              setNavOpen(!navOpen);
            }}
          />
        </NavIconButton>
        <LogoWrapper />
      </HeaderSection>
      <HeaderSection>
        <ButtonContainer>
          <IconButton
            label="Cambia Tema"
            icon={<ColorToggle />}
            size={30}
            onClick={cycleColorMode}
          />
        </ButtonContainer>
      </HeaderSection>
    </StyledHeader>
  );
};
const ButtonContainer = styled.div`
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.sidebar};
  transition: background-color ${(p) => p.theme.transition};
  &:hover {
    background-color: #ddd;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  z-index: 5;
  background-color: ${(p) => p.theme.colors.sidebar};
  transition: all 0.25s var(--ease-in-out-quad);
  border-bottom: 1px solid ${(p) => p.theme.colors.borderColor};
  transform: ${(p) => (p.navOpen ? `translateX(16rem)` : null)};
  ${mediaqueries.desktop_up`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0.5rem 1.2rem;
    transform: translateX(0);

  `};
`;

const NavIconButton = styled.div`
  display: flex;
  margin-right: 1rem;
  ${mediaqueries.desktop_up`
    display: none;
  `};
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
`;

Header.propTypes = {
  navOpen: PropTypes.bool,
  setNavOpen: PropTypes.func,
};

export default Header;
