import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

export default class LightboxExample extends Component {
	render() {
		const { isOpen, photo, close } = this.props;

		return (
			<div>
				{isOpen && (
					<Lightbox
						mainSrc={photo}
						onCloseRequest={close}
						onNextRequest={photo}
					/>
				)}
			</div>
		);
	}
}
