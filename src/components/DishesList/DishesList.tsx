import * as React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@store/ducks';
import { GetApiResponse } from '@store/ducks/dishes/dishes';
import DishItem from '@components/DishItem';

const DishesList: React.FunctionComponent = () => {
    const dishes = useSelector<ApplicationState, GetApiResponse>(
        (state) => state.dishes.all,
    );

    return (
        <ul>
            {dishes.items.map((dish: Dish) => (
                <li className="py-6 border-b-2 border-gray-light" key={dish.id}>
                    <DishItem dish={dish} />
                </li>
            ))}
        </ul>
    );
};

export default DishesList;
