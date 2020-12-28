import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import backIcon from '@assets/back.svg';
import { Creators as CartCreators } from '@store/ducks/cart/cart';

const NavBar: React.FunctionComponent = () => {
    const dishpatch = useDispatch();
    const handleBackClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            dishpatch(CartCreators.reset());
        },
        [dishpatch],
    );
    return (
        <div className="text-charcoal mt-10 mb-8 px-5">
            <button onClick={handleBackClick}>
                <img src={backIcon} alt="Back icon" />
            </button>
        </div>
    );
};

export default NavBar;
