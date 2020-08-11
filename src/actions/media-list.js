import {
  DISCOVERY_LOADING,
  DISCOVERY_SUCCESS,
  DISCOVERY_UPDATE,
  DISCOVERY_FAILD,
  DISCOVERY_SET_LAST_PAGE,
} from 'constants/discovery-view';

import { getFirstListOfKey, getListOfKeyAndPage } from 'api/media';

export const fetchMediaListLoading = (key) => ({
  type: DISCOVERY_LOADING,
  key,
});
export const fetchMediaListSuccess = (key, value) => ({
  type: DISCOVERY_SUCCESS,
  payload: {
    value,
    key,
  },
});
export const fetchMediaListUpdate = (key, value) => ({
  type: DISCOVERY_UPDATE,
  payload: {
    value,
    key,
  },
});
export const fetchMediaListFailed = (key, value) => ({
  type: DISCOVERY_FAILD,
  payload: {
    value,
    key,
  },
});

export const setLastPageOfMediaList = (key, value) => ({
  type: DISCOVERY_SET_LAST_PAGE,
  payload: {
    value,
    key,
  },
});

export const clearMediaList = (key) => ({
  type: DISCOVERY_SUCCESS,
  payload: {
    value: [],
    key,
  },
});

export const fetchOnce = (key) => {
  return async (dispatch, getState) => {
    dispatch(fetchMediaListLoading(key));
    await getFirstListOfKey(key)
      .then(({ data }) => {
        const { results, cast, total_pages: totalPages } = data;
        dispatch(fetchMediaListSuccess(key, results ?? cast ?? data));
        dispatch(setLastPageOfMediaList(key, +totalPages - 1));
      })
      .catch((err) => dispatch(fetchMediaListFailed(key, err)));
  };
};

export const fetchMulti = (key, page) => {
  return async (dispatch, getState) => {
    dispatch(fetchMediaListLoading(key));
    await getListOfKeyAndPage(key, page)
      .then(({ data }) => {
        const { results, cast, total_pages: totalPages } = data;
        dispatch(fetchMediaListUpdate(key, results ?? cast ?? data));
        dispatch(setLastPageOfMediaList(key, +totalPages - page));
      })
      .catch((err) => dispatch(fetchMediaListFailed(key, err)));
  };
};
