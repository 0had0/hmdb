import {
	LOGIN_SUCCESS,
	LOGIN_START,
	LOGIN_FAILD,
	TOGGLE_ERROR,
	LOGOUT_START,
	LOGOUT_SUCCESS,
	LOGOUT_FAILD,
} from "../constants";
const initState = {
	sessionId: localStorage.getItem("session_id") || null,
	loading: false,
	logout_loading: false,
	isLogin: localStorage.getItem("session_id") ?? false,
	errorMessage: null,
};

export default (state = initState, action) => {
	switch (action.type) {
		case LOGIN_START: {
			return { ...state, loading: true };
		}
		case LOGIN_SUCCESS: {
			return {
				...state,
				isLogin: true,
				loading: false,
				sessionId: action.payload,
			};
		}
		case LOGIN_FAILD: {
			return {
				...state,
				isLogin: false,
				loading: false,
				sessionId: null,
				errorMessage: action.payload,
			};
		}
		case TOGGLE_ERROR: {
			return { ...state, errorMessage: null };
		}
		case LOGOUT_START: {
			return { ...state, logout_loading: true };
		}
		case LOGOUT_SUCCESS: {
			return { ...state, logout_loading: false, isLogin: false };
		}
		case LOGOUT_FAILD: {
			return { ...state, logout_loading: false };
		}
		default: {
			return state;
		}
	}
};
