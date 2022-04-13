"use strict";

const thumbnailSelector = document.getElementById("thumbnail-selector");

thumbnailSelector.addEventListener("change", createThubnailInput);

function createThubnailInput(event) {
	const selectedOption = event.target.querySelector("option:checked");
	const inputContainer = document.getElementById("thumbnail-input-container");
	const fragment = document.createDocumentFragment();

	const inputID = selectedOption.value;
	const inputType = selectedOption.getAttribute("data-type");

	const label = document.createElement("label");
	const input = document.createElement("input");

	if (inputType == "file") {
		label.textContent = "Select your image";
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
	} else {
		label.textContent = "Paste your image url";
		input.setAttribute("type", "url");
	}

	label.setAttribute("for", inputID);
	input.setAttribute("id", inputID);
	input.setAttribute("required", true);
	input.setAttribute("name", "thumbnail");

	fragment.append(label, input);

	if (inputContainer.textContent) inputContainer.textContent = "";
	inputContainer.append(fragment);
}
