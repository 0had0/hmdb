import axios from "axios";

import {
	loading,
	success,
	update,
	faild,
	setLastPageOf,
} from "actions/discovery-view/multi.action";
import { getUrlOf } from "./common.function";

export const fetchOnce = (key) => {
	return async (dispatch, getState, api) => {
		dispatch(loading(key));
		await axios
			.get(getUrlOf(key, api))
			.then(({ data }) => {
				const { results, cast, total_pages } = data;
				dispatch(success(key, results ?? cast ?? data));
				dispatch(setLastPageOf(key, +total_pages - 1));
			})
			.catch((err) => dispatch(faild(key, err)));
	};
};

export const fetchMulti = (key, page) => {
	return async (dispatch, getState, api) => {
		dispatch(loading(key));
		await axios
			.get(getUrlOf(key, api, null, null, page))
			.then(({ data }) => {
				const { results, cast, total_pages } = data;
				dispatch(update(key, results ?? cast ?? data));
				dispatch(setLastPageOf(key, +total_pages - page));
			})
			.catch((err) => dispatch(faild(key, err)));
	};
};
