import * as TYPES from "constants/search-view";
import { success, error, update, loading } from "./common.setter.js";

const initState = {
	loading: {
		movie: false,
		tv: false,
	},
	data: {
		movie: [],
		tv: [],
	},
	error: { movie: null, tv: null },
	movies_pages_left: 2,
	series_pages_left: 2,
};

export default (state = initState, action) => {
	switch (action.type) {
		case TYPES.SEARCH_START: {
			return loading(state, action.key);
		}
		case TYPES.SEARCH_SUCCESS: {
			return success(state, action.payload);
		}
		case TYPES.SEARCH_UPDATE: {
			return update(state, action.payload);
		}
		case TYPES.SEARCH_FAILD: {
			return error(state, action.payload);
		}
		default: {
			return state;
		}
	}
};
