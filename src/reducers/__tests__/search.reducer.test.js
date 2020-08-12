import { cleanup } from '@testing-library/react';

import * as TYPES from 'constants/search-view';
import reducer from 'reducers/search.reducer';

const initState = {
  loading: {
    movie: false,
  },
  data: {
    movie: ['initial data'],
  },
  error: { movie: null },
  pages_left: {
    movie: 2,
  },
};

describe('search reducer', () => {
  afterEach(cleanup);

  it('should set toggle loading on SEARCH_START', () => {
    const testAction = { type: TYPES.SEARCH_START, key: 'movie' };
    const finalState = reducer(initState, testAction);
    expect(finalState.loading.movie === initState.loading.movie).toBe(false);
  });

  it('should overwrite data on SEARCH_SUCCESS', () => {
    const testAction = {
      type: TYPES.SEARCH_SUCCESS,
      payload: { key: 'movie', value: ['overwrite data'] },
    };
    const expectedState = { ...initState, data: { movie: ['overwrite data'] } };
    const finalState = reducer(initState, testAction);
    expect(finalState).toEqual(expectedState);
  });

  it('should update data on SEARCH_UPDATE', () => {
    const testAction = {
      type: TYPES.SEARCH_UPDATE,
      payload: { key: 'movie', value: ['added data'] },
    };
    const expectedState = {
      ...initState,
      data: { movie: ['initial data', 'added data'] },
    };
    const finalState = reducer(initState, testAction);
    expect(finalState).toEqual(expectedState);
  });

  it('should set error message on SEARCH_FAILD', () => {
    const testAction = {
      type: TYPES.SEARCH_FAILD,
      payload: { key: 'movie', value: { message: 'error!' } },
    };
    const expectedState = {
      ...initState,
      data: { movie: [] },
      error: { movie: { message: 'error!' } },
    };
    const finalState = reducer(initState, testAction);
    expect(finalState).toEqual(expectedState);
  });

  it('should set pages left on SEARCH_SET_PAGE_LEFT', () => {
    const testAction = {
      type: TYPES.SEARCH_SET_PAGE_LEFT,
      payload: { key: 'movie', value: 3 },
    };
    const expectedState = {
      ...initState,
      pages_left: { movie: 3 },
    };
    const finalState = reducer(initState, testAction);
    expect(finalState).toEqual(expectedState);
  });
});
