import axios from 'axios';
import { cleanup } from '@testing-library/react';
import fetch from '../media-info';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

describe('Media Info Action', () => {
  afterEach(cleanup);

  beforeEach(() => {
    store = mockStore({});
  });

  const mockAxiosSpreadResult = jest.fn();

  it('should overwrite data OVERVIEW_FETCH_SUCCESS', () => {
    axios.get.mockClear();
    axios.all.mockResolvedValue(['returned data']);
    axios.spread.mockReturnValue(mockAxiosSpreadResult);
    store.dispatch(fetch('movie', 1111)).then(() => {
      expect(mockAxiosSpreadResult).toHaveBeenCalledTimes(1);
      expect(mockAxiosSpreadResult).toHaveBeenCalledWith(['returned data']);
    });
  });
  it('should set error OVERVIEW_FETCH_FAILD', () => {
    const expectedActions = [
      { type: 'OVERVIEW_FETCH_START' },
      { type: 'OVERVIEW_FETCH_FAILD', payload: { message: 'error' } },
    ];
    axios.get.mockClear();
    axios.all.mockRejectedValue({ message: 'error' });
    store
      .dispatch(fetch('movie', 1111))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
