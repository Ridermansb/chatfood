import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as DishesCreators } from '@store/ducks/dishes/dishes';
import { ApplicationState } from '@store/ducks';
import searchIcon from '@assets/search.svg';

const SearchForm: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector<ApplicationState, string | undefined>(
        (state) => state.dishes.searchTerm,
    );
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(DishesCreators.setSearchTerm(event.target.value));
        },
        [dispatch],
    );

    return (
        <form data-testid="search-form">
            <h3>Search</h3>

            <div className="relative pt-6 w-full">
                <img
                    src={searchIcon}
                    className="absolute bottom-3 left-3"
                    alt="search icon"
                />
                <input
                    name="search"
                    type="search"
                    placeholder="Search for dishes..."
                    className="pl-9 w-full"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};

export default SearchForm;
