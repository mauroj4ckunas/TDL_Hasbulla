import React from 'react';
import ReactDOM from 'react-dom/client';
import Wordspace from './Wordspace'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Wordspace/>
  </React.StrictMode>
);

