import { combineReducers } from 'redux';
import dishes, { ActionTypes as DishesActionCreators } from './dishes/dishes';

const rootReducer = combineReducers({
    dishes,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export type ApplicationActions = DishesActionCreators;

export default rootReducer;
