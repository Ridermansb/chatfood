import * as React from 'react';
import { memo } from 'react';

type Properties = {
    dish: Dish;
};

const DishItem: React.FunctionComponent<Properties> = memo(({ dish }) => {
    return (
        <div className="flex place-items-center">
            <div className="flex-1">
                <h4>{dish.name}</h4>
                <p className="py-2 text-gray">{dish.description}</p>
                <div>
                    <span className="font-bold">AED {dish.price}</span>
                    <span className="ml-2 text-gray line-through">
                        AED {dish.discount_rate}
                    </span>
                </div>
            </div>
            <div>
                {dish.photo && (
                    <img
                        src={dish.photo}
                        alt={dish.name}
                        className="w-24 rounded-2xl ml-2 inline-block align-middle"
                    />
                )}
            </div>
        </div>
    );
});
DishItem.displayName = 'DishItem';

export default DishItem;
