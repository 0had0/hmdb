import { Machine, createModel } from 'xstate';

const inputMachine = Machine({
  id: 'search-input',
  initial: 'focused',
  on: {
    UNFOCUS: 'unfocused',
  },
  states: {
    focused: {
      on: {
        TYPE: 'loading',
      },
    },
    unfocused: {
      on: {
        OPEN: 'focused',
        CLICK: 'unfocused',
      },
    },
    error: {
      on: {
        TYPE: 'loading',
      },
    },
    loading: {
      on: {
        SUCCESS: 'focused',
        FAILD: 'error',
      },
    },
  },
});

export default createModel(inputMachine).withEvents({
  UNFOCUS: {
    exec: async ({ getByTestId, fireEvent }) => {
      await fireEvent.click(getByTestId('search-icon'));
    },
  },
  FOCUS: {
    exec: async ({ getByTestId, fireEvent }) => {
      await fireEvent.click(getByTestId('search-input'));
    },
  },
});
