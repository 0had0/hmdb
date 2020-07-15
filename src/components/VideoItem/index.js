import React from "react";
import { Card, MediaContainer, PlayArrowFontIcon, Button } from "react-md";

import "./VideoItem.css";

function VideoItem({ item, loading, error, handleClick }) {
	return (
		<Card className="video-item-root">
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
				<Button id="play" buttonType="icon" aria-label="play trailer">
					<PlayArrowFontIcon
						style={{ fontSize: "10vmin", color: "#fff" }}
					/>
				</Button>
			</div>
		</Card>
	);
}

export default VideoItem;
