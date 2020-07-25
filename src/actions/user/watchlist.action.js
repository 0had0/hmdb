import { UPDATE_WATCHLIST } from "constants/user";

export const updateWatchlist = (payload) => ({
	type: UPDATE_WATCHLIST,
	payload,
});
