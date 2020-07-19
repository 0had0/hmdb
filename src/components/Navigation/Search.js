import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import axios from "axios";

import "./Search.css";

import {
	TextField,
	List,
	SearchFontIcon,
	PermScanWifiFontIcon,
	CircularProgress,
	ListItem,
} from "react-md";

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_START": {
			return { ...state, hasError: false, loading: true };
		}
		case "FETCH_DONE": {
			return { ...state, loading: false, data: action.payload };
		}
		case "FETCH_FAILD": {
			return { ...state, loading: false, hasError: true, data: [] };
		}
		case "FETCH_CLEAR": {
			return { ...state, data: [], loading: false, hasError: false };
		}
		default: {
			return state;
		}
	}
};

async function fetchSearchResult(query, dispatch, cancelToken) {
	if (query) {
		dispatch({ type: "FETCH_START" });
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/search/keyword?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=1`,
				{
					cancelToken,
				}
			);
			dispatch({
				type: "FETCH_DONE",
				payload: [...res.data.results.splice(0, 5)],
			});
		} catch (err) {
			dispatch({ type: "FETCH_FAILD" });
			axios.isCancel(err);
		}
	}
}

function Search({ style }) {
	const location = useLocation();
	const isSearchPage = React.useRef(location.pathname.includes("/search"));

	let isDiscoveryPage = React.useRef(location.pathname === "/").current;

	const [query, setQuery] = useState("");
	const [showInput, setShowInput] = useState(
		isSearchPage.current
			? false
			: window.innerWidth > 500 || !isDiscoveryPage
	);

	const inputRef = useRef(null);

	const [{ hasError, loading, data }, dispatch] = useReducer(reducer, {
		hasError: false,
		loading: false,
		data: [],
	});

	const history = useHistory();

	const _toggleInput = () =>
		setShowInput(isSearchPage.current ? false : !showInput);

	const _toggleWithTimeout = () => setTimeout(_toggleInput, 500);

	const _handleType = (evt) => {
		setQuery(evt.target.value);
	};

	const _GoToSearchPage = (evt) => {
		evt.preventDefault();
		if (evt.key === "Enter") {
			if (query) {
				setQuery("");
				_toggleInput();
				history.push(`/search/?q=${query}`);
			}
		}
	};

	const _GoToMovieOrTVPage = (item) => {
		setQuery("");
		history.push(`/search/?q=${item.name}`);
	};

	useEffect(() => {
		isSearchPage.current = location.pathname.includes("/search");
	}, [location]);

	useEffect(() => {
		if (showInput && isDiscoveryPage) {
			inputRef.current.focus();
		}
	}, [showInput, isDiscoveryPage]);

	useEffect(() => {
		const { cancel, token } = axios.CancelToken.source();
		const timeOutId = setTimeout(
			() => fetchSearchResult(query, dispatch, token),
			500
		);
		return () => {
			cancel("User loose interest");
			clearTimeout(timeOutId);
			dispatch({ type: "FETCH_CLEAR" });
		};
	}, [query]);

	return (
		<div
			className={`search-box search-box-${showInput ? "open" : "close"}`}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<SearchFontIcon
					style={{ color: "#fff" }}
					onClick={_toggleInput}
				/>
				<TextField
					id="search"
					style={{ margin: "0 .5em" }}
					ref={inputRef}
					theme="none"
					onChange={_handleType}
					onBlur={_toggleWithTimeout}
					onKeyUp={_GoToSearchPage}
					value={query}
					autoComplete="off"
					placeholder="Series, Movies ..."
				/>
				{showInput && loading && (
					<CircularProgress id="simple-circular-progress" />
				)}
				{showInput && !loading && hasError && <PermScanWifiFontIcon />}
			</div>
			{data.length !== 0 && (
				<List
					className={`suggestions-menu suggestions-menu-${
						showInput ? "open" : "close"
					}`}
				>
					{data.map((item, i) => (
						<ListItem
							key={item.id}
							onClick={() => _GoToMovieOrTVPage(item)}
							style={{
								textDecoration: "none",
								color: "#fff",
							}}
						>
							{item?.name}
						</ListItem>
					))}
				</List>
			)}
		</div>
	);
}

export default React.memo(Search);
