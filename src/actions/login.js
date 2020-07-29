import {
  getNewAPIToken,
  validateAPIToken,
  getSessionId,
  getAccountInfo,
} from 'api/auth';

import { LOGIN_SUCCESS, LOGIN_START, LOGIN_FAILD } from 'constants/auth';

import { updateWatchlist, updateFavorite, updateName } from './user';
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
  return async (dispatch, getState, api) => {
    dispatch(loginStart());
    await getNewAPIToken().then(async ({ data }) => {
      const { request_token: requestToken } = data;
      await validateAPIToken(username, password, requestToken)
        .then(async ({ data: tokenValidationData }) => {
          if (tokenValidationData.success) {
            await getSessionId(requestToken).then(
              async ({ data: sessionIdData }) => {
                const { success, session_id: sessionId } = sessionIdData;
                if (success) {
                  localStorage.setItem('session_id', sessionId);
                  await getAccountInfo(sessionId).then(
                    ({ data: accountData }) => {
                      dispatch(updateName(accountData.name));
                      localStorage.setItem('id', accountData.id);
                      dispatch(loginSuccess(+accountData.id, sessionId));
                      dispatch(updateFavorite());
                      dispatch(toggleLoginModal());
                      dispatch(updateWatchlist());
                    },
                  );
                }
              },
            );
          }
        })
        .catch((err) => {
          dispatch(loginFaild());
          dispatch(setErrorMessage(err.response.data.status_message));
        });
    });
  };
};
