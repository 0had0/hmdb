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

const getURLof = (key, api) => {
	const URLS = {
		popular: `${api.URL}/trending/movie/day?api_key=${api.KEY}`,
		trending: `${api.URL}/trending/tv/day?api_key=${api.KEY}`,
		top_movies: `${api.URL}/movie/popular?api_key=${api.KEY}`,
		top_series: `${api.URL}/tv/popular?api_key=${api.KEY}`,
	};
	return URLS[key];
};

export function fetchData(key) {
	return async (dispatch, getState, api) => {
		dispatch(setIsLoading(key, true));
		console.log(`[fetching][${key}]`);
		await axios
			.get(getURLof(key, api))
			.then(({ data }) => {
				const { results } = data;
				dispatch(setData(key, results));
				dispatch(setIsLoading(key, false));
			})
			.catch((err) => {
				dispatch(setIsLoading(key, false));
				dispatch(setHasError(key, true));
			});
	};
}
