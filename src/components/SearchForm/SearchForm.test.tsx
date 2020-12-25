import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('<SearchForm />', (): void => {
    it('should render have input with placeholder', async () => {
        expect.assertions(1);
        // Arrange
        render(<SearchForm />);

        // Act
        await waitFor(() =>
            screen.getByPlaceholderText('Search for dishes...'),
        );

        // Assert
        expect(
            screen.getByPlaceholderText('Search for dishes...'),
        ).toBeInTheDocument();
    });

    it('should have Search title', async () => {
        expect.assertions(1);
        // Arrange
        render(<SearchForm />);

        // Act
        await waitFor(() => screen.getByText('Search'));

        // Assert
        expect(screen.getByText('Search')).toBeInTheDocument();
    });
});
