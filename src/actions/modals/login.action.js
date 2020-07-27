import { TOGGLE_LOGIN_MODAL, ERROR_MESSAGE } from 'constants/modals';

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
});

export const setErrorMessage = (payload) => ({
  type: ERROR_MESSAGE,
  payload,
});
