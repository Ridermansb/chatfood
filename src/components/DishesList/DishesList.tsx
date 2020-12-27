import * as React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@store/ducks';
import { getFiltered } from '@store/ducks/dishes/selectors';
import DishItem from '@components/DishItem';

const DishesList: React.FunctionComponent = () => {
    const dishes = useSelector<ApplicationState, Dish[]>((state) =>
        getFiltered(state),
    );

    console.log(dishes);

    return (
        <ul>
            {dishes.map((dish: Dish) => (
                <li className="py-6 border-b-2 border-gray-light" key={dish.id}>
                    <DishItem dish={dish} />
                </li>
            ))}
        </ul>
    );
};

export default DishesList;
