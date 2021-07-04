import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import NavItem from "./NavItem";

const Navigation = () => {
  const result = useStaticQuery(graphql`
    query {
      tree {
        content
      }
    }
  `);

  const gerarchia = JSON.parse(result.tree.content);

  return (
    <NavList>
      {gerarchia.map((item) => (
        <NavItem key={item.myAAttr.myHref} item={item} />
      ))}
    </NavList>
  );
};

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export default React.memo(Navigation);
