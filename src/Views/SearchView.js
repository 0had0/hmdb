import React, { useState } from "react";
import {
	AppBar,
	SearchFontIcon,
	TextField,
	FilterListFontIcon,
	TabsManager,
	TabPanel,
	Tabs,
	TabPanels,
	DropdownMenu,
} from "react-md";
import { useHistory, useLocation } from "react-router-dom";

import SearchList from "../components/SearchList";

import "./SearchView.css";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchView = () => {
	const history = useHistory();

	const [query, setQuery] = useState(useQuery().get("q"));
	const [sort, setSort] = useState(null);

	const _handleChange = (e) => setQuery(e.target.value);
	const _handleKeyUp = (evt) => {
		evt.preventDefault();
		if (evt.key === "Enter") {
			query !== "" && history.push(`/search/?q=${query}`);
		}
	};

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
							onChange={_handleChange}
							onKeyUp={_handleKeyUp}
						/>
					</div>

					<DropdownMenu
						id="sort-dropdown"
						items={[
							{
								children: "Rating",
								onClick: () => setSort("Rating"),
							},
							{
								children: "Year",
								onClick: () => setSort("Year"),
							},
						]}
						buttonType="icon"
						aria-label="Sort"
					>
						<FilterListFontIcon style={{ color: "#fff" }} />
					</DropdownMenu>
				</AppBar>
			</AppBar>
			<TabsManager tabs={["Movies", "Series"]} tabsId="basic-usage-tabs">
				<Tabs className="tabs" />
				<TabPanels
					style={{
						width: "100%",
					}}
				>
					<TabPanel
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<SearchList media_type={"movie"} sort={sort} />
					</TabPanel>
					<TabPanel
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<SearchList media_type={"tv"} sort={sort} />
					</TabPanel>
				</TabPanels>
			</TabsManager>
		</React.Fragment>
	);
};

export default SearchView;
