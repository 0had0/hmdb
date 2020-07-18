import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
	Button,
	FavoriteFontIcon,
	BookmarkFontIcon,
	StarFontIcon,
	TextIconSpacing,
	PlayArrowFontIcon,
} from "react-md";

import { favorite, watchlist } from "../../actions/authActions";

import "./ActionBar.css";

function ActionBar({
	id,
	vote_average,
	isLogin,
	fav_list,
	watchlist_list,
	checkFavorite,
	checkSave,
	setFavorite,
	setWatchlist,
}) {
	const [fav, setFav] = useState(checkFavorite());
	const [save, setSave] = useState(checkSave());

	const _setFav = () => setFav(!fav);
	const _save = () => setSave(!save);

	useEffect(() => {
		isLogin && setFavorite(id, fav);
		// eslint-disable-next-line
	}, [fav, isLogin, setFavorite]);

	useEffect(() => {
		isLogin && setWatchlist(id, save);
		// eslint-disable-next-line
	}, [save, isLogin, setWatchlist]);

	return (
		<div className="action-bar-root">
			<Button
				id="favorite"
				buttonType="icon"
				aria-label="add to favorite"
				disabled={!isLogin}
				onClick={_setFav}
			>
				<FavoriteFontIcon style={{ color: fav && "#D50000" }} />
			</Button>
			<Button
				id="bookmark"
				buttonType="icon"
				aria-label="add to watch list"
				disabled={!isLogin}
				onClick={_save}
			>
				<BookmarkFontIcon style={{ color: save && "#F44336" }} />
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
		fav_list: auth.favorite[document.location.pathname.split("/")[1]],
		watchlist_list:
			auth.watchlist[document.location.pathname.split("/")[1]],
		checkFavorite: () => {
			const { favorite } = auth;
			const [, media_type, id] = document.location.pathname.split("/");
			return favorite[media_type].includes(+id);
		},
		checkSave: () => {
			const { watchlist } = auth;
			const [, media_type, id] = document.location.pathname.split("/");
			return watchlist[media_type].includes(+id);
		},
	}),
	(dispatch) => ({
		setFavorite: (id, value) =>
			dispatch(
				favorite(id, document.location.pathname.split("/")[1], value)
			),
		setWatchlist: (id, value) =>
			dispatch(
				watchlist(id, document.location.pathname.split("/")[1], value)
			),
	})
)(React.memo(ActionBar));
