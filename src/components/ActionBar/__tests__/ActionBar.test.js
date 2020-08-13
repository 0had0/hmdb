import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import { ActionBar } from '..';

const mockStore = configureMockStore([]);
let store;

describe('ActionBar', () => {
  afterEach(cleanup);

  const props = {
    id: '0',
    vote_average: 10,
    isLogin: false,
    checkFavorite: jest.fn(),
    checkSave: jest.fn(),
    setFavorite: jest.fn(),
    setWatchlist: jest.fn(),
    open: jest.fn(),
  };

  it('should render ActionBar correctly', () => {
    const { container, getByTestId, getByText } = render(
      <ActionBar {...props} />,
    );

    expect(getByTestId('favorite')).not.toBeNull();
    expect(getByTestId('watchlist')).not.toBeNull();
    expect(getByTestId('trailer')).not.toBeNull();
    expect(getByText(/10/)).not.toBeNull();

    // isLogin === false --> don't need to call checkFavorite & checkSave
    expect(props.checkFavorite).toHaveBeenCalledTimes(0);
    expect(props.checkSave).toHaveBeenCalledTimes(0);
  });

  it('should update state if login and first load', () => {
    const props1 = { ...props, isLogin: true };
    const {} = render(<ActionBar {...props1} />);

    // isLogin === true --> need to call checkFavorite & checkSave
    expect(props.checkFavorite).toHaveBeenCalledTimes(1);
    expect(props.checkSave).toHaveBeenCalledTimes(1);
  });

  it('should call open if user try to click and not login', () => {
    const { getByTestId } = render(<ActionBar {...props} />);

    fireEvent.click(getByTestId('favorite'));

    expect(props.open).toHaveBeenCalledTimes(1);
  });

  it('should call a setter if user click and is login', () => {
    const props1 = { ...props, isLogin: true };
    const { getByTestId } = render(<ActionBar {...props1} />);

    fireEvent.click(getByTestId('favorite'));
    fireEvent.click(getByTestId('watchlist'));

    expect(props.setFavorite).toHaveBeenCalled();
    expect(props.setWatchlist).toHaveBeenCalled();
  });
});
