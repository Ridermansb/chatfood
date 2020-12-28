import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore from '@store';
import DishesList from './DishesList';

describe('<DishesList />', () => {
    it('should render empty list', function () {
        expect.hasAssertions();
        const store = createStore();
        // Act
        render(
            <Provider store={store}>
                <DishesList />
            </Provider>,
        );

        const element = screen.queryByRole('listitem');

        // Expect
        expect(element).not.toBeInTheDocument();
    });

    it('should render items', function () {
        expect.hasAssertions();

        // Arrange
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

        const store = createStore({
            dishes: {
                all: {
                    items: [fakeDish],
                    categories: [],
                },
            },
            cart: {
                items: [],
            },
        });

        // Act
        act(() => {
            render(
                <Provider store={store}>
                    <DishesList />
                </Provider>,
            );
        });

        const element = screen.queryByRole('listitem');

        // Expect
        expect(element).toBeInTheDocument();
    });
});
