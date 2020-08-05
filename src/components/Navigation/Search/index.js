import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  TextField,
  SearchFontIcon,
  PermScanWifiFontIcon,
  CircularProgress,
} from 'react-md';

import Suggestions from './Suggestions';

import './Search.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START': {
      return { ...state, hasError: false, loading: true };
    }
    case 'FETCH_DONE': {
      return { ...state, loading: false, data: action.payload };
    }
    case 'FETCH_FAILD': {
      return { ...state, loading: false, hasError: true, data: [] };
    }
    case 'FETCH_CLEAR': {
      return { ...state, data: [], loading: false, hasError: false };
    }
    default: {
      return state;
    }
  }
};

async function fetchSearchResult(query, dispatch, cancelToken) {
  if (query) {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/search/keyword?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=1`,
        {
          cancelToken,
        },
      );
      dispatch({
        type: 'FETCH_DONE',
        payload: [...res.data.results.splice(0, 5)],
      });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILD' });
      axios.isCancel(err);
    }
  }
}

function Search({ style, initState }) {
  const location = useLocation();
  const isSearchPage = React.useRef(location.pathname.includes('/search'));

  const isDiscoveryPage = React.useRef(location.pathname === '/').current;

  const [query, setQuery] = useState('');
  const [showInput, setShowInput] = useState(
    isSearchPage.current ? false : window.innerWidth > 500 || !isDiscoveryPage,
  );

  const inputRef = useRef(null);

  const [{ hasError, loading, data }, dispatch] = useReducer(
    reducer,
    initState,
  );

  const history = useHistory();

  const toggleInput = () =>
    setShowInput(isSearchPage.current ? false : !showInput);

  const toggleWithTimeout = () => setTimeout(toggleInput, 500);

  const handleType = (evt) => {
    setQuery(evt.target.value);
  };

  const goToSearchPage = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      if (query) {
        setQuery('');
        toggleInput();
        history.push(`/search/?q=${query}`);
      }
    }
  };

  const goToMovieOrTVPage = (item) => {
    setQuery('');
    history.push(`/search/?q=${item.name}`);
  };

  useEffect(() => {
    isSearchPage.current = location.pathname.includes('/search');
  }, [location]);

  useEffect(() => {
    if (showInput && isDiscoveryPage) {
      inputRef.current.focus();
    }
  }, [showInput, isDiscoveryPage]);

  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const timeOutId = setTimeout(
      () => fetchSearchResult(query, dispatch, token),
      500,
    );
    return () => {
      cancel('User loose interest');
      clearTimeout(timeOutId);
      dispatch({ type: 'FETCH_CLEAR' });
    };
  }, [query]);

  const status =
    showInput && loading ? (
      <CircularProgress id="search-loading-icon" data-testid="search-loading" />
    ) : hasError ? (
      <PermScanWifiFontIcon id="search-error-icon" data-testid="search-error" />
    ) : null;

  return (
    <div className={`search-box search-box-${showInput ? 'open' : 'close'}`}>
      <div className="search-box-inner">
        <SearchFontIcon
          id="search-icon"
          className="search-icon"
          data-testid="search-icon"
          onClick={toggleInput}
        />
        <TextField
          id="search-input"
          className="search-input"
          data-testid="search-input"
          ref={inputRef}
          theme="none"
          onChange={handleType}
          onBlur={toggleWithTimeout}
          onKeyUp={goToSearchPage}
          value={query}
          autoComplete="off"
          placeholder="Series, Movies ..."
        />
        {status}
      </div>
      <Suggestions
        open={!!showInput}
        data={data}
        handleClick={goToMovieOrTVPage}
      />
    </div>
  );
}

Search.defaultProps = {
  style: null,
  initState: {
    hasError: false,
    loading: false,
    data: [],
  },
};

Search.propTypes = {
  style: PropTypes.object,
  initState: PropTypes.object,
};

export default React.memo(Search);
