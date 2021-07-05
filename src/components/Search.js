import React, { useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "@reach/router";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import MagnifyingGlass from "./icons/MagnifyingGlass";
import styled from "@emotion/styled";

const Search = () => {
  const result = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
      tree {
        content
      }
    }
  `);

  const { index, store } = result.localSearchPages;
  const gerarchia = JSON.parse(result.tree.content);
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
  };
  const findUrl = (slug, arr) => {
    return arr.reduce((a, item) => {
      if (a) return a;
      else if (item.url.includes(slug)) return item.url;
      else return findUrl(slug, item.items);
    }, null);
  };
  const unFlattenResults = (results, tree) =>
    results.map((post) => {
      const { excerpt, title } = post;
      var slug = findUrl(post.slug, tree);
      return { slug, title, excerpt };
    });
  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const results = unFlattenResults(
    useFlexSearch(inputValue, index, store),
    gerarchia
  );

  // load options using API call
  const loadOptions = async () => {
    const newDogs = [];
    results.forEach((dog, index) => {
      const obj = {};
      obj.value = <Link to={dog.slug}></Link>;
      obj.label = (
        <NavItemLink to={dog.slug}>
          <div>
            <p style={{ fontWeight: "bold" }}>{dog.title}</p>
            <p>{dog.excerpt}</p>
          </div>
        </NavItemLink>
      );
      newDogs.push(obj);
    });
    console.log(newDogs);
    return newDogs;
  };

  return (
    <div>
      <AsyncSelect
        placeholder="cerca..."
        cacheOptions
        styles={{ NoOptionsMessage }}
        components={{ DropdownIndicator, NoOptionsMessage }}
        removeSelected={true}
        loadOptions={loadOptions}
        controlShouldRenderValue={false}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </div>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      {/* <ErrorIcon primaryColor={colourOptions[3].color} /> */}
      <MagnifyingGlass />
    </components.DropdownIndicator>
  );
};
const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      nessun risultato
    </components.NoOptionsMessage>
  );
};

const NavItemLink = styled(Link)`
  display: inline-block;
  overflow-wrap: break-word;
  padding: 0.5rem 1.8rem 0.5rem 1.2rem;
  width: 90%;
  color: ${(p) => p.theme.colors.text};
  font-weight: normal;
  text-decoration: none;
  transition: color ${(p) => p.theme.transition};
  &:focus,
  &:hover {
    text-decoration: none;
    color: #01447e;
  }
`;

export default Search;
