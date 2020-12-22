import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('loads and displays greeting', async () => {
    // Arrange
    render(<App />);

    // Act
    await waitFor(() => screen.getByRole('heading'));

    // Assert
    expect(screen.getByRole('heading')).toHaveTextContent('chatfood');
});
