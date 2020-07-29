import {
  DISCOVERY_LOADING,
  DISCOVERY_SUCCESS,
  DISCOVERY_UPDATE,
  DISCOVERY_FAILD,
  DISCOVERY_SET_LAST_PAGE,
} from 'constants/discovery-view';

import { getFirstListOfKey, getListOfKeyAndPage } from 'api/media';

const loadingMediaList = (key) => ({
  type: DISCOVERY_LOADING,
  key,
});
const successMediaList = (key, value) => ({
  type: DISCOVERY_SUCCESS,
  payload: {
    value,
    key,
  },
});
const updateMediaList = (key, value) => ({
  type: DISCOVERY_UPDATE,
  payload: {
    value,
    key,
  },
});
const faildMediaList = (key, value) => ({
  type: DISCOVERY_FAILD,
  payload: {
    value,
    key,
  },
});

const setLastPageOfMediaList = (key, value) => ({
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
  return async (dispatch, getState, api) => {
    dispatch(loadingMediaList(key));
    await getFirstListOfKey(key)
      .then(({ data }) => {
        const { results, cast, total_pages: totalPages } = data;
        dispatch(successMediaList(key, results ?? cast ?? data));
        dispatch(setLastPageOfMediaList(key, +totalPages - 1));
      })
      .catch((err) => dispatch(faildMediaList(key, err)));
  };
};

export const fetchMulti = (key, page) => {
  return async (dispatch, getState, api) => {
    dispatch(loadingMediaList(key));
    await getListOfKeyAndPage(key, page)
      .then(({ data }) => {
        const { results, cast, total_pages: totalPages } = data;
        dispatch(updateMediaList(key, results ?? cast ?? data));
        dispatch(setLastPageOfMediaList(key, +totalPages - page));
      })
      .catch((err) => dispatch(faildMediaList(key, err)));
  };
};
