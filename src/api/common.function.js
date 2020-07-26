export const getUrlOf = (
	key,
	api,
	query = null,
	id = null,
	page = 1,
	adult = false
) => {
	const URLS = {
		trending_movies: `${api.URL}/trending/movie/day?api_key=${api.KEY}&page=${page}`,
		trending_series: `${api.URL}/trending/tv/day?api_key=${api.KEY}&page=${page}`,
		popular_movies: `${api.URL}/movie/popular?api_key=${api.KEY}&language=en-US&page=${page}`,
		popular_series: `${api.URL}/tv/popular?api_key=${api.KEY}&language=en-US&page=${page}`,
		movie_page_details: `${api.URL}/movie/${id}?api_key=${api.KEY}&language=en-US`,
		movie_page_videos: `${api.URL}/movie/${id}/videos?api_key=${api.KEY}&language=en-US`,
		movie_page_recommendations: `${api.URL}/movie/${id}/recommendations?api_key=${api.KEY}&language=en-US`,
		similar_movies: `${api.URL}/movie/${id}/similar?api_key=${api.KEY}&language=en-US&page=${page}`,
		movie_page_reviews: `${api.URL}/movie/${id}/reviews?api_key=${api.KEY}&language=en-US`,
		movie_page_credits: `${api.URL}/movie/${id}/credits?api_key=${api.KEY}&language=en-US`,
		tv_page_details: `${api.URL}/tv/${id}?api_key=${api.KEY}&language=en-US`,
		tv_page_videos: `${api.URL}/tv/${id}/videos?api_key=${api.KEY}&language=en-US`,
		similar_series: `${api.URL}/tv/${id}/similar?api_key=${api.KEY}&language=en-US&page=${page}`,
		tv_page_reviews: `${api.URL}/tv/${id}/reviews?api_key=${api.KEY}&language=en-US`,
		tv_page_credits: `${api.URL}/tv/${id}/credits?api_key=${api.KEY}&language=en-US`,
		search_movie: `${api.URL}/search/movie?api_key=${api.KEY}&language=en-US&query=${query}&page=${page}&include_adult=${adult}`,
		search_tv: `${api.URL}/search/tv?api_key=${api.KEY}&language=en-US&query=${query}&page=${page}&include_adult=${adult}`,
	};
	return URLS[key];
};
