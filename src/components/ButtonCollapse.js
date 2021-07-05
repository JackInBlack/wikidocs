import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import { BsChevronCompactRight } from "@react-icons/all-files/bs/BsChevronCompactRight";
import { BsChevronCompactDown } from "@react-icons/all-files/bs/BsChevronCompactDown";

const ButtonCollapse = ({ onClick, isCollapsed }) => {
  return (
    <StyledButtonCollapse
      onClick={onClick}
      aria-label="Apri navigazione interna"
      title="Apri navigazione interna"
    >
      {isCollapsed ? (
        <BsChevronCompactRight size={16} />
      ) : (
        <BsChevronCompactDown size={16} />
      )}
    </StyledButtonCollapse>
  );
};

const StyledButtonCollapse = styled.button`
  position: absolute;
  top: 0;
  right: 1.2rem;
  padding: 0.2rem;
  background-color: ${(p) => p.theme.colors.sidebar};
  height: 44px;

  border: 0;
  color: ${(p) => p.theme.colors.text};
  cursor: pointer;
  font-size: 1rem;
`;

ButtonCollapse.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool,
};

export default ButtonCollapse;
