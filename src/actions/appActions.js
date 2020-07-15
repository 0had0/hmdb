import axios from "axios";

import {
	TOGGLE_MODAL,
	SET_IS_LOADING,
	SET_DATA,
	HAS_ERROR,
} from "../constants";

export const toggle_modal = () => ({ type: TOGGLE_MODAL });

const setIsLoading = (key, value) => ({
	type: SET_IS_LOADING,
	payload: { key, value },
});

const setData = (key, value) => ({
	type: SET_DATA,
	payload: { key, value },
});

const setHasError = (key, value) => ({
	type: HAS_ERROR,
	payload: { key, value },
});

const getURLof = (key, api, id) => {
	const URLS = {
		popular: `${api.URL}/trending/movie/day?api_key=${api.KEY}`,
		trending: `${api.URL}/trending/tv/day?api_key=${api.KEY}`,
		top_movies: `${api.URL}/movie/popular?api_key=${api.KEY}`,
		top_series: `${api.URL}/tv/popular?api_key=${api.KEY}`,
		movies_page_details: `${api.URL}/movie/${id}?api_key=${api.KEY}&language=en-US`,
		movies_page_videos: `${api.URL}/movie/${id}/videos?api_key=${api.KEY}&language=en-US`,
		movies_page_recommendations: `${api.URL}/movie/${id}/recommendations?api_key=${api.KEY}&language=en-US`,
		movies_page_similar: `${api.URL}/movie/${id}/similar?api_key=${api.KEY}&language=en-US`,
		movies_page_reviews: `${api.URL}/movie/${id}/reviews?api_key=${api.KEY}&language=en-US`,
		tv_page_details: `${api.URL}/tv/${id}?api_key=${api.KEY}&language=en-US`,
		tv_page_videos: `${api.URL}/tv/${id}/videos?api_key=${api.KEY}&language=en-US`,
		tv_page_similar: `${api.URL}/tv/${id}/similar?api_key=${api.KEY}&language=en-US`,
	};
	return URLS[key];
};

export function fetchData(key, id = 0) {
	return async (dispatch, getState, api) => {
		console.log(`[fetch ${key.split("_").join(" ")}]: start`);
		dispatch(setIsLoading(key, true));
		await axios
			.get(getURLof(key, api, id))
			.then(({ data }) => {
				const { results } = data;
				dispatch(setData(key, results ?? data));
				console.log(
					`[fetch ${key.split("_").join(" ")}]: done\nresult: `,
					results ?? data
				);
				dispatch(setIsLoading(key, false));
			})
			.catch((err) => {
				dispatch(setIsLoading(key, false));
				dispatch(setHasError(key, true));
				console.log(`[fetch ${key.split("_").join(" ")}]: faild`);
			});
	};
}

export function clearData(key) {
	return setData(key, []);
}
