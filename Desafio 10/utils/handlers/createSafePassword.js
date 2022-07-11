module.exports = async (password) => {
    const { hash } = require("bcrypt");
    return await hash(password, 10);
}