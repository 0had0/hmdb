import React from "react";
import { Route, Switch } from "react-router-dom";

import { SearchView, OverviewView, DiscoveryView } from "../../Views";

import Navigation from "../Navigation";
import LoginModal from "../LoginModal";

import "./App.css";

const WithFullPage = (Component) => () => (
	<div className="page-root">
		<Component />
	</div>
);

function App() {
	return (
		<React.Fragment>
			<Navigation />
			<LoginModal />
			<Switch>
				<Route
					path="/seach/:query"
					component={WithFullPage(SearchView)}
				/>
				<Route
					path="/movies/:id"
					component={WithFullPage(OverviewView)}
				/>
				<Route path="/tv/:id" component={WithFullPage(OverviewView)} />
				<Route
					exact
					path="/movies"
					component={WithFullPage(SearchView)}
				/>
				<Route exact path="/tv" component={WithFullPage(SearchView)} />
				<Route exact path="/" component={WithFullPage(DiscoveryView)} />
			</Switch>
		</React.Fragment>
	);
}

export default App;
