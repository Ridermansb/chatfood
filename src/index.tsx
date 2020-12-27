import './wdyr'; // <--- first import

import * as React from 'react';
import { render } from 'react-dom';
import { getCLS, getFID, getLCP } from 'web-vitals';
import { Provider } from 'react-redux';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import createStore from '@store';
import App from './App';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);

const root = document.querySelector('#root');
const store = createStore();
const renderApp = () =>
    render(
        <Provider store={store}>
            <App />
        </Provider>,

        root,
    );

requestAnimationFrame(renderApp);
