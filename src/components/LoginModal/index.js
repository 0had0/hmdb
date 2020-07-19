import React, { useState } from "react";
import { connect } from "react-redux";

import {
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogContent,
	DialogFooter,
	Button,
	TextField,
	Password,
	Text,
	PersonSVGIcon,
	CircularProgress,
	TextIconSpacing,
} from "react-md";

import { toggle_modal } from "../../actions/appActions";
import { toggle_error } from "../../actions/authActions";
import { login } from "../../actions/authActions";

import "./LoginModal.css";

const LoginForm = ({
	email,
	setEmail,
	password,
	setPassword,
	errorMessage,
	loading,
	login,
}) => {
	return (
		<React.Fragment>
			<TextField
				style={{ marginBottom: "2em" }}
				id="username"
				type="username"
				placeholder="jef123"
				label="User Name"
				disabled={loading}
				onChange={(evt) => setEmail(evt.target.value)}
				value={email}
			/>
			<Password
				id="password"
				type="password"
				placeholder="Password"
				label="Password"
				disabled={loading}
				onChange={(evt) => setPassword(evt.target.value)}
				onKeyUp={(evt) => {
					if (evt.key === "Enter") {
						login(email, password);
					}
				}}
				value={password}
			/>
			<Text style={{ color: "red", textAlign: "center" }}>
				{errorMessage && "⚠ " + errorMessage}
			</Text>
		</React.Fragment>
	);
};

const LoginDialog = ({ visible, errorMessage, loading, close, login }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const FormProps = {
		email,
		setEmail,
		password,
		setPassword,
		errorMessage,
		loading,
		login,
	};
	const _close = () => {
		setEmail("");
		setPassword("");
		close();
	};
	return (
		<Dialog
			id="login-dialog"
			visible={visible}
			onRequestClose={_close}
			aria-labelledby="login"
			className="dialog-root"
		>
			<DialogHeader>
				<DialogTitle id="login-title">Login</DialogTitle>
			</DialogHeader>
			<DialogContent>
				<LoginForm {...FormProps} />
			</DialogContent>
			<DialogFooter>
				<Button
					id="login-submit"
					onClick={() => login(email, password)}
				>
					<TextIconSpacing
						icon={
							loading ? (
								<CircularProgress
									id={"login-loading"}
									style={{ width: 24, height: 24 }}
									centered={false}
								/>
							) : (
								<PersonSVGIcon />
							)
						}
					>
						Login
					</TextIconSpacing>
				</Button>
				<Button id="login-close" onClick={_close}>
					Close
				</Button>
			</DialogFooter>
		</Dialog>
	);
};

export default connect(
	({ app, auth }) => ({
		visible: app.toggleModal,
		errorMessage: auth.errorMessage,
		loading: auth.loading,
	}),
	(dispatch) => ({
		login: (email, password) => dispatch(login(email, password)),
		close: () => {
			dispatch(toggle_modal());
			dispatch(toggle_error());
		},
	})
)(LoginDialog);
