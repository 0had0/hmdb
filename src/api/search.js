import axios from 'axios';

export const fetchMediaFirstPage = (
  mediaType,
  query,
  cancelToken,
  adult = false,
) =>
  axios.get(
    `/search/${mediaType}?language=en-US&query=${query}&page=1&include_adult=${adult}`,
    { cancelToken },
  );

export const fetchMediaPage = (mediaType, query, page, adult = false) =>
  axios.get(
    `/search/${mediaType}?language=en-US&query=${query}&page=${page}&include_adult=${adult}`,
  );
