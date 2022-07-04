module.exports = (req, res) => {
    return req.session?.user ? res.redirect("/") : res.render("login", { pageTitle: "login" });
}