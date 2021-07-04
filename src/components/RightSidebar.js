import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState } from "react";
import mediaqueries from "../styles/media";
import ListItem from "./ListItem";
import Scrollspy from "react-scrollspy";

const RightSidebar = ({ tableOfContents, location }) => {
  const [listItems] = useState(() => {
    if (!tableOfContents.items) {
      return [];
    }
    const mappedLinks = [];
    function mapLinks(items) {
      items.forEach((item) => {
        if (item.title) {
          mappedLinks.push(item);
        }
        if (item.items) {
          mapLinks(item.items);
        }
      });
    }
    mapLinks(tableOfContents.items);
    return mappedLinks;
  });

  return (
    <RightSidebarWrapper>
      <RightSidebarNav>
        <RightSidebarTitle>Tabella dei Contenuti</RightSidebarTitle>
        <RightSidebarList>
          <Scrollspy
            items={listItems.map((item) => {
              return item.url.substring(1);
            })}
            currentClassName="is-current"
          >
            {listItems.map((item) => (
              <RightSidebarListItem key={item.url}>
                <ListItem location={location} item={item} />
              </RightSidebarListItem>
            ))}
          </Scrollspy>
        </RightSidebarList>
      </RightSidebarNav>
    </RightSidebarWrapper>
  );
};

const RightSidebarWrapper = styled.aside`
  display: none;
  flex: 0 0 23rem;
  font-size: 0.75rem;
  font-weight: 200;
  ${mediaqueries.desktop_medium_up`
    display: block
  `};
`;

const RightSidebarNav = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 18rem;
  height: 100%;
  padding: 7rem 0rem 0rem;
`;

const RightSidebarTitle = styled.p`
  margin-top: 0;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const RightSidebarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  & ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const RightSidebarListItem = styled.li`
  margin: 0.3rem 0;
`;

RightSidebar.propTypes = {
  tableOfContents: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default RightSidebar;
