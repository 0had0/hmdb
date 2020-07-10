import axios from "axios";
import {
	LOGIN_SUCCESS,
	LOGIN_START,
	LOGIN_FAILD,
	TOGGLE_ERROR,
	LOGOUT_START,
	LOGOUT_SUCCESS,
	LOGOUT_FAILD,
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
							}).then(({ data }) => {
								const { success, session_id } = data;

								if (success) {
									// add session ID to Redux
									localStorage.setItem(
										"session_id",
										session_id
									);
									dispatch(login_success(session_id));
									dispatch(toggle_modal());
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
				dispatch(logout_success());
			})
			.catch(() => dispatch(logout_faild()));
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
};
