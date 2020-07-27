import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_VIDEO_MODAL,
  ERROR_MESSAGE,
} from 'constants/modals';

const initState = {
  toggleLoginModal: false,
  toggleVideoModal: false,
  videoModalKey: null,
  errorMessage: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL: {
      return {
        ...state,
        toggleLoginModal: !state.toggleLoginModal,
      };
    }
    case TOGGLE_VIDEO_MODAL: {
      return {
        ...state,
        toggleVideoModal: !state.toggleVideoModal,
        videoModalKey: !state.toggleVideoModal ? action.payload : null,
      };
    }
    case ERROR_MESSAGE: {
      return { ...state, errorMessage: action.payload };
    }
    default: {
      return state;
    }
  }
};
