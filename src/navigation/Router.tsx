import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import * as pages from '../components/pages';
import * as ROUTES from './routes';

const RouterComponent = () => {
  return (
    <Switch>
      <Route exact={true} path={ROUTES.APP_ROUTE} component={pages.AppPage} />
    </Switch>
  );
};

export default withRouter(RouterComponent);
