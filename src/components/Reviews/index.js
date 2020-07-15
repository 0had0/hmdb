import React, { useEffect, useState } from "react";
import {
	Text,
	Avatar,
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardSubtitle,
	Button,
} from "react-md";
import { connect } from "react-redux";

import { fetchData, clearData } from "../../actions/appActions";

import "./Reviews.css";

function Reviews({ id, StateKey: key, loading, data, hasError, fetch, clear }) {
	const [first, ...rest] = data(key);
	const [all, setShowAll] = useState(false);

	const _toggle_reviews = () => setShowAll(!all);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetch(key, id);
		}
		return () => {
			isMounted = false;
			clear(key);
		};
		// eslint-disable-next-line
	}, [fetch, id, clear]);

	if (data(key).length === 0 || !data(key)) {
		return loading(key) ? null : <Text type="body-2">No reviews</Text>;
	}

	const renderAll = () =>
		rest?.map((item) => (
			<Card key={item?.id} bordered className="review-root">
				<CardHeader beforeChildren={<Avatar>A</Avatar>}>
					<CardTitle>{item?.author}</CardTitle>
					<CardSubtitle>
						<a style={{ color: "#fff" }} href={item?.url}>
							Visit Profile
						</a>
					</CardSubtitle>
				</CardHeader>
				<CardContent>
					<Text>{item?.content}</Text>
				</CardContent>
			</Card>
		));

	return (
		<React.Fragment>
			<Card key={first?.id} bordered className="review-root">
				<CardHeader beforeChildren={<Avatar>A</Avatar>}>
					<CardTitle>{first?.author}</CardTitle>
					<CardSubtitle>
						<a style={{ color: "#fff" }} href={first?.url}>
							Visit Profile
						</a>
					</CardSubtitle>
				</CardHeader>
				<CardContent>
					<Text>{first?.content}</Text>
				</CardContent>
			</Card>
			{all && renderAll()}
			{rest.length !== 0 && (
				<Button onClick={_toggle_reviews}>
					{!all ? "Show More" : "Less"}
				</Button>
			)}
		</React.Fragment>
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
)(Reviews);
