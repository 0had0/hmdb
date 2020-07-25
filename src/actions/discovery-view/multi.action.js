import {
	DISCOVERY_LOADING,
	DISCOVERY_SUCCESS,
	DISCOVERY_UPDATE,
	DISCOVERY_FAILD,
	DISCOVERY_SET_LAST_PAGE,
} from "constants/discovery-view";

export const loading = (key) => ({
	type: DISCOVERY_LOADING,
	key,
});
export const success = (key, value) => ({
	type: DISCOVERY_SUCCESS,
	payload: {
		value,
		key,
	},
});
export const update = (key, value) => ({
	type: DISCOVERY_UPDATE,
	payload: {
		value,
		key,
	},
});
export const faild = (key, value) => ({
	type: DISCOVERY_FAILD,
	payload: {
		value,
		key,
	},
});

export const setLastPageOf = (key, value) => ({
	type: DISCOVERY_SET_LAST_PAGE,
	payload: {
		value,
		key,
	},
});

export const clear = (key) => ({
	type: DISCOVERY_SUCCESS,
	payload: {
		value: [],
		key,
	},
});
