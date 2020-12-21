import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './App';

const root = document.querySelector('#root');
const renderApp = () => render(<App />, root);

requestAnimationFrame(renderApp);
