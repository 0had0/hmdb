import React from 'react';
import { MemoryRouter, Route, Link } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Search from './Search';

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

describe('navigation search input', () => {
  it('render icon and input only when no input', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search />
        <Route exact path="/" />
      </MemoryRouter>,
    );
    expect(container.querySelector('#search-icon')).not.toBeNull();
    expect(container.querySelector('#search-input')).not.toBeNull();
  });
  it('render icon, input and error icon on error', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search
          initState={{
            hasError: true,
            loading: false,
            data: [],
          }}
        />
        <Route exact path="/" />
      </MemoryRouter>,
    );
    expect(container.querySelector('#search-icon')).not.toBeNull();
    expect(container.querySelector('#search-input')).not.toBeNull();
    expect(container.querySelector('#search-error')).not.toBeNull();
    fireEvent.change(container.querySelector('#search-input'), {
      target: { value: 'any value' },
    });
    expect(container.querySelector('#search-error')).toBeNull();
    fireEvent.change(container.querySelector('#search-input'), {
      target: { value: '' },
    });
    expect(container.querySelector('#search-error')).toBeNull();
  });
  it('render icon, input and loading icon on loading', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search
          initState={{
            hasError: false,
            loading: true,
            data: [],
          }}
        />
        <Route exact path="/" />
      </MemoryRouter>,
    );
    expect(container.querySelector('#search-icon')).not.toBeNull();
    expect(container.querySelector('#search-input')).not.toBeNull();
    expect(container.querySelector('#search-error')).toBeNull();
    expect(container.querySelector('#search-loading')).not.toBeNull();
  });
  it('automatic focus in discovery page', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search
          initState={{
            hasError: false,
            loading: false,
            data: [],
          }}
        />
        <Route exact path="/" />
      </MemoryRouter>,
    );
    expect(container.querySelector('#search-input')).not.toBeNull();
    expect(document.activeElement.id).toBe('search-input');
  });
  it('render only icon in search page', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search']}>
        <Search
          initState={{
            hasError: false,
            loading: false,
            data: [],
          }}
        />
        <Route exact path="/" />
        <Route path="/search" />
      </MemoryRouter>,
    );
    expect(document.activeElement.id).not.toBe('search-input');
  });
  it('render list of keywords on api response', () => {
    let data = [];
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search
          initState={{
            hasError: false,
            loading: false,
            data,
          }}
        />
        <Route exact path="/" />
      </MemoryRouter>,
    );
    fireEvent.change(container.querySelector('#search-input'), {
      target: { value: 'something' },
    });
    setTimeout(
      () =>
        expect(container.querySelector('#search-suggestions')).not.toBeNull(),
      100,
    );
  });
});
