import React from "react";
import { Text } from "react-md";
import src from "../images/breackingBad3.jpg";

import HorizontalFetchList from "../components/HorizontalFetchList";
import Footer from "../components/Footer";

import "./DiscoveryView.css";

export default () => {
	return (
		<React.Fragment>
			<header className="discovery-view-header">
				<Text type="headline-2" className="discovery-view-cover-title">
					The Second Best Resource for Movies and Series !
				</Text>
			</header>
			<div className="discovery-view-outer-img">
				<img
					src={src}
					alt="Breacking Bad"
					width="100%"
					height="auto"
					style={{ opacity: 0.6 }}
				/>
			</div>
			<HorizontalFetchList label="What's Popular" StateKey="popular" />
			<HorizontalFetchList label="Trending" StateKey="trending" />
			<HorizontalFetchList label="Top Movies" StateKey="top_movies" />
			<HorizontalFetchList label="Top Series" StateKey="top_series" />
			<Footer />
		</React.Fragment>
	);
};
