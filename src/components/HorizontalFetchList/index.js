import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchOnce } from 'api/fetch.discovery.action';

import HorizontalList from '../HorizontalList';
import Item from '../Items/MediaItem';

function HorizontalFetchList({
  label,
  stateKey: key,
  id = null,
  component: Component = Item,
  href,
  loadingItemsNumber,
  loading = false,
  withoutCheck = false,
  data,
  hasError,
  fetch,
}) {
  const history = useHistory();
  const loadingItems = React.useMemo(
    () => new Array(loadingItemsNumber ?? 9).fill({}),
    [loadingItemsNumber],
  );
  useLayoutEffect(() => {
    let isMounted = true;
    if ((isMounted && data(key).length === 0) || withoutCheck) {
      fetch(key, id);
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
	}, [key, fetch, id]);

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
