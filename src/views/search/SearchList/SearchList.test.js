import React from 'react';
import { Provider } from 'react-redux';
import { render, getByText } from '@testing-library/react';
import configureStore from 'redux-mock-store';

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

jest.mock('axios', () => ({
  get: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ data: { results: ['lsak', 'asodk'] } }),
    ),
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      cancel: jest.fn(),
      token: '',
    })),
  },
}));

const mockStore = configureStore([]);

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

describe('on error message', () => {
  const fetchOnce = jest.fn();
  const fetchNext = jest.fn();

  let store = mockStore({
    app: {
      search: {
        ...initState.app.search,
        error: {
          movie: { message: 'No Results 🙄🤔' },
          tv: { message: 'No Results 🙄🤔' },
        },
      },
    },
  });

  it('should render a no results message if data is empty', async () => {
    const { container } = render(
      <Provider store={store}>
        <SearchList
          mediaType="movie"
          sort={null}
          fetch={fetchOnce}
          fetchNext={fetchNext}
        />
      </Provider>,
    );
    expect(container.querySelector('.error')).not.toBeNull();
    expect(
      await getByText(
        container.querySelector('.notify-text'),
        'No Results 🙄🤔',
      ),
    ).toBeInTheDocument();
  });

  it('should render an error message if connection reset', async () => {
    store = mockStore({
      app: {
        search: {
          ...initState.app.search,
          error: {
            movie: { message: 'Connection Error 😢😭' },
            tv: { message: 'Connection Error 😢😭' },
          },
        },
      },
    });

    const { container } = render(
      <Provider store={store}>
        <SearchList
          mediaType="movie"
          sort={null}
          fetch={fetchOnce}
          fetchNext={fetchNext}
        />
      </Provider>,
    );
    expect(container.querySelector('.error')).not.toBeNull();
    expect(
      await getByText(
        container.querySelector('.notify-text'),
        /Connection Error/,
      ),
    ).toBeInTheDocument();
  });
});

describe('when no error occurs', () => {
  let store = mockStore({
    app: {
      search: {
        ...initState.app.search,
        error: {
          movie: false,
          tv: false,
        },
        loading: {
          movie: false,
          tv: false,
        },
      },
    },
  });

  const fetchOnce = jest.fn();
  const fetchNext = jest.fn();

  it('should render a movie list and no loading progress when loading is false', () => {
    const { container } = render(
      <Provider store={store}>
        <SearchList
          mediaType="movie"
          sort={null}
          fetch={fetchOnce}
          fetchNext={fetchNext}
        />
      </Provider>,
    );
    expect(container.querySelector('.search-results')).not.toBeNull();
    expect(container.querySelector('#searh-results-progress')).toBeNull();
  });

  it('should render a movie list and loading progress when loading is true', () => {
    store = mockStore({
      app: {
        search: {
          ...initState.app.search,
          error: {
            movie: false,
            tv: false,
          },
          loading: {
            movie: true,
            tv: true,
          },
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <SearchList
          mediaType="movie"
          sort={null}
          fetch={fetchOnce}
          fetchNext={fetchNext}
        />
      </Provider>,
    );
    expect(container.querySelector('.search-results')).not.toBeNull();
    expect(container.querySelector('#searh-results-progress')).not.toBeNull();
  });
});
