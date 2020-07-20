import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { List, ListItem, CircularProgress, Text } from "react-md";

import { fetch_search_result } from "../../actions/appActions";

import InfiniteScroll from "react-infinite-scroller";

import SkeletonImage from "../../images/skeleton.jpg";
import "./SearchList.scss";

const useQuery = () => new URLSearchParams(useLocation().search);

function SearchList({
	media_type = "movie",
	sort,
	page,
	response,
	loading,
	hasError,
	hasMore,
	fetch,
}) {
	const history = useHistory();
	const query = useQuery().get("q");
	console.log(query);

	let data = response[media_type];

	useEffect(() => {
		if (!query) {
			return;
		}
		const { cancel, token } = axios.CancelToken.source();
		let timeOutId = setTimeout(function() {
			fetch(query, page, token);
		}, 1000);
		return () => {
			cancel("User loose interest");
			clearTimeout(timeOutId);
		};
	}, [query, page, fetch, history]);

	if (sort && data.length !== 0) {
		data = response[media_type].sort((a, b) => {
			if (sort === "Rating") {
				return b.vote_average - a.vote_average;
			}
			if (sort === "Year") {
				if (a?.first_air_date) {
					return (
						b.first_air_date.split("-")[0] -
						a.first_air_date.split("-")[0]
					);
				} else {
					return (
						b.release_date.split("-")[0] -
						a.release_date.split("-")[0]
					);
				}
			} else return 0;
		});
	}

	return loading ? (
		<div className="search-results-loading">
			<CircularProgress id="search-results-fetch-loading" />
		</div>
	) : hasError || data.length === 0 ? (
		<div className="error">
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
					hasMore={hasMore && !loading}
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
											item?.poster_path
												? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
												: SkeletonImage
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
		fetch: (query, page, adult = false, token) =>
			dispatch(fetch_search_result(query, page, adult, token)),
	})
)(SearchList);
