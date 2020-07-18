import React from "react";
import { connect } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "react-md";

import { toggle_video_modal } from "../../actions/appActions";

function Video({ vkey }) {
	return (
		<iframe
			id="video-modal-frame"
			src={`http://www.youtube.com/embed/${vkey}`}
			width="100%"
			height="100%"
			frameBorder="0"
			title="trailer-modal"
			allowFullScreen
		></iframe>
	);
}

const VideoDialog = ({ visible, vkey, close }) => {
	const FormProps = {
		vkey,
	};
	return (
		<Dialog
			id="video-dialog"
			disableFocusContainer={true}
			visible={visible}
			onRequestClose={close}
			aria-labelledby="trailer"
			disableScrollLock
			style={{
				width: "100%",
				maxWidth: 500,
				height: "90%",
				maxHeight: 300,
			}}
		>
			<DialogContent style={{ overflow: "hidden", padding: 5 }}>
				<Video {...FormProps} />
			</DialogContent>
		</Dialog>
	);
};

export default connect(
	({ app }) => ({
		visible: app.toggleVideoModal,
		vkey: app.videoModalKey,
	}),
	(dispatch) => ({
		close: () => dispatch(toggle_video_modal()),
	})
)(VideoDialog);
