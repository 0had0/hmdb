import React from "react";
import {
	Text,
	Card,
	AppBar,
	AppBarAction,
	SearchFontIcon,
	TextField,
	FilterListFontIcon,
	Button,
} from "react-md";

import "./SearchView.css";

export default () => {
	return (
		<React.Fragment>
			<AppBar className="search-nav-outer">
				<AppBar className="search-nav-inner">
					<div className="search-nav-input-box">
						<SearchFontIcon id="search-nav-input-icon" />
						<TextField
							theme="none"
							id="search-field"
							className="search-nav-input"
							name="seach"
							placeholder="Movie or Tv"
						/>
					</div>
					<AppBarAction last>
						<Button buttonType="icon">
							<FilterListFontIcon />
						</Button>
					</AppBarAction>
				</AppBar>
			</AppBar>
			<Card></Card>
			<main></main>
		</React.Fragment>
	);
};
