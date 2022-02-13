import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Homepage from '../homepage/Homepage';
import LoginForm from '../auth/LoginForm';
import Servers from '../servers/Servers';
import Kitchen from '../kitchen/Kitchen';
import Bar from '../bar/Bar';
import ItemsList from '../items/ItemsList';

const Routes = () => {
	console.debug('AppRoutes');

	return (
		<Switch>
			<Route exact path="/">
				<Homepage />
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

			<Route exact path="/bar">
				<Bar />
			</Route>

			<Route exact path="/kitchen">
				<Kitchen />
			</Route>

			<Redirect to="/login" />
		</Switch>
	);
};

export default Routes;
