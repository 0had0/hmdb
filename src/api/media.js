import axios from 'axios';

const list = {
  trending_movies: `/trending/movie/day`,
  trending_series: `/trending/tv/day`,
  popular_movies: `/movie/popular?language=en-US`,
  popular_series: `/tv/popular?language=en-US`,
};

export const getMediaInfo = (mediaType, id, cb) =>
  axios
    .all([
      axios.get(`/${mediaType}/${id}?language=en-US`),
      axios.get(`/${mediaType}/${id}/videos?language=en-US`),
      axios.get(`/${mediaType}/${id}/similar?language=en-US`),
      axios.get(`/${mediaType}/${id}/reviews?language=en-US`),
      axios.get(`/${mediaType}/${id}/credits?language=en-US`),
    ])
    .then(axios.spread(cb));

export const getFirstListOfKey = (key) => axios.get(list[key]);

export const getListOfKeyAndPage = (key, page) =>
  axios.get(`${list[key]}?page=${page}`);
