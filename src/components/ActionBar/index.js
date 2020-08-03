import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Button,
  FavoriteFontIcon,
  BookmarkFontIcon,
  StarFontIcon,
  TextIconSpacing,
  PlayArrowFontIcon,
  Tooltipped,
} from 'react-md';

import { toggleFavorite, toggleWatchlist } from 'actions/user';
import { toggleLoginModal } from 'actions/modals';

import './ActionBar.css';

export function ActionBar({
  id,
  vote_average: VoteAverage,
  isLogin,
  checkFavorite,
  checkSave,
  setFavorite,
  setWatchlist,
  open,
}) {
  const [fav, setFav] = useState(isLogin ? checkFavorite() : false);
  const [save, setSave] = useState(isLogin ? checkSave() : false);

  const handleFav = () => {
    !isLogin ? open() : setFav(!fav);
  };
  const handleSave = () => {
    !isLogin ? open() : setSave(!save);
  };

  useEffect(() => {
    isLogin && setFavorite(id, fav);
    // eslint-disable-next-line
  }, [fav, isLogin, setFavorite]);

  useEffect(() => {
    isLogin && setWatchlist(id, save);
    // eslint-disable-next-line
  }, [save, isLogin, setWatchlist]);

  return (
    <div className="action-bar-root" data-testid="action-bar-root">
      <Tooltipped
        id="tooltipped-favorite"
        tooltip={!isLogin ? 'Login First' : 'favorite'}
        position="below">
        <Button
          id="favorite"
          data-testid="favorite"
          buttonType="icon"
          aria-label="add to favorite"
          onClick={handleFav}>
          <FavoriteFontIcon
            data-testid="favorite-icon"
            style={{ color: fav && '#D50000' }}
          />
        </Button>
      </Tooltipped>
      <Tooltipped
        id="tooltipped-watchlist"
        tooltip={!isLogin ? 'Login First' : 'watchlist'}
        position="below">
        <Button
          id="watchlist"
          data-testid="watchlist"
          buttonType="icon"
          aria-label="add to watchlist"
          onClick={handleSave}>
          <BookmarkFontIcon
            data-testid="watchlist-icon"
            style={{ color: save && '#F44336' }}
          />
        </Button>
      </Tooltipped>
      <div className="overview-view-rating" data-testid="rating">
        <StarFontIcon style={{ color: '#FFEA00' }} />
        &nbsp;{VoteAverage}
      </div>
      <Button data-testid="trailer">
        <TextIconSpacing icon={<PlayArrowFontIcon />} iconAfter>
          <a href="#Trailers" style={{ textDecoration: 'none', color: '#fff' }}>
            Trailer
          </a>
        </TextIconSpacing>
      </Button>
    </div>
  );
}

ActionBar.propTypes = {
  id: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  isLogin: PropTypes.bool.isRequired,
  checkFavorite: PropTypes.func.isRequired,
  checkSave: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
  setWatchlist: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
};

export default connect(
  ({ user, auth }) => ({
    isLogin: auth.isLogin,
    checkFavorite: () => {
      const { favorite } = user;
      const [, mediaType, id] = document.location.pathname.split('/');
      return favorite[mediaType]?.includes(+id) ?? false;
    },
    checkSave: () => {
      const { watchlist } = user;
      const [, mediaType, id] = document.location.pathname.split('/');
      return watchlist[mediaType]?.includes(+id) ?? false;
    },
  }),
  (dispatch) => ({
    setFavorite: (id, value) =>
      dispatch(
        toggleFavorite(id, document.location.pathname.split('/')[1], value),
      ),
    setWatchlist: (id, value) =>
      dispatch(
        toggleWatchlist(id, document.location.pathname.split('/')[1], value),
      ),
    open: () => dispatch(toggleLoginModal()),
  }),
)(React.memo(ActionBar));
