import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import Search from '.';

jest.mock('axios');

describe('navigation search input', () => {
  it('render icon and input only when no input', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search />
      </MemoryRouter>,
    );
    expect(getByTestId('search-icon')).not.toBeNull();
    expect(getByTestId('search-input')).not.toBeNull();
  });
  it('render icon, input and error icon on error', () => {
    const { getByTestId, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search
          initState={{
            hasError: true,
            loading: false,
            data: [],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByTestId('search-icon')).not.toBeNull();
    expect(getByTestId('search-input')).not.toBeNull();
    expect(container.querySelector('#search-error-icon')).not.toBeNull();
    fireEvent.change(getByTestId('search-input'), {
      target: { value: 'any value' },
    });
    expect(container.querySelector('#search-error-icon')).toBeNull();
    fireEvent.change(getByTestId('search-input'), {
      target: { value: '' },
    });
    expect(container.querySelector('#search-error')).toBeNull();
  });
  it('render icon, input and loading icon on loading', async () => {
    const { getByTestId, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search
          initState={{
            hasError: false,
            loading: true,
            data: [],
          }}
        />
      </MemoryRouter>,
    );
    expect(getByTestId('search-icon')).not.toBeNull();
    expect(getByTestId('search-input')).not.toBeNull();
    expect(container.querySelector('#search-error-icon')).toBeNull();
    expect(getByTestId('search-loading')).not.toBeNull();
  });
  it('automatic focus in discovery page', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search />
      </MemoryRouter>,
    );
    expect(getByTestId('search-input')).not.toBeNull();
    expect(document.activeElement.id).toBe('search-input');
  });
  it('render only icon in search page', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/search']}>
        <Search />
      </MemoryRouter>,
    );
    expect(document.activeElement.id).not.toBe('search-input');
  });
  it('render list of keywords on api response', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <Search />
      </MemoryRouter>,
    );
    fireEvent.change(getByTestId('search-input'), {
      target: { value: 'something' },
    });
    setTimeout(
      () => expect(getByTestId('search-suggestions')).not.toBeNull(),
      100,
    );
  });
});
