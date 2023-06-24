import React from 'react';
import ReactDOM from 'react-dom/client';
import Wordspace from './components/Wordspace';
import Register from './components/Register';
import Login from './components/Login';
import WordspaceComp from './components/Wordspace';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <WordspaceComp usuarioLogueado={{username: "mjackunas", nombre: "Mauro Jackunas", contrasena:"Uba123"}}/>
);

