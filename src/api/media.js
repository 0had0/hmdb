import axios from 'axios';
import api from 'api';

const list = {
  trending_movies: `${api.URL}/trending/movie/day?api_key=${api.KEY}`,
  trending_series: `${api.URL}/trending/tv/day?api_key=${api.KEY}`,
  popular_movies: `${api.URL}/movie/popular?api_key=${api.KEY}&language=en-US`,
  popular_series: `${api.URL}/tv/popular?api_key=${api.KEY}&language=en-US`,
};

export const getMediaInfo = (mediaType, id, cb) =>
  axios
    .all([
      axios.get(
        `${api.URL}/${mediaType}/${id}?api_key=${api.KEY}&language=en-US`,
      ),
      axios.get(
        `${api.URL}/${mediaType}/${id}/videos?api_key=${api.KEY}&language=en-US`,
      ),
      axios.get(
        `${api.URL}/${mediaType}/${id}/similar?api_key=${api.KEY}&language=en-US`,
      ),
      axios.get(
        `${api.URL}/${mediaType}/${id}/reviews?api_key=${api.KEY}&language=en-US`,
      ),
      axios.get(
        `${api.URL}/${mediaType}/${id}/credits?api_key=${api.KEY}&language=en-US`,
      ),
    ])
    .then(axios.spread(cb));

export const getFirstListOfKey = (key) => axios.get(list[key]);

export const getListOfKeyAndPage = (key, page) =>
  axios.get(`${list[key]}&page=${page}`);
