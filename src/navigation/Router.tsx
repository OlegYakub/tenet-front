import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import * as pages from '../components/pages';

import * as ROUTES from './routes';

// eslint-disable-next-line
const RouterComponent = () => {
  const token = false;
  const loginedConfig = [

  ];
  const notLoginedConfig = [
    {
      id: 'app',
      path: ROUTES.APP_ROUTE,
      component: pages.AppPage,
      exact: true,
    },
  ];

  // const config = token ? loginedConfig : notLoginedConfig;
  const config = notLoginedConfig;

  return (
    <Switch>
      {config.map(route => (
        <Route
          key={route.id}
          path={route.path}
          render={routeProps => {
            const Component = route.component;
            return <Component {...routeProps}/>;
          }}
          exact={!!route.exact}
        />
      ))}
      {/*<Redirect to={{pathname: token ? ROUTES.DASHBOARD : ROUTES.LOGIN}}/>*/}
    </Switch>
  );
};

// const mapStateToProps = ({auth: {token}}) => ({
//   token: token,
// });

export default withRouter(RouterComponent);
