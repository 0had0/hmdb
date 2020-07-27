import axios from 'axios';

import {
  moviesFetchStart,
  moviesFetchSuccess,
  moviesFetchUpdate,
  moviesFetchFaild,
  setMovieLeftPages,
} from 'actions/search-view/movie.action';
import {
  tvFetchStart,
  tvFetchSuccess,
  tvFetchUpdate,
  tvFetchFaild,
  setTvLeftPages,
} from 'actions/search-view/tv.action';
import { getUrlOf } from './common.function';

export const fetchMoviesOnce = (query, cancelToken, adult = false) => {
  return async (dispatch, getState, api) => {
    dispatch(moviesFetchStart());
    await axios
      .get(getUrlOf('search_movie', api, query, adult), { cancelToken })
      .then(({ data }) => {
        if (data.length === 0 || data.total_pages === 0) {
          dispatch(moviesFetchFaild('No results :('));
        } else {
          dispatch(moviesFetchSuccess(data.results));
          dispatch(setMovieLeftPages(+data.total_pages - 1));
        }
      })
      .catch((err) => dispatch(moviesFetchFaild(err.status_message)));
  };
};

export const fetchMoviesMulti = (query, page, adult = false) => {
  return async (dispatch, getState, api) => {
    dispatch(moviesFetchStart());
    await axios
      .get(getUrlOf('search_movie', api, query, null, page, adult))
      .then(({ data }) => {
        if (data.length === 0 || data.total_pages === 0) {
          dispatch(moviesFetchFaild('No More results :('));
        } else {
          dispatch(moviesFetchUpdate(data.results));
          dispatch(setMovieLeftPages(+data.total_pages - page));
        }
      })
      .catch((err) => dispatch(moviesFetchFaild(err.status_message)));
  };
};

export const fetchTvOnce = (query, cancelToken, adult = false) => {
  return async (dispatch, getState, api) => {
    dispatch(tvFetchStart());
    await axios
      .get(getUrlOf('search_tv', api, query, adult), { cancelToken })
      .then(({ data }) => {
        if (data.length === 0 || data.total_pages === 0) {
          dispatch(tvFetchFaild('No results :('));
        } else {
          dispatch(tvFetchSuccess(data.results));
          dispatch(setTvLeftPages(+data.total_pages - 1));
        }
      })
      .catch((err) => dispatch(tvFetchFaild(err.status_message)));
  };
};

export const fetchTvMulti = (query, page, adult = false) => {
  return async (dispatch, getState, api) => {
    dispatch(tvFetchStart());
    await axios
      .get(getUrlOf('search_tv', api, query, null, page, adult))
      .then(({ data }) => {
        if (data.length === 0 || data.total_pages === 0) {
          dispatch(tvFetchFaild('No More results :('));
        } else {
          dispatch(tvFetchUpdate(data.results));
          dispatch(setTvLeftPages(+data.total_pages - page));
        }
      })
      .catch((err) => dispatch(tvFetchFaild(err.status_message)));
  };
};
