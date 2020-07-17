import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Text, Card } from "react-md";

import Skeleton from "react-loading-skeleton";

import { fetchData, clearData } from "../actions/appActions";
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
	data,
	hasError,
	fetch,
	clear,
	updateFavorite,
}) => {
	const { id } = useParams();

	const key = `${document.location.pathname.split("/")[1]}_page_details`;
	const video_key = `${document.location.pathname.split("/")[1]}_page_videos`;
	const reviews_key = `${
		document.location.pathname.split("/")[1]
	}_page_reviews`;
	const similar_key = `${
		document.location.pathname.split("/")[1]
	}_page_similar`;
	const credits_key = `${
		document.location.pathname.split("/")[1]
	}_page_credits`;

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetch(key, id);
			updateFavorite(document.location.pathname.split("/")[1]);
			window.scrollTo(0, 0);
		}
		return () => {
			isMounted = false;
			clear(key);
		};
	}, [id, fetch, clear, key]);

	const renderTitle = useCallback(() => {
		const d = data(key);
		const title = d?.title || d?.name;
		return title ? (
			`${title} (${
				(d?.release_date || d?.first_air_date)?.split("-")[0]
			})`
		) : (
			<Skeleton width={300} />
		);
	}, [data, key]);

	const renderMore = useCallback(() => {
		const d = data(key);
		const time = d?.release_date || d?.first_air_date;
		const genres = d?.genres?.map((i) => i.name)?.join(", ");
		const duration = d?.runtime;
		const h = Math.floor(duration / 60);
		const m = duration % 60;
		return loading(key) ? (
			<Skeleton width={200} />
		) : duration ? (
			`${time} - ${genres} - ${h}h ${m}m`
		) : genres ? (
			`${time} - ${genres}`
		) : null;
	}, [data, key, loading]);
	return (
		<React.Fragment>
			<div className="overview-view-outer-img">
				<img
					src={
						!loading(key)
							? `https://image.tmdb.org/t/p/w780${
									data(key)?.poster_path
							  }`
							: null
					}
					alt={data(key)?.title}
				/>
			</div>
			<header className="overview-view-header">
				<header>
					<Card className="overview-view-header-img-container">
						<img
							alt=""
							src={`https://image.tmdb.org/t/p/w185${
								data(key)?.poster_path
							}`}
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
							{loading(key) ? (
								<Skeleton width={150} />
							) : (
								data(key)?.tagline || null
							)}
						</Text>
						<div className="overview-view-header-row overview-view-more">
							{renderMore()}
						</div>
						<ActionBar
							id={id}
							vote_average={
								data(key)?.vote_average || (
									<Skeleton width={30} />
								)
							}
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
						{!loading(key) && data(key)?.overview}
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
		loading: (key) => app.isLoading[key],
		data: (key) => app.data[key],
		hasError: (key) => app.hasError[key],
	}),
	(dispatch) => ({
		fetch: (key, id) => dispatch(fetchData(key, id)),
		clear: (key) => dispatch(clearData(key)),
		updateFavorite: (media_type) => dispatch(update_favorite(media_type)),
	})
)(React.memo(OverviewView));
