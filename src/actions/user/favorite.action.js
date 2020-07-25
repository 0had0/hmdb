import { UPDATE_FAVORITE } from "constants/user";

export const updateFavorite = (payload) => ({
	type: UPDATE_FAVORITE,
	payload,
});
