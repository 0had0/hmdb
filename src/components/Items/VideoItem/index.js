import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Card, MediaContainer, PlayArrowFontIcon, Button } from 'react-md';

import { toggleVideoModal } from 'actions/modals';

import './VideoItem.css';

function VideoItem({ item, open }) {
  return (
    <Card className="video-item-root" onClick={() => open(item?.key)}>
      <MediaContainer fullWidth>
        <img
          src={
            item?.site === 'YouTube' && item?.key
              ? `https://i.ytimg.com/vi/${item?.key}/mqdefault.jpg`
              : null
          }
          width={100}
          alt={item?.name}
        />
      </MediaContainer>
      <div className="video-item-action">
        <Button id="play" buttonType="icon">
          <PlayArrowFontIcon style={{ fontSize: '10vmin', color: '#fff' }} />
        </Button>
      </div>
    </Card>
  );
}

VideoItem.propsTypes = {
  item: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired,
};
export default connect(null, (dispatch) => ({
  open: (vkey) => dispatch(toggleVideoModal(vkey)),
}))(VideoItem);
