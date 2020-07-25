import axios from "axios";

import {
	loginStart,
	loginSuccess,
	loginFaild,
} from "actions/auth/login.action";
import {
	logoutStart,
	logoutSuccess,
	logoutFaild,
} from "actions/auth/logout.action";

import { updateName } from "actions/user/name.action";
import { setErrorMessage } from "actions/modals/login.action";

import { updateFavorite, updateWatchlist } from "api/user.action";

export const login = (username, password) => {
	return async (dispatch, getState, api) => {
		dispatch(loginStart());
		await axios
			.get(`${api.URL}/authentication/token/new?api_key=${api.KEY}`)
			.then(async ({ data }) => {
				const { request_token } = data;
				await axios({
					method: "post",
					url: `${api.URL}/authentication/token/validate_with_login?api_key=${api.KEY}`,
					headers: {},
					data: {
						username,
						password,
						request_token,
					},
				})
					.then(async ({ data }) => {
						const { success, session_id } = data;
						if (success) {
							localStorage.setItem("session_id", session_id);
							dispatch(loginSuccess(session_id));
							// toggle login modal
							await axios
								.get(
									`${api.URL}/account?api_key=${api.KEY}&session_id=${session_id}`
								)
								.then(({ data }) => {
									dispatch(updateName(data.name));
									localStorage.setItem("id", data.id);
									dispatch(updateFavorite());
									dispatch(updateWatchlist());
								});
						}
					})
					.catch((err) => {
						dispatch(
							setErrorMessage(err.response.data.status_message)
						);
					});
			});
	};
};

export const logout = () => {
	return async (dispatch, getState, api) => {
		dispatch(logoutStart());
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
				dispatch(updateName(null));
				dispatch(logoutSuccess());
			})
			.catch(() => dispatch(logoutFaild()));
	};
};
