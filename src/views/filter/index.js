import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CircularProgress, AppBar, DropdownMenu } from "react-md";

import InfiniteScroll from "react-infinite-scroller";

import Footer from "components/Footer";

import { fetchOnce, fetchMulti } from "api/fetch.discovery.action";
import { LANGUAGES, GENRES, COUNTRIES, RATING, YEARS } from "constants/filter";

import FilteredList from "./FilteredList";

import "./MediaFilterView.css";

const mediaType = document.location.href.split("/")[3];

function MediaFilterView({ data, hasMore, loading, fetch, fetchNext }) {
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
			fetch();
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
					loadMore={(page) => fetchNext(page)}
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
		data: app.discovery.data[`top_${mediaType}`],
		hasMore: app.discovery.left_pages[`top_${mediaType}`] > 0,
		loading: app.discovery.loading[`top_${mediaType}`],
	}),
	(dispatch) => ({
		fetch: () =>
			mediaType === "movies"
				? dispatch(fetchOnce(`top_${mediaType}`))
				: dispatch(fetchOnce(`top_${mediaType}`)),
		fetchNext: (page) =>
			mediaType === "movies"
				? dispatch(fetchMulti(`top_${mediaType}`, page))
				: dispatch(fetchMulti(`top_${mediaType}`, page)),
	})
)(MediaFilterView);
