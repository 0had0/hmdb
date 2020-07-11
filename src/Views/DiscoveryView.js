import React from "react";
import { Text } from "react-md";
import src from "../images/breackingBad3.jpg";

import HorizontalList from "../components/HorizontalList";
import Footer from "../components/Footer";

import "./styles.css";

export default () => {
	return (
		<div className="discovery-view-root">
			<header>
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
			<HorizontalList label="What's Popular" StateKey="popular" />
			<HorizontalList label="Trending" StateKey="trending" />
			<HorizontalList label="Top Movies" StateKey="top_movies" />
			<HorizontalList label="Top Series" StateKey="top_series" />
			<Footer />
		</div>
	);
};
