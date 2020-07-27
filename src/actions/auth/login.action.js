import { LOGIN_SUCCESS, LOGIN_START, LOGIN_FAILD } from 'constants/auth';

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (id, sessionId) => ({
  type: LOGIN_SUCCESS,
  payload: {
    id,
    sessionId,
  },
});

export const loginFaild = () => ({
  type: LOGIN_FAILD,
});
