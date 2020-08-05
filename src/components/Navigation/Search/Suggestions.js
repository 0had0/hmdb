import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-md';

const Suggestions = ({ open, data, handleClick }) => {
  return (
    data.length !== 0 && (
      <List
        id="search-suggestions"
        data-testid="search-suggestions"
        className={`suggestions-menu suggestions-menu-${
          open ? 'open' : 'close'
        }`}>
        {data.map((item, i) => (
          <ListItem
            key={item.id}
            onClick={() => handleClick(item)}
            style={{
              textDecoration: 'none',
              color: '#fff',
            }}>
            {item?.name}
          </ListItem>
        ))}
      </List>
    )
  );
};

Suggestions.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.any,
  handleClick: PropTypes.func.isRequired,
};

export default Suggestions;
