const destroySession = (req, res, next) => {
    const { user: { name } } = req;
    req.session.destroy((err) => {
        if (err) return next({ type: "server_error", err });
        res.clearCookie("connect.sid");
        return res.render("goodbye", { pageTitle: "Logout", name });
    })
}

const renderLoginPage = (req, res, next) => {
    return req.isAuthenticated() ? res.redirect("/") : res.render("login", { pageTitle: "Login 🔒" });
}

const renderMainPage = (req, res, next) => {
    const { user: { name } } = req;
    return res.render("index", { layout: "session", pageTitle: "Main Page", name });
}

const renderSignupPage = (req, res, next) => {
    return req.isAuthenticated() ? res.redirect("/") : res.render("signup", { pageTitle: "Sign Up" });
}

const renderLoginError = (req, res, next) => {
    return res.render("login-error", { pageTitle: "Login error" });
}

const renderSignupError = (req, res, next) => {
    return res.render("signup-error", { pageTitle: "Singup error", message: "Error on signup." });
}

module.exports = {
    destroySession,
    renderLoginPage,
    renderMainPage,
    renderLoginError,
    renderSignupError,
    renderSignupPage
}