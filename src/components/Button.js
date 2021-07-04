import styled from "@emotion/styled";
import React from "react";

const Button = ({ children }) => <StyledButton>{children}</StyledButton>;

const StyledButton = styled.button`
  padding: 0.6rem 1rem;
  background-color: ${(p) => p.theme.colors.primary};
  border: 0;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: background ${(p) => p.theme.transition};
  &:hover,
  &:focus {
    background-color: #0f0;
  }
`;

export default Button;
