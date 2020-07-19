import React from "react";
import {
	Card,
	MediaContainer,
	MediaOverlay,
	CardTitle,
	CardContent,
	StarFontIcon,
	RefreshSVGIcon,
} from "react-md";

import Skeleton from "react-loading-skeleton";
import SekeletonBackground from "../../../images/skeleton.jpg";

import { useHistory } from "react-router-dom";

import "./MediaItem.css";

function Item({ item, loading, error, handleClick }) {
	const history = useHistory();
	const [loaded, setLoaded] = React.useState(false);
	const _GoToTheOverViewPage = () =>
		item
			? history.push(`/${item.name ? "tv" : "movie"}/${item.id}`)
			: !loading && error && handleClick();
	return (
		<Card
			className="media-card"
			style={loading && { backgroundColor: "#212121" }}
			onClick={_GoToTheOverViewPage}
		>
			<MediaContainer fullWidth>
				<img
					style={loaded ? {} : { visbility: "none" }}
					src={
						!item?.poster_path
							? SekeletonBackground
							: `https://image.tmdb.org/t/p/w185${item.poster_path}`
					}
					onLoad={() => setLoaded(true)}
					alt={item?.id}
				/>
				{loaded && !loading && !error && (
					<MediaOverlay>
						<CardTitle style={{ fontSize: "5vmin" }}>
							{item?.title || item.name}
						</CardTitle>
					</MediaOverlay>
				)}
			</MediaContainer>
			<CardContent className="media-card-content">
				{error ? (
					<RefreshSVGIcon />
				) : (
					<React.Fragment>
						<div className="stars">
							<StarFontIcon
								style={{
									color:
										loading || !item?.vote_average
											? "#616161"
											: "#FFEA00",
								}}
							/>
							&nbsp;
							{item?.vote_average || <Skeleton width="5vmin" />}
						</div>
						<i>
							{item?.release_date?.split("-")[0] ||
								item?.first_air_date?.split("-")[0] || (
									<Skeleton width="5vmin" />
								)}
						</i>
					</React.Fragment>
				)}
			</CardContent>
		</Card>
	);
}

export default React.memo(Item);
