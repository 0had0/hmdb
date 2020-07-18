import React from "react";
import { connect } from "react-redux";
import { Card, MediaContainer, PlayArrowFontIcon, Button } from "react-md";

import { toggle_video_modal } from "../../../actions/appActions";

import "./VideoItem.css";

function VideoItem({ item, open }) {
	return (
		<Card className="video-item-root" onClick={() => open(item?.key)}>
			<MediaContainer fullWidth>
				<img
					src={
						item?.site === "YouTube" && item?.key
							? `http://i.ytimg.com/vi/${item?.key}/mqdefault.jpg`
							: null
					}
					width={100}
					alt={item?.name}
				/>
			</MediaContainer>
			<div className="video-item-action">
				<Button id="play" buttonType="icon">
					<PlayArrowFontIcon
						style={{ fontSize: "10vmin", color: "#fff" }}
					/>
				</Button>
			</div>
		</Card>
	);
}

export default connect(null, (dispatch) => ({
	open: (vkey) => dispatch(toggle_video_modal(vkey)),
}))(VideoItem);
