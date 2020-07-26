import React, { Suspense, lazy } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { LinearProgress } from "react-md";

import Navigation from "../Navigation";
import LoginModal from "../LoginModal";
import VideoDialog from "../VideoModal";

import "./App.css";

const Overview = lazy(() => import("views/overview"));
const Discovery = lazy(() => import("views/discovery"));
const Search = lazy(() => import("views/search"));
const Filter = lazy(() => import("views/filter"));

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

function App() {
	return (
		<React.Fragment>
			<Navigation />
			<LoginModal />
			<VideoDialog />
			<div className="page-root">
				<Suspense
					fallback={<LinearProgress id="page-linear-progress" />}
				>
					<ScrollToTop />
					<Switch>
						<Route path="/search" component={Search} />
						<Route path="/movie/:id" component={Overview} />
						<Route path="/tv/:id" component={Overview} />
						<Route path="/movies" component={Filter} />
						<Route path="/series" component={Filter} />
						<Route exact path="/" component={Discovery} />
					</Switch>
				</Suspense>
			</div>
		</React.Fragment>
	);
}

export default App;
