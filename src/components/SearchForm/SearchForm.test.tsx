import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import createStore from '@store';
import { ApplicationState } from '@store/ducks';
import SearchForm from './SearchForm';

describe('<SearchForm />', (): void => {
    it('should render have input with placeholder', async () => {
        expect.assertions(1);

        // Arrange
        const store: Store<ApplicationState> = createStore();
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>,
        );

        // Act
        await screen.findByPlaceholderText('Search for dishes...');

        // Assert
        expect(
            screen.getByPlaceholderText('Search for dishes...'),
        ).toBeInTheDocument();
    });

    it('should have Search title', async () => {
        expect.assertions(1);

        // Arrange
        const store: Store<ApplicationState> = createStore();
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>,
        );

        // Act
        await screen.findByText('Search');

        // Assert
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('should update searchTerm once change the input search', function () {
        expect.assertions(2);

        // Arrange
        const store: Store<ApplicationState> = createStore();
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>,
        );

        // Act
        const searchBy = 'Chicken';
        userEvent.type(screen.getByRole('searchbox'), searchBy);

        // Assert
        expect(screen.getByRole('searchbox')).toHaveValue(searchBy);
        expect(store.getState().dishes.searchTerm).toBe(searchBy);
    });
});
