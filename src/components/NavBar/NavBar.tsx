import * as React from 'react';
import backIcon from '@assets/back.svg';

const NavBar: React.FunctionComponent = () => {
    return (
        <div className="text-charcoal mt-10 mb-8 px-5">
            <button>
                <img src={backIcon} alt="Back icon" />
            </button>
        </div>
    );
};

export default NavBar;
