import produce, { Draft } from 'immer';
import { createReducer, createActions } from 'reduxsauce';
import { Action, Reducer } from 'redux';

export type CartItem = {
    readonly dish: Dish;
    readonly quantity: number;
};

export type State = {
    readonly items: CartItem[];
};
export type ActionTypes = {
    readonly ADD_ITEM: 'ADD_ITEM';
};
export type AddItemAction = {
    readonly dish: Dish;
};
export type ActionCreators = {
    addItem: (options: AddItemAction) => Action<State>;
};

export const INITIAL_STATE: State = {
    items: [],
};

// Actions
export const { Types, Creators } = createActions<ActionTypes, ActionCreators>(
    {
        // Ducks
        addItem: ['dish'],
    },
    { prefix: 'cart/' },
);

// Reducers
const addItem = produce(function setAll(
    draft: Draft<State> = INITIAL_STATE,
    action: AddItemAction,
) {
    const item = draft.items.find((item) => item.dish.id === action.dish.id);
    if (item) {
        item.quantity += 1;
    } else {
        draft.items.push({ quantity: 1, dish: action.dish });
    }
});

const reducer: Reducer<State, Action<ActionTypes>> = createReducer(
    INITIAL_STATE,
    {
        [Types.ADD_ITEM]: addItem,
    },
);

export default reducer;
