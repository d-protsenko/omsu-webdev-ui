import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import * as serviceWorker from './serviceWorker';
import Main from 'src/elements/pages/main/Main';
import BaseLayout from 'src/elements/layouts/base/BaseLayout';
import history from 'src/history/history';
import routes from 'src/routes/routes';

import './index.css';

const RouteWithLayout = ({ layout: Layout, component: Component, ...rest }) => (
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
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Router history={history}>
      <Switch>
        <RouteWithLayout exact path={routes.main} layout={BaseLayout} component={Main} />
      </Switch>
    </Router>
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
