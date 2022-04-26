async function thumbnailValidation(event) {
  try {
    event.preventDefault();

    const body = new FormData(event.target);
    const thumbnail = body.get("thumbnail");
    const method = event.target.getAttribute("method");
    const url = event.target.getAttribute("action");

    if (thumbnail instanceof File) {
      const validImgTypes = new RegExp(/(.png|.jpeg|.jpg)$/, "gi");
      if (validImgTypes.test(thumbnail.name)) {
        const editedFileName = thumbnail.name.replace(
          /.+[^.png|.jpg|.jpeg]/,
          `thumbnail-${Date.now()}`
        );
        body.set("thumbnail", thumbnail, editedFileName);
      } else {
        return null;
      }
    }

    const response = await fetch(url, { method, body, redirect: "follow" });
    window.location.replace(response.url);
  } catch (err) {
    return console.error(err.message);
  }
}

export default thumbnailValidation;
