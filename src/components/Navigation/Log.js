import React from "react";

import { connect } from "react-redux";

import { toggle_modal } from "../../actions/appActions";
import { logout } from "../../actions/authActions";

import {
	AppBarAction,
	ExitToAppSVGIcon,
	PersonSVGIcon,
	CircularProgress,
} from "react-md";

function Log({ isLogin, loading, _open_modal, _logout }) {
	const first = loading ? (
		<AppBarAction last aria-label="logout-loading">
			<CircularProgress id="logout" style={{ width: 24, height: 24 }} />
		</AppBarAction>
	) : (
		<AppBarAction onClick={_logout} last aria-label="Logout">
			<ExitToAppSVGIcon />
		</AppBarAction>
	);
	return isLogin ? (
		first
	) : (
		<AppBarAction last aria-label="Login" onClick={_open_modal}>
			<PersonSVGIcon />
		</AppBarAction>
	);
}

export default connect(
	({ app, auth }) => ({
		isLogin: auth.isLogin,
		loading: auth.logout_loading,
	}),
	(dispatch) => ({
		_open_modal: () => {
			dispatch(toggle_modal());
		},
		_logout: () => {
			dispatch(logout());
		},
	})
)(Log);
