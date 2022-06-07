import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8000/leads/")
			.then((response) => setData(response.data.results));
	}, []);

	return (
		<div>
			<h1>Table</h1>
			{data.map((x) => (
				<p key={x.email}>{x.name}</p>
			))}
		</div>
	);
}

export default Table;
