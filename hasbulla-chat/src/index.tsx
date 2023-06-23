import React from 'react';
import ReactDOM from 'react-dom/client';
import Wordspace from './components/Wordspace';
import Register from './components/Register';
import Login from './components/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Login/>
);

