import * as React from 'react';
import { memo, useMemo } from 'react';

type Properties = {
    dish: Dish;
};

const currencyFormatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'AED',
});

function formatPrice(value: number): string {
    return currencyFormatter.format(value);
}

const DishItem: React.FunctionComponent<Properties> = memo(({ dish }) => {
    const originalPrice = useMemo(() => formatPrice(dish.price), [dish.price]);
    const discountPrice = useMemo(
        () => formatPrice(dish.price - dish.price * dish.discount_rate),
        [dish.discount_rate, dish.price],
    );

    return (
        <div className="flex place-items-center">
            <div className="flex-1">
                <h4>{dish.name}</h4>
                <p className="py-2 text-gray">{dish.description}</p>
                <div>
                    <span className="font-bold">
                        {dish.discount_rate > 0 ? discountPrice : originalPrice}
                    </span>
                    {dish.discount_rate > 0 && (
                        <span className="ml-2 text-gray line-through">
                            {originalPrice}
                        </span>
                    )}
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
