import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import mediaqueries from '../../styles/media';
import Navigation from './Navigation';
import toc from "/content/888toc.json";

const treeify = () => {
  var idAttr = 'myId';
  var parentAttr = 'myParent';
  var childrenAttr = 'items';

  const treeList = [];
  const lookup = {};
  toc.forEach(obj => {
      lookup[obj[idAttr]] = obj;
      obj[childrenAttr] = [];
      obj.myAAttr.myHref = obj.myAAttr.myHref.replace(/\.[^/.]+$/, "");
  });
  toc.forEach(obj => {
      if(lookup[obj[parentAttr]])
      { 
        obj.myAAttr.myHref =  lookup[obj[parentAttr]].myAAttr.myHref + "/" + obj.myAAttr.myHref
        lookup[obj[parentAttr]][childrenAttr].push(obj)
      }
      else
      {
        treeList.push(obj)
      } 
  });
  return treeList;
}

const LeftSidebar = ({ navOpen }) => {
  return (
    <LeftSidebarWrapper>
      <LeftSidebarNav navOpen={navOpen} tree={treeify()}>
        <Navigation />
      </LeftSidebarNav>
    </LeftSidebarWrapper>
  );
};

const LeftSidebarWrapper = styled.aside`
  margin-left: -19rem;
  flex: 0 0 19rem;
  font-size: 0.875rem;
  ${mediaqueries.desktop_up`
    margin-left: 0;
  `};
`;

const LeftSidebarNav = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  border-right: 1px solid ${p => p.theme.colors.borderColor};
  overflow-x: scroll;
  overflow-y: auto;
  width: 19rem;
  height: 100%;
  padding: 1rem 0;
  background: ${p => p.theme.colors.sidebar};
  transition: 0.25s var(--ease-in-out-quad);
  transform: ${p => (p.navOpen ? `translateX(19rem)` : null)};
  ${mediaqueries.desktop_up`
    transform: translateX(0);
    padding: 6.6rem 0 1rem;
  `};
`;

LeftSidebar.propTypes = {
  navOpen: PropTypes.bool
};

export default React.memo(LeftSidebar);