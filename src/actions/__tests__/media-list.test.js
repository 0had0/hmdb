import axios from 'axios';
import { cleanup } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { fetchOnce, fetchMulti } from '../media-list';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Discovery (media key) Action', () => {
  let store;

  afterEach(cleanup);

  beforeEach(() => {
    store = mockStore({});
  });

  it('should fetch one page of data', () => {
    const expectedActions = [
      { type: 'DISCOVERY_LOADING', key: 'popular_movies' },
      {
        type: 'DISCOVERY_SUCCESS',
        payload: {
          value: ['this', 'is', 'some', 'data'],
          key: 'popular_movies',
        },
      },
      {
        payload: {
          key: 'popular_movies',
          value: 1,
        },
        type: 'DISCOVERY_SET_LAST_PAGE',
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        results: ['this', 'is', 'some', 'data'],
        total_pages: 2,
      },
    });

    store
      .dispatch(fetchOnce('popular_movies'))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should update the exiting data when fetching second page', () => {
    const expectedActions = [
      { type: 'DISCOVERY_LOADING', key: 'popular_movies' },
      {
        type: 'DISCOVERY_UPDATE',
        payload: {
          value: ['this', 'is', 'some', 'data'],
          key: 'popular_movies',
        },
      },
      {
        type: 'DISCOVERY_SET_LAST_PAGE',
        payload: { value: 2, key: 'popular_movies' },
      },
    ];
    axios.get.mockResolvedValueOnce({
      data: {
        results: ['this', 'is', 'some', 'data'],
        page: 2,
        total_pages: 4,
      },
    });

    store
      .dispatch(fetchMulti('popular_movies', 2))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should send connection error on rejection', () => {
    const expectedActions = [
      { type: 'DISCOVERY_LOADING', key: 'popular_movies' },
      {
        type: 'DISCOVERY_FAILD',
        payload: { value: {}, key: 'popular_movies' },
      },
    ];
    axios.get.mockRejectedValueOnce({});

    store
      .dispatch(fetchOnce('popular_movies', 'asdasdas', 1, '217836812'))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
