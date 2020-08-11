import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_UPDATE,
  SEARCH_FAILD,
  SEARCH_SET_PAGE_LEFT,
} from 'constants/search-view';

import { fetchMediaFirstPage, fetchMediaPage } from 'api/search';

export const mediaFetchStart = (key) => ({
  type: SEARCH_START,
  key,
});
export const fetchMediaSuccess = (key, value) => ({
  type: SEARCH_SUCCESS,
  payload: {
    value,
    key,
  },
});
export const fetchMediaUpdate = (key, value) => ({
  type: SEARCH_UPDATE,
  payload: {
    value,
    key,
  },
});
export const fetchMediaFailed = (key, value) => ({
  type: SEARCH_FAILD,
  payload: {
    value,
    key,
  },
});

export const setMediaLeftPages = (key, value) => ({
  type: SEARCH_SET_PAGE_LEFT,
  payload: {
    value,
    key,
  },
});

export const fetchOnce = (mediaType, query, cancelToken, adult = false) => {
  return async (dispatch, getState, api) => {
    dispatch(mediaFetchStart(mediaType));
    await fetchMediaFirstPage(mediaType, query, cancelToken, adult)
      .then(({ data }) => {
        if (data.length === 0 || data.total_pages === 0) {
          dispatch(fetchMediaFailed(mediaType, { message: 'No Results 🙄🤔' }));
        } else {
          dispatch(fetchMediaSuccess(mediaType, data.results));
          dispatch(setMediaLeftPages(mediaType, +data.total_pages - 1));
        }
      })
      .catch(() =>
        dispatch(
          fetchMediaFailed(mediaType, { message: 'Connection Error 😢😭' }),
        ),
      );
  };
};

export const fetchMulti = (mediaType, query, page, adult = false) => {
  return async (dispatch, getState, api) => {
    dispatch(mediaFetchStart(mediaType));
    await fetchMediaPage(mediaType, query, page, adult)
      .then(({ data }) => {
        if (data.length === 0 || data.total_pages === 0) {
          dispatch(fetchMediaFailed(mediaType, { message: 'No Results 🙄🤔' }));
        } else {
          dispatch(fetchMediaUpdate(mediaType, data.results));
          dispatch(setMediaLeftPages(mediaType, +data.total_pages - page));
        }
      })
      .catch(() =>
        dispatch(
          fetchMediaFailed(mediaType, { message: 'Connection Error 😢😭' }),
        ),
      );
  };
};
