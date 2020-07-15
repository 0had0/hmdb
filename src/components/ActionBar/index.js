import React from "react";

import {
	Button,
	FavoriteSVGIcon,
	BookmarkSVGIcon,
	StarFontIcon,
	TextIconSpacing,
	PlayArrowFontIcon,
} from "react-md";

import "./ActionBar.css";

function ActionBar({ vote_average }) {
	return (
		<div className="action-bar-root">
			<Button
				id="favorite"
				buttonType="icon"
				aria-label="add to favorite"
			>
				<FavoriteSVGIcon />
			</Button>
			<Button
				id="bookmark"
				buttonType="icon"
				aria-label="add to watch list"
			>
				<BookmarkSVGIcon />
			</Button>
			<div className="overview-view-rating">
				<StarFontIcon style={{ color: "#FFEA00" }} />
				&nbsp;{vote_average}
			</div>
			<Button>
				<TextIconSpacing icon={<PlayArrowFontIcon />} iconAfter>
					Trailer
				</TextIconSpacing>
			</Button>
		</div>
	);
}

export default ActionBar;
