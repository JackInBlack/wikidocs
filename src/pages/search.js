import React, { useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { Formik, Form, Field } from 'formik'
import { graphql, useStaticQuery } from 'gatsby';

const SearchBar = () => {
    const result = useStaticQuery(graphql`
    query{
    localSearchPages {
      index
      store
    }
}
`
);

  const {index, store} = result.localSearchPages
  const [query, setQuery] = useState(null)
  const results = useFlexSearch(query, index, store)
  return (
    <div>
      <Formik
        initialValues={{ query: '' }}
        
        onSubmit={(values, { setSubmitting }) => {
          setQuery(values.query)
          setSubmitting(false)
        }}
      >
        <Form>
          <Field name="query" placeholder="cerca"/>
        </Form>
      </Formik>
      <h1>Results</h1>
      <ul>
        {results.map(resultado => (
          <li key={resultado.id}>{resultado.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar
