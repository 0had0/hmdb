import React from "react";
import { Route, Switch } from "react-router-dom";

import { SearchView, OverviewView, DiscoveryView } from "../../Views";

import Navigation from "../Navigation";
import LoginModal from "../LoginModal";

function App() {
	return (
		<React.Fragment>
			<Navigation />
			<LoginModal />
			<Switch>
				<Route path="/seach/:query" component={SearchView} />
				<Route path="/movies/:id" component={OverviewView} />
				<Route path="/tv/:id" component={OverviewView} />
				<Route exact path="/movies" component={SearchView} />
				<Route exact path="/tv" component={SearchView} />
				<Route exact path="/" component={DiscoveryView} />
			</Switch>
		</React.Fragment>
	);
}

export default App;
