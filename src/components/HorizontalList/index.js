import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'react-md';

import './HorizontalList.css';

function HorizontalList({ label, href, children }) {
  return (
    <div id={label} className="horizontal-list-root">
      <Text type="headline-4" className="horizontal-list-title">
        {href ? (
          <a className="label-link" href={href}>
            {label}
          </a>
        ) : (
          label
        )}
      </Text>
      <div className="horizontal-list-list">{children}</div>
    </div>
  );
}

HorizontalList.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default HorizontalList;
