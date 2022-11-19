
// checking if the user been already loged in in the sessions / so if he is not that it redirect hiom to login route (page)
exports.requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}