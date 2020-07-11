import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Text } from "react-md";

import { fetchData } from "../../actions/appActions";

import Item from "./Item";

import "./style.css";

function HorizontalList({
	label,
	StateKey: key,
	loading,
	data,
	hasError,
	fetch,
}) {
	const loadingItems = React.useMemo(() => new Array(9).fill({}), []);
	useLayoutEffect(() => {
		let isMounted = true;
		if (isMounted && data(key).length === 0) {
			fetch(key);
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line
	}, [key, fetch]);
	return (
		<div className="horizontal-list-root">
			<Text type="headline-4" className="horizontal-list-title">
				{label}
			</Text>
			<div>
				<div className="horizontal-list-list">
					{loading(key) ? (
						loadingItems.map((a, i) => (
							<Item loading={true} key={i} />
						))
					) : hasError(key) ? (
						<Item error handleClick={() => fetch(key)} />
					) : (
						data(key)?.map((item, i) => (
							<Item key={item.id} item={item} />
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default connect(
	({ app }) => ({
		loading: (key) => app.isLoading[key],
		data: (key) => app.data[key],
		hasError: (key) => app.hasError[key],
	}),
	(dispatch) => ({
		fetch: (key) => dispatch(fetchData(key)),
	})
)(React.memo(HorizontalList));
