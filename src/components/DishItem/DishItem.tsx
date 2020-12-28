import * as React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { CartItem, Creators as CartCreators } from '@store/ducks/cart/cart';
import { getDishFromCart } from '@store/ducks/cart/selectors';
import { ApplicationState } from '@store/ducks';

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

    const dispatch = useDispatch();

    const itemOnCart = useSelector<ApplicationState, CartItem | undefined>(
        (state) => getDishFromCart(state, { dishId: dish.id }),
    );

    const itemOnCartQuantity = useMemo<number | undefined>(
        () => itemOnCart?.quantity,
        [itemOnCart?.quantity],
    );

    const itemClass = clsx('flex-1', {
        'border-l-8 border-primary pl-5': itemOnCart,
        'pl-6': !itemOnCart,
    });
    const rootClass = clsx('flex place-items-center');

    const hasItemOnStock = useMemo<boolean>(() => {
        const itemQuantity = itemOnCartQuantity || 0;
        return dish.stock?.availability > itemQuantity;
    }, [dish.stock, itemOnCartQuantity]);

    const handleClick = useCallback(() => {
        if (hasItemOnStock) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(CartCreators.addItem(dish));
        }
    }, [dish, dispatch, hasItemOnStock]);

    return (
        <div className={rootClass}>
            <div
                className={itemClass}
                onClick={handleClick}
                onKeyPress={handleClick}
                tabIndex={0}
                role="button"
            >
                <h4>
                    {itemOnCartQuantity && itemOnCartQuantity > 1 && (
                        <span>{itemOnCartQuantity} x </span>
                    )}
                    {dish.name}
                </h4>
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
