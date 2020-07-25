import {
	OVERVIEW_FETCH_START,
	OVERVIEW_FETCH_SUCCESS,
	OVERVIEW_FETCH_FAILD,
} from "constants/overview-view";

export const overviewFetchStart = () => ({
	type: OVERVIEW_FETCH_START,
});
export const overviewFetchSuccess = (payload) => ({
	type: OVERVIEW_FETCH_SUCCESS,
	payload,
});
export const overviewFetchFaild = (payload) => ({
	type: OVERVIEW_FETCH_FAILD,
	payload,
});
