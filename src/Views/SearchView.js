import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	Text,
	Card,
	AppBar,
	AppBarAction,
	SearchFontIcon,
	Chip,
	TextField,
	FilterListFontIcon,
	Button,
	IconRotator,
	KeyboardArrowDownSVGIcon,
	CardHeader,
	CardTitle,
	CardContent,
	VideocamFontIcon,
	TvFontIcon,
	useToggle,
	Collapse,
} from "react-md";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import SearchList from "../components/SearchList";
import Filter from "../components/Filter";

import { fetch_search_result } from "../actions/appActions";

import "./SearchView.css";

const GENRES = [
	{
		id: 10759,
		name: "Action & Adventure",
	},
	{
		id: 16,
		name: "Animation",
	},
	{
		id: 35,
		name: "Comedy",
	},
	{
		id: 80,
		name: "Crime",
	},
	{
		id: 99,
		name: "Documentary",
	},
	{
		id: 18,
		name: "Drama",
	},
	{
		id: 10751,
		name: "Family",
	},
	{
		id: 10762,
		name: "Kids",
	},
	{
		id: 9648,
		name: "Mystery",
	},
	{
		id: 10763,
		name: "News",
	},
	{
		id: 10764,
		name: "Reality",
	},
	{
		id: 10765,
		name: "Sci-Fi & Fantasy",
	},
	{
		id: 10766,
		name: "Soap",
	},
	{
		id: 10767,
		name: "Talk",
	},
	{
		id: 10768,
		name: "War & Politics",
	},
	{
		id: 37,
		name: "Western",
	},
	{
		id: 28,
		name: "Action",
	},
];

const useQuery = () => new URLSearchParams(useLocation().search);

const Filters = ({ actions, states }) => {
	const [setMediaType, setGenres] = actions;
	const [, genres] = states;
	return (
		<React.Fragment>
			<Filter
				label="Type"
				action={setMediaType}
				render={(action) => (
					<React.Fragment>
						<Button onClick={() => action("movie")}>movies</Button>
						<Button onClick={() => action("tv")}>series</Button>
					</React.Fragment>
				)}
			/>
			<Filter
				label="Genres"
				action={setGenres}
				state={genres}
				render={(action, state) => {
					return GENRES.map(({ id, name }) => {
						const selected = state.includes(id);
						const _handleClick = () =>
							action((prevSelected) => {
								if (prevSelected.includes(id)) {
									return prevSelected.filter(
										(am) => am !== id
									);
								}

								return [...prevSelected, id];
							});

						return (
							<Chip
								key={`${id}-${name}`}
								selected={selected}
								aria-pressed={selected}
								style={{
									margin: "0.25rem",
									backgroundColor: "#616161",
								}}
								onClick={_handleClick}
							>
								{name}
							</Chip>
						);
					});
				}}
			/>
		</React.Fragment>
	);
};

const SearchView = ({ fetch }) => {
	const history = useHistory();

	const [query, setQuery] = useState(useQuery().get("q"));
	const [mediaType, setMediaType] = useState("movie");
	const [genres, setGenres] = useState([]);

	const _handleSearch = (e) => setQuery(e.target.value);
	const _handleKeyUp = (evt) => {
		evt.preventDefault();
		if (evt.key === "Enter") {
			history.push(`/search/${query}`);
		}
	};

	useEffect(() => {
		const timeOutId = setTimeout(
			() => history.push(`/search/?q=${query}`),
			1000
		);
		return () => clearTimeout(timeOutId);
	}, [query]);

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
			<div className="grid">
				<aside>
					<Filters
						actions={[setMediaType, setGenres]}
						states={[null, genres]}
					/>
				</aside>
				<SearchList
					media_type={mediaType}
					genres={genres}
					query={query}
				/>
			</div>
		</React.Fragment>
	);
};

export default connect(null, (dispatch) => ({
	fetch: (query, page = 1, adult = false) =>
		dispatch(fetch_search_result(query, page, adult)),
}))(SearchView);
