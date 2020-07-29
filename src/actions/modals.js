import { TOGGLE_LOGIN_MODAL, TOGGLE_VIDEO_MODAL } from 'constants/modals';

export const toggleVideoModal = (payload) => ({
  type: TOGGLE_VIDEO_MODAL,
  payload,
});

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
});
