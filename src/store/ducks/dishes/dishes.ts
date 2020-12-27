import produce, { Draft } from 'immer';
import { createReducer, createActions } from 'reduxsauce';
import { Action, Reducer } from 'redux';

export type GetApiResponse = {
    readonly items: Array<Dish>;
    readonly categories: Array<unknown>;
};
export type State = {
    readonly all: GetApiResponse;
};

export type SetDishesAction = {
    readonly dishes: GetApiResponse;
};

export type ActionTypes = {
    SET_ALL: 'SET_ALL';
    FETCH_DISHES: 'FETCH_DISHES';
};
export type ActionCreators = {
    setAll: (options: SetDishesAction) => Action<State>;
    fetchDishes: () => Action<State>;
};

export const INITIAL_STATE: State = {
    all: {
        categories: [],
        items: [],
    },
};

// Actions
export const { Types, Creators } = createActions<ActionTypes, ActionCreators>(
    {
        // Ducks
        setAll: ['dishes'],
        // Sagas
        fetchDishes: [],
    },
    { prefix: 'dishes/' },
);

// Reducers
const setAll = produce(function setAll(
    draft: Draft<State> = INITIAL_STATE,
    action: SetDishesAction,
) {
    draft.all = action.dishes;
});

const reducer: Reducer<State, Action<ActionTypes>> = createReducer(
    INITIAL_STATE,
    {
        [Types.SET_ALL]: setAll,
    },
);

export default reducer;
