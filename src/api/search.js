import axios from 'axios';
import api from 'api';

export const fetchMediaFirstPage = (
	mediaType,
	query,
	cancelToken,
	adult = false,
) =>
	axios.get(
		`${api.URL}/search/${mediaType}?api_key=${api.KEY}&language=en-US&query=${query}&page=1&include_adult=${adult}`,
		{ cancelToken },
	);

export const fetchMediaPage = (mediaType, query, page, adult = false) =>
	axios.get(
		`${api.URL}/search/${mediaType}?api_key=${api.KEY}&language=en-US&query=${query}&page=${page}&include_adult=${adult}`,
	);
