import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  List,
  ListItem,
  CircularProgress,
  Text,
  ErrorOutlineFontIcon,
} from 'react-md';

import InfiniteScroll from 'react-infinite-scroller';

import { fetchOnce, fetchMulti } from 'actions/search';

import SkeletonImage from 'images/skeleton.jpg';
import './SearchList.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

function SearchList({
  mediaType,
  sort,
  response,
  loading,
  hasError,
  hasMore,
  fetch,
  fetchNext,
}) {
  const history = useHistory();
  const query = useQuery().get('q');

  let data = response[mediaType];

  useEffect(() => {
    if (!query) {
      return;
    }
    const { cancel, token } = axios.CancelToken.source();
    const timeOutId = setTimeout(function () {
      fetch(mediaType, query, token);
    }, 1000);
    return () => {
      cancel('User loose interest');
      clearTimeout(timeOutId);
    };
  }, [query, fetch, history, mediaType]);

  if (sort && data.length !== 0) {
    data = response[mediaType].sort((a, b) => {
      if (sort === 'Rating') {
        return b.vote_average - a.vote_average;
      }
      if (sort === 'Year') {
        if (a?.first_air_date) {
          return (
            b.first_air_date.split('-')[0] - a.first_air_date.split('-')[0]
          );
        }
        return b.release_date.split('-')[0] - a.release_date.split('-')[0];
      }
      return 0;
    });
  }

  return hasError[mediaType] ? (
    <div className="error">
      <ErrorOutlineFontIcon className="notify-icon" />
      <Text className="notify-text">{hasError[mediaType].message}</Text>
    </div>
  ) : (
    <>
      <List className="search-results">
        <InfiniteScroll
          pageStart={1}
          loadMore={(page) => {
            fetchNext(mediaType, query, page);
          }}
          hasMore={hasMore(mediaType) && !loading[mediaType]}
          loader={
            <div className="loader" key={0}>
              <CircularProgress id="search-results-fetch-loading" />
            </div>
          }
          useWindow>
          {data.map((item, i) => {
            return (
              <ListItem
                key={`${i}-${item?.name || item.title}`}
                onClick={() => history.push(`/${mediaType}/${item?.id}`)}
                className="search-results-item"
                leftAddon={
                  <img
                    height={150}
                    width="auto"
                    src={
                      item?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
                        : SkeletonImage
                    }
                    alt=""
                  />
                }
                leftAddonType="large-media">
                <Text>{item?.title || item?.name}</Text>
                <i
                  style={{
                    color: 'rgba(255, 255, 255, 0.3)',
                  }}>
                  {item?.release_date}
                </i>
                <Text>{item?.overview}</Text>
              </ListItem>
            );
          })}
        </InfiniteScroll>
      </List>
      {!!loading[mediaType] && <CircularProgress id="searh-results-progress" />}
    </>
  );
}

SearchList.defaultProps = {
  mediaType: 'movie',
  sort: null,
};

SearchList.propTypes = {
  mediaType: PropTypes.oneOf(['movie', 'tv']),
  sort: PropTypes.oneOf(['Rating', 'Year']),
  response: PropTypes.shape({
    movie: PropTypes.array,
    tv: PropTypes.array,
  }).isRequired,
  loading: PropTypes.shape({
    movie: PropTypes.bool,
    tv: PropTypes.bool,
  }).isRequired,
  hasError: PropTypes.shape({
    movie: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    tv: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }).isRequired,
  hasMore: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
};

export default connect(
  ({ app }) => ({
    response: app.search.data,
    loading: app.search.loading,
    hasError: app.search.error,
    hasMore: (mediaType) => app.search.pages_left[mediaType] > 0,
  }),
  (dispatch) => ({
    fetch: (mediaType, query, token, adult = false) =>
      dispatch(fetchOnce(mediaType, query, token, adult)),
    fetchNext: (mediaType, query, page, adult = false) =>
      dispatch(fetchMulti(mediaType, query, page, adult)),
  }),
)(SearchList);
