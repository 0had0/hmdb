import axios from 'axios';

export const getNewAPIToken = () => axios.get(`/authentication/token/new?`);

export const validateAPIToken = (username, password, requestToken) =>
  axios({
    method: 'post',
    url: `/authentication/token/validate_with_login`,
    headers: {},
    data: {
      username,
      password,
      request_token: requestToken,
    },
  });

export const getSessionId = (requestToken) =>
  axios({
    method: 'post',
    url: `/authentication/session/new`,
    headers: {},
    data: { request_token: requestToken },
  });

export const deleteSessionId = (sessionId) =>
  axios({
    method: 'delete',
    url: `/authentication/session`,
    header: {},
    data: {
      session_id: sessionId,
    },
  });

export const getAccountInfo = (sessionId) =>
  axios.get(`/account?session_id=${sessionId}`);
