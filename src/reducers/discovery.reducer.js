import * as TYPES from "constants/discovery-view";
import {
	success,
	error,
	update,
	loading,
	setPageLeftOf,
} from "./common.setter.js";

const initState = {
	loading: {
		popular_movies: false,
		popular_series: false,
		trending_movies: false,
		trending_series: false,
	},
	data: {
		popular_movies: [],
		popular_series: [],
		trending_movies: [],
		trending_series: [],
	},
	error: {
		popular_movies: null,
		popular_series: null,
		trending_movies: null,
		trending_series: null,
	},
	left_pages: {
		popular_movies: 2,
		popular_series: 2,
		trending_movies: 2,
		trending_series: 2,
	},
};

export default (state = initState, action) => {
	switch (action.type) {
		case TYPES.DISCOVERY_LOADING: {
			return loading(state, action.key);
		}
		case TYPES.DISCOVERY_SUCCESS: {
			return success(state, action.payload);
		}
		case TYPES.DISCOVERY_UPDATE: {
			return update(state, action.payload);
		}
		case TYPES.DISCOVERY_FAILD: {
			return error(state, action.payload);
		}
		case TYPES.DISCOVERY_SET_LAST_PAGE: {
			return setPageLeftOf(state, action.payload);
		}
		default: {
			return state;
		}
	}
};
