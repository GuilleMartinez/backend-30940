module.exports = (req, res) => {
    const { user } = req.session;
    return res.render("index_view", { pageTitle: "index", user });
}