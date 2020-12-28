import './wdyr'; // <--- first import

import * as React from 'react';
import { render } from 'react-dom';
import { getCLS, getFID, getLCP } from 'web-vitals';
import { Provider } from 'react-redux';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import createStore from '@store';
import { ApplicationState } from '@store/ducks';
import App from './App';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);

const root = document.querySelector('#root');

function getStateFromStorage(): ApplicationState | undefined {
    try {
        const stateString = localStorage.getItem('state');
        if (!stateString) {
            return;
        }

        return JSON.parse(stateString);
    } catch {
        return;
    }
}

const initialState = getStateFromStorage();

const store = createStore(initialState);

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
});

const renderApp = () =>
    render(
        <Provider store={store}>
            <App />
        </Provider>,

        root,
    );

requestAnimationFrame(renderApp);
