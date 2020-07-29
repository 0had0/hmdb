import axios from 'axios';
import api from 'api';

export const getNewAPIToken = () =>
  axios.get(`${api.URL}/authentication/token/new?api_key=${api.KEY}`);

export const validateAPIToken = (username, password, requestToken) =>
  axios({
    method: 'post',
    url: `${api.URL}/authentication/token/validate_with_login?api_key=${api.KEY}`,
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
    url: `${api.URL}/authentication/session/new?api_key=${api.KEY}`,
    headers: {},
    data: { request_token: requestToken },
  });

export const deleteSessionId = (sessionId) =>
  axios({
    method: 'delete',
    url: `${api.URL}/authentication/session?api_key=${api.KEY}`,
    header: {},
    data: {
      session_id: sessionId,
    },
  });

export const getAccountInfo = (sessionId) =>
  axios.get(`${api.URL}/account?api_key=${api.KEY}&session_id=${sessionId}`);
