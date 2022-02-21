import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Homepage from '../homepage/Homepage';
import LoginForm from '../auth/UserPinForm';
import Servers from '../servers/Servers';
import Kitchen from '../kitchen/Kitchen';
import Bar from '../bar/Bar';
import ItemsList from '../items/ItemsList';
import Payments from '../common/Payments';
import CashOut from '../common/CashOut';
import UserPinForm from '../auth/UserPinForm';

const Routes = () => {
  console.debug('AppRoutes');

  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/pin">
        <UserPinForm />
      </Route>

      <Route exact path="/items">
        <ItemsList />
      </Route>

      <Route exact path="/login">
        <LoginForm />
      </Route>

      <Route exact path="/servers">
        <Servers />
      </Route>

      <Route exact path="/payments">
        <Payments />
      </Route>

      <Route exact path="/cashout">
        <CashOut />
      </Route>

      <Route exact path="/bar">
        <Bar />
      </Route>

      <Route exact path="/kitchen">
        <Kitchen />
      </Route>
      <Route render={() => <Redirect to="/servers" />} />
    </Switch>
  );
};

export default Routes;
