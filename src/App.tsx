import * as React from 'react';
import NavBar from '@components/NavBar';
import SearchForm from '@components/SearchForm';
import DishItem from '@components/DishItem';
import './assets/app.css';
import './assets/style.css';

const fakeDish: Dish = {
    id: '1',
    name: 'Chicken & Avocado',
    url: 'chicken-avocado',
    price: 3500,
    discount_rate: 0.1,
    stock: {
        availability: 100,
    },
    description:
        'Grilled chicken, avocado, tomato, iceberg lettuce and mayonnaise',
    photo:
        'https://chatfood-cdn.s3.eu-central-1.amazonaws.com/fe-code-challenge-1/chicken-avocado.jpg',
    category_id: '1',
};

const App: React.FunctionComponent = () => (
    <React.StrictMode>
        <NavBar />
        <SearchForm />
        <DishItem dish={fakeDish} />
    </React.StrictMode>
);

export default App;
