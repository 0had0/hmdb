import React from "react";
import { Card, MediaContainer, CardTitle, MediaOverlay } from "react-md";

import "./CastItem.css";

function CastItem({ item, loading, error, handleClick }) {
	if (!item?.profile_path || !item?.name) {
		return null;
	}
	return (
		<Card className="cast-item-root">
			<MediaContainer fullWidth>
				<img
					src={
						item?.profile_path
							? `https://image.tmdb.org/t/p/w185${item.profile_path}`
							: null
					}
					alt={item?.id}
				/>
				<MediaOverlay>
					<CardTitle style={{ fontSize: "5vmin" }}>
						{item?.name ?? null}
					</CardTitle>
				</MediaOverlay>
			</MediaContainer>
		</Card>
	);
}

export default CastItem;
