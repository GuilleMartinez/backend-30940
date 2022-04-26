"use strict";

import thumbnailValidation from "./utils/thumbnailValidation.js";
import createThumbnailInput from "./utils/createThumbnailInput.js";

document
  .getElementById("add-product-form")
  .addEventListener("submit", thumbnailValidation);
  
document
  .getElementById("thumbnail-selector")
  .addEventListener("change", createThumbnailInput);
