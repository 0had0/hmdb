import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import {
	TextField,
	List,
	SearchFontIcon,
	PermScanWifiFontIcon,
	CircularProgress,
	ListItem,
	Avatar,
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
			return { ...state, hasError: true, data: [] };
		}
		case "FETCH_CLEAR": {
			return { ...state, data: [], hasError: false };
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
			const [res1, res2] = await axios.all([
				axios.get(
					`${process.env.REACT_APP_API_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=1`,
					{
						cancelToken,
					}
				),
				axios.get(
					`${process.env.REACT_APP_API_URL}/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=1`,
					{
						cancelToken,
					}
				),
			]);
			dispatch({
				type: "FETCH_DONE",
				payload: [
					...res1.data.results.slice(0, 3),
					...res2.data.results.slice(0, 3),
				],
			});
		} catch (err) {
			dispatch({ type: "FETCH_FAILD" });
			axios.isCancel(err);
		}
	}
}

function Search({ style }) {
	const [query, setQuery] = useState("");
	const [showInput, setShowInput] = useState(window.innerWidth > 500);

	const inputRef = useRef(null);

	const [{ hasError, loading, data }, dispatch] = useReducer(reducer, {
		hasError: false,
		loading: false,
		data: [],
	});

	const history = useHistory();

	const _toggleInput = () => setShowInput(!showInput);

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
				history.push(`/search/${query}`);
			}
		}
	};

	const _GoToMovieOrTVPage = (item) =>
		history.push(`/${item.title ? "movies" : "tv"}/${item.id}`);

	useEffect(() => {
		if (showInput) {
			inputRef.current.focus();
		}
	}, [showInput]);

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
							leftAddon={
								<Avatar
									color="blue"
									src={`https://image.tmdb.org/t/p/w45${item.poster_path}`}
									alt={
										item.original_title ||
										item.original_name
									}
								/>
							}
							style={{
								textDecoration: "none",
								color: "#fff",
							}}
						>
							{item.title ? item.title + " 📽" : item.name + " 📺"}
						</ListItem>
					))}
				</List>
			)}
		</div>
	);
}

export default React.memo(Search);
