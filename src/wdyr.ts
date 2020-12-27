/// <reference types="@welldone-software/why-did-you-render" />

import React from 'react';

if (__DEVELOPMENT__) {
    import('@welldone-software/why-did-you-render')
        .then((whyDidYouRender: any) => whyDidYouRender.default)
        .then((whyDidYouRender: any) => {
            whyDidYouRender(React, {
                trackAllPureComponents: true,
                trackExtraHooks: [[require('react-redux/lib'), 'useSelector']],
                logOnDifferentValues: true,
            });
        });
}
