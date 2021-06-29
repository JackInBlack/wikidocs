import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import { BsChevronCompactRight } from "@react-icons/all-files/bs/BsChevronCompactRight";
import { BsChevronCompactDown } from "@react-icons/all-files/bs/BsChevronCompactDown";

const ButtonCollapse = ({ onClick, isCollapsed }) => {
  return (
    <StyledButtonCollapse
      onClick={onClick}
      aria-label="Toggle Subnavigation"
      title="Toggle Subnavigation"
    >
      {isCollapsed ? <BsChevronCompactRight size={16} /> : <BsChevronCompactDown size={16} />}
    </StyledButtonCollapse>
  );
};

const StyledButtonCollapse = styled.button`
  position: absolute;
  top: 0;
  right: 1.2rem;
  padding: 0.2rem;
  height: 37px;
  background: none;
  border: 0;
  color: ${p => p.theme.colors.text};
  cursor: pointer;
  font-size: 1rem;
  &.is-active { 
    font-weight: bold;
    height: 60px;
  }
`;

ButtonCollapse.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool
};

export default ButtonCollapse;
