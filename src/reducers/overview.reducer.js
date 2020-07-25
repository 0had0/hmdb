import * as TYPES from "constants/overview-view";

const initState = {
	loading: false,
	data: {
		details: [],
		videos: [],
		similar: [],
		reviews: [],
		credits: [],
	},
	error: null,
};

export default (state = initState, action) => {
	switch (action.type) {
		case TYPES.OVERVIEW_FETCH_START: {
			return {
				loading: true,
				data: {
					details: [],
					videos: [],
					similar: [],
					reviews: [],
					credits: [],
				},
				error: null,
			};
		}
		case TYPES.OVERVIEW_FETCH_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case TYPES.OVERVIEW_FETCH_FAILD: {
			return {
				loading: false,
				data: {
					details: [],
					videos: [],
					similar: [],
					reviews: [],
					credits: [],
				},
				error: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};
