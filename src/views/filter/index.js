import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  AppBar,
  DropdownMenu,
  PermScanWifiFontIcon,
} from 'react-md';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';

import Footer from 'components/Footer';

import { fetchOnce, fetchMulti } from 'api/fetch.discovery.action';
import { LANGUAGES, GENRES, COUNTRIES, RATING, YEARS } from 'constants/filter';

import FilteredList from './FilteredList';

import './MediaFilterView.css';

const useKey = () => new URLSearchParams(useLocation().search);

function MediaFilterView({ data, hasMore, loading, error, fetch, fetchNext }) {
  const mediaType = useLocation().pathname.split('/')[1];
  const key = `${useKey().get('key')}_${mediaType}`;

  const [year, setYear] = useState(+useKey().get('year'));
  const [lang, setLang] = useState(useKey().get('lang'));
  const [country, setCountry] = useState(useKey().get('country'));
  const [genre, setGenre] = useState(useKey().get('genre'));
  const [rating, setRating] = useState(+useKey().get('rating'));

  const handleClick = (cb) => (e) => cb(e.currentTarget.textContent);

  useEffect(() => {
    if (data(key).length === 0) {
      fetch(key);
    }
  }, [fetch, data, key]);

  return (
    <>
      <AppBar className="filter-bar-outer" height="dense">
        <AppBar className="filter-bar" height="dense">
          <AppBar className="filter-bar-inner" height="dense">
            <DropdownMenu
              id="overflow-menu-1"
              items={YEARS.map((year) => ({
                onClick: handleClick(setYear),
                children: year,
              }))}>
              {year || 'Year'}
            </DropdownMenu>
            <DropdownMenu
              id="overflow-menu-2"
              items={LANGUAGES.map((language) => ({
                onClick: () => setLang(language),
                children: language.english_name,
              }))}>
              {lang?.english_name || 'Language'}
            </DropdownMenu>
            <DropdownMenu
              id="overflow-menu-3"
              items={COUNTRIES.map((country) => ({
                onClick: (e) => {
                  setCountry(country);
                },
                children: country.english_name,
              }))}>
              {country?.english_name || 'Country'}
            </DropdownMenu>
            <DropdownMenu
              id="overflow-menu-4"
              items={GENRES.map((genre) => ({
                onClick: () => setGenre(genre),
                children: genre.name,
              }))}>
              {genre?.name || 'Genres'}
            </DropdownMenu>
            <DropdownMenu
              id="overflow-menu-5"
              items={RATING.map((star) => ({
                onClick: handleClick(setRating),
                children: star,
              }))}>
              {rating || 'Rating'}
            </DropdownMenu>
          </AppBar>
        </AppBar>
      </AppBar>
      {!error(key) ? (
        data(key).length !== 0 && (
          <InfiniteScroll
            pageStart={1}
            loadMore={(page) => fetchNext(key, page)}
            hasMore={hasMore(key) && !loading(key)}
            loader={
              <div className="loader" key={0}>
                <CircularProgress id="loading" />
              </div>
            }
            useWindow>
            <div className="media-view-results">
              <FilteredList
                list={data(key)}
                filters={[year, lang, country, genre, rating]}
              />
            </div>
          </InfiniteScroll>
        )
      ) : (
        <div className="media-view-error">
          <PermScanWifiFontIcon id="error" />
          <p>no connection :(</p>
        </div>
      )}
      <Footer />
    </>
  );
}

export default connect(
  ({ app }) => ({
    data: (key) => app.discovery.data[key],
    hasMore: (key) => app.discovery.left_pages[key] > 0,
    loading: (key) => app.discovery.loading[key],
    error: (key) => app.discovery.error[key],
  }),
  (dispatch) => ({
    fetch: (key) => dispatch(fetchOnce(key)),
    fetchNext: (key, page) => dispatch(fetchMulti(key, page)),
  }),
)(MediaFilterView);
