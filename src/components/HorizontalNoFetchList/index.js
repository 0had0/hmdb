import React from "react";

import HorizontalList from "../HorizontalList";

export default function({ label, list, component: Component }) {
	return (
		<HorizontalList label={label}>
			{list.length === 0
				? "No Trailer available"
				: list?.map((item, i) => (
						<Component key={`${i}-${item?.id}`} item={item} />
				  ))}
		</HorizontalList>
	);
}
