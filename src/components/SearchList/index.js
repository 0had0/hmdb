import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { List, ListItem, CircularProgress, Text } from "react-md";

import { fetch_search_result } from "../../actions/appActions";

import "./SearchList.scss";

function SearchList({
	media_type = "movie",
	genres,
	query,
	response,
	loading,
	hasError,
	fetch,
}) {
	let data = response[media_type];

	if (genres.length !== 0) {
		data = data.filter(({ genre_ids }) =>
			genre_ids.some((item) => genres.includes(item))
		);
	}

	useEffect(() => {
		fetch(query);
	}, [query]);

	return response[media_type].length === 0 || loading ? (
		<div className="search-results-loading">
			<CircularProgress />
		</div>
	) : data.length === 0 ? (
		<div className="search-results-loading">
			<Text>No match :(</Text>
		</div>
	) : (
		<React.Fragment>
			<List className="search-results">
				{data.map((item, i) => {
					return (
						<ListItem
							key={`${i}-${item?.name || item.title}`}
							className="search-results-item"
							leftAddon={
								<img
									height={150}
									width="auto"
									src={
										item?.poster_path &&
										`https://image.tmdb.org/t/p/w500${item?.poster_path}`
									}
									alt=""
								/>
							}
							leftAddonType="large-media"
						>
							<Text>{item?.title || item?.name}</Text>
							<i style={{ color: "rgba(255, 255, 255, 0.3)" }}>
								{item?.release_date}
							</i>
							<Text>{item?.overview}</Text>
						</ListItem>
					);
				})}
			</List>
		</React.Fragment>
	);
}

export default connect(
	({ app }) => ({
		response: app.data.searchResult,
		loading: app.isLoading.searchResult,
		hasError: app.hasError.searchResult,
	}),
	(dispatch) => ({
		fetch: (query, page = 1, adult = false) =>
			dispatch(fetch_search_result(query, page, adult)),
	})
)(SearchList);
