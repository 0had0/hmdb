import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";

import { fetchData, clearData } from "../../actions/appActions";

import HorizontalList from "../HorizontalList";
import Item from "../Items/MediaItem";

function HorizontalFetchList({
	label,
	StateKey: key,
	id = null,
	component: Component = Item,
	href,
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
		<HorizontalList href={href} label={label}>
			{loading(key) ? (
				loadingItems.map((a, i) => <Component loading={true} key={i} />)
			) : hasError(key) ? (
				<Component error handleClick={() => fetch(key)} />
			) : (
				data(key)?.map((item, i) => (
					<Component key={`${item?.name}-${item?.id}`} item={item} />
				))
			)}
		</HorizontalList>
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
)(React.memo(HorizontalFetchList));
