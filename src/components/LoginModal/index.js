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
const LoginForm = ({
	email,
	setEmail,
	password,
	setPassword,
	errorMessage,
	loading,
}) => {
	return (
		<React.Fragment>
			<TextField
				style={{ marginBottom: "2em" }}
				id="email"
				type="email"
				placeholder="Email"
				label="Email or UserName"
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
			style={{
				width: "80%",
			}}
		>
			<DialogHeader>
				<DialogTitle id="login-title">Login Dialog</DialogTitle>
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
