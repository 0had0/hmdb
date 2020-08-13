import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_VIDEO_MODAL,
  ERROR_MESSAGE,
} from 'constants/modals';

export const toggleVideoModal = (payload) => ({
  type: TOGGLE_VIDEO_MODAL,
  payload,
});

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
});

export const setErrorMessage = (payload) => ({
  type: ERROR_MESSAGE,
  payload,
});
