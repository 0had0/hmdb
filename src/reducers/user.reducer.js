import * as TYPES from "constants/user";

const initialState = {
	name: localStorage.getItem("username") || null,
	favorite: { movie: [], tv: [] },
	watchlist: { movie: [], tv: [] },
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TYPES.UPDATE_FAVORITE: {
			const { movie, tv } = action.payload;
			return { ...state, favorite: { movie, tv } };
		}
		case TYPES.UPDATE_WATCHLIST: {
			const { movie, tv } = action.payload;
			return { ...state, watchlist: { movie, tv } };
		}
		case TYPES.UPDATE_NAME: {
			return { ...state, name: action.payload };
		}
		default: {
			return state;
		}
	}
};
