module.exports = (app) => {
    const { engine: handlebars } = require("express-handlebars");

    app.engine("hbs", handlebars({
        layoutsDir: "./public/views/layouts",
        partialsDir: "./public/views/partials",
        defaultLayout: "main",
        extname: "hbs"
    }));

    app.set("view engine", "hbs");
    app.set("views", "./public/views");
}