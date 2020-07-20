import React, { useState, useEffect } from "react";
import {
	AppBar,
	AppBarAction,
	SearchFontIcon,
	TextField,
	FilterListFontIcon,
	TabsManager,
	TabPanel,
	Tabs,
	TabPanels,
} from "react-md";
import { useHistory, useLocation } from "react-router-dom";

import SearchList from "../components/SearchList";

import "./SearchView.css";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchView = () => {
	const history = useHistory();

	const [query, setQuery] = useState(useQuery().get("q"));

	const _handleSearch = (e) => setQuery(e.target.value);
	const _handleKeyUp = (evt) => {
		evt.preventDefault();
		if (evt.key === "Enter") {
			history.push(`/search/?q=${query}`);
		}
	};

	useEffect(() => {
		history.push(`/search/?q=${query}`);
	}, [query, history]);

	return (
		<React.Fragment>
			<AppBar className="search-nav-outer">
				<AppBar className="search-nav-inner">
					<div className="search-nav-input-box">
						<SearchFontIcon id="search-nav-input-icon" />
						<TextField
							id="search-field"
							className="search-nav-input"
							name="seach"
							theme="none"
							placeholder="Movie or Tv"
							value={query}
							onChange={_handleSearch}
							onKeyUp={_handleKeyUp}
						/>
					</div>
					<AppBarAction last>
						<FilterListFontIcon style={{ color: "#fff" }} />
					</AppBarAction>
				</AppBar>
			</AppBar>
			<TabsManager tabs={["Movies", "Series"]} tabsId="basic-usage-tabs">
				<Tabs className="tabs" />
				<TabPanels style={{ width: "100%" }}>
					<TabPanel>
						<SearchList media_type={"movie"} query={query} />
					</TabPanel>
					<TabPanel>
						<SearchList media_type={"tv"} query={query} />
					</TabPanel>
				</TabPanels>
			</TabsManager>
		</React.Fragment>
	);
};

export default SearchView;
