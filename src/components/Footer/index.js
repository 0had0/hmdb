import React from "react";
import { Text } from "react-md";
import "./style.css";

function Footer() {
	return (
		<div className="footer-root">
			<a href="https://www.themoviedb.org/" target="__blank">
				<img
					className="footer-img"
					alt="tmdb"
					src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
					height="24"
					width="auto"
				/>
			</a>
			<Text>Hadi Houssainy @2020</Text>
		</div>
	);
}

export default Footer;
