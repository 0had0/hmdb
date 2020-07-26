import axios from "axios";

import {
	overviewFetchStart,
	overviewFetchSuccess,
	overviewFetchFaild,
} from "actions/overview-view/data.action";
import { getUrlOf } from "./common.function";

export const fetchOnce = (id, mediaType) => {
	return async (dispatch, getState, api) => {
		dispatch(overviewFetchStart());
		await axios
			.all([
				axios.get(getUrlOf(`${mediaType}_page_details`, api, null, id)),
				axios.get(getUrlOf(`${mediaType}_page_videos`, api, null, id)),
				axios.get(
					getUrlOf(
						`similar_${mediaType === "tv" ? "series" : "movies"}`,
						api,
						null,
						id
					)
				),
				axios.get(getUrlOf(`${mediaType}_page_reviews`, api, null, id)),
				axios.get(getUrlOf(`${mediaType}_page_credits`, api, null, id)),
			])
			.then(
				axios.spread((...responses) => {
					const [
						details_res,
						videos_res,
						similar_res,
						reviews_res,
						credits_res,
					] = responses;
					dispatch(
						overviewFetchSuccess({
							details: details_res.data,
							videos: videos_res.data.results,
							similar: similar_res.data.results,
							reviews: reviews_res.data.results,
							credits:
								credits_res.data.cast.length === 0
									? credits_res.data.crew
									: credits_res.data.cast,
						})
					);
				})
			)
			.catch((errors) => dispatch(overviewFetchFaild(errors)));
	};
};
