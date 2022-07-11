module.exports = (passport, app) => {

    const { Router } = require("express");
    const router = Router();
    const { destroySession, renderLoginPage, renderMainPage, renderLoginError, renderSignupPage, renderSignupError } = require("../controllers/app");
    const auth = require("../utils/session/auth");


    router.get("/", auth, renderMainPage);
    router.get("/login", renderLoginPage);
    router.get("/signup", renderSignupPage);
    router.get("/logout", auth, destroySession);

    router.post("/login", passport.authenticate("login", { failureRedirect: "/loginError", successRedirect: "/" }));
    router.post("/signup", passport.authenticate("signup", { failureRedirect: "/signupError", successRedirect: "/" }));

    router.get("/loginError", renderLoginError);
    router.get("/signupError", renderSignupError);

    app.use("/", router);
}