import React, { useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import { Formik, Form, Field } from "formik";
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import AsyncSelect from "react-select/async";

const findUrl = (slug, arr) => {
  return arr.reduce((a, item) => {
    if (a) return a;
    if (item.myAAttr.myHref.includes(slug)) return item.myAAttr.myHref;
    if (item.items) return findUrl(slug, item.items);
  }, null);
};

const unFlattenResults = (results, tree) =>
  results.map((post) => {
    const { excerpt, title } = post;
    var slug = findUrl(post.slug, tree);
    return { slug, title, excerpt };
  });

const Result = ({ results }) => {
  {
    console.log(results);
  }
  return (
    <AsyncSelect
      loadOptions={results.map((name) => {
        console.log({ label: name.title, value: name.slug });
        return { label: name, value: name };
      })}
    />
  );
};

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
  const [query, setQuery] = useState(null);
  const results = useFlexSearch(query, index, store);
  console.log(unFlattenResults(results, gerarchia));

  /*const ResultList = () => {
        if (results.length > 0) {
          return results.map((page, i) => (
            <div className="item-search" key={i}>
              <Link to={page.url} className="link">
                <h4>{page.title}</h4>
              </Link>
            </div>
          ))
        } else if (query.length > 2) {
          return 'No results for ' + query
        } else if (
          results.length === 0 &&
          query.length > 0
        ) {
          return 'Please insert at least 3 characters'
        } else {
          return ''
        }
      }
*/
  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setQuery(values.query);
          setSubmitting(false);
        }}
      >
        <Form>
          <Input name="query" placeholder="cerca" className="fa" />
        </Form>
      </Formik>
      <select>
        {results.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  ); /*
  return (
    <Formik
      initialValues={{ flavors: "" }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setQuery(values.flavors);
        setSubmitting(false);
      }}
    >
      {(props) => {
        const { values, handleSubmit, handleBlur, setFieldValue } = props;
        return (
          <form onSubmit={handleSubmit}>
            <div style={{ width: "200px", marginBottom: "15px" }}>
              <Select
                components={{ DropdownIndicator, IndicatorSeparator: null }}
                id={"flavors"}
                type={"text"}
                value={values.flavors}
                onChange={(option) => setFieldValue("query", values.flavors)}
                options={options}
                onBlur={handleBlur}
              />
              {console.log(query)}
            </div>
          </form>
        );
      }}
    </Formik>
  );*/
};

const Input = styled(Field)`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0.5rem;

  &:focus,
  &:active {
    box-shadow: rgb(210, 213, 217) 0px 0px 2px 1px,
      rgb(227, 230, 232) 0px 0px 0px 3px;
    border: 1px solid rgb(26, 33, 43);
    outline: none;
  }
`;
const DropdownIndicator = () => (
  <div css={{ height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);
const Menu = (props) => {
  const shadow = "hsla(218, 50%, 10%, 0.1)";
  return (
    <div
      css={{
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: "absolute",
        zIndex: 2,
      }}
      {...props}
    />
  );
};
const Blanket = (props) => (
  <div
    css={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1,
    }}
    {...props}
  />
);
const Dropdown = ({ children, isOpen, target, onClose }) => (
  <div css={{ position: "relative" }}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);
const Svg = (p) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
);

const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
);

export default Search;
