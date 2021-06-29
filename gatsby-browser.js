import React from 'react';
import GlobalContextProvider from './src/context/GlobalContextProvider';
import '/src/styles/breadcrumb.css';

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
);
