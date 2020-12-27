import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import createStore from '@store';
import App from './App';

describe('<App />', (): void => {
    it('should render search-form', async () => {
        expect.assertions(1);
        const store = createStore();
        // Arrange
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );

        // Act
        await screen.findByTestId('search-form');

        // Assert
        expect(screen.getByTestId('search-form')).toBeInTheDocument();
    });
});
