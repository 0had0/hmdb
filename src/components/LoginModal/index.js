import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

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
} from 'react-md';

import { toggleLoginModal, setErrorMessage } from 'actions/modals';
import login from 'actions/login';

import './LoginModal.css';

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
    <>
      <TextField
        style={{ marginBottom: '2em' }}
        id="username"
        type="text"
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
          if (evt.key === 'Enter') {
            login(email, password);
          }
        }}
        value={password}
      />
      <Text style={{ color: 'red', textAlign: 'center' }}>
        {errorMessage && `⚠ ${errorMessage}`}
      </Text>
    </>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const LoginDialog = ({ visible, errorMessage, loading, close, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const FormProps = {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    loading,
    login,
  };
  const handleClose = () => {
    setEmail('');
    setPassword('');
    close();
  };
  return (
    <Dialog
      id="login-dialog"
      visible={visible}
      onRequestClose={handleClose}
      aria-labelledby="login"
      className="dialog-root">
      <DialogHeader>
        <DialogTitle id="login-title">Login</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <LoginForm {...FormProps} />
      </DialogContent>
      <DialogFooter>
        <Button id="login-submit" onClick={() => login(email, password)}>
          <TextIconSpacing
            icon={
              loading ? (
                <CircularProgress
                  id="login-loading"
                  style={{ width: 24, height: 24 }}
                  centered={false}
                />
              ) : (
                <PersonSVGIcon />
              )
            }>
            Login
          </TextIconSpacing>
        </Button>
        <Button id="login-close" onClick={handleClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

LoginDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(
  ({ app, auth }) => ({
    visible: app.modals.toggleLoginModal,
    errorMessage: app.modals.errorMessage,
    loading: auth.loading.login,
  }),
  (dispatch) => ({
    login: (email, password) => dispatch(login(email, password)),
    close: () => {
      dispatch(toggleLoginModal());
      dispatch(setErrorMessage(null));
    },
  }),
)(LoginDialog);
