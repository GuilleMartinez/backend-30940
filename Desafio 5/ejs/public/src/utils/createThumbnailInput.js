function createThumbnailInput(event) {

    const selectedOption = event.target.querySelector("option:checked");
    const inputContainer = document.getElementById("thumbnail-input-container");
    const fragment = document.createDocumentFragment();

    const inputID = selectedOption.value;
    const inputType = selectedOption.getAttribute("data-type");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const small = document.createElement("small");

    label.setAttribute("for", inputID);
    input.setAttribute("id", inputID);
    input.setAttribute("required", true);
    input.setAttribute("name", "thumbnail");

    if (inputType == "file") {
        small.textContent = "Only .png, .jpg or .jpeg are allowed";
        label.textContent = "Select your image";
        input.setAttribute("type", "file");
        input.setAttribute("accept", ".png, .jpg, .jpeg");
    } else {
        label.textContent = "Paste your image url";
        input.setAttribute("type", "url");
    }

    fragment.append(label, input);
    if (small.textContent) fragment.append(small);

    if (inputContainer.textContent) inputContainer.textContent = "";
    inputContainer.append(fragment);

}

export default createThumbnailInput;