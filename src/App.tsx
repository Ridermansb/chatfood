import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Creators as DishesCreators } from '@store/ducks/dishes/dishes';
import NavBar from '@components/NavBar';
import SearchForm from '@components/SearchForm';
import DishesList from '@components/DishesList';
import './assets/app.css';
import './assets/style.css';

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(DishesCreators.fetchDishes());
    }, [dispatch]);

    return (
        <React.StrictMode>
            <NavBar />
            <SearchForm />
            <DishesList />
        </React.StrictMode>
    );
};

export default App;
