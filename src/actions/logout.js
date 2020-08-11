import { deleteSessionId } from 'api/auth';

import { LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILD } from 'constants/auth';

import { updateName } from './user';

const fetchLogoutStart = () => ({
  type: LOGOUT_START,
});

const fetchLogoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const fetchLogoutFailed = () => ({
  type: LOGOUT_FAILD,
});

export default () => {
  return async (dispatch, getState) => {
    dispatch(fetchLogoutStart());
    const { auth } = getState();
    await deleteSessionId(auth.sessionId)
      .then(() => {
        localStorage.removeItem('session_id');
        localStorage.removeItem('id');
        dispatch(updateName(null));
        dispatch(fetchLogoutSuccess());
      })
      .catch(() => dispatch(fetchLogoutFailed()));
  };
};
