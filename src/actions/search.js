import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_UPDATE,
  SEARCH_FAILD,
  SEARCH_SET_PAGE_LEFT,
} from 'constants/search-view';

import { fetchMediaFirstPage, fetchMediaPage } from 'api/search';

const mediaFetchStart = (key) => ({
  type: SEARCH_START,
  key,
});
const mediaFetchSuccess = (key, value) => ({
  type: SEARCH_SUCCESS,
  payload: {
    value,
    key,
  },
});
const mediaFetchUpdate = (key, value) => ({
  type: SEARCH_UPDATE,
  payload: {
    value,
    key,
  },
});
const mediaFetchFaild = (key, value) => ({
  type: SEARCH_FAILD,
  payload: {
    value,
    key,
  },
});

const setMediaLeftPages = (key, value) => ({
  type: SEARCH_SET_PAGE_LEFT,
  payload: {
    value,
    key,
  },
});

export const fetchOnce = (mediaType, query, cancelToken, adult = false) => {
  return async (dispatch, getState, api) => {
    dispatch(mediaFetchStart(mediaType));
    await fetchMediaFirstPage(mediaType, query, adult, cancelToken)
      .then(({ data }) => {
        if (data.length === 0 || data.total_pages === 0) {
          dispatch(mediaFetchFaild(mediaType, 'No results :('));
        } else {
          dispatch(mediaFetchSuccess(mediaType, data.results));
          dispatch(setMediaLeftPages(mediaType, +data.total_pages - 1));
        }
      })
      .catch((err) => dispatch(mediaFetchFaild(mediaType, err.status_message)));
  };
};

export const fetchMulti = (mediaType, query, page, adult = false) => {
  return async (dispatch, getState, api) => {
    dispatch(mediaFetchStart(mediaType));
    await fetchMediaPage(mediaType, query, page, adult)
      .then(({ data }) => {
        if (data.length === 0 || data.total_pages === 0) {
          dispatch(mediaFetchFaild(mediaType, 'No More results :('));
        } else {
          dispatch(mediaFetchUpdate(mediaType, data.results));
          dispatch(setMediaLeftPages(mediaType, +data.total_pages - page));
        }
      })
      .catch((err) => dispatch(mediaFetchFaild(mediaType, err.status_message)));
  };
};
