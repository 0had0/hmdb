import axios from "axios";
import {
	LOGIN_SUCCESS,
	LOGIN_START,
	LOGIN_FAILD,
	TOGGLE_ERROR,
	LOGOUT_START,
	LOGOUT_SUCCESS,
	LOGOUT_FAILD,
	SET_ACCOUNT_INFO,
	SET_FAVORITE,
	SET_WATCHLIST,
} from "../constants";

import { toggle_modal } from "./appActions";

// Login

const login_success = (payload) => ({
	type: LOGIN_SUCCESS,
	payload,
});
const login_start = () => ({
	type: LOGIN_START,
});
const login_faild = (payload) => ({
	type: LOGIN_FAILD,
	payload,
});
const toggle_error = () => ({
	type: TOGGLE_ERROR,
});

const set_account_info = ({ id, name }) => ({
	type: SET_ACCOUNT_INFO,
	id,
	name,
});

function login(email, password) {
	return async (dispatch, getState, api) => {
		dispatch(login_start());
		// Request new request token
		await axios
			.get(`${api.URL}/authentication/token/new?api_key=${api.KEY}`)
			.then(async ({ data }) => {
				const { request_token } = data;

				// Validate the request token with Login
				await axios({
					method: "post",
					url: `${api.URL}/authentication/token/validate_with_login?api_key=${api.KEY}`,
					headers: {},
					data: {
						username: email,
						password,
						request_token,
					},
				})
					.then(async ({ data }) => {
						if (data.success) {
							// if the Token is validated then request a new session ID
							await axios({
								method: "post",
								url: `${api.URL}/authentication/session/new?api_key=${api.KEY}`,
								headers: {},
								data: { request_token },
							}).then(async ({ data }) => {
								const { success, session_id } = data;

								if (success) {
									// add session ID to Redux
									localStorage.setItem(
										"session_id",
										session_id
									);
									dispatch(login_success(session_id));
									dispatch(toggle_modal());
									await axios
										.get(
											`${api.URL}/account?api_key=${api.KEY}&session_id=${session_id}`
										)
										.then(({ data }) => {
											dispatch(set_account_info(data));
											localStorage.setItem("id", data.id);
											dispatch(update_favorite("movie"));
											dispatch(update_favorite("tv"));
										});
								}
							});
						}
					})
					.catch((err) =>
						dispatch(login_faild(err.response.data.status_message))
					);
			});
	};
}

// Logout

const logout_start = () => ({
	type: LOGOUT_START,
});
const logout_success = () => ({
	type: LOGOUT_SUCCESS,
});
const logout_faild = () => ({
	type: LOGOUT_FAILD,
});

function logout() {
	return async (dispatch, getState, api) => {
		dispatch(logout_start());
		const { auth } = getState();
		await axios({
			method: "delete",
			url: `${api.URL}/authentication/session?api_key=${api.KEY}`,
			header: {},
			data: {
				session_id: auth.sessionId,
			},
		})
			.then(() => {
				localStorage.removeItem("session_id");
				localStorage.removeItem("id");
				dispatch(logout_success());
			})
			.catch(() => dispatch(logout_faild()));
	};
}

//favorite

const set_favorite = ({ media_type, ids }) => ({
	type: SET_FAVORITE,
	payload: { media_type, ids },
});

const set_watchlist = ({ media_type, ids }) => ({
	type: SET_WATCHLIST,
	payload: { media_type, ids },
});

function update_favorite(media_type, page = 1) {
	return async (dispatch, getState, api) => {
		await axios
			.get(
				`${api.URL}/account/${getState().auth.id}/favorite/${
					media_type === "movie" ? "movies" : "tv"
				}?api_key=${api.KEY}&session_id=${
					getState().auth.sessionId
				}&page=${page}`
			)
			.then(({ data }) => {
				const { results } = data;
				const ids = results.map(({ id }) => id);
				dispatch(set_favorite({ media_type, ids }));
			})
			.catch((err) => console.log(err));
	};
}
function update_watchlist(media_type, page = 1) {
	return async (dispatch, getState, api) => {
		await axios
			.get(
				`${api.URL}/account/${getState().auth.id}/watchlist/${
					media_type === "movie" ? "movies" : "tv"
				}?api_key=${api.KEY}&session_id=${
					getState().auth.sessionId
				}&page=${page}`
			)
			.then(({ data }) => {
				const { results } = data;
				const ids = results.map(({ id }) => id);
				dispatch(set_watchlist({ media_type, ids }));
			})
			.catch((err) => console.log(err));
	};
}
function favorite(id, media_type, value) {
	return async (dispatch, getState, api) => {
		const { sessionId, ...rest } = getState().auth;
		await axios({
			method: "post",
			url: `${api.URL}/account/${rest.id}/favorite?api_key=${api.KEY}&session_id=${sessionId}`,
			headers: {},
			data: {
				media_type,
				media_id: id,
				favorite: value,
			},
		})
			.then(() => {
				dispatch(update_favorite(media_type));
			})
			.catch((err) => console.log(err));
	};
}

function watchlist(id, media_type, value) {
	return async (dispatch, getState, api) => {
		const { sessionId, ...rest } = getState().auth;
		await axios({
			method: "post",
			url: `${api.URL}/account/${rest.id}/watchlist?api_key=${api.KEY}&session_id=${sessionId}`,
			headers: {},
			data: {
				media_type,
				media_id: id,
				watchlist: value,
			},
		})
			.then(() => {
				dispatch(update_watchlist(media_type));
			})
			.catch((err) => console.log(err));
	};
}

export {
	login,
	login_success,
	login_start,
	login_faild,
	toggle_error,
	logout_start,
	logout_success,
	logout_faild,
	logout,
	update_favorite,
	update_watchlist,
	favorite,
	watchlist,
};
