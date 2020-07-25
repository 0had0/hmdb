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
		popular: false,
		trending: false,
		top_movies: false,
		top_series: false,
	},
	data: {
		popular: [],
		trending: [],
		top_movies: [],
		top_series: [],
	},
	error: {
		popular: null,
		trending: null,
		top_movies: null,
		top_series: null,
	},
	left_pages: {
		popular: 2,
		trending: 2,
		top_movies: 2,
		top_series: 2,
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
