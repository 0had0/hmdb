import { TOGGLE_MODAL } from "../constants";
const initState = {
	toggleModal: false,
};

export default (state = initState, action) => {
	switch (action.type) {
		case TOGGLE_MODAL: {
			return { ...state, toggleModal: !state.toggleModal };
		}
		default: {
			return state;
		}
	}
};
