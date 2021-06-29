import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Themed } from 'theme-ui';
import { globalStyles } from '../styles';
import mediaqueries from '../styles/media';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const Layout = ({ children, tableOfContents, location, pageContext: {
    breadcrumb: { crumbs }, crumbLabel
  }, }) => {
    console.log(crumbs)
  const [navOpen, setNavOpen] = useState(false);
    if (crumbs[0].pathname === "/" && crumbs.length !== 1) {
        crumbs.splice(0,1);
    }
    crumbs.forEach(function (arrayItem) {
      arrayItem.pathname = arrayItem.pathname.replace(/\/\s*$/, "");
      arrayItem.crumbLabel = arrayItem.crumbLabel.toUpperCase()
    });
  
  
  return (
    <Themed.root>
      <Global styles={globalStyles} />
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <SiteWrapper>
        <LeftSidebar navOpen={navOpen} />
        <SiteContentWrapper>
       
          <SiteContent navOpen={navOpen}>
          <Breadcrumb crumbs={crumbs} crumbSeparator="›"/>
          {children}
          </SiteContent>
        
        </SiteContentWrapper>
        {tableOfContents.items && (
          <RightSidebar tableOfContents={tableOfContents} location={location} />
        )}
      </SiteWrapper>
    </Themed.root>
  );
};

const SiteWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  background: ${p => p.theme.colors.background};
  transition: background 0.25s var(--ease-in-out-quad);
`;

const SiteContentWrapper = styled.div`
  flex-grow: 1;
  min-width: 20vh;
`;

const SiteContent = styled.main`
  padding: 2rem 1rem 2rem;
  transition: 0.25s var(--ease-in-out-quad);
  
  opacity: ${p => (p.navOpen ? 0.3 : 1)};
  transform: ${p => (p.navOpen ? `translateX(16rem)` : null)};
  ${mediaqueries.desktop_up`
    transform: translateX(0);
    opacity: 1;
    padding: 7rem 2rem 0rem 6rem;
    max-width: 68rem;
  `};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  tableOfContents: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};




export default Layout;
