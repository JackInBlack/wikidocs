import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';

const LogoWrapper = () => (
  <StyledLogoWrapper>
    <LogoLink to="/">
    <LogoImg><img src={require('/static/site-icon.png').default} height={24} width={24}/></LogoImg>
    WIKI DOCS
    </LogoLink>
  </StyledLogoWrapper>
);

const StyledLogoWrapper = styled.div`
  p {
    margin: 0;
    font-size: 1.6rem;
  }
`;

const LogoLink = styled(Link)`
  position:relative;
  align: center;
  display: inline-block;
  text-decoration: none;
  
  font-size: 20px;
  padding: 0rem 0.3rem 0rem;
  font-weight: bold;
  color: ${p => p.theme.colors.text};
  transition: color ${p => p.theme.transition};
  &:hover,
  &:focus {
    color: ${p => p.theme.colors.primary};
  }
`;



const LogoImg = styled(Link)`
  vertical-align: middle;
  margin-bottom: 0px;
  margin-left: auto;
  margin-right: auto;
  padding: 0rem 0.3rem 0rem;
`;

export default LogoWrapper;
