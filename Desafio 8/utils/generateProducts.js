const createFakeProduct = () => {
    const generateProduct = () => {
        const { faker } = require("@faker-js/faker");
        const fakeProduct = {
            title: faker.commerce.productName(),
            price: faker.commerce.price(100, 999),
            thumbnail: faker.image.imageUrl(90, 90, true),
        };
        return fakeProduct;
    };
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(generateProduct()), 0);
    });
};

const createRandomProducts = async (cant = 5) => {
    const products = [];
    for (let i = 0; i < cant; i++) {
        products.push(await createFakeProduct());
    }
    return products;
};

module.exports = createRandomProducts;
