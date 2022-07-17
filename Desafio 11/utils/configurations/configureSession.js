module.exports = (client, app) => {
    const session = require("express-session");
    const MongoStore = require("connect-mongo");
    const { mongo: { sessionCollection } } = require("../../config/options");

    app.use(
        session({
            secret: "coderHouse",
            store: MongoStore.create({ client, collectionName: sessionCollection }),
            cookie: {
                maxAge: 600000,
            },
            rolling: true,
            resave: false,
            saveUninitialized: false,
        })
    );
};
