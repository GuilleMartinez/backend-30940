module.exports = (app) => {
    const passport = require("passport");
    const { Strategy } = require("passport-local");
    const users = require("../../models/users");
    const isValidPassword = require("../handlers/validatePassword");
    const createSafePassword = require("../handlers/createSafePassword");

    const loginStrategy = new Strategy(
        { usernameField: "email" },
        async (username, password, done) => {
            const { user, error } = await users.filter({ email: username });
            const validPassword = user
                ? await isValidPassword(user, password)
                : false;

            if (error) return done(error);
            else if (!user || !validPassword) return done(null, false);
            else return done(null, user);
        }
    );

    const signupStrategy = new Strategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            const { user, searchingError } = await users.filter({ email: username });

            if (searchingError) return done(searchingError);
            else if (user) return done(null, user);
            else {
                const password = await createSafePassword(req.body.password);
                const { added, error: creationError } = await users.insertOne({
                    ...req.body,
                    password,
                });
                return creationError ? done(creationError) : done(null, added);
            }
        }
    );

    passport.serializeUser((user, done) => {
        const id = user._id.toString();
        done(null, id);
    });

    passport.deserializeUser(async (id, done) => {
        const { finded, error } = await users.findOne(id);
        return error ? done(error) : done(null, finded);
    });

    passport.use("login", loginStrategy);
    passport.use("signup", signupStrategy);

    app.use(passport.initialize());
    app.use(passport.session());

    return passport;
};
