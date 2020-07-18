import React from "react";

import { Text } from "react-md";

import "./HorizontalList.css";

function HorizontalList({ label, children }) {
	return (
		<div id={label} className="horizontal-list-root">
			<Text type="headline-4" className="horizontal-list-title">
				{label}
			</Text>
			<div className="horizontal-list-list">{children}</div>
		</div>
	);
}

export default HorizontalList;
