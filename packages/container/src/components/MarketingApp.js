import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default() => {
    const ref = useRef(null);
    const brwsHistory = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: brwsHistory.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                const curPathname = brwsHistory.location;

                if (curPathname !== nextPathname) {
                    brwsHistory.push(nextPathname);
                }
            },
        });

        brwsHistory.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
}

