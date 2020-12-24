import * as React from 'react';
import { render } from 'react-dom';
import { getCLS, getFID, getLCP } from 'web-vitals';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './App';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);

const root = document.querySelector('#root');
const renderApp = () => render(<App />, root);

requestAnimationFrame(renderApp);
