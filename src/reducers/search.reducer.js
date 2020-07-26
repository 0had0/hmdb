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
	pages_left: {
		tv: 2,
		movie: 2,
	},
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
		case TYPES.SEARCH_SET_PAGE_LEFT: {
			const { key, value } = action.payload;
			return {
				...state,
				pages_left: { ...state.pages_left, [key]: value },
			};
		}
		default: {
			return state;
		}
	}
};
