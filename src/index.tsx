import 'babel-polyfill';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import App from './app';

const container = document.getElementById('root');
render(
  <BrowserRouter basename="spell_practice">
    <App />
  </BrowserRouter>,
  container
);

declare const module: {
  hot: any
};
if (module !== undefined && module.hot) {
  module.hot.accept()
}