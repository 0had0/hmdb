import {
  OVERVIEW_FETCH_START,
  OVERVIEW_FETCH_SUCCESS,
  OVERVIEW_FETCH_FAILD,
} from 'constants/overview-view';

import { getMediaInfo } from 'api/media';

export const fetchOverviewStart = () => ({
  type: OVERVIEW_FETCH_START,
});
export const fetchOverviewSuccess = (payload) => ({
  type: OVERVIEW_FETCH_SUCCESS,
  payload,
});
export const fetchOverviewFailed = (payload) => ({
  type: OVERVIEW_FETCH_FAILD,
  payload,
});

export default (id, mediaType) => {
  return async (dispatch, getState, api) => {
    dispatch(fetchOverviewStart());
    await getMediaInfo(mediaType, id, (...responses) => {
      const [
        detailsRes,
        videosRes,
        similarRes,
        reviewsRes,
        creditsRes,
      ] = responses;
      dispatch(
        fetchOverviewSuccess({
          details: detailsRes.data,
          videos: videosRes.data.results,
          similar: similarRes.data.results,
          reviews: reviewsRes.data.results,
          credits:
            creditsRes.data.cast.length === 0
              ? creditsRes.data.crew
              : creditsRes.data.cast,
        }),
      );
    }).catch((errors) => dispatch(fetchOverviewFailed(errors)));
  };
};
