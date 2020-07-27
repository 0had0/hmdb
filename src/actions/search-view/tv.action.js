import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_UPDATE,
  SEARCH_FAILD,
  SEARCH_SET_PAGE_LEFT,
} from 'constants/search-view';

export const tvFetchStart = () => ({
  type: SEARCH_START,
  key: 'tv',
});
export const tvFetchSuccess = (value) => ({
  type: SEARCH_SUCCESS,
  payload: {
    value,
    key: 'tv',
  },
});
export const tvFetchUpdate = (value) => ({
  type: SEARCH_UPDATE,
  payload: {
    value,
    key: 'tv',
  },
});
export const tvFetchFaild = (value) => ({
  type: SEARCH_FAILD,
  payload: {
    value,
    key: 'tv',
  },
});

export const setTvLeftPages = (value) => ({
  type: SEARCH_SET_PAGE_LEFT,
  payload: {
    value,
    key: 'tv',
  },
});
