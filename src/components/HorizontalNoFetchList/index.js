import React from "react";

import HorizontalList from "../HorizontalList";

function HorizontalNoFetchList({ label, list, component: Component }) {
	return (
		<HorizontalList label={label}>
			{list?.map((item, i) => (
				<Component key={`${i}-${item?.id}`} item={item} />
			))}
		</HorizontalList>
	);
}

export default HorizontalNoFetchList;
