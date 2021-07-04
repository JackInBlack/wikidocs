import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { graphql, useStaticQuery } from "gatsby";
import { useFlexSearch } from "react-use-flexsearch";
import { Link } from "@reach/router";

const App = () => {
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
      obj.label = <Link to={dog.slug}>{dog.title}</Link>;
      newDogs.push(obj);
    });
    console.log(newDogs);
    return newDogs;
  };

  return (
    <div className="App">
      <h3>
        React-Select Async Dropdown -{" "}
        <a
          href="https://www.cluemediator.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clue Mediator
        </a>
      </h3>
      <pre>Input Value: "{inputValue}"</pre>
      <AsyncSelect
        hideSelectedOptions={false}
        cacheOptions
        removeSelected={false}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre>
    </div>
  );
};

export default App;
