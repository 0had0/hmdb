import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Text, Card } from "react-md";

import Skeleton from "react-loading-skeleton";

import { fetchData, clearData } from "../actions/appActions";
import ActionBar from "../components/ActionBar";
import Footer from "../components/Footer";

import "./OverviewView.css";

const OverviewView = ({ loading, data, hasError, fetch, clear }) => {
	const { id } = useParams();
	const key = `${document.location.pathname.split("/")[1]}_page_details`;
	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetch(key, id);
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
		return duration
			? `${time} - ${genres} - ${h}h ${m}m`
			: `${time} - ${genres}`;
	}, [data, key]);
	return (
		<React.Fragment>
			<header className="overview-view-header">
				<div className="overview-view-outer-img">
					<img
						src={`https://image.tmdb.org/t/p/w780${
							data(key)?.poster_path
						}`}
						alt="background"
					/>
				</div>
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
							{data(key)?.tagline || <Skeleton width={150} />}
						</Text>
						<div className="overview-view-header-row overview-view-more">
							{renderMore()}
						</div>
						<ActionBar
							vote_average={
								data(key)?.vote_average || (
									<Skeleton width={30} />
								)
							}
						/>
					</div>
				</header>
				<div className="overview-view-header-overview">
					<Text type="headline-6" style={{ margin: 0 }}>
						Overview:
					</Text>
					<Text type="body-2">
						{data(key)?.overview || (
							<Skeleton width={300} count={5} />
						)}
					</Text>
				</div>
			</header>
			<main className="overview-view-main"></main>
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
	})
)(OverviewView);
