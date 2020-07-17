import axios from "axios";

import {
	TOGGLE_MODAL,
	SET_IS_LOADING,
	SET_DATA,
	HAS_ERROR,
} from "../constants";

export const toggle_modal = () => ({ type: TOGGLE_MODAL });

const setIsLoading = (payload) => ({
	type: SET_IS_LOADING,
	payload,
});

const setData = (key, value) => ({
	type: SET_DATA,
	payload: { key, value },
});

const setHasError = (payload) => ({
	type: HAS_ERROR,
	payload,
});

const getURLof = (key, api, id) => {
	const URLS = {
		popular: `${api.URL}/trending/movie/day?api_key=${api.KEY}`,
		trending: `${api.URL}/trending/tv/day?api_key=${api.KEY}`,
		top_movie: `${api.URL}/movie/popular?api_key=${api.KEY}`,
		top_series: `${api.URL}/tv/popular?api_key=${api.KEY}`,
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

export function fetchData(key, id = 0) {
	return async (dispatch, getState, api) => {
		dispatch(setIsLoading(key, true));
		await axios
			.get(getURLof(key, api, id))
			.then(({ data }) => {
				const { results, cast } = data;
				dispatch(setData(key, results ?? cast ?? data));
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
		dispatch(setIsLoading(true));
		await axios
			.all([
				axios.get(getURLof(`${media_type}_page_details`, api, id)),
				axios.get(getURLof(`${media_type}_page_videos`, api, id)),
				axios.get(
					getURLof(`${media_type}_page_recommendations`, api, id)
				),
				axios.get(getURLof(`${media_type}_page_similar`, api, id)),
				axios.get(getURLof(`${media_type}_page_reviews`, api, id)),
				axios.get(getURLof(`${media_type}_page_credits`, api, id)),
			])
			.then(
				axios
					.spread((...responses) => {
						const [
							details_res,
							videos_res,
							recommendations_res,
							similar_res,
							reviews_res,
							credits_res,
						] = responses;
						dispatch(
							setData("overview", {
								details: details_res.data,
								videos: videos_res.data.results,
								recommendations:
									recommendations_res.data.results,
								similar: similar_res.data.results,
								reviews: reviews_res.data.results,
								credits:
									credits_res.data.cast.length === 0
										? credits_res.data.crew
										: credits_res.data.cast,
							})
						);
					})
					.catch((errors) => {
						dispatch(setIsLoading(true));
						dispatch(setHasError(true));
					})
			);
	};
}
