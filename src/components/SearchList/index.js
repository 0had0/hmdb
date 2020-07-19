import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { List, ListItem, CircularProgress, Text } from "react-md";

import { fetch_search_result } from "../../actions/appActions";

import InfiniteScroll from "react-infinite-scroller";

import "./SearchList.scss";

function SearchList({
	media_type = "movie",
	genres,
	query,
	page,
	response,
	loading,
	hasError,
	hasMore,
	fetch,
}) {
	const history = useHistory();

	let data = response[media_type];

	if (genres.length !== 0) {
		data = data.filter(({ genre_ids }) =>
			genre_ids.some((item) => genres.includes(item))
		);
	}

	useEffect(() => {
		fetch(query, page);
	}, [query, page]);

	return response[media_type].length === 0 || loading ? (
		<div className="search-results-loading">
			<CircularProgress id="search-results-fetch-loading" />
		</div>
	) : data.length === 0 ? (
		<div className="search-results-loading">
			<Text>No match :(</Text>
		</div>
	) : (
		<React.Fragment>
			<List className="search-results">
				<InfiniteScroll
					pageStart={1}
					loadMore={(page) => {
						fetch(query, page);
					}}
					hasMore={hasMore}
					loader={
						<div className="loader" key={0}>
							<CircularProgress id="search-results-fetch-loading" />
						</div>
					}
					useWindow
				>
					{data.map((item, i) => {
						return (
							<ListItem
								key={`${i}-${item?.name || item.title}`}
								onClick={() =>
									history.push(
										`/${item?.media_type}/${item?.id}`
									)
								}
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
								<i
									style={{
										color: "rgba(255, 255, 255, 0.3)",
									}}
								>
									{item?.release_date}
								</i>
								<Text>{item?.overview}</Text>
							</ListItem>
						);
					})}
				</InfiniteScroll>
			</List>
		</React.Fragment>
	);
}

export default connect(
	({ app }) => ({
		response: app.data.searchResult,
		loading: app.isLoading.searchResult,
		hasError: app.hasError.searchResult,
		hasMore: app.data.searchResult.pages_left > 0,
	}),
	(dispatch) => ({
		fetch: (query, page, adult = false) =>
			dispatch(fetch_search_result(query, page, adult)),
	})
)(SearchList);
