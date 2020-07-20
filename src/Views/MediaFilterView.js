import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Chip } from "react-md";

import Filter from "../components/Filter";
const GENRES = [
	{
		id: 10759,
		name: "Action & Adventure",
	},
	{
		id: 16,
		name: "Animation",
	},
	{
		id: 35,
		name: "Comedy",
	},
	{
		id: 80,
		name: "Crime",
	},
	{
		id: 99,
		name: "Documentary",
	},
	{
		id: 18,
		name: "Drama",
	},
	{
		id: 10751,
		name: "Family",
	},
	{
		id: 10762,
		name: "Kids",
	},
	{
		id: 9648,
		name: "Mystery",
	},
	{
		id: 10763,
		name: "News",
	},
	{
		id: 10764,
		name: "Reality",
	},
	{
		id: 10765,
		name: "Sci-Fi & Fantasy",
	},
	{
		id: 10766,
		name: "Soap",
	},
	{
		id: 10767,
		name: "Talk",
	},
	{
		id: 10768,
		name: "War & Politics",
	},
	{
		id: 37,
		name: "Western",
	},
	{
		id: 28,
		name: "Action",
	},
];

const Filters = ({ actions, states }) => {
	const [, setGenres] = actions;
	const [, genres] = states;
	return (
		<React.Fragment>
			<Filter
				label="Genres"
				action={setGenres}
				state={genres}
				open
				render={(action, state) => {
					return GENRES.map(({ id, name }) => {
						const selected = state.includes(id);
						const _handleClick = () =>
							action((prevSelected) => {
								if (prevSelected.includes(id)) {
									return prevSelected.filter(
										(am) => am !== id
									);
								}
								return [...prevSelected, id];
							});

						return (
							<Chip
								key={`${id}-${name}`}
								selected={selected}
								selectedThemed
								style={{
									margin: "0.25rem",
								}}
								onClick={_handleClick}
							>
								{name}
							</Chip>
						);
					});
				}}
			/>
		</React.Fragment>
	);
};

const useQuery = () => new URLSearchParams(useLocation().search);

function MediaFilterView() {
	const location = useLocation();
	const media_type =
		location.pathname.split("/")[1] === "movies" ? "movie" : "tv";
	return (
		<React.Fragment>
			<h1>{media_type}</h1>
		</React.Fragment>
	);
}

export default MediaFilterView;
