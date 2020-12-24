import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

describe('<App>', (): void => {
    it('loads and displays greeting', async () => {
        expect.assertions(1);
        // Arrange
        render(<App />);

        // Act
        await waitFor(() => screen.getByRole('heading'));

        // Assert
        expect(screen.getByRole('heading')).toHaveTextContent('chatfood');
    });
});
