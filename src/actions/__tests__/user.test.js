import axios from 'axios';
import { cleanup } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  fetchFavorite,
  updateName,
  updateWatchlist,
  updateFavorite,
} from '../user';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Sync User Action', () => {
  it('should return a valid updateName action', () => {
    const expectedAction = {
      type: 'UPDATE_NAME',
      payload: "I'm the payload",
    };
    expect(updateName("I'm the payload")).toStrictEqual(expectedAction);
  });

  it('should return a valid updateWatchlist action', () => {
    const expectedAction = {
      type: 'UPDATE_WATCHLIST',
      payload: "I'm the payload",
    };
    expect(updateWatchlist("I'm the payload")).toStrictEqual(expectedAction);
  });
  it('should return a valid updateFavorite action', () => {
    const expectedAction = {
      type: 'UPDATE_FAVORITE',
      payload: "I'm the payload",
    };
    expect(updateFavorite("I'm the payload")).toStrictEqual(expectedAction);
  });
});

describe('User fetch Action', () => {
  let store;

  const mockAxiosSpreadResult = jest.fn();

  afterEach(cleanup);

  beforeEach(
    () =>
      (store = mockStore({
        auth: { sessionId: 0, id: 0 },
        user: { favorite: { movie: [], tv: [] } },
      })),
  );

  it('should update favorites lists', () => {
    axios.get.mockClear();
    //response value
    axios.all.mockResolvedValue([['some movies'], ['some series']]);
    //contain dispatch so should be called 1 time
    axios.spread.mockReturnValue(mockAxiosSpreadResult);

    store.dispatch(fetchFavorite()).then(() => {
      //have to be called on time
      expect(mockAxiosSpreadResult).toHaveBeenCalledTimes(1);
      //should be called with the response value
      expect(mockAxiosSpreadResult).toHaveBeenCalledWith([
        ['some movies'],
        ['some series'],
      ]);
    });
  });
});
