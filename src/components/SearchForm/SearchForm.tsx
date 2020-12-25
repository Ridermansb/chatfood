import * as React from 'react';
import searchIcon from '@assets/search.svg';

const SearchForm: React.FunctionComponent = () => {
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
                />
            </div>
        </form>
    );
};

export default SearchForm;
