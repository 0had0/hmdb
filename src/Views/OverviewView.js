import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Text, Card, CircularProgress } from "react-md";

import Skeleton from "react-loading-skeleton";

import { fetchOverview, clearData } from "../actions/appActions";
import { update_favorite } from "../actions/authActions";

import ActionBar from "../components/ActionBar";
import HorizontalList from "../components/HorizontalList";
import VideoItem from "../components/VideoItem";
import CastItem from "../components/CastItem";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

import "./OverviewView.css";
import "./_filter.scss";

const OverviewView = ({
	loading,
	details,
	videos,
	recommendations,
	similar,
	reviews,
	credits,
	hasError,
	fetch,
	clear,
	updateFavorite,
}) => {
	const { id } = useParams();

	useEffect(() => {
		const media_type = `${document.location.pathname.split("/")[1]}`;
		let isMounted = true;
		if (isMounted) {
			fetch(id, media_type);
			updateFavorite(media_type);
			window.scrollTo(0, 0);
		}
		return () => {
			isMounted = false;
			clear();
		};
	}, [id, fetch, clear]);

	const renderTitle = useCallback(() => {
		const title = details?.title || details?.name;
		return (
			title &&
			`${title} (${
				(details?.release_date || details?.first_air_date)?.split(
					"-"
				)[0]
			})`
		);
	}, [details]);

	const renderMore = useCallback(() => {
		const time = details?.release_date || details?.first_air_date;
		const genres = details?.genres?.map((i) => i.name)?.join(", ");
		const duration = details?.runtime;
		const h = Math.floor(duration / 60);
		const m = duration % 60;
		return duration
			? `${time} - ${genres} - ${h}h ${m}m`
			: genres && `${time} - ${genres}`;
	}, [details, loading]);

	if (loading || hasError) {
		return (
			<div className="loading-div">{loading && <CircularProgress />}</div>
		);
	}

	return (
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
						<ActionBar
							id={id}
							vote_average={details.vote_average}
						/>
					</div>
				</header>
				<HorizontalList
					label={"Cast"}
					StateKey={credits_key}
					id={id}
					component={CastItem}
					withoutCheck
					clearAfter
				/>
				<div className="flex-center">
					<Text type="headline-6" style={{ margin: 0 }}>
						Overview:
					</Text>
					<Text type="body-2">
						{!loading(key) && details?.overview}
					</Text>
				</div>
			</header>
			<HorizontalList
				label={"Trailers"}
				StateKey={video_key}
				id={id}
				component={VideoItem}
				loadingItemsNumber={2}
				withoutCheck
				clearAfter
			/>
			<div className="flex-center">
				<Text type="headline-6" className="overview-view-header-row">
					Featured Review:
				</Text>
				<Reviews id={id} StateKey={reviews_key} />
			</div>
			<HorizontalList
				label={"Similar"}
				StateKey={similar_key}
				id={id}
				loadingItemsNumber={4}
				withoutCheck
				clearAfter
			/>
			<Footer />
		</React.Fragment>
	);
};

export default connect(
	({ app }) => ({
		loading: app.isLoading.overview.loading,
		details: app.data.overview.details,
		videos: app.data.overview.videos,
		recommendations: app.data.overview.recommendations,
		similar: app.data.overview.similar,
		reviews: app.data.overview.reviews,
		credits: app.data.overview.credits,
		hasError: app.hasError.overview,
	}),
	(dispatch) => ({
		fetch: (id, media_type) => dispatch(fetchOverview(id, media_type)),
		clear: () => dispatch(clearData("overview")),
		updateFavorite: (media_type) => dispatch(update_favorite(media_type)),
	})
)(React.memo(OverviewView));
