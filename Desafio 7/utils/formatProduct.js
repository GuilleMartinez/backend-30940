module.exports = ({ title, price, thumbnail }, file) => {
  return {
    title: title,
    price: parseFloat(price),
    thumbnail: file ? `./uploads/${file.originalname}` : thumbnail,
  };
};
