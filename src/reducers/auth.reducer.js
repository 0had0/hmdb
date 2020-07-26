import {
	LOGIN_SUCCESS,
	LOGIN_START,
	LOGIN_FAILD,
	LOGOUT_START,
	LOGOUT_SUCCESS,
	LOGOUT_FAILD,
} from "constants/auth";

const initState = {
	sessionId: localStorage.getItem("session_id") || null,
	id: +localStorage.getItem("id") || null,
	isLogin: !!localStorage.getItem("session_id") || false,
	loading: {
		login: false,
		logout: false,
	},
};

export default (state = initState, action) => {
	switch (action.type) {
		case LOGIN_START: {
			return { ...state, loading: { ...state.loading, login: true } };
		}
		case LOGIN_SUCCESS: {
			const { id, sessionId } = action.payload;
			return {
				...state,
				isLogin: true,
				loading: { ...state.loading, login: false },
				sessionId,
				id: +id,
			};
		}
		case LOGIN_FAILD: {
			return {
				...state,
				isLogin: false,
				loading: { ...state.loading, login: false },
				sessionId: null,
				id: null,
			};
		}
		case LOGOUT_START: {
			return { ...state, loading: { ...state.loading, logout: true } };
		}
		case LOGOUT_SUCCESS: {
			return {
				...state,
				loading: { ...state.loading, logout: false },
				isLogin: false,
			};
		}
		case LOGOUT_FAILD: {
			return { ...state, loading: { ...state.loading, logout: false } };
		}
		default: {
			return state;
		}
	}
};
