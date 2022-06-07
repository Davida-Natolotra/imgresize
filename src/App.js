import React, { Component } from "react";
import Resizer from "react-image-file-resizer";
import { formatNumber } from "accounting-js";
import { Button, Typography, Divider } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LightBox from "./LightBox";
import Table from "./components/table";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newImage: "",
			newSize: 0,
			isOpen: false,
		};
	}

	previousSize = 0;

	fNumber = (n) =>
		formatNumber(n, { precision: 0, thousand: " ", decimal: "," });

	fileChangedHandler = (event) => {
		var fileInput = false;
		if (event.target.files[0]) {
			fileInput = true;
			this.previousSize = this.fNumber(event.target.files[0].size);
		}
		if (fileInput) {
			try {
				const img = Resizer.imageFileResizer(
					event.target.files[0],
					720,
					500,
					"JPEG",
					100,
					0,
					(uri) => {
						console.log(uri);
						this.setState({ newImage: uri });
						const base64str = uri.split("base64,")[1];
						const decoded = atob(base64str);
						this.setState({
							newSize: this.fNumber(decoded.length),
						});
					},
					"base64",
					200,
					200
				);
				console.log("img: ", typeof img);
			} catch (err) {
				console.log(err);
			}
		}
	};

	changerPop = () => this.setState({ isOpen: true });

	close = () => this.setState({ isOpen: false });

	render() {
		return (
			<div className="container mt-4">
				<div className="row">
					<div className="col-6 mb-1">
						<label htmlFor="imgInput">
							<input
								type="file"
								onChange={this.fileChangedHandler}
								style={{ display: "none" }}
								id="imgInput"
							/>
							<Button
								variant="outlined"
								component="span"
								startIcon={<PhotoCameraIcon />}
							>
								Modifier
							</Button>
						</label>
					</div>
				</div>
				{this.state.newImage !== "" && (
					<div className="row">
						<div className="col-6">
							<img
								src={this.state.newImage}
								alt=""
								style={{ maxWidth: "100%", maxHeight: 150 }}
								onClick={this.changerPop}
							/>
						</div>
					</div>
				)}
				<Typography variant="paragraph">
					Previous size: {this.previousSize}
				</Typography>
				<Divider />
				<Typography variant="paragraph">
					New size: {this.state.newSize}
				</Typography>

				<LightBox
					photo={this.state.newImage}
					isOpen={this.state.isOpen}
					close={this.close}
				/>

				<Divider />
				<Table />
			</div>
		);
	}
}

export default App;
