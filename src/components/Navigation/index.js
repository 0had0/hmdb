import React from "react";
import { Link } from "react-router-dom";

import { AppBar, AppBarTitle, Text, LocalMoviesFontIcon } from "react-md";

import Log from "./Log";
import SearchInput from "./Search";

import "./Navigation.css";

const Navigation = () => {
	return (
		<AppBar theme="default" className="navigation-outer">
			<AppBar theme="default" className="navigation-inner">
				<AppBarTitle>
					<Text to="/" component={Link} className="navigation-title">
						<LocalMoviesFontIcon className="navigation-logo" />
						&nbsp;HMDB
					</Text>
				</AppBarTitle>
				<div className="navigation-search-container">
					<SearchInput />
				</div>
				<Log />
			</AppBar>
		</AppBar>
	);
};

export default React.memo(Navigation);
