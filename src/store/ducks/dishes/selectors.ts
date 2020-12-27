import { createSelector } from 'reselect';
import { ApplicationState } from '@store/ducks';

const getSearchTermSelector = (state: ApplicationState): string | undefined =>
    state.dishes.searchTerm;
const getDishesSelector = (state: ApplicationState): Dish[] =>
    state.dishes.all.items;

export const getFiltered = createSelector(
    [getSearchTermSelector, getDishesSelector],
    (searchTerm: string | undefined, dishes: Dish[]) => {
        const regex = new RegExp(searchTerm?.toLowerCase() || '', 'img');
        regex.lastIndex = 0;
        return searchTerm
            ? dishes.filter((dish) => dish.name.match(regex))
            : dishes;
    },
);
