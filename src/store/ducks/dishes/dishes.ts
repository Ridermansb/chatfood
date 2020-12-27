import produce, { Draft } from 'immer';
import { createReducer, createActions } from 'reduxsauce';
import { Action, Reducer } from 'redux';

export type GetApiResponse = {
    readonly items: Array<Dish>;
    readonly categories: Array<unknown>;
};
export type State = {
    readonly all: GetApiResponse;
    readonly searchTerm?: string;
};

export type SetDishesAction = {
    readonly dishes: GetApiResponse;
};
export type SetSearchTermAction = {
    readonly term?: string;
};

export type ActionTypes = {
    SET_ALL: 'SET_ALL';
    SET_SEARCH_TERM: 'SET_SEARCH_TERM';
    FETCH_DISHES: 'FETCH_DISHES';
};
export type ActionCreators = {
    setAll: (options: SetDishesAction) => Action<State>;
    setSearchTerm: (term?: string) => Action<State>;
    fetchDishes: () => Action<State>;
};

export const INITIAL_STATE: State = {
    all: {
        categories: [],
        items: [],
    },
    searchTerm: undefined,
};

// Actions
export const { Types, Creators } = createActions<ActionTypes, ActionCreators>(
    {
        // Ducks
        setAll: ['dishes'],
        setSearchTerm: ['term'],
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
const setSearchTerm = produce(function setSearchTerm(
    draft: Draft<State> = INITIAL_STATE,
    action: SetSearchTermAction,
) {
    draft.searchTerm = action.term;
});

const reducer: Reducer<State, Action<ActionTypes>> = createReducer(
    INITIAL_STATE,
    {
        [Types.SET_ALL]: setAll,
        [Types.SET_SEARCH_TERM]: setSearchTerm,
    },
);

export default reducer;
