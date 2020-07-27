import React from 'react';

import {
  AppBarAction,
  ExitToAppSVGIcon,
  PersonSVGIcon,
  CircularProgress,
} from 'react-md';

import { connect } from 'react-redux';

import { toggleLoginModal } from 'actions/modals/login.action';
import { logout } from 'api/auth.action';

function Log({ isLogin, loading, open, logout }) {
  const first = loading ? (
    <AppBarAction last aria-label="logout-loading">
      <CircularProgress id="logout" style={{ width: 24, height: 24 }} />
    </AppBarAction>
  ) : (
    <AppBarAction onClick={logout} last aria-label="Logout">
      <ExitToAppSVGIcon />
    </AppBarAction>
  );
  return isLogin ? (
    first
  ) : (
    <AppBarAction last aria-label="Login" onClick={open}>
      <PersonSVGIcon />
    </AppBarAction>
  );
}

export default connect(
  ({ app, auth }) => ({
    isLogin: auth.isLogin,
    loading: auth.loading.logout,
  }),
  (dispatch) => ({
    open: () => {
      dispatch(toggleLoginModal());
    },
    logout: () => {
      dispatch(logout());
    },
  }),
)(Log);
