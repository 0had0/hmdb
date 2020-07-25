import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
	Button,
	FavoriteFontIcon,
	BookmarkFontIcon,
	StarFontIcon,
	TextIconSpacing,
	PlayArrowFontIcon,
	Tooltipped,
} from "react-md";

import { toggleFavorite, toggleWatchlist } from "api/user.action";
import { toggleLoginModal } from "actions/modals/login.action";

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
	open,
}) {
	const [fav, setFav] = useState(checkFavorite());
	const [save, setSave] = useState(checkSave());

	const handleFav = () => {
		!isLogin ? open() : setFav(!fav);
	};
	const handleSave = () => {
		!isLogin ? open() : setSave(!save);
	};

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
			<Tooltipped
				id="tooltipped-favorite"
				tooltip={!isLogin ? "Login First" : "favorite"}
				position="below"
			>
				<Button
					id="favorite"
					buttonType="icon"
					aria-label="add to favorite"
					onClick={handleFav}
				>
					<FavoriteFontIcon style={{ color: fav && "#D50000" }} />
				</Button>
			</Tooltipped>
			<Tooltipped
				id="tooltipped-watchlist"
				tooltip={!isLogin ? "Login First" : "watchlist"}
				position="below"
			>
				<Button
					id="bookmark"
					buttonType="icon"
					aria-label="add to watchlist"
					onClick={handleSave}
				>
					<BookmarkFontIcon style={{ color: save && "#F44336" }} />
				</Button>
			</Tooltipped>
			<div className="overview-view-rating">
				<StarFontIcon style={{ color: "#FFEA00" }} />
				&nbsp;{vote_average}
			</div>
			<Button>
				<TextIconSpacing icon={<PlayArrowFontIcon />} iconAfter>
					<a
						href="#Trailers"
						style={{ textDecoration: "none", color: "#fff" }}
					>
						Trailer
					</a>
				</TextIconSpacing>
			</Button>
		</div>
	);
}

export default connect(
	({ user, auth }) => ({
		isLogin: auth.isLogin,
		fav_list: user.favorite[document.location.pathname.split("/")[1]],
		watchlist_list:
			user.watchlist[document.location.pathname.split("/")[1]],
		checkFavorite: () => {
			const { favorite } = user;
			const [, media_type, id] = document.location.pathname.split("/");
			return favorite[media_type].includes(+id);
		},
		checkSave: () => {
			const { watchlist } = user;
			const [, media_type, id] = document.location.pathname.split("/");
			return watchlist[media_type].includes(+id);
		},
	}),
	(dispatch) => ({
		setFavorite: (id, value) =>
			dispatch(
				toggleFavorite(
					id,
					document.location.pathname.split("/")[1],
					value
				)
			),
		setWatchlist: (id, value) =>
			dispatch(
				toggleWatchlist(
					id,
					document.location.pathname.split("/")[1],
					value
				)
			),
		open: () => dispatch(toggleLoginModal()),
	})
)(React.memo(ActionBar));
