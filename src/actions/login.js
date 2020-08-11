import {
  getNewAPIToken,
  validateAPIToken,
  getSessionId,
  getAccountInfo,
} from 'api/auth';

import { LOGIN_SUCCESS, LOGIN_START, LOGIN_FAILD } from 'constants/auth';

import {
  fetchFavorite as updateWatchlist,
  fetchWatchlist as updateFavorite,
  updateName,
} from './user';
import { toggleLoginModal, setErrorMessage } from './modals';

const loginStart = () => ({
  type: LOGIN_START,
});

const loginSuccess = (id, sessionId) => ({
  type: LOGIN_SUCCESS,
  payload: {
    id,
    sessionId,
  },
});

const loginFaild = () => ({
  type: LOGIN_FAILD,
});

export default (username, password) => {
  return async (dispatch, getState) => {
    dispatch(loginStart());
    try {
      const { data: requestTokenData } = await getNewAPIToken();
      const { request_token: requestToken } = requestTokenData;
      const { data: tokenValidationData } = await validateAPIToken(
        username,
        password,
        requestToken,
      );
      if (tokenValidationData.success) {
        const { data: sessionIdData } = await getSessionId(requestToken);
        const { success, session_id: sessionId } = sessionIdData;
        if (success) {
          localStorage.setItem('session_id', sessionId);
          const { data: accountData } = await getAccountInfo(sessionId);
          dispatch(updateName(accountData.name));
          localStorage.setItem('id', accountData.id);
          dispatch(loginSuccess(+accountData.id, sessionId));
          dispatch(updateFavorite());
          dispatch(toggleLoginModal());
          dispatch(updateWatchlist());
        }
      }
    } catch (err) {
      dispatch(loginFaild());
      console.log(err);
      dispatch(setErrorMessage(err?.response?.data?.status_message));
    }
  };
};
