import axios from 'axios';
import { getListMedia, setList } from 'api/user';

import { UPDATE_FAVORITE, UPDATE_WATCHLIST, UPDATE_NAME } from 'constants/user';

export const updateName = (payload) => ({
  type: UPDATE_NAME,
  payload,
});

export const updateWatchlist = (payload) => ({
  type: UPDATE_WATCHLIST,
  payload,
});

export const updateFavorite = (payload) => ({
  type: UPDATE_FAVORITE,
  payload,
});

export const fetchFavorite = () => {
  return async (dispatch, getState) => {
    const { sessionId, id } = getState().auth;
    await getListMedia('favorite', id, sessionId).then(
      axios.spread((...responses) => {
        const [movie, tv] = responses;
        dispatch(
          updateFavorite({
            movie: movie.data.results.map((am) => am.id),
            tv: tv.data.results.map((am) => am.id),
          }),
        );
      }),
    );
  };
};

export const toggleFavorite = (id, mediaType, value) => {
  return async (dispatch, getState) => {
    const { sessionId, id: userId } = getState().auth;
    await setList('favorite', userId, sessionId, mediaType, id, value).then(
      () => {
        dispatch(fetchFavorite());
      },
    );
  };
};

export const fetchWatchlist = () => {
  return async (dispatch, getState) => {
    const { sessionId, id } = getState().auth;
    await getListMedia('watchlist', id, sessionId).then(
      axios.spread((...responses) => {
        const [movie, tv] = responses;
        dispatch(
          updateWatchlist({
            movie: movie.data.results.map((am) => am.id),
            tv: tv.data.results.map((am) => am.id),
          }),
        );
      }),
    );
  };
};

export const toggleWatchlist = (id, mediaType, value) => {
  return async (dispatch, getState) => {
    const { sessionId, id: userId } = getState().auth;
    await setList('watchlist', userId, sessionId, mediaType, id, value).then(
      () => {
        dispatch(fetchWatchlist());
      },
    );
  };
};
