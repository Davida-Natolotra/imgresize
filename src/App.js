import React, { Component } from "react";
import Resizer from "react-image-file-resizer";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newImage: "",
			newSize: 0,
		};
	}

	previousSize = 0;

	fileChangedHandler = (event) => {
		var fileInput = false;
		if (event.target.files[0]) {
			fileInput = true;
			this.previousSize = event.target.files[0].size;
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
						this.setState({ newSize: decoded.length });
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

	componentDidUpdate(prevState) {
		if (prevState.newImage !== this.state.newImage) {
			console.log("FileSize: " + this.state.newSize);
		}
	}

	render() {
		return (
			<div className="App">
				<input type="file" onChange={this.fileChangedHandler} />
				<img src={this.state.newImage} alt="" />
				<h2>Previous size: {this.previousSize}</h2>
				<h2>New size: {this.state.newSize}</h2>
			</div>
		);
	}
}

export default App;
