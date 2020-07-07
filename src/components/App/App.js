import React from "react";
import { Route, Switch } from "react-router-dom";

import { SearchView, OverviewView, DiscoveryView } from "../../Views";

import Navigation from "../Navigation";

function App() {
	return (
		<Switch>
			<Navigation />
			<Route path="/seach/:query" component={SearchView} />
			<Route path="/movie/:id" component={OverviewView} />
			<Route exact path="/" component={DiscoveryView} />
		</Switch>
	);
}

export default App;
