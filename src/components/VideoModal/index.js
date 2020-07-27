import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogContent } from 'react-md';

import { toggleVideoModal } from 'actions/modals/video.action';

function Video({ vkey }) {
  return (
    <iframe
      id="video-modal-frame"
      src={`https://www.youtube.com/embed/${vkey}`}
      width="100%"
      height="100%"
      frameBorder="0"
      title="trailer-modal"
      allowFullScreen
    />
  );
}

const VideoDialog = ({ visible, vkey, close }) => {
  const FormProps = {
    vkey,
  };
  return (
    <Dialog
      id="video-dialog"
      disableFocusContainer
      visible={visible}
      onRequestClose={close}
      aria-labelledby="trailer"
      disableScrollLock
      style={{
        width: '100%',
        maxWidth: 500,
        height: '90%',
        maxHeight: 300,
      }}>
      <DialogContent style={{ overflow: 'hidden', padding: 5 }}>
        <Video {...FormProps} />
      </DialogContent>
    </Dialog>
  );
};

export default connect(
  ({ app }) => ({
    visible: app.modals.toggleVideoModal,
    vkey: app.modals.videoModalKey,
  }),
  (dispatch) => ({
    close: () => dispatch(toggleVideoModal()),
  }),
)(VideoDialog);
