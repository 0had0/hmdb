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

function ActionBar({ id, vote_average, isLogin, isFavorite, setFavorite }) {
	const _is_favorite = useCallback(() => {
		isFavorite(id);
	}, [isFavorite, id]);
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
				<FavoriteFontIcon
					style={_is_favorite() && { color: "#D50000" }}
				/>
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
		isFavorite: (id) => {
			console.log(
				auth.favorite[
					document.location.pathname.split("/")[1]
				].includes(id)
			);
			return auth.favorite[
				document.location.pathname.split("/")[1]
			].includes(id);
		},
	}),
	(dispatch) => ({
		setFavorite: (id) =>
			dispatch(favorite(id, document.location.pathname.split("/")[1])),
	})
)(React.memo(ActionBar));
