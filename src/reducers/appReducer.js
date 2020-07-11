import {
	TOGGLE_MODAL,
	SET_IS_LOADING,
	SET_DATA,
	HAS_ERROR,
} from "../constants";
const initState = {
	toggleModal: false,
	isLoading: {
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
	hasError: {
		popular: null,
		trending: null,
		top_movies: null,
		top_series: null,
	},
};

const applyIsLoading = (state, action) => {
	const { key, value } = action.payload;
	return { ...state, isLoading: { ...state.isLoading, [key]: value } };
};

const applyData = (state, action) => {
	const { key, value } = action.payload;
	return { ...state, data: { ...state.data, [key]: value } };
};

const applyError = (state, action) => {
	const { key, value } = action.payload;
	return { ...state, hasError: { ...state.hasError, [key]: value } };
};

export default (state = initState, action) => {
	switch (action.type) {
		case TOGGLE_MODAL: {
			return { ...state, toggleModal: !state.toggleModal };
		}
		case SET_IS_LOADING: {
			return applyIsLoading(state, action);
		}
		case SET_DATA: {
			return applyData(state, action);
		}
		case HAS_ERROR: {
			return applyError(state, action);
		}
		default: {
			return state;
		}
	}
};
