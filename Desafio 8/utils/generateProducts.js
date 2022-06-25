const generateProducts = (cant = 1) => {
    const products = [];
    const { faker } = require("@faker-js/faker");

    for (let i = 0; i < cant; i++) {
        products.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(100, 999),
            thumbnail: faker.image.imageUrl(90, 90, true)
        });
    }
    return products;
}

module.exports = generateProducts();