import axios from 'axios';
import api from 'api';

export const getListMedia = (type, id, sessionId, cb) =>
  axios.all([
    axios.get(`/account/${id}/${type}/movies?session_id=${sessionId}`),
    axios.get(`/account/${id}/${type}/tv?session_id=${sessionId}`),
  ]);

export const setList = (type, userId, sessionId, mediaType, mediaId, value) =>
  axios({
    method: 'post',
    url: `/account/${userId}/${type}?session_id=${sessionId}`,
    headers: {},
    data: {
      media_type: mediaType,
      media_id: +mediaId,
      [type]: value,
    },
  });
