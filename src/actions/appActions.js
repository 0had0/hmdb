import axios from "axios";

import {
	TOGGLE_MODAL,
	TOGGLE_VIDEO_MODAL,
	SET_IS_LOADING,
	SET_DATA,
	HAS_ERROR,
} from "../constants";

export const toggle_modal = () => ({ type: TOGGLE_MODAL });

export const toggle_video_modal = (payload) => ({
	type: TOGGLE_VIDEO_MODAL,
	payload,
});

const setIsLoading = (key, value) => ({
	type: SET_IS_LOADING,
	payload: {
		key,
		value,
	},
});

const setData = (key, value) => ({
	type: SET_DATA,
	payload: { key, value },
});

const setHasError = (payload) => ({
	type: HAS_ERROR,
	payload,
});

const getURLof = (key, api, id, page = 1) => {
	const URLS = {
		popular: `${api.URL}/trending/movie/day?api_key=${api.KEY}`,
		trending: `${api.URL}/trending/tv/day?api_key=${api.KEY}`,
		top_movies: `${api.URL}/movie/popular?api_key=${api.KEY}&language=en-US&page=${page}`,
		top_series: `${api.URL}/tv/popular?api_key=${api.KEY}&language=en-US&page=${page}`,
		movie_page_details: `${api.URL}/movie/${id}?api_key=${api.KEY}&language=en-US`,
		movie_page_videos: `${api.URL}/movie/${id}/videos?api_key=${api.KEY}&language=en-US`,
		movie_page_recommendations: `${api.URL}/movie/${id}/recommendations?api_key=${api.KEY}&language=en-US`,
		movie_page_similar: `${api.URL}/movie/${id}/similar?api_key=${api.KEY}&language=en-US`,
		movie_page_reviews: `${api.URL}/movie/${id}/reviews?api_key=${api.KEY}&language=en-US`,
		movie_page_credits: `${api.URL}/movie/${id}/credits?api_key=${api.KEY}&language=en-US`,
		tv_page_details: `${api.URL}/tv/${id}?api_key=${api.KEY}&language=en-US`,
		tv_page_videos: `${api.URL}/tv/${id}/videos?api_key=${api.KEY}&language=en-US`,
		tv_page_similar: `${api.URL}/tv/${id}/similar?api_key=${api.KEY}&language=en-US`,
		tv_page_reviews: `${api.URL}/tv/${id}/reviews?api_key=${api.KEY}&language=en-US`,
		tv_page_credits: `${api.URL}/tv/${id}/credits?api_key=${api.KEY}&language=en-US`,
	};
	return URLS[key];
};

export function fetchData(key, id = 0, page = 1) {
	return async (dispatch, getState, api) => {
		const { app } = getState();
		dispatch(setIsLoading(key, true));
		await axios
			.get(getURLof(key, api, id, page))
			.then(({ data }) => {
				const { results, cast, total_pages } = data;
				if (page === 1) {
					dispatch(setData(key, results ?? cast ?? data));
					if (key.split("_")[0] === "top") {
						dispatch(
							setData(`${key}_pages_left`, +total_pages - page)
						);
						dispatch(setData(`${key}_filtered`, results));
					}
				} else {
					dispatch(setData(key, [...app.data[key], ...results]));
					dispatch(
						setData(`${key}_filtered`, [
							...app.data[key],
							...results,
						])
					);
					dispatch(setData(`${key}_pages_left`, +total_pages - page));
				}
				dispatch(setIsLoading(key, false));
			})
			.catch((err) => {
				dispatch(setIsLoading(key, false));
				dispatch(setHasError(key, true));
			});
	};
}

export function clearData(key) {
	return setData(key, []);
}

