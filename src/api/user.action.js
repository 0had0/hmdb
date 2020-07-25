import axios from "axios";

import { updateFavorite as updateFavoriteAction } from "actions/user/favorite.action";
import { updateWatchlist as updateWatchlistAction } from "actions/user/watchlist.action";

export const updateFavorite = () => {
	return async (dispatch, getState, api) => {
		const { sessionId, id } = getState().auth;
		console.log(getState().auth);
		await axios
			.all([
				axios.get(
					`${api.URL}/account/${id}/favorite/movies?api_key=${api.KEY}&session_id=${sessionId}`
				),
				axios.get(
					`${api.URL}/account/${id}/favorite/tv?api_key=${api.KEY}&session_id=${sessionId}`
				),
			])
			.then(
				axios.spread((...responses) => {
					const [movie, tv] = responses;
					dispatch(
						updateFavoriteAction({
							movie: movie.data.results.map((am) => am.id),
							tv: tv.data.results.map((am) => am.id),
						})
					);
				})
			)
			.catch((err) => console.log(err));
	};
};

export const toggleFavorite = (id, mediaType, toggle) => {
	return async (dispatch, getState, api) => {
		const { sessionId, ...rest } = getState().auth;
		await axios({
			method: "post",
			url: `${api.URL}/account/${rest.id}/favorite?api_key=${api.KEY}&session_id=${sessionId}`,
			headers: {},
			data: {
				media_type: mediaType,
				media_id: +id,
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
					`${api.URL}/account/${id}/watchlist/movies?api_key=${api.KEY}&session_id=${sessionId}`
				),
				axios.get(
					`${api.URL}/account/${id}/watchlist/tv?api_key=${api.KEY}&session_id=${sessionId}`
				),
			])
			.then(
				axios.spread((...responses) => {
					const [movie, tv] = responses;
					dispatch(
						updateWatchlistAction({
							movie: movie.data.results.map((am) => am.id),
							tv: tv.data.results.map((am) => am.id),
						})
					);
				})
			)
			.catch((err) => console.log(err));
	};
};

export const toggleWatchlist = (id, mediaType, toggle) => {
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
