import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import { SearchView, OverviewView, DiscoveryView } from "../../Views";

import Navigation from "../Navigation";
import LoginModal from "../LoginModal";

import "./App.css";

class ScrollToTopClass extends React.Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return <React.Fragment />;
	}
}

const ScrollToTop = withRouter(ScrollToTopClass);

const WithFullPage = (Component) => () => (
	<div className="page-root">
		<ScrollToTop />
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
					path="/movie/:id"
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