export function fetchOverview(id, media_type) {
	return async (dispatch, getState, api) => {
		dispatch(setIsLoading("overview", true));
		dispatch(
			setData("overview", {
				details: [],
				videos: [],
				recommendations: [],
				similar: [],
				reviews: [],
				credits: [],
			})
		);
		await axios
			.all([
				axios.get(getURLof(`${media_type}_page_details`, api, id)),
				axios.get(getURLof(`${media_type}_page_videos`, api, id)),
				axios.get(getURLof(`${media_type}_page_similar`, api, id)),
				axios.get(getURLof(`${media_type}_page_reviews`, api, id)),
				axios.get(getURLof(`${media_type}_page_credits`, api, id)),
			])
			.then(
				axios.spread((...responses) => {
					const [
						details_res,
						videos_res,
						similar_res,
						reviews_res,
						credits_res,
					] = responses;
					dispatch(
						setData("overview", {
							details: details_res.data,
							videos: videos_res.data.results,
							similar: similar_res.data.results,
							reviews: reviews_res.data.results,
							credits:
								credits_res.data.cast.length === 0
									? credits_res.data.crew
									: credits_res.data.cast,
						})
					);
					dispatch(setIsLoading("overview", false));
				})
			)
			.catch((errors) => {
				console.log(errors);
				dispatch(setIsLoading("overview", false));
				dispatch(setHasError("overview", false));
			});
	};
}

export function fetch_search_result(
	query,
	page = 1,
	adult = false,
	cancelToken
) {
	return async (dispatch, getState, api) => {
		if (page === 1) {
			dispatch(setIsLoading("searchResult", true));
		}
		const { searchResult } = getState().app.data;
		searchResult.pages_left > 0 &&
			(await axios
				.get(
					`${api.URL}/search/multi?api_key=${api.KEY}&language=en-US&query=${query}&page=${page}&include_adult=${adult}`,
					{ cancelToken }
				)
				.then(({ data }) => {
					if (page !== 1) {
						dispatch(
							setData("searchResult", {
								movie: [
									...searchResult.movie,
									...data.results.filter(
										({ media_type }) =>
											media_type === "movie"
									),
								],
								tv: [
									...searchResult.tv,
									...data.results.filter(
										({ media_type }) => media_type === "tv"
									),
								],
								pages_left: +data.total_pages - page,
							})
						);
					} else {
						dispatch(
							setData("searchResult", {
								movie: data.results.filter(
									({ media_type }) => media_type === "movie"
								),
								tv: data.results.filter(
									({ media_type }) => media_type === "tv"
								),
								pages_left: +data.total_pages - page,
							})
						);
					}
				})
				.catch((errors) => {
					dispatch(setHasError("searchResult", true));
					console.log(errors);
				}));
		dispatch(setIsLoading("searchResult", false));
	};
}

export function filter(media_type, filters) {
	return (dispatch, getState) => {
		const { data } = getState().app;

		let input = filters.filter((obj) => !!obj);

		dispatch(setIsLoading(`top_${media_type}`, true));

		input.forEach(({ type, value }) => {
			switch (type) {
				case "year": {
					const filteredByYear = data[
						`top_${media_type}_filtered`
					].filter(({ release_date, first_air_date }) => {
						if (media_type === "movies") {
							return +release_date.split("-")[0] <= +value;
						} else return +first_air_date.split("-")[0] <= +value;
					});
					dispatch(
						setData(`top_${media_type}_filtered`, filteredByYear)
					);
					break;
				}
				case "country": {
					dispatch(
						setData(
							`top_${media_type}_filtered`,
							data[`top_${media_type}`].filter(
								({ origin_country }) =>
									origin_country &&
									origin_country.includes(value)
							)
						)
					);
					break;
				}
				case "genre": {
					dispatch(
						setData(
							`top_${media_type}_filtered`,
							data[`top_${media_type}`].filter(({ genre_ids }) =>
								genre_ids.some((elm) => value.includes(elm))
							)
						)
					);
					break;
				}
				case "language": {
					dispatch(
						setData(
							`top_${media_type}_filtered`,
							data[`top_${media_type}`].filter(
								({ original_language }) =>
									original_language === value
							)
						)
					);
					break;
				}
				case "rating": {
					dispatch(
						setData(
							`top_${media_type}_filtered`,
							data[`top_${media_type}`].filter(
								({ vote_average }) => vote_average <= value
							)
						)
					);
					break;
				}
				default: {
					return;
				}
			}
		});
		dispatch(setIsLoading(`top_${media_type}`, false));
	};
}
