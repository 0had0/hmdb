import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Text } from "react-md";

import { fetchData, clearData } from "../../actions/appActions";

import Item from "./Item";

import "./style.css";

function HorizontalList({
	label,
	StateKey: key,
	id = null,
	component: Component = Item,
	loadingItemsNumber,
	loading = false,
	withoutCheck = false,
	clearAfter = false,
	data,
	hasError,
	fetch,
	clear,
}) {
	const loadingItems = React.useMemo(
		() => new Array(loadingItemsNumber ?? 9).fill({}),
		[loadingItemsNumber]
	);
	useLayoutEffect(() => {
		let isMounted = true;
		if ((isMounted && data(key).length === 0) || withoutCheck) {
			fetch(key, id);
		}
		return () => {
			isMounted = false;
			clearAfter && clear(key);
		};
		// eslint-disable-next-line
	}, [key, fetch, id]);

	if (data(key).length === 0 && !loading(key)) {
		return null;
	}

	return (
		<div className="horizontal-list-root">
			<Text type="headline-4" className="horizontal-list-title">
				{label}
			</Text>

			<div className="horizontal-list-list">
				{loading(key) ? (
					loadingItems.map((a, i) => (
						<Component loading={true} key={i} />
					))
				) : hasError(key) ? (
					<Component error handleClick={() => fetch(key)} />
				) : (
					data(key)?.map((item, i) => (
						<Component key={item.id} item={item} />
					))
				)}
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
		fetch: (key, id) => dispatch(fetchData(key, id)),
		clear: (key) => dispatch(clearData(key)),
	})
)(React.memo(HorizontalList));
