import React from "react";
import { CircularProgress } from "react-md";

import Item from "components/Items/MediaItem";

const mediaType = document.location.href.split("/")[3];

const FilteredList = ({ list, filters }) => {
	const [year, lang, country, genre, rating] = filters;
	let items = list;
	if (!list) {
		return null;
	}
	if (year) {
		items = items.filter(({ release_date, first_air_date }) => {
			if (mediaType === "movies") {
				return release_date.split("-")[0] <= year;
			} else {
				return +first_air_date.split("-")[0] <= +year;
			}
		});
	}
	if (lang) {
		items = items.filter(({ original_language }) => {
			return original_language === lang.iso_639_1;
		});
	}
	if (country) {
		items = items.filter(({ origin_country }) => {
			return (
				origin_country && origin_country.includes(country.iso_3166_1)
			);
		});
	}
	if (genre) {
		items = items.filter(({ genre_ids }) => {
			return genre_ids.includes(genre.id);
		});
	}
	if (rating) {
		items = items.filter(({ vote_average }) => {
			return +rating <= +vote_average && +vote_average < 1 + rating;
		});
	}
	if (items.length === 0) {
		return (
			<div className="loader" key={0}>
				<CircularProgress id="loading" />
			</div>
		);
	}
	return items.map((item, i) => {
		if (!item) return null;
		return (
			<Item
				item={item}
				key={`${item.id}-${i}`}
				classNames="media-view-margin"
			/>
		);
	});
};

export default FilteredList;
