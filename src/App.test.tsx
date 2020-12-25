import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

describe('<App />', (): void => {
    it('should render search-form', async () => {
        expect.assertions(1);
        // Arrange
        render(<App />);

        // Act
        await waitFor(() => screen.getByTestId('search-form'));

        // Assert
        expect(screen.getByTestId('search-form')).toBeInTheDocument();
    });
});
