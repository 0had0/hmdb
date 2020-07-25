import {
	SEARCH_START,
	SEARCH_SUCCESS,
	SEARCH_UPDATE,
	SEARCH_FAILD,
} from "constants/search-view";

export const moviesFetchStart = () => ({
	type: SEARCH_START,
	key: "movie",
});
export const moviesFetchSuccess = (value) => ({
	type: SEARCH_SUCCESS,
	payload: {
		value,
		key: "movie",
	},
});
export const moviesFetchUpdate = (value) => ({
	type: SEARCH_UPDATE,
	payload: {
		value,
		key: "movie",
	},
});
export const moviesFetchFaild = (value) => ({
	type: SEARCH_FAILD,
	payload: {
		value,
		key: "movie",
	},
});
