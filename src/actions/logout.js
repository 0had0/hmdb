import { deleteSessionId } from 'api/auth';

import { LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILD } from 'constants/auth';

import { updateName } from './user';

const logoutStart = () => ({
  type: LOGOUT_START,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFaild = () => ({
  type: LOGOUT_FAILD,
});

export default () => {
  return async (dispatch, getState, api) => {
    dispatch(logoutStart());
    const { auth } = getState();
    await deleteSessionId(auth.sessionId)
      .then(() => {
        localStorage.removeItem('session_id');
        localStorage.removeItem('id');
        dispatch(updateName(null));
        dispatch(logoutSuccess());
      })
      .catch(() => dispatch(logoutFaild()));
  };
};
