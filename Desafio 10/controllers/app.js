const destroySession = (req, res, next) => {
    const { user } = req;
    req.session.destroy((err) => {
        if (err) return next({ type: "server_error", err });
        res.clearCookie("connect.sid");
        return res.render("goodbye", { pageTitle: "Logout", name: user.name });
    });
};

const renderLoginPage = (req, res, next) => {
    return req.isAuthenticated()
        ? res.redirect("/")
        : res.render("login", { pageTitle: "Login 🔒" });
};

const renderMainPage = (req, res, next) => {
    const { user } = req;
    return res.render("index", {
        layout: "session",
        pageTitle: "Main Page",
        name: user.name,
        email: user.email,
    });
};

const renderSignupPage = (req, res, next) => {
    return req.isAuthenticated()
        ? res.redirect("/")
        : res.render("signup", { pageTitle: "Sign Up" });
};

const renderLoginError = (req, res, next) => {
    return res.render("login-error", { pageTitle: "Login error" });
};

const renderSignupError = (req, res, next) => {
    return res.render("signup-error", {
        pageTitle: "Singup error",
        message: "Error on signup.",
    });
};

module.exports = {
    destroySession,
    renderLoginPage,
    renderMainPage,
    renderLoginError,
    renderSignupError,
    renderSignupPage,
};
