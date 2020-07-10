import React from "react";
import { Text } from "react-md";
import src from "../images/breackingBad3.jpg";

import "./styles.css";

export default () => {
	return (
		<div className="discovery-view-root">
			<header>
				<Text type="headline-2" className="discovery-view-cover-title">
					The Second Best Resources for Movies and Series !
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
		</div>
	);
};
