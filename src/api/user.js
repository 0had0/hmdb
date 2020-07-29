import axios from 'axios';
import api from 'api';

export const getListMedia = (type, id, sessionId, cb) =>
  axios
    .all([
      axios.get(
        `${api.URL}/account/${id}/${type}/movies?api_key=${api.KEY}&session_id=${sessionId}`,
      ),
      axios.get(
        `${api.URL}/account/${id}/${type}/tv?api_key=${api.KEY}&session_id=${sessionId}`,
      ),
    ])
    .then(axios.spread((...responses) => cb(responses)))
    .catch((err) => console.log(err));

export const setList = (type, userId, sessionId, mediaType, mediaId, value) =>
  axios({
    method: 'post',
    url: `${api.URL}/account/${userId}/${type}?api_key=${api.KEY}&session_id=${sessionId}`,
    headers: {},
    data: {
      media_type: mediaType,
      media_id: +mediaId,
      [type]: value,
    },
  });
