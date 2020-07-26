import React, { useEffect } from "react";

import axios from "axios";

import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
	List,
	ListItem,
	CircularProgress,
	LinearProgress,
	Text,
} from "react-md";

import InfiniteScroll from "react-infinite-scroller";

import {
	fetchMoviesOnce,
	fetchTvOnce,
	fetchMoviesMulti,
	fetchTvMulti,
} from "api/fetch.search.action";

import SkeletonImage from "images/skeleton.jpg";
import "./SearchList.scss";

const useQuery = () => new URLSearchParams(useLocation().search);

function SearchList({
	mediaType = "movie",
	sort,
	response,
	loading,
	hasError,
	hasMoreMovie,
	hasMoreTv,
	fetch,
	fetchNext,
}) {
	const history = useHistory();
	const query = useQuery().get("q");

	let data = response[mediaType];

	useEffect(() => {
		if (!query) {
			return;
		}
		const { cancel, token } = axios.CancelToken.source();
		let timeOutId = setTimeout(function() {
			fetch(mediaType, query, token);
		}, 1000);
		return () => {
			cancel("User loose interest");
			clearTimeout(timeOutId);
		};
	}, [query, fetch, history, mediaType]);

	if (sort && data.length !== 0) {
		data = response[mediaType].sort((a, b) => {
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

	return hasError[mediaType] ? (
		<div className="error">
			<Text>No match :(</Text>
		</div>
	) : (
		<React.Fragment>
			<List className="search-results">
				{!!loading[mediaType] && (
					<LinearProgress id="simple-linear-progress" />
				)}
				<InfiniteScroll
					pageStart={1}
					loadMore={(page) => {
						fetchNext(mediaType, query, page);
					}}
					hasMore={
						(mediaType === "movie" ? hasMoreMovie : hasMoreTv) &&
						!loading[mediaType]
					}
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
										`/${item?.mediaType}/${item?.id}`
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
		response: app.search.data,
		loading: app.search.loading,
		hasError: app.search.error,
		hasMoreMovie: app.search.movies_pages_left > 0,
		hasMoreTv: app.search.series_pages_left > 0,
	}),
	(dispatch) => ({
		fetch: (mediaType, query, token, adult = false) =>
			mediaType === "movie"
				? dispatch(fetchMoviesOnce(query, token, adult))
				: dispatch(fetchTvOnce(query, token, adult)),
		fetchNext: (mediaType, query, page, adult = false) => {
			mediaType === "movie"
				? dispatch(fetchMoviesMulti(query, page, adult))
				: dispatch(fetchTvMulti(query, page, adult));
		},
	})
)(SearchList);
