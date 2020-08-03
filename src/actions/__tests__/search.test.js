import axios from 'axios';
import { cleanup } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchOnce, fetchMulti } from '../search';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search Action', () => {
  let store;

  afterEach(cleanup);

  beforeEach(() => {
    store = mockStore({});
  });

  it('should fetch one page of data', () => {
    const expectedActions = [
      { type: 'SEARCH_START', key: 'movie' },
      {
        type: 'SEARCH_SUCCESS',
        payload: { value: ['this', 'is', 'some', 'data'], key: 'movie' },
      },
      {
        payload: {
          key: 'movie',
          value: 1,
        },
        type: 'SEARCH_SET_PAGE_LEFT',
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        results: ['this', 'is', 'some', 'data'],
        total_pages: 2,
      },
    });

    store
      .dispatch(fetchOnce('movie', 'hulk', '217836812'))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should update the exiting data when fetching second page', () => {
    const expectedActions = [
      { type: 'SEARCH_START', key: 'movie' },
      {
        type: 'SEARCH_UPDATE',
        payload: { value: ['this', 'is', 'some', 'data'], key: 'movie' },
      },
      { type: 'SEARCH_SET_PAGE_LEFT', payload: { value: 2, key: 'movie' } },
    ];
    axios.get.mockResolvedValueOnce({
      data: {
        results: ['this', 'is', 'some', 'data'],
        page: 2,
        total_pages: 4,
      },
    });

    store
      .dispatch(fetchMulti('movie', 'hulk', 2, '217836812'))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should send no more error on empty response', () => {
    const expectedActions = [
      { type: 'SEARCH_START', key: 'movie' },
      {
        type: 'SEARCH_FAILD',
        payload: { value: { message: 'No Results 🙄🤔' }, key: 'movie' },
      },
    ];
    axios.get.mockResolvedValueOnce({
      data: {
        results: [],
        page: 0,
        total_pages: 0,
      },
    });

    store
      .dispatch(fetchOnce('movie', 'asdasdas', 1, '217836812'))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should send connection error on rejection', () => {
    const expectedActions = [
      { type: 'SEARCH_START', key: 'movie' },
      {
        type: 'SEARCH_FAILD',
        payload: { value: { message: 'Connection Error 😢😭' }, key: 'movie' },
      },
    ];
    axios.get.mockRejectedValueOnce({});

    store
      .dispatch(fetchOnce('movie', 'asdasdas', 1, '217836812'))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
