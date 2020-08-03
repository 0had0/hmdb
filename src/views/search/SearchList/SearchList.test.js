import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import SearchList from '.';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/search',
    search: '?q=you-will-find-nothing',
  }),
  useHistory: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

const initState = {
  app: {
    search: {
      data: {
        movie: [],
        tv: [],
      },
      loading: {
        movie: false,
        tv: false,
      },
      error: {
        movie: null,
        tv: null,
      },
      pages_left: {
        movie: 2,
        tv: 2,
      },
    },
  },
};

let store;

describe('before fetch', () => {
  store = mockStore(initState);
  it('should render loading progress', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchList />
      </Provider>,
    );
    expect(getByTestId('search-progress')).not.toBeNull();
  });
});

describe('after fetch', () => {
  afterEach(cleanup);

  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  it('should render error message on error', () => {
    store = mockStore({
      app: {
        search: {
          ...initState.app.search,
          error: {
            movie: { message: 'this is an error message' },
          },
        },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <SearchList mediaType="movie" />
      </Provider>,
    );

    expect(getByText(/this is an error message/)).not.toBeNull();
  });

  it('should render data', () => {
    store = mockStore({
      app: {
        search: {
          ...initState.app.search,
          data: {
            movie: [{}, {}, {}],
          },
        },
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <SearchList mediaType="movie" />
      </Provider>,
    );
    expect(getByTestId('search-results')).not.toBeNull();
  });
});
