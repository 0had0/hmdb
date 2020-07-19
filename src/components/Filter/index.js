import React from "react";
import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	Button,
	IconRotator,
	KeyboardArrowDownSVGIcon,
	useToggle,
	Collapse,
} from "react-md";
import "./Filter.css";

const Filter = ({ label, action, open, render, state = null }) => {
	const [expanded, , , toggle] = useToggle(open || false);
	return (
		<Card className="filter-card">
			<CardHeader
				afterChildren={
					<Button
						id="expand-card-button"
						onClick={toggle}
						buttonType="icon"
						aria-label="Expand"
						theme="clear"
					>
						<IconRotator rotated={expanded}>
							<KeyboardArrowDownSVGIcon />
						</IconRotator>
					</Button>
				}
			>
				<CardTitle>{label}</CardTitle>
			</CardHeader>
			<Collapse collapsed={!expanded}>
				<CardContent className="filter-card-content">
					{render(action, state)}
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default Filter;
