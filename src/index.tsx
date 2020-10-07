import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from 'src/elements/pages/app/App';
import BaseLayout from 'src/elements/layouts/base/BaseLayout';
import store from 'src/store/store';
import history from 'src/history/history';
import routes from 'src/routes/routes';

import './index.css';
import './vendor/normalize.css';

const RouteWithLayout = ({layout: Layout, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )}
    />
);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <RouteWithLayout
                    exact
                    path={routes.main}
                    layout={BaseLayout}
                    component={App}
                />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
