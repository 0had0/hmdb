import { LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILD } from 'constants/auth';

export const logoutStart = () => ({
  type: LOGOUT_START,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFaild = () => ({
  type: LOGOUT_FAILD,
});
