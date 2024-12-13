import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import App from './App';

export function render() {
  const helmetContext = {};
  
  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  );

  const helmet = (helmetContext as { helmet: HelmetServerState }).helmet;

  return { html, helmet };
}