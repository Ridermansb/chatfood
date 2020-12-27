import React from 'react';
import { render, screen } from '@testing-library/react';
import DishItem from './DishItem';

const fakeDish: Dish = {
    id: '1',
    name: 'Chicken & Avocado',
    url: 'chicken-avocado',
    price: 3500,
    discount_rate: 0.1,
    stock: {
        availability: 100,
    },
    description:
        'Grilled chicken, avocado, tomato, iceberg lettuce and mayonnaise',
    photo:
        'https://chatfood-cdn.s3.eu-central-1.amazonaws.com/fe-code-challenge-1/chicken-avocado.jpg',
    category_id: '1',
};

describe('<DishItem />', (): void => {
    it('should render dish name', async () => {
        expect.assertions(1);

        // Arrange
        render(<DishItem dish={fakeDish} />);

        // Act
        await screen.findByText(fakeDish.name);

        // Assert
        expect(screen.getByText(fakeDish.name)).toBeInTheDocument();
    });
});
