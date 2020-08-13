import axios from 'axios';
import { cleanup } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch, {
  fetchOverviewStart,
  fetchOverviewSuccess,
  fetchOverviewFailed,
} from '../media-info';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

describe('Sync Media Info Action', () => {
  it('should return a valid fetchOverviewStart action', () => {
    const expectedAction = {
      type: 'OVERVIEW_FETCH_START',
    };
    expect(fetchOverviewStart()).toStrictEqual(expectedAction);
  });

  it('should return a valid fetchOverviewSuccess action', () => {
    const expectedAction = {
      type: 'OVERVIEW_FETCH_SUCCESS',
      payload: 'this is a payload',
    };
    expect(fetchOverviewSuccess('this is a payload')).toStrictEqual(
      expectedAction,
    );
  });

  it('should return a valid fetchOverviewFailed action', () => {
    const expectedAction = {
      type: 'OVERVIEW_FETCH_FAILD',
      payload: 'this is a payload',
    };
    expect(fetchOverviewFailed('this is a payload')).toStrictEqual(
      expectedAction,
    );
  });
});

describe('Media Info fetch Action', () => {
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
