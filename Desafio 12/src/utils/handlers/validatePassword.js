module.exports = async (user, password) => {
    const { compare } = require("bcrypt");
    return await compare(password, user.password);
}