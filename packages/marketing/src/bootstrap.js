import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';



//Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const memHistory =
        defaultHistory ||
        createMemoryHistory({
            initialEntries:[initialPath],
        });

    if (onNavigate) {
        memHistory.listen(onNavigate);
    }

    ReactDOM.render(<App history={memHistory} />, el);

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = memHistory.location;
            if (pathname !== nextPathname) {
                memHistory.push(nextPathname);
            }
        },
    };
}

// if we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if (devRoot){
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// We are running through container
// and we should export the mount function
export { mount };
