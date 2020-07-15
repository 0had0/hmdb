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
		movies_page_details: false,
		movies_page_videos: false,
		movies_page_recommendations: false,
		movies_page_similar: false,
		movies_page_reviews: false,
		tv_page_details: false,
		tv_page_videos: false,
		tv_page_similar: false,
	},
	data: {
		popular: [],
		trending: [],
		top_movies: [],
		top_series: [],
		movies_page_details: null,
		movies_page_videos: [],
		movies_page_recommendations: [],
		movies_page_similar: [],
		movies_page_reviews: null,
		tv_page_details: null,
		tv_page_videos: [],
		tv_page_similar: [],
	},
	hasError: {
		popular: null,
		trending: null,
		top_movies: null,
		top_series: null,
		movies_page_details: null,
		movies_page_videos: null,
		movies_page_recommendations: null,
		movies_page_similar: null,
		movies_page_reviews: null,
		tv_page_details: null,
		tv_page_videos: null,
		tv_page_similar: null,
	},
};

const applyIsLoading = (state, action) => {
	const { key, value } = action.payload;
	return {
		...state,
		isLoading: { ...state.isLoading, [key]: value },
		hasError: { ...state.hasError, [key]: false },
	};
};

const applyData = (state, action) => {
	const { key, value } = action.payload;
	return {
		...state,
		data: { ...state.data, [key]: value },
		hasError: { ...state.hasError, [key]: false },
	};
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
