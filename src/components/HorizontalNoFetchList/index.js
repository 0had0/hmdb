import React from 'react';
import PropTypes from 'prop-types';

import HorizontalList from '../HorizontalList';

function HorizontalNoFetchList({ label, list, component: Component }) {
  return (
    <HorizontalList label={label}>
      {list.length === 0
        ? 'No Trailer available'
        : list?.map((item, i) => (
            <Component key={`${i}-${item?.id}`} item={item} />
          ))}
    </HorizontalList>
  );
}

HorizontalNoFetchList.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default HorizontalNoFetchList;
