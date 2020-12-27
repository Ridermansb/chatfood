import { combineReducers } from 'redux';
import dishes, { ActionTypes as DishesActionCreators } from './dishes/dishes';
import cart, { ActionTypes as CartActionCreators } from './cart/cart';

const rootReducer = combineReducers({
    dishes,
    cart,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export type ApplicationActions = DishesActionCreators & CartActionCreators;

export default rootReducer;
