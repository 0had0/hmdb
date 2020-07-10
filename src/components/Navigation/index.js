import React from "react";
import { Link } from "react-router-dom";

import { AppBar, AppBarTitle, Text, LocalMoviesFontIcon } from "react-md";

import Log from "./Log";
import SearchInput from "./Search";

const Navigation = () => {
	return (
		<AppBar
			theme="default"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<AppBar
				theme="default"
				style={{
					maxWidth: 500,
					padding: "0 2em",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<AppBarTitle>
					<Text
						component={Link}
						to="/"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							textDecoration: "none",
							color: "#fff",
						}}
					>
						<LocalMoviesFontIcon style={{ color: "#429ffd" }} />
						&nbsp;HMDB
					</Text>
				</AppBarTitle>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "90%",
						minWidth: 120,
						maxWidth: 250,
					}}
				>
					<SearchInput />
					<Log />
				</div>
			</AppBar>
		</AppBar>
	);
};

export default React.memo(Navigation);
