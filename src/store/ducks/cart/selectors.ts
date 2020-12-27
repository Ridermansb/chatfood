import { createSelector } from 'reselect';
import { ApplicationState } from '@store/ducks';
import { CartItem } from '@store/ducks/cart/cart';

type DishIdProperties = {
    dishId: string;
};

const getItemsCart = (state: ApplicationState): CartItem[] => state.cart.items;
const getDishId = (
    state: ApplicationState,
    properties: DishIdProperties,
): string => properties.dishId;

export const getDishFromCart = createSelector(
    [getItemsCart, getDishId],
    (cartItems: CartItem[], dishId) => {
        return cartItems.find((cartItem) => cartItem.dish.id == dishId);
    },
);
