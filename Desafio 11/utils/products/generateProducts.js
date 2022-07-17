const generateRandomProducts = (cant = 5) => {

    const createRandomProduct = () => {
        const { faker } = require("@faker-js/faker");
        return {
            title: faker.commerce.productName(),
            price: faker.commerce.price(100, 999),
            thumbnail: faker.image.imageUrl(90, 90, true),
        };
    };

    const randomProducts = new Array(cant)
        .fill(null)
        .map(() => createRandomProduct());

    return randomProducts;
};

process.on("message", (cant) => {
    const products = generateRandomProducts(cant);
    process.send({ products });
});
