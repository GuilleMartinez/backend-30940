const destroySession = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next({ type: "bad_request" });
        res.clearCookie("connect.sid");
        return res.render("goodbye", { pageTitle: "Logout" });
    })
}

const createSession = (req, res, next) => {
    req.session.user = { ...req.body };
    return res.redirect("/");
}

module.exports = {
    createSession,
    destroySession
}