import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Text, Card, CircularProgress } from "react-md";

import { fetchOverview } from "../actions/appActions";
import { update_favorite, update_watchlist } from "../actions/authActions";

import ActionBar from "../components/ActionBar";
import HorizontalNoFetchList from "../components/HorizontalNoFetchList";

import VideoItem from "../components/Items/VideoItem";
import CastItem from "../components/Items/CastItem";
import MediaItem from "../components/Items/MediaItem";

import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

import "./OverviewView.css";
import "./_filter.scss";

const OverviewView = ({
	loading,
	details,
	videos,
	similar,
	reviews,
	credits,
	hasError,
	isLogin,
	fetch,
	updateFavorite,
	updateWatchlist,
}) => {
	const { id } = useParams();

	useEffect(() => {
		const media_type = document.location.pathname.split("/")[1];
		let isMounted = true;
		if (isMounted) {
			fetch(id, media_type);
			isLogin && updateFavorite(media_type);
			isLogin && updateWatchlist(media_type);
			setTimeout(() => window.scrollTo(0, 0), 200);
		}
		return () => {
			isMounted = false;
		};
	}, [id, fetch, updateWatchlist, updateFavorite, isLogin]);

	const renderTitle = () => {
		const title = details?.title || details?.name;
		return (
			title &&
			`${title} (${
				(details?.release_date || details?.first_air_date)?.split(
					"-"
				)[0]
			})`
		);
	};

	const renderMore = () => {
		const time = details?.release_date || details?.first_air_date;
		const genres = details?.genres?.map((i) => i.name)?.join(", ");
		const duration = details?.runtime;
		const h = Math.floor(duration / 60);
		const m = duration % 60;
		return duration
			? `${time} - ${genres} - ${h}h ${m}m`
			: genres && `${time} - ${genres}`;
	};

	const renderMoreAboutSeries = () => {
		return `${details?.number_of_seasons} seasons, ${
			details?.number_of_episodes
		} episode${
			details?.next_episode_to_air
				? `, next on ${details?.next_episode_to_air.air_date}`
				: ""
		}`;
	};

	return loading || details.length === 0 ? (
		<div className="loading-div">
			<CircularProgress id="overview-loading-aim" />
		</div>
	) : (
		<React.Fragment>
			<div className="overview-view-outer-img">
				<img
					src={
						details?.poster_path &&
						`https://image.tmdb.org/t/p/w780${details?.poster_path}`
					}
					alt={details?.title}
				/>
			</div>
			<header className="overview-view-header">
				<header>
					<Card className="overview-view-header-img-container">
						<img
							alt=""
							src={`https://image.tmdb.org/t/p/w185${details?.poster_path}`}
						/>
					</Card>
					<div className="overview-view-header-info">
						<Text
							type="headline-4"
							className="overview-view-header-row"
						>
							{renderTitle()}
						</Text>
						<Text
							type="subtitle-1"
							className="overview-view-header-row"
						>
							{details?.tagline || null}
						</Text>
						<div className="overview-view-header-row overview-view-more">
							{renderMore()}
						</div>
						{details?.number_of_seasons &&
							details?.number_of_episodes && (
								<div className="overview-view-header-row overview-view-more">
									{renderMoreAboutSeries()}
								</div>
							)}
						<ActionBar
							id={id}
							vote_average={details.vote_average}
						/>
					</div>
				</header>
				<HorizontalNoFetchList
					label={"Cast"}
					component={CastItem}
					list={credits}
				/>
				<div className="flex-center">
					<Text type="headline-6" style={{ margin: 0 }}>
						Overview:
					</Text>
					<Text type="body-2">{details?.overview}</Text>
				</div>
			</header>
			<HorizontalNoFetchList
				label={"Trailers"}
				component={VideoItem}
				list={videos}
			/>
			<div className="flex-center">
				<Text type="headline-6" className="overview-view-header-row">
					Featured Review:
				</Text>
				<Reviews id={id} list={reviews} />
			</div>
			<HorizontalNoFetchList
				label={"Similar"}
				component={MediaItem}
				list={similar}
			/>
			<Footer />
		</React.Fragment>
	);
};

export default connect(
	({ app, auth }) => ({
		loading: app.isLoading.overview.loading,
		details: app.data.overview.details,
		videos: app.data.overview.videos,
		similar: app.data.overview.similar,
		reviews: app.data.overview.reviews,
		credits: app.data.overview.credits,
		hasError: app.hasError.overview,
		isLogin: auth.isLogin,
	}),
	(dispatch) => ({
		fetch: (id, media_type) => dispatch(fetchOverview(id, media_type)),
		updateFavorite: (media_type) => dispatch(update_favorite(media_type)),
		updateWatchlist: (media_type) => dispatch(update_watchlist(media_type)),
	})
)(React.memo(OverviewView));
