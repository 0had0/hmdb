import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CircularProgress, AppBar, DropdownMenu } from "react-md";

import InfiniteScroll from "react-infinite-scroller";

import Footer from "../components/Footer";
import Item from "../components/Items/MediaItem";

import { fetchData, filter } from "../actions/appActions";
import {
	LANGUAGES,
	GENRES,
	COUNTRIES,
	RATING,
	YEARS,
} from "../constants/filter";

import "./MediaFilterView.css";

const media_type = document.location.href.split("/")[3];

const FilteredList = ({ list, filters }) => {
	const [year, lang, country, genre, rating] = filters;
	let items = list;
	if (!list) {
		return null;
	}
	if (year) {
		items = items.filter(({ release_date, first_air_date }) => {
			if (media_type === "movies") {
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
			return vote_average < rating;
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
			<Item item={item} key={item.id} classNames="media-view-margin" />
		);
	});
};

function MediaFilterView({ data, hasMore, loading, fetch, filter }) {
	const [year, setYear] = useState(null);
	const [lang, setLang] = useState(null);
	const [country, setCountry] = useState(null);
	const [genre, setGenre] = useState(null);
	const [rating, setRating] = useState(null);

	const handleClick = (cb) => (e) => cb(e.currentTarget.textContent);

	useEffect(() => {
		if (
			data.length === 0 &&
			!year &&
			!lang &&
			!country &&
			!genre &&
			!rating
		) {
			fetch(media_type, null, 1);
		}
		// eslint-disable-next-line
	}, [fetch, data]);

	return (
		<React.Fragment>
			<AppBar className="filter-bar-outer" height="dense">
				<AppBar className="filter-bar" height="dense">
					<AppBar className="filter-bar-inner" height="dense">
						<DropdownMenu
							id="overflow-menu-1"
							items={YEARS.map((year) => ({
								onClick: handleClick(setYear),
								children: year,
							}))}
						>
							{year || "Year"}
						</DropdownMenu>
						<DropdownMenu
							id="overflow-menu-2"
							items={LANGUAGES.map((language) => ({
								onClick: () => setLang(language),
								children: language.english_name,
							}))}
						>
							{lang?.english_name || "Language"}
						</DropdownMenu>
						<DropdownMenu
							id="overflow-menu-3"
							items={COUNTRIES.map((country) => ({
								onClick: (e) => {
									setCountry(country);
								},
								children: country.english_name,
							}))}
						>
							{country?.english_name || "Country"}
						</DropdownMenu>
						<DropdownMenu
							id="overflow-menu-4"
							items={GENRES.map((genre) => ({
								onClick: () => setGenre(genre),
								children: genre.name,
							}))}
						>
							{genre?.name || "Genres"}
						</DropdownMenu>
						<DropdownMenu
							id="overflow-menu-5"
							items={RATING.map((star) => ({
								onClick: handleClick(setRating),
								children: star,
							}))}
						>
							{rating || "Rating"}
						</DropdownMenu>
					</AppBar>
				</AppBar>
			</AppBar>
			{data.length !== 0 && (
				<InfiniteScroll
					pageStart={1}
					loadMore={(page) => fetch(media_type, null, page)}
					hasMore={hasMore && !loading}
					loader={
						<div className="loader" key={0}>
							<CircularProgress id="loading" />
						</div>
					}
					useWindow
				>
					<div className="media-view-results">
						<FilteredList
							list={data}
							filters={[year, lang, country, genre, rating]}
						/>
					</div>
				</InfiniteScroll>
			)}
			<Footer />
		</React.Fragment>
	);
}

export default connect(
	({ app }) => ({
		data: app.data[`top_${media_type}`],
		hasMore: app.data[`top_${media_type}_pages_left`] > 0,
		loading: app.isLoading[`top_${media_type}`],
	}),
	(dispatch) => ({
		fetch: (media_type, id, page) => {
			dispatch(fetchData(`top_${media_type}`, id, page));
		},
		filter: (filters) => dispatch(filter(media_type, filters)),
	})
)(MediaFilterView);
