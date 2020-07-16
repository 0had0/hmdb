import React, { useCallback } from "react";
import { connect } from "react-redux";

import {
	Button,
	FavoriteFontIcon,
	BookmarkFontIcon,
	StarFontIcon,
	TextIconSpacing,
	PlayArrowFontIcon,
} from "react-md";

import { favorite } from "../../actions/authActions";

import "./ActionBar.css";

function ActionBar({ id, vote_average, isLogin, setFavorite }) {
	const isFavorite = localStorage.getItem(`favorite-${id}`);

	const _handleFavorite = useCallback(() => {
		isLogin && setFavorite(id);
	}, [setFavorite, isLogin]);
	return (
		<div className="action-bar-root">
			<Button
				id="favorite"
				buttonType="icon"
				aria-label="add to favorite"
				onClick={_handleFavorite}
			>
				<FavoriteFontIcon style={{ color: isFavorite && "#D50000" }} />
			</Button>
			<Button
				id="bookmark"
				buttonType="icon"
				aria-label="add to watch list"
			>
				<BookmarkFontIcon />
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

export default connect(
	({ auth }) => ({
		isLogin: auth.isLogin,
	}),
	(dispatch) => ({
		setFavorite: (id) =>
			dispatch(
				favorite(
					id,
					document.location.pathname.split("/")[1] === "tv"
						? "tv"
						: "movie"
				)
			),
	})
)(ActionBar);
