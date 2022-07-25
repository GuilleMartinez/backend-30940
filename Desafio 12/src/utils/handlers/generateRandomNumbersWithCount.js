const getRandomNumber = (min = 1, max = 1000) =>
    Math.floor(Math.random() * (max - min + 1) + min);


const generateRandomNumbersWithCount = (count = 10) => {

    const numbers = new Array(count).fill(0).map(() => getRandomNumber());

    const uniques = [...new Set(numbers)];

    return uniques.reduce((acc, number) => {
        const count = numbers.filter((value) => value == number).length;
        return { ...acc, [number]: count };
    }, {});

}

process.on("message", (count) => {
    const randomNumbers = generateRandomNumbersWithCount(count);
    process.send(randomNumbers);
});