import axios from "axios";

import { updateFavorite as updateFavoriteAction } from "actions/user/favorite.action";
import { updateWatchlist as updateWatchlistAction } from "actions/user/watchlist.action";

export const updateFavorite = () => {
	return async (dispatch, getState, api) => {
		const { sessionId, id } = getState().auth;
		await axios
			.all([
				axios.get(
					`${api.URL}/account/${id}/favorite/movie?api_key=${api.KEY}&session_id=${sessionId}`
				),
				axios.get(
					`${api.URL}/account/${id}/favorite/tv?api_key=${api.KEY}&session_id=${sessionId}`
				),
			])
			.then(
				axios.spread((...responses) => {
					const [movie, tv] = responses;
					dispatch(updateFavoriteAction({ movie, tv }));
				})
			)
			.catch((err) => console.log(err));
	};
};

export const toggleFavorite = (toggle, mediaType, id) => {
	return async (dispatch, getState, api) => {
		const { sessionId, ...rest } = getState().auth;
		await axios({
			method: "post",
			url: `${api.URL}/account/${rest.id}/favorite?api_key=${api.KEY}&session_id=${sessionId}`,
			headers: {},
			data: {
				media_type: mediaType,
				media_id: id,
				favorite: toggle,
			},
		}).then(() => {
			dispatch(updateFavorite());
		});
	};
};

export const updateWatchlist = () => {
	return async (dispatch, getState, api) => {
		const { sessionId, id } = getState().auth;
		await axios
			.all([
				axios.get(
					`${api.URL}/account/${id}/watchlist/movie?api_key=${api.KEY}&session_id=${sessionId}`
				),
				axios.get(
					`${api.URL}/account/${id}/watchlist/tv?api_key=${api.KEY}&session_id=${sessionId}`
				),
			])
			.then(
				axios.spread((...responses) => {
					const [movie, tv] = responses;
					dispatch(updateWatchlistAction({ movie, tv }));
				})
			)
			.catch((err) => console.log(err));
	};
};

export const toggleWatchlist = (toggle, mediaType, id) => {
	return async (dispatch, getState, api) => {
		const { sessionId, ...rest } = getState().auth;
		await axios({
			method: "post",
			url: `${api.URL}/account/${rest.id}/watchlist?api_key=${api.KEY}&session_id=${sessionId}`,
			headers: {},
			data: {
				media_type: mediaType,
				media_id: id,
				watchlist: toggle,
			},
		}).then(() => {
			dispatch(updateWatchlist());
		});
	};
};
