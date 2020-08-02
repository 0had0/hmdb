import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchOnce } from 'actions/media-list';

import HorizontalList from '../HorizontalList';
import Item from '../Items/MediaItem';

function HorizontalFetchList({
  label,
  stateKey: key,
  component: Component,
  href,
  loadingItemsNumber,
  loading,
  withoutCheck,
  data,
  hasError,
  fetch,
}) {
  const history = useHistory();
  const loadingItems = React.useMemo(
    () => new Array(loadingItemsNumber).fill({}),
    [loadingItemsNumber],
  );
  useLayoutEffect(() => {
    let isMounted = true;
    if ((isMounted && data(key).length === 0) || withoutCheck) {
      fetch(key);
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [key, fetch]);

  if (data(key).length === 0 && !loading(key)) {
    return null;
  }

  return (
    <HorizontalList href={href} label={label}>
      {loading(key) ? (
        loadingItems.map((a, i) => <Component loading key={i} />)
      ) : hasError(key) ? (
        <Component error handleClick={() => fetch(key)} />
      ) : (
        <>
          {data(key)?.map((item, i) => (
            <Component key={`${item?.name}-${item?.id}`} item={item} />
          ))}
          <Component
            key={`${key}-see-more`}
            goToFilterPage={() => history.push(href)}
            last
          />
        </>
      )}
    </HorizontalList>
  );
}

HorizontalFetchList.defaultProps = {
  component: Item,
  withoutCheck: false,
  loadingItemsNumber: 9,
};

HorizontalFetchList.propTypes = {
  label: PropTypes.string.isRequired,
  stateKey: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  href: PropTypes.string.isRequired,
  loadingItemsNumber: PropTypes.number,
  withoutCheck: PropTypes.bool,
  loading: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
};

export default connect(
  ({ app }) => ({
    loading: (key) => app.discovery.loading[key],
    data: (key) => app.discovery.data[key],
    hasError: (key) => app.discovery.error[key],
  }),
  (dispatch) => ({
    fetch: (key) => dispatch(fetchOnce(key)),
  }),
)(React.memo(HorizontalFetchList));
